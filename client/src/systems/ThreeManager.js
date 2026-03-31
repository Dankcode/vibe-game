import * as THREE from 'three';

export class ThreeManager {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x2a1f14);

        const aspect = window.innerWidth / window.innerHeight;
        const d = 20;
        this.camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
        
        // Isometric position: Equal distance on all axes
        this.camera.position.set(20, 20, 20); 
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        
        const container = document.getElementById('three-game');
        if (container) {
            container.appendChild(this.renderer.domElement);
        } else {
            document.body.appendChild(this.renderer.domElement);
        }
        
        this.renderer.domElement.id = 'three-canvas';

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 20, 10);
        this.scene.add(directionalLight);

        // Layers/Groups
        this.worldGroup = new THREE.Group();
        this.scene.add(this.worldGroup);

        this.entityGroup = new THREE.Group();
        this.scene.add(this.entityGroup);

        this.cameraZoom = 1.0;
        this.rotationIndex = 0; // 0=SE, 1=NE, 2=NW, 3=SW

        window.addEventListener('resize', () => this.onWindowResize());
    }

    onWindowResize() {
        const aspect = window.innerWidth / window.innerHeight;
        const d = 20;
        this.camera.left = -d * aspect;
        this.camera.right = d * aspect;
        this.camera.top = d;
        this.camera.bottom = -d;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    handleZoom(deltaY) {
        // Delta > 0 is scroll down (zoom out), Delta < 0 is scroll up (zoom in)
        const zoomDelta = deltaY > 0 ? -0.1 : 0.1;
        this.cameraZoom = Math.max(0.5, Math.min(3.0, this.cameraZoom + zoomDelta));
        
        this.camera.zoom = this.cameraZoom;
        this.camera.updateProjectionMatrix();
    }

    rotateCamera(direction) {
        // direction: 1 for clockwise, -1 for counter-clockwise
        this.rotationIndex = (this.rotationIndex + direction + 4) % 4;
    }

    updateCamera(targetPos) {
        const dist = 20;
        const offsets = [
            new THREE.Vector3( dist, dist,  dist), // 0
            new THREE.Vector3( dist, dist, -dist), // 1
            new THREE.Vector3(-dist, dist, -dist), // 2
            new THREE.Vector3(-dist, dist,  dist)  // 3
        ];
        
        const offset = offsets[this.rotationIndex];
        this.camera.position.copy(targetPos).add(offset);
        this.camera.lookAt(targetPos);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    addToWorld(object) {
        this.worldGroup.add(object);
    }

    addToEntities(object) {
        this.entityGroup.add(object);
    }

    removeFromWorld(object) {
        this.worldGroup.remove(object);
    }

    removeFromEntities(object) {
        this.entityGroup.remove(object);
    }
}
