export class Tile {
    constructor(scene, gridX, gridY, elevation, attributes = {}) {
        this.scene = scene;
        this.engine = scene.engine;
        
        this.gridX = gridX;
        this.gridY = gridY;
        this.elevation = elevation;
        this.attributes = attributes;

        this.render();
    }

    render() {
        const { TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH } = this.engine;
        const color = this.attributes.color || 0x888888;

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

        // Left face (shaded more for depth on cubic tiles)
        graphics.fillStyle(this.shadeColor(color, -30), 1);
        graphics.fillPoints(this.getPhaserPoints(left), true);

        // Right face (darkest, shadow side)
        graphics.fillStyle(this.shadeColor(color, -55), 1);
        graphics.fillPoints(this.getPhaserPoints(right), true);

        this.graphics = graphics;
    }

    getPhaserPoints(points) {
        const phaserPoints = [];
        for (let i = 0; i < points.length; i += 2) {
            phaserPoints.push(new Phaser.Geom.Point(points[i], points[i+1]));
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
