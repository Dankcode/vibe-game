import { Tile } from '../entities/Tile.js';

export const ELEMENTS = {
    VOID: 0,
    GEO: 1,    // Ground
    HYDRO: 2,  // Water
    ANEMO: 3,  // Sand/Air
    CRYO: 4,   // Ice
    PYRO: 5    // Fire
};

export class WorldGenerator {
    constructor(scene, engine) {
        this.scene = scene;
        this.engine = engine;
        this.tiles = [];
        this.tileMap = new Map(); // key: "x,y,z" -> Tile object
        this.elevationMap = new Map(); // key: "x,y" -> maxZ
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

    addTile(x, y, z, element, textureValue = 0) {
        const tile = new Tile(this.scene, x, y, z, { element, textureValue });
        this.tiles.push(tile);
        this.tileMap.set(`${x},${y},${z}`, tile);
        
        // Update elevation map
        const currentMaxZ = this.elevationMap.get(`${x},${y}`) ?? -1;
        if (z > currentMaxZ) {
            this.elevationMap.set(`${x},${y}`, z);
        }
        
        return tile;
    }

    getTileAt(x, y, z) {
        return this.tileMap.get(`${x},${y},${z}`);
    }

    getElevation(x, y) {
        const gridX = Math.floor(x);
        const gridY = Math.floor(y);
        return this.elevationMap.get(`${gridX},${gridY}`) ?? 0;
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
        const key = `${x},${y},${z}`;
        const tile = this.tileMap.get(key);
        if (tile) {
            tile.destroy();
            this.tileMap.delete(key);
            this.tiles = this.tiles.filter(t => t !== tile);
            
            // Re-calculate elevation for this x,y
            let newMaxZ = -1;
            for (let currentZ = z + 10; currentZ >= 0; currentZ--) {
                if (this.tileMap.has(`${x},${y},${currentZ}`)) {
                    newMaxZ = currentZ;
                    break;
                }
            }
            if (newMaxZ === -1) {
                this.elevationMap.delete(`${x},${y}`);
            } else {
                this.elevationMap.set(`${x},${y}`, newMaxZ);
            }
        }
    }

    clear() {
        this.tiles.forEach(t => t.destroy());
        this.tiles = [];
        this.tileMap.clear();
        this.elevationMap.clear();
    }

    exportWorld() {
        const data = this.tiles.map(t => ({
            x: t.gridX,
            y: t.gridY,
            z: t.gridZ,
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
                this.addTile(tileData.x, tileData.y, tileData.z, tileData.element, tileData.variant);
            });
            console.log(`[WorldGenerator] Loaded ${data.length} tiles.`);
        } catch (e) {
            console.error('[WorldGenerator] Failed to load world:', e);
        }
    }
}
