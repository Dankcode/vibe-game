import Phaser from 'phaser';
import { Tile } from '../entities/Tile';

export class WorldGenerator {
    scene: Phaser.Scene & { engine: any };
    engine: unknown;
    tiles: Tile[];
    elevationMap!: Map<string, number>;

    constructor(scene: Phaser.Scene & { engine: any }, engine: unknown) {
        this.scene = scene;
        this.engine = engine;
        this.tiles = [];
    }

    generate(width: number, height: number) {
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

    getElevation(x: number, y: number) {
        const gridX = Math.floor(x);
        const gridY = Math.floor(y);
        return this.elevationMap.get(`${gridX},${gridY}`) || 0;
    }

    getColorForType(z: number, maxZ: number) {
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
