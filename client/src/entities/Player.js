export class Player {
    constructor(scene, gridX, gridY, bodyTexture, headTexture) {
        this.scene = scene;
        this.engine = scene.engine;
        
        // Initial grid position (isometric coordinates)
        this.gridX = gridX;
        this.gridY = gridY;
        this.gridZ = 0;

        // Tile centerpoint tracking
        // currentTile reflects the integer-snapped tile the player's center is on
        this.currentTileX = Math.floor(gridX);
        this.currentTileY = Math.floor(gridY);

        // Callback: fires when the player moves to a new tile
        // Assign this to send updates to the server
        // e.g.: player.onTileChange = (x, y, z) => socket.emit('player:move', { x, y, z });
        this.onTileChange = null;

        // Configuration
        this.speed = 0.1; // Grid units per frame
        this.updateScale();
        
        // Head offset (adjust this to match your assets)
        this.headOffset = -300; // wtest -80; 

        // Initial screen position
        const pos = this.engine.toScreen(gridX, gridY, this.gridZ);

        // Body Sprite
        this.body = scene.add.sprite(pos.x, pos.y, bodyTexture);
        this.body.setOrigin(0.5, 1);
        this.body.setScale(this.scale);

        // Head Sprite
        this.head = scene.add.sprite(pos.x, pos.y, headTexture);
        this.head.setOrigin(0.5, 1);
        this.head.setScale(this.scale);

        // Alias for camera follow
        this.sprite = this.body; 

        this.setupAnimations(bodyTexture, headTexture);
        
        // Setup WASD keys
        this.keys = scene.input.keyboard.addKeys('W,A,S,D');

        this.syncSprites();
    }

    setupAnimations(bodyTexture, headTexture) {
        const anims = this.scene.anims;
        
        // Example slicing for 4 directions
        // Change these frame numbers based on your actual sprite sheet layout
        const animations = [
            { key: 'down', frames: [0, 1, 2, 3] },
            { key: 'left', frames: [4, 5, 6, 7] },
            { key: 'right', frames: [8, 9, 10, 11] },
            { key: 'up', frames: [12, 13, 14, 15] }
        ];

        animations.forEach(anim => {
            // Body animations
            if (!anims.exists(`walk-${anim.key}-body`)) {
                anims.create({
                    key: `walk-${anim.key}-body`,
                    frames: anims.generateFrameNumbers(bodyTexture, { frames: anim.frames }),
                    frameRate: 10,
                    repeat: -1
                });
            }

            // Head animations
            if (!anims.exists(`walk-${anim.key}-head`)) {
                anims.create({
                    key: `walk-${anim.key}-head`,
                    frames: anims.generateFrameNumbers(headTexture, { frames: anim.frames }),
                    frameRate: 10,
                    repeat: -1
                });
            }
        });
    }

    update() {
        let dx = 0;
        let dy = 0;

        // Map WASD to Isometric Directions
        // W = Up (-X, -Y)
        // S = Down (+X, +Y)
        // A = Left (-X, +Y)
        // D = Right (+X, -Y)
        
        if (this.keys.W.isDown) { dx -= 1; dy -= 1; }
        if (this.keys.S.isDown) { dx += 1; dy += 1; }
        if (this.keys.A.isDown) { dx -= 1; dy += 1; }
        if (this.keys.D.isDown) { dx += 1; dy -= 1; }

        if (dx !== 0 || dy !== 0) {
            // Normalize for consistent movement speed
            const length = Math.sqrt(dx * dx + dy * dy);
            this.gridX += (dx / length) * this.speed;
            this.gridY += (dy / length) * this.speed;

            // Determine orientation for animation
            let direction = 'down';
            if (dy < 0 && dx < 0) direction = 'up';
            else if (dy > 0 && dx > 0) direction = 'down';
            else if (dx < 0 && dy > 0) direction = 'left';
            else if (dx > 0 && dy < 0) direction = 'right';

            this.body.play(`walk-${direction}-body`, true);
            this.head.play(`walk-${direction}-head`, true);
        } else {
            this.body.stop();
            this.head.stop();
        }

        this.checkElevation();
        this.checkTileChange();
        this.syncSprites();
    }

    updateScale() {
        this.scale = this.engine.worldScale * 1.5; 
        this.headOffset = -50 * this.scale;
        
        if (this.body) this.body.setScale(this.scale);
        if (this.head) this.head.setScale(this.scale);
    }

    checkElevation() {
        if (this.scene.generator) {
            const groundZ = this.scene.generator.getElevation(this.gridX, this.gridY);
            // Stand on top of the stack (+1 unit elevation)
            this.gridZ = groundZ + 1;
        }
    }

    /**
     * Tile Centerpoint Tracking
     * Detects when the character's center crosses into a new tile.
     * Fires this.onTileChange(tileX, tileY, tileZ) which you can hook
     * up to a WebSocket to sync position with the server.
     * 
     * Example usage (in WorldScene.create, after creating the player):
     *   this.player.onTileChange = (x, y, z) => {
     *       this.socket.emit('player:tile', { x, y, z });
     *   };
     */
    checkTileChange() {
        const tileX = Math.floor(this.gridX);
        const tileY = Math.floor(this.gridY);
        const tileZ = this.gridZ;

        if (tileX !== this.currentTileX || tileY !== this.currentTileY) {
            this.currentTileX = tileX;
            this.currentTileY = tileY;

            // Log for development visibility
            console.log(`[Player] Moved to tile (${tileX}, ${tileY}, ${tileZ})`);

            // Fire server callback if assigned
            if (typeof this.onTileChange === 'function') {
                this.onTileChange(tileX, tileY, tileZ);
            }
        }
    }

    syncSprites() {
        // Convert grid coordinates to screen position
        const screenPos = this.engine.toScreen(this.gridX, this.gridY, this.gridZ);
        
        // Update positions
        this.body.x = screenPos.x;
        this.body.y = screenPos.y;
        this.head.x = screenPos.x;
        this.head.y = screenPos.y + this.headOffset;

        // Sync depth for proper occlusion
        // Ensure player is slightly above the tile depth
        this.body.setDepth(screenPos.depth + 5); 
        this.head.setDepth(screenPos.depth + 6);
    }
}
