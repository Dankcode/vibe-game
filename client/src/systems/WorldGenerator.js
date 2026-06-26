import * as THREE from 'three';
import { Tile } from '../entities/Tile.js';
import { ELEMENTS, getTileDefinition, isTileWalkable, tileSupportsHabitat } from '../data/TileRegistry.js';
import { BUILDING_PARTS, createTileCell, createVoxelBlock, createVoxelMatrix, getTopVoxel, getVoxelColumn } from '../data/TileLibrary.js';

export { ELEMENTS };

export const DEFAULT_CHUNK_SIZE = 16;

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
        this.sightCutawayTiles = new Set();
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
                        voxel.building ?? 0
                    );
                }
            }
        }
    }

    generateFromChunkedArray(mapArray, legend, chunkSize = this.chunkSize, options = {}) {
        this.chunkSize = chunkSize;
        this.generateFromArray(mapArray, legend);
        const buildings = Array.isArray(options) ? options : (options.buildings || []);
        this.registerBuildingBlueprints(buildings);
    }

    addTile(x, y, z, element, textureValue = 0, effect = 0, building = 0, affectSurface = true) {
        const voxel = this.getVoxelAt(x, y, z) ||
            this.setVoxelAt(x, y, z, { element, texture: textureValue, effect, building });
        const tile = new Tile(this.threeManager, x, y, z, { element, textureValue, effect, building });
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
                    definition: getTileDefinition(element, textureValue),
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

    canOccupyTile(x, y, fromX = x, fromY = y) {
        const surface = this.getSurfaceAt(x, y);
        if (!surface || !this.isWalkable(x, y)) return false;

        const fromSurface = this.getSurfaceAt(fromX, fromY);
        const fromZ = fromSurface?.z ?? surface.z;
        const toZ = surface.z;
        const elevationDiff = toZ - fromZ;
        if (Math.abs(elevationDiff) < 1) return true;
        if (Math.abs(elevationDiff) === 1) return true;
        return Math.abs(elevationDiff) === 2 &&
            (this.isStairSurface(surface) || this.isStairSurface(fromSurface));
    }

    canMoveBetween(fromX, fromY, toX, toY, isDiagonal = false) {
        const start = this.toGridPosition(fromX, fromY);
        const end = this.toGridPosition(toX, toY);
        if (start.gridX === end.gridX && start.gridY === end.gridY) {
            return this.canOccupyTile(end.gridX, end.gridY, start.gridX, start.gridY);
        }

        if (!this.canOccupyTile(end.gridX, end.gridY, start.gridX, start.gridY)) return false;

        const dx = end.gridX - start.gridX;
        const dy = end.gridY - start.gridY;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) return false;

        const diagonalMove = isDiagonal || (Math.abs(dx) === 1 && Math.abs(dy) === 1);
        if (!this.canUseStairsBetween(start.gridX, start.gridY, end.gridX, end.gridY, diagonalMove)) return false;
        if (!diagonalMove) return true;

        const horizontalClear = this.canOccupyTile(end.gridX, start.gridY, start.gridX, start.gridY);
        const verticalClear = this.canOccupyTile(start.gridX, end.gridY, start.gridX, start.gridY);
        return horizontalClear && verticalClear;
    }

    canOccupyFootprint(centerX, centerY, fromX = centerX, fromY = centerY, radius = 0.32) {
        const from = this.toGridPosition(fromX, fromY);
        const center = this.toGridPosition(centerX, centerY);
        const fromSurface = this.getSurfaceAt(from.gridX, from.gridY);
        const centerSurface = this.getSurfaceAt(center.gridX, center.gridY);
        const stairTransition = Math.abs((centerSurface?.z ?? 0) - (fromSurface?.z ?? 0)) === 2 &&
            (this.isStairSurface(centerSurface) || this.isStairSurface(fromSurface));
        const samples = this.getFootprintSamples(centerX, centerY, radius);

        for (const sample of samples) {
            const point = this.toGridPosition(sample.x, sample.y);
            if (this.canOccupyTile(point.gridX, point.gridY, from.gridX, from.gridY)) continue;
            if (stairTransition) {
                const sampleSurface = this.getSurfaceAt(point.gridX, point.gridY);
                if (sampleSurface?.definition?.walkable && sampleSurface.z === centerSurface?.z) continue;
            }
            return false;
        }

        return true;
    }

    canMoveFootprintBetween(fromX, fromY, toX, toY, radius = 0.32) {
        const start = this.toGridPosition(fromX, fromY);
        const end = this.toGridPosition(toX, toY);
        const isDiagonal = start.gridX !== end.gridX && start.gridY !== end.gridY;

        if (!this.canMoveBetween(start.gridX, start.gridY, end.gridX, end.gridY, isDiagonal)) return false;
        return this.canOccupyFootprint(toX, toY, start.gridX, start.gridY, radius);
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
            if (state) this.buildingStates.set(building.id, state);
        }
    }

    createBuildingState(building) {
        if (!building?.id) return null;

        const state = {
            ...building,
            wallTiles: [],
            interiorKeys: new Set(),
            roof: null,
            doors: [],
            wallDecorations: null,
            furniture: null,
            roofVisibleByRange: true,
            floorZ: 0,
            isOpen: false
        };

        let maxSurfaceY = -Infinity;
        let minFloorSurfaceY = Infinity;
        let minFloorZ = Infinity;
        for (let localY = 0; localY < building.height; localY++) {
            for (let localX = 0; localX < building.width; localX++) {
                const x = building.x + localX;
                const y = building.y + localY;
                const surface = this.getSurfaceAt(x, y);
                if (!surface) continue;
                const surfaceY = this.getSurfaceWorldY(x, y);
                maxSurfaceY = Math.max(maxSurfaceY, surfaceY);

                const isEdge = localX === 0 || localY === 0 ||
                    localX === building.width - 1 || localY === building.height - 1;
                const isDoor = building.door?.x === localX && building.door?.y === localY;
                const key = this.getColumnKey(x, y);

                if (isEdge) {
                    const edge = this.getBuildingEdge(building, localX, localY);
                    const wallHeight = Math.max(surface.z, Math.floor(building.stories || 1) * 2);
                    for (let z = 1; z <= wallHeight; z++) {
                        const tile = this.getTileAt(x, y, z);
                        if (tile?.element === ELEMENTS.STRUCTURE) state.wallTiles.push({ tile, edge });
                    }
                }
                if (!isEdge || isDoor) {
                    state.interiorKeys.add(key);
                    minFloorSurfaceY = Math.min(minFloorSurfaceY, surfaceY);
                    minFloorZ = Math.min(minFloorZ, surface.z);
                }
            }
        }

        if (maxSurfaceY === -Infinity) return null;
        const floorSurfaceY = minFloorSurfaceY === Infinity ? 0.48 : minFloorSurfaceY;
        state.floorZ = minFloorZ === Infinity ? 0 : minFloorZ;
        state.roof = this.createBuildingRoof(building, maxSurfaceY, state);
        state.wallDecorations = this.createBuildingWallDecorations(building, floorSurfaceY, state);
        state.furniture = this.createBuildingFurniture(building, floorSurfaceY);
        return state;
    }

    createBuildingRoof(building, surfaceY, state) {
        const roof = new THREE.Group();
        roof.position.set(
            building.x + (building.width - 1) / 2,
            surfaceY + 0.23,
            building.y + (building.height - 1) / 2
        );
        roof.userData.buildingId = building.id;

        const roofMaterial = WorldGenerator.getRoofMaterial(building.style);
        const trimMaterial = WorldGenerator.getTrimMaterial(building.style);
        const tileGeometry = new THREE.BoxGeometry(0.98, 0.34, 0.98);
        const parapetHorizontal = new THREE.BoxGeometry(0.98, 0.28, 0.16);
        const parapetVertical = new THREE.BoxGeometry(0.16, 0.28, 0.98);
        const startX = -(building.width - 1) / 2;
        const startZ = -(building.height - 1) / 2;

        for (let localY = 0; localY < building.height; localY++) {
            for (let localX = 0; localX < building.width; localX++) {
                const roofCell = new THREE.Group();
                roofCell.position.set(startX + localX, 0, startZ + localY);
                roofCell.userData.cutawayType = 'roof-block';
                const roofTile = new THREE.Mesh(tileGeometry, roofMaterial);
                roofCell.add(roofTile);

                if (localY === 0 || localY === building.height - 1) {
                    const parapet = new THREE.Mesh(parapetHorizontal, trimMaterial);
                    parapet.position.y = 0.3;
                    roofCell.add(parapet);
                }
                if (localX === 0 || localX === building.width - 1) {
                    const parapet = new THREE.Mesh(parapetVertical, trimMaterial);
                    parapet.position.y = 0.3;
                    roofCell.add(parapet);
                }

                roof.add(roofCell);
            }
        }

        roof.traverse((child) => {
            child.castShadow = true;
            child.receiveShadow = true;
            child.raycast = () => {};
            child.renderOrder = 12;
        });
        this.threeManager.addToWorld(roof);
        return roof;
    }

    createBuildingWallDecorations(building, floorSurfaceY, state) {
        const group = new THREE.Group();
        group.userData.buildingId = building.id;

        if (building.door) {
            const doorEdge = this.getBuildingEdge(building, building.door.x, building.door.y);
            if (doorEdge) {
                const doorAssembly = this.createDoorPanel(building, floorSurfaceY, doorEdge);
                const pivot = doorAssembly.userData.doorPivot;
                state.doors.push({
                    pivot,
                    edge: doorEdge,
                    worldX: building.x + building.door.x,
                    worldY: building.y + building.door.y,
                    closedRotation: 0,
                    targetRotation: 0,
                    currentRotation: 0,
                    openRotation: this.getDoorOpenRotation(doorEdge)
                });
                group.add(doorAssembly);
            }
        }

        this.threeManager.addToWorld(group);
        return group;
    }

    getBuildingEdge(building, localX, localY) {
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
        group.userData.cutawayType = 'doorway';
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
        const group = new THREE.Group();
        group.userData.buildingId = building.id;
        const y = floorSurfaceY + 0.08;
        const minX = building.x + 1;
        const maxX = building.x + building.width - 2;
        const minZ = building.y + 1;
        const maxZ = building.y + building.height - 2;

        this.addRug(group, building.x + building.width / 2 - 0.5, y, building.y + building.height / 2 - 0.5, building.style);
        this.addTable(group, minX + 0.55, y, minZ + 0.55, building.style);
        this.addBench(group, maxX - 0.3, y, minZ + 0.65, building.style, 'x');
        this.addCrateStack(group, minX + 0.35, y, maxZ - 0.35, building.style);
        this.addShelf(group, maxX - 0.15, y, maxZ - 0.75, building.style, 'z');
        this.addPartition(group, building.x + Math.floor(building.width / 2), y, building.y + 1.2, building.style, 'x', Math.max(1.4, building.width - 4));

        if (building.width >= 7 && building.height >= 6) {
            this.addCounter(group, maxX - 0.45, y, maxZ - 0.25, building.style);
            this.addBed(group, minX + 1.45, y, maxZ - 0.45, building.style);
            this.addHearth(group, minX + 0.25, y, building.y + Math.floor(building.height / 2), building.style);
        } else {
            this.addStool(group, maxX - 0.35, y, maxZ - 0.35, building.style);
        }

        const stories = Math.max(1, Math.min(3, Math.floor(building.stories || 1)));
        for (let level = 1; level < stories; level++) {
            const upperY = floorSurfaceY + level * 2 + 0.08;
            const stair = building.stairs?.[level - 1] || building.stairs?.[0];
            const stairX = building.x + (stair?.x ?? 1);
            const stairZ = building.y + (stair?.y ?? 1);
            this.addBed(group, Math.min(maxX - 0.65, stairX + 1.15), upperY, Math.min(maxZ - 0.55, stairZ + 0.95), building.style);
            this.addShelf(group, Math.max(minX + 0.25, stairX - 1.15), upperY, Math.max(minZ + 0.45, stairZ - 0.8), building.style, 'x');
            this.addStool(group, Math.min(maxX - 0.35, stairX + 0.5), upperY, Math.max(minZ + 0.35, stairZ - 0.65), building.style);
            this.addPartition(group, stairX + 0.5, upperY, stairZ + 0.5, building.style, 'z', Math.min(1.8, building.height - 3));
        }

        group.traverse((child) => {
            child.castShadow = true;
            child.receiveShadow = true;
            child.raycast = () => {};
        });
        this.threeManager.addToWorld(group);
        return group;
    }

    addTable(group, x, y, z, style) {
        const material = WorldGenerator.getFurnitureMaterial(style);
        const top = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.12, 0.72), material);
        top.position.set(x, y + 0.34, z);
        group.add(top);
        for (const ox of [-0.32, 0.32]) {
            for (const oz of [-0.24, 0.24]) {
                const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.34, 0.1), material);
                leg.position.set(x + ox, y + 0.17, z + oz);
                group.add(leg);
            }
        }
    }

    addBench(group, x, y, z, style, axis = 'x') {
        const material = WorldGenerator.getFurnitureMaterial(style);
        const bench = new THREE.Mesh(
            new THREE.BoxGeometry(axis === 'x' ? 1.18 : 0.28, 0.18, axis === 'x' ? 0.28 : 1.18),
            material
        );
        bench.position.set(x, y + 0.22, z);
        group.add(bench);
    }

    addCounter(group, x, y, z, style) {
        const material = WorldGenerator.getFurnitureMaterial(style);
        const counter = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.56, 0.42), material);
        counter.position.set(x, y + 0.28, z);
        group.add(counter);
    }

    addBed(group, x, y, z, style) {
        const frameMaterial = WorldGenerator.getFurnitureMaterial(style);
        const blanketMaterial = WorldGenerator.getBlanketMaterial(style);
        const frame = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.24, 0.78), frameMaterial);
        frame.position.set(x, y + 0.15, z);
        group.add(frame);

        const blanket = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.12, 0.62), blanketMaterial);
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
        const rug = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.035, 1.12), material);
        rug.position.set(x, y + 0.025, z);
        group.add(rug);
    }

    addShelf(group, x, y, z, style, axis = 'x') {
        const material = WorldGenerator.getFurnitureMaterial(style);
        const shelf = new THREE.Mesh(
            new THREE.BoxGeometry(axis === 'x' ? 1.05 : 0.24, 0.92, axis === 'x' ? 0.24 : 1.05),
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
            new THREE.BoxGeometry(axis === 'x' ? length : 0.08, 0.72, axis === 'x' ? 0.08 : length),
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

    static getRoofMaterial(style) {
        if (!WorldGenerator.roofMaterialCache) WorldGenerator.roofMaterialCache = new Map();
        const key = style || 'timber';
        if (!WorldGenerator.roofMaterialCache.has(key)) {
            WorldGenerator.roofMaterialCache.set(key, new THREE.MeshStandardMaterial({
                color: key === 'stone' ? 0x6f7e87 : 0xa64635,
                roughness: 0.82,
                metalness: 0.02
            }));
        }
        return WorldGenerator.roofMaterialCache.get(key);
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
            !state.roofHiddenByCutaway;
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
        }
    }

    updatePlayerSightCutaway(playerX, playerY, camera, radius = 4) {
        this.clearSightCutaway();
        if (!camera) return;

        const center = this.toGridPosition(playerX, playerY);
        const playerSurface = this.getSurfaceAt(center.gridX, center.gridY);
        if (!playerSurface) return;

        const viewDir = new THREE.Vector2(
            camera.position.x - center.gridX,
            camera.position.z - center.gridY
        );
        if (viewDir.lengthSq() < 0.0001) return;
        viewDir.normalize();

        for (let x = center.gridX - radius; x <= center.gridX + radius; x++) {
            for (let y = center.gridY - radius; y <= center.gridY + radius; y++) {
                if (x === center.gridX && y === center.gridY) continue;
                const surface = this.getSurfaceAt(x, y);
                if (!surface) continue;

                const toTile = new THREE.Vector2(x - center.gridX, y - center.gridY);
                const distance = toTile.length();
                if (distance < 0.75 || distance > radius) continue;
                const dot = toTile.normalize().dot(viewDir);
                const cross = Math.abs((x - center.gridX) * viewDir.y - (y - center.gridY) * viewDir.x);
                if (dot < 0.36 || cross > 1.6) continue;
                if (!this.shouldHideTileForSightCutaway(surface, playerSurface)) continue;

                for (const voxel of this.getTerrainCutawayVoxels(surface, playerSurface)) {
                    const terrainTile = this.getTileAt(surface.x, surface.y, voxel.z);
                    if (!terrainTile || terrainTile.element === ELEMENTS.STRUCTURE) continue;
                    terrainTile.hiddenBySightCutaway = true;
                    this.sightCutawayTiles.add(terrainTile);
                    this.syncTileVisibility(terrainTile);
                }
            }
        }

        const activeBuilding = this.getBuildingAt(center.gridX, center.gridY);
        if (activeBuilding && playerSurface.z >= activeBuilding.floorZ) {
            this.cutAwayActiveBuilding(activeBuilding, camera, playerSurface);
        } else {
            this.cutAwayBuildingsInFrontOfPlayer(center.gridX, center.gridY, camera, playerSurface);
        }
    }

    clearSightCutaway() {
        if (!this.sightCutawayTiles?.size) return;
        for (const item of this.sightCutawayTiles) {
            if (item?.roof) {
                item.roofHiddenByCutaway = false;
                this.syncRoofVisibility(item);
                continue;
            }
            item.hiddenBySightCutaway = false;
            this.syncTileVisibility(item);
        }
        this.sightCutawayTiles.clear();
    }

    cutAwayActiveBuilding(state, camera, playerSurface) {
        const centerX = state.x + (state.width - 1) / 2;
        const centerY = state.y + (state.height - 1) / 2;
        const facingEdges = new Set([
            camera.position.x >= centerX ? 'east' : 'west',
            camera.position.z >= centerY ? 'south' : 'north'
        ]);
        const minWallZ = playerSurface.z + 2;
        const maxWallZ = state.floorZ + Math.max(2, Math.min(6, Math.floor(state.stories || 1) * 2));

        state.roofHiddenByCutaway = true;
        this.sightCutawayTiles.add(state);
        this.syncRoofVisibility(state);

        for (const wall of state.wallTiles) {
            if (!facingEdges.has(wall.edge)) continue;
            const tile = wall.tile;
            if (tile.elevation < minWallZ || tile.elevation > maxWallZ) continue;
            tile.hiddenBySightCutaway = true;
            this.sightCutawayTiles.add(tile);
            this.syncTileVisibility(tile);
        }
    }

    cutAwayBuildingsInFrontOfPlayer(playerX, playerY, camera, playerSurface) {
        const cameraPoint = new THREE.Vector2(camera.position.x, camera.position.z);
        const playerPoint = new THREE.Vector2(playerX, playerY);

        for (const state of this.buildingStates.values()) {
            if (state.floorZ !== playerSurface.z) continue;
            if (!this.segmentCrossesBuilding(cameraPoint, playerPoint, state, 0.08)) continue;

            state.roofHiddenByCutaway = true;
            this.sightCutawayTiles.add(state);
            this.syncRoofVisibility(state);

            for (const wall of state.wallTiles) {
                const tile = wall.tile;
                if (tile.elevation <= state.floorZ + 1) continue;
                tile.hiddenBySightCutaway = true;
                this.sightCutawayTiles.add(tile);
                this.syncTileVisibility(tile);
            }
        }
    }

    segmentCrossesBuilding(from, to, building, margin = 0) {
        const minX = building.x - 0.5 - margin;
        const maxX = building.x + building.width - 0.5 + margin;
        const minY = building.y - 0.5 - margin;
        const maxY = building.y + building.height - 0.5 + margin;
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        let tMin = 0;
        let tMax = 1;

        if (Math.abs(dx) < 0.0001) {
            if (from.x < minX || from.x > maxX) return false;
        } else {
            const first = (minX - from.x) / dx;
            const second = (maxX - from.x) / dx;
            tMin = Math.max(tMin, Math.min(first, second));
            tMax = Math.min(tMax, Math.max(first, second));
            if (tMin > tMax) return false;
        }

        if (Math.abs(dy) < 0.0001) {
            if (from.y < minY || from.y > maxY) return false;
        } else {
            const first = (minY - from.y) / dy;
            const second = (maxY - from.y) / dy;
            tMin = Math.max(tMin, Math.min(first, second));
            tMax = Math.min(tMax, Math.max(first, second));
            if (tMin > tMax) return false;
        }

        return tMax > 0.03 && tMin < 0.94;
    }

    shouldHideTileForSightCutaway(surface, playerSurface) {
        if (!surface || !playerSurface) return false;
        if (surface.element === ELEMENTS.HYDRO) return false;
        if (surface.element === ELEMENTS.STRUCTURE) return false;
        if (surface.element === ELEMENTS.ANEMO || surface.element === ELEMENTS.GEO || surface.element === ELEMENTS.CRYO) {
            return surface.z > playerSurface.z;
        }
        return false;
    }

    getTerrainCutawayVoxels(surface, playerSurface) {
        const column = this.getVoxelColumnAt(surface.x, surface.y) || [];
        const firstCutElevation = Math.max(1, playerSurface.z + 1);
        return column.filter((voxel) => {
            if (voxel.z < firstCutElevation || voxel.z > surface.z) return false;
            if (voxel.element === ELEMENTS.STRUCTURE) return false;
            return voxel.element === ELEMENTS.ANEMO ||
                voxel.element === ELEMENTS.GEO ||
                voxel.element === ELEMENTS.CRYO;
        });
    }

    canUseStairsBetween(fromX, fromY, toX, toY, isDiagonal = false) {
        const fromSurface = this.getSurfaceAt(fromX, fromY);
        const toSurface = this.getSurfaceAt(toX, toY);
        const elevationDiff = (toSurface?.z ?? 0) - (fromSurface?.z ?? 0);
        if (elevationDiff === 0) return true;
        if (Math.abs(elevationDiff) === 1) return true;
        return Math.abs(elevationDiff) === 2 &&
            (this.isStairSurface(fromSurface) || this.isStairSurface(toSurface));
    }

    isStairSurface(surface) {
        return [
            BUILDING_PARTS.STAIRS,
            BUILDING_PARTS.STAIRS_NORTH,
            BUILDING_PARTS.STAIRS_SOUTH,
            BUILDING_PARTS.STAIRS_WEST,
            BUILDING_PARTS.STAIRS_EAST
        ].includes(surface?.building);
    }

    syncTileVisibility(tile) {
        if (!tile?.mesh) return;
        tile.mesh.visible = tile.visibleByRange !== false &&
            !tile.hiddenBySightCutaway;
    }

    supportsHabitat(x, y, habitat) {
        const surface = this.getSurfaceAt(x, y);
        if (!surface) return false;
        return tileSupportsHabitat(surface.element, surface.textureValue, habitat);
    }

    getMoveCost(fromX, fromY, toX, toY, isDiagonal = false) {
        if (!this.canMoveBetween(fromX, fromY, toX, toY, isDiagonal)) return Infinity;

        const fromZ = this.getElevation(fromX, fromY);
        const toZ = this.getElevation(toX, toY);
        const elevationDiff = toZ - fromZ;
        const fromSurface = this.getSurfaceAt(fromX, fromY);
        const toSurface = this.getSurfaceAt(toX, toY);
        if (Math.abs(elevationDiff) >= 2 &&
            !(Math.abs(elevationDiff) === 2 && (this.isStairSurface(fromSurface) || this.isStairSurface(toSurface)))) {
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
        const voxel = this.setVoxelAt(x, y, z, { element, texture: textureValue, effect, building });
        const tile = this.getTileAt(x, y, z);
        if (tile) {
            console.log(`[WorldGenerator] Modifying tile at ${x},${y},${z} to Element:${element}, Var:${textureValue}`);
            tile.setElementalType(element, textureValue, effect, building);
            this.rebuildSurfaceFromColumn(x, y);
        } else {
            this.addTile(x, y, z, voxel.element, voxel.textureValue, voxel.effect, voxel.building);
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
            definition: topVoxel.definition,
            voxel: topVoxel
        });
    }

    clear() {
        this.clearSightCutaway();
        this.clearBuildingStates();
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

    clearBuildingStates() {
        if (!this.buildingStates) return;
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
                this.addTile(tileData.gridX, tileData.gridY, tileData.elevation, tileData.element, tileData.variant, tileData.effect, tileData.building);
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
