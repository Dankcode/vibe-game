import * as THREE from 'three';
import { Tile } from '../entities/Tile.js';
import { ObstructionHider } from './ObstructionHider.js';
import {
    ELEMENTS,
    getTileDefinition,
    isTileWalkable,
    resolveWorldPaletteVariant,
    tileSupportsHabitat
} from '../data/TileRegistry.js';
import { BUILDING_PARTS, createTileCell, createVoxelBlock, createVoxelMatrix, getTopVoxel, getVoxelColumn } from '../data/TileLibrary.js';
import { BURG_THEME_CATALOG } from '../data/BurgThemeCatalog.js';
import { planBuildingFurniture } from './FurniturePlanner.js';

export { ELEMENTS };

export const DEFAULT_CHUNK_SIZE = 16;
const BLOCKING_CLEARANCE_VOXELS = 1;
const BUILDING_STAIR_STOREY_HEIGHT = 2;
const BUILDING_STAIR_PAIR_STEP_HEIGHT = BUILDING_STAIR_STOREY_HEIGHT;
const FURNITURE_SURFACE_LIFT = 0.08;

// Architecture themes are intentionally finite. Burg generation supplies the resolved theme on
// every building; these renderer fallbacks keep legacy maps working while ensuring a missing or
// malformed theme never silently borrows another culture's kit.
const ARCHITECTURE_THEME_RENDER_PROFILES = Object.freeze({
    asian: createArchitectureThemeRenderProfile('asian', 'clay'),
    'middle-eastern': createArchitectureThemeRenderProfile('middle-eastern', 'courtyard'),
    'northern-european': createArchitectureThemeRenderProfile('northern-european', 'slate'),
    'southern-european': createArchitectureThemeRenderProfile('southern-european', 'clay'),
    egyptian: createArchitectureThemeRenderProfile('egyptian', 'stone-slab')
});

