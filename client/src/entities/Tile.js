import Phaser from 'phaser';

export class Tile {
    constructor(scene, gridX, gridY, elevation, attributes = {}) {
        this.scene = scene;
        this.engine = scene.engine;
        
        this.gridX = gridX;
        this.gridY = gridY;
        this.elevation = elevation;
        this.attributes = attributes;
        
        // Elemental system: similar to Genshin Impact
        // Blocks maintain element, but can have different texture values
        this.element = attributes.element || 1;    // Default: Ground/Geo (1)
        this.textureValue = attributes.textureValue || 0; // Variant/Texture offset

        this.render();
    }

    setElementalType(element, textureValue) {
        this.element = element;
        this.textureValue = textureValue;
        if (this.graphics) this.graphics.destroy();
        this.render();
    }

    render() {
        const { TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH } = this.engine;
        const color = this.getColorForType(this.element, this.textureValue);

        // Calculate screen position
        const pos = this.engine.toScreen(this.gridX, this.gridY, this.elevation);

        // Graphics for the cube
        const graphics = this.scene.add.graphics();
        graphics.setDepth(pos.depth);
        graphics.setPosition(pos.x, pos.y);

        // Define faces
        const top = [
            0, -TILE_HEIGHT/2,
            TILE_WIDTH/2, 0,
            0, TILE_HEIGHT/2,
            -TILE_WIDTH/2, 0
        ];

        const left = [
            -TILE_WIDTH/2, 0,
            0, TILE_HEIGHT/2,
            0, TILE_HEIGHT/2 + TILE_DEPTH,
            -TILE_WIDTH/2, TILE_DEPTH
        ];

        const right = [
            0, TILE_HEIGHT/2,
            TILE_WIDTH/2, 0,
            TILE_WIDTH/2, TILE_DEPTH,
            0, TILE_HEIGHT/2 + TILE_DEPTH
        ];

        // Top face
        graphics.fillStyle(color, 1);
        graphics.fillPoints(this.getPhaserPoints(top), true);
        graphics.lineStyle(2, 0xffffff, 0.1);
        graphics.strokePoints(this.getPhaserPoints(top), true);

        // Left face
        graphics.fillStyle(this.shadeColor(color, -20), 1);
        graphics.fillPoints(this.getPhaserPoints(left), true);

        // Right face
        graphics.fillStyle(this.shadeColor(color, -40), 1);
        graphics.fillPoints(this.getPhaserPoints(right), true);

        this.graphics = graphics;
    }

    getColorForType(element, textureValue) {
        switch (element) {
            case 1: // Ground / Geo
                return 0x7cb87a;
            case 2: // Water / Hydro
                if (textureValue === 4) return 0x4a5d23; // Brackish water
                return 0x6aa3c8; // Normal water
            case 3: // Sand / Anemo? (using as terrain)
                return 0xe8c97d;
            case 4: // Ice / Cryo
                return 0xdef3f6;
            case 5: // Fire / Pyro
                return 0xe67e22;
            default:
                return 0x888888;
        }
    }

    getPhaserPoints(points) {
        const phaserPoints = [];
        for (let i = 0; i < points.length; i += 2) {
            phaserPoints.push(new Phaser.Geom.Point(points[i], points[i + 1]));
        }
        return phaserPoints;
    }

    shadeColor(color, percent) {
        const r = (color >> 16) & 0xFF;
        const g = (color >> 8) & 0xFF;
        const b = color & 0xFF;

        const nr = Math.min(255, Math.max(0, r + percent));
        const ng = Math.min(255, Math.max(0, g + percent));
        const nb = Math.min(255, Math.max(0, b + percent));

        return (nr << 16) | (ng << 8) | nb;
    }

    destroy() {
        if (this.graphics) this.graphics.destroy();
        if (this.objects) {
            this.objects.forEach(obj => obj.destroy());
            this.objects = [];
        }
    }
}
