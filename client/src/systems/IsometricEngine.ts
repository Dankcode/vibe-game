import Phaser from 'phaser';

/**
 * Isometric projection engine for tile-based 2.5D MMORPG
 * Converts 3D grid coordinates to 2D screen space
 */
export class IsometricEngine {
    scene: Phaser.Scene;
    baseWidth: number;
    baseHeight: number;
    baseDepth: number;
    worldScale: number;
    scrollX: number;
    scrollY: number;
    zoom: number;
    layers: Record<string, unknown[]>;

    constructor(
        scene: Phaser.Scene,
        config: { tileWidth?: number; tileHeight?: number; tileDepth?: number; worldScale?: number } = {}
    ) {
        this.scene = scene;

        // Isometric projection constants
        this.baseWidth = config.tileWidth || 64;
        this.baseHeight = config.tileHeight || 32;
        this.baseDepth = config.tileDepth || 20;

        this.worldScale = config.worldScale || 1.0;

        // Camera
        this.scrollX = 0;
        this.scrollY = 0;
        this.zoom = 1;

        this.layers = {
            background: [],    // 3D backdrop (mountains, sky)
            ground: [],        // Base tiles
            objects: [],       // Trees, buildings
            characters: [],    // Players, NPCs
            effects: []        // Spells, particles
        };
    }

    get TILE_WIDTH() { return this.baseWidth * this.worldScale; }
    get TILE_HEIGHT() { return this.baseHeight * this.worldScale; }
    get TILE_DEPTH() { return this.baseDepth * this.worldScale; }

    /**
     * Project 3D world coordinates (x, y, z) to 2D screen space
     * x: east-west, y: north-south, z: elevation
     */
    toScreen(x: number, y: number, z: number = 0) {
        const screenX = (x - y) * (this.TILE_WIDTH / 2);
        const screenY = (x + y) * (this.TILE_HEIGHT / 2) - (z * this.TILE_DEPTH);

        return {
            x: screenX * this.zoom + this.scrollX,
            y: screenY * this.zoom + this.scrollY,
            depth: this.calculateDepth(x, y, z)
        };
    }

    /**
     * Convert screen coordinates back to grid (for mouse picking)
     */
    toGrid(screenX: number, screenY: number) {
        const adjX = (screenX - this.scrollX) / this.zoom;
        const adjY = (screenY - this.scrollY) / this.zoom;

        const x = (adjX / (this.TILE_WIDTH / 2) + adjY / (this.TILE_HEIGHT / 2)) / 2;
        const y = (adjY / (this.TILE_HEIGHT / 2) - adjX / (this.TILE_WIDTH / 2)) / 2;

        return { x: Math.floor(x), y: Math.floor(y) };
    }

    /**
     * Depth sorting for proper occlusion (painter's algorithm)
     */
    calculateDepth(x: number, y: number, z: number) {
        // (x + y) gives row-based depth, z adds elevation priority
        return (x + y) * 1000 + z * 100;
    }

    /**
     * Create 3D parallax background layers
     */
    createBackgroundLayer(key: string, scrollFactor: number, tint: number = 0xffffff) {
        const layer = this.scene.add.tileSprite(
            0, 0,
            this.scene.scale.width * 2,
            this.scene.scale.height * 2,
            key
        );
        layer.setOrigin(0.5);
        layer.setScrollFactor(scrollFactor);
        layer.setTint(tint);
        layer.setDepth(-1000 + scrollFactor * 100); // Far back

        return layer;
    }

    /**
     * Sort all display objects by depth
     */
    sortDepth() {
        // Phaser 3 handles this via setDepth() on each object
        // We just ensure all sprites call this.engine.updateDepth(this)
    }

    updateCamera(dx: number, dy: number) {
        this.scrollX += dx;
        this.scrollY += dy;
    }
}