function createArchitectureThemeRenderProfile(themeId, roofTextureStyle) {
    const theme = BURG_THEME_CATALOG[themeId];
    const colorNumber = (value) => Number.parseInt(String(value).replace(/^#/, ''), 16) & 0xffffff;
    return freezeArchitectureThemeProfile({
        roofGeometry: theme.roofGeometries[0],
        roofTextureStyle,
        facadeKit: theme.facadeKits[0],
        castleKit: theme.castleKits[0],
        roofColors: theme.themePalette.roofColors.map(colorNumber),
        wallColor: colorNumber(theme.themePalette.wallColor),
        trimColor: colorNumber(theme.themePalette.trimColor),
        accentColor: colorNumber(theme.themePalette.accentColor)
    });
}

function freezeArchitectureThemeProfile(profile) {
    return Object.freeze({
        ...profile,
        roofColors: Object.freeze([...profile.roofColors])
    });
}

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
        this.lodContentVersion = 0;
        this.lastLODVisibility = null;
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

    registerTerrainDepthDetails(options = {}) {
        this.clearTerrainDepthDetails();
        if (!this.surfaceMap.size) return;

        const group = new THREE.Group();
        const grassyLips = [];
        const rockStrata = [];
        const mossPuffs = [];
        const waterfallCandidates = [];
        const reservedWaterfalls = (Array.isArray(options) ? options : options.reservedWaterfalls || [])
            .filter((decoration) => decoration?.type === 'waterfall')
            .map((decoration) => ({ x: Number(decoration.x), y: Number(decoration.y) }))
            .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y));
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
            const detailPaletteId = surface.paletteId || surface.definition?.paletteId || 'meadow';

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
                        lodX: surface.x,
                        lodY: surface.y,
                        lodExtent: 0.55,
                        rotationY: direction.rotationY,
                        sx: 0.72 + ((edgeSeed >>> 8) % 18) / 100,
                        sy: 0.78,
                        sz: 1,
                        paletteId: detailPaletteId
                    });
                }

                if (rockStrata.length < 680 && edgeSeed % 100 < 68) {
                    const layer = Math.min(drop, 3);
                    rockStrata.push({
                        x: edgeX - direction.dx * 0.012,
                        y: surface.z + this.getTopSurfaceOffset() - 0.48 - layer * 0.18,
                        z: edgeZ - direction.dy * 0.012,
                        lodX: surface.x,
                        lodY: surface.y,
                        lodExtent: 0.55,
                        rotationY: direction.rotationY,
                        sx: 0.5 + ((edgeSeed >>> 12) % 36) / 100,
                        sy: Math.min(2.5, 0.72 + drop * 0.34),
                        sz: 0.74,
                        paletteId: detailPaletteId
                    });
                }

                if (isMeadow && mossPuffs.length < 220 && edgeSeed % 100 < 24) {
                    mossPuffs.push({
                        x: edgeX - direction.dx * 0.12,
                        y: surface.z + this.getTopSurfaceOffset() + 0.035,
                        z: edgeZ - direction.dy * 0.12,
                        lodX: surface.x,
                        lodY: surface.y,
                        lodExtent: 0.38,
                        rotationY: (edgeSeed % 8) * Math.PI / 4,
                        sx: 0.68 + ((edgeSeed >>> 10) % 24) / 100,
                        sy: 0.42,
                        sz: 0.68 + ((edgeSeed >>> 16) % 24) / 100,
                        paletteId: detailPaletteId
                    });
                }

                const reservedDirective = reservedWaterfalls.some((point) =>
                    Math.hypot(point.x - surface.x, point.y - surface.y) < 2.25
                );
                if (!reservedDirective && neighbor?.element === ELEMENTS.HYDRO && waterfallCandidates.length < 40) {
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

        this.addPaletteInstancedTerrainDetails(
            group,
            () => new THREE.BoxGeometry(0.9, 0.16, 0.18),
            'grassLip',
            grassyLips
        );
        this.addPaletteInstancedTerrainDetails(
            group,
            () => new THREE.BoxGeometry(0.78, 0.42, 0.2),
            'cliffStrata',
            rockStrata
        );
        this.addPaletteInstancedTerrainDetails(
            group,
            () => new THREE.SphereGeometry(0.24, 6, 4),
            'cliffMoss',
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
        group.visible = false;
        this.threeManager.addToWorld(group);
        this.terrainDetailGroup = group;
        this.lodContentVersion += 1;
        if (this.lastVisibilityCenter) {
            this.updateTerrainDetailVisibility(
                this.lastVisibilityCenter.x,
                this.lastVisibilityCenter.y,
                this.lastVisibilityCenter.radius
            );
        }
    }

    addPaletteInstancedTerrainDetails(group, createGeometry, materialKey, transforms) {
        const transformsByPalette = new Map();
        for (const transform of transforms) {
            const paletteId = resolveWorldPaletteVariant(transform.paletteId, 0).paletteId;
            if (!transformsByPalette.has(paletteId)) transformsByPalette.set(paletteId, []);
            transformsByPalette.get(paletteId).push(transform);
        }
        for (const [paletteId, paletteTransforms] of transformsByPalette.entries()) {
            this.addInstancedTerrainDetail(
                group,
                createGeometry(),
                WorldGenerator.getTerrainDetailMaterial(materialKey, paletteId),
                paletteTransforms
            );
        }
    }

    addInstancedTerrainDetail(group, geometry, material, transforms) {
        if (!transforms.length) {
            geometry.dispose();
            return;
        }
        const mesh = new THREE.InstancedMesh(geometry, material, transforms.length);
        mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        mesh.userData.lodTransforms = transforms;
        mesh.count = 0;
        mesh.visible = false;
        group.add(mesh);
    }

    updateInstancedTerrainDetailVisibility(mesh, centerX, centerY, radius) {
        const transforms = mesh?.userData?.lodTransforms || [];
        const matrix = new THREE.Matrix4();
        const quaternion = new THREE.Quaternion();
        const position = new THREE.Vector3();
        const scale = new THREE.Vector3();
        let visibleCount = 0;
        for (const transform of transforms) {
            const lodX = Number.isFinite(transform.lodX) ? transform.lodX : transform.x;
            const lodY = Number.isFinite(transform.lodY) ? transform.lodY : transform.z;
            if (!this.isObjectInsidePlayerLOD(
                lodX,
                lodY,
                transform.lodExtent || 0,
                centerX,
                centerY,
                radius
            )) {
                continue;
            }
            position.set(transform.x, transform.y, transform.z);
            quaternion.setFromEuler(new THREE.Euler(0, transform.rotationY || 0, 0));
            scale.set(transform.sx || 1, transform.sy || 1, transform.sz || 1);
            matrix.compose(position, quaternion, scale);
            mesh.setMatrixAt(visibleCount, matrix);
            visibleCount += 1;
        }
        mesh.count = visibleCount;
        mesh.visible = visibleCount > 0;
        mesh.instanceMatrix.needsUpdate = true;
        if (visibleCount > 0) {
            mesh.computeBoundingBox();
            mesh.computeBoundingSphere();
        }
        return {
            total: transforms.length,
            visible: visibleCount
        };
    }

    addTerrainWaterfall(group, candidate) {
        const { surface, neighbor, direction, drop } = candidate;
        const height = Math.max(0.9, drop - 0.08);
        const isHorizontalFace = direction.dx === 0;
        const waterfallGroup = new THREE.Group();
        waterfallGroup.userData.lodAnchor = { x: surface.x, y: surface.y };
        waterfallGroup.visible = false;
        const cascade = new THREE.Mesh(
            new THREE.BoxGeometry(isHorizontalFace ? 0.56 : 0.055, height, isHorizontalFace ? 0.055 : 0.56),
            WorldGenerator.getTerrainDetailMaterial('waterfall')
        );
        cascade.position.set(
            surface.x + direction.ox + direction.dx * 0.025,
            neighbor.z + this.getTopSurfaceOffset() + height / 2,
            surface.y + direction.oz + direction.dy * 0.025
        );
        waterfallGroup.add(cascade);

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
        waterfallGroup.add(foam);
        waterfallGroup.userData.lodExtent = WorldGenerator.measureHorizontalLODExtent(
            waterfallGroup,
            surface.x,
            surface.y
        );
        group.add(waterfallGroup);
    }

    updateTerrainDetailVisibility(centerX, centerY, radius = this.visibleTileRadius) {
        if (!this.terrainDetailGroup) return { total: 0, visible: 0 };
        let total = 0;
        let visible = 0;
        for (const child of this.terrainDetailGroup.children) {
            if (child.isInstancedMesh && Array.isArray(child.userData?.lodTransforms)) {
                const counts = this.updateInstancedTerrainDetailVisibility(
                    child,
                    centerX,
                    centerY,
                    radius
                );
                total += counts.total;
                visible += counts.visible;
                continue;
            }

            const anchor = child.userData?.lodAnchor;
            if (!anchor) continue;
            const isVisible = this.isObjectInsidePlayerLOD(
                anchor.x,
                anchor.y,
                child.userData.lodExtent || 0,
                centerX,
                centerY,
                radius
            );
            child.visibleByRange = isVisible;
            child.visible = isVisible;
            total += 1;
            if (isVisible) visible += 1;
        }
        this.terrainDetailGroup.visible = visible > 0;
        this.terrainDetailGroup.userData.lodCounts = { total, visible };
        return { total, visible };
    }

    clearTerrainDepthDetails() {
        if (!this.terrainDetailGroup) return;
        WorldGenerator.disposeSceneObject(this.terrainDetailGroup, this.threeManager);
        this.terrainDetailGroup = null;
        this.lodContentVersion += 1;
    }

    generateFromChunkedArray(mapArray, legend, chunkSize = this.chunkSize, options = {}) {
        this.chunkSize = chunkSize;
        this.generateFromArray(mapArray, legend);
        const buildings = Array.isArray(options) ? options : (options.buildings || []);
        const decorations = Array.isArray(options) ? [] : (options.decorations || mapArray.decorations || []);
        if (decorations.some((decoration) => decoration?.type === 'waterfall')) {
            this.registerTerrainDepthDetails({ reservedWaterfalls: decorations });
        }
        this.registerBuildingBlueprints(buildings);
        this.registerWorldDecorations(decorations);
    }

    addTile(
        x,
        y,
        z,
        element,
        textureValue = 0,
        effect = 0,
        building = 0,
        affectSurface = true,
        visualVariant = 0,
        paletteId = 'meadow',
        architectureThemeId = null
    ) {
        const voxel = this.getVoxelAt(x, y, z) ||
            this.setVoxelAt(x, y, z, {
                element,
                texture: textureValue,
                effect,
                building,
                visualVariant,
                paletteId,
                architectureThemeId
            });
        const resolvedVisualVariant = voxel.visualVariant ?? visualVariant;
        const resolvedPaletteId = voxel.paletteId ?? paletteId;
        const resolvedArchitectureThemeId = WorldGenerator.normalizeArchitectureThemeId(
            voxel.architectureThemeId
        );
        const tile = new Tile(this.threeManager, x, y, z, {
            element,
            textureValue,
            effect,
            building,
            visualVariant: resolvedVisualVariant,
            paletteId: resolvedPaletteId,
            architectureThemeId: resolvedArchitectureThemeId,
            visualSeed: this.voxelMatrix?.seed || this.voxelMatrix?.world?.variantSeed || 0
        });
        tile.visibleByRange = false;
        this.syncTileVisibility(tile);
        this.tiles.push(tile);
        this.lodContentVersion += 1;
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
                    architectureThemeId: resolvedArchitectureThemeId,
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
        this.lodContentVersion += 1;
        if (this.lastVisibilityCenter) {
            this.updateVisibleTilesAround(
                this.lastVisibilityCenter.x,
                this.lastVisibilityCenter.y,
                this.lastVisibilityCenter.radius
            );
        }
    }

    registerWorldDecorations(decorations = []) {
        this.clearWorldDecorations();
        for (const decoration of decorations || []) {
            const group = this.createWorldDecoration(decoration);
            if (!group) continue;
            this.threeManager.addToWorld(group);
            this.decorationGroups.push(group);
        }
        this.lodContentVersion += 1;
        if (this.lastVisibilityCenter) {
            this.updateVisibleTilesAround(
                this.lastVisibilityCenter.x,
                this.lastVisibilityCenter.y,
                this.lastVisibilityCenter.radius
            );
        }
    }

    updateLivingWorld(elapsedSeconds) {
        for (const group of this.decorationGroups) {
            if (!group.visible) continue;
            if (group.userData.sways) {
                group.rotation.z = Math.sin(elapsedSeconds * 0.85 + group.userData.lifePhase) * 0.018;
                group.rotation.x = Math.cos(elapsedSeconds * 0.62 + group.userData.lifePhase) * 0.009;
            }
            if (group.userData.rotor) {
                group.userData.rotor.rotation.z = elapsedSeconds * 0.72 + group.userData.lifePhase;
            }
            if (Array.isArray(group.userData.waterPulses)) {
                for (const [index, entry] of group.userData.waterPulses.entries()) {
                    const mesh = entry?.mesh;
                    if (!mesh) continue;
                    const pulse = Math.sin(elapsedSeconds * (2.05 + index * 0.08) + group.userData.lifePhase + index * 0.7);
                    const baseScale = entry.baseScale || { x: 1, y: 1, z: 1 };
                    mesh.scale.set(
                        baseScale.x * (0.985 + (pulse + 1) * 0.012),
                        baseScale.y * (0.965 + (pulse + 1) * 0.035),
                        baseScale.z
                    );
                }
            } else if (group.userData.waterPulse) {
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
        group.userData.lodAnchor = { x, y };
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
        else if (type === 'archway') this.addDecorArchway(group, decoration);
        else if (type === 'banner') this.addDecorBanner(group, decoration.rotation || 0);
        else if (type === 'lantern_cluster') this.addDecorLanternCluster(group, decoration.rotation || 0);
        else if (type === 'waterfall') this.addDecorWaterfall(group, decoration);
        else if (type === 'dock') this.addDecorDock(group, decoration);
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
            child.castShadow = !child.material?.transparent;
            child.receiveShadow = true;
            child.raycast = () => {};
        });
        group.userData.lodExtent = WorldGenerator.measureHorizontalLODExtent(group, x, y);
        group.visibleByRange = false;
        group.visible = false;
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

    addDecorArchway(group, decoration = 0) {
        if (decoration && typeof decoration === 'object' && decoration.gatehouse) {
            this.addDecorGatehouse(group, decoration);
            return;
        }
        const rotation = typeof decoration === 'object'
            ? Number(decoration.rotation || 0)
            : Number(decoration || 0);
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

    addDecorGatehouse(group, decoration = {}) {
        const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, value));
        const widthTiles = clamp(Math.floor(Number(decoration.widthTiles) || 1), 1, 3);
        const grand = decoration.grand === true || widthTiles >= 3;
        const passageWidth = 0.68 + widthTiles * 0.58;
        const towerHeight = grand ? 2.7 : widthTiles > 1 ? 2.35 : 2.05;
        const towerWidth = grand ? 0.92 : 0.76;
        const towerDepth = grand ? 1.02 : 0.86;
        const towerX = passageWidth / 2 + towerWidth / 2;
        const stone = WorldGenerator.getDecorationMaterial('fortressStone');
        const darkStone = WorldGenerator.getDecorationMaterial('stoneGrey');
        const accent = WorldGenerator.getDistrictAccentMaterial(group.userData.accent) ||
            WorldGenerator.getDecorationMaterial('bannerBlue');
        const gold = WorldGenerator.getDecorationMaterial('bannerGold');
        const glow = WorldGenerator.getDecorationMaterial('lampGlow');
        group.rotation.y = Number(decoration.rotation || 0);

        for (const side of [-1, 1]) {
            const tower = new THREE.Mesh(new THREE.BoxGeometry(towerWidth, towerHeight, towerDepth), stone);
            tower.position.set(side * towerX, towerHeight / 2, 0);
            group.add(tower);
            const footing = new THREE.Mesh(new THREE.BoxGeometry(towerWidth + 0.14, 0.22, towerDepth + 0.14), darkStone);
            footing.position.set(side * towerX, 0.11, 0);
            group.add(footing);
            const cap = new THREE.Mesh(new THREE.BoxGeometry(towerWidth + 0.12, 0.18, towerDepth + 0.12), darkStone);
            cap.position.set(side * towerX, towerHeight + 0.03, 0);
            group.add(cap);

            for (const offset of [-0.29, 0.29]) {
                const frontMerlon = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.34, 0.2), stone);
                frontMerlon.position.set(side * towerX + offset, towerHeight + 0.27, -towerDepth / 2 + 0.08);
                group.add(frontMerlon);
                const rearMerlon = frontMerlon.clone();
                rearMerlon.position.z = towerDepth / 2 - 0.08;
                group.add(rearMerlon);
            }

            const slit = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.48, 0.04), glow);
            slit.position.set(side * towerX, towerHeight * 0.58, -towerDepth / 2 - 0.025);
            group.add(slit);
            const banner = new THREE.Mesh(new THREE.BoxGeometry(0.34, grand ? 0.82 : 0.58, 0.035), accent);
            banner.position.set(side * towerX, towerHeight * 0.78, -towerDepth / 2 - 0.055);
            group.add(banner);
            const bannerStripe = new THREE.Mesh(new THREE.BoxGeometry(0.07, grand ? 0.52 : 0.36, 0.045), gold);
            bannerStripe.position.copy(banner.position);
            bannerStripe.position.z -= 0.025;
            bannerStripe.rotation.z = Math.PI / 4;
            group.add(bannerStripe);
        }

        const lintelHeight = grand ? 0.52 : 0.42;
        const lintel = new THREE.Mesh(
            new THREE.BoxGeometry(passageWidth + 0.16, lintelHeight, towerDepth * 0.82),
            stone
        );
        lintel.position.y = towerHeight - lintelHeight / 2 - 0.08;
        group.add(lintel);
        const arch = new THREE.Mesh(new THREE.TorusGeometry(0.54, 0.11, 8, 22, Math.PI), darkStone);
        arch.position.set(0, towerHeight - lintelHeight - 0.12, -towerDepth * 0.43);
        arch.scale.x = passageWidth / 1.08;
        group.add(arch);
        const crest = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.42, 0.1), accent);
        crest.position.set(0, towerHeight + 0.22, -towerDepth * 0.43);
        crest.rotation.z = Math.PI / 4;
        group.add(crest);

        group.userData.landmarkKind = 'gatehouse';
        group.userData.gatehouse = { widthTiles, grand };
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

    addDecorWaterfall(group, decoration = {}) {
        const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, value));
        const dropTiers = clamp(Math.floor(Number(decoration.dropTiers ?? decoration.tiers) || 1), 1, 5);
        const widthTiles = clamp(Number(decoration.widthTiles ?? decoration.width) || 1, 1, 3);
        const rawIntensity = Number(decoration.intensity ?? decoration.discharge ?? 1);
        const intensity = clamp(
            Number.isFinite(rawIntensity)
                ? rawIntensity <= 1
                    ? 0.62 + rawIntensity * 0.46
                    : 0.78 + Math.log10(rawIntensity + 1) * 0.18
                : 1,
            0.58,
            1.42
        );
        const poolDirective = decoration.plungePool ?? decoration.plunge_pool ?? true;
        const poolOptions = poolDirective && typeof poolDirective === 'object' ? poolDirective : {};
        const hasPlungePool = poolDirective !== false;
        const rotation = Number.isFinite(Number(decoration.rotation))
            ? Number(decoration.rotation)
            : THREE.MathUtils.degToRad(Number(decoration.bearing) || 0);
        const water = WorldGenerator.getDecorationMaterial('waterBright');
        const foam = WorldGenerator.getDecorationMaterial('waterFoam');
        const rock = WorldGenerator.getDecorationMaterial('stoneMoss');
        const tierDrop = clamp(Number(decoration.tierHeight) || 0.92, 0.72, 1.18);
        const cascadeWidth = widthTiles * (0.68 + intensity * 0.12);
        const waterPulses = [];
        group.rotation.y = rotation;

        for (let tier = 0; tier < dropTiers; tier++) {
            const topY = -tier * tierDrop + 0.48;
            const bottomY = topY - tierDrop;
            const centerY = (topY + bottomY) / 2;
            const backing = new THREE.Mesh(
                new THREE.BoxGeometry(cascadeWidth + 0.42, tierDrop + 0.2, 0.24),
                rock
            );
            backing.position.set(0, centerY - 0.02, 0.015);
            group.add(backing);

            const cascade = new THREE.Mesh(
                new THREE.BoxGeometry(cascadeWidth, tierDrop * 0.92, 0.065),
                water
            );
            cascade.position.set(0, centerY, -0.145);
            cascade.renderOrder = 8;
            group.add(cascade);
            waterPulses.push({ mesh: cascade, baseScale: { x: 1, y: 1, z: 1 } });

            const ledge = new THREE.Mesh(
                new THREE.BoxGeometry(cascadeWidth + 0.5, 0.16, 0.46),
                rock
            );
            ledge.position.set(0, bottomY + 0.025, -0.005);
            group.add(ledge);

            const tierFoam = new THREE.Mesh(new THREE.SphereGeometry(0.24, 8, 5), foam);
            tierFoam.position.set(0, bottomY + 0.13, -0.18);
            tierFoam.scale.set(cascadeWidth * 1.75, 0.24 + intensity * 0.035, 0.62);
            tierFoam.renderOrder = 9;
            group.add(tierFoam);
        }

        const topFoam = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 5), foam);
        topFoam.position.set(0, 0.52, -0.15);
        topFoam.scale.set(cascadeWidth * 1.65, 0.22, 0.54);
        topFoam.renderOrder = 9;
        group.add(topFoam);

        const totalDrop = dropTiers * tierDrop;
        if (hasPlungePool) {
            const poolRadius = clamp(
                Number(poolOptions.radiusTiles ?? poolOptions.radius) || cascadeWidth * (0.76 + intensity * 0.08),
                0.62,
                2.7
            );
            const poolY = 0.48 - totalDrop;
            const pool = new THREE.Mesh(
                new THREE.CylinderGeometry(poolRadius, poolRadius * 1.08, 0.075, 18),
                water
            );
            pool.position.set(0, poolY - 0.025, -poolRadius * 0.42);
            pool.renderOrder = 7;
            group.add(pool);

            const foamRing = new THREE.Mesh(
                new THREE.TorusGeometry(poolRadius * 0.72, 0.055, 6, 22),
                foam
            );
            foamRing.rotation.x = Math.PI / 2;
            foamRing.position.set(0, poolY + 0.025, -poolRadius * 0.42);
            foamRing.scale.z = 0.72;
            foamRing.renderOrder = 9;
            group.add(foamRing);

            if (poolOptions.outflow !== false && decoration.outflow !== false) {
                const outflowLength = clamp(
                    Number(poolOptions.outflowLength ?? decoration.outflowLength) || 1.1 + widthTiles * 0.22,
                    0.7,
                    2.4
                );
                const outflow = new THREE.Mesh(
                    new THREE.BoxGeometry(Math.max(0.42, cascadeWidth * 0.56), 0.045, outflowLength),
                    water
                );
                outflow.position.set(0, poolY - 0.01, -poolRadius - outflowLength * 0.38);
                outflow.renderOrder = 7;
                group.add(outflow);
            }

            const mistCount = clamp(Math.round(10 + dropTiers * 4 + intensity * 7), 12, 36);
            const mistPositions = [];
            for (let index = 0; index < mistCount; index++) {
                const angle = index * 2.399963229728653;
                const radius = poolRadius * (0.18 + ((index * 37) % 65) / 100);
                mistPositions.push(
                    Math.cos(angle) * radius,
                    poolY + 0.12 + ((index * 29) % 52) / 100,
                    -poolRadius * 0.42 + Math.sin(angle) * radius * 0.62
                );
            }
            const mistGeometry = new THREE.BufferGeometry();
            mistGeometry.setAttribute('position', new THREE.Float32BufferAttribute(mistPositions, 3));
            const mist = new THREE.Points(mistGeometry, WorldGenerator.getWaterfallMistMaterial());
            mist.renderOrder = 10;
            group.add(mist);
        }

        group.userData.waterPulses = waterPulses;
        group.userData.waterfall = Object.freeze({
            dropTiers,
            widthTiles,
            intensity,
            plungePool: hasPlungePool,
            totalDrop
        });
        group.userData.landmarkKind = 'waterfall';
    }

    addDecorDock(group, decoration = {}) {
        const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, value));
        const lengthTiles = clamp(Math.floor(Number(decoration.lengthTiles ?? decoration.length) || 4), 3, 8);
        const direction = String(decoration.direction || '').toLowerCase();
        group.rotation.y = ({
            north: 0,
            east: -Math.PI / 2,
            south: Math.PI,
            west: Math.PI / 2
        })[direction] ?? Number(decoration.rotation || 0);

        const planks = WorldGenerator.getDecorationMaterial('crateWood');
        const posts = WorldGenerator.getDecorationMaterial('darkWood');
        const rope = WorldGenerator.getDecorationMaterial('bannerGold');
        const accent = WorldGenerator.getDistrictAccentMaterial(group.userData.accent) ||
            WorldGenerator.getDecorationMaterial('bannerBlue');
        const deckWidth = 1.62;
        const stepLength = 0.88;
        for (let step = 0; step < lengthTiles; step++) {
            const z = -step * stepLength;
            const board = new THREE.Mesh(new THREE.BoxGeometry(deckWidth, 0.13, stepLength * 0.92), planks);
            board.position.set(0, 0.08 + (step % 2) * 0.008, z);
            group.add(board);
            for (const seam of [-0.49, 0, 0.49]) {
                const strip = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.014, stepLength * 0.88), posts);
                strip.position.set(seam, 0.155, z);
                group.add(strip);
            }
            if (step % 2 !== 0 && step !== lengthTiles - 1) continue;
            for (const side of [-1, 1]) {
                const post = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.08, 1.02, 7), posts);
                post.position.set(side * deckWidth * 0.48, 0.46, z);
                group.add(post);
            }
        }

        const railLength = Math.max(1.2, (lengthTiles - 1) * stepLength);
        for (const side of [-1, 1]) {
            const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, railLength, 6), rope);
            rail.rotation.x = Math.PI / 2;
            rail.position.set(side * deckWidth * 0.48, 0.72, -railLength / 2);
            group.add(rail);
        }

        const endZ = -(lengthTiles - 1) * stepLength;
        const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, 1.52, 7), posts);
        mast.position.set(0, 0.84, endZ);
        group.add(mast);
        const pennant = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.32, 0.035), accent);
        pennant.position.set(0.27, 1.37, endZ);
        group.add(pennant);
        group.userData.landmarkKind = 'dock';
        group.userData.dock = Object.freeze({ lengthTiles, direction: direction || null });
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
            visibleByRange: false,
            roofVisibleByRange: false,
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
        const lodAnchor = this.getBuildingLODAnchor(state);
        state.lodExtent = this.measureBuildingLODExtent(state, lodAnchor);
        if (state.doors.length > 0) {
            // The stored meshes are measured in their closed pose. Reserve the complete
            // panel sweep so an opening door cannot cross an otherwise culled LOD edge.
            state.lodExtent += 0.9;
        }
        this.setBuildingRangeVisibility(state, false);
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

    static normalizeArchitectureThemeId(value) {
        const normalized = String(value || '').trim().toLowerCase().replace(/[\s_]+/g, '-');
        return ARCHITECTURE_THEME_RENDER_PROFILES[normalized] ? normalized : null;
    }

    static normalizeThemeColor(value, fallback = 0xffffff) {
        if (Number.isFinite(Number(value))) return Number(value) & 0xffffff;
        const normalized = String(value || '').trim().replace(/^#/, '');
        if (/^[0-9a-f]{6}$/i.test(normalized)) return Number.parseInt(normalized, 16);
        return Number(fallback) & 0xffffff;
    }

    static resolveArchitectureThemeProfile(building = {}) {
        const id = WorldGenerator.normalizeArchitectureThemeId(
            building.architectureThemeId ?? building.burgThemeId ?? building.themeId
        );
        const preset = id ? ARCHITECTURE_THEME_RENDER_PROFILES[id] : null;
        const suppliedPalette = building.themePalette && typeof building.themePalette === 'object'
            ? building.themePalette
            : {};
        const fallbackRoofColors = preset?.roofColors || [];
        const suppliedRoofColors = Array.isArray(suppliedPalette.roofColors)
            ? suppliedPalette.roofColors.slice(0, 4)
            : [];
        const roofColors = (suppliedRoofColors.length ? suppliedRoofColors : fallbackRoofColors)
            .map((color, index) => WorldGenerator.normalizeThemeColor(
                color,
                fallbackRoofColors[index % Math.max(1, fallbackRoofColors.length)] || 0x8f52ad
            ));
        return Object.freeze({
            id: id || 'legacy-storybook',
            themed: Boolean(id),
            roofGeometry: String(building.roofGeometry || preset?.roofGeometry || '').trim().toLowerCase(),
            roofTextureStyle: String(building.roofTextureStyle || preset?.roofTextureStyle || '').trim().toLowerCase(),
            facadeKit: String(building.facadeKit || preset?.facadeKit || '').trim().toLowerCase(),
            castleKit: String(building.castleKit || preset?.castleKit || '').trim().toLowerCase(),
            palette: Object.freeze({
                roofColors: Object.freeze(roofColors),
                wallColor: WorldGenerator.normalizeThemeColor(
                    suppliedPalette.wallColor,
                    preset?.wallColor ?? (building.style === 'stone' ? 0xc3c4ba : 0xd39a69)
                ),
                trimColor: WorldGenerator.normalizeThemeColor(
                    suppliedPalette.trimColor,
                    preset?.trimColor ?? (building.style === 'stone' ? 0x8e99a2 : 0x5a3421)
                ),
                accentColor: WorldGenerator.normalizeThemeColor(
                    suppliedPalette.accentColor,
                    preset?.accentColor ?? building.districtPalette?.accent ?? 0x4fb7a7
                )
            })
        });
    }

    static resolveBuildingRoofProfile(building = {}) {
        const themeProfile = WorldGenerator.resolveArchitectureThemeProfile(building);
        const architecture = String(building.architectureStyle || '').toLowerCase();
        const roofStyle = String(building.roofStyle || '').toLowerCase();
        const archetype = String(building.archetype || '').toLowerCase();
        const district = String(building.district || '').toLowerCase();
        const roofGeometry = themeProfile.roofGeometry;
        const isKeep = architecture === 'keep' ||
            archetype === 'keep' ||
            Boolean(building.vectorCastle) ||
            building.blueprintId === 'castle-keep' ||
            building.blueprintId === 'burg-vector-castle' ||
            building.sourceType === 'burg-vector-castle';
        const isAsianHipped = !isKeep && themeProfile.id === 'asian' && /hip/.test(roofGeometry);
        const isTieredPagoda = !isKeep && themeProfile.id === 'asian' && !isAsianHipped;
        const isMiddleEasternFlat = !isKeep && themeProfile.id === 'middle-eastern' &&
            /flat|parapet|terrace/.test(roofGeometry) && !/dome/.test(roofGeometry);
        const isDomed = !isKeep && themeProfile.id === 'middle-eastern' && !isMiddleEasternFlat;
        const isNorthernTurreted = !isKeep && themeProfile.id === 'northern-european' &&
            /turret/.test(roofGeometry);
        const isSteepGabled = !isKeep && themeProfile.id === 'northern-european' && !isNorthernTurreted;
        const isSouthernHipped = !isKeep && themeProfile.id === 'southern-european' &&
            /hip/.test(roofGeometry);
        const isLowTerracotta = !isKeep && themeProfile.id === 'southern-european' && !isSouthernHipped;
        const isEgyptianFlat = !isKeep && themeProfile.id === 'egyptian' &&
            /flat|parapet|terrace/.test(roofGeometry) && !/pylon/.test(roofGeometry);
        const isPylonStepped = !isKeep && themeProfile.id === 'egyptian' && !isEgyptianFlat;
        const hasThemeGeometry = isTieredPagoda || isAsianHipped || isDomed ||
            isMiddleEasternFlat || isSteepGabled || isNorthernTurreted ||
            isLowTerracotta || isSouthernHipped || isPylonStepped || isEgyptianFlat;
        const isTower = !isKeep && !hasThemeGeometry && (
            archetype === 'tower' ||
            architecture === 'tower' ||
            roofStyle === 'tower'
        );
        const flatTokens = new Set([
            'arcade',
            'civic',
            'courtyard',
            'flat',
            'flat-roof',
            'market',
            'parapet',
            'stepped',
            'terrace'
        ]);
        const explicitlyFlat = !isKeep && !isTower && !hasThemeGeometry && (
            flatTokens.has(architecture) ||
            flatTokens.has(roofStyle) ||
            flatTokens.has(archetype) ||
            ['civic', 'market'].includes(district)
        );
        const ordinaryGabledArchetypes = new Set([
            'bayfront',
            'cottage',
            'house',
            'inn',
            'residence',
            'shop',
            'townhouse',
            'warehouse',
            'workshop'
        ]);
        const gabledStyles = new Set([
            'bayfront',
            'clay',
            'copper',
            'crosswing',
            'gabled',
            'lean-to',
            'slate',
            'thatch'
        ]);
        const isGabled = !isKeep && !isTower && !explicitlyFlat && !hasThemeGeometry && (
            gabledStyles.has(architecture) ||
            gabledStyles.has(roofStyle) ||
            ordinaryGabledArchetypes.has(archetype) ||
            ['artisan', 'garden', 'harbor', 'residential'].includes(district)
        );
        const geometry = isKeep
            ? (themeProfile.themed ? `castle:${themeProfile.castleKit}` : 'keep')
            : isTieredPagoda ? 'tiered-pagoda'
                : isAsianHipped ? 'asian-hipped'
                    : isDomed ? 'dome-parapet'
                        : isMiddleEasternFlat ? 'middle-eastern-flat-parapet'
                            : isSteepGabled ? 'steep-gable'
                                : isNorthernTurreted ? 'northern-turreted'
                                    : isLowTerracotta ? 'low-terracotta'
                                        : isSouthernHipped ? 'southern-hipped'
                                            : isPylonStepped ? 'pylon-stepped'
                                                : isEgyptianFlat ? 'egyptian-flat-parapet'
                                                    : isTower ? 'tower'
                                                        : isGabled ? 'gabled' : 'flat-parapet';
        return {
            architecture,
            roofStyle,
            roofGeometry,
            archetype,
            district,
            geometry,
            themeProfile,
            isKeep,
            isTower,
            isGabled,
            isTieredPagoda,
            isAsianHipped,
            isDomed,
            isMiddleEasternFlat,
            isSteepGabled,
            isNorthernTurreted,
            isLowTerracotta,
            isSouthernHipped,
            isPylonStepped,
            isEgyptianFlat,
            isFlatParapet: isMiddleEasternFlat || isEgyptianFlat || explicitlyFlat ||
                (!isKeep && !isTower && !isGabled && !hasThemeGeometry)
        };
    }

    createBuildingRoof(building, surfaceY, state) {
        const roof = new THREE.Group();
        const visualSeed = WorldGenerator.hashVisualSeed(
            `${this.voxelMatrix?.world?.contentHash || this.voxelMatrix?.contentHash || this.voxelMatrix?.seed || 0}:${building.id}:${building.roofStyle || building.style || 'timber'}`
        );
        const roofProfile = WorldGenerator.resolveBuildingRoofProfile(building);
        const { themeProfile } = roofProfile;
        roof.position.set(
            building.x + (building.width - 1) / 2,
            surfaceY + 0.23,
            building.y + (building.height - 1) / 2
        );
        roof.userData.buildingId = building.id;
        roof.userData.obstructionTag = state?.obstructionTag || building.obstructionTag ||
            building.buildingTag || `building:${building.id}`;
        roof.userData.obstructionRole = 'roof';
        roof.userData.hideAsUnit = true;
        roof.userData.obstructionZ = state?.roofObstructionZ ??
            Math.max(0, Math.floor(surfaceY - this.getTopSurfaceOffset()));
        roof.userData.architectureStyle = building.architectureStyle || building.roofStyle || building.style;
        roof.userData.architectureThemeId = themeProfile.id;
        roof.userData.motionPhase = (visualSeed % 6283) / 1000;

        const roofMaterial = WorldGenerator.getRoofMaterial(
            building.roofStyle || building.architectureStyle || building.style,
            visualSeed % 4,
            building
        );
        const trimMaterial = WorldGenerator.getArchitectureThemeMaterial(building, 'trim') ||
            WorldGenerator.getDistrictAccentMaterial(building.districtPalette?.accent) ||
            WorldGenerator.getTrimMaterial(building.style);
        const accentMaterial = WorldGenerator.getArchitectureThemeMaterial(building, 'accent') ||
            WorldGenerator.getDistrictAccentMaterial(building.districtPalette?.accent) ||
            trimMaterial;
        const wallMaterial = WorldGenerator.getArchitectureThemeMaterial(building, 'wall') ||
            WorldGenerator.getDecorationMaterial('fortressStone');
        const tileGeometry = new THREE.BoxGeometry(0.98, 0.38, 0.98);
        const parapetHorizontal = new THREE.BoxGeometry(0.98, 0.28, 0.16);
        const parapetVertical = new THREE.BoxGeometry(0.16, 0.28, 0.98);
        const startX = -(building.width - 1) / 2;
        const startZ = -(building.height - 1) / 2;

        const footprint = this.getBuildingFootprint(building);
        const { isKeep, isTower, isGabled } = roofProfile;
        roof.userData.roofProfile = roofProfile.geometry;
        roof.userData.planarRoof = themeProfile.themed;

        if (isKeep) {
            if (themeProfile.themed) {
                this.addThemedCastleGeometry(roof, building, {
                    roofMaterial,
                    trimMaterial,
                    accentMaterial,
                    wallMaterial,
                    themeProfile
                });
            } else {
                this.addKeepRoofGeometry(roof, building, {
                    roofMaterial,
                    trimMaterial,
                    startX,
                    startZ,
                    footprint
                });
            }
        } else if (themeProfile.themed) {
            this.addThemedPlanarRoofGeometry(roof, building, {
                roofMaterial,
                trimMaterial,
                accentMaterial,
                wallMaterial,
                roofProfile,
                footprint,
                startX,
                startZ
            });
        } else if (isTower) {
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
        } else if (isGabled) {
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
            accentMaterial,
            wallMaterial,
            visualSeed,
            isKeep,
            isTower,
            isGabled,
            themeProfile
        });

        roof.traverse((child) => {
            child.castShadow = !child.material?.transparent;
            child.receiveShadow = true;
            child.raycast = () => {};
            child.renderOrder = 12;
        });
        this.threeManager.addToWorld(roof);
        return roof;
    }

    addPlanarRoofPlate(group, options) {
        const {
            width,
            depth,
            material,
            x = 0,
            z = 0,
            y = 0.12,
            height = 0.08,
            segments = 0
        } = options;
        const geometry = segments >= 6
            ? new THREE.CylinderGeometry(
                Math.max(0.2, Math.min(width, depth) / 2),
                Math.max(0.2, Math.min(width, depth) / 2),
                height,
                segments
            )
            : new THREE.BoxGeometry(Math.max(0.2, width), height, Math.max(0.2, depth));
        const plate = new THREE.Mesh(geometry, material);
        plate.position.set(x, y, z);
        if (segments >= 6) {
            plate.scale.set(
                Math.max(0.2, width) / Math.max(0.2, Math.min(width, depth)),
                1,
                Math.max(0.2, depth) / Math.max(0.2, Math.min(width, depth))
            );
        }
        group.add(plate);
        return plate;
    }

    addPlanarFootprintTiles(roof, building, options) {
        const {
            material,
            footprint = this.getBuildingFootprint(building),
            startX = -(building.width - 1) / 2,
            startZ = -(building.height - 1) / 2,
            y = 0.11,
            height = 0.1,
            size = 0.96
        } = options;
        const geometry = new THREE.BoxGeometry(size, height, size);
        for (const { x: localX, y: localY } of footprint.cells) {
            const tile = new THREE.Mesh(geometry, material);
            tile.position.set(startX + localX, y, startZ + localY);
            roof.add(tile);
        }
    }

    addPlanarPerimeterTrim(roof, building, options) {
        const {
            material,
            footprint = this.getBuildingFootprint(building),
            startX = -(building.width - 1) / 2,
            startZ = -(building.height - 1) / 2,
            y = 0.19
        } = options;
        const horizontal = new THREE.BoxGeometry(0.98, 0.07, 0.13);
        const vertical = new THREE.BoxGeometry(0.13, 0.07, 0.98);
        for (const { x: localX, y: localY } of footprint.cells) {
            const x = startX + localX;
            const z = startZ + localY;
            if (!footprint.set.has(localX + ',' + (localY - 1))) {
                const edge = new THREE.Mesh(horizontal, material);
                edge.position.set(x, y, z - 0.46);
                roof.add(edge);
            }
            if (!footprint.set.has(localX + ',' + (localY + 1))) {
                const edge = new THREE.Mesh(horizontal, material);
                edge.position.set(x, y, z + 0.46);
                roof.add(edge);
            }
            if (!footprint.set.has((localX - 1) + ',' + localY)) {
                const edge = new THREE.Mesh(vertical, material);
                edge.position.set(x - 0.46, y, z);
                roof.add(edge);
            }
            if (!footprint.set.has((localX + 1) + ',' + localY)) {
                const edge = new THREE.Mesh(vertical, material);
                edge.position.set(x + 0.46, y, z);
                roof.add(edge);
            }
        }
    }

    addThemedPlanarRoofGeometry(roof, building, options) {
        const {
            roofMaterial,
            trimMaterial,
            accentMaterial,
            wallMaterial,
            roofProfile,
            footprint,
            startX,
            startZ
        } = options;
        const width = Math.max(1, Number(building.width) || 1);
        const depth = Math.max(1, Number(building.height) || 1);
        const geometry = roofProfile.geometry;

        this.addPlanarFootprintTiles(roof, building, {
            material: roofMaterial,
            footprint,
            startX,
            startZ
        });
        this.addPlanarPerimeterTrim(roof, building, {
            material: trimMaterial,
            footprint,
            startX,
            startZ
        });

        if (geometry === 'tiered-pagoda') {
            this.addPlanarRoofPlate(roof, {
                width: Math.max(0.8, width - 0.42),
                depth: Math.max(0.8, depth - 0.42),
                material: accentMaterial,
                y: 0.2,
                height: 0.055
            });
            this.addPlanarRoofPlate(roof, {
                width: depth >= width ? 0.14 : Math.max(0.8, width * 0.56),
                depth: depth >= width ? Math.max(0.8, depth * 0.56) : 0.14,
                material: trimMaterial,
                y: 0.245,
                height: 0.05
            });
            for (const [x, z] of [
                [-width / 2, -depth / 2],
                [width / 2, -depth / 2],
                [width / 2, depth / 2],
                [-width / 2, depth / 2]
            ]) {
                this.addPlanarRoofPlate(roof, {
                    width: 0.2,
                    depth: 0.2,
                    x,
                    z,
                    material: accentMaterial,
                    y: 0.205,
                    height: 0.045
                });
            }
        } else if (geometry === 'asian-hipped') {
            this.addPlanarRoofPlate(roof, {
                width: Math.max(0.75, width - 0.52),
                depth: Math.max(0.75, depth - 0.52),
                material: wallMaterial,
                y: 0.19,
                height: 0.05
            });
            this.addPlanarRoofPlate(roof, {
                width: Math.max(0.62, width - 0.82),
                depth: Math.max(0.62, depth - 0.82),
                material: accentMaterial,
                y: 0.235,
                height: 0.045
            });
        } else if (geometry === 'dome-parapet') {
            this.addPlanarRoofPlate(roof, {
                width: Math.max(0.8, Math.min(width, depth) * 0.62),
                depth: Math.max(0.8, Math.min(width, depth) * 0.62),
                material: accentMaterial,
                y: 0.215,
                height: 0.065,
                segments: 16
            });
            this.addPlanarRoofPlate(roof, {
                width: Math.max(0.42, Math.min(width, depth) * 0.3),
                depth: Math.max(0.42, Math.min(width, depth) * 0.3),
                material: trimMaterial,
                y: 0.27,
                height: 0.045,
                segments: 12
            });
        } else if (geometry === 'middle-eastern-flat-parapet') {
            this.addPlanarRoofPlate(roof, {
                width: Math.max(0.75, width - 0.7),
                depth: Math.max(0.75, depth - 0.7),
                material: wallMaterial,
                y: 0.2,
                height: 0.055
            });
            for (const x of [-width * 0.28, width * 0.28]) {
                this.addPlanarRoofPlate(roof, {
                    width: 0.16,
                    depth: Math.max(0.7, depth * 0.56),
                    x,
                    material: accentMaterial,
                    y: 0.245,
                    height: 0.04
                });
            }
        } else if (geometry === 'steep-gable') {
            const ridgeAlongZ = depth >= width;
            this.addPlanarRoofPlate(roof, {
                width: ridgeAlongZ ? 0.16 : Math.max(0.8, width - 0.36),
                depth: ridgeAlongZ ? Math.max(0.8, depth - 0.36) : 0.16,
                material: accentMaterial,
                y: 0.23,
                height: 0.055
            });
            for (const offset of [-0.28, 0.28]) {
                this.addPlanarRoofPlate(roof, {
                    width: ridgeAlongZ ? 0.08 : Math.max(0.7, width - 0.52),
                    depth: ridgeAlongZ ? Math.max(0.7, depth - 0.52) : 0.08,
                    x: ridgeAlongZ ? offset * width : 0,
                    z: ridgeAlongZ ? 0 : offset * depth,
                    material: trimMaterial,
                    y: 0.2,
                    height: 0.04
                });
            }
        } else if (geometry === 'northern-turreted') {
            const cornerX = Math.max(0.3, width / 2 - 0.46);
            const cornerZ = Math.max(0.3, depth / 2 - 0.46);
            for (const [x, z] of [
                [-cornerX, -cornerZ],
                [cornerX, -cornerZ],
                [cornerX, cornerZ],
                [-cornerX, cornerZ]
            ]) {
                this.addPlanarRoofPlate(roof, {
                    width: 0.68,
                    depth: 0.68,
                    x,
                    z,
                    material: wallMaterial,
                    y: 0.225,
                    height: 0.065,
                    segments: 8
                });
            }
            this.addPlanarRoofPlate(roof, {
                width: 0.14,
                depth: Math.max(0.8, depth - 0.46),
                material: accentMaterial,
                y: 0.26,
                height: 0.045
            });
        } else if (geometry === 'low-terracotta') {
            const ridgeAlongZ = depth >= width;
            this.addPlanarRoofPlate(roof, {
                width: ridgeAlongZ ? 0.18 : Math.max(0.8, width - 0.34),
                depth: ridgeAlongZ ? Math.max(0.8, depth - 0.34) : 0.18,
                material: trimMaterial,
                y: 0.225,
                height: 0.055
            });
            this.addPlanarRoofPlate(roof, {
                width: Math.max(0.7, width - 0.62),
                depth: Math.max(0.7, depth - 0.62),
                material: accentMaterial,
                y: 0.19,
                height: 0.035
            });
        } else if (geometry === 'southern-hipped') {
            this.addPlanarRoofPlate(roof, {
                width: Math.max(0.8, width - 0.48),
                depth: Math.max(0.8, depth - 0.48),
                material: accentMaterial,
                y: 0.205,
                height: 0.06
            });
            this.addPlanarRoofPlate(roof, {
                width: Math.max(0.58, width - 0.92),
                depth: Math.max(0.58, depth - 0.92),
                material: wallMaterial,
                y: 0.25,
                height: 0.04
            });
        } else if (geometry === 'pylon-stepped') {
            for (let step = 0; step < 3; step++) {
                this.addPlanarRoofPlate(roof, {
                    width: Math.max(0.7, width - 0.34 - step * 0.34),
                    depth: Math.max(0.7, depth - 0.34 - step * 0.28),
                    material: step === 1 ? accentMaterial : wallMaterial,
                    y: 0.19 + step * 0.055,
                    height: 0.05
                });
            }
            for (const x of [-width * 0.25, width * 0.25]) {
                this.addPlanarRoofPlate(roof, {
                    width: Math.max(0.32, width * 0.16),
                    depth: Math.max(0.6, depth * 0.44),
                    x,
                    z: -depth * 0.18,
                    material: trimMaterial,
                    y: 0.31,
                    height: 0.045
                });
            }
        } else if (geometry === 'egyptian-flat-parapet') {
            this.addPlanarRoofPlate(roof, {
                width: Math.max(0.8, width - 0.5),
                depth: Math.max(0.8, depth - 0.5),
                material: wallMaterial,
                y: 0.205,
                height: 0.06
            });
            for (const z of [-depth * 0.28, 0, depth * 0.28]) {
                this.addPlanarRoofPlate(roof, {
                    width: Math.max(0.7, width - 0.48),
                    depth: 0.11,
                    z,
                    material: z === 0 ? accentMaterial : trimMaterial,
                    y: 0.25,
                    height: 0.04
                });
            }
        }

        roof.userData.planarRoof = true;
        roof.userData.planarRoofMaxLocalY = 0.36;
    }

    addHippedRoofCap(group, options) {
        const {
            width,
            depth,
            baseY = 0,
            roofMaterial,
            trimMaterial,
            overhang = 0.18
        } = options;
        this.addPlanarRoofPlate(group, {
            width: width + overhang * 2,
            depth: depth + overhang * 2,
            material: trimMaterial,
            y: baseY + 0.045,
            height: 0.09
        });
        this.addPlanarRoofPlate(group, {
            width,
            depth,
            material: roofMaterial,
            y: baseY + 0.115,
            height: 0.055
        });
        return baseY + 0.145;
    }

    addThemedCastleGeometry(roof, building, options) {
        const { roofMaterial, trimMaterial, accentMaterial, wallMaterial, themeProfile } = options;
        const width = Math.max(3, Number(building.width) || 3);
        const depth = Math.max(3, Number(building.height) || 3);
        const footprint = this.getBuildingFootprint(building);
        const startX = -(building.width - 1) / 2;
        const startZ = -(building.height - 1) / 2;
        const alternateKit = /palace|ring|palazzo|temple/.test(themeProfile.castleKit);

        this.addPlanarFootprintTiles(roof, building, {
            material: roofMaterial,
            footprint,
            startX,
            startZ,
            y: 0.11,
            height: 0.11
        });
        this.addPlanarPerimeterTrim(roof, building, {
            material: trimMaterial,
            footprint,
            startX,
            startZ,
            y: 0.2
        });

        if (themeProfile.id === 'asian') {
            this.addPlanarRoofPlate(roof, {
                width: width * (alternateKit ? 0.72 : 0.58),
                depth: depth * (alternateKit ? 0.48 : 0.66),
                material: accentMaterial,
                y: 0.235,
                height: 0.06
            });
            for (const [x, z] of [
                [-width * 0.34, -depth * 0.34],
                [width * 0.34, -depth * 0.34],
                [width * 0.34, depth * 0.34],
                [-width * 0.34, depth * 0.34]
            ]) {
                this.addPlanarRoofPlate(roof, {
                    width: 0.58,
                    depth: 0.58,
                    x,
                    z,
                    material: wallMaterial,
                    y: 0.275,
                    height: 0.05
                });
            }
        } else if (themeProfile.id === 'middle-eastern') {
            this.addPlanarRoofPlate(roof, {
                width: Math.min(width, depth) * (alternateKit ? 0.48 : 0.6),
                depth: Math.min(width, depth) * (alternateKit ? 0.48 : 0.6),
                material: accentMaterial,
                y: 0.24,
                height: 0.06,
                segments: alternateKit ? 12 : 16
            });
            const cornerX = width / 2 - 0.48;
            const cornerZ = depth / 2 - 0.48;
            for (const [x, z] of [[-cornerX, -cornerZ], [cornerX, -cornerZ], [cornerX, cornerZ], [-cornerX, cornerZ]]) {
                this.addPlanarRoofPlate(roof, {
                    width: 0.62,
                    depth: 0.62,
                    x,
                    z,
                    material: wallMaterial,
                    y: 0.275,
                    height: 0.05,
                    segments: 10
                });
            }
        } else if (themeProfile.id === 'northern-european') {
            this.addPlanarRoofPlate(roof, {
                width: alternateKit ? width * 0.7 : 0.18,
                depth: alternateKit ? 0.18 : depth * 0.72,
                material: accentMaterial,
                y: 0.25,
                height: 0.065
            });
            const padZ = alternateKit ? depth * 0.31 : -depth * 0.31;
            for (const x of [-width * 0.31, width * 0.31]) {
                this.addPlanarRoofPlate(roof, {
                    width: 0.72,
                    depth: 0.72,
                    x,
                    z: padZ,
                    material: wallMaterial,
                    y: 0.285,
                    height: 0.05,
                    segments: 8
                });
            }
        } else if (themeProfile.id === 'southern-european') {
            this.addPlanarRoofPlate(roof, {
                width: width * (alternateKit ? 0.68 : 0.54),
                depth: depth * (alternateKit ? 0.5 : 0.62),
                material: wallMaterial,
                y: 0.235,
                height: 0.055
            });
            for (const [x, z] of [
                [-width * 0.32, -depth * 0.32],
                [width * 0.32, -depth * 0.32],
                [width * 0.32, depth * 0.32],
                [-width * 0.32, depth * 0.32]
            ]) {
                this.addPlanarRoofPlate(roof, {
                    width: 0.56,
                    depth: 0.56,
                    x,
                    z,
                    material: accentMaterial,
                    y: 0.275,
                    height: 0.05
                });
            }
        } else {
            for (let step = 0; step < 3; step++) {
                this.addPlanarRoofPlate(roof, {
                    width: width * (0.76 - step * 0.12),
                    depth: depth * (0.68 - step * 0.1),
                    material: step === 1 ? accentMaterial : wallMaterial,
                    y: 0.21 + step * 0.055,
                    height: 0.05
                });
            }
            for (const x of [-width * 0.27, width * 0.27]) {
                this.addPlanarRoofPlate(roof, {
                    width: width * 0.16,
                    depth: depth * (alternateKit ? 0.52 : 0.38),
                    x,
                    z: -depth * 0.2,
                    material: trimMaterial,
                    y: 0.34,
                    height: 0.04
                });
            }
        }

        roof.userData.keep = true;
        roof.userData.castleKit = themeProfile.castleKit;
        roof.userData.planarRoof = true;
        roof.userData.planarRoofMaxLocalY = 0.4;
    }
    addKeepRoofGeometry(roof, building, options) {
        const { roofMaterial, trimMaterial, startX, startZ, footprint } = options;
        const stone = WorldGenerator.getDecorationMaterial('fortressStone');
        const gold = WorldGenerator.getDecorationMaterial('bannerGold');
        const windowGlow = WorldGenerator.getDecorationMaterial('windowGlow');
        const width = Math.max(3, Number(building.width) || 3);
        const height = Math.max(3, Number(building.height) || 3);
        const deck = new THREE.Mesh(new THREE.BoxGeometry(width + 0.18, 0.3, height + 0.18), stone);
        deck.position.y = 0.16;
        roof.add(deck);

        const merlonGeometry = new THREE.BoxGeometry(0.34, 0.42, 0.34);
        const merlonPositions = new Map();
        const addMerlon = (x, z) => {
            const key = `${Math.round(x * 20)},${Math.round(z * 20)}`;
            if (merlonPositions.has(key)) return;
            merlonPositions.set(key, { x, z });
        };
        for (const { x: localX, y: localY } of footprint.cells) {
            const x = startX + localX;
            const z = startZ + localY;
            if (!footprint.set.has(`${localX},${localY - 1}`)) addMerlon(x, z - 0.47);
            if (!footprint.set.has(`${localX},${localY + 1}`)) addMerlon(x, z + 0.47);
            if (!footprint.set.has(`${localX - 1},${localY}`)) addMerlon(x - 0.47, z);
            if (!footprint.set.has(`${localX + 1},${localY}`)) addMerlon(x + 0.47, z);
        }
        for (const position of merlonPositions.values()) {
            const merlon = new THREE.Mesh(merlonGeometry, stone);
            merlon.position.set(position.x, 0.53, position.z);
            roof.add(merlon);
        }

        const cornerInset = 0.58;
        const cornerX = Math.max(0.88, width / 2 - cornerInset);
        const cornerZ = Math.max(0.88, height / 2 - cornerInset);
        for (const [index, [x, z]] of [
            [-cornerX, -cornerZ],
            [cornerX, -cornerZ],
            [cornerX, cornerZ],
            [-cornerX, cornerZ]
        ].entries()) {
            const turret = new THREE.Group();
            turret.position.set(x, 0, z);
            const tower = new THREE.Mesh(new THREE.BoxGeometry(1.06, 1.18, 1.06), stone);
            tower.position.y = 0.83;
            turret.add(tower);

            const cap = new THREE.Mesh(new THREE.ConeGeometry(0.76, 0.82, 4), roofMaterial);
            cap.rotation.y = Math.PI / 4;
            cap.position.y = 1.82;
            turret.add(cap);

            const windowZ = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.34, 0.045), windowGlow);
            windowZ.position.set(0, 0.88, Math.sign(z || 1) * 0.555);
            turret.add(windowZ);
            const windowX = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.34, 0.28), windowGlow);
            windowX.position.set(Math.sign(x || 1) * 0.555, 0.88, 0);
            turret.add(windowX);

            const finial = new THREE.Mesh(new THREE.SphereGeometry(0.085, 7, 5), gold);
            finial.position.y = 2.28 + (index % 2) * 0.06;
            turret.add(finial);
            roof.add(turret);
        }

        const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, 2.15, 7), gold);
        mast.position.y = 1.34;
        roof.add(mast);
        const royalFlag = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.46, 0.045), trimMaterial);
        royalFlag.position.set(0.39, 2.03, 0);
        roof.add(royalFlag);
        const flagChevron = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.28, 0.055), gold);
        flagChevron.position.set(0.39, 2.03, -0.03);
        flagChevron.rotation.z = Math.PI / 4;
        roof.add(flagChevron);
        roof.userData.keep = true;
    }

    addRoofSilhouetteDetails(roof, building, options) {
        const { roofMaterial, trimMaterial, visualSeed, isKeep, isTower, isGabled } = options;
        const themeProfile = options.themeProfile || WorldGenerator.resolveArchitectureThemeProfile(building);
        if (themeProfile.themed) {
            // The themed roof and castle kits already own the silhouette. Returning here is
            // deliberate: clocks, dormers, generic chimneys, and windmill rotors made every
            // imported burg read as the same Western storybook town.
            roof.userData.silhouetteDetailKit = themeProfile.roofGeometry;
            return;
        }
        const architecture = String(building.architectureStyle || '').toLowerCase();
        const district = String(building.district || '').toLowerCase();
        const archetype = String(building.archetype || '').toLowerCase();
        const accent = WorldGenerator.getDistrictAccentMaterial(building.districtPalette?.accent) || trimMaterial;
        const width = Math.max(1, building.width || 1);
        const height = Math.max(1, building.height || 1);
        const isLighthouse = building.blueprintId === 'lighthouse';

        if (isKeep) return;

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
        const themeProfile = WorldGenerator.resolveArchitectureThemeProfile(building);
        const baseY = Math.max(0, Number(building.baseElevation) || 0) + this.getTopSurfaceOffset();
        const wallHeight = Math.max(1.65, Math.max(1, Number(building.stories) || 1) * 1.72);
        const accent = WorldGenerator.getArchitectureThemeMaterial(building, 'accent') ||
            WorldGenerator.getDistrictAccentMaterial(building.districtPalette?.accent) ||
            WorldGenerator.getDecorationMaterial('bannerBlue');
        const trim = WorldGenerator.getArchitectureThemeMaterial(building, 'trim') ||
            WorldGenerator.getTrimMaterial(building.style);
        const wall = WorldGenerator.getArchitectureThemeMaterial(building, 'wall') ||
            WorldGenerator.getDecorationMaterial('stoneLight');
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

        if (themeProfile.themed) {
            this.addThemedFacadeDecorations(group, building, {
                themeProfile,
                frontCells,
                frontEdge,
                baseY,
                wallHeight,
                visualSeed,
                accent,
                trim,
                wall
            });
        } else {
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
        }

        group.userData.architectureThemeId = themeProfile.id;
        group.userData.facadeKit = themeProfile.themed ? themeProfile.facadeKit : 'storybook-facade';
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

    addThemedFacadeDecorations(group, building, options) {
        const {
            themeProfile,
            frontCells,
            frontEdge,
            baseY,
            wallHeight,
            visualSeed,
            accent,
            trim,
            wall
        } = options;
        const isDoorCell = (cell) => building.door?.x === cell.x && building.door?.y === cell.y;
        const windowCells = frontCells.filter((cell) => !isDoorCell(cell)).slice(0, 3);
        const doorCell = building.door
            ? { x: building.door.x, y: building.door.y, edge: frontEdge }
            : null;

        if (themeProfile.id === 'asian') {
            for (const cell of windowCells) {
                const lattice = this.createThemeLatticeFacade(trim, accent, 'orthogonal');
                this.placeFacadeAttachment(lattice, building, cell, baseY + wallHeight * 0.5, 0.555);
                group.add(lattice);
            }
            if (doorCell) {
                const portal = this.createAsianFacadePortal(trim, accent);
                this.placeFacadeAttachment(portal, building, doorCell, baseY, 0.61);
                group.add(portal);
                const lantern = this.createAsianFacadeLantern(trim, accent);
                this.placeFacadeAttachment(
                    lantern,
                    building,
                    doorCell,
                    baseY + Math.min(1.62, wallHeight * 0.72),
                    0.7,
                    0.38
                );
                group.add(lantern);
            }
        } else if (themeProfile.id === 'middle-eastern') {
            for (const cell of windowCells) {
                const screen = this.createThemeLatticeFacade(trim, accent, 'diamond');
                this.placeFacadeAttachment(screen, building, cell, baseY + wallHeight * 0.5, 0.555);
                group.add(screen);
                if (building.activity === 'trade' || building.district === 'market') {
                    const awning = this.createFacadeAwning(accent, visualSeed + cell.x * 13 + cell.y * 29);
                    this.placeFacadeAttachment(awning, building, cell, baseY + wallHeight * 0.66, 0.68);
                    group.add(awning);
                }
            }
            if (doorCell) {
                const portal = this.createThemedArchPortal(wall, trim, accent, true);
                this.placeFacadeAttachment(portal, building, doorCell, baseY, 0.61);
                group.add(portal);
            }
        } else if (themeProfile.id === 'northern-european') {
            for (const cell of frontCells.slice(0, 4)) {
                const brace = this.createTimberBraceFacade(trim, accent);
                this.placeFacadeAttachment(brace, building, cell, baseY + wallHeight * 0.49, 0.545);
                group.add(brace);
            }
            if (doorCell) {
                const lantern = this.createFacadeLantern();
                this.placeFacadeAttachment(
                    lantern,
                    building,
                    doorCell,
                    baseY + Math.min(1.52, wallHeight * 0.7),
                    0.64,
                    0.34
                );
                group.add(lantern);
            }
        } else if (themeProfile.id === 'southern-european') {
            for (const cell of windowCells) {
                const awning = this.createFacadeAwning(accent, visualSeed + cell.x * 19 + cell.y * 31);
                this.placeFacadeAttachment(awning, building, cell, baseY + wallHeight * 0.54, 0.68);
                group.add(awning);
                if (building.district === 'garden' || building.district === 'residential') {
                    const flowerBox = this.createFacadeFlowerBox(visualSeed + cell.x * 17 + cell.y * 37);
                    this.placeFacadeAttachment(flowerBox, building, cell, baseY + wallHeight * 0.36, 0.58);
                    group.add(flowerBox);
                }
            }
            if (doorCell) {
                const arcade = this.createThemedArchPortal(wall, trim, accent, false);
                this.placeFacadeAttachment(arcade, building, doorCell, baseY, 0.61);
                group.add(arcade);
            }
        } else {
            for (const cell of frontCells.slice(0, 4)) {
                const bands = this.createPylonFacadeBands(trim, accent);
                this.placeFacadeAttachment(bands, building, cell, baseY + wallHeight * 0.5, 0.55);
                group.add(bands);
            }
            if (doorCell) {
                const pylon = this.createPylonFacadePortal(wall, trim, accent);
                this.placeFacadeAttachment(pylon, building, doorCell, baseY, 0.62);
                group.add(pylon);
            }
        }
    }

    createThemeLatticeFacade(trimMaterial, accentMaterial, pattern = 'orthogonal') {
        const group = new THREE.Group();
        const backing = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.7, 0.035), accentMaterial);
        backing.position.z = -0.025;
        group.add(backing);
        for (const x of [-0.32, 0.32]) {
            const side = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.82, 0.07), trimMaterial);
            side.position.x = x;
            group.add(side);
        }
        for (const y of [-0.38, 0.38]) {
            const rail = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.07, 0.07), trimMaterial);
            rail.position.y = y;
            group.add(rail);
        }
        if (pattern === 'diamond') {
            for (const rotation of [-0.68, 0.68]) {
                const diagonal = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.82, 0.075), trimMaterial);
                diagonal.rotation.z = rotation;
                group.add(diagonal);
            }
        } else {
            for (const x of [-0.12, 0.12]) {
                const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.72, 0.075), trimMaterial);
                mullion.position.x = x;
                group.add(mullion);
            }
            const rail = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.055, 0.075), trimMaterial);
            group.add(rail);
        }
        return group;
    }

    createAsianFacadePortal(trimMaterial, accentMaterial) {
        const group = new THREE.Group();
        for (const x of [-0.48, 0.48]) {
            const post = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.95, 0.15), trimMaterial);
            post.position.set(x, 0.98, 0);
            group.add(post);
        }
        const lintel = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.18, 0.2), accentMaterial);
        lintel.position.y = 1.88;
        group.add(lintel);
        const upperBeam = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.12, 0.3), trimMaterial);
        upperBeam.position.y = 2.1;
        group.add(upperBeam);
        this.addHippedRoofCap(group, {
            width: 1.22,
            depth: 0.34,
            rise: 0.3,
            baseY: 2.16,
            roofMaterial: accentMaterial,
            trimMaterial,
            overhang: 0.14
        });
        return group;
    }

    createAsianFacadeLantern(trimMaterial, accentMaterial) {
        const group = new THREE.Group();
        const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.42), trimMaterial);
        bracket.position.z = 0.2;
        group.add(bracket);
        const frame = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.17, 0.32, 8), accentMaterial);
        frame.position.set(0, -0.2, 0.42);
        group.add(frame);
        const tassel = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.2, 6), trimMaterial);
        tassel.position.set(0, -0.46, 0.42);
        group.add(tassel);
        return group;
    }

    createThemedArchPortal(wallMaterial, trimMaterial, accentMaterial, pointed = false) {
        const group = new THREE.Group();
        for (const x of [-0.48, 0.48]) {
            const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.68, 0.18), wallMaterial);
            pillar.position.set(x, 0.84, 0);
            group.add(pillar);
            const capital = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.12, 0.22), trimMaterial);
            capital.position.set(x, 1.68, 0);
            group.add(capital);
        }
        if (pointed) {
            for (const side of [-1, 1]) {
                const archSide = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.74, 0.16), trimMaterial);
                archSide.position.set(side * 0.25, 1.91, 0);
                archSide.rotation.z = side * 0.72;
                group.add(archSide);
            }
        } else {
            const arch = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.09, 7, 18, Math.PI), trimMaterial);
            arch.position.y = 1.7;
            group.add(arch);
        }
        const crest = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.28, 0.11), accentMaterial);
        crest.position.set(0, pointed ? 2.28 : 2.1, 0);
        crest.rotation.z = Math.PI / 4;
        group.add(crest);
        return group;
    }

    createTimberBraceFacade(trimMaterial, accentMaterial) {
        const group = new THREE.Group();
        const center = new THREE.Mesh(new THREE.BoxGeometry(0.09, 1.18, 0.07), trimMaterial);
        group.add(center);
        for (const rotation of [-0.58, 0.58]) {
            const brace = new THREE.Mesh(new THREE.BoxGeometry(0.075, 1.12, 0.075), trimMaterial);
            brace.rotation.z = rotation;
            group.add(brace);
        }
        const crossbar = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.09, 0.08), accentMaterial);
        crossbar.position.y = 0.32;
        group.add(crossbar);
        return group;
    }

    createPylonFacadeBands(trimMaterial, accentMaterial) {
        const group = new THREE.Group();
        for (let index = 0; index < 3; index++) {
            const band = new THREE.Mesh(
                new THREE.BoxGeometry(0.78 - index * 0.08, 0.1, 0.075),
                index === 1 ? accentMaterial : trimMaterial
            );
            band.position.y = -0.34 + index * 0.34;
            group.add(band);
        }
        const sun = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.045, 14), accentMaterial);
        sun.rotation.x = Math.PI / 2;
        sun.position.y = 0.36;
        group.add(sun);
        return group;
    }

    createPylonFacadePortal(wallMaterial, trimMaterial, accentMaterial) {
        const group = new THREE.Group();
        for (const x of [-0.48, 0.48]) {
            for (let level = 0; level < 3; level++) {
                const block = new THREE.Mesh(
                    new THREE.BoxGeometry(0.32 - level * 0.045, 0.62, 0.24),
                    wallMaterial
                );
                block.position.set(x, 0.31 + level * 0.62, 0);
                group.add(block);
            }
            const crown = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.12, 0.28), trimMaterial);
            crown.position.set(x, 1.94, 0);
            group.add(crown);
        }
        const lintel = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.24, 0.27), trimMaterial);
        lintel.position.y = 1.72;
        group.add(lintel);
        const sun = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.055, 16), accentMaterial);
        sun.rotation.x = Math.PI / 2;
        sun.position.set(0, 2.02, -0.02);
        group.add(sun);
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
        const frameMaterial = WorldGenerator.getDoorFrameMaterial(building.style, building);
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

        const threshold = new THREE.Mesh(
            thresholdGeometry,
            WorldGenerator.getFloorAccentMaterial(building.style, building)
        );
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

    static setBoundedMaterialCacheEntry(cache, key, material, maxEntries = 96) {
        if (!cache.has(key) && cache.size >= maxEntries) {
            const oldestKey = cache.keys().next().value;
            if (oldestKey !== undefined) cache.delete(oldestKey);
        }
        cache.set(key, material);
        return material;
    }

    static getArchitectureThemeMaterial(building, channel = 'trim') {
        const profile = WorldGenerator.resolveArchitectureThemeProfile(building);
        if (!profile.themed) return null;
        const normalizedChannel = ['wall', 'trim', 'accent'].includes(channel) ? channel : 'trim';
        const color = profile.palette[`${normalizedChannel}Color`];
        if (!WorldGenerator.architectureThemeMaterialCache) {
            WorldGenerator.architectureThemeMaterialCache = new Map();
        }
        const colorKey = (Number(color) & 0xffffff).toString(16).padStart(6, '0');
        const key = `${profile.id}:${normalizedChannel}:${colorKey}`;
        if (!WorldGenerator.architectureThemeMaterialCache.has(key)) {
            const material = new THREE.MeshStandardMaterial({
                color,
                roughness: normalizedChannel === 'accent' ? 0.64 : normalizedChannel === 'trim' ? 0.76 : 0.9,
                metalness: normalizedChannel === 'accent' ? 0.08 : 0.015
            });
            material.name = `architecture-theme:${key}`;
            WorldGenerator.setBoundedMaterialCacheEntry(
                WorldGenerator.architectureThemeMaterialCache,
                key,
                material,
                80
            );
        }
        return WorldGenerator.architectureThemeMaterialCache.get(key);
    }

    static getRoofMaterial(style, variant = 0, themeContext = null) {
        if (!WorldGenerator.roofMaterialCache) WorldGenerator.roofMaterialCache = new Map();
        const themeProfile = WorldGenerator.resolveArchitectureThemeProfile(themeContext || {});
        const styleKey = String(
            themeProfile.themed
                ? (themeProfile.roofTextureStyle || style || 'timber')
                : (style || 'timber')
        ).toLowerCase();
        const variantIndex = Math.abs(Math.floor(Number(variant) || 0)) % 4;
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
            market: [0xf0a544, 0xd95b74, 0x4fa4a0, 0x8b62bc],
            'stone-slab': [0xd4ad5e, 0xc69648, 0xe1bd6a, 0xb9873f]
        };
        const palette = themeProfile.themed && themeProfile.palette.roofColors.length
            ? themeProfile.palette.roofColors
            : (colors[styleKey] || colors.timber);
        const baseColor = palette[variantIndex % palette.length];
        const colorKey = (Number(baseColor) & 0xffffff).toString(16).padStart(6, '0');
        const key = themeProfile.themed
            ? `theme:${themeProfile.id}:${styleKey}:${variantIndex}:${colorKey}`
            : `legacy:${styleKey}:${variantIndex}`;
        if (!WorldGenerator.roofMaterialCache.has(key)) {
            const texture = WorldGenerator.createRoofTexture(styleKey, baseColor, variantIndex);
            const material = new THREE.MeshStandardMaterial({
                color: texture ? 0xffffff : baseColor,
                map: texture || null,
                roughness: styleKey === 'thatch' || styleKey === 'stone-slab'
                    ? 0.94
                    : styleKey === 'copper' ? 0.66 : 0.8,
                metalness: styleKey === 'copper' ? 0.1 : 0.02
            });
            material.name = `building-roof:${key}`;
            WorldGenerator.setBoundedMaterialCacheEntry(WorldGenerator.roofMaterialCache, key, material, 96);
        }
        return WorldGenerator.roofMaterialCache.get(key);
    }

    static createRoofTexture(style, baseColor, variant = 0) {
        if (typeof document === 'undefined') return null;
        const canvas = document.createElement('canvas');
        canvas.width = 96;
        canvas.height = 96;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;
        ctx.imageSmoothingEnabled = false;
        const css = (value) => `#${(Number(value) & 0xffffff).toString(16).padStart(6, '0')}`;
        const shade = (amount) => {
            const red = Math.max(0, Math.min(255, (baseColor >> 16) + amount));
            const green = Math.max(0, Math.min(255, ((baseColor >> 8) & 0xff) + amount));
            const blue = Math.max(0, Math.min(255, (baseColor & 0xff) + amount));
            return css((red << 16) | (green << 8) | blue);
        };
        const highlight = shade(28);
        const midtone = shade(10);
        const shadow = shade(-34);
        const deepShadow = shade(-52);
        ctx.fillStyle = css(baseColor);
        ctx.fillRect(0, 0, 96, 96);

        if (style === 'thatch') {
            for (let row = -8; row < 104; row += 12) {
                ctx.globalAlpha = 1;
                ctx.fillStyle = ((row / 12 + variant) & 1) ? midtone : css(baseColor);
                ctx.fillRect(0, row, 96, 9);
                ctx.strokeStyle = shadow;
                ctx.globalAlpha = 0.62;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(0, row + 9);
                ctx.lineTo(96, row + 9);
                ctx.stroke();
                for (let x = -10 + ((row + variant * 7) % 13); x < 104; x += 9) {
                    ctx.strokeStyle = (x + row) % 3 ? highlight : deepShadow;
                    ctx.globalAlpha = 0.32;
                    ctx.beginPath();
                    ctx.moveTo(x, row + 1);
                    ctx.lineTo(x + 5, row + 8);
                    ctx.stroke();
                }
            }
        } else if (style === 'copper') {
            for (let row = 0; row < 96; row += 24) {
                for (let col = 0; col < 96; col += 24) {
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = ((row + col) / 24 + variant) % 3 === 0 ? midtone : css(baseColor);
                    ctx.fillRect(col + 2, row + 2, 20, 20);
                    ctx.strokeStyle = shadow;
                    ctx.globalAlpha = 0.72;
                    ctx.lineWidth = 2;
                    ctx.strokeRect(col + 1, row + 1, 22, 22);
                }
            }
            ctx.fillStyle = variant % 2 ? '#7ad1b4' : '#66c5ab';
            ctx.globalAlpha = 0.3;
            for (let index = 0; index < 14; index++) {
                const x = (index * 29 + variant * 17) % 91;
                const y = (index * 43 + variant * 11) % 91;
                ctx.fillRect(x, y, 4 + (index % 3) * 2, 3 + (index % 2) * 2);
            }
        } else if (style === 'stone-slab') {
            const blockWidth = 24;
            const blockHeight = 18;
            for (let row = -blockHeight; row < 96 + blockHeight; row += blockHeight) {
                const offset = ((Math.floor(row / blockHeight) + variant) & 1) * (blockWidth / 2);
                for (let col = -blockWidth + offset; col < 96 + blockWidth; col += blockWidth) {
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = ((col / blockWidth + row / blockHeight + variant) & 1)
                        ? midtone
                        : css(baseColor);
                    ctx.fillRect(col + 1, row + 1, blockWidth - 2, blockHeight - 2);
                    ctx.strokeStyle = shadow;
                    ctx.lineWidth = 2;
                    ctx.strokeRect(col, row, blockWidth, blockHeight);
                }
            }
            ctx.globalAlpha = 0.34;
            ctx.fillStyle = highlight;
            for (let y = 11 + variant * 3; y < 96; y += 36) {
                for (let x = 8; x < 96; x += 24) {
                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(Math.PI / 4);
                    ctx.fillRect(-3, -3, 6, 6);
                    ctx.restore();
                }
            }
        } else if (['clay', 'courtyard', 'gabled', 'market'].includes(style)) {
            const tileWidth = 18;
            const rowHeight = 15;
            for (let row = -rowHeight; row < 96 + rowHeight; row += rowHeight) {
                const offset = ((Math.floor(row / rowHeight) + variant) & 1) * (tileWidth / 2);
                for (let col = -tileWidth + offset; col < 96 + tileWidth; col += tileWidth) {
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = ((col / tileWidth + row / rowHeight + variant) & 1) ? midtone : css(baseColor);
                    ctx.fillRect(col + 1, row + 1, tileWidth - 2, rowHeight - 2);
                    ctx.strokeStyle = shadow;
                    ctx.globalAlpha = 0.68;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(col, row);
                    ctx.lineTo(col, row + rowHeight - 2);
                    ctx.quadraticCurveTo(col + tileWidth / 2, row + rowHeight + 3, col + tileWidth, row + rowHeight - 2);
                    ctx.lineTo(col + tileWidth, row);
                    ctx.stroke();
                }
            }
            if (style === 'market') {
                ctx.fillStyle = highlight;
                ctx.globalAlpha = 0.16;
                for (let x = (variant % 3) * 12; x < 96; x += 36) ctx.fillRect(x, 0, 10, 96);
            }
        } else {
            const tileWidth = 20;
            const rowHeight = 16;
            for (let row = -rowHeight; row < 96 + rowHeight; row += rowHeight) {
                const offset = ((Math.floor(row / rowHeight) + variant) & 1) * (tileWidth / 2);
                for (let col = -tileWidth + offset; col < 96 + tileWidth; col += tileWidth) {
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = ((col / tileWidth + row / rowHeight + variant) & 1) ? midtone : css(baseColor);
                    ctx.beginPath();
                    ctx.moveTo(col + 1, row + 1);
                    ctx.lineTo(col + tileWidth - 1, row + 1);
                    ctx.lineTo(col + tileWidth - 3, row + rowHeight - 4);
                    ctx.lineTo(col + tileWidth / 2, row + rowHeight);
                    ctx.lineTo(col + 3, row + rowHeight - 4);
                    ctx.closePath();
                    ctx.fill();
                    ctx.strokeStyle = deepShadow;
                    ctx.globalAlpha = 0.58;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
            }
        }

        ctx.globalAlpha = 0.2;
        ctx.fillStyle = highlight;
        ctx.fillRect(0, 0, 96, 3);
        ctx.globalAlpha = 1;
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.needsUpdate = true;
        return texture;
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

    static resolveTerrainDetailPreset(key, paletteId = 'meadow') {
        const fixedPresets = {
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
        if (fixedPresets[key]) return fixedPresets[key];

        const palette = resolveWorldPaletteVariant(paletteId, 0);
        const top = new THREE.Color(palette.topColor);
        const side = new THREE.Color(palette.sideColor);
        const accent = new THREE.Color(palette.accentColor);
        let color = side.clone();
        let roughness = 0.94;
        let metalness = 0.01;

        if (key === 'grassLip') {
            color = top.clone().lerp(accent, 0.14);
            roughness = 0.91;
            metalness = 0;
        } else if (key === 'cliffMoss') {
            // "Moss" is a silhouette detail, not a universal green material: in arid,
            // polar, coastal, and magical biomes it becomes ochre scrub, frost, sea
            // growth, or crystal bloom using the same world-palette contract.
            color = accent.clone().lerp(top, 0.22).multiplyScalar(0.84);
            roughness = palette.paletteId === 'crystal' ? 0.68 : 0.9;
            metalness = palette.paletteId === 'crystal' ? 0.07 : 0;
        } else {
            color = side.clone().lerp(accent, 0.12);
        }

        const preset = {
            color: color.getHex(),
            roughness,
            metalness
        };
        if (palette.paletteId === 'crystal') {
            preset.emissive = color.clone().multiplyScalar(0.18).getHex();
            preset.emissiveIntensity = key === 'cliffMoss' ? 0.16 : 0.08;
        }
        return preset;
    }

    static getTerrainDetailMaterial(key, paletteId = 'meadow') {
        if (!WorldGenerator.terrainDetailMaterialCache) WorldGenerator.terrainDetailMaterialCache = new Map();
        const resolvedPaletteId = resolveWorldPaletteVariant(paletteId, 0).paletteId;
        const cacheKey = `${key}:${['waterfall', 'waterFoam'].includes(key) ? 'shared' : resolvedPaletteId}`;
        if (!WorldGenerator.terrainDetailMaterialCache.has(cacheKey)) {
            const material = new THREE.MeshStandardMaterial(
                WorldGenerator.resolveTerrainDetailPreset(key, resolvedPaletteId)
            );
            material.name = `terrain-detail:${key}:${resolvedPaletteId}`;
            WorldGenerator.terrainDetailMaterialCache.set(
                cacheKey,
                material
            );
        }
        return WorldGenerator.terrainDetailMaterialCache.get(cacheKey);
    }

    static getWaterfallMistMaterial() {
        if (!WorldGenerator.waterfallMistMaterial) {
            WorldGenerator.waterfallMistMaterial = new THREE.PointsMaterial({
                color: 0xe9fdff,
                size: 0.12,
                transparent: true,
                opacity: 0.52,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                sizeAttenuation: true
            });
        }
        return WorldGenerator.waterfallMistMaterial;
    }

    static getTrimMaterial(style, themeContext = null) {
        const themeMaterial = WorldGenerator.getArchitectureThemeMaterial(themeContext || {}, 'trim');
        if (themeMaterial) return themeMaterial;
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

    static getDoorFrameMaterial(style, themeContext = null) {
        const themeMaterial = WorldGenerator.getArchitectureThemeMaterial(themeContext || {}, 'trim');
        if (themeMaterial) return themeMaterial;
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

    static getFloorAccentMaterial(style, themeContext = null) {
        const themeMaterial = WorldGenerator.getArchitectureThemeMaterial(themeContext || {}, 'wall');
        if (themeMaterial) return themeMaterial;
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
                fortressStone: { color: 0xbfc4bc, roughness: 0.9, metalness: 0.01 },
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
        this.setBuildingRangeVisibility(state, state.visibleByRange !== false);
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

    setSceneObjectRangeVisibility(object, isVisible) {
        if (!object) return;
        object.visibleByRange = isVisible;
        object.visible = isVisible && object.hiddenByObstruction !== true;
    }

    setBuildingRangeVisibility(state, isVisible) {
        if (!state) return;
        state.visibleByRange = isVisible;
        state.roofVisibleByRange = isVisible;
        this.syncRoofVisibility(state);
        this.setSceneObjectRangeVisibility(state.wallDecorations, isVisible);
        this.setSceneObjectRangeVisibility(state.furniture, isVisible);
        for (const door of state.doors || []) {
            this.setSceneObjectRangeVisibility(door.sceneObject, isVisible);
        }
    }

    getBuildingLODAnchor(state) {
        return {
            x: Number(state?.x || 0) + (Math.max(1, Number(state?.width) || 1) - 1) / 2,
            y: Number(state?.y || 0) + (Math.max(1, Number(state?.height) || 1) - 1) / 2
        };
    }

    getBuildingLODExtent(state) {
        if (Number.isFinite(state?.lodExtent)) return state.lodExtent;
        const halfWidth = Math.max(0.5, (Number(state?.width) || 1) / 2 + 0.4);
        const halfHeight = Math.max(0.5, (Number(state?.height) || 1) / 2 + 0.4);
        return Math.hypot(halfWidth, halfHeight);
    }

    measureBuildingLODExtent(state, anchor = this.getBuildingLODAnchor(state)) {
        let extent = this.getBuildingLODExtent({ ...state, lodExtent: null });
        for (const object of [
            state?.roof,
            state?.wallDecorations,
            state?.furniture,
            ...(state?.doors || []).map((door) => door.sceneObject)
        ]) {
            extent = Math.max(
                extent,
                WorldGenerator.measureHorizontalLODExtent(object, anchor.x, anchor.y)
            );
        }
        return extent;
    }

    updateVisibleTilesAround(centerX, centerY, radius = this.visibleTileRadius) {
        const center = this.toGridPosition(centerX, centerY);
        if (this.lastVisibilityCenter &&
            this.lastVisibilityCenter.x === center.gridX &&
            this.lastVisibilityCenter.y === center.gridY &&
            this.lastVisibilityCenter.radius === radius &&
            this.lastVisibilityCenter.contentVersion === this.lodContentVersion) {
            return this.lastLODVisibility;
        }

        this.lastVisibilityCenter = {
            x: center.gridX,
            y: center.gridY,
            radius,
            contentVersion: this.lodContentVersion
        };
        const radiusSq = radius * radius;
        let visibleTiles = 0;
        for (const tile of this.tiles) {
            const dx = tile.gridX - center.gridX;
            const dy = tile.gridY - center.gridY;
            tile.visibleByRange = dx * dx + dy * dy <= radiusSq;
            if (tile.visibleByRange) visibleTiles += 1;
            this.syncTileVisibility(tile);
        }

        let visibleBuildings = 0;
        for (const state of this.buildingStates.values()) {
            const anchor = this.getBuildingLODAnchor(state);
            const near = this.isObjectInsidePlayerLOD(
                anchor.x,
                anchor.y,
                this.getBuildingLODExtent(state),
                center.gridX,
                center.gridY,
                radius
            );
            this.setBuildingRangeVisibility(state, near);
            if (near) visibleBuildings += 1;
        }

        let visibleDecorations = 0;
        for (const group of this.decorationGroups) {
            const anchor = group.userData?.lodAnchor || {
                x: group.position.x,
                y: group.position.z
            };
            const near = this.isObjectInsidePlayerLOD(
                anchor.x,
                anchor.y,
                group.userData?.lodExtent || 0,
                center.gridX,
                center.gridY,
                radius
            );
            this.setSceneObjectRangeVisibility(group, near);
            if (near) visibleDecorations += 1;
        }

        const terrainDetails = this.updateTerrainDetailVisibility(
            center.gridX,
            center.gridY,
            radius
        );
        this.lastLODVisibility = {
            centerX: center.gridX,
            centerY: center.gridY,
            radius,
            tiles: { total: this.tiles.length, visible: visibleTiles },
            buildings: { total: this.buildingStates.size, visible: visibleBuildings },
            decorations: { total: this.decorationGroups.length, visible: visibleDecorations },
            terrainDetails
        };
        return this.lastLODVisibility;
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

    isObjectInsidePlayerLOD(
        x,
        y,
        extent = 0,
        centerX = this.lastVisibilityCenter?.x,
        centerY = this.lastVisibilityCenter?.y,
        radius = this.lastVisibilityCenter?.radius ?? this.visibleTileRadius
    ) {
        if (!Number.isFinite(centerX) || !Number.isFinite(centerY)) return false;
        if (!this.hasTileColumn(x, y)) return false;
        return WorldGenerator.isObjectInsideLOD(x, y, extent, centerX, centerY, radius);
    }

    getLODVisibilitySummary() {
        if (!this.lastLODVisibility) return null;
        return structuredClone(this.lastLODVisibility);
    }

    invalidateLODVisibility() {
        this.lodContentVersion += 1;
    }

    static isObjectInsideLOD(x, y, extent, centerX, centerY, radius) {
        const values = [x, y, centerX, centerY, radius];
        if (!values.every(Number.isFinite)) return false;
        const safeRadius = Math.max(0, radius);
        const safeExtent = Math.max(0, Number(extent) || 0);
        if (safeExtent > safeRadius) return false;
        return Math.hypot(x - centerX, y - centerY) + safeExtent <= safeRadius + 1e-9;
    }

    static measureHorizontalLODExtent(object, anchorX, anchorY) {
        if (!object || !Number.isFinite(anchorX) || !Number.isFinite(anchorY)) return 0;
        object.updateWorldMatrix?.(true, true);
        const bounds = new THREE.Box3().setFromObject(object);
        if (bounds.isEmpty()) return 0;
        let extent = 0;
        for (const x of [bounds.min.x, bounds.max.x]) {
            for (const z of [bounds.min.z, bounds.max.z]) {
                extent = Math.max(extent, Math.hypot(x - anchorX, z - anchorY));
            }
        }
        return extent;
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
        const architectureThemeId = existing?.architectureThemeId ?? null;
        const voxel = this.setVoxelAt(x, y, z, {
            element,
            texture: textureValue,
            effect,
            building,
            visualVariant,
            paletteId,
            architectureThemeId
        });
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
            this.invalidateLODVisibility();
            if (this.lastVisibilityCenter) {
                this.updateVisibleTilesAround(
                    this.lastVisibilityCenter.x,
                    this.lastVisibilityCenter.y,
                    this.lastVisibilityCenter.radius
                );
            }
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
            architectureThemeId: WorldGenerator.normalizeArchitectureThemeId(topVoxel.architectureThemeId),
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
        this.lastLODVisibility = null;
        this.lodContentVersion += 1;
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
            architectureThemeId: t.architectureThemeId,
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
                    tileData.paletteId ?? 'meadow',
                    tileData.architectureThemeId ?? null
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
