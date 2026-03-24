import { IsometricEngine } from '../systems/IsometricEngine.js';
import { WorldGenerator } from '../systems/WorldGenerator.js';
import { MapEditor } from '../systems/MapEditor.js';
import { Player } from '../entities/Player.js';
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
        // Load character spritesheets
        this.load.spritesheet('merchant-body', 'assets/sprites/merchant-body.png', { frameWidth: 50, frameHeight: 100 });
        this.load.spritesheet('red-head', 'assets/sprites/red-head.png', { frameWidth: 50, frameHeight: 50 });
    }

    async create() {
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

        // 5. Connect to server
        await this.connectToServer();

        // 6. Create Player
        this.player = new Player(this, 0, 0, 'merchant-body', 'red-head');

        // 7. Camera Follow
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setZoom(1.0); // Reset zoom since we use worldScale

        // 8. Setup Map Editor
        this.editor = new MapEditor(this);

        // 9. Setup player networking
        this.setupPlayerNetworking();

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

        // Reset zoom (N key - freed up from R)
        this.input.keyboard.on('keydown-N', () => this.resetZoom());
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

    update(time, delta) {
        if (this.player) {
            this.player.update(time, delta);
        }
        if (this.editor) {
            this.editor.update();
        }
    }

    async connectToServer() {
        try {
            console.log('[WorldScene] Connecting to server...');

            // Create Colyseus client
            this.client = new Colyseus.Client('ws://localhost:2567');

            // Generate or get user ID (in production, this would come from auth)
            this.userId = this.generateUserId();
            console.log('[WorldScene] User ID:', this.userId);

            // Join the world room
            this.room = await this.client.joinOrCreate('world', {
                userId: this.userId,
                x: 0,
                y: 0,
                z: 0
            });

            console.log('[WorldScene] Connected to room:', this.room.id);

            // Listen for other players joining
            this.room.state.players.onAdd = (player, sessionId) => {
                if (sessionId !== this.room.sessionId) {
                    console.log('[WorldScene] Another player joined:', player.userId);
                    // TODO: Create sprite for other players
                }
            };

            // Listen for other players leaving
            this.room.state.players.onRemove = (player, sessionId) => {
                console.log('[WorldScene] Player left:', player.userId);
                // TODO: Remove sprite for other players
            };

            // Listen for player data updates
            this.room.state.players.onChange = (player, sessionId) => {
                if (sessionId !== this.room.sessionId) {
                    console.log('[WorldScene] Player updated:', player.userId, player.x, player.y, player.z);
                    // TODO: Update position of other players
                }
            };

        } catch (error) {
            console.error('[WorldScene] Failed to connect to server:', error);
        }
    }

    setupPlayerNetworking() {
        if (!this.room || !this.player) {
            console.error('[WorldScene] Cannot setup networking - room or player not ready');
            return;
        }

        console.log('[WorldScene] Setting up player networking...');

        // Hook up the tile change callback to send updates to server
        this.player.onTileChange = (x, y, z) => {
            // Send position update to server
            this.room.send('player:move', {
                x: x,
                y: y,
                z: z
            });

            console.log('[WorldScene] Sent position update to server:', { x, y, z });
        };

        // Get initial inventory from server when player state is received
        this.room.state.players.onAdd = (player, sessionId) => {
            if (sessionId === this.room.sessionId) {
                console.log('[WorldScene] My player data loaded:', {
                    userId: player.userId,
                    position: { x: player.x, y: player.y, z: player.z },
                    inventory: this.inventoryToObject(player.inventory)
                });

                // Update local player position from server if needed
                if (this.player) {
                    this.player.gridX = player.x;
                    this.player.gridY = player.y;
                    this.player.gridZ = player.z;
                }

                // TODO: Update UI with inventory data
                this.updateInventoryUI(player.inventory);
            }
        };
    }

    updateInventoryUI(inventory) {
        // Convert MapSchema to plain object for UI
        const items = this.inventoryToObject(inventory);
        console.log('[WorldScene] Inventory:', items);

        // TODO: Send inventory data to UIScene for display
        // Example: this.events.emit('inventory:update', items);
    }

    inventoryToObject(inventory) {
        const items = {};
        if (inventory && inventory.forEach) {
            inventory.forEach((value, key) => {
                items[key] = value;
            });
        }
        return items;
    }

    generateUserId() {
        // Simple user ID generation - in production this would come from auth
        const existingId = localStorage.getItem('userId');
        if (existingId) {
            return existingId;
        }

        const newId = 'user_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('userId', newId);
        return newId;
    }

    // Add methods to interact with inventory (call these from UI or game logic)
    updateInventory(action, item, quantity) {
        if (!this.room) {
            console.error('[WorldScene] Cannot update inventory - not connected to server');
            return;
        }

        this.room.send('player:inventory', {
            action: action,
            item: item,
            quantity: quantity
        });

        console.log('[WorldScene] Sent inventory update:', { action, item, quantity });
    }
}