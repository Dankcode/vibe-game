import * as THREE from 'three';

export class ThreeManager {
    constructor() {
        this.container = document.getElementById('three-game') || document.body;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xb9eaff);

        const { width, height } = this.getViewportSize();
        const aspect = width / height;
        this.camera = new THREE.PerspectiveCamera(38, aspect, 0.5, 1000);
        this.cameraOffset = new THREE.Vector3(14, 13, 24);
        this.cameraLookOffset = new THREE.Vector3(0, 0.8, 0);
        
        // Fixed low map-view angle. This keeps WSAD stable and makes block sides readable.
        this.camera.position.copy(this.cameraOffset);
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
        this.camera.aspect = width / height;
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

    updateCamera(targetPos) {
        const lookTarget = targetPos.clone().add(this.cameraLookOffset);
        this.camera.position.copy(targetPos).add(this.cameraOffset);
        this.camera.lookAt(lookTarget);
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
