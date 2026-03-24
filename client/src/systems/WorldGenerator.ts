import Phaser from 'phaser';
import { Tile } from '../entities/Tile';

export const ELEMENTS = {
    VOID: 0,
    GEO: 1,    // Ground
    HYDRO: 2,  // Water
    ANEMO: 3,  // Sand/Air
    CRYO: 4,   // Ice
    PYRO: 5    // Fire
};

export class WorldGenerator {
    scene: Phaser.Scene & { engine: any };
    engine: unknown;
    tiles: Tile[];
    elevationMap!: Map<string, number>;

    constructor(scene: Phaser.Scene & { engine: any }, engine: unknown) {
        this.scene = scene;
        this.engine = engine;
        this.tiles = [];
        this.tileMap = new Map(); // key: "x,y,z" -> Tile object
        this.elevationMap = new Map(); // key: "x,y" -> maxZ
    }

<<<<<<< HEAD:client/src/systems/WorldGenerator.js
    /**
     * Streamlined world generation using a simplified mathematical method.
     */
    generate(width, height) {
=======
    generate(width: number, height: number) {
>>>>>>> 994f342f84e83f81c335a9567f633df8af84334f:client/src/systems/WorldGenerator.ts
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

<<<<<<< HEAD:client/src/systems/WorldGenerator.js
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
=======
    getElevation(x: number, y: number) {
>>>>>>> 994f342f84e83f81c335a9567f633df8af84334f:client/src/systems/WorldGenerator.ts
        const gridX = Math.floor(x);
        const gridY = Math.floor(y);
        return this.elevationMap.get(`${gridX},${gridY}`) ?? 0;
    }

<<<<<<< HEAD:client/src/systems/WorldGenerator.js
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
=======
    getColorForType(z: number, maxZ: number) {
        if (z < 1) return { color: 0x6aa3c8 }; // Cozy soft blue water
        if (z < 2) return { color: 0xe8c97d }; // Warm golden sand
        if (z < maxZ) return { color: 0x7cb87a }; // Sage green grass
        return { color: 0xb07a5a }; // Warm terracotta rock
>>>>>>> 994f342f84e83f81c335a9567f633df8af84334f:client/src/systems/WorldGenerator.ts
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
