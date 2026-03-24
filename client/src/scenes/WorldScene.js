import Phaser from 'phaser';
import { IsometricEngine } from '../systems/IsometricEngine.js';
import { WorldGenerator, ELEMENTS } from '../systems/WorldGenerator.js';
import { MapEditor } from '../systems/MapEditor.js';
import { PlayerGirl2 } from '../entities/PlayerGirl2.js';
import * as Colyseus from 'colyseus.js';

export default class WorldScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WorldScene' });
        this.zoom = 1.0;
        this.minZoom = 0.5;
        this.maxZoom = 3.0;
        this.zoomSpeed = 0.1;
        this.userId = null;
    }

    preload() {
        this.load.spritesheet('merchant-body', 'assets/sprites/merchant-body.png', { frameWidth: 50, frameHeight: 100 });
        this.load.spritesheet('red-head', 'assets/sprites/red-head.png', { frameWidth: 50, frameHeight: 50 });
        this.load.multiatlas('girl2-body', 'assets/sprites/body-2-walk.json', 'assets/sprites/');
        this.load.multiatlas('girl2-head', 'assets/sprites/head-2-walk.json', 'assets/sprites/');
    }

    async create() {
        this.cameras.main.setBackgroundColor('#2a1f14'); 
        this.engine = new IsometricEngine(this, {
            tileWidth: 64,
            tileHeight: 32,
            tileDepth: 32,    
            worldScale: 2.8   
        });

        this.generator = new WorldGenerator(this, this.engine);
        this.generator.generate(30, 30);

        await this.connectToServer();

        this.player = new PlayerGirl2(this, 0, 0, 'girl2-body', 'girl2-head');

        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setZoom(1.0); 

        this.editor = new MapEditor(this);
        this.setupPlayerNetworking();
        this.scene.launch('UIScene');
        this.setupZoomControls();
    }

    setupZoomControls() {
        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            if (deltaY > 0) this.zoomOut();
            else this.zoomIn();
        });
        this.input.keyboard.on('keydown-MINUS', () => this.zoomOut());
        this.input.keyboard.on('keydown-EQUALS', () => this.zoomIn());
        this.input.keyboard.on('keydown-N', () => this.resetZoom());
    }

    zoomIn() { this.setZoom(this.zoom + this.zoomSpeed); }
    zoomOut() { this.setZoom(this.zoom - this.zoomSpeed); }

    setZoom(newZoom) {
        this.zoom = Phaser.Math.Clamp(newZoom, this.minZoom, this.maxZoom);
        this.cameras.main.setZoom(this.zoom);
    }

    resetZoom() {
        this.zoom = 1.0;
        this.cameras.main.setZoom(this.zoom);
    }

    update(time, delta) {
        if (this.player) this.player.update(time, delta);
        if (this.editor) this.editor.update();
    }

    async connectToServer() {
        try {
            console.log('[WorldScene] Connecting to server...');
            this.client = new Colyseus.Client('ws://localhost:2567');
            this.userId = this.generateUserId();
            this.room = await this.client.joinOrCreate('world', {
                userId: this.userId,
                x: 0,
                y: 0,
                z: 0
            });
            console.log('[WorldScene] Connected to room:', this.room.id);

            this.room.state.players.onAdd = (player, sessionId) => {
                if (sessionId !== this.room.sessionId) {
                    console.log('[WorldScene] Another player joined:', player.userId);
                }
            };
        } catch (error) {
            console.error('[WorldScene] Failed to connect to server:', error);
        }
    }

    setupPlayerNetworking() {
        if (!this.room || !this.player) return;
        this.player.onTileChange = (x, y, z) => {
            this.room.send('player:move', { x, y, z });
        };
        this.room.state.players.onAdd = (player, sessionId) => {
            if (sessionId === this.room.sessionId) {
                if (this.player) {
                    this.player.gridX = player.x;
                    this.player.gridY = player.y;
                    this.player.gridZ = player.z;
                }
            }
        };
    }

    generateUserId() {
        const existingId = localStorage.getItem('userId');
        if (existingId) return existingId;
        const newId = 'user_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('userId', newId);
        return newId;
    }
}
