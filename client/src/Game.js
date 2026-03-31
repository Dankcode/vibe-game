import { ThreeManager } from './systems/ThreeManager.js';
import { WorldGenerator } from './systems/WorldGenerator.js';
import { PlayerGirl2 } from './entities/PlayerGirl2.js';
import { InputManager } from './systems/InputManager.js';
import * as Colyseus from 'colyseus.js';

export class Game {
    constructor() {
        this.threeManager = new ThreeManager();
        this.inputManager = new InputManager();
        
        this.worldGenerator = new WorldGenerator(this.threeManager);
        this.worldGenerator.generate(30, 30);

        this.player = new PlayerGirl2(this.threeManager, this.inputManager, 0, 0);
        
        this.userId = this.generateUserId();
        this.connectToServer();

        this.inputManager.onKeyDown('KeyQ', () => this.threeManager.rotateCamera(1));
        this.inputManager.onKeyDown('KeyE', () => this.threeManager.rotateCamera(-1));

        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    async connectToServer() {
        try {
            console.log('[Game] Connecting to server...');
            const host = window.location.hostname;
            this.client = new Colyseus.Client(`ws://${host}:2567`);
            
            this.room = await this.client.joinOrCreate('world', {
                userId: this.userId,
                x: 0,
                y: 0,
                z: 0
            });
            console.log('[Game] Connected to room:', this.room.id);

            this.setupNetworking();
        } catch (error) {
            console.error('[Game] Failed to connect to server:', error);
        }
    }

    setupNetworking() {
        if (!this.room) return;

        this.room.state.players.onAdd = (player, sessionId) => {
            if (sessionId === this.room.sessionId) {
                // Sync initial position if needed
                this.player.gridX = player.x;
                this.player.gridY = player.y;
                this.player.gridZ = player.z;
            } else {
                console.log('[Game] Another player joined:', player.userId);
            }
        };

        // Update loop for network sync
        setInterval(() => {
            if (this.room && this.player) {
                this.room.send('player:move', {
                    x: Math.round(this.player.gridX),
                    y: Math.round(this.player.gridY),
                    z: Math.round(this.player.gridZ)
                });
            }
        }, 100);
    }

    generateUserId() {
        const existingId = localStorage.getItem('userId');
        if (existingId) return existingId;
        const newId = 'user_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('userId', newId);
        return newId;
    }

    animate() {
        requestAnimationFrame(this.animate);
        
        // Handle zoom
        const wheelDelta = this.inputManager.getWheelDelta();
        if (wheelDelta !== 0) {
            this.threeManager.handleZoom(wheelDelta);
        }

        // Update player
        if (this.player) {
            // Update elevation based on generator
            const groundZ = this.worldGenerator.getElevation(this.player.gridX, this.player.gridY);
            this.player.gridZ = groundZ;
            this.player.update();
            
            // Make camera follow player
            const targetPos = this.player.group.position;
            this.threeManager.updateCamera(targetPos);
        }

        this.threeManager.render();
    }
}
