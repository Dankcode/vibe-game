import * as THREE from 'three';

const SPRITE_SHEET = 'assets/characters/lpc-human-male/Walk.png';
const FRAME_COLUMNS = 8;
const FRAME_ROWS = 4;
const FRAME_DURATION = 0.11;
const DIRECTION_ROWS = {
    south: 0,
    west: 1,
    east: 2,
    north: 3
};
const CAMERA_FORWARD = new THREE.Vector3();
const CAMERA_RIGHT = new THREE.Vector3();
const MOVE_VECTOR = new THREE.Vector2();

export class PlayerAvatar {
    static texturePromise = null;
    static geometry = new THREE.PlaneGeometry(1.18, 2.0);
    static shadowGeometry = new THREE.CircleGeometry(0.32, 20);
    static shadowMaterial = new THREE.MeshBasicMaterial({
        color: 0x050705,
        transparent: true,
        opacity: 0.28,
        depthWrite: false
    });

    constructor(threeManager, inputManager, worldGenerator, gridX, gridY, options = {}) {
        this.threeManager = threeManager;
        this.inputManager = inputManager;
        this.worldGenerator = worldGenerator;
        this.isLocal = options.isLocal ?? true;
        this.userId = options.userId || 'player';
        this.gridX = gridX;
        this.gridY = gridY;
        this.gridZ = this.worldGenerator.getElevation(gridX, gridY);
        this.visualX = this.gridX;
        this.visualY = this.gridY;
        this.visualZ = this.gridZ;
        this.targetX = this.gridX;
        this.targetY = this.gridY;
        this.targetZ = this.gridZ;
        this.speed = 3.2;
        this.currentPath = [];
        this.direction = 'south';
        this.frame = 0;
        this.frameTimer = 0;
        this.isMoving = false;

        this.group = new THREE.Group();
        this.shadow = new THREE.Mesh(PlayerAvatar.shadowGeometry, PlayerAvatar.shadowMaterial);
        this.shadow.rotation.x = -Math.PI / 2;
        this.shadow.position.y = 0.02;
        this.group.add(this.shadow);

        this.material = new THREE.MeshBasicMaterial({
            transparent: true,
            alphaTest: 0.08,
            depthWrite: false
        });
        this.mesh = new THREE.Mesh(PlayerAvatar.geometry, this.material);
        this.mesh.position.y = 1.0;
        this.group.add(this.mesh);

        this.threeManager.addToEntities(this.group);
        this.loadTexture();
        this.syncModel();
    }

    async loadTexture() {
        const sourceTexture = await PlayerAvatar.getSourceTexture();
        this.texture = sourceTexture.clone();
        this.texture.needsUpdate = true;
        this.texture.repeat.set(1 / FRAME_COLUMNS, 1 / FRAME_ROWS);
        this.material.map = this.texture;
        this.material.needsUpdate = true;
        this.updateFrame(0);
    }

    static getSourceTexture() {
        if (!PlayerAvatar.texturePromise) {
            PlayerAvatar.texturePromise = new Promise((resolve, reject) => {
                new THREE.TextureLoader().load(
                    SPRITE_SHEET,
                    (texture) => {
                        texture.colorSpace = THREE.SRGBColorSpace;
                        texture.magFilter = THREE.NearestFilter;
                        texture.minFilter = THREE.NearestFilter;
                        resolve(texture);
                    },
                    undefined,
                    reject
                );
            });
        }
        return PlayerAvatar.texturePromise;
    }

    setPath(path) {
        this.currentPath = [...path];
        if (this.currentPath.length > 0) {
            const first = this.currentPath[0];
            if (Math.abs(first.x - this.gridX) < 0.1 && Math.abs(first.y - this.gridY) < 0.1) {
                this.currentPath.shift();
            }
        }
    }

    setRemoteTarget(centerX, centerY, centerZ) {
        this.targetX = centerX;
        this.targetY = centerY;
        this.targetZ = centerZ;
    }

    update(deltaSeconds = 1 / 60) {
        if (this.isLocal) {
            this.updateLocal(deltaSeconds);
        } else {
            this.updateRemote(deltaSeconds);
        }
        this.updateAnimation(deltaSeconds);
        this.syncModel();
    }

    updateLocal(deltaSeconds) {
        const stepSize = this.speed * Math.min(deltaSeconds, 0.05);
        this.isMoving = false;

        if (this.currentPath.length > 0) {
            const target = this.currentPath[0];
            this.moveToward(target.x, target.y, stepSize);
            if (Math.abs(target.x - this.gridX) < 0.001 && Math.abs(target.y - this.gridY) < 0.001) {
                this.currentPath.shift();
            }
            return;
        }

        const sideInput = (this.inputManager.isKeyDown('KeyD') ? 1 : 0) -
            (this.inputManager.isKeyDown('KeyA') ? 1 : 0);
        const forwardInput = (this.inputManager.isKeyDown('KeyW') ? 1 : 0) -
            (this.inputManager.isKeyDown('KeyS') ? 1 : 0);

        if (sideInput !== 0 || forwardInput !== 0) {
            const { mx, my } = this.getCameraRelativeMovement(sideInput, forwardInput);
            const nextX = this.gridX + mx * stepSize;
            const nextY = this.gridY + my * stepSize;
            const movedX = this.tryMove(nextX, this.gridY, mx, 0);
            const movedY = this.tryMove(this.gridX, nextY, 0, my);
            if (!movedX && !movedY) {
                this.tryMove(nextX, nextY, mx, my);
            }
        }
    }

