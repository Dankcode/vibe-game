import * as THREE from 'three';

export class PlayerGirl2 {
    constructor(threeManager, inputManager, gridX, gridY) {
        this.threeManager = threeManager;
        this.inputManager = inputManager;
        this.gridX = gridX;
        this.gridY = gridY;
        this.gridZ = 0;
        this.speed = 0.05;
        this.currentDir = 's';
        this.flipX = false;

        this.loader = new THREE.TextureLoader();
        this.bodyTexture = this.loader.load('assets/sprites/body-2-walk.png');
        this.headTexture = this.loader.load('assets/sprites/head-2-walk.png');

        // Body Sprite
        this.bodyMaterial = new THREE.SpriteMaterial({ 
            map: this.bodyTexture,
            transparent: true
        });
        this.bodySprite = new THREE.Sprite(this.bodyMaterial);
        this.bodySprite.scale.set(1, 2, 1); // Aspect ratio ~1:2
        
        // Head Sprite
        this.headMaterial = new THREE.SpriteMaterial({ 
            map: this.headTexture,
            transparent: true
        });
        this.headSprite = new THREE.Sprite(this.headMaterial);
        this.headSprite.scale.set(1, 1, 1);

        this.group = new THREE.Group();
        this.group.add(this.bodySprite);
        this.group.add(this.headSprite);
        
        // Offset head
        this.headSprite.position.set(0, 0.8, 0.01);

        this.threeManager.addToEntities(this.group);
        this.syncSprites();
    }

    update() {
        let dx = 0;
        let dy = 0;
        if (this.inputManager.isKeyDown('KeyW')) { dx -= 1; dy -= 1; }
        if (this.inputManager.isKeyDown('KeyS')) { dx += 1; dy += 1; }
        if (this.inputManager.isKeyDown('KeyA')) { dx -= 1; dy += 1; }
        if (this.inputManager.isKeyDown('KeyD')) { dx += 1; dy -= 1; }

        if (dx !== 0 || dy !== 0) {
            const length = Math.sqrt(dx * dx + dy * dy);
            this.gridX += (dx / length) * this.speed;
            this.gridY += (dy / length) * this.speed;
            
            // Simple facing logic
            if (dx < 0) this.flipX = true;
            if (dx > 0) this.flipX = false;
        }

        this.checkElevation();
        this.syncSprites();
    }

    checkElevation() {
        // This will be called from the main loop where we have access to the generator
    }

    syncSprites() {
        // Mapping: (gridX, elevation, gridY) -> (x, y, z)
        const yPos = this.gridZ + 1.0; 
        this.group.position.set(this.gridX, yPos, this.gridY);
        
        // Handle flipping
        this.bodySprite.scale.x = this.flipX ? -1 : 1;
        this.headSprite.scale.x = this.flipX ? -1 : 1;
    }

    destroy() {
        this.threeManager.removeFromEntities(this.group);
        this.bodyMaterial.dispose();
        this.headMaterial.dispose();
        this.bodyTexture.dispose();
        this.headTexture.dispose();
    }
}
