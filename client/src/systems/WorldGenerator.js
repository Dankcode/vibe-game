import * as THREE from 'three';
import { Tile } from '../entities/Tile.js';
import { ObstructionHider } from './ObstructionHider.js';
import { ELEMENTS, getTileDefinition, isTileWalkable, tileSupportsHabitat } from '../data/TileRegistry.js';
import { BUILDING_PARTS, createTileCell, createVoxelBlock, createVoxelMatrix, getTopVoxel, getVoxelColumn } from '../data/TileLibrary.js';
import { planBuildingFurniture } from './FurniturePlanner.js';

export { ELEMENTS };

export const DEFAULT_CHUNK_SIZE = 16;
const BLOCKING_CLEARANCE_VOXELS = 1;
const BUILDING_STAIR_STOREY_HEIGHT = 2;
const BUILDING_STAIR_PAIR_STEP_HEIGHT = BUILDING_STAIR_STOREY_HEIGHT;
const FURNITURE_SURFACE_LIFT = 0.08;

export class WorldGenerator {
    constructor(threeManager, options = {}) {
        this.threeManager = threeManager;
        this.chunkSize = options.chunkSize || DEFAULT_CHUNK_SIZE;
        this.tiles = [];
        this.tileMap = new Map(); // key: "x,y,z" -> Tile object
        this.elevationMap = new Map(); // key: "x,y" -> maxZ
        this.surfaceMap = new Map(); // key: "x,y" -> top tile data
        this.chunkMap = new Map(); // key: "chunkX,chunkY" -> sparse block keys
        this.voxelMatrix = null;
        this.voxelColumnMap = new Map(); // key: "x,y" -> voxel column array
        this.buildingStates = new Map();
        this.obstructionGroups = new Map();
        this.decorationGroups = [];
        this.terrainDetailGroup = null;
        this.obstructionHider = new ObstructionHider(this);
        this.visibleTileRadius = options.visibleTileRadius || 34;
        this.lastVisibilityCenter = null;
    }

