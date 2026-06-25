import * as THREE from 'three';
import { Tile } from '../entities/Tile.js';
import { ELEMENTS, getTileDefinition, isTileWalkable, tileSupportsHabitat } from '../data/TileRegistry.js';
import { BUILDING_PARTS, tileCellToBlockInfo } from '../data/TileLibrary.js';

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
        this.buildingStates = new Map();
        this.sightCutawayTiles = new Set();
        this.visibleTileRadius = options.visibleTileRadius || 34;
        this.lastVisibilityCenter = null;
    }

    /**
     * Streamlined world generation using a simplified mathematical method.
     */
    generate(width, height) {
        this.clear();

        for (let x = -width/2; x < width/2; x++) {
            for (let y = -height/2; y < height/2; y++) {
                const dist = Math.sqrt(x*x + y*y);
                let maxZ = 1;
                let element = ELEMENTS.GEO;
                let textureValue = 0;

                if (dist > width * 0.4) {
                    element = ELEMENTS.HYDRO;
                    textureValue = 2; // Normal water
                    maxZ = 0;
                    
                    // Randomly make some water brackish
                    if (Math.abs(Math.sin(x * 0.2) * Math.cos(y * 0.2)) > 0.7) {
                        textureValue = 4; // Brackish water
                    }
                } else if (dist > width * 0.35) {
                    element = ELEMENTS.ANEMO;
                    maxZ = 0;
                }

                // Add tiles from 0 up to maxZ
                for (let z = 0; z <= maxZ; z++) {
                    const actualElement = (z === maxZ) ? element : ELEMENTS.GEO;
                    const actualVariant = (z === maxZ) ? textureValue : 0;
                    this.addTile(x, y, z, actualElement, actualVariant);
                }
            }
        }
    }

    /**
     * Array-based layout generation for complex maps
     */
    generateFromArray(mapArray, legend) {
        this.clear();
        
        const height = mapArray.length;
        const width = mapArray[0]?.length || 0;
        
        const offsetX = Math.floor(width / 2);
        const offsetY = Math.floor(height / 2);

        for (let y = 0; y < height; y++) {
            const row = mapArray[y];
            for (let x = 0; x < width; x++) {
                const rawCell = row[x];
                const blockInfo = this.resolveBlockInfo(rawCell, legend);
                
                const gridX = x - offsetX;
                const gridY = y - offsetY;
                
                if (this.isTwoBlockBuildingWall(blockInfo)) {
                    this.addTile(gridX, gridY, 0, ELEMENTS.GEO, 0, 0, BUILDING_PARTS.NONE);
                    for (let z = 1; z <= blockInfo.maxZ; z++) {
                        const buildingPart = z === blockInfo.maxZ
                            ? this.getUpperWindowPart(blockInfo.building)
                            : blockInfo.building;
                        this.addTile(
                            gridX,
                            gridY,
                            z,
                            blockInfo.element,
                            blockInfo.textureValue ?? 0,
                            blockInfo.effect ?? 0,
                            buildingPart
                        );
                    }
                    continue;
                }

                for (let z = 0; z <= blockInfo.maxZ; z++) {
                    const actualElement = (z === blockInfo.maxZ) ? blockInfo.element : ELEMENTS.GEO;
                    const actualVariant = (z === blockInfo.maxZ) ? (blockInfo.textureValue ?? 0) : 0;
                    const actualEffect = (z === blockInfo.maxZ) ? (blockInfo.effect ?? 0) : 0;
                    const actualBuilding = (z === blockInfo.maxZ) ? (blockInfo.building ?? 0) : 0;
                    this.addTile(gridX, gridY, z, actualElement, actualVariant, actualEffect, actualBuilding);
                }
            }
        }
    }

    resolveBlockInfo(rawCell, legend = {}) {
        if (typeof rawCell === 'string') {
            const symbolInfo = legend[rawCell] || legend[rawCell.toUpperCase?.()] || null;
            if (symbolInfo) return tileCellToBlockInfo(symbolInfo);
        }
        return tileCellToBlockInfo(rawCell);
    }

    isTwoBlockBuildingWall(blockInfo) {
        return blockInfo?.element === ELEMENTS.STRUCTURE &&
            blockInfo.maxZ >= 2 &&
            (blockInfo.building === BUILDING_PARTS.WALL || this.isLowerWindowPart(blockInfo.building));
    }

    isLowerWindowPart(buildingPart) {
        return [
            BUILDING_PARTS.WINDOW_LOWER_NORTH,
            BUILDING_PARTS.WINDOW_LOWER_SOUTH,
            BUILDING_PARTS.WINDOW_LOWER_WEST,
            BUILDING_PARTS.WINDOW_LOWER_EAST
        ].includes(buildingPart);
    }

    getUpperWindowPart(buildingPart) {
        return {
            [BUILDING_PARTS.WINDOW_LOWER_NORTH]: BUILDING_PARTS.WINDOW_UPPER_NORTH,
            [BUILDING_PARTS.WINDOW_LOWER_SOUTH]: BUILDING_PARTS.WINDOW_UPPER_SOUTH,
            [BUILDING_PARTS.WINDOW_LOWER_WEST]: BUILDING_PARTS.WINDOW_UPPER_WEST,
            [BUILDING_PARTS.WINDOW_LOWER_EAST]: BUILDING_PARTS.WINDOW_UPPER_EAST
        }[buildingPart] || buildingPart;
    }

    generateFromChunkedArray(mapArray, legend, chunkSize = this.chunkSize, options = {}) {
        this.chunkSize = chunkSize;
        this.generateFromArray(mapArray, legend);
        const buildings = Array.isArray(options) ? options : (options.buildings || []);
        this.registerBuildingBlueprints(buildings);
    }

    addTile(x, y, z, element, textureValue = 0, effect = 0, building = 0) {
        const tile = new Tile(this.threeManager, x, y, z, { element, textureValue, effect, building });
        this.tiles.push(tile);
        const tileKey = this.getTileKey(x, y, z);
        this.tileMap.set(tileKey, tile);
        this.registerTileInChunk(x, y, tileKey);
        
        // Update elevation map
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
                definition: getTileDefinition(element, textureValue)
            });
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
        if (!this.isWalkable(x, y)) return false;

        const fromZ = this.getElevation(fromX, fromY);
        const toZ = this.getElevation(x, y);
        const elevationDiff = toZ - fromZ;
        if (Math.abs(elevationDiff) < 1) return true;
        return Math.abs(elevationDiff) === 1;
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
        const samples = this.getFootprintSamples(centerX, centerY, radius);

        for (const sample of samples) {
            const point = this.toGridPosition(sample.x, sample.y);
            if (!this.canOccupyTile(point.gridX, point.gridY, from.gridX, from.gridY)) return false;
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
            roofTiles: [],
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

                if (isEdge && !isDoor) {
                    for (let z = 1; z <= surface.z; z++) {
                        const tile = this.getTileAt(x, y, z);
                        if (tile?.element === ELEMENTS.STRUCTURE) state.wallTiles.push(tile);
                    }
                } else {
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
                state.roofTiles.push({
                    mesh: roofCell,
                    x: building.x + localX,
                    y: building.y + localY,
                    worldY: roof.position.y
                });
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
        const trimMaterial = WorldGenerator.getTrimMaterial(building.style);

        if (building.door) {
            const doorEdge = this.getBuildingEdge(building, building.door.x, building.door.y);
            if (doorEdge) {
                const doorPivot = this.createDoorPanel(building, floorSurfaceY, doorEdge, trimMaterial);
                state.doors.push({ pivot: doorPivot, edge: doorEdge });
                group.add(doorPivot);
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

    createDoorPanel(building, floorSurfaceY, edge, material) {
        const pivot = new THREE.Group();
        const doorHeight = 1.82;
        const doorWidth = 0.64;
        const thickness = 0.1;
        const isNorthSouth = edge === 'north' || edge === 'south';
        const panel = new THREE.Mesh(
            new THREE.BoxGeometry(isNorthSouth ? doorWidth : thickness, doorHeight, isNorthSouth ? thickness : doorWidth),
            material
        );
        const worldX = building.x + building.door.x;
        const worldY = building.y + building.door.y;

        pivot.position.set(worldX, floorSurfaceY, worldY);
        if (edge === 'north') {
            pivot.position.z -= 0.52;
            panel.position.x = doorWidth / 2;
        } else if (edge === 'south') {
            pivot.position.z += 0.52;
            panel.position.x = -doorWidth / 2;
        } else if (edge === 'west') {
            pivot.position.x -= 0.52;
            panel.position.z = -doorWidth / 2;
        } else if (edge === 'east') {
            pivot.position.x += 0.52;
            panel.position.z = doorWidth / 2;
        }

        panel.position.y = doorHeight / 2;
        panel.castShadow = true;
        panel.raycast = () => {};
        pivot.add(panel);
        return pivot;
    }

    createBuildingFurniture(building, floorSurfaceY) {
        const group = new THREE.Group();
        group.userData.buildingId = building.id;
        const y = floorSurfaceY + 0.08;
        const minX = building.x + 1;
        const maxX = building.x + building.width - 2;
        const minZ = building.y + 1;
        const maxZ = building.y + building.height - 2;

        this.addTable(group, minX + 0.55, y, minZ + 0.55, building.style);
        this.addBench(group, maxX - 0.3, y, minZ + 0.65, building.style, 'x');
        this.addCrateStack(group, minX + 0.35, y, maxZ - 0.35, building.style);

        if (building.width >= 7 && building.height >= 6) {
            this.addCounter(group, maxX - 0.45, y, maxZ - 0.25, building.style);
            this.addBed(group, minX + 1.45, y, maxZ - 0.45, building.style);
        } else {
            this.addStool(group, maxX - 0.35, y, maxZ - 0.35, building.style);
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

    updateBuildingVisibility(playerX, playerY) {
        const active = this.getBuildingAt(playerX, playerY);
        for (const state of this.buildingStates.values()) {
            this.setBuildingOpen(state, active?.id === state.id);
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
        this.setDoorOpen(state, isOpen);
    }

    setDoorOpen(state, isOpen) {
        for (const door of state.doors || []) {
            const direction = door.edge === 'north' || door.edge === 'west' ? -1 : 1;
            door.pivot.rotation.y = isOpen ? direction * Math.PI * 0.58 : 0;
            door.pivot.visible = true;
        }
    }

    syncRoofVisibility(state) {
        if (!state?.roof) return;
        state.roof.visible = state.roofVisibleByRange !== false;
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

                const topTile = this.getTileAt(surface.x, surface.y, surface.z);
                if (!topTile) continue;
                topTile.hiddenBySightCutaway = true;
                this.sightCutawayTiles.add(topTile);
                this.syncTileVisibility(topTile);
            }
        }

        const playerFootY = this.getSurfaceWorldY(center.gridX, center.gridY);
        const sightRays = this.createPlayerSightRays(camera, center.gridX, center.gridY, playerFootY);
        for (const state of this.buildingStates.values()) {
            if (state.floorZ !== playerSurface.z) continue;
            this.cutAwayObstructingWalls(state, playerSurface, sightRays);
            this.cutAwayObstructingRoofBlocks(state, sightRays);
        }
    }

    clearSightCutaway() {
        if (!this.sightCutawayTiles?.size) return;
        for (const item of this.sightCutawayTiles) {
            if (item?.userData?.cutawayType === 'roof-block') {
                item.visible = true;
                continue;
            }
            item.hiddenBySightCutaway = false;
            this.syncTileVisibility(item);
        }
        this.sightCutawayTiles.clear();
    }

    createPlayerSightRays(camera, playerX, playerY, playerFootY) {
        const cameraToPlayer = new THREE.Vector3(
            playerX - camera.position.x,
            0,
            playerY - camera.position.z
        );
        if (cameraToPlayer.lengthSq() < 0.0001) return [];
        cameraToPlayer.normalize();
        const screenRight = new THREE.Vector3(-cameraToPlayer.z, 0, cameraToPlayer.x);
        const rays = [];

        for (const height of [0.22, 0.92, 1.62]) {
            for (const horizontalOffset of [-0.34, 0, 0.34]) {
                rays.push({
                    from: camera.position,
                    to: new THREE.Vector3(
                        playerX + screenRight.x * horizontalOffset,
                        playerFootY + height,
                        playerY + screenRight.z * horizontalOffset
                    )
                });
            }
        }
        return rays;
    }

    cutAwayObstructingWalls(state, playerSurface, sightRays) {
        const minWallZ = playerSurface.z + 1;
        const maxWallZ = playerSurface.z + 2;

        for (const tile of state.wallTiles) {
            if (tile.elevation < minWallZ || tile.elevation > maxWallZ) continue;
            if (!this.sightRaysIntersectBox(
                sightRays,
                tile.gridX - 0.49,
                tile.elevation - 0.48,
                tile.gridY - 0.49,
                tile.gridX + 0.49,
                tile.elevation + 0.48,
                tile.gridY + 0.49
            )) continue;
            tile.hiddenBySightCutaway = true;
            this.sightCutawayTiles.add(tile);
            this.syncTileVisibility(tile);
        }
    }

    cutAwayObstructingRoofBlocks(state, sightRays) {
        for (const roofTile of state.roofTiles) {
            if (!this.sightRaysIntersectBox(
                sightRays,
                roofTile.x - 0.49,
                roofTile.worldY - 0.18,
                roofTile.y - 0.49,
                roofTile.x + 0.49,
                roofTile.worldY + 0.46,
                roofTile.y + 0.49
            )) continue;
            roofTile.mesh.visible = false;
            this.sightCutawayTiles.add(roofTile.mesh);
        }
    }

    sightRaysIntersectBox(sightRays, minX, minY, minZ, maxX, maxY, maxZ) {
        return sightRays.some((ray) =>
            this.segmentIntersectsBox(ray.from, ray.to, minX, minY, minZ, maxX, maxY, maxZ)
        );
    }

    segmentIntersectsBox(from, to, minX, minY, minZ, maxX, maxY, maxZ) {
        let tMin = 0;
        let tMax = 1;
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const dz = to.z - from.z;

        if (Math.abs(dx) < 0.0001) {
            if (from.x < minX || from.x > maxX) return false;
        } else {
            const inverse = 1 / dx;
            const first = (minX - from.x) * inverse;
            const second = (maxX - from.x) * inverse;
            tMin = Math.max(tMin, Math.min(first, second));
            tMax = Math.min(tMax, Math.max(first, second));
            if (tMin > tMax) return false;
        }

        if (Math.abs(dy) < 0.0001) {
            if (from.y < minY || from.y > maxY) return false;
        } else {
            const inverse = 1 / dy;
            const first = (minY - from.y) * inverse;
            const second = (maxY - from.y) * inverse;
            tMin = Math.max(tMin, Math.min(first, second));
            tMax = Math.min(tMax, Math.max(first, second));
            if (tMin > tMax) return false;
        }

        if (Math.abs(dz) < 0.0001) {
            if (from.z < minZ || from.z > maxZ) return false;
        } else {
            const inverse = 1 / dz;
            const first = (minZ - from.z) * inverse;
            const second = (maxZ - from.z) * inverse;
            tMin = Math.max(tMin, Math.min(first, second));
            tMax = Math.min(tMax, Math.max(first, second));
            if (tMin > tMax) return false;
        }

        return tMax >= 0 && tMin <= 0.985;
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

    canUseStairsBetween(fromX, fromY, toX, toY, isDiagonal = false) {
        const fromSurface = this.getSurfaceAt(fromX, fromY);
        const toSurface = this.getSurfaceAt(toX, toY);
        const elevationDiff = (toSurface?.z ?? 0) - (fromSurface?.z ?? 0);
        if (elevationDiff === 0) return true;
        return Math.abs(elevationDiff) === 1;
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
        if (elevationDiff >= 2) return Infinity;

        const surface = this.getSurfaceAt(toX, toY);
        const baseCost = isDiagonal ? 1.414 : 1.0;
        const terrainCost = surface?.definition?.moveCost || 1;
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
        const tile = this.getTileAt(x, y, z);
        if (tile) {
            console.log(`[WorldGenerator] Modifying tile at ${x},${y},${z} to Element:${element}, Var:${textureValue}`);
            tile.setElementalType(element, textureValue, effect, building);
        } else {
            this.addTile(x, y, z, element, textureValue, effect, building);
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
            
            // Re-calculate elevation for this x,y
            let newMaxZ = -1;
            let topTile = null;
            for (let currentZ = z + 10; currentZ >= 0; currentZ--) {
                const candidate = this.tileMap.get(this.getTileKey(x, y, currentZ));
                if (candidate) {
                    newMaxZ = currentZ;
                    topTile = candidate;
                    break;
                }
            }
            const columnKey = this.getColumnKey(x, y);
            if (newMaxZ === -1) {
                this.elevationMap.delete(columnKey);
                this.surfaceMap.delete(columnKey);
            } else {
                this.elevationMap.set(columnKey, newMaxZ);
                this.surfaceMap.set(columnKey, {
                    x,
                    y,
                    z: newMaxZ,
                    element: topTile.element,
                    textureValue: topTile.textureValue,
                    effect: topTile.effect,
                    building: topTile.building,
                    definition: getTileDefinition(topTile.element, topTile.textureValue)
                });
            }
        }
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
