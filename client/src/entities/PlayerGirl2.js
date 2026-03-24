import Phaser from 'phaser';

export class PlayerGirl2 {
    constructor(scene, gridX, gridY, bodyAtlasKey, headAtlasKey) {
        this.scene = scene;
        this.engine = scene.engine;
        this.gridX = gridX;
        this.gridY = gridY;
        this.gridZ = 0;
        this.currentTileX = Math.floor(gridX);
        this.currentTileY = Math.floor(gridY);
        this.onTileChange = null;
        this.speed = 0.1; 
        this.updateScale();
        this.bodyAtlasKey = bodyAtlasKey;
        this.headAtlasKey = headAtlasKey;
        this.currentDir = 's';
        this.flipX = false;
        this.headNudgeX = 0;
        this.headNudgeY = 0;

        const pos = this.engine.toScreen(gridX, gridY, this.gridZ);
        this.body = scene.add.sprite(pos.x, pos.y, bodyAtlasKey, this.getBodyFrame(this.currentDir, 0));
        this.body.setOrigin(0.5, 1);
        this.body.setScale(this.scale);
        this.head = scene.add.sprite(pos.x, pos.y, headAtlasKey, this.getHeadFrame(this.currentDir));
        this.head.setOrigin(0.5, 1);
        this.head.setScale(this.scale);
        this.sprite = this.body;

        this.setupAnimations(bodyAtlasKey);
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
        if (this.keys.W.isDown) { dx -= 1; dy -= 1; }
        if (this.keys.S.isDown) { dx += 1; dy += 1; }
        if (this.keys.A.isDown) { dx -= 1; dy += 1; }
        if (this.keys.D.isDown) { dx += 1; dy -= 1; }

        if (dx !== 0 || dy !== 0) {
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
        const w = this.keys.W.isDown;
        const a = this.keys.A.isDown;
        const s = this.keys.S.isDown;
        const d = this.keys.D.isDown;

        if (w && a) return { x: right, y: down }; 
        if (w && d) return { x: left, y: down };  
        if (s && a) return { x: right, y: up };   
        if (s && d) return { x: left, y: up };    
        if (facing.dir === 'n') return { x: 0, y: up }; 
        if (facing.dir === 's') return { x: 0, y: up }; 
        if (facing.dir === 'w' && !facing.flipX) return { x: right, y: 0 }; 
        if (facing.dir === 'w' && facing.flipX) return { x: left, y: 0 };   
        return { x: 0, y: 0 };
    }

    resolveFacingFromKeys() {
        const w = this.keys.W.isDown;
        const a = this.keys.A.isDown;
        const s = this.keys.S.isDown;
        const d = this.keys.D.isDown;
        if (w && a) return { dir: 'nw', flipX: false };
        if (w && d) return { dir: 'nw', flipX: true };
        if (s && a) return { dir: 'sw', flipX: false };
        if (s && d) return { dir: 'sw', flipX: true };
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
            if (typeof this.onTileChange === 'function') {
                this.onTileChange(tileX, tileY, tileZ);
            }
        }
    }

    syncSprites() {
        const screenPos = this.engine.toScreen(this.gridX, this.gridY, this.gridZ);
        this.body.x = screenPos.x;
        this.body.y = screenPos.y;
        this.head.x = screenPos.x + this.headNudgeX;
        this.head.y = screenPos.y + this.headOffset + this.headNudgeY;
        this.body.setDepth(screenPos.depth + 5);
        this.head.setDepth(screenPos.depth + 6);
    }
}
