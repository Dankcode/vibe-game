import * as THREE from 'three';

export class ThreeManager {
    constructor() {
        this.container = document.getElementById('three-game') || document.body;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x74d7f3);
        // Fade the streaming boundary before partial WFC structures become
        // readable as floating clutter at the edge of the active radius.
        this.scene.fog = new THREE.FogExp2(0xbfefff, 0.0085);
        new THREE.TextureLoader().load('/assets/world-sky.png', (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            this.skyTexture = texture;
            this.updateSkyTextureCrop();
            this.scene.background = texture;
        });

        const { width, height } = this.getViewportSize();
        const aspect = width / height;
        this.camera = new THREE.PerspectiveCamera(34, aspect, 0.5, 1000);
        this.cameraOffset = new THREE.Vector3(21, 22, 31);
        this.cameraLookOffset = new THREE.Vector3(0, 1.35, -5.5);
        
        // Fixed low map-view angle. This keeps WSAD stable and makes block sides readable.
        this.camera.position.copy(this.cameraOffset);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({
            antialias: window.devicePixelRatio <= 1.25,
            alpha: false,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;
        this.container.appendChild(this.renderer.domElement);
        
        this.renderer.domElement.id = 'three-canvas';

        // Lighting
        this.hemisphereLight = new THREE.HemisphereLight(0xe9fbff, 0x456b35, 0.88);
        this.scene.add(this.hemisphereLight);

        this.ambientLight = new THREE.AmbientLight(0xdff7ff, 0.15);
        this.scene.add(this.ambientLight);

        this.directionalLight = new THREE.DirectionalLight(0xffefbd, 1.85);
        this.directionalLight.position.set(16, 30, 12);
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.mapSize.set(1024, 1024);
        this.directionalLight.shadow.camera.left = -34;
        this.directionalLight.shadow.camera.right = 34;
        this.directionalLight.shadow.camera.top = 34;
        this.directionalLight.shadow.camera.bottom = -34;
        this.directionalLight.shadow.camera.near = 1;
        this.directionalLight.shadow.camera.far = 80;
        this.directionalLight.shadow.bias = -0.00025;
        this.directionalLight.shadow.radius = 3;
        this.scene.add(this.directionalLight);

        const skyFill = new THREE.DirectionalLight(0x8fdcff, 0.22);
        skyFill.position.set(-18, 18, -22);
        this.scene.add(skyFill);

        const sunsetRim = new THREE.DirectionalLight(0xffa85b, 0.24);
        sunsetRim.position.set(-10, 12, 20);
        this.scene.add(sunsetRim);

        // Layers/Groups
        this.worldGroup = new THREE.Group();
        this.scene.add(this.worldGroup);

        this.entityGroup = new THREE.Group();
        this.scene.add(this.entityGroup);

        this.playerLODRadius = 32;
        this.atmosphereLODRadius = null;
        this.createAtmosphericDepth();

        this.cameraZoom = 0.94;
        this.camera.zoom = this.cameraZoom;
        this.camera.updateProjectionMatrix();
        
        this.raycaster = new THREE.Raycaster();
        this.pathLine = null;
        this.pathLineSourcePoints = [];
        this.pathLineVersion = 0;
        this.lastPathLODKey = null;
        this.lastPathLODCounts = { totalSegments: 0, visibleSegments: 0 };

        window.addEventListener('resize', () => this.onWindowResize());
    }

    setWorldTheme(theme = {}) {
        const paletteId = String(theme.paletteId || theme.id || 'meadow');
        const skyColor = new THREE.Color(theme.skyColor || 0x86dcff);
        const fogColor = new THREE.Color(theme.fogColor || 0xd3f3df);
        const groundColors = {
            desert: 0x9a6737,
            savanna: 0x65783d,
            coast: 0x376f78,
            jungle: 0x285c48,
            wetland: 0x355f57,
            taiga: 0x3d5d52,
            tundra: 0x617483,
            alpine: 0x57677d,
            crystal: 0x514779,
            forest: 0x315a3f,
            meadow: 0x456b35
        };
        this.renderer.setClearColor(skyColor, 1);
        if (!this.skyTexture) this.scene.background = skyColor;
        if (this.scene.fog?.color) this.scene.fog.color.copy(fogColor);
        if (this.scene.fog?.isFogExp2) {
            this.scene.fog.density = ['tundra', 'alpine', 'crystal'].includes(paletteId) ? 0.0105 : 0.0085;
        }
        this.hemisphereLight?.color.set(theme.skyColor || 0xe9fbff);
        this.hemisphereLight?.groundColor.set(groundColors[paletteId] || groundColors.meadow);
        this.directionalLight?.color.set(['desert', 'savanna'].includes(paletteId) ? 0xffe2a0 : 0xffefbd);
        this.renderer.toneMappingExposure = paletteId === 'crystal' ? 1.08 : 1.0;
        this.container.dataset.worldPalette = paletteId;
        if (/^#[0-9a-f]{6}$/i.test(theme.stateColor || '')) {
            document.documentElement.style.setProperty('--accent', theme.stateColor);
        }
        if (/^#[0-9a-f]{6}$/i.test(theme.cultureColor || '')) {
            document.documentElement.style.setProperty('--world-secondary', theme.cultureColor);
            document.documentElement.style.setProperty('--panel-border', `${theme.cultureColor}78`);
        }
    }

    drawRoundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + width, y, x + width, y + height, radius);
        ctx.arcTo(x + width, y + height, x, y + height, radius);
        ctx.arcTo(x, y + height, x, y, radius);
        ctx.arcTo(x, y, x + width, y, radius);
        ctx.closePath();
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
        const visibleTileMeshes = this.worldGroup.children.filter((object) =>
            ThreeManager.isLODSelectableTileObject(object)
        );
        const intersects = this.raycaster.intersectObjects(visibleTileMeshes, false);
        return intersects[0]?.object?.userData?.tile || null;
    }

    static isLODSelectableTileObject(object) {
        const tile = object?.userData?.tile;
        return Boolean(
            object?.visible &&
            tile &&
            tile.visibleByRange !== false &&
            tile.hiddenByObstruction !== true
        );
    }

    renderPathLine(pathNodes, worldGenerator) {
        if (this.pathLine) {
            this.scene.remove(this.pathLine);
            this.pathLine.geometry.dispose();
            this.pathLine.material.dispose();
            this.pathLine = null;
        }
        this.pathLineSourcePoints = [];
        this.pathLineVersion = (this.pathLineVersion || 0) + 1;
        this.lastPathLODKey = null;
        this.lastPathLODCounts = { totalSegments: 0, visibleSegments: 0 };

        if (!pathNodes || pathNodes.length < 2) return;

        for (const node of pathNodes) {
            const z = (Number.isFinite(node.z) ? node.z : worldGenerator.getElevation(node.x, node.y)) + 1.1; // float slightly above
            this.pathLineSourcePoints.push(new THREE.Vector3(node.x, z, node.y));
        }

        const geometry = new THREE.BufferGeometry();
        const material = new THREE.LineBasicMaterial({
            color: 0x00ffcc, // Cyan glowing line
            transparent: true,
            opacity: 0.8,
            depthTest: false
        });

        this.pathLine = new THREE.LineSegments(geometry, material);
        this.pathLine.visible = false;
        this.scene.add(this.pathLine);
    }

    updatePathLineLOD(centerX, centerY, radius, worldGenerator) {
        if (!this.pathLine || this.pathLineSourcePoints.length < 2) {
            return { totalSegments: 0, visibleSegments: 0 };
        }
        const lodCenterX = Math.round(centerX);
        const lodCenterY = Math.round(centerY);
        const lodKey = [
            this.pathLineVersion || 0,
            worldGenerator?.lodContentVersion || 0,
            lodCenterX,
            lodCenterY,
            radius
        ].join(':');
        if (this.lastPathLODKey === lodKey) return this.lastPathLODCounts;
        const points = [];
        let totalSegments = 0;
        let visibleSegments = 0;
        for (let index = 1; index < this.pathLineSourcePoints.length; index += 1) {
            totalSegments += 1;
            const previous = this.pathLineSourcePoints[index - 1];
            const current = this.pathLineSourcePoints[index];
            const previousVisible = worldGenerator.isObjectInsidePlayerLOD(
                previous.x,
                previous.z,
                0,
                lodCenterX,
                lodCenterY,
                radius
            );
            const currentVisible = worldGenerator.isObjectInsidePlayerLOD(
                current.x,
                current.z,
                0,
                lodCenterX,
                lodCenterY,
                radius
            );
            if (!previousVisible || !currentVisible) continue;
            points.push(previous, current);
            visibleSegments += 1;
        }
        this.pathLine.geometry.dispose();
        this.pathLine.geometry = new THREE.BufferGeometry().setFromPoints(points);
        this.pathLine.visible = visibleSegments > 0;
        this.lastPathLODKey = lodKey;
        this.lastPathLODCounts = { totalSegments, visibleSegments };
        return this.lastPathLODCounts;
    }

    updatePlayerLOD(centerX, centerY, radius, worldGenerator) {
        const safeRadius = Math.max(0, Number(radius) || 0);
        this.playerLODRadius = safeRadius;
        if (this.atmosphereGroup) {
            this.atmosphereGroup.position.x = centerX;
            this.atmosphereGroup.position.z = centerY;
        }
        if (this.atmosphereLODRadius !== safeRadius) {
            this.updateAtmosphericDepthLOD(safeRadius);
        }
        return this.updatePathLineLOD(centerX, centerY, safeRadius, worldGenerator);
    }

    onWindowResize() {
        const { width, height } = this.getViewportSize();
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        this.updateSkyTextureCrop();
    }

    updateSkyTextureCrop() {
        const texture = this.skyTexture;
        const imageWidth = Number(texture?.image?.width);
        const imageHeight = Number(texture?.image?.height);
        if (!texture || !imageWidth || !imageHeight) return;
        const { width, height } = this.getViewportSize();
        const viewportAspect = width / Math.max(1, height);
        const imageAspect = imageWidth / imageHeight;
        texture.repeat.set(1, 1);
        texture.offset.set(0, 0);
        if (viewportAspect < imageAspect) {
            texture.repeat.x = viewportAspect / imageAspect;
            texture.offset.x = (1 - texture.repeat.x) / 2;
        } else if (viewportAspect > imageAspect) {
            texture.repeat.y = imageAspect / viewportAspect;
            texture.offset.y = (1 - texture.repeat.y) / 2;
        }
        texture.needsUpdate = true;
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
        if (this.atmosphereGroup) {
            this.atmosphereGroup.position.x = targetPos.x;
            this.atmosphereGroup.position.z = targetPos.z;
        }
    }

    render() {
        if (this.depthMotes) {
            const elapsed = performance.now() * 0.00008;
            this.depthMotes.rotation.y = elapsed;
            this.depthMotes.position.y = Math.sin(elapsed * 3.2) * 0.3;
        }
        this.renderer.render(this.scene, this.camera);
    }

    createAtmosphericDepth() {
        this.atmosphereGroup = new THREE.Group();
        const geometry = new THREE.BufferGeometry();
        const material = new THREE.PointsMaterial({
            color: 0xfff2a6,
            size: 0.11,
            transparent: true,
            opacity: 0.42,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });
        this.depthMotes = new THREE.Points(geometry, material);
        this.depthMotes.frustumCulled = true;
        this.atmosphereGroup.add(this.depthMotes);
        this.scene.add(this.atmosphereGroup);
        this.updateAtmosphericDepthLOD(this.playerLODRadius);
    }

    updateAtmosphericDepthLOD(radius) {
        if (!this.depthMotes) return;
        const positions = ThreeManager.createAtmosphereLODPositions(radius);
        this.depthMotes.geometry.dispose();
        this.depthMotes.geometry = new THREE.BufferGeometry();
        this.depthMotes.geometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(positions, 3)
        );
        this.depthMotes.geometry.computeBoundingSphere();
        this.atmosphereLODRadius = Math.max(0, Number(radius) || 0);
    }

    static createAtmosphereLODPositions(radius, count = 180) {
        const maximumRadius = Math.max(0, (Number(radius) || 0) - 1);
        const minimumRadius = Math.min(6, maximumRadius * 0.35);
        const radiusSpan = Math.max(0, maximumRadius - minimumRadius);
        const positions = [];
        for (let index = 0; index < count; index++) {
            const angle = index * 2.399963229728653;
            const normalizedRadius = ((index * 47) % 720) / 719;
            const particleRadius = minimumRadius + normalizedRadius * radiusSpan;
            positions.push(
                Math.cos(angle) * particleRadius,
                1.5 + ((index * 29) % 85) / 10,
                Math.sin(angle) * particleRadius
            );
        }
        return positions;
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