    getCameraRelativeMovement(sideInput, forwardInput) {
        CAMERA_FORWARD.set(0, 0, -1).applyQuaternion(this.threeManager.camera.quaternion);
        CAMERA_FORWARD.y = 0;
        CAMERA_FORWARD.normalize();

        CAMERA_RIGHT.set(1, 0, 0).applyQuaternion(this.threeManager.camera.quaternion);
        CAMERA_RIGHT.y = 0;
        CAMERA_RIGHT.normalize();

        MOVE_VECTOR.set(
            CAMERA_RIGHT.x * sideInput + CAMERA_FORWARD.x * forwardInput,
            CAMERA_RIGHT.z * sideInput + CAMERA_FORWARD.z * forwardInput
        );

        if (MOVE_VECTOR.lengthSq() > 1) MOVE_VECTOR.normalize();
        return { mx: MOVE_VECTOR.x, my: MOVE_VECTOR.y };
    }

    moveToward(targetX, targetY, stepSize) {
        const dx = targetX - this.gridX;
        const dy = targetY - this.gridY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= stepSize) {
            this.tryMove(targetX, targetY, dx, dy);
        } else {
            this.tryMove(
                this.gridX + (dx / distance) * stepSize,
                this.gridY + (dy / distance) * stepSize,
                dx,
                dy
            );
        }
    }

    tryMove(nextX, nextY, dx, dy) {
        const fromX = Math.round(this.gridX);
        const fromY = Math.round(this.gridY);
        const repX = Math.round(nextX);
        const repY = Math.round(nextY);
        const isDiagonal = fromX !== repX && fromY !== repY;
        const nextElevation = this.worldGenerator.getElevation(repX, repY);

        if (this.worldGenerator.canMoveBetween(fromX, fromY, repX, repY, isDiagonal)) {
            this.gridX = nextX;
            this.gridY = nextY;
            this.gridZ = nextElevation;
            this.targetX = nextX;
            this.targetY = nextY;
            this.targetZ = nextElevation;
            this.setDirection(dx, dy);
            this.isMoving = true;
            return true;
        }
        return false;
    }

    updateRemote(deltaSeconds) {
        const smoothing = Math.min(1, deltaSeconds * 12);
        const dx = this.targetX - this.gridX;
        const dy = this.targetY - this.gridY;
        this.gridX += dx * smoothing;
        this.gridY += dy * smoothing;
        this.gridZ += (this.targetZ - this.gridZ) * smoothing;
        this.isMoving = Math.sqrt(dx * dx + dy * dy) > 0.01;
        if (this.isMoving) this.setDirection(dx, dy);
    }

    setDirection(dx, dy) {
        if (Math.abs(dx) > Math.abs(dy)) {
            this.direction = dx > 0 ? 'east' : 'west';
        } else {
            this.direction = dy > 0 ? 'south' : 'north';
        }
    }

    updateAnimation(deltaSeconds) {
        if (this.isMoving) {
            this.frameTimer += deltaSeconds;
            if (this.frameTimer >= FRAME_DURATION) {
                this.frameTimer = 0;
                this.frame = (this.frame + 1) % FRAME_COLUMNS;
            }
        } else {
            this.frame = 0;
            this.frameTimer = 0;
        }
        this.updateFrame(this.frame);
    }

    updateFrame(frame) {
        if (!this.texture) return;
        const row = DIRECTION_ROWS[this.direction] ?? DIRECTION_ROWS.south;
        this.texture.offset.x = frame / FRAME_COLUMNS;
        this.texture.offset.y = 1 - ((row + 1) / FRAME_ROWS);
    }

    syncModel() {
        this.visualX += (this.gridX - this.visualX) * 0.45;
        this.visualY += (this.gridY - this.visualY) * 0.45;
        this.visualZ += (this.gridZ - this.visualZ) * 0.2;
        this.group.position.set(this.visualX, this.visualZ + 0.02, this.visualY);
        this.mesh.quaternion.copy(this.threeManager.camera.quaternion);
    }

    getCenterPayload() {
        return {
            centerX: this.gridX,
            centerY: this.gridY,
            centerZ: this.gridZ
        };
    }

    applyAuthoritativeCenter(centerX, centerY, centerZ, tileX, tileY, tileZ) {
        const snapDistance = Math.sqrt((centerX - this.gridX) ** 2 + (centerY - this.gridY) ** 2);
        this.gridX = centerX;
        this.gridY = centerY;
        this.gridZ = centerZ ?? tileZ;
        this.targetX = centerX;
        this.targetY = centerY;
        this.targetZ = centerZ ?? tileZ;
        if (Number.isFinite(tileX) && Number.isFinite(tileY)) {
            this.gridZ = tileZ;
        }
        if (snapDistance > 0.75) {
            this.visualX = this.gridX;
            this.visualY = this.gridY;
            this.visualZ = this.gridZ;
        }
    }

    destroy() {
        this.threeManager.removeFromEntities(this.group);
        if (this.texture) this.texture.dispose();
        this.material.dispose();
    }
}
