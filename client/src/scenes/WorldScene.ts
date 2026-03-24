import Phaser from 'phaser';
import { IsometricEngine } from '../systems/IsometricEngine';
import { WorldGenerator } from '../systems/WorldGenerator';
import { PlayerGirl2 } from '../entities/PlayerGirl2';

export default class WorldScene extends Phaser.Scene {
    engine!: IsometricEngine;
    generator!: WorldGenerator;
    player!: PlayerGirl2;
    zoom: number;
    minZoom: number;
    maxZoom: number;
    zoomSpeed: number;

    constructor() {
        super({ key: 'WorldScene' });
        this.zoom = 1.0;
        this.minZoom = 0.5;
        this.maxZoom = 3.0;
        this.zoomSpeed = 0.1;
    }

    preload() {
        // Load character spritesheets
        this.load.spritesheet('merchant-body', 'assets/sprites/merchant-body.png', { frameWidth: 50, frameHeight: 100 });
        this.load.spritesheet('red-head', 'assets/sprites/red-head.png', { frameWidth: 50, frameHeight: 50 });

        // Girl2 atlases (TexturePacker multiatlas JSON)
        this.load.multiatlas('girl2-body', 'assets/sprites/body-2-walk.json', 'assets/sprites/');
        this.load.multiatlas('girl2-head', 'assets/sprites/head-2-walk.json', 'assets/sprites/');
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
        this.player = new PlayerGirl2(this, 0, 0, 'girl2-body', 'girl2-head');

        // 6. Camera Follow
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setZoom(1.0); // Reset zoom since we use worldScale

        // Launch UI Scene
        this.scene.launch('UIScene');

        // Setup Zoom Controls
        this.setupZoomControls();
    }

    setupZoomControls() {
        // Mouse wheel zoom
        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            if (deltaY > 0) {
                this.zoomOut();
            } else {
                this.zoomIn();
            }
        });

        // Keyboard zoom controls
        this.input.keyboard.on('keydown-MINUS', () => this.zoomOut());
        this.input.keyboard.on('keydown-EQUALS', () => this.zoomIn());

        // Alternative keyboard controls (Q/E keys)
        this.input.keyboard.on('keydown-Q', () => this.zoomOut());
        this.input.keyboard.on('keydown-E', () => this.zoomIn());

        // Reset zoom (R key)
        this.input.keyboard.on('keydown-R', () => this.resetZoom());
    }

    zoomIn() {
        this.setZoom(this.zoom + this.zoomSpeed);
    }

    zoomOut() {
        this.setZoom(this.zoom - this.zoomSpeed);
    }

    setZoom(newZoom) {
        // Clamp zoom between min and max
        this.zoom = Phaser.Math.Clamp(newZoom, this.minZoom, this.maxZoom);
        this.cameras.main.setZoom(this.zoom);
    }

    resetZoom() {
        this.zoom = 1.0;
        this.cameras.main.setZoom(this.zoom);
    }

    update() {
        if (this.player) {
            this.player.update();
        }
    }
}
