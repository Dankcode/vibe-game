import Phaser from 'phaser';

export class Player {
    constructor(scene, gridX, gridY, bodyTexture, headTexture) {
        this.scene = scene;
        this.engine = scene.engine;
        
        this.gridX = gridX;
        this.gridY = gridY;
        this.gridZ = 0;

        this.targetGridX = gridX;
        this.targetGridY = gridY;
        this.targetGridZ = 0;

        this.currentTileX = Math.floor(gridX);
        this.currentTileY = Math.floor(gridY);

        this.onTileChange = null;
        this.speed = 4.0;
        this.lerpFactor = 0.15;
        this.updateScale();
        
        const pos = this.engine.toScreen(gridX, gridY, this.gridZ);

        this.body = scene.add.sprite(pos.x, pos.y, bodyTexture);
        this.body.setOrigin(0.5, 1);
        this.body.setScale(this.scale);

        this.head = scene.add.sprite(pos.x, pos.y, headTexture);
        this.head.setOrigin(0.5, 1);
        this.head.setScale(this.scale);

        this.sprite = this.body; 

        this.setupAnimations(bodyTexture, headTexture);
        this.keys = scene.input.keyboard.addKeys('W,A,S,D');
        this.syncSprites();
    }

    setupAnimations(bodyTexture, headTexture) {
        const anims = this.scene.anims;
        const animations = [
            { key: 'down', frames: [0, 1, 2, 3] },
            { key: 'left', frames: [4, 5, 6, 7] },
            { key: 'right', frames: [8, 9, 10, 11] },
            { key: 'up', frames: [12, 13, 14, 15] }
        ];

        animations.forEach(anim => {
            if (!anims.exists(`walk-${anim.key}-body`)) {
                anims.create({
                    key: `walk-${anim.key}-body`,
                    frames: anims.generateFrameNumbers(bodyTexture, { frames: anim.frames }),
                    frameRate: 10,
                    repeat: -1
                });
            }
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

    update(time, delta) {
        const dt = delta / 1000;
        let dx = 0;
        let dy = 0;

        if (this.keys.W.isDown) { dx -= 1; dy -= 1; }
        if (this.keys.S.isDown) { dx += 1; dy += 1; }
        if (this.keys.A.isDown) { dx -= 1; dy += 1; }
        if (this.keys.D.isDown) { dx += 1; dy -= 1; }

        if (dx !== 0 || dy !== 0) {
            const length = Math.sqrt(dx * dx + dy * dy);
            this.targetGridX += (dx / length) * this.speed * dt;
            this.targetGridY += (dy / length) * this.speed * dt;

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

        this.gridX += (this.targetGridX - this.gridX) * this.lerpFactor;
        this.gridY += (this.targetGridY - this.gridY) * this.lerpFactor;
        this.checkElevation();
        this.gridZ += (this.targetGridZ - this.gridZ) * this.lerpFactor;
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
            const groundZ = this.scene.generator.getElevation(this.targetGridX, this.targetGridY);
            this.targetGridZ = groundZ + 1;
        }
    }

    checkTileChange() {
        const tileX = Math.floor(this.gridX);
        const tileY = Math.floor(this.gridY);
        const tileZ = Math.round(this.gridZ);

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
        this.head.x = screenPos.x;
        this.head.y = screenPos.y + this.headOffset;
        this.body.setDepth(screenPos.depth + 5); 
        this.head.setDepth(screenPos.depth + 6);
    }
}
