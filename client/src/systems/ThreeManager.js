import * as THREE from 'three';

export class ThreeManager {
    constructor() {
        this.container = document.getElementById('three-game') || document.body;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xb9eaff);

        const { width, height } = this.getViewportSize();
        const aspect = width / height;
        const d = 16;
        this.camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
        this.cameraBaseSize = d;
        
        // Isometric position: Equal distance on all axes
        this.camera.position.set(20, 20, 20); 
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.08;
        this.container.appendChild(this.renderer.domElement);
        
        this.renderer.domElement.id = 'three-canvas';

        // Lighting
        const hemisphereLight = new THREE.HemisphereLight(0xe9fbff, 0xb7c889, 1.0);
        this.scene.add(hemisphereLight);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.42);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xfff3d0, 1.35);
        directionalLight.position.set(12, 26, 10);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.set(2048, 2048);
        directionalLight.shadow.camera.left = -34;
        directionalLight.shadow.camera.right = 34;
        directionalLight.shadow.camera.top = 34;
        directionalLight.shadow.camera.bottom = -34;
        directionalLight.shadow.camera.near = 1;
        directionalLight.shadow.camera.far = 80;
        directionalLight.shadow.bias = -0.00025;
        directionalLight.shadow.radius = 3;
        this.scene.add(directionalLight);

        // Layers/Groups
        this.worldGroup = new THREE.Group();
        this.scene.add(this.worldGroup);

        this.entityGroup = new THREE.Group();
        this.scene.add(this.entityGroup);

        this.cameraZoom = 1.0;
        this.rotationIndex = 0; // 0=SE, 1=NE, 2=NW, 3=SW
        
        this.raycaster = new THREE.Raycaster();
        this.pathLine = null;

        window.addEventListener('resize', () => this.onWindowResize());
    }

    getViewportSize() {
        const rect = this.container.getBoundingClientRect();
        return {
            width: Math.max(320, rect.width || window.innerWidth),
            height: Math.max(240, rect.height || window.innerHeight)
        };
    }

    getIntersectedTile(mouseNDC) {
        this.raycaster.setFromCamera(mouseNDC, this.camera);
        const intersects = this.raycaster.intersectObjects(this.worldGroup.children);
        if (intersects.length > 0) {
            return intersects[0].object.userData.tile; // Grab the exact tile defined in Tile.js
        }
        return null;
    }

    renderPathLine(pathNodes, worldGenerator) {
        if (this.pathLine) {
            this.scene.remove(this.pathLine);
            this.pathLine.geometry.dispose();
            this.pathLine.material.dispose();
            this.pathLine = null;
        }

        if (!pathNodes || pathNodes.length < 2) return;

        const points = [];
        for (const node of pathNodes) {
            const z = worldGenerator.getElevation(node.x, node.y) + 1.1; // float slightly above
            points.push(new THREE.Vector3(node.x, z, node.y)); 
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: 0x00ffcc, // Cyan glowing line
            transparent: true,
            opacity: 0.8,
            depthTest: false
        });

        this.pathLine = new THREE.Line(geometry, material);
        this.scene.add(this.pathLine);
    }

    onWindowResize() {
        const { width, height } = this.getViewportSize();
        const aspect = width / height;
        const d = this.cameraBaseSize;
        this.camera.left = -d * aspect;
        this.camera.right = d * aspect;
        this.camera.top = d;
        this.camera.bottom = -d;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
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
