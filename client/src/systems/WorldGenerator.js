import { Tile } from '../entities/Tile.js';
import { ELEMENTS, getTileDefinition, isTileWalkable, tileSupportsHabitat } from '../data/TileRegistry.js';

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
        const width = mapArray[0].length;
        
        const offsetX = Math.floor(width / 2);
        const offsetY = Math.floor(height / 2);

        for (let y = 0; y < height; y++) {
            const row = mapArray[y];
            for (let x = 0; x < width; x++) {
                const char = row[x];
                const blockInfo = legend[char] || { element: ELEMENTS.VOID, maxZ: 0, textureValue: 0 };
                
                const gridX = x - offsetX;
                const gridY = y - offsetY;
                
                for (let z = 0; z <= blockInfo.maxZ; z++) {
                    const actualElement = (z === blockInfo.maxZ) ? blockInfo.element : ELEMENTS.GEO;
                    const actualVariant = (z === blockInfo.maxZ) ? (blockInfo.textureValue ?? 0) : 0;
                    this.addTile(gridX, gridY, z, actualElement, actualVariant);
                }
            }
        }
    }

    generateFromChunkedArray(mapArray, legend, chunkSize = this.chunkSize) {
        this.chunkSize = chunkSize;
        this.generateFromArray(mapArray, legend);
    }

    addTile(x, y, z, element, textureValue = 0) {
        const tile = new Tile(this.threeManager, x, y, z, { element, textureValue });
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

    getSurfaceAt(x, y) {
        const { gridX, gridY } = this.toGridPosition(x, y);
        return this.surfaceMap.get(this.getColumnKey(gridX, gridY));
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
        return toZ - fromZ < 2;
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
        if (!diagonalMove) return true;

        const horizontalClear = this.canOccupyTile(end.gridX, start.gridY, start.gridX, start.gridY);
        const verticalClear = this.canOccupyTile(start.gridX, end.gridY, start.gridX, start.gridY);
        return horizontalClear && verticalClear;
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
    modifyTile(x, y, z, element, textureValue = 0) {
        const tile = this.getTileAt(x, y, z);
        if (tile) {
            console.log(`[WorldGenerator] Modifying tile at ${x},${y},${z} to Element:${element}, Var:${textureValue}`);
            tile.setElementalType(element, textureValue);
        } else {
            this.addTile(x, y, z, element, textureValue);
        }
    }

    /**
     * Specific logic: if water/hydro (2), turn to ice/cryo (4)
     */
    applyIceToTile(x, y, z) {
        const tile = this.getTileAt(x, y, z);
        if (tile && tile.element === ELEMENTS.HYDRO) {
            this.modifyTile(x, y, z, ELEMENTS.CRYO, 0);
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
                    definition: getTileDefinition(topTile.element, topTile.textureValue)
                });
            }
        }
    }

    clear() {
        this.tiles.forEach(t => t.destroy());
        this.tiles = [];
        this.tileMap.clear();
        this.elevationMap.clear();
        this.surfaceMap.clear();
        this.chunkMap.clear();
    }

    exportWorld() {
        const data = this.tiles.map(t => ({
            gridX: t.gridX,
            gridY: t.gridY,
            elevation: t.elevation,
            element: t.element,
            variant: t.textureValue
        }));
        return JSON.stringify(data);
    }

    loadWorld(json) {
        try {
            const data = JSON.parse(json);
            this.clear();
            data.forEach(tileData => {
                this.addTile(tileData.gridX, tileData.gridY, tileData.elevation, tileData.element, tileData.variant);
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
