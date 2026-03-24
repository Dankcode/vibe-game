export class PlayerGirl2 {
    constructor(scene, gridX, gridY, bodyAtlasKey, headAtlasKey) {
        this.scene = scene;
        this.engine = scene.engine;

        // Initial grid position (isometric coordinates)
        this.gridX = gridX;
        this.gridY = gridY;
        this.gridZ = 0;

        // Tile centerpoint tracking
        this.currentTileX = Math.floor(gridX);
        this.currentTileY = Math.floor(gridY);

        // Callback: fires when the player moves to a new tile
        this.onTileChange = null;

        // Configuration
        this.speed = 0.1; // Grid units per frame
        this.updateScale();

        // Head offset (adjust this to match your assets)
        this.headOffset = -180;

        this.bodyAtlasKey = bodyAtlasKey;
        this.headAtlasKey = headAtlasKey;

        this.currentDir = 's';
        this.flipX = false;
        this.headNudgeX = 0;
        this.headNudgeY = 0;

        // Initial screen position
        const pos = this.engine.toScreen(gridX, gridY, this.gridZ);

        // Body Sprite (atlas frame names come from TexturePacker JSON)
        this.body = scene.add.sprite(pos.x, pos.y, bodyAtlasKey, this.getBodyFrame(this.currentDir, 0));
        this.body.setOrigin(0.5, 1);
        this.body.setScale(this.scale);

        // Head Sprite (single-frame directions)
        this.head = scene.add.sprite(pos.x, pos.y, headAtlasKey, this.getHeadFrame(this.currentDir));
        this.head.setOrigin(0.5, 1);
        this.head.setScale(this.scale);

        // Alias for camera follow
        this.sprite = this.body;

        this.setupAnimations(bodyAtlasKey);

        // Setup WASD keys
        this.keys = scene.input.keyboard.addKeys('W,A,S,D');

        this.syncSprites();
    }

    getBodyFrame(dir, index) {
        return `body-walk-dir-${dir}-${index}.png`;
    }

    getHeadFrame(dir) {
        return `head-gp-2-dir-${dir}.png`;
    }

    setupAnimations(bodyAtlasKey) {
        const anims = this.scene.anims;
        const dirs = ['n', 'nw', 'w', 'sw', 's'];

        dirs.forEach(dir => {
            const key = `girl2-walk-${dir}-body`;
            if (anims.exists(key)) return;

            anims.create({
                key,
                frames: anims.generateFrameNames(bodyAtlasKey, {
                    prefix: `body-walk-dir-${dir}-`,
                    start: 0,
                    end: 7,
                    suffix: '.png'
                }),
                frameRate: 10,
                repeat: -1
            });
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
        if (this.keys.W.isDown) {
            dx -= 1;
            dy -= 1;
        }
        if (this.keys.S.isDown) {
            dx += 1;
            dy += 1;
        }
        if (this.keys.A.isDown) {
            dx -= 1;
            dy += 1;
        }
        if (this.keys.D.isDown) {
            dx += 1;
            dy -= 1;
        }

        if (dx !== 0 || dy !== 0) {
            // Normalize for consistent movement speed
            const length = Math.sqrt(dx * dx + dy * dy);
            this.gridX += (dx / length) * this.speed;
            this.gridY += (dy / length) * this.speed;

            const facing = this.resolveFacingFromKeys();
            if (facing) {
                this.currentDir = facing.dir;
                this.flipX = facing.flipX;
                const nudge = this.getHeadNudgeFromFacing(facing);
                this.headNudgeX = nudge.x;
                this.headNudgeY = nudge.y;
            }

            this.body.setFlipX(this.flipX);
            this.head.setFlipX(this.flipX);

            this.body.play(`girl2-walk-${this.currentDir}-body`, true);
            this.head.setFrame(this.getHeadFrame(this.currentDir));
        } else {
            this.body.stop();
            this.headNudgeX = 0;
            this.headNudgeY = 0;
        }

        this.checkElevation();
        this.checkTileChange();
        this.syncSprites();
    }

    getHeadNudgeFromFacing(facing) {
        const amount = 2 * this.scale;
        const up = -amount;
        const down = amount;
        const left = -amount;
        const right = amount;

        // 微调只在走动时使用：用当前按键组合决定头部偏移
        const w = this.keys.W.isDown;
        const a = this.keys.A.isDown;
        const s = this.keys.S.isDown;
        const d = this.keys.D.isDown;

        if (w && a) return { x: right, y: down }; // wa：右下
        if (w && d) return { x: left, y: down };  // wd：左下
        if (s && a) return { x: right, y: up };   // sa：右上
        if (s && d) return { x: left, y: up };    // sd：左上

        if (facing.dir === 'n') return { x: 0, y: up }; // w：上
        if (facing.dir === 's') return { x: 0, y: up }; // s：上
        if (facing.dir === 'w' && !facing.flipX) return { x: right, y: 0 }; // a：右
        if (facing.dir === 'w' && facing.flipX) return { x: left, y: 0 };   // d：左

        return { x: 0, y: 0 };
    }

    resolveFacingFromKeys() {
        const w = this.keys.W.isDown;
        const a = this.keys.A.isDown;
        const s = this.keys.S.isDown;
        const d = this.keys.D.isDown;

        // 组合键优先（按你的素材方向约定）
        if (w && a) return { dir: 'nw', flipX: false };
        if (w && d) return { dir: 'nw', flipX: true };
        if (s && a) return { dir: 'sw', flipX: false };
        if (s && d) return { dir: 'sw', flipX: true };

        // 单键
        if (w) return { dir: 'n', flipX: false };
        if (s) return { dir: 's', flipX: false };
        if (a) return { dir: 'w', flipX: false };
        if (d) return { dir: 'w', flipX: true };

        return null;
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

    checkTileChange() {
        const tileX = Math.floor(this.gridX);
        const tileY = Math.floor(this.gridY);
        const tileZ = this.gridZ;

        if (tileX !== this.currentTileX || tileY !== this.currentTileY) {
            this.currentTileX = tileX;
            this.currentTileY = tileY;

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
        this.head.x = screenPos.x + this.headNudgeX;
        this.head.y = screenPos.y + this.headOffset + this.headNudgeY;

        // Sync depth for proper occlusion
        this.body.setDepth(screenPos.depth + 5);
        this.head.setDepth(screenPos.depth + 6);
    }
}