    /**
     * Streamlined world generation using a simplified mathematical method.
     */
    generate(width, height) {
        const rows = [];

        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                const gridX = x - Math.floor(width / 2);
                const gridY = y - Math.floor(height / 2);
                const dist = Math.sqrt(gridX * gridX + gridY * gridY);
                let heightValue = 1;
                let element = ELEMENTS.GEO;
                let textureValue = 0;

                if (dist > width * 0.4) {
                    element = ELEMENTS.HYDRO;
                    textureValue = 2; // Normal water
                    heightValue = 0;
                    
                    // Randomly make some water brackish
                    if (Math.abs(Math.sin(gridX * 0.2) * Math.cos(gridY * 0.2)) > 0.7) {
                        textureValue = 4; // Brackish water
                    }
                } else if (dist > width * 0.35) {
                    element = ELEMENTS.ANEMO;
                    heightValue = 0;
                }

                row.push(createTileCell({
                    element,
                    texture: textureValue,
                    effect: element,
                    height: heightValue
                }));
            }
            rows.push(row);
        }

        this.generateFromArray(rows);
    }

    /**
     * Array-based layout generation for complex maps
     */
    generateFromArray(mapArray, legend) {
        this.clear();
        this.loadVoxelMatrix(createVoxelMatrix(mapArray, legend));
    }

    loadVoxelMatrix(voxelMatrix) {
        this.voxelMatrix = voxelMatrix;
        for (let y = 0; y < voxelMatrix.height; y++) {
            for (let x = 0; x < voxelMatrix.width; x++) {
                const gridX = x - voxelMatrix.offsetX;
                const gridY = y - voxelMatrix.offsetY;
                const column = voxelMatrix.columns[y][x];
                this.voxelColumnMap.set(this.getColumnKey(gridX, gridY), column);
                for (const voxel of column) {
                    this.addTile(
                        gridX,
                        gridY,
                        voxel.z,
                        voxel.element,
                        voxel.textureValue ?? voxel.texture ?? 0,
                        voxel.effect ?? 0,
                        voxel.building ?? 0,
                        true,
                        voxel.visualVariant ?? 0,
                        voxel.paletteId ?? 'meadow'
                    );
                }
            }
        }
        this.registerTerrainDepthDetails();
    }

    registerTerrainDepthDetails() {
        this.clearTerrainDepthDetails();
        if (!this.surfaceMap.size) return;

        const group = new THREE.Group();
        const grassyLips = [];
        const rockStrata = [];
        const mossPuffs = [];
        const waterfallCandidates = [];
        const worldSeed = `${this.voxelMatrix?.seed || 0}:${this.voxelMatrix?.variant || 0}`;
        const directions = [
            { dx: 0, dy: -1, ox: 0, oz: -0.49, rotationY: 0 },
            { dx: 1, dy: 0, ox: 0.49, oz: 0, rotationY: Math.PI / 2 },
            { dx: 0, dy: 1, ox: 0, oz: 0.49, rotationY: 0 },
            { dx: -1, dy: 0, ox: -0.49, oz: 0, rotationY: Math.PI / 2 }
        ];

        for (const surface of this.surfaceMap.values()) {
            if (surface.element !== ELEMENTS.GEO || !surface.definition?.walkable) continue;
            const isMeadow = tileSupportsHabitat(surface.element, surface.textureValue, 'meadow') ||
                tileSupportsHabitat(surface.element, surface.textureValue, 'forest-edge');

            for (const direction of directions) {
                const neighbor = this.surfaceMap.get(this.getColumnKey(
                    surface.x + direction.dx,
                    surface.y + direction.dy
                ));
                if (neighbor?.element === ELEMENTS.STRUCTURE) continue;
                const neighborZ = neighbor?.z ?? Math.max(-1, surface.z - 2);
                const drop = surface.z - neighborZ;
                if (drop < 1) continue;

                const edgeSeed = WorldGenerator.hashVisualSeed(
                    `${worldSeed}:edge:${surface.x}:${surface.y}:${direction.dx}:${direction.dy}`
                );
                const edgeX = surface.x + direction.ox;
                const edgeZ = surface.y + direction.oz;
                if (grassyLips.length < 760 && edgeSeed % 100 < 82) {
                    grassyLips.push({
                        x: edgeX,
                        y: surface.z + this.getTopSurfaceOffset() - 0.105,
                        z: edgeZ,
                        rotationY: direction.rotationY,
                        sx: 0.72 + ((edgeSeed >>> 8) % 18) / 100,
                        sy: 0.78,
                        sz: 1
                    });
                }

                if (rockStrata.length < 680 && edgeSeed % 100 < 68) {
                    const layer = Math.min(drop, 3);
                    rockStrata.push({
                        x: edgeX - direction.dx * 0.012,
                        y: surface.z + this.getTopSurfaceOffset() - 0.48 - layer * 0.18,
                        z: edgeZ - direction.dy * 0.012,
                        rotationY: direction.rotationY,
                        sx: 0.5 + ((edgeSeed >>> 12) % 36) / 100,
                        sy: Math.min(2.5, 0.72 + drop * 0.34),
                        sz: 0.74
                    });
                }

                if (isMeadow && mossPuffs.length < 220 && edgeSeed % 100 < 24) {
                    mossPuffs.push({
                        x: edgeX - direction.dx * 0.12,
                        y: surface.z + this.getTopSurfaceOffset() + 0.035,
                        z: edgeZ - direction.dy * 0.12,
                        rotationY: (edgeSeed % 8) * Math.PI / 4,
                        sx: 0.68 + ((edgeSeed >>> 10) % 24) / 100,
                        sy: 0.42,
                        sz: 0.68 + ((edgeSeed >>> 16) % 24) / 100
                    });
                }

                if (neighbor?.element === ELEMENTS.HYDRO && waterfallCandidates.length < 40) {
                    waterfallCandidates.push({
                        surface,
                        neighbor,
                        direction,
                        drop,
                        score: edgeSeed
                    });
                }
            }
        }

        this.addInstancedTerrainDetail(
            group,
            new THREE.BoxGeometry(0.9, 0.16, 0.18),
            WorldGenerator.getTerrainDetailMaterial('grassLip'),
            grassyLips
        );
        this.addInstancedTerrainDetail(
            group,
            new THREE.BoxGeometry(0.78, 0.42, 0.2),
            WorldGenerator.getTerrainDetailMaterial('cliffStrata'),
            rockStrata
        );
        this.addInstancedTerrainDetail(
            group,
            new THREE.SphereGeometry(0.24, 6, 4),
            WorldGenerator.getTerrainDetailMaterial('cliffMoss'),
            mossPuffs
        );

        waterfallCandidates
            .sort((a, b) => a.score - b.score)
            .slice(0, 2)
            .forEach((candidate) => this.addTerrainWaterfall(group, candidate));

        group.userData.detailCounts = {
            grassyLips: grassyLips.length,
            rockStrata: rockStrata.length,
            mossPuffs: mossPuffs.length,
            waterfalls: Math.min(2, waterfallCandidates.length)
        };
        group.traverse((child) => {
            child.castShadow = !child.material?.transparent;
            child.receiveShadow = true;
            child.raycast = () => {};
        });
        this.threeManager.addToWorld(group);
        this.terrainDetailGroup = group;
    }

    addInstancedTerrainDetail(group, geometry, material, transforms) {
        if (!transforms.length) {
            geometry.dispose();
            return;
        }
        const mesh = new THREE.InstancedMesh(geometry, material, transforms.length);
        const matrix = new THREE.Matrix4();
        const quaternion = new THREE.Quaternion();
        const position = new THREE.Vector3();
        const scale = new THREE.Vector3();
        for (let index = 0; index < transforms.length; index++) {
            const transform = transforms[index];
            position.set(transform.x, transform.y, transform.z);
            quaternion.setFromEuler(new THREE.Euler(0, transform.rotationY || 0, 0));
            scale.set(transform.sx || 1, transform.sy || 1, transform.sz || 1);
            matrix.compose(position, quaternion, scale);
            mesh.setMatrixAt(index, matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
        group.add(mesh);
    }

    addTerrainWaterfall(group, candidate) {
        const { surface, neighbor, direction, drop } = candidate;
        const height = Math.max(0.9, drop - 0.08);
        const isHorizontalFace = direction.dx === 0;
        const cascade = new THREE.Mesh(
            new THREE.BoxGeometry(isHorizontalFace ? 0.56 : 0.055, height, isHorizontalFace ? 0.055 : 0.56),
            WorldGenerator.getTerrainDetailMaterial('waterfall')
        );
        cascade.position.set(
            surface.x + direction.ox + direction.dx * 0.025,
            neighbor.z + this.getTopSurfaceOffset() + height / 2,
            surface.y + direction.oz + direction.dy * 0.025
        );
        group.add(cascade);

        const foam = new THREE.Mesh(
            new THREE.SphereGeometry(0.28, 7, 4),
            WorldGenerator.getTerrainDetailMaterial('waterFoam')
        );
        foam.position.set(
            surface.x + direction.dx * 0.42,
            neighbor.z + this.getTopSurfaceOffset() + 0.035,
            surface.y + direction.dy * 0.42
        );
        foam.scale.set(isHorizontalFace ? 1.35 : 0.6, 0.22, isHorizontalFace ? 0.6 : 1.35);
        group.add(foam);
    }

    clearTerrainDepthDetails() {
        if (!this.terrainDetailGroup) return;
        WorldGenerator.disposeSceneObject(this.terrainDetailGroup, this.threeManager);
        this.terrainDetailGroup = null;
    }

    generateFromChunkedArray(mapArray, legend, chunkSize = this.chunkSize, options = {}) {
        this.chunkSize = chunkSize;
        this.generateFromArray(mapArray, legend);
        const buildings = Array.isArray(options) ? options : (options.buildings || []);
        const decorations = Array.isArray(options) ? [] : (options.decorations || mapArray.decorations || []);
        this.registerBuildingBlueprints(buildings);
        this.registerWorldDecorations(decorations);
    }

    addTile(x, y, z, element, textureValue = 0, effect = 0, building = 0, affectSurface = true, visualVariant = 0, paletteId = 'meadow') {
        const voxel = this.getVoxelAt(x, y, z) ||
            this.setVoxelAt(x, y, z, { element, texture: textureValue, effect, building, visualVariant, paletteId });
        const resolvedVisualVariant = voxel.visualVariant ?? visualVariant;
        const resolvedPaletteId = voxel.paletteId ?? paletteId;
        const tile = new Tile(this.threeManager, x, y, z, {
            element,
            textureValue,
            effect,
            building,
            visualVariant: resolvedVisualVariant,
            paletteId: resolvedPaletteId,
            visualSeed: this.voxelMatrix?.seed || this.voxelMatrix?.world?.variantSeed || 0
        });
        this.tiles.push(tile);
        const tileKey = this.getTileKey(x, y, z);
        this.tileMap.set(tileKey, tile);
        this.registerTileInChunk(x, y, tileKey);
        
        // Update elevation map
        if (affectSurface) {
            const columnKey = this.getColumnKey(x, y);
            const currentMaxZ = this.elevationMap.get(columnKey) ?? -1;
            if (z > currentMaxZ) {
                this.elevationMap.set(columnKey, z);
                this.surfaceMap.set(columnKey, {
                    x,
                    y,
                    z,
                    element,
                    textureValue,
                    effect,
                    building,
                    visualVariant: resolvedVisualVariant,
                    paletteId: resolvedPaletteId,
                    definition: getTileDefinition(element, textureValue, resolvedPaletteId),
                    voxel
                });
            }
        }
        
        return tile;
    }

    getTileAt(x, y, z) {
        return this.tileMap.get(this.getTileKey(x, y, z));
    }

    getElevation(x, y) {
        const { gridX, gridY } = this.toGridPosition(x, y);
        return this.elevationMap.get(this.getColumnKey(gridX, gridY)) ?? 0;
    }

    getMovementElevation(x, y, fromZ = null) {
        const { gridX, gridY } = this.toGridPosition(x, y);
        const surface = this.getReachableSurfaceAt(gridX, gridY, fromZ, {
            allowBuildingStairSpan: true
        });
        return surface?.z ?? this.getElevation(x, y);
    }

    getTopSurfaceOffset() {
        return Tile.topOffset;
    }

    getSurfaceWorldY(x, y) {
        return this.getElevation(x, y) + this.getTopSurfaceOffset();
    }

    getSurfaceAt(x, y) {
        const { gridX, gridY } = this.toGridPosition(x, y);
        return this.surfaceMap.get(this.getColumnKey(gridX, gridY));
    }

    getReachableSurfaceAt(x, y, fromZ = null, options = {}) {
        const { gridX, gridY } = this.toGridPosition(x, y);
        return this.getReachableSurfaceAtGrid(gridX, gridY, fromZ, options);
    }

    getReachableSurfaceAtGrid(gridX, gridY, fromZ = null, options = {}) {
        const column = this.voxelColumnMap.get(this.getColumnKey(gridX, gridY));
        if (!Array.isArray(column) || column.length === 0) {
            return this.surfaceMap.get(this.getColumnKey(gridX, gridY));
        }

        const topZ = column.reduce((max, voxel) => Math.max(max, voxel.z), 0);
        const walkable = column
            .filter((voxel) =>
                voxel.definition?.walkable &&
                this.isMovementSurfaceVoxel(voxel, topZ) &&
                this.hasMovementClearance(column, voxel.z)
            )
            .sort((a, b) => a.z - b.z);
        if (!walkable.length) return null;

        const top = walkable[walkable.length - 1];
        if (!Number.isFinite(fromZ)) return this.toSurfaceRecord(gridX, gridY, top);

        const exact = walkable.find((voxel) => voxel.z === fromZ);
        if (exact) return this.toSurfaceRecord(gridX, gridY, exact);

        const oneStepUp = walkable.find((voxel) => voxel.z === fromZ + 1);
        if (oneStepUp) return this.toSurfaceRecord(gridX, gridY, oneStepUp);

        if (options.allowBuildingStairSpan) {
            const storeyStair = walkable.find((voxel) =>
                Math.abs(voxel.z - fromZ) === BUILDING_STAIR_STOREY_HEIGHT &&
                this.isBuildingStairSurface(voxel)
            );
            if (storeyStair) return this.toSurfaceRecord(gridX, gridY, storeyStair);
        }

        const nearest = walkable
            .filter((voxel) => Math.abs(voxel.z - fromZ) <= 1)
            .sort((a, b) => Math.abs(a.z - fromZ) - Math.abs(b.z - fromZ))[0];
        if (nearest) return this.toSurfaceRecord(gridX, gridY, nearest);

        return null;
    }

    isMovementSurfaceVoxel(voxel, topZ) {
        if (!voxel) return false;
        if (voxel.z === topZ) return true;
        if (voxel.element !== ELEMENTS.STRUCTURE) return false;
        return [
            BUILDING_PARTS.DOOR,
            BUILDING_PARTS.FLOOR,
            BUILDING_PARTS.GROUND_FLOOR,
            BUILDING_PARTS.STAIRS,
            BUILDING_PARTS.STAIRS_NORTH,
            BUILDING_PARTS.STAIRS_SOUTH,
            BUILDING_PARTS.STAIRS_WEST,
            BUILDING_PARTS.STAIRS_EAST,
            BUILDING_PARTS.CITY_WALL_WALKWAY,
            BUILDING_PARTS.CITY_WALL_STAIRS_NORTH,
            BUILDING_PARTS.CITY_WALL_STAIRS_SOUTH,
            BUILDING_PARTS.CITY_WALL_STAIRS_WEST,
            BUILDING_PARTS.CITY_WALL_STAIRS_EAST
        ].includes(voxel.building);
    }

    hasMovementClearance(column, surfaceZ) {
        return !column.some((voxel) =>
            voxel.z > surfaceZ &&
            voxel.z <= surfaceZ + BLOCKING_CLEARANCE_VOXELS &&
            !voxel.definition?.walkable
        );
    }

    toSurfaceRecord(x, y, voxel) {
        return {
            x,
            y,
            z: voxel.z,
            element: voxel.element,
            textureValue: voxel.textureValue ?? voxel.texture ?? 0,
            effect: voxel.effect ?? 0,
            building: voxel.building ?? 0,
            paletteId: voxel.paletteId ?? 'meadow',
            definition: voxel.definition || getTileDefinition(voxel.element, voxel.textureValue ?? voxel.texture ?? 0, voxel.paletteId),
            buildingGroundFloorZ: voxel.buildingGroundFloorZ,
            buildingFloorHeight: voxel.buildingFloorHeight,
            buildingLevelIndex: voxel.buildingLevelIndex,
            buildingLevelTag: voxel.buildingLevelTag,
            buildingLevelKind: voxel.buildingLevelKind,
            buildingPartTag: voxel.buildingPartTag,
            buildingAnchorZ: voxel.buildingAnchorZ,
            buildingPlacementZ: voxel.buildingPlacementZ,
            buildingPlacementTag: voxel.buildingPlacementTag,
            voxel
        };
    }

    getVoxelColumnAt(x, y) {
        const { gridX, gridY } = this.toGridPosition(x, y);
        return this.voxelColumnMap.get(this.getColumnKey(gridX, gridY)) ||
            getVoxelColumn(this.voxelMatrix, gridX, gridY);
    }

    getTopVoxelAt(x, y) {
        return getTopVoxel(this.getVoxelColumnAt(x, y));
    }

    getVoxelAt(x, y, z) {
        const column = this.getVoxelColumnAt(x, y);
        return column?.find((voxel) => voxel.z === z) || null;
    }

    findHighestWalkable() {
        let best = null;
        for (const surface of this.surfaceMap.values()) {
            if (!this.isWalkable(surface.x, surface.y)) continue;
            if (!best || surface.z > best.z) best = surface;
        }
        return best ? { x: best.x, y: best.y, z: best.z } : null;
    }

    hasTileColumn(x, y) {
        const { gridX, gridY } = this.toGridPosition(x, y);
        return this.elevationMap.has(this.getColumnKey(gridX, gridY));
    }

    isWalkable(x, y) {
        const surface = this.getSurfaceAt(x, y);
        if (!surface) return false;
        return isTileWalkable(surface.element, surface.textureValue);
    }

    canOccupyTile(x, y, fromX = x, fromY = y, fromZOverride = null) {
        const fromSurface = Number.isFinite(fromZOverride)
            ? this.getReachableSurfaceAtGrid(fromX, fromY, fromZOverride)
            : this.getReachableSurfaceAtGrid(fromX, fromY);
        const fromZ = Number.isFinite(fromZOverride) ? fromZOverride : (fromSurface?.z ?? 0);
        const surface = this.getReachableSurfaceAtGrid(x, y, fromZ, {
            allowBuildingStairSpan: true
        });
        if (!surface?.definition?.walkable) return false;

        const toZ = surface.z;
        const elevationDiff = toZ - fromZ;
        if (Math.abs(elevationDiff) < 1) return true;
        if (Math.abs(elevationDiff) === 1) return true;
        if (this.isPairedStairTransition(fromSurface, surface, x - fromX, y - fromY)) return true;
        return false;
    }

    canMoveBetween(fromX, fromY, toX, toY, isDiagonal = false, fromZ = null) {
        const start = this.toGridPosition(fromX, fromY);
        const end = this.toGridPosition(toX, toY);
        if (start.gridX === end.gridX && start.gridY === end.gridY) {
            return this.canOccupyTile(end.gridX, end.gridY, start.gridX, start.gridY, fromZ);
        }

        if (!this.canOccupyTile(end.gridX, end.gridY, start.gridX, start.gridY, fromZ)) return false;

        const dx = end.gridX - start.gridX;
        const dy = end.gridY - start.gridY;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) return false;

        const diagonalMove = isDiagonal || (Math.abs(dx) === 1 && Math.abs(dy) === 1);
        if (!this.canUseStairsBetween(start.gridX, start.gridY, end.gridX, end.gridY, diagonalMove, fromZ)) return false;
        if (!diagonalMove) return true;

        const fromSurface = Number.isFinite(fromZ)
            ? this.getReachableSurfaceAtGrid(start.gridX, start.gridY, fromZ)
            : this.getReachableSurfaceAtGrid(start.gridX, start.gridY);
        const fromSurfaceZ = Number.isFinite(fromZ) ? fromZ : (fromSurface?.z ?? 0);
        const toSurface = this.getReachableSurfaceAtGrid(end.gridX, end.gridY, fromSurfaceZ, {
            allowBuildingStairSpan: true
        });
        if (this.isPairedStairTransition(fromSurface, toSurface, dx, dy)) return true;

        const horizontalClear = this.canOccupyTile(end.gridX, start.gridY, start.gridX, start.gridY, fromZ);
        const verticalClear = this.canOccupyTile(start.gridX, end.gridY, start.gridX, start.gridY, fromZ);
        if (horizontalClear && verticalClear) return true;

        // Generic diagonal moves still need one orthogonal lane clear; paired stair modules were
        // accepted above because the empty shaft is intentionally not an occupiable floor tile.
        if (!horizontalClear && !verticalClear) return false;
        return false;
    }

    canOccupyFootprint(centerX, centerY, fromX = centerX, fromY = centerY, radius = 0.32, fromZ = null) {
        const from = this.toGridPosition(fromX, fromY);
        const center = this.toGridPosition(centerX, centerY);
        if (this.isPairedStairStoreyMove(from.gridX, from.gridY, center.gridX, center.gridY, fromZ)) {
            return true;
        }
        const fromSurface = Number.isFinite(fromZ)
            ? this.getReachableSurfaceAtGrid(from.gridX, from.gridY, fromZ)
            : this.getReachableSurfaceAtGrid(from.gridX, from.gridY);
        const fromSurfaceZ = Number.isFinite(fromZ) ? fromZ : (fromSurface?.z ?? 0);
        const samples = this.getFootprintSamples(centerX, centerY, radius);

        for (const sample of samples) {
            const point = this.toGridPosition(sample.x, sample.y);
            if (this.canOccupyTile(point.gridX, point.gridY, from.gridX, from.gridY, fromSurfaceZ)) continue;
            return false;
        }

        return true;
    }

    canMoveFootprintBetween(fromX, fromY, toX, toY, radius = 0.32, fromZ = null) {
        const start = this.toGridPosition(fromX, fromY);
        const end = this.toGridPosition(toX, toY);
        const isDiagonal = start.gridX !== end.gridX && start.gridY !== end.gridY;

        if (!this.canMoveBetween(start.gridX, start.gridY, end.gridX, end.gridY, isDiagonal, fromZ)) return false;
        return this.canOccupyFootprint(toX, toY, start.gridX, start.gridY, radius, fromZ);
    }

    getFootprintSamples(centerX, centerY, radius = 0.32) {
        const diagonal = radius * 0.72;
        return [
            { x: centerX, y: centerY },
            { x: centerX + radius, y: centerY },
            { x: centerX - radius, y: centerY },
            { x: centerX, y: centerY + radius },
            { x: centerX, y: centerY - radius },
            { x: centerX + diagonal, y: centerY + diagonal },
            { x: centerX + diagonal, y: centerY - diagonal },
            { x: centerX - diagonal, y: centerY + diagonal },
            { x: centerX - diagonal, y: centerY - diagonal }
        ];
    }

    registerBuildingBlueprints(buildings = []) {
        this.clearBuildingStates();
        for (const building of buildings) {
            const state = this.createBuildingState(building);
            if (!state) continue;
            this.buildingStates.set(building.id, state);
            this.registerBuildingObstructionGroup(state);
        }
        this.registerCityWallObstructionGroup();
    }

    registerWorldDecorations(decorations = []) {
        this.clearWorldDecorations();
        for (const decoration of decorations || []) {
            const group = this.createWorldDecoration(decoration);
            if (!group) continue;
            this.threeManager.addToWorld(group);
            this.decorationGroups.push(group);
        }
    }

    updateLivingWorld(elapsedSeconds, centerX, centerY) {
        const visibilityRadius = this.visibleTileRadius;
        for (const group of this.decorationGroups) {
            const distance = Math.hypot(group.position.x - centerX, group.position.z - centerY);
            group.visible = distance <= visibilityRadius;
            if (!group.visible) continue;
            if (group.userData.sways) {
                group.rotation.z = Math.sin(elapsedSeconds * 0.85 + group.userData.lifePhase) * 0.018;
                group.rotation.x = Math.cos(elapsedSeconds * 0.62 + group.userData.lifePhase) * 0.009;
            }
            if (group.userData.rotor) {
                group.userData.rotor.rotation.z = elapsedSeconds * 0.72 + group.userData.lifePhase;
            }
            if (group.userData.waterPulse) {
                const pulse = Math.sin(elapsedSeconds * 2.4 + group.userData.lifePhase);
                group.userData.waterPulse.scale.y = 0.94 + pulse * 0.06;
                group.userData.waterPulse.material.emissiveIntensity = 0.22 + (pulse + 1) * 0.05;
            }
        }

        for (const state of this.buildingStates.values()) {
            const rotor = state.roof?.userData?.rotor;
            if (rotor && state.roof.visible) {
                rotor.rotation.z = elapsedSeconds * 0.48 + state.roof.userData.motionPhase;
            }
        }
    }

    createWorldDecoration(decoration) {
        const type = decoration?.type || 'crate';
        const x = Number(decoration.x);
        const y = Number(decoration.y);
        if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
        const surface = this.getSurfaceAt(x, y);
        if (!surface || !surface.definition?.walkable) return null;

        const offsetX = Number(decoration.offsetX || 0);
        const offsetY = Number(decoration.offsetY || 0);
        const group = new THREE.Group();
        group.position.set(x + offsetX, this.getSurfaceWorldY(x, y) + 0.02, y + offsetY);
        group.userData.decorationType = type;
        const lifeSeed = WorldGenerator.hashVisualSeed(
            `${this.voxelMatrix?.seed || 0}:${this.voxelMatrix?.variant || 0}:${type}:${x}:${y}`
        );
        group.userData.lifePhase = (lifeSeed % 6283) / 1000;
        const nearby = this.getNearestBuildingProfile(x, y);
        group.userData.district = decoration.district || nearby?.district || 'residential';
        group.userData.activity = decoration.activity || nearby?.activity || 'home';
        group.userData.biome = decoration.biome || this.voxelMatrix?.theme?.paletteId || 'meadow';
        group.userData.accent = Number(decoration.accent ?? nearby?.districtPalette?.accent);
        group.userData.sways = ['tree', 'plant', 'shrub', 'garden', 'banner'].includes(type);

        if (type === 'barrel') this.addDecorBarrel(group);
        else if (type === 'sign') this.addDecorSign(group, decoration.rotation || 0);
        else if (type === 'plant' || type === 'shrub') this.addDecorPlant(group);
        else if (type === 'lamp') this.addDecorLamp(group);
        else if (type === 'tree') this.addDecorTree(group);
        else if (type === 'well') this.addDecorWell(group);
        else if (type === 'stall') this.addDecorStall(group, decoration.rotation || 0);
        else if (type === 'woodpile') this.addDecorWoodpile(group);
        else if (type === 'boulder') this.addDecorBoulder(group);
        else if (type === 'cart') this.addDecorCart(group, decoration.rotation || 0);
        else if (type === 'garden') this.addDecorGarden(group);
        else if (type === 'fountain') this.addDecorFountain(group);
        else if (type === 'archway') this.addDecorArchway(group, decoration.rotation || 0);
        else if (type === 'banner') this.addDecorBanner(group, decoration.rotation || 0);
        else if (type === 'lantern_cluster') this.addDecorLanternCluster(group, decoration.rotation || 0);
        else if (type === 'waterfall') this.addDecorWaterfall(group, decoration.rotation || 0);
        else if (type === 'overlook') this.addDecorOverlook(group, decoration.rotation || 0);
        else if (type === 'windmill') this.addDecorWindmill(group, decoration.rotation || 0);
        else if (type === 'clock_tower') this.addDecorClockTower(group, decoration.rotation || 0);
        else this.addDecorCrate(group);

        if (type === 'tree') {
            const treeScale = 1.78 + (lifeSeed % 43) / 100;
            group.scale.setScalar(treeScale);
            group.rotation.y = Number(decoration.rotation || 0) + (lifeSeed % 8) * Math.PI / 16;
        }
        else if (type === 'stall' || type === 'well' || type === 'fountain') group.scale.setScalar(1.12);
        else if (type === 'plant' || type === 'shrub') group.scale.setScalar(1.34);

        group.traverse((child) => {
            child.castShadow = true;
            child.receiveShadow = true;
            child.raycast = () => {};
        });
        return group;
    }

    getNearestBuildingProfile(x, y, maxDistance = 14) {
        let nearest = null;
        let nearestDistance = maxDistance;
        for (const building of this.buildingStates.values()) {
            const centerX = building.x + (building.width - 1) / 2;
            const centerY = building.y + (building.height - 1) / 2;
            const distance = Math.hypot(centerX - x, centerY - y);
            if (distance >= nearestDistance) continue;
            nearest = building;
            nearestDistance = distance;
        }
        return nearest;
    }

    addDecorBarrel(group) {
        const wood = WorldGenerator.getDecorationMaterial('barrelWood');
        const band = WorldGenerator.getDecorationMaterial('darkMetal');
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 0.42, 10), wood);
        body.position.y = 0.21;
        group.add(body);
        for (const y of [0.12, 0.32]) {
            const ring = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.016, 6, 10), band);
            ring.position.y = y;
            ring.rotation.x = Math.PI / 2;
            group.add(ring);
        }
    }

    addDecorCrate(group) {
        const wood = WorldGenerator.getDecorationMaterial('crateWood');
        const crate = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.32, 0.38), wood);
        crate.position.y = 0.16;
        group.add(crate);
        const strap = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.035, 0.08), WorldGenerator.getDecorationMaterial('darkWood'));
        strap.position.y = 0.34;
        group.add(strap);
    }

    addDecorSign(group, rotation = 0) {
        const wood = WorldGenerator.getDecorationMaterial('darkWood');
        const paint = WorldGenerator.getDecorationMaterial('signPaint');
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.82, 0.08), wood);
        post.position.y = 0.41;
        group.add(post);
        const board = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.24, 0.06), paint);
        board.position.y = 0.72;
        board.position.z = 0.04;
        group.add(board);
        group.rotation.y = rotation;
    }

    addDecorPlant(group) {
        const leaf = WorldGenerator.getDecorationMaterial(
            group.userData.lifePhase > Math.PI ? 'leafBright' : 'leaf'
        );
        const stem = WorldGenerator.getDecorationMaterial('stem');
        const stemMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.32, 6), stem);
        stemMesh.position.y = 0.16;
        group.add(stemMesh);
        for (let index = 0; index < 5; index++) {
            const leafMesh = new THREE.Mesh(new THREE.SphereGeometry(0.13, 7, 5), leaf);
            const angle = index * Math.PI * 0.4;
            leafMesh.position.set(Math.cos(angle) * 0.08, 0.28 + (index % 2) * 0.06, Math.sin(angle) * 0.08);
            leafMesh.scale.set(1.1, 0.62, 0.82);
            group.add(leafMesh);
        }

        const bloomKeys = ['flowerPink', 'flowerGold', 'flowerLilac'];
        const bloomIndex = Math.floor(group.userData.lifePhase * 10) % bloomKeys.length;
        const bloom = new THREE.Mesh(
            new THREE.SphereGeometry(0.095, 8, 6),
            WorldGenerator.getDecorationMaterial(bloomKeys[bloomIndex])
        );
        bloom.position.set(0, 0.43, 0);
        bloom.scale.set(1.15, 0.68, 1.15);
        group.add(bloom);
    }

    addDecorLamp(group) {
        const metal = WorldGenerator.getDecorationMaterial('darkMetal');
        const glow = WorldGenerator.getDecorationMaterial('lampGlow');
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.9, 7), metal);
        post.position.y = 0.45;
        group.add(post);
        const lantern = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 0.18), glow);
        lantern.position.y = 0.92;
        group.add(lantern);
    }

    addDecorTree(group) {
        const trunk = WorldGenerator.getDecorationMaterial('barkBrown');
        const leafKeys = ({
            savanna: ['leafGold', 'leafBright', 'leafGold'],
            desert: ['leafGold', 'leafBright', 'leafGold'],
            tundra: ['leafFrost', 'leafFrost', 'leafBright'],
            alpine: ['leafFrost', 'leaf', 'leafFrost'],
            crystal: ['leafBlossom', 'leafCrystal', 'leafBlossom'],
            coast: ['leafBright', 'leaf', 'leafBright'],
            jungle: ['leafDark', 'leafBright', 'leaf']
        })[group.userData.biome] || ['leafDark', 'leaf', 'leafBright'];
        const trunkMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.13, 0.86, 7), trunk);
        trunkMesh.position.y = 0.43;
        group.add(trunkMesh);

        const crowns = [
            { x: 0, y: 1.04, z: 0, radius: 0.36, scaleY: 0.88 },
            { x: -0.27, y: 0.98, z: 0.02, radius: 0.29, scaleY: 0.84 },
            { x: 0.27, y: 1.0, z: -0.03, radius: 0.3, scaleY: 0.86 },
            { x: 0.02, y: 0.96, z: -0.25, radius: 0.28, scaleY: 0.82 },
            { x: -0.03, y: 0.98, z: 0.25, radius: 0.29, scaleY: 0.84 },
            { x: 0, y: 1.32, z: 0, radius: 0.28, scaleY: 0.9 }
        ];
        for (const [index, crown] of crowns.entries()) {
            const leaf = WorldGenerator.getDecorationMaterial(
                leafKeys[(index + Math.floor(group.userData.lifePhase)) % leafKeys.length]
            );
            const mesh = new THREE.Mesh(new THREE.DodecahedronGeometry(crown.radius, 0), leaf);
            mesh.position.set(crown.x, crown.y, crown.z);
            mesh.scale.y = crown.scaleY;
            group.add(mesh);
        }
    }

    addDecorWell(group) {
        if (['civic', 'market'].includes(group.userData.district)) {
            this.addDecorFountain(group);
            return;
        }
        const stone = WorldGenerator.getDecorationMaterial('stoneGrey');
        const wood = WorldGenerator.getDecorationMaterial('darkWood');
        const straw = WorldGenerator.getDecorationMaterial('strawRoof');
        const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.34, 0.28, 12), stone);
        ring.position.y = 0.14;
        group.add(ring);

        for (const x of [-0.24, 0.24]) {
            const post = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.68, 0.06), wood);
            post.position.set(x, 0.58, 0);
            group.add(post);
        }
        const crossbar = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.06, 0.06), wood);
        crossbar.position.y = 0.88;
        group.add(crossbar);

        const roof = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.08, 0.42), straw);
        roof.position.y = 1.04;
        roof.rotation.z = 0.14;
        group.add(roof);
    }

    addDecorStall(group, rotation = 0) {
        const wood = WorldGenerator.getDecorationMaterial('darkWood');
        const counterMaterial = WorldGenerator.getDecorationMaterial('crateWood');
        const awningMaterial = WorldGenerator.getDecorationMaterial('awningCloth');
        group.rotation.y = rotation;

        for (const x of [-0.34, 0.34]) {
            for (const z of [-0.26, 0.26]) {
                const post = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.72, 0.05), wood);
                post.position.set(x, 0.36, z);
                group.add(post);
            }
        }

        const counter = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.24, 0.42), counterMaterial);
        counter.position.set(0, 0.28, 0.04);
        group.add(counter);

        const awning = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.08, 0.62), awningMaterial);
        awning.position.set(0, 0.78, 0);
        awning.rotation.x = -0.1;
        group.add(awning);
    }

    addDecorWoodpile(group) {
        const wood = WorldGenerator.getDecorationMaterial('barrelWood');
        const logGeometry = new THREE.CylinderGeometry(0.055, 0.065, 0.56, 7);
        for (let row = 0; row < 2; row++) {
            for (let index = 0; index < 3; index++) {
                const log = new THREE.Mesh(logGeometry, wood);
                log.rotation.z = Math.PI / 2;
                log.position.set(0, 0.08 + row * 0.1, -0.2 + index * 0.2);
                group.add(log);
            }
        }
        const top = new THREE.Mesh(logGeometry, wood);
        top.rotation.z = Math.PI / 2;
        top.position.set(0, 0.28, 0);
        group.add(top);
    }

    addDecorBoulder(group) {
        const stone = WorldGenerator.getDecorationMaterial('stoneGrey');
        const first = new THREE.Mesh(new THREE.SphereGeometry(0.27, 8, 6), stone);
        first.position.set(-0.08, 0.15, 0.02);
        first.scale.set(1.12, 0.55, 0.86);
        group.add(first);

        const second = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 5), stone);
        second.position.set(0.2, 0.11, -0.1);
        second.scale.set(0.9, 0.52, 1.08);
        group.add(second);
    }

    addDecorCart(group, rotation = 0) {
        const wood = WorldGenerator.getDecorationMaterial('crateWood');
        const darkWood = WorldGenerator.getDecorationMaterial('darkWood');
        group.rotation.y = rotation;

        const bed = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.22, 0.42), wood);
        bed.position.y = 0.28;
        group.add(bed);

        for (const x of [-0.24, 0.24]) {
            const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.06, 10), darkWood);
            wheel.rotation.z = Math.PI / 2;
            wheel.position.set(x, 0.16, -0.26);
            group.add(wheel);
        }

        for (const x of [-0.18, 0.18]) {
            const handle = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.48), darkWood);
            handle.position.set(x, 0.28, 0.42);
            handle.rotation.x = -0.18;
            group.add(handle);
        }
    }

    addDecorGarden(group) {
        const soil = WorldGenerator.getDecorationMaterial('soil');
        const leaf = WorldGenerator.getDecorationMaterial('leaf');
        const flowerKeys = ['flowerPink', 'flowerGold', 'flowerLilac', 'flowerSky'];
        const bed = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.06, 0.78), soil);
        bed.position.y = 0.03;
        group.add(bed);

        for (const x of [-0.22, 0.22]) {
            for (const z of [-0.22, 0.22]) {
                const sprout = new THREE.Mesh(new THREE.SphereGeometry(0.11, 7, 5), leaf);
                sprout.position.set(x, 0.16, z);
                sprout.scale.set(1, 0.62, 1);
                group.add(sprout);

                const flowerIndex = ((x > 0 ? 1 : 0) + (z > 0 ? 2 : 0) + Math.floor(group.userData.lifePhase)) % flowerKeys.length;
                const flower = new THREE.Mesh(
                    new THREE.SphereGeometry(0.065, 7, 5),
                    WorldGenerator.getDecorationMaterial(flowerKeys[flowerIndex])
                );
                flower.position.set(x, 0.25, z);
                flower.scale.y = 0.7;
                group.add(flower);
            }
        }
    }

    addDecorFountain(group) {
        const stone = WorldGenerator.getDecorationMaterial('stoneLight');
        const stoneDark = WorldGenerator.getDecorationMaterial('stoneGrey');
        const water = WorldGenerator.getDecorationMaterial('waterBright');
        const accent = WorldGenerator.getDistrictAccentMaterial(group.userData.accent) ||
            WorldGenerator.getDecorationMaterial('bannerBlue');
        const basin = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.54, 0.22, 12), stoneDark);
        basin.position.y = 0.11;
        group.add(basin);
        const innerWater = new THREE.Mesh(new THREE.CylinderGeometry(0.41, 0.41, 0.035, 12), water);
        innerWater.position.y = 0.235;
        group.add(innerWater);
        const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.2, 0.52, 8), stone);
        pedestal.position.y = 0.48;
        group.add(pedestal);
        const crown = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 6), accent);
        crown.position.y = 0.78;
        group.add(crown);
        const jet = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.055, 0.48, 7), water);
        jet.position.y = 1.04;
        group.add(jet);
        const spray = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 5), water);
        spray.position.y = 1.29;
        spray.scale.set(1.45, 0.5, 1.45);
        group.add(spray);
        group.userData.waterPulse = jet;
        group.userData.landmarkKind = 'fountain';
    }

    addDecorArchway(group, rotation = 0) {
        const stone = WorldGenerator.getDecorationMaterial(
            group.userData.district === 'garden' ? 'stoneMoss' : 'stoneLight'
        );
        const accent = WorldGenerator.getDistrictAccentMaterial(group.userData.accent) ||
            WorldGenerator.getDecorationMaterial('bannerBlue');
        group.rotation.y = rotation;
        for (const x of [-0.43, 0.43]) {
            const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.28, 0.22), stone);
            pillar.position.set(x, 0.64, 0);
            group.add(pillar);
            const cap = new THREE.Mesh(new THREE.BoxGeometry(0.29, 0.13, 0.3), accent);
            cap.position.set(x, 1.27, 0);
            group.add(cap);
        }
        const arch = new THREE.Mesh(new THREE.TorusGeometry(0.43, 0.1, 7, 18, Math.PI), stone);
        arch.position.y = 1.29;
        group.add(arch);
        const crest = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.32, 0.12), accent);
        crest.position.set(0, 1.72, 0);
        crest.rotation.z = Math.PI / 4;
        group.add(crest);
        group.userData.landmarkKind = 'archway';
    }

    addDecorBanner(group, rotation = 0) {
        const pole = WorldGenerator.getDecorationMaterial('darkWood');
        const cloth = WorldGenerator.getDistrictAccentMaterial(group.userData.accent) ||
            WorldGenerator.getDecorationMaterial(
                group.userData.district === 'harbor' ? 'bannerBlue' : 'bannerPurple'
            );
        const gold = WorldGenerator.getDecorationMaterial('bannerGold');
        group.rotation.y = rotation;
        const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 1.5, 7), pole);
        mast.position.y = 0.75;
        group.add(mast);
        const crossbar = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.055, 0.055), pole);
        crossbar.position.set(0.24, 1.37, 0);
        group.add(crossbar);
        const flag = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.68, 0.035), cloth);
        flag.position.set(0.25, 1.02, 0);
        group.add(flag);
        const chevron = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.4, 0.05), gold);
        chevron.position.set(0.25, 1.04, -0.025);
        chevron.rotation.z = Math.PI / 4;
        group.add(chevron);
        group.userData.landmarkKind = 'banner';
    }

    addDecorLanternCluster(group, rotation = 0) {
        const metal = WorldGenerator.getDecorationMaterial('darkMetal');
        const glow = WorldGenerator.getDecorationMaterial('lampGlow');
        const accent = WorldGenerator.getDistrictAccentMaterial(group.userData.accent) || metal;
        group.rotation.y = rotation;
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.075, 1.55, 8), metal);
        post.position.y = 0.775;
        group.add(post);
        for (let index = 0; index < 3; index++) {
            const angle = index * Math.PI * 2 / 3;
            const arm = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.045, 0.045), accent);
            arm.position.set(Math.cos(angle) * 0.22, 1.35, Math.sin(angle) * 0.22);
            arm.rotation.y = -angle;
            group.add(arm);
            const lantern = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.25, 0.18), glow);
            lantern.position.set(Math.cos(angle) * 0.48, 1.2, Math.sin(angle) * 0.48);
            group.add(lantern);
        }
        group.userData.landmarkKind = 'lantern-cluster';
    }

    addDecorWaterfall(group, rotation = 0) {
        const water = WorldGenerator.getDecorationMaterial('waterBright');
        const foam = WorldGenerator.getDecorationMaterial('waterFoam');
        const rock = WorldGenerator.getDecorationMaterial('stoneMoss');
        group.rotation.y = rotation;
        const backing = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.9, 0.18), rock);
        backing.position.y = -0.42;
        group.add(backing);
        const cascade = new THREE.Mesh(new THREE.BoxGeometry(0.56, 1.82, 0.08), water);
        cascade.position.set(0, -0.4, -0.12);
        group.add(cascade);
        const topFoam = new THREE.Mesh(new THREE.SphereGeometry(0.3, 7, 5), foam);
        topFoam.position.set(0, 0.48, -0.14);
        topFoam.scale.set(1.45, 0.2, 0.48);
        group.add(topFoam);
        const baseFoam = new THREE.Mesh(new THREE.SphereGeometry(0.36, 7, 5), foam);
        baseFoam.position.set(0, -1.28, -0.22);
        baseFoam.scale.set(1.55, 0.24, 0.62);
        group.add(baseFoam);
        group.userData.waterPulse = cascade;
        group.userData.landmarkKind = 'waterfall';
    }

    addDecorOverlook(group, rotation = 0) {
        const wood = WorldGenerator.getDecorationMaterial('darkWood');
        const deck = WorldGenerator.getDecorationMaterial('crateWood');
        const metal = WorldGenerator.getDecorationMaterial('copperMetal');
        group.rotation.y = rotation;
        const platform = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.12, 0.84), deck);
        platform.position.y = 0.06;
        group.add(platform);
        for (const x of [-0.6, 0, 0.6]) {
            const post = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.62, 0.07), wood);
            post.position.set(x, 0.36, -0.38);
            group.add(post);
        }
        const rail = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.07, 0.07), wood);
        rail.position.set(0, 0.63, -0.38);
        group.add(rail);
        const telescope = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.11, 0.62, 8), metal);
        telescope.position.set(0.28, 0.74, 0);
        telescope.rotation.z = Math.PI / 2 + 0.22;
        group.add(telescope);
        const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, 0.6, 7), wood);
        stand.position.set(0.1, 0.39, 0);
        stand.rotation.z = -0.18;
        group.add(stand);
        group.userData.landmarkKind = 'overlook';
    }

    addDecorWindmill(group, rotation = 0) {
        const stone = WorldGenerator.getDecorationMaterial('stoneLight');
        const wood = WorldGenerator.getDecorationMaterial('darkWood');
        const roof = WorldGenerator.getRoofMaterial('copper', Math.floor(group.userData.lifePhase) % 3);
        group.rotation.y = rotation;
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.52, 1.35, 8), stone);
        body.position.y = 0.68;
        group.add(body);
        const cap = new THREE.Mesh(new THREE.ConeGeometry(0.5, 0.56, 8), roof);
        cap.position.y = 1.63;
        group.add(cap);
        const rotor = new THREE.Group();
        rotor.position.set(0, 1.18, -0.46);
        for (let index = 0; index < 4; index++) {
            const blade = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.72, 0.045), wood);
            blade.position.y = 0.35;
            const arm = new THREE.Group();
            arm.rotation.z = index * Math.PI / 2;
            arm.add(blade);
            rotor.add(arm);
        }
        const hub = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), wood);
        rotor.add(hub);
        group.add(rotor);
        group.userData.rotor = rotor;
        group.userData.landmarkKind = 'windmill';
    }

    addDecorClockTower(group, rotation = 0) {
        const stone = WorldGenerator.getDecorationMaterial('stoneLight');
        const timber = WorldGenerator.getDecorationMaterial('darkWood');
        const clock = WorldGenerator.getDecorationMaterial('clockFace');
        const gold = WorldGenerator.getDecorationMaterial('bannerGold');
        const roof = WorldGenerator.getRoofMaterial('tower', Math.floor(group.userData.lifePhase) % 3);
        group.rotation.y = rotation;
        const base = new THREE.Mesh(new THREE.BoxGeometry(0.72, 1.8, 0.72), stone);
        base.position.y = 0.9;
        group.add(base);
        for (const side of [-1, 1]) {
            const beam = new THREE.Mesh(new THREE.BoxGeometry(0.09, 1.82, 0.78), timber);
            beam.position.x = side * 0.29;
            group.add(beam);
        }
        const roofCap = new THREE.Mesh(new THREE.ConeGeometry(0.58, 0.82, 4), roof);
        roofCap.rotation.y = Math.PI / 4;
        roofCap.position.y = 2.2;
        group.add(roofCap);
        const face = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.045, 16), clock);
        face.rotation.x = Math.PI / 2;
        face.position.set(0, 1.42, -0.385);
        group.add(face);
        for (const angle of [0, Math.PI / 2]) {
            const hand = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.19, 0.035), gold);
            hand.position.set(0, 1.42, -0.42);
            hand.rotation.z = angle;
            group.add(hand);
        }
        group.userData.landmarkKind = 'clock-tower';
    }

    createBuildingState(building) {
        if (!building?.id) return null;

        const state = {
            ...building,
            obstructionTag: building.obstructionTag || building.buildingTag || `building:${building.id}`,
            interiorKeys: new Set(),
            roof: null,
            doors: [],
            wallDecorations: null,
            furniture: null,
            upperFurnitureGroups: [],
            roofVisibleByRange: true,
            groundFloorZ: Math.max(0, Math.floor(building.baseElevation || 0)),
            floorZ: 0,
            roofObstructionZ: 0,
            isOpen: false
        };

        let maxSurfaceY = -Infinity;
        let maxSurfaceZ = -Infinity;
        let minFloorSurfaceY = Infinity;
        let minFloorZ = Infinity;
        const footprint = this.getBuildingFootprint(building);
        for (const { x: localX, y: localY } of footprint.cells) {
                const x = building.x + localX;
                const y = building.y + localY;
                const surface = this.getSurfaceAt(x, y);
                if (!surface) continue;
                const surfaceY = this.getSurfaceWorldY(x, y);
                maxSurfaceY = Math.max(maxSurfaceY, surfaceY);
                maxSurfaceZ = Math.max(maxSurfaceZ, surface.z);

                const isEdge = this.isBuildingEdgeCell(footprint.set, localX, localY);
                const isDoor = building.door?.x === localX && building.door?.y === localY;
                const key = this.getColumnKey(x, y);

                if (!isEdge || isDoor) {
                    state.interiorKeys.add(key);
                    minFloorSurfaceY = Math.min(minFloorSurfaceY, surfaceY);
                    minFloorZ = Math.min(minFloorZ, surface.z);
                }
        }

        if (maxSurfaceY === -Infinity) return null;
        const floorSurfaceY = minFloorSurfaceY === Infinity ? 0.48 : minFloorSurfaceY;
        state.groundFloorZ = Math.max(0, Math.floor(building.baseElevation ?? (minFloorZ === Infinity ? 0 : minFloorZ)));
        state.buildingGroundFloorZ = state.groundFloorZ;
        state.floorZ = state.groundFloorZ;
        state.roofObstructionZ = maxSurfaceZ === -Infinity ? state.floorZ : maxSurfaceZ;
        state.roof = this.createBuildingRoof(building, maxSurfaceY, state);
        state.wallDecorations = this.createBuildingWallDecorations(building, floorSurfaceY, state);
        state.furniture = this.createBuildingFurniture(building, floorSurfaceY);
        state.upperFurnitureGroups = state.furniture?.userData?.upperFurnitureGroups || [];
        if (building.door) {
            const edge = building.door.edge || this.getBuildingEdge(
                building,
                building.door.x,
                building.door.y,
                footprint.set
            ) || 'south';
            const sceneObject = this.createDoorPanel(building, floorSurfaceY, edge);
            const pivot = sceneObject.userData.doorPivot;
            this.threeManager.addToWorld(sceneObject);
            state.doors.push({
                sceneObject,
                pivot,
                worldX: building.x + building.door.x,
                worldY: building.y + building.door.y,
                closedRotation: 0,
                openRotation: this.getDoorOpenRotation(edge),
                currentRotation: 0,
                targetRotation: 0
            });
        }
        return state;
    }

    registerBuildingObstructionGroup(state) {
        const group = this.createObstructionGroup(state.obstructionTag, 'building');
        group.roofState = state;
        for (const key of state.interiorKeys) group.interiorKeys.add(key);
        if (state.furniture) group.sceneObjects.add(state.furniture);
        if (state.wallDecorations) group.sceneObjects.add(state.wallDecorations);

        const footprint = this.getBuildingFootprint(state);
        for (const { x: localX, y: localY } of footprint.cells) {
            const x = state.x + localX;
            const y = state.y + localY;
            this.addColumnTilesToObstructionGroup(group, x, y, (voxel) =>
                voxel.element === ELEMENTS.STRUCTURE
            );
        }

        this.classifyObstructionWallTypes(group);
    }

    registerCityWallObstructionGroup() {
        const cityWallKeys = new Set();
        const cityWallTag = this.getCityWallObstructionTag();
        const group = this.createObstructionGroup(cityWallTag, 'city-wall');

        for (const [key, column] of this.voxelColumnMap.entries()) {
            if (!column.some((voxel) => this.isCityWallVoxel(voxel))) continue;
            cityWallKeys.add(key);
            const { x, y } = this.parseColumnKey(key);
            group.interiorKeys.add(key);
            this.addColumnTilesToObstructionGroup(group, x, y, (voxel) =>
                voxel.element === ELEMENTS.STRUCTURE
            );
        }

        for (const key of cityWallKeys) {
            const { x, y } = this.parseColumnKey(key);
            for (const offset of [
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: -1, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: -1 }
            ]) {
                const neighborX = x + offset.x;
                const neighborY = y + offset.y;
                const neighborKey = this.getColumnKey(neighborX, neighborY);
                const column = this.voxelColumnMap.get(neighborKey) || [];
                if (!column.some((voxel) => this.isCityWallGateVoxel(voxel))) continue;
                group.interiorKeys.add(neighborKey);
                this.addColumnTilesToObstructionGroup(group, neighborX, neighborY, (voxel) =>
                    voxel.element === ELEMENTS.STRUCTURE
                );
            }
        }

        if (group.tiles.size === 0 && group.interiorKeys.size === 0) {
            this.obstructionGroups.delete(cityWallTag);
        } else {
            this.classifyObstructionWallTypes(group);
        }
    }

    createObstructionGroup(tag, type) {
        const normalizedTag = String(tag || `${type}:untagged`);
        if (!this.obstructionGroups.has(normalizedTag)) {
            this.obstructionGroups.set(normalizedTag, {
                tag: normalizedTag,
                type,
                interiorKeys: new Set(),
                tiles: new Set(),
                wallTypeATiles: new Set(),
                wallTypeBTiles: new Set(),
                wallObstructionTiles: new Set(),
                upperObstructionTiles: new Set(),
                sceneObjects: new Set(),
                roofState: null
            });
        }
        return this.obstructionGroups.get(normalizedTag);
    }

    addColumnTilesToObstructionGroup(group, x, y, predicate) {
        const column = this.getVoxelColumnAt(x, y) || [];
        for (const voxel of column) {
            if (!predicate(voxel)) continue;
            const tile = this.getTileAt(x, y, voxel.z);
            if (!tile) continue;
            tile.obstructionTag = group.tag;
            group.tiles.add(tile);
        }
    }

    classifyObstructionWallTypes(group) {
        group.wallTypeATiles.clear();
        group.wallTypeBTiles.clear();
        group.wallObstructionTiles.clear();
        group.upperObstructionTiles.clear();

        const columns = new Map();
        for (const tile of group.tiles || []) {
            const voxel = this.getVoxelAt(tile.gridX, tile.gridY, tile.elevation);
            if (!this.isObstructionWallVoxel(voxel)) {
                if (this.isObstructionHidableVoxel(voxel)) group.upperObstructionTiles.add(tile);
                continue;
            }
            const key = this.getColumnKey(tile.gridX, tile.gridY);
            if (!columns.has(key)) {
                columns.set(key, {
                    gridX: tile.gridX,
                    gridY: tile.gridY,
                    tiles: []
                });
            }
            columns.get(key).tiles.push(tile);
        }

        const wallColumns = [...columns.values()];
        if (wallColumns.length === 0) return;

        const typeAColumns = new Set();
        const typeBColumns = new Set();

        const byAscendingX = [...wallColumns].sort((a, b) =>
            a.gridX - b.gridX || a.gridY - b.gridY
        );
        let minYAtLowerX = Infinity;
        for (let index = 0; index < byAscendingX.length;) {
            const currentX = byAscendingX[index].gridX;
            let nextIndex = index;
            while (nextIndex < byAscendingX.length && byAscendingX[nextIndex].gridX === currentX) {
                nextIndex += 1;
            }
            for (let columnIndex = index; columnIndex < nextIndex; columnIndex += 1) {
                const column = byAscendingX[columnIndex];
                if (minYAtLowerX < column.gridY) typeAColumns.add(column);
            }
            for (let columnIndex = index; columnIndex < nextIndex; columnIndex += 1) {
                minYAtLowerX = Math.min(minYAtLowerX, byAscendingX[columnIndex].gridY);
            }
            index = nextIndex;
        }

        const byDescendingX = [...wallColumns].sort((a, b) =>
            b.gridX - a.gridX || b.gridY - a.gridY
        );
        let maxYAtHigherX = -Infinity;
        for (let index = 0; index < byDescendingX.length;) {
            const currentX = byDescendingX[index].gridX;
            let nextIndex = index;
            while (nextIndex < byDescendingX.length && byDescendingX[nextIndex].gridX === currentX) {
                nextIndex += 1;
            }
            for (let columnIndex = index; columnIndex < nextIndex; columnIndex += 1) {
                const column = byDescendingX[columnIndex];
                if (maxYAtHigherX > column.gridY) typeBColumns.add(column);
            }
            for (let columnIndex = index; columnIndex < nextIndex; columnIndex += 1) {
                maxYAtHigherX = Math.max(maxYAtHigherX, byDescendingX[columnIndex].gridY);
            }
            index = nextIndex;
        }

        const center = wallColumns.reduce((accumulator, column) => {
            accumulator.x += column.gridX;
            accumulator.y += column.gridY;
            return accumulator;
        }, { x: 0, y: 0 });
        center.x /= wallColumns.length;
        center.y /= wallColumns.length;
        const centerDepth = center.x + center.y;

        for (const column of wallColumns) {
            const isTypeA = typeAColumns.has(column);
            const isTypeB = typeBColumns.has(column);
            const targetSet = isTypeA && !isTypeB
                ? group.wallTypeATiles
                : isTypeB && !isTypeA
                    ? group.wallTypeBTiles
                    : column.gridX + column.gridY >= centerDepth
                        ? group.wallTypeATiles
                        : group.wallTypeBTiles;
            for (const tile of column.tiles) {
                targetSet.add(tile);
                group.wallObstructionTiles.add(tile);
            }
        }
    }

    getObstructionGroupsAt(x, y) {
        const grid = this.toGridPosition(x, y);
        const key = this.getColumnKey(grid.gridX, grid.gridY);
        return [...this.obstructionGroups.values()].filter((group) =>
            group.interiorKeys.has(key)
        );
    }

    getObstructionGroups() {
        return [...this.obstructionGroups.values()];
    }

    getCityWallObstructionTag() {
        const townId = this.voxelMatrix?.sourceTown?.id ||
            this.voxelMatrix?.townName ||
            'current-town';
        return `city-wall:${townId}`;
    }

    parseColumnKey(key) {
        const [x, y] = String(key).split(',').map(Number);
        return { x, y };
    }

    isObstructionHidableVoxel(voxel) {
        return voxel?.element === ELEMENTS.STRUCTURE;
    }

    isObstructionWallVoxel(voxel) {
        if (voxel?.element !== ELEMENTS.STRUCTURE) return false;
        return [
            BUILDING_PARTS.WALL,
            BUILDING_PARTS.WINDOW_LOWER_NORTH,
            BUILDING_PARTS.WINDOW_LOWER_SOUTH,
            BUILDING_PARTS.WINDOW_LOWER_WEST,
            BUILDING_PARTS.WINDOW_LOWER_EAST,
            BUILDING_PARTS.WINDOW_UPPER_NORTH,
            BUILDING_PARTS.WINDOW_UPPER_SOUTH,
            BUILDING_PARTS.WINDOW_UPPER_WEST,
            BUILDING_PARTS.WINDOW_UPPER_EAST,
            BUILDING_PARTS.CITY_WALL_STAIRS_NORTH,
            BUILDING_PARTS.CITY_WALL_STAIRS_SOUTH,
            BUILDING_PARTS.CITY_WALL_STAIRS_WEST,
            BUILDING_PARTS.CITY_WALL_STAIRS_EAST
        ].includes(voxel.building);
    }

    isCityWallVoxel(voxel) {
        return voxel?.element === ELEMENTS.STRUCTURE &&
            (voxel.textureValue === 1 || [
                BUILDING_PARTS.CITY_WALL_WALKWAY,
                BUILDING_PARTS.CITY_WALL_STAIRS_NORTH,
                BUILDING_PARTS.CITY_WALL_STAIRS_SOUTH,
                BUILDING_PARTS.CITY_WALL_STAIRS_WEST,
                BUILDING_PARTS.CITY_WALL_STAIRS_EAST
            ].includes(voxel.building));
    }

    isCityWallInteriorVoxel(voxel) {
        return voxel?.definition?.walkable &&
            [
                BUILDING_PARTS.CITY_WALL_WALKWAY,
                BUILDING_PARTS.CITY_WALL_STAIRS_NORTH,
                BUILDING_PARTS.CITY_WALL_STAIRS_SOUTH,
                BUILDING_PARTS.CITY_WALL_STAIRS_WEST,
                BUILDING_PARTS.CITY_WALL_STAIRS_EAST
            ].includes(voxel.building);
    }

    isCityWallGateVoxel(voxel) {
        return voxel?.element === ELEMENTS.STRUCTURE &&
            voxel?.definition?.walkable &&
            [
            BUILDING_PARTS.DOOR,
            BUILDING_PARTS.FLOOR,
            BUILDING_PARTS.GROUND_FLOOR,
            BUILDING_PARTS.CITY_WALL_WALKWAY,
                BUILDING_PARTS.CITY_WALL_STAIRS_NORTH,
                BUILDING_PARTS.CITY_WALL_STAIRS_SOUTH,
                BUILDING_PARTS.CITY_WALL_STAIRS_WEST,
                BUILDING_PARTS.CITY_WALL_STAIRS_EAST
            ].includes(voxel.building);
    }

    createBuildingRoof(building, surfaceY, state) {
        const roof = new THREE.Group();
        const visualSeed = WorldGenerator.hashVisualSeed(
            `${this.voxelMatrix?.world?.contentHash || this.voxelMatrix?.contentHash || this.voxelMatrix?.seed || 0}:${building.id}:${building.roofStyle || building.style || 'timber'}`
        );
        roof.position.set(
            building.x + (building.width - 1) / 2,
            surfaceY + 0.23,
            building.y + (building.height - 1) / 2
        );
        roof.userData.buildingId = building.id;
        roof.userData.obstructionZ = state?.roofObstructionZ ??
            Math.max(0, Math.floor(surfaceY - this.getTopSurfaceOffset()));
        roof.userData.architectureStyle = building.architectureStyle || building.roofStyle || building.style;
        roof.userData.motionPhase = (visualSeed % 6283) / 1000;

        const roofMaterial = WorldGenerator.getRoofMaterial(
            building.roofStyle || building.architectureStyle || building.style,
            visualSeed % 4
        );
        const trimMaterial = WorldGenerator.getDistrictAccentMaterial(building.districtPalette?.accent) ||
            WorldGenerator.getTrimMaterial(building.style);
        const tileGeometry = new THREE.BoxGeometry(0.98, 0.38, 0.98);
        const parapetHorizontal = new THREE.BoxGeometry(0.98, 0.28, 0.16);
        const parapetVertical = new THREE.BoxGeometry(0.16, 0.28, 0.98);
        const startX = -(building.width - 1) / 2;
        const startZ = -(building.height - 1) / 2;

        const footprint = this.getBuildingFootprint(building);
        const architecture = String(building.architectureStyle || '').toLowerCase();
        const roofStyle = String(building.roofStyle || '').toLowerCase();
        const isTower = building.archetype === 'tower' || architecture === 'tower' || roofStyle === 'tower';
        const isGabled = ['gabled', 'bayfront', 'crosswing', 'lean-to'].includes(architecture) ||
            ['gabled', 'clay', 'copper', 'thatch'].includes(roofStyle);

        if (isTower) {
            const radius = Math.max(1.3, Math.min(building.width, building.height) * 0.58);
            const cap = new THREE.Mesh(new THREE.ConeGeometry(radius, 2.28, 4), roofMaterial);
            cap.rotation.y = Math.PI / 4;
            cap.position.y = 1.12;
            roof.add(cap);
            const crown = new THREE.Mesh(new THREE.BoxGeometry(radius * 1.18, 0.22, radius * 1.18), trimMaterial);
            crown.position.y = 0.08;
            roof.add(crown);
            const finial = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), trimMaterial);
            finial.position.y = 2.34;
            roof.add(finial);
        } else if (isGabled && !['courtyard', 'market', 'arcade'].includes(architecture)) {
            const ridgeAlongZ = building.height >= building.width;
            const span = ridgeAlongZ ? building.width : building.height;
            const run = Math.max(1, span / 2 + 0.35);
            const length = (ridgeAlongZ ? building.height : building.width) + 0.7;
            const rise = Math.min(1.85, 0.72 + span * 0.16);
            const angle = Math.atan2(rise, run);
            const slabLength = Math.hypot(run, rise);
            for (const side of [-1, 1]) {
                const geometry = ridgeAlongZ
                    ? new THREE.BoxGeometry(slabLength, 0.18, length)
                    : new THREE.BoxGeometry(length, 0.18, slabLength);
                const slab = new THREE.Mesh(geometry, roofMaterial);
                if (ridgeAlongZ) {
                    slab.position.set(side * run * 0.48, rise * 0.48, 0);
                    slab.rotation.z = -side * angle;
                } else {
                    slab.position.set(0, rise * 0.48, side * run * 0.48);
                    slab.rotation.x = side * angle;
                }
                roof.add(slab);
            }
            const ridge = new THREE.Mesh(
                new THREE.BoxGeometry(ridgeAlongZ ? 0.18 : length, 0.2, ridgeAlongZ ? length : 0.18),
                trimMaterial
            );
            ridge.position.y = rise + 0.05;
            roof.add(ridge);
        } else for (const { x: localX, y: localY } of footprint.cells) {
                const roofCell = new THREE.Group();
                roofCell.position.set(startX + localX, 0, startZ + localY);
                const roofTile = new THREE.Mesh(tileGeometry, roofMaterial);
                roofTile.position.y = 0.2;
                roofCell.add(roofTile);

                if (!footprint.set.has(`${localX},${localY - 1}`) || !footprint.set.has(`${localX},${localY + 1}`)) {
                    const parapet = new THREE.Mesh(parapetHorizontal, trimMaterial);
                    parapet.position.y = 0.3;
                    roofCell.add(parapet);
                }
                if (!footprint.set.has(`${localX - 1},${localY}`) || !footprint.set.has(`${localX + 1},${localY}`)) {
                    const parapet = new THREE.Mesh(parapetVertical, trimMaterial);
                    parapet.position.y = 0.3;
                    roofCell.add(parapet);
                }

                roof.add(roofCell);
        }

        // A continuous eave/fascia band closes the seam below sloped roofs.
        // It is deliberately anchored to the footprint instead of the roof
        // pitch, so irregular WFC building shells never expose their top row.
        for (const { x: localX, y: localY } of footprint.cells) {
            const x = startX + localX;
            const z = startZ + localY;
            if (!footprint.set.has(`${localX},${localY - 1}`)) {
                const fascia = new THREE.Mesh(parapetHorizontal, trimMaterial);
                fascia.position.set(x, 0.02, z - 0.42);
                roof.add(fascia);
            }
            if (!footprint.set.has(`${localX},${localY + 1}`)) {
                const fascia = new THREE.Mesh(parapetHorizontal, trimMaterial);
                fascia.position.set(x, 0.02, z + 0.42);
                roof.add(fascia);
            }
            if (!footprint.set.has(`${localX - 1},${localY}`)) {
                const fascia = new THREE.Mesh(parapetVertical, trimMaterial);
                fascia.position.set(x - 0.42, 0.02, z);
                roof.add(fascia);
            }
            if (!footprint.set.has(`${localX + 1},${localY}`)) {
                const fascia = new THREE.Mesh(parapetVertical, trimMaterial);
                fascia.position.set(x + 0.42, 0.02, z);
                roof.add(fascia);
            }
        }

        this.addRoofSilhouetteDetails(roof, building, {
            roofMaterial,
            trimMaterial,
            visualSeed,
            isTower,
            isGabled
        });

        roof.traverse((child) => {
            child.castShadow = true;
            child.receiveShadow = true;
            child.raycast = () => {};
            child.renderOrder = 12;
        });
        this.threeManager.addToWorld(roof);
        return roof;
    }

    addRoofSilhouetteDetails(roof, building, options) {
        const { roofMaterial, trimMaterial, visualSeed, isTower, isGabled } = options;
        const architecture = String(building.architectureStyle || '').toLowerCase();
        const district = String(building.district || '').toLowerCase();
        const archetype = String(building.archetype || '').toLowerCase();
        const accent = WorldGenerator.getDistrictAccentMaterial(building.districtPalette?.accent) || trimMaterial;
        const width = Math.max(1, building.width || 1);
        const height = Math.max(1, building.height || 1);
        const isLighthouse = building.blueprintId === 'lighthouse';

        if (isLighthouse) {
            const gallery = new THREE.Mesh(
                new THREE.CylinderGeometry(0.62, 0.68, 0.16, 10),
                WorldGenerator.getDecorationMaterial('darkMetal')
            );
            gallery.position.y = 2.18;
            roof.add(gallery);
            const lanternRoom = new THREE.Mesh(
                new THREE.CylinderGeometry(0.42, 0.46, 0.58, 10),
                WorldGenerator.getDecorationMaterial('windowGlow')
            );
            lanternRoom.position.y = 2.52;
            roof.add(lanternRoom);
            const beaconCap = new THREE.Mesh(
                new THREE.ConeGeometry(0.54, 0.46, 8),
                roofMaterial
            );
            beaconCap.position.y = 3.03;
            roof.add(beaconCap);
            const beacon = new THREE.Mesh(
                new THREE.SphereGeometry(0.16, 10, 8),
                WorldGenerator.getDecorationMaterial('lampGlow')
            );
            beacon.position.y = 2.56;
            roof.add(beacon);
            const coastalBand = new THREE.Mesh(
                new THREE.CylinderGeometry(0.7, 0.7, 0.18, 10),
                WorldGenerator.getDecorationMaterial('brickWarm')
            );
            coastalBand.position.y = 0.2;
            roof.add(coastalBand);
        } else if (isTower || (district === 'civic' && ['hall', 'tower'].includes(archetype))) {
            const clock = WorldGenerator.getDecorationMaterial('clockFace');
            const gold = WorldGenerator.getDecorationMaterial('bannerGold');
            const face = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.045, 18), clock);
            face.rotation.x = Math.PI / 2;
            face.position.set(0, -0.38, -height / 2 - 0.035);
            roof.add(face);
            const rim = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.035, 6, 18), gold);
            rim.position.copy(face.position);
            roof.add(rim);
            for (const [angle, length] of [[0.25, 0.22], [2.0, 0.15]]) {
                const hand = new THREE.Mesh(new THREE.BoxGeometry(0.035, length, 0.035), gold);
                hand.position.copy(face.position);
                hand.position.z -= 0.035;
                hand.rotation.z = angle;
                roof.add(hand);
            }
            for (const side of [-1, 1]) {
                const pennantPole = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.72, 6), trimMaterial);
                pennantPole.position.set(side * Math.min(width * 0.28, 1.1), 1.75, 0);
                roof.add(pennantPole);
                const pennant = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.22, 0.035), accent);
                pennant.position.set(side * Math.min(width * 0.28, 1.1) + 0.18, 1.95, 0);
                roof.add(pennant);
            }
        }

        if (isGabled && Math.max(width, height) >= 4) {
            const ridgeAlongZ = height >= width;
            const dormer = new THREE.Group();
            const dormerWall = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.5, 0.56), trimMaterial);
            dormerWall.position.y = 0.54;
            dormer.add(dormerWall);
            const dormerRoof = new THREE.Mesh(new THREE.ConeGeometry(0.52, 0.48, 4), roofMaterial);
            dormerRoof.rotation.y = Math.PI / 4;
            dormerRoof.scale.set(1, 1, 0.82);
            dormerRoof.position.y = 0.99;
            dormer.add(dormerRoof);
            const dormerWindow = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.26, 0.04), WorldGenerator.getDecorationMaterial('windowGlow'));
            dormerWindow.position.set(0, 0.58, -0.3);
            dormer.add(dormerWindow);
            if (!ridgeAlongZ) dormer.rotation.y = Math.PI / 2;
            roof.add(dormer);
        }

        if (!isTower && (visualSeed % 3 === 0 || ['artisan', 'harbor'].includes(district))) {
            const chimney = new THREE.Group();
            const brick = WorldGenerator.getDecorationMaterial('brickWarm');
            const stack = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.92, 0.34), brick);
            stack.position.y = 0.72;
            chimney.add(stack);
            const cap = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.14, 0.44), trimMaterial);
            cap.position.y = 1.2;
            chimney.add(cap);
            chimney.position.set(
                ((visualSeed >>> 8) % 2 ? 1 : -1) * Math.min(1.15, width * 0.22),
                0,
                ((visualSeed >>> 10) % 2 ? 1 : -1) * Math.min(0.9, height * 0.18)
            );
            roof.add(chimney);
        }

        if (!isTower && ['stepped', 'market', 'courtyard', 'arcade'].includes(architecture)) {
            const canopy = new THREE.Mesh(
                new THREE.BoxGeometry(Math.min(2.2, width * 0.55), 0.16, Math.min(1.5, height * 0.48)),
                accent
            );
            canopy.position.y = 0.72;
            roof.add(canopy);
            for (const x of [-0.72, 0.72]) {
                const post = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.7, 0.08), trimMaterial);
                post.position.set(x * Math.min(1, width / 4), 0.35, 0);
                roof.add(post);
            }
        }

        if (archetype === 'workshop' && visualSeed % 5 === 0) {
            const rotor = new THREE.Group();
            rotor.position.set(0, 0.72, -height / 2 - 0.12);
            for (let index = 0; index < 4; index++) {
                const arm = new THREE.Group();
                arm.rotation.z = index * Math.PI / 2;
                const blade = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.72, 0.05), trimMaterial);
                blade.position.y = 0.34;
                arm.add(blade);
                rotor.add(arm);
            }
            const hub = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 6), accent);
            rotor.add(hub);
            roof.add(rotor);
            roof.userData.rotor = rotor;
        }
    }

    createBuildingWallDecorations(building, floorSurfaceY, state) {
        const group = new THREE.Group();
        group.userData.buildingId = building.id;
        const footprint = this.getBuildingFootprint(building);
        const visualSeed = WorldGenerator.hashVisualSeed(
            `${this.voxelMatrix?.seed || 0}:${building.id}:facade:${building.facadeVariant || 0}`
        );
        const district = String(building.district || 'residential').toLowerCase();
        const archetype = String(building.archetype || 'cottage').toLowerCase();
        const baseY = Math.max(0, Number(building.baseElevation) || 0) + this.getTopSurfaceOffset();
        const wallHeight = Math.max(1.65, Math.max(1, Number(building.stories) || 1) * 1.72);
        const accent = WorldGenerator.getDistrictAccentMaterial(building.districtPalette?.accent) ||
            WorldGenerator.getDecorationMaterial('bannerBlue');
        const edgeCells = footprint.cells
            .map((cell) => ({ ...cell, edge: this.getBuildingEdge(building, cell.x, cell.y, footprint.set) }))
            .filter((cell) => cell.edge)
            .sort((a, b) => {
                const seedA = WorldGenerator.hashVisualSeed(`${visualSeed}:${a.x}:${a.y}`);
                const seedB = WorldGenerator.hashVisualSeed(`${visualSeed}:${b.x}:${b.y}`);
                return seedA - seedB;
            });
        const frontEdge = building.door?.edge || edgeCells[0]?.edge || 'south';
        const frontCells = edgeCells.filter((cell) => cell.edge === frontEdge);

        const bannerCount = district === 'civic' ? 2 : ['market', 'harbor'].includes(district) ? 1 : 0;
        for (const cell of frontCells.slice(0, bannerCount)) {
            const banner = this.createFacadeBanner(accent);
            this.placeFacadeAttachment(banner, building, cell, baseY + wallHeight * 0.62, 0.525);
            group.add(banner);
        }

        if (['market', 'harbor'].includes(district) || building.activity === 'trade') {
            for (const cell of frontCells.slice(0, Math.min(3, Math.max(1, frontCells.length)))) {
                if (building.door?.x === cell.x && building.door?.y === cell.y) continue;
                const awning = this.createFacadeAwning(accent, visualSeed + cell.x * 13 + cell.y * 29);
                this.placeFacadeAttachment(awning, building, cell, baseY + wallHeight * 0.46, 0.68);
                group.add(awning);
            }
        } else if (['garden', 'residential'].includes(district)) {
            for (const cell of frontCells.slice(0, 3)) {
                if (building.door?.x === cell.x && building.door?.y === cell.y) continue;
                const flowerBox = this.createFacadeFlowerBox(visualSeed + cell.x * 17 + cell.y * 37);
                this.placeFacadeAttachment(flowerBox, building, cell, baseY + wallHeight * 0.38, 0.56);
                group.add(flowerBox);
            }
        }

        if (building.door) {
            const doorCell = { x: building.door.x, y: building.door.y, edge: frontEdge };
            const lantern = this.createFacadeLantern();
            this.placeFacadeAttachment(lantern, building, doorCell, baseY + Math.min(1.5, wallHeight * 0.7), 0.64, 0.34);
            group.add(lantern);
            if ((district === 'civic' && ['hall', 'tower'].includes(archetype)) || building.architectureStyle === 'gatehouse') {
                const portal = this.createFacadePortal(accent);
                this.placeFacadeAttachment(portal, building, doorCell, baseY, 0.6);
                group.add(portal);
            }
        }

        group.userData.lifePhase = (visualSeed % 6283) / 1000;
        group.userData.obstructionZ = state?.roofObstructionZ || 0;
        group.traverse((child) => {
            child.castShadow = !child.material?.transparent;
            child.receiveShadow = true;
            child.raycast = () => {};
        });
        this.threeManager.addToWorld(group);
        return group;
    }

    placeFacadeAttachment(object, building, cell, worldY, outward = 0.54, tangentOffset = 0) {
        const edge = cell.edge || 'south';
        const normal = edge === 'north' ? { x: 0, z: -1 }
            : edge === 'south' ? { x: 0, z: 1 }
                : edge === 'west' ? { x: -1, z: 0 }
                    : { x: 1, z: 0 };
        const tangent = edge === 'north' || edge === 'south' ? { x: 1, z: 0 } : { x: 0, z: 1 };
        object.position.set(
            building.x + cell.x + normal.x * outward + tangent.x * tangentOffset,
            worldY,
            building.y + cell.y + normal.z * outward + tangent.z * tangentOffset
        );
        object.rotation.y = edge === 'east' || edge === 'west' ? Math.PI / 2 : 0;
    }

    createFacadeBanner(material) {
        const group = new THREE.Group();
        const pole = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.05, 0.05), WorldGenerator.getDecorationMaterial('darkWood'));
        pole.position.y = 0.36;
        group.add(pole);
        const cloth = new THREE.Mesh(new THREE.BoxGeometry(0.43, 0.72, 0.035), material);
        group.add(cloth);
        const emblem = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.38, 0.045), WorldGenerator.getDecorationMaterial('bannerGold'));
        emblem.position.z = -0.03;
        emblem.rotation.z = Math.PI / 4;
        group.add(emblem);
        return group;
    }

    createFacadeAwning(material, seed) {
        const group = new THREE.Group();
        const cloth = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.09, 0.54), material);
        cloth.position.z = 0.2;
        cloth.rotation.x = -0.14;
        group.add(cloth);
        const stripe = new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 0.045, 0.58),
            WorldGenerator.getDecorationMaterial(seed % 2 ? 'awningCream' : 'bannerGold')
        );
        stripe.position.set(((seed >>> 3) % 3 - 1) * 0.24, -0.02, 0.21);
        stripe.rotation.x = -0.14;
        group.add(stripe);
        return group;
    }

    createFacadeFlowerBox(seed) {
        const group = new THREE.Group();
        const planter = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.16, 0.2), WorldGenerator.getDecorationMaterial('crateWood'));
        group.add(planter);
        const flowerKeys = ['flowerPink', 'flowerGold', 'flowerLilac', 'flowerSky'];
        for (let index = 0; index < 5; index++) {
            const bloom = new THREE.Mesh(
                new THREE.SphereGeometry(0.075, 6, 4),
                WorldGenerator.getDecorationMaterial(flowerKeys[(seed + index) % flowerKeys.length])
            );
            bloom.position.set(-0.25 + index * 0.125, 0.14 + (index % 2) * 0.035, -0.06);
            bloom.scale.y = 0.72;
            group.add(bloom);
        }
        return group;
    }

    createFacadeLantern() {
        const group = new THREE.Group();
        const metal = WorldGenerator.getDecorationMaterial('darkMetal');
        const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.42), metal);
        bracket.position.z = 0.2;
        group.add(bracket);
        const lantern = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.28, 0.2), WorldGenerator.getDecorationMaterial('lampGlow'));
        lantern.position.set(0, -0.18, 0.42);
        group.add(lantern);
        return group;
    }

    createFacadePortal(accent) {
        const group = new THREE.Group();
        const stone = WorldGenerator.getDecorationMaterial('stoneLight');
        for (const x of [-0.48, 0.48]) {
            const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.72, 0.18), stone);
            pillar.position.set(x, 0.86, 0);
            group.add(pillar);
        }
        const arch = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.09, 7, 18, Math.PI), stone);
        arch.position.y = 1.7;
        group.add(arch);
        const crest = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.3, 0.09), accent);
        crest.position.set(0, 2.12, 0);
        crest.rotation.z = Math.PI / 4;
        group.add(crest);
        return group;
    }

    getBuildingFootprint(building) {
        const cells = Array.isArray(building.footprintCells) && building.footprintCells.length > 0
            ? building.footprintCells
                .map((cell) => ({ x: Math.floor(cell.x), y: Math.floor(cell.y) }))
                .filter((cell) => cell.x >= 0 && cell.y >= 0 && cell.x < building.width && cell.y < building.height)
            : Array.from({ length: building.height }, (_, y) =>
                Array.from({ length: building.width }, (_, x) => ({ x, y }))
            ).flat();
        const set = new Set(cells.map((cell) => `${cell.x},${cell.y}`));
        return { cells, set };
    }

    isBuildingEdgeCell(cellSet, localX, localY) {
        return !cellSet.has(`${localX},${localY - 1}`) ||
            !cellSet.has(`${localX + 1},${localY}`) ||
            !cellSet.has(`${localX},${localY + 1}`) ||
            !cellSet.has(`${localX - 1},${localY}`);
    }

    getBuildingEdge(building, localX, localY, footprintSet = null) {
        if (building?.door?.x === localX && building?.door?.y === localY && building.door.edge) return building.door.edge;
        if (footprintSet) {
            const candidates = [
                ['north', `${localX},${localY - 1}`],
                ['east', `${localX + 1},${localY}`],
                ['south', `${localX},${localY + 1}`],
                ['west', `${localX - 1},${localY}`]
            ];
            const exposed = candidates.find(([, key]) => !footprintSet.has(key));
            if (exposed) return exposed[0];
        }
        if (localY === 0) return 'north';
        if (localY === building.height - 1) return 'south';
        if (localX === 0) return 'west';
        if (localX === building.width - 1) return 'east';
        return null;
    }

    createDoorPanel(building, floorSurfaceY, edge) {
        const group = new THREE.Group();
        const pivot = new THREE.Group();
        const doorHeight = 1.84;
        const doorWidth = 0.84;
        const thickness = 0.09;
        const frameHeight = 2.12;
        const frameThickness = 0.16;
        const isNorthSouth = edge === 'north' || edge === 'south';
        const material = WorldGenerator.getDoorMaterial(building.doorStyle);
        const accentMaterial = WorldGenerator.getDoorAccentMaterial(building.doorStyle);
        const frameMaterial = WorldGenerator.getDoorFrameMaterial(building.style);
        const panel = new THREE.Mesh(
            new THREE.BoxGeometry(isNorthSouth ? doorWidth : thickness, doorHeight, isNorthSouth ? thickness : doorWidth),
            material
        );
        const worldX = building.x + building.door.x;
        const worldY = building.y + building.door.y;
        const wallOffset = 0.52;

        group.position.set(worldX, floorSurfaceY, worldY);
        group.userData.doorPivot = pivot;

        if (edge === 'north') {
            pivot.position.set(-doorWidth / 2, 0, -wallOffset);
            panel.position.x = doorWidth / 2;
        } else if (edge === 'south') {
            pivot.position.set(doorWidth / 2, 0, wallOffset);
            panel.position.x = -doorWidth / 2;
        } else if (edge === 'west') {
            pivot.position.set(-wallOffset, 0, doorWidth / 2);
            panel.position.z = -doorWidth / 2;
        } else if (edge === 'east') {
            pivot.position.set(wallOffset, 0, -doorWidth / 2);
            panel.position.z = doorWidth / 2;
        }

        panel.position.y = doorHeight / 2;
        panel.castShadow = true;
        panel.raycast = () => {};
        pivot.add(panel);
        group.add(pivot);

        const jambGeometry = new THREE.BoxGeometry(
            isNorthSouth ? frameThickness : frameThickness,
            frameHeight,
            isNorthSouth ? frameThickness : frameThickness
        );
        const lintelGeometry = new THREE.BoxGeometry(
            isNorthSouth ? 1.08 : frameThickness,
            0.22,
            isNorthSouth ? frameThickness : 1.08
        );
        const thresholdGeometry = new THREE.BoxGeometry(
            isNorthSouth ? 1.08 : 0.18,
            0.08,
            isNorthSouth ? 0.18 : 1.08
        );
        const frameZ = edge === 'north' ? -wallOffset : edge === 'south' ? wallOffset : 0;
        const frameX = edge === 'west' ? -wallOffset : edge === 'east' ? wallOffset : 0;
        const jambOffsets = isNorthSouth
            ? [{ x: -0.54, z: frameZ }, { x: 0.54, z: frameZ }]
            : [{ x: frameX, z: -0.54 }, { x: frameX, z: 0.54 }];

        for (const offset of jambOffsets) {
            const jamb = new THREE.Mesh(jambGeometry, frameMaterial);
            jamb.position.set(offset.x, frameHeight / 2, offset.z);
            jamb.castShadow = true;
            jamb.receiveShadow = true;
            jamb.raycast = () => {};
            group.add(jamb);
        }

        const lintel = new THREE.Mesh(lintelGeometry, frameMaterial);
        lintel.position.set(frameX, frameHeight, frameZ);
        lintel.castShadow = true;
        lintel.receiveShadow = true;
        lintel.raycast = () => {};
        group.add(lintel);

        const threshold = new THREE.Mesh(thresholdGeometry, WorldGenerator.getFloorAccentMaterial(building.style));
        threshold.position.set(frameX, 0.04, frameZ);
        threshold.receiveShadow = true;
        threshold.raycast = () => {};
        group.add(threshold);

        const bandGeometry = new THREE.BoxGeometry(
            isNorthSouth ? doorWidth * 0.82 : thickness * 1.25,
            0.075,
            isNorthSouth ? thickness * 1.25 : doorWidth * 0.82
        );
        for (const y of [0.48, 0.92, 1.36]) {
            const band = new THREE.Mesh(bandGeometry, accentMaterial);
            band.position.copy(panel.position);
            band.position.y = y;
            band.castShadow = true;
            band.raycast = () => {};
            pivot.add(band);
        }

        const knob = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 6), accentMaterial);
        knob.position.copy(panel.position);
        knob.position.y = 0.94;
        if (isNorthSouth) {
            knob.position.x += edge === 'north' ? doorWidth * 0.22 : -doorWidth * 0.22;
            knob.position.z += edge === 'north' ? -0.07 : 0.07;
        } else {
            knob.position.z += edge === 'west' ? -doorWidth * 0.22 : doorWidth * 0.22;
            knob.position.x += edge === 'west' ? -0.07 : 0.07;
        }
        knob.castShadow = true;
        knob.raycast = () => {};
        pivot.add(knob);
        return group;
    }

    getDoorOpenRotation(edge) {
        return (edge === 'north' || edge === 'west' ? -1 : 1) * Math.PI * 0.58;
    }

    createBuildingFurniture(building, floorSurfaceY) {
        const plan = planBuildingFurniture(building, (target, level, roomIndex) =>
            this.hashFurnitureSeed(target, level, roomIndex, this.voxelMatrix?.seed || 0)
        );
        if (!plan.length) return null;

        const group = new THREE.Group();
        group.userData.buildingId = building.id;
        group.userData.upperFurnitureGroups = [];
        group.userData.obstructionZ = Math.max(0, Math.floor(
            building.baseElevation ??
            (Number.isFinite(floorSurfaceY) ? floorSurfaceY - this.getTopSurfaceOffset() : 0)
        ));

        for (const item of plan) {
            const level = Math.max(0, Math.floor(item.level || 0));
            const targetGroup = level > 0
                ? this.getOrCreateUpperFurnitureGroup(group, level)
                : group;
            const floorElevation = Number.isFinite(Number(item.floorElevation))
                ? Number(item.floorElevation)
                : group.userData.obstructionZ + level * 2;
            this.renderFurnitureItem(targetGroup, building, {
                ...item,
                floorElevation
            });
        }

        group.traverse((child) => {
            if (!child.isMesh) return;
            child.castShadow = true;
            child.receiveShadow = true;
            child.raycast = () => {};
        });
        this.threeManager.addToWorld(group);
        return group;
    }

    getOrCreateUpperFurnitureGroup(rootGroup, level) {
        let levelGroup = rootGroup.userData.upperFurnitureGroups.find((candidate) =>
            candidate.userData.upperFloorLevel === level
        );
        if (levelGroup) return levelGroup;

        levelGroup = new THREE.Group();
        levelGroup.userData.upperFloorLevel = level;
        rootGroup.add(levelGroup);
        rootGroup.userData.upperFurnitureGroups.push(levelGroup);
        return levelGroup;
    }

    renderFurnitureItem(group, building, item) {
        const itemGroup = new THREE.Group();
        const x = building.x + item.cell.x;
        const z = building.y + item.cell.y;
        const y = item.floorElevation + this.getTopSurfaceOffset() + FURNITURE_SURFACE_LIFT;
        this.addFurnitureMesh(itemGroup, item.type, 0, y, 0, building.style, item.rotation);
        itemGroup.position.set(x, 0, z);
        itemGroup.rotation.y = item.rotation || 0;
        group.add(itemGroup);
    }

    addFurnitureMesh(group, type, x, y, z, style, rotation = 0) {
        const axis = Math.abs(Math.sin(rotation || 0)) > 0.5 ? 'z' : 'x';
        if (type === 'table') return this.addTable(group, x, y, z, style);
        if (type === 'bench') return this.addBench(group, x, y, z, style, axis);
        if (type === 'bed') return this.addBed(group, x, y, z, style);
        if (type === 'crate') return this.addCrateStack(group, x, y, z, style);
        if (type === 'shelf') return this.addShelf(group, x, y, z, style, axis);
        if (type === 'stool') return this.addStool(group, x, y, z, style);
        if (type === 'rug') return this.addRug(group, x, y, z, style);
        if (type === 'counter') return this.addCounter(group, x, y, z, style);
        if (type === 'hearth') return this.addHearth(group, x, y, z, style);
        return this.addStool(group, x, y, z, style);
    }

    hashFurnitureSeed(building, level = 0, roomIndex = 0, base = 0) {
        const value = `${base}:${building?.obstructionTag || ''}:${building?.id || ''}:${level}:${roomIndex}`;
        let hash = 2166136261;
        for (let i = 0; i < value.length; i++) {
            hash ^= value.charCodeAt(i);
            hash = Math.imul(hash, 16777619);
        }
        return hash >>> 0;
    }

    getFurnitureCells(building) {
        const footprint = this.getBuildingFootprint(building);
        const blocked = new Set((building.stairCells || []).map((cell) => `${Math.floor(cell.x)},${Math.floor(cell.y)}`));
        if (building.door) blocked.add(`${building.door.x},${building.door.y}`);
        return footprint.cells
            .filter((cell) => !this.isBuildingEdgeCell(footprint.set, cell.x, cell.y))
            .filter((cell) => !blocked.has(`${cell.x},${cell.y}`))
            .sort((a, b) => (a.y - b.y) || (a.x - b.x));
    }

    isBuildingStairCell(building, localX, localY, level = null) {
        return (building.stairCells || []).some((cell) =>
            Math.floor(cell.x) === localX &&
            Math.floor(cell.y) === localY &&
            (!Number.isFinite(level) || Math.floor(cell.level || 0) === level)
        );
    }

    addTable(group, x, y, z, style) {
        const material = WorldGenerator.getFurnitureMaterial(style);
        const top = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.12, 0.62), material);
        top.position.set(x, y + 0.34, z);
        group.add(top);
        for (const ox of [-0.32, 0.32]) {
            for (const oz of [-0.24, 0.24]) {
                const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.32, 0.08), material);
                leg.position.set(x + ox, y + 0.17, z + oz);
                group.add(leg);
            }
        }
    }

    addBench(group, x, y, z, style, axis = 'x') {
        const material = WorldGenerator.getFurnitureMaterial(style);
        const bench = new THREE.Mesh(
            new THREE.BoxGeometry(axis === 'x' ? 0.82 : 0.28, 0.18, axis === 'x' ? 0.28 : 0.82),
            material
        );
        bench.position.set(x, y + 0.22, z);
        group.add(bench);
    }

    addCounter(group, x, y, z, style) {
        const material = WorldGenerator.getFurnitureMaterial(style);
        const counter = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.56, 0.42), material);
        counter.position.set(x, y + 0.28, z);
        group.add(counter);
    }

    addBed(group, x, y, z, style) {
        const frameMaterial = WorldGenerator.getFurnitureMaterial(style);
        const blanketMaterial = WorldGenerator.getBlanketMaterial(style);
        const frame = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.24, 0.72), frameMaterial);
        frame.position.set(x, y + 0.15, z);
        group.add(frame);

        const blanket = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.12, 0.54), blanketMaterial);
        blanket.position.set(x + 0.06, y + 0.34, z);
        group.add(blanket);
    }

    addCrateStack(group, x, y, z, style) {
        const material = WorldGenerator.getFurnitureMaterial(style);
        const crateA = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), material);
        crateA.position.set(x, y + 0.21, z);
        group.add(crateA);

        const crateB = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.34, 0.34), material);
        crateB.position.set(x + 0.34, y + 0.17, z + 0.22);
        group.add(crateB);
    }

    addStool(group, x, y, z, style) {
        const material = WorldGenerator.getFurnitureMaterial(style);
        const stool = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.26, 0.34), material);
        stool.position.set(x, y + 0.13, z);
        group.add(stool);
    }

    addRug(group, x, y, z, style) {
        const material = WorldGenerator.getRugMaterial(style);
        const rug = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.035, 0.72), material);
        rug.position.set(x, y + 0.025, z);
        group.add(rug);
    }

    addShelf(group, x, y, z, style, axis = 'x') {
        const material = WorldGenerator.getFurnitureMaterial(style);
        const shelf = new THREE.Mesh(
            new THREE.BoxGeometry(axis === 'x' ? 0.86 : 0.24, 0.92, axis === 'x' ? 0.24 : 0.86),
            material
        );
        shelf.position.set(x, y + 0.46, z);
        group.add(shelf);

        const itemMaterial = WorldGenerator.getShelfItemMaterial(style);
        for (let i = 0; i < 3; i++) {
            const item = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.18, 0.12), itemMaterial);
            item.position.set(
                x + (axis === 'x' ? -0.32 + i * 0.32 : 0),
                y + 0.28 + i * 0.18,
                z + (axis === 'z' ? -0.32 + i * 0.32 : 0)
            );
            group.add(item);
        }
    }

    addPartition(group, x, y, z, style, axis = 'x', length = 1.6) {
        const material = WorldGenerator.getTrimMaterial(style);
        const partition = new THREE.Mesh(
            new THREE.BoxGeometry(axis === 'x' ? Math.min(0.86, length) : 0.08, 0.72, axis === 'x' ? 0.08 : Math.min(0.86, length)),
            material
        );
        partition.position.set(x, y + 0.36, z);
        group.add(partition);
    }

    addHearth(group, x, y, z, style) {
        const stone = WorldGenerator.getDoorFrameMaterial(style);
        const fire = WorldGenerator.getHearthFireMaterial();
        const base = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.34, 0.38), stone);
        base.position.set(x, y + 0.17, z);
        group.add(base);
        const flame = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.12), fire);
        flame.position.set(x, y + 0.42, z);
        group.add(flame);
    }

    static getRoofMaterial(style, variant = 0) {
        if (!WorldGenerator.roofMaterialCache) WorldGenerator.roofMaterialCache = new Map();
        const styleKey = style || 'timber';
        const variantIndex = Math.abs(Math.floor(Number(variant) || 0)) % 4;
        const key = `${styleKey}:${variantIndex}`;
        if (!WorldGenerator.roofMaterialCache.has(key)) {
            const colors = {
                stone: [0x7f8ea6, 0x9b86a8, 0x6f98a2, 0xa28d78],
                timber: [0x8f52ad, 0xc25768, 0x427da0, 0x4f966c],
                clay: [0xe5684c, 0xd84f76, 0xf08a42, 0xb85b8f],
                slate: [0x2d8397, 0x3c69a1, 0x4f58a8, 0x276f78],
                copper: [0x28a694, 0x3db7a6, 0x4b8f86, 0x62b18d],
                thatch: [0xd7b54d, 0xe6c65e, 0xc89d42, 0xe0a94f],
                tower: [0x6657a4, 0x3d8291, 0x874f91, 0x3f6ca8],
                courtyard: [0xc06f47, 0xc75861, 0xb5863d, 0x9f5e8e],
                gabled: [0xd95345, 0x9a55a5, 0x2d8a9b, 0xe0713d],
                market: [0xf0a544, 0xd95b74, 0x4fa4a0, 0x8b62bc]
            };
            const palette = colors[styleKey] || colors.timber;
            WorldGenerator.roofMaterialCache.set(key, new THREE.MeshStandardMaterial({
                color: palette[variantIndex],
                roughness: 0.76,
                metalness: 0.02
            }));
        }
        return WorldGenerator.roofMaterialCache.get(key);
    }

    static hashVisualSeed(value) {
        let hash = 2166136261;
        for (const character of String(value)) {
            hash ^= character.charCodeAt(0);
            hash = Math.imul(hash, 16777619);
        }
        return hash >>> 0;
    }

    static getDistrictAccentMaterial(color) {
        if (!Number.isFinite(Number(color))) return null;
        if (!WorldGenerator.districtAccentMaterialCache) WorldGenerator.districtAccentMaterialCache = new Map();
        const key = Number(color) >>> 0;
        if (!WorldGenerator.districtAccentMaterialCache.has(key)) {
            WorldGenerator.districtAccentMaterialCache.set(key, new THREE.MeshStandardMaterial({
                color: key,
                roughness: 0.68,
                metalness: 0.08
            }));
        }
        return WorldGenerator.districtAccentMaterialCache.get(key);
    }

    static getTerrainDetailMaterial(key) {
        if (!WorldGenerator.terrainDetailMaterialCache) WorldGenerator.terrainDetailMaterialCache = new Map();
        if (!WorldGenerator.terrainDetailMaterialCache.has(key)) {
            const presets = {
                grassLip: { color: 0x79c856, roughness: 0.91, metalness: 0.0 },
                cliffStrata: { color: 0x7f6659, roughness: 0.94, metalness: 0.01 },
                cliffMoss: { color: 0x3e9154, roughness: 0.9, metalness: 0.0 },
                waterfall: {
                    color: 0x53d8ed,
                    emissive: 0x14566a,
                    emissiveIntensity: 0.2,
                    roughness: 0.24,
                    metalness: 0.0,
                    transparent: true,
                    opacity: 0.82,
                    depthWrite: false
                },
                waterFoam: {
                    color: 0xd9fbff,
                    emissive: 0x4ea9b7,
                    emissiveIntensity: 0.15,
                    roughness: 0.34,
                    metalness: 0.0,
                    transparent: true,
                    opacity: 0.82,
                    depthWrite: false
                }
            };
            WorldGenerator.terrainDetailMaterialCache.set(
                key,
                new THREE.MeshStandardMaterial(presets[key] || presets.cliffStrata)
            );
        }
        return WorldGenerator.terrainDetailMaterialCache.get(key);
    }

    static getTrimMaterial(style) {
        if (!WorldGenerator.trimMaterialCache) WorldGenerator.trimMaterialCache = new Map();
        const key = style || 'timber';
        if (!WorldGenerator.trimMaterialCache.has(key)) {
            WorldGenerator.trimMaterialCache.set(key, new THREE.MeshStandardMaterial({
                color: key === 'stone' ? 0xd3d9d2 : 0x5a3421,
                roughness: 0.86,
                metalness: 0.02
            }));
        }
        return WorldGenerator.trimMaterialCache.get(key);
    }

    static getDoorMaterial(style) {
        if (!WorldGenerator.doorMaterialCache) WorldGenerator.doorMaterialCache = new Map();
        const key = style || 'oak';
        const colors = { oak: 0x7b4729, iron: 0x424b52, painted: 0x2f7770 };
        if (!WorldGenerator.doorMaterialCache.has(key)) {
            WorldGenerator.doorMaterialCache.set(key, new THREE.MeshStandardMaterial({
                color: colors[key] || colors.oak,
                roughness: key === 'iron' ? 0.58 : 0.84,
                metalness: key === 'iron' ? 0.42 : 0.03
            }));
        }
        return WorldGenerator.doorMaterialCache.get(key);
    }

    static getDoorAccentMaterial(style) {
        if (!WorldGenerator.doorAccentMaterialCache) WorldGenerator.doorAccentMaterialCache = new Map();
        const key = style || 'oak';
        const colors = { oak: 0x4d2d1c, iron: 0xaab5bd, painted: 0xd7b85f };
        if (!WorldGenerator.doorAccentMaterialCache.has(key)) {
            WorldGenerator.doorAccentMaterialCache.set(key, new THREE.MeshStandardMaterial({
                color: colors[key] || colors.oak,
                roughness: key === 'iron' ? 0.42 : 0.72,
                metalness: key === 'iron' ? 0.62 : 0.08
            }));
        }
        return WorldGenerator.doorAccentMaterialCache.get(key);
    }

    static getDoorFrameMaterial(style) {
        if (!WorldGenerator.doorFrameMaterialCache) WorldGenerator.doorFrameMaterialCache = new Map();
        const key = style || 'timber';
        if (!WorldGenerator.doorFrameMaterialCache.has(key)) {
            WorldGenerator.doorFrameMaterialCache.set(key, new THREE.MeshStandardMaterial({
                color: key === 'stone' ? 0x8e99a2 : 0x6a3d24,
                roughness: 0.84,
                metalness: 0.02
            }));
        }
        return WorldGenerator.doorFrameMaterialCache.get(key);
    }

    static getFloorAccentMaterial(style) {
        if (!WorldGenerator.floorAccentMaterialCache) WorldGenerator.floorAccentMaterialCache = new Map();
        const key = style || 'timber';
        if (!WorldGenerator.floorAccentMaterialCache.has(key)) {
            WorldGenerator.floorAccentMaterialCache.set(key, new THREE.MeshStandardMaterial({
                color: key === 'stone' ? 0xb9c1c8 : 0xb4875e,
                roughness: 0.9,
                metalness: 0.01
            }));
        }
        return WorldGenerator.floorAccentMaterialCache.get(key);
    }

    static getFurnitureMaterial(style) {
        if (!WorldGenerator.furnitureMaterialCache) WorldGenerator.furnitureMaterialCache = new Map();
        const key = style || 'timber';
        if (!WorldGenerator.furnitureMaterialCache.has(key)) {
            WorldGenerator.furnitureMaterialCache.set(key, new THREE.MeshStandardMaterial({
                color: key === 'stone' ? 0x744f36 : 0x8b5a34,
                roughness: 0.88,
                metalness: 0.01
            }));
        }
        return WorldGenerator.furnitureMaterialCache.get(key);
    }

    static getBlanketMaterial(style) {
        if (!WorldGenerator.blanketMaterialCache) WorldGenerator.blanketMaterialCache = new Map();
        const key = style || 'timber';
        if (!WorldGenerator.blanketMaterialCache.has(key)) {
            WorldGenerator.blanketMaterialCache.set(key, new THREE.MeshStandardMaterial({
                color: key === 'stone' ? 0x486a9d : 0x8f3f58,
                roughness: 0.72,
                metalness: 0.01
            }));
        }
        return WorldGenerator.blanketMaterialCache.get(key);
    }

    static getRugMaterial(style) {
        if (!WorldGenerator.rugMaterialCache) WorldGenerator.rugMaterialCache = new Map();
        const key = style || 'timber';
        if (!WorldGenerator.rugMaterialCache.has(key)) {
            WorldGenerator.rugMaterialCache.set(key, new THREE.MeshStandardMaterial({
                color: key === 'stone' ? 0x7d4055 : 0x355f68,
                roughness: 0.92,
                metalness: 0.01
            }));
        }
        return WorldGenerator.rugMaterialCache.get(key);
    }

    static getShelfItemMaterial(style) {
        if (!WorldGenerator.shelfItemMaterialCache) WorldGenerator.shelfItemMaterialCache = new Map();
        const key = style || 'timber';
        if (!WorldGenerator.shelfItemMaterialCache.has(key)) {
            WorldGenerator.shelfItemMaterialCache.set(key, new THREE.MeshStandardMaterial({
                color: key === 'stone' ? 0xc6b06d : 0x8fa96a,
                roughness: 0.75,
                metalness: 0.03
            }));
        }
        return WorldGenerator.shelfItemMaterialCache.get(key);
    }

    static getHearthFireMaterial() {
        if (!WorldGenerator.hearthFireMaterial) {
            WorldGenerator.hearthFireMaterial = new THREE.MeshStandardMaterial({
                color: 0xff8a32,
                emissive: 0xff5a1d,
                emissiveIntensity: 0.45,
                roughness: 0.55,
                metalness: 0.01
            });
        }
        return WorldGenerator.hearthFireMaterial;
    }

    static getDecorationMaterial(key) {
        if (!WorldGenerator.decorationMaterialCache) WorldGenerator.decorationMaterialCache = new Map();
        if (!WorldGenerator.decorationMaterialCache.has(key)) {
            const presets = {
                barrelWood: { color: 0x8a5a32, roughness: 0.86, metalness: 0.02 },
                crateWood: { color: 0x9b7043, roughness: 0.9, metalness: 0.01 },
                darkWood: { color: 0x4e3420, roughness: 0.84, metalness: 0.02 },
                darkMetal: { color: 0x343b3f, roughness: 0.54, metalness: 0.42 },
                signPaint: { color: 0xc49a58, roughness: 0.78, metalness: 0.01 },
                leafDark: { color: 0x23714a, roughness: 0.82, metalness: 0.01 },
                leaf: { color: 0x3f9f58, roughness: 0.82, metalness: 0.01 },
                leafBright: { color: 0x72c95a, roughness: 0.8, metalness: 0.01 },
                leafGold: { color: 0xd8c84f, roughness: 0.8, metalness: 0.01 },
                leafFrost: { color: 0xa9e2da, roughness: 0.76, metalness: 0.02 },
                leafBlossom: { color: 0xf28ebc, roughness: 0.78, metalness: 0.01 },
                leafCrystal: { color: 0x9a88ef, emissive: 0x312268, emissiveIntensity: 0.12, roughness: 0.65, metalness: 0.04 },
                stem: { color: 0x5a6f35, roughness: 0.9, metalness: 0.01 },
                flowerPink: { color: 0xff6fae, emissive: 0x4a1028, emissiveIntensity: 0.08, roughness: 0.7, metalness: 0.0 },
                flowerGold: { color: 0xffd84d, emissive: 0x523b08, emissiveIntensity: 0.08, roughness: 0.7, metalness: 0.0 },
                flowerLilac: { color: 0xb98cff, emissive: 0x28134d, emissiveIntensity: 0.08, roughness: 0.7, metalness: 0.0 },
                flowerSky: { color: 0x67d8ff, emissive: 0x0d3b51, emissiveIntensity: 0.08, roughness: 0.7, metalness: 0.0 },
                barkBrown: { color: 0x5b3822, roughness: 0.88, metalness: 0.01 },
                stoneGrey: { color: 0x737a72, roughness: 0.86, metalness: 0.02 },
                stoneLight: { color: 0xb6b9ad, roughness: 0.82, metalness: 0.02 },
                stoneMoss: { color: 0x70886c, roughness: 0.9, metalness: 0.01 },
                brickWarm: { color: 0xa75d47, roughness: 0.88, metalness: 0.01 },
                strawRoof: { color: 0xb89a4a, roughness: 0.92, metalness: 0.01 },
                awningCloth: { color: 0xc76e53, roughness: 0.82, metalness: 0.01 },
                awningCream: { color: 0xffe2a4, roughness: 0.8, metalness: 0.0 },
                bannerBlue: { color: 0x2878bd, roughness: 0.72, metalness: 0.01 },
                bannerPurple: { color: 0x8d55b8, roughness: 0.72, metalness: 0.01 },
                bannerGold: { color: 0xf2c84b, emissive: 0x3d2b05, emissiveIntensity: 0.05, roughness: 0.58, metalness: 0.12 },
                copperMetal: { color: 0xc57a4f, roughness: 0.46, metalness: 0.5 },
                clockFace: { color: 0xfff1c9, emissive: 0x5a4520, emissiveIntensity: 0.08, roughness: 0.64, metalness: 0.02 },
                windowGlow: { color: 0x83dfff, emissive: 0x267da4, emissiveIntensity: 0.3, roughness: 0.38, metalness: 0.02 },
                soil: { color: 0x4a3425, roughness: 0.96, metalness: 0.0 },
                lampGlow: { color: 0xffd16a, emissive: 0xffb347, emissiveIntensity: 0.42, roughness: 0.42, metalness: 0.02 },
                waterBright: {
                    color: 0x59dff1,
                    emissive: 0x185f72,
                    emissiveIntensity: 0.28,
                    roughness: 0.2,
                    metalness: 0.0,
                    transparent: true,
                    opacity: 0.84,
                    depthWrite: false
                },
                waterFoam: {
                    color: 0xe5fdff,
                    emissive: 0x5cc8d3,
                    emissiveIntensity: 0.2,
                    roughness: 0.35,
                    metalness: 0.0,
                    transparent: true,
                    opacity: 0.86,
                    depthWrite: false
                }
            };
            WorldGenerator.decorationMaterialCache.set(key, new THREE.MeshStandardMaterial(presets[key] || presets.crateWood));
        }
        return WorldGenerator.decorationMaterialCache.get(key);
    }

    updateBuildingVisibility(playerX, playerY) {
        const active = this.getBuildingAt(playerX, playerY);
        for (const state of this.buildingStates.values()) {
            this.setBuildingOpen(state, active?.id === state.id);
            this.updateDoorTargetsForPlayer(state, playerX, playerY);
        }
        return active;
    }

    getBuildingAt(x, y) {
        const grid = this.toGridPosition(x, y);
        const key = this.getColumnKey(grid.gridX, grid.gridY);
        for (const state of this.buildingStates.values()) {
            if (state.interiorKeys.has(key)) return state;
        }
        return null;
    }

    setBuildingOpen(state, isOpen) {
        if (state.isOpen === isOpen) return;
        state.isOpen = isOpen;
        if (state.wallDecorations) state.wallDecorations.visible = true;
    }

    updateDoorTargetsForPlayer(state, playerX, playerY) {
        for (const door of state.doors || []) {
            const distance = Math.hypot(playerX - door.worldX, playerY - door.worldY);
            this.setDoorOpen(door, distance <= 1.18);
        }
    }

    setDoorOpen(door, isOpen) {
        if (!door?.pivot) return;
        door.targetRotation = isOpen ? door.openRotation : door.closedRotation;
        door.pivot.visible = true;
    }

    updateDoorAnimations(deltaSeconds = 1 / 60) {
        const smoothing = Math.min(1, deltaSeconds * 12);
        for (const state of this.buildingStates.values()) {
            for (const door of state.doors || []) {
                if (!door?.pivot) continue;
                door.currentRotation += (door.targetRotation - door.currentRotation) * smoothing;
                if (Math.abs(door.currentRotation - door.targetRotation) < 0.002) {
                    door.currentRotation = door.targetRotation;
                }
                door.pivot.rotation.y = door.currentRotation;
            }
        }
    }

    syncRoofVisibility(state) {
        if (!state?.roof) return;
        state.roof.visible = state.roofVisibleByRange !== false &&
            !state.roofHiddenByObstruction;
    }

    updateVisibleTilesAround(centerX, centerY, radius = this.visibleTileRadius) {
        const center = this.toGridPosition(centerX, centerY);
        if (this.lastVisibilityCenter &&
            this.lastVisibilityCenter.x === center.gridX &&
            this.lastVisibilityCenter.y === center.gridY &&
            this.lastVisibilityCenter.radius === radius) {
            return;
        }

        this.lastVisibilityCenter = { x: center.gridX, y: center.gridY, radius };
        const radiusSq = radius * radius;
        for (const tile of this.tiles) {
            const dx = tile.gridX - center.gridX;
            const dy = tile.gridY - center.gridY;
            tile.visibleByRange = dx * dx + dy * dy <= radiusSq;
            this.syncTileVisibility(tile);
        }

        for (const state of this.buildingStates.values()) {
            if (!state.roof) continue;
            const dx = state.roof.position.x - center.gridX;
            const dy = state.roof.position.z - center.gridY;
            const near = dx * dx + dy * dy <= radiusSq;
            state.roofVisibleByRange = near;
            this.syncRoofVisibility(state);
            if (state.wallDecorations) state.wallDecorations.visible = near;
            if (state.furniture) state.furniture.visible = near;
            for (const door of state.doors || []) {
                if (door.sceneObject) door.sceneObject.visible = near;
            }
        }

        for (const group of this.decorationGroups) {
            const dx = group.position.x - center.gridX;
            const dy = group.position.z - center.gridY;
            group.visible = dx * dx + dy * dy <= radiusSq;
        }
    }

    updateObstructionHiding(playerX, playerY, playerZ = 0) {
        this.obstructionHider.update(playerX, playerY, playerZ);
    }

    canUseStairsBetween(fromX, fromY, toX, toY, isDiagonal = false, fromZ = null) {
        const fromSurface = Number.isFinite(fromZ)
            ? this.getReachableSurfaceAtGrid(fromX, fromY, fromZ)
            : this.getReachableSurfaceAtGrid(fromX, fromY);
        const fromSurfaceZ = Number.isFinite(fromZ) ? fromZ : (fromSurface?.z ?? 0);
        const toSurface = this.getReachableSurfaceAtGrid(toX, toY, fromSurfaceZ, {
            allowBuildingStairSpan: true
        });
        const elevationDiff = (toSurface?.z ?? 0) - (fromSurface?.z ?? 0);
        const dx = toX - fromX;
        const dy = toY - fromY;
        if (elevationDiff === 0) return true;

        const fromIsStair = this.isStairSurface(fromSurface);
        const toIsStair = this.isStairSurface(toSurface);
        if (!fromIsStair && !toIsStair) return true;

        if (this.isPairedStairTransition(fromSurface, toSurface, dx, dy)) return true;
        if (Math.abs(elevationDiff) > 1) return false;
        if (this.isCityWallStairSurface(fromSurface) || this.isCityWallStairSurface(toSurface)) {
            return this.isDirectionalCityWallStairStep(fromSurface, toSurface, dx, dy);
        }

        // Enter and exit building stairs through their exposed lower/upper edge. The actual climb
        // between halves must use isPairedStairTransition, which keeps the support corner solid.
        return !isDiagonal && (fromIsStair || toIsStair);
    }

    isStairSurface(surface) {
        return [
            BUILDING_PARTS.STAIRS,
            BUILDING_PARTS.STAIRS_NORTH,
            BUILDING_PARTS.STAIRS_SOUTH,
            BUILDING_PARTS.STAIRS_WEST,
            BUILDING_PARTS.STAIRS_EAST,
            BUILDING_PARTS.CITY_WALL_STAIRS_NORTH,
            BUILDING_PARTS.CITY_WALL_STAIRS_SOUTH,
            BUILDING_PARTS.CITY_WALL_STAIRS_WEST,
            BUILDING_PARTS.CITY_WALL_STAIRS_EAST
        ].includes(surface?.building);
    }

    isBuildingStairSurface(surface) {
        return [
            BUILDING_PARTS.STAIRS,
            BUILDING_PARTS.STAIRS_NORTH,
            BUILDING_PARTS.STAIRS_SOUTH,
            BUILDING_PARTS.STAIRS_WEST,
            BUILDING_PARTS.STAIRS_EAST
        ].includes(surface?.building);
    }

    isCityWallStairSurface(surface) {
        return [
            BUILDING_PARTS.CITY_WALL_STAIRS_NORTH,
            BUILDING_PARTS.CITY_WALL_STAIRS_SOUTH,
            BUILDING_PARTS.CITY_WALL_STAIRS_WEST,
            BUILDING_PARTS.CITY_WALL_STAIRS_EAST
        ].includes(surface?.building);
    }

    isPairedStairTransition(fromSurface, toSurface, dx, dy) {
        if (!this.isBuildingStairSurface(fromSurface) || !this.isBuildingStairSurface(toSurface)) return false;
        const dz = (toSurface?.z ?? 0) - (fromSurface?.z ?? 0);
        if (Math.abs(dz) !== BUILDING_STAIR_PAIR_STEP_HEIGHT) return false;
        if (Math.abs(dx) + Math.abs(dy) !== 1) return false;
        const direction = dz > 0
            ? this.getBuildingStairAscentVector(fromSurface) || this.getBuildingStairAscentVector(toSurface)
            : this.getBuildingStairAscentVector(toSurface) || this.getBuildingStairAscentVector(fromSurface);
        if (!direction) return false;
        return dz > 0
            ? dx === direction.x && dy === direction.y
            : dx === -direction.x && dy === -direction.y;
    }

    isPairedStairStoreyMove(fromX, fromY, toX, toY, fromZ = null) {
        const fromSurface = Number.isFinite(fromZ)
            ? this.getReachableSurfaceAtGrid(fromX, fromY, fromZ)
            : this.getReachableSurfaceAtGrid(fromX, fromY);
        const fromSurfaceZ = Number.isFinite(fromZ) ? fromZ : (fromSurface?.z ?? 0);
        const toSurface = this.getReachableSurfaceAtGrid(toX, toY, fromSurfaceZ, {
            allowBuildingStairSpan: true
        });
        return this.isPairedStairTransition(fromSurface, toSurface, toX - fromX, toY - fromY);
    }

    isDirectionalCityWallStairStep(fromSurface, toSurface, dx, dy) {
        const dz = (toSurface?.z ?? 0) - (fromSurface?.z ?? 0);
        if (Math.abs(dz) !== 1) return false;
        if (Math.abs(dx) + Math.abs(dy) !== 1) return false;
        const direction = dz > 0
            ? this.getCityWallStairAscentVector(fromSurface) || this.getCityWallStairAscentVector(toSurface)
            : this.getCityWallStairAscentVector(toSurface) || this.getCityWallStairAscentVector(fromSurface);
        if (!direction) return false;
        return dz > 0
            ? dx === direction.x && dy === direction.y
            : dx === -direction.x && dy === -direction.y;
    }

    getBuildingStairAscentVector(surface) {
        return {
            [BUILDING_PARTS.STAIRS_EAST]: { x: 0, y: 1 },
            [BUILDING_PARTS.STAIRS_SOUTH]: { x: -1, y: 0 },
            [BUILDING_PARTS.STAIRS_WEST]: { x: 0, y: -1 },
            [BUILDING_PARTS.STAIRS_NORTH]: { x: 1, y: 0 }
        }[surface?.building] || null;
    }

    getCityWallStairAscentVector(surface) {
        return {
            [BUILDING_PARTS.CITY_WALL_STAIRS_NORTH]: { x: 0, y: -1 },
            [BUILDING_PARTS.CITY_WALL_STAIRS_SOUTH]: { x: 0, y: 1 },
            [BUILDING_PARTS.CITY_WALL_STAIRS_WEST]: { x: -1, y: 0 },
            [BUILDING_PARTS.CITY_WALL_STAIRS_EAST]: { x: 1, y: 0 }
        }[surface?.building] || null;
    }

    syncTileVisibility(tile) {
        if (!tile?.mesh) return;
        tile.mesh.visible = tile.visibleByRange !== false &&
            !tile.hiddenByObstruction;
    }

    supportsHabitat(x, y, habitat) {
        const surface = this.getSurfaceAt(x, y);
        if (!surface) return false;
        return tileSupportsHabitat(surface.element, surface.textureValue, habitat);
    }

    getMoveCost(fromX, fromY, toX, toY, isDiagonal = false, fromZ = null) {
        if (!this.canMoveBetween(fromX, fromY, toX, toY, isDiagonal, fromZ)) return Infinity;

        const fromSurface = Number.isFinite(fromZ)
            ? this.getReachableSurfaceAt(fromX, fromY, fromZ)
            : this.getReachableSurfaceAt(fromX, fromY);
        const fromSurfaceZ = Number.isFinite(fromZ)
            ? fromZ
            : (fromSurface?.z ?? this.getElevation(fromX, fromY));
        const toSurface = this.getReachableSurfaceAt(toX, toY, fromSurfaceZ, {
            allowBuildingStairSpan: true
        });
        const toZ = toSurface?.z ?? this.getMovementElevation(toX, toY, fromSurfaceZ);
        const elevationDiff = toZ - fromSurfaceZ;
        if (Math.abs(elevationDiff) > 1 &&
            !this.isPairedStairTransition(fromSurface, toSurface, toX - fromX, toY - fromY)) {
            return Infinity;
        }

        const baseCost = isDiagonal ? 1.414 : 1.0;
        const terrainCost = toSurface?.definition?.moveCost || 1;
        const climbCost = elevationDiff > 0 ? elevationDiff * 0.5 : elevationDiff * 0.15;
        return Math.max(0.1, baseCost * terrainCost + climbCost);
    }

    findNearestHabitat(startX, startY, habitat, maxRadius = 16) {
        const start = this.toGridPosition(startX, startY);
        let best = null;
        for (let radius = 0; radius <= maxRadius; radius++) {
            for (let x = start.gridX - radius; x <= start.gridX + radius; x++) {
                for (let y = start.gridY - radius; y <= start.gridY + radius; y++) {
                    if (Math.abs(x - start.gridX) !== radius && Math.abs(y - start.gridY) !== radius) continue;
                    if (!this.supportsHabitat(x, y, habitat)) continue;
                    best = { x, y, z: this.getElevation(x, y) };
                    break;
                }
                if (best) break;
            }
            if (best) return best;
        }
        return null;
    }

    findNearestWalkable(startX, startY, maxRadius = 48) {
        const start = this.toGridPosition(startX, startY);
        for (let radius = 0; radius <= maxRadius; radius++) {
            for (let x = start.gridX - radius; x <= start.gridX + radius; x++) {
                for (let y = start.gridY - radius; y <= start.gridY + radius; y++) {
                    if (Math.abs(x - start.gridX) !== radius && Math.abs(y - start.gridY) !== radius) continue;
                    if (this.isWalkable(x, y)) {
                        return { x, y, z: this.getElevation(x, y) };
                    }
                }
            }
        }
        return null;
    }

    /**
     * Modifies a specific tile's element and variant.
     */
    modifyTile(x, y, z, element, textureValue = 0, effect = 0, building = 0) {
        const existing = this.getVoxelAt(x, y, z);
        const visualVariant = existing?.visualVariant ?? 0;
        const paletteId = existing?.paletteId ?? 'meadow';
        const voxel = this.setVoxelAt(x, y, z, { element, texture: textureValue, effect, building, visualVariant, paletteId });
        const tile = this.getTileAt(x, y, z);
        if (tile) {
            console.log(`[WorldGenerator] Modifying tile at ${x},${y},${z} to Element:${element}, Var:${textureValue}`);
            tile.setElementalType(element, textureValue, effect, building);
            this.rebuildSurfaceFromColumn(x, y);
        } else {
            this.addTile(x, y, z, voxel.element, voxel.textureValue, voxel.effect, voxel.building, true, visualVariant, paletteId);
        }
    }

    /**
     * Specific logic: if water/hydro (2), turn to ice/cryo (4)
     */
    applyIceToTile(x, y, z) {
        const tile = this.getTileAt(x, y, z);
        if (tile && tile.element === ELEMENTS.HYDRO) {
            this.modifyTile(x, y, z, ELEMENTS.CRYO, 0, ELEMENTS.CRYO, tile.building);
        }
    }

    removeTile(x, y, z) {
        const key = this.getTileKey(x, y, z);
        const tile = this.tileMap.get(key);
        if (tile) {
            tile.destroy();
            this.tileMap.delete(key);
            this.tiles = this.tiles.filter(t => t !== tile);
            this.unregisterTileFromChunk(x, y, key);
            const column = this.getVoxelColumnAt(x, y);
            if (column) {
                const voxelIndex = column.findIndex((voxel) => voxel.z === z);
                if (voxelIndex >= 0) column.splice(voxelIndex, 1);
            }
            this.rebuildSurfaceFromColumn(x, y);
        }
    }

    setVoxelAt(x, y, z, attributes) {
        const columnKey = this.getColumnKey(x, y);
        let column = this.voxelColumnMap.get(columnKey);
        if (!column) {
            column = [];
            this.voxelColumnMap.set(columnKey, column);
        }

        const voxel = createVoxelBlock({ ...attributes, z });
        const existingIndex = column.findIndex((candidate) => candidate.z === z);
        if (existingIndex >= 0) {
            column[existingIndex] = voxel;
        } else {
            column.push(voxel);
            column.sort((a, b) => a.z - b.z);
        }
        return voxel;
    }

    rebuildSurfaceFromColumn(x, y) {
        const columnKey = this.getColumnKey(x, y);
        const topVoxel = getTopVoxel(this.voxelColumnMap.get(columnKey));
        if (!topVoxel) {
            this.elevationMap.delete(columnKey);
            this.surfaceMap.delete(columnKey);
            return;
        }

        this.elevationMap.set(columnKey, topVoxel.z);
        this.surfaceMap.set(columnKey, {
            x,
            y,
            z: topVoxel.z,
            element: topVoxel.element,
            textureValue: topVoxel.textureValue,
            effect: topVoxel.effect,
            building: topVoxel.building,
            paletteId: topVoxel.paletteId,
            definition: topVoxel.definition,
            voxel: topVoxel
        });
    }

    clear() {
        this.obstructionHider.clear();
        this.clearBuildingStates();
        this.clearWorldDecorations();
        this.clearTerrainDepthDetails();
        this.tiles.forEach(t => t.destroy());
        this.tiles = [];
        this.tileMap.clear();
        this.elevationMap.clear();
        this.surfaceMap.clear();
        this.chunkMap.clear();
        this.voxelMatrix = null;
        this.voxelColumnMap.clear();
        this.lastVisibilityCenter = null;
    }

    clearWorldDecorations() {
        if (!this.decorationGroups?.length) return;
        for (const group of this.decorationGroups) {
            WorldGenerator.disposeSceneObject(group, this.threeManager);
        }
        this.decorationGroups = [];
    }

    clearBuildingStates() {
        if (!this.buildingStates) return;
        this.obstructionGroups.clear();
        for (const state of this.buildingStates.values()) {
            if (state.roof) {
                WorldGenerator.disposeSceneObject(state.roof, this.threeManager);
                state.roof = null;
            }
            if (state.wallDecorations) {
                WorldGenerator.disposeSceneObject(state.wallDecorations, this.threeManager);
                state.wallDecorations = null;
            }
            if (state.furniture) {
                WorldGenerator.disposeSceneObject(state.furniture, this.threeManager);
                state.furniture = null;
            }
            for (const door of state.doors || []) {
                if (door.sceneObject) WorldGenerator.disposeSceneObject(door.sceneObject, this.threeManager);
            }
            state.doors = [];
        }
        this.buildingStates.clear();
    }

    static disposeSceneObject(object, threeManager) {
        threeManager.removeFromWorld(object);
        object.traverse((child) => {
            child.geometry?.dispose();
        });
    }

    exportWorld() {
        const data = this.tiles.map(t => ({
            gridX: t.gridX,
            gridY: t.gridY,
            elevation: t.elevation,
            element: t.element,
            variant: t.textureValue,
            visualVariant: t.visualVariant,
            paletteId: t.paletteId,
            effect: t.effect,
            building: t.building
        }));
        return JSON.stringify(data);
    }

    loadWorld(json) {
        try {
            const data = JSON.parse(json);
            this.clear();
            data.forEach(tileData => {
                this.addTile(
                    tileData.gridX,
                    tileData.gridY,
                    tileData.elevation,
                    tileData.element,
                    tileData.variant,
                    tileData.effect,
                    tileData.building,
                    true,
                    tileData.visualVariant ?? 0,
                    tileData.paletteId ?? 'meadow'
                );
            });
            console.log(`[WorldGenerator] Loaded ${data.length} tiles.`);
        } catch (e) {
            console.error('[WorldGenerator] Failed to load world:', e);
        }
    }

    getTileKey(x, y, z) {
        return `${x},${y},${z}`;
    }

    getColumnKey(x, y) {
        return `${x},${y}`;
    }

    toGridPosition(x, y) {
        return {
            gridX: Math.round(x),
            gridY: Math.round(y)
        };
    }

    getChunkCoord(value) {
        return Math.floor(value / this.chunkSize);
    }

    getChunkKey(chunkX, chunkY) {
        return `${chunkX},${chunkY}`;
    }

    getChunkKeyForTile(x, y) {
        return this.getChunkKey(this.getChunkCoord(x), this.getChunkCoord(y));
    }

    registerTileInChunk(x, y, tileKey) {
        const chunkKey = this.getChunkKeyForTile(x, y);
        if (!this.chunkMap.has(chunkKey)) {
            const [chunkX, chunkY] = chunkKey.split(',').map(Number);
            this.chunkMap.set(chunkKey, {
                chunkX,
                chunkY,
                tileKeys: new Set()
            });
        }
        this.chunkMap.get(chunkKey).tileKeys.add(tileKey);
    }

    unregisterTileFromChunk(x, y, tileKey) {
        const chunkKey = this.getChunkKeyForTile(x, y);
        const chunk = this.chunkMap.get(chunkKey);
        if (!chunk) return;
        chunk.tileKeys.delete(tileKey);
        if (chunk.tileKeys.size === 0) this.chunkMap.delete(chunkKey);
    }

    getLoadedChunkSummary() {
        return [...this.chunkMap.values()].map(chunk => ({
            chunkX: chunk.chunkX,
            chunkY: chunk.chunkY,
            blocks: chunk.tileKeys.size
        }));
    }
}
