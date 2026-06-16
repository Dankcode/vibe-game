import * as THREE from 'three';

export class MeadowHare {
    constructor(threeManager, worldGenerator, spawn) {
        this.threeManager = threeManager;
        this.worldGenerator = worldGenerator;
        this.id = spawn.id;
        this.species = spawn.species;
        this.habitat = spawn.habitat;
        this.homeX = spawn.x;
        this.homeY = spawn.y;
        this.leashRadius = spawn.leashRadius || 4;
        this.gridX = spawn.x;
        this.gridY = spawn.y;
        this.gridZ = this.worldGenerator.getElevation(spawn.x, spawn.y);
        this.visualZ = this.gridZ;
        this.speed = 1.35;
        this.idleTimer = 0.4;
        this.target = null;
        this.bobTime = Math.random() * Math.PI * 2;

        this.group = this.createModel();
        this.threeManager.addToEntities(this.group);
        this.syncModel();
    }

    createModel() {
        const group = new THREE.Group();
        const fur = new THREE.MeshStandardMaterial({ color: 0xcaa16f, roughness: 0.8 });
        const belly = new THREE.MeshStandardMaterial({ color: 0xf5e4c8, roughness: 0.85 });
        const dark = new THREE.MeshStandardMaterial({ color: 0x503629, roughness: 0.75 });

        const body = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 12), fur);
        body.scale.set(1.25, 0.72, 0.82);
        body.position.set(0, 0.22, 0);
        group.add(body);

        const chest = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 8), belly);
        chest.scale.set(1.1, 0.7, 0.55);
        chest.position.set(0.15, 0.2, 0.02);
        group.add(chest);

        const head = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 10), fur);
        head.position.set(0.33, 0.31, 0);
        group.add(head);

        const earGeometry = new THREE.ConeGeometry(0.045, 0.32, 8);
        const leftEar = new THREE.Mesh(earGeometry, fur);
        leftEar.position.set(0.34, 0.56, -0.07);
        leftEar.rotation.z = -0.28;
        group.add(leftEar);

        const rightEar = new THREE.Mesh(earGeometry, fur);
        rightEar.position.set(0.34, 0.56, 0.07);
        rightEar.rotation.z = -0.18;
        group.add(rightEar);

        const nose = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), dark);
        nose.position.set(0.48, 0.31, 0);
        group.add(nose);

        const tail = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), belly);
        tail.position.set(-0.33, 0.26, 0);
        group.add(tail);

        group.scale.set(0.8, 0.8, 0.8);
        group.userData.wildlife = this;
        return group;
    }

    update(deltaSeconds) {
        this.bobTime += deltaSeconds * 5;

        if (!this.target) {
            this.idleTimer -= deltaSeconds;
            if (this.idleTimer <= 0) {
                this.target = this.pickTarget();
                this.idleTimer = 1.2 + Math.random() * 2.4;
            }
        }

        if (this.target) {
            const dx = this.target.x - this.gridX;
            const dy = this.target.y - this.gridY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const step = this.speed * Math.min(deltaSeconds, 0.05);

            if (distance <= step) {
                this.gridX = this.target.x;
                this.gridY = this.target.y;
                this.gridZ = this.worldGenerator.getElevation(this.gridX, this.gridY);
                this.target = null;
            } else {
                this.gridX += (dx / distance) * step;
                this.gridY += (dy / distance) * step;
                const tileX = Math.round(this.gridX);
                const tileY = Math.round(this.gridY);
                this.gridZ = this.worldGenerator.getElevation(tileX, tileY);
                this.group.rotation.y = dx < 0 ? Math.PI : 0;
            }
        }

        this.syncModel();
    }

    pickTarget() {
        const candidates = [];
        for (let x = this.homeX - this.leashRadius; x <= this.homeX + this.leashRadius; x++) {
            for (let y = this.homeY - this.leashRadius; y <= this.homeY + this.leashRadius; y++) {
                const distance = Math.sqrt((x - this.homeX) ** 2 + (y - this.homeY) ** 2);
                if (distance > this.leashRadius) continue;
                if (!this.worldGenerator.supportsHabitat(x, y, this.habitat)) continue;
                candidates.push({ x, y });
            }
        }
        if (candidates.length === 0) return null;
        return candidates[Math.floor(Math.random() * candidates.length)];
    }

    syncModel() {
        this.visualZ += (this.gridZ - this.visualZ) * 0.18;
        const hop = this.target ? Math.abs(Math.sin(this.bobTime)) * 0.08 : 0;
        this.group.position.set(this.gridX, this.visualZ + 1.05 + hop, this.gridY);
    }

    destroy() {
        this.group.traverse((object) => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) object.material.dispose();
        });
        this.threeManager.removeFromEntities(this.group);
    }
}
