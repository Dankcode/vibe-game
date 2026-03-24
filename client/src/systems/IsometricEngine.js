import Phaser from 'phaser';

export class IsometricEngine {
    constructor(scene, config = {}) {
        this.scene = scene;
        this.baseWidth = config.tileWidth || 64;
        this.baseHeight = config.tileHeight || 32;
        this.baseDepth = config.tileDepth || 20;
        this.worldScale = config.worldScale || 1.0;
        this.scrollX = 0;
        this.scrollY = 0;
        this.zoom = 1;
        this.layers = {
            background: [],
            ground: [],
            objects: [],
            characters: [],
            effects: []
        };
    }

    get TILE_WIDTH() { return this.baseWidth * this.worldScale; }
    get TILE_HEIGHT() { return this.baseHeight * this.worldScale; }
    get TILE_DEPTH() { return this.baseDepth * this.worldScale; }

    toScreen(x, y, z = 0) {
        const screenX = (x - y) * (this.TILE_WIDTH / 2);
        const screenY = (x + y) * (this.TILE_HEIGHT / 2) - (z * this.TILE_DEPTH);
        return {
            x: screenX * this.zoom + this.scrollX,
            y: screenY * this.zoom + this.scrollY,
            depth: this.calculateDepth(x, y, z)
        };
    }

    toGrid(screenX, screenY) {
        const adjX = (screenX - this.scrollX) / this.zoom;
        const adjY = (screenY - this.scrollY) / this.zoom;
        const x = (adjX / (this.TILE_WIDTH / 2) + adjY / (this.TILE_HEIGHT / 2)) / 2;
        const y = (adjY / (this.TILE_HEIGHT / 2) - adjX / (this.TILE_WIDTH / 2)) / 2;
        return { x: Math.floor(x), y: Math.floor(y) };
    }

    calculateDepth(x, y, z) {
        return (x + y) * 1000 + z * 100;
    }

    createBackgroundLayer(key, scrollFactor, tint = 0xffffff) {
        const layer = this.scene.add.tileSprite(
            0, 0,
            this.scene.scale.width * 2,
            this.scene.scale.height * 2,
            key
        );
        layer.setOrigin(0.5);
        layer.setScrollFactor(scrollFactor);
        layer.setTint(tint);
        layer.setDepth(-1000 + scrollFactor * 100);
        return layer;
    }

    sortDepth() {}

    updateCamera(dx, dy) {
        this.scrollX += dx;
        this.scrollY += dy;
    }
}
