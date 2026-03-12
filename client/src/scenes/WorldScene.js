import { IsometricEngine } from '../systems/IsometricEngine.js';
import { WorldGenerator } from '../systems/WorldGenerator.js';
import { Player } from '../entities/Player.js';

export default class WorldScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WorldScene' });
    }

    preload() {
        // Load character spritesheets
        this.load.spritesheet('merchant-body', 'assets/sprites/merchant-body.png', { frameWidth: 50, frameHeight: 100 });
        this.load.spritesheet('red-head', 'assets/sprites/red-head.png', { frameWidth: 50, frameHeight: 50 });
    }

    create() {
        // 1. Setup Background Color
        this.cameras.main.setBackgroundColor('#2a1f14'); // Warm dark brown

        // 3. Initialize Isometric Engine
        this.engine = new IsometricEngine(this, {
            tileWidth: 64,
            tileHeight: 32,
            tileDepth: 32,    // CUBE: depth = height for true cubic look
            worldScale: 2.8   // Slightly larger tiles as requested
        });

        // 4. Procedural World Generation
        this.generator = new WorldGenerator(this, this.engine);
        this.generator.generate(30, 30);

        // 5. Create Player
        this.player = new Player(this, 0, 0, 'merchant-body', 'red-head');

        // 6. Camera Follow
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setZoom(1.0); // Reset zoom since we use worldScale

        // Launch UI Scene
        this.scene.launch('UIScene');
    }

    update() {
        if (this.player) {
            this.player.update();
        }
    }
}