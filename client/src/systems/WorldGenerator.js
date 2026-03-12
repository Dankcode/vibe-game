import { Tile } from '../entities/Tile.js';

export class WorldGenerator {
    constructor(scene, engine) {
        this.scene = scene;
        this.engine = engine;
        this.tiles = [];
    }

    generate(width, height) {
        this.clear();
        this.elevationMap = new Map();

        for (let x = -width/2; x < width/2; x++) {
            for (let y = -height/2; y < height/2; y++) {
                // Determine base elevation using simple noise-like pattern
                const elevation = Math.floor(Math.sin(x * 0.5) * Math.cos(y * 0.5) * 2) + 2;

                this.elevationMap.set(`${x},${y}`, elevation);

                for (let z = 0; z <= elevation; z++) {
                    const terrain = this.getColorForType(z, elevation);
                    const tile = new Tile(this.scene, x, y, z, { 
                        color: terrain.color
                    });
                    this.tiles.push(tile);
                }
            }
        }
    }

    getElevation(x, y) {
        const gridX = Math.floor(x);
        const gridY = Math.floor(y);
        return this.elevationMap.get(`${gridX},${gridY}`) || 0;
    }

    getColorForType(z, maxZ) {
        if (z < 1) return { color: 0x6aa3c8 }; // Cozy soft blue water
        if (z < 2) return { color: 0xe8c97d }; // Warm golden sand
        if (z < maxZ) return { color: 0x7cb87a }; // Sage green grass
        return { color: 0xb07a5a }; // Warm terracotta rock
    }

    clear() {
        this.tiles.forEach(t => t.destroy());
        this.tiles = [];
    }
}
