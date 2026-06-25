import * as THREE from 'three';
import { ELEMENTS, getTileDefinition } from '../data/TileRegistry.js';
import { BUILDING_PARTS } from '../data/TileLibrary.js';

export const TILE_HEIGHT = 0.96;
export const TILE_TOP_OFFSET = TILE_HEIGHT / 2;

export class Tile {
    static geometry = new THREE.BoxGeometry(0.98, TILE_HEIGHT, 0.98);
    static topOffset = TILE_TOP_OFFSET;
    static materialCache = new Map();

    constructor(threeManager, gridX, gridY, elevation, attributes = {}) {
        this.threeManager = threeManager;
        this.gridX = gridX;
        this.gridY = gridY;
        this.elevation = elevation;
        this.attributes = attributes;
        
        // Elemental system: similar to Genshin Impact
        this.element = attributes.element || ELEMENTS.GEO;
        this.textureValue = attributes.textureValue || 0; // Variant/Texture offset
        this.effect = attributes.effect || 0;
        this.building = attributes.building || 0;
        this.objects = [];

        this.render();
    }

    setElementalType(element, textureValue, effect = 0, building = 0) {
        this.element = element;
        this.textureValue = textureValue;
        this.effect = effect;
        this.building = building;
        if (this.mesh) {
            this.restoreBaseMaterial();
            this.clearObjects();
            this.mesh.material = Tile.isSpecialBuildingShape(building)
                ? Tile.getInvisibleMaterial()
                : Tile.getMaterials(element, textureValue, effect, this.elevation, building);
            this.createObjects();
        }
    }

    render() {
        // In 3D: (x, y, z) -> gridX, elevation, gridY
        const material = Tile.isSpecialBuildingShape(this.building)
            ? Tile.getInvisibleMaterial()
            : Tile.getMaterials(this.element, this.textureValue, this.effect, this.elevation, this.building);

        this.mesh = new THREE.Mesh(Tile.geometry, material);
        this.mesh.castShadow = !getTileDefinition(this.element, this.textureValue).walkable;
        this.mesh.receiveShadow = true;
        
        // Position: use (gridX, elevation, gridY)
        // Note: Three.js y is UP.
        this.mesh.position.set(this.gridX, this.elevation, this.gridY);
        
        // Store reference to this Tile instance
        this.mesh.userData.tile = this;
        
        this.threeManager.addToWorld(this.mesh);
        this.createObjects();
    }

    createObjects() {
        if (!this.mesh) return;
        if (Tile.isWindowWall(this.building)) {
            this.addWindowWallObjects();
        } else if (Tile.isDirectionalStair(this.building)) {
            this.addStairObjects();
        }
    }

    addWindowWallObjects() {
        const direction = Tile.getBuildingPartDirection(this.building);
        const glassMaterial = Tile.getWindowGlassMaterial();
        const wallMaterial = Tile.getMaterials(this.element, this.textureValue, this.effect, this.elevation, this.building);
        const isUpper = Tile.isUpperWindowWall(this.building);
        const wall = new THREE.Mesh(
            new THREE.BoxGeometry(0.98, 0.48, 0.98),
            wallMaterial
        );
        wall.position.y = isUpper ? 0.24 : -0.24;
        wall.castShadow = true;
        wall.receiveShadow = true;
        wall.raycast = () => {};
        this.mesh.add(wall);
        this.objects.push(wall);

        const glass = new THREE.Mesh(
            new THREE.BoxGeometry(
                direction === 'north' || direction === 'south' ? 0.82 : 0.045,
                0.44,
                direction === 'north' || direction === 'south' ? 0.045 : 0.82
            ),
            glassMaterial
        );
        const normal = Tile.getDirectionVector(direction);
        glass.position.set(normal.x * 0.47, isUpper ? -0.25 : 0.25, normal.y * 0.47);
        glass.raycast = () => {};
        this.mesh.add(glass);
        this.objects.push(glass);
    }

    addStairObjects() {
        const direction = Tile.getBuildingPartDirection(this.building);
        const normal = Tile.getDirectionVector(direction);
        const material = Tile.getMaterials(this.element, this.textureValue, this.effect, this.elevation, this.building);
        const stepDepth = 0.3;

        for (let i = 0; i < 3; i++) {
            const height = (i + 1) * 0.32;
            const step = new THREE.Mesh(new THREE.BoxGeometry(0.9, height, stepDepth), material);
            const offset = -0.3 + i * stepDepth;
            step.position.set(normal.x * offset, -0.48 + height / 2, normal.y * offset);
            step.rotation.y = direction === 'east' || direction === 'west' ? Math.PI / 2 : 0;
            step.castShadow = true;
            step.receiveShadow = true;
            step.raycast = () => {};
            this.mesh.add(step);
            this.objects.push(step);
        }
    }

    clearObjects() {
        if (!this.objects?.length) return;
        for (const object of this.objects) {
            object.parent?.remove(object);
            object.geometry?.dispose();
        }
        this.objects = [];
    }

    static isWindowWall(buildingPart) {
        return [
            BUILDING_PARTS.WINDOW_LOWER_NORTH,
            BUILDING_PARTS.WINDOW_LOWER_SOUTH,
            BUILDING_PARTS.WINDOW_LOWER_WEST,
            BUILDING_PARTS.WINDOW_LOWER_EAST,
            BUILDING_PARTS.WINDOW_UPPER_NORTH,
            BUILDING_PARTS.WINDOW_UPPER_SOUTH,
            BUILDING_PARTS.WINDOW_UPPER_WEST,
            BUILDING_PARTS.WINDOW_UPPER_EAST
        ].includes(buildingPart);
    }

    static isUpperWindowWall(buildingPart) {
        return [
            BUILDING_PARTS.WINDOW_UPPER_NORTH,
            BUILDING_PARTS.WINDOW_UPPER_SOUTH,
            BUILDING_PARTS.WINDOW_UPPER_WEST,
            BUILDING_PARTS.WINDOW_UPPER_EAST
        ].includes(buildingPart);
    }

    static isSpecialBuildingShape(buildingPart) {
        return Tile.isWindowWall(buildingPart) || Tile.isDirectionalStair(buildingPart);
    }

    static isDirectionalStair(buildingPart) {
        return [
            BUILDING_PARTS.STAIRS_NORTH,
            BUILDING_PARTS.STAIRS_SOUTH,
            BUILDING_PARTS.STAIRS_WEST,
            BUILDING_PARTS.STAIRS_EAST
        ].includes(buildingPart);
    }

    static getBuildingPartDirection(buildingPart) {
        return {
            [BUILDING_PARTS.WINDOW_LOWER_NORTH]: 'north',
            [BUILDING_PARTS.WINDOW_LOWER_SOUTH]: 'south',
            [BUILDING_PARTS.WINDOW_LOWER_WEST]: 'west',
            [BUILDING_PARTS.WINDOW_LOWER_EAST]: 'east',
            [BUILDING_PARTS.WINDOW_UPPER_NORTH]: 'north',
            [BUILDING_PARTS.WINDOW_UPPER_SOUTH]: 'south',
            [BUILDING_PARTS.WINDOW_UPPER_WEST]: 'west',
            [BUILDING_PARTS.WINDOW_UPPER_EAST]: 'east',
            [BUILDING_PARTS.STAIRS_NORTH]: 'north',
            [BUILDING_PARTS.STAIRS_SOUTH]: 'south',
            [BUILDING_PARTS.STAIRS_WEST]: 'west',
            [BUILDING_PARTS.STAIRS_EAST]: 'east'
        }[buildingPart] || 'north';
    }

    static getDirectionVector(direction) {
        return {
            north: { x: 0, y: -1 },
            south: { x: 0, y: 1 },
            west: { x: -1, y: 0 },
            east: { x: 1, y: 0 }
        }[direction] || { x: 0, y: -1 };
    }

    static getWindowGlassMaterial() {
        if (!Tile.windowGlassMaterial) {
            Tile.windowGlassMaterial = new THREE.MeshStandardMaterial({
                color: 0x9de7ff,
                emissive: 0x225c71,
                emissiveIntensity: 0.2,
                roughness: 0.18,
                metalness: 0.02,
                transparent: true,
                opacity: 0.58,
                depthWrite: false
            });
        }
        return Tile.windowGlassMaterial;
    }

    static getInvisibleMaterial() {
        if (!Tile.invisibleMaterial) {
            Tile.invisibleMaterial = new THREE.MeshBasicMaterial({
                transparent: true,
                opacity: 0,
                depthWrite: false,
                colorWrite: false
            });
        }
        return Tile.invisibleMaterial;
    }

    highlight(color = 0x555555) {
        if (this.mesh && this.mesh.material) {
            if (!this.highlightMaterial) {
                this.highlightMaterial = Array.isArray(this.mesh.material)
                    ? this.mesh.material.map((material) => material.clone())
                    : this.mesh.material.clone();
                this.mesh.material = this.highlightMaterial;
            }
            const materials = Array.isArray(this.mesh.material) ? this.mesh.material : [this.mesh.material];
            materials.forEach((material) => material.emissive?.setHex(color));
        }
    }

    clearHighlight() {
        this.restoreBaseMaterial();
    }

    restoreBaseMaterial() {
        if (!this.mesh || !this.highlightMaterial) return;
        const materials = Array.isArray(this.highlightMaterial) ? this.highlightMaterial : [this.highlightMaterial];
        materials.forEach((material) => material.dispose());
        this.highlightMaterial = null;
        this.mesh.material = Tile.isSpecialBuildingShape(this.building)
            ? Tile.getInvisibleMaterial()
            : Tile.getMaterials(this.element, this.textureValue, this.effect, this.elevation, this.building);
    }

    static getMaterials(element, textureValue = 0, effect = 0, elevation = 0, building = BUILDING_PARTS.NONE) {
        const elevationTone = Tile.getOutdoorElevationTone(element, elevation, building);
        const key = `${element}:${textureValue}:${effect}:${elevationTone}`;
        if (!Tile.materialCache.has(key)) {
            const definition = getTileDefinition(element, textureValue);
            const topTexture = Tile.createTexture(definition, effect, elevationTone);
            const sideTexture = Tile.createSideTexture(definition, elevationTone);
            const topMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                map: topTexture,
                roughness: definition.roughness,
                metalness: 0.05
            });
            const sideMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                map: sideTexture,
                roughness: Math.min(1, definition.roughness + 0.08),
                metalness: 0.02
            });
            Tile.materialCache.set(key, [
                sideMaterial,
                sideMaterial,
                topMaterial,
                sideMaterial,
                sideMaterial,
                sideMaterial
            ]);
        }
        return Tile.materialCache.get(key);
    }

    static getOutdoorElevationTone(element, elevation, building) {
        if (building !== BUILDING_PARTS.NONE) return 0;
        if (![ELEMENTS.GEO, ELEMENTS.ANEMO, ELEMENTS.CRYO].includes(element)) return 0;
        if (elevation <= 0) return -0.14;
        return Math.min(0.3, 0.08 + elevation * 0.11);
    }

    static createTexture(definition, effect = 0, elevationTone = 0) {
        const canvas = document.createElement('canvas');
        canvas.width = 96;
        canvas.height = 96;
        const ctx = canvas.getContext('2d');
        const top = `#${definition.topColor.toString(16).padStart(6, '0')}`;
        const side = `#${definition.sideColor.toString(16).padStart(6, '0')}`;

        ctx.fillStyle = top;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        Tile.drawSoftTop(ctx, definition);

        if (definition.pattern === 'grass') {
            Tile.drawGrass(ctx, top, side);
        } else if (definition.pattern === 'forest') {
            Tile.drawForest(ctx);
        } else if (definition.pattern === 'hill') {
            Tile.drawHill(ctx);
        } else if (definition.pattern === 'stone') {
            Tile.drawStone(ctx);
        } else if (definition.pattern === 'road') {
            Tile.drawRoad(ctx);
        } else if (definition.pattern === 'floor') {
            Tile.drawFloor(ctx);
        } else if (definition.pattern === 'water') {
            Tile.drawWaves(ctx, '#b7e6f4', 0.35);
        } else if (definition.pattern === 'marsh') {
            Tile.drawWaves(ctx, '#7c8b48', 0.28);
            Tile.drawSpeckles(ctx, '#2f3b20', 22, 0.45);
        } else if (definition.pattern === 'sand') {
            Tile.drawSpeckles(ctx, '#f5dea0', 42, 0.45);
        } else if (definition.pattern === 'ice') {
            Tile.drawIce(ctx, '#ffffff');
        } else if (definition.pattern === 'lava') {
            Tile.drawLava(ctx);
        } else if (definition.pattern === 'brick') {
            Tile.drawBrick(ctx);
        } else if (definition.pattern === 'masonry') {
            Tile.drawMasonry(ctx);
        } else if (definition.pattern === 'timber') {
            Tile.drawTimber(ctx);
        } else if (definition.pattern === 'doorOak') {
            Tile.drawDoor(ctx, 'oak');
        } else if (definition.pattern === 'doorIron') {
            Tile.drawDoor(ctx, 'iron');
        } else if (definition.pattern === 'doorPainted') {
            Tile.drawDoor(ctx, 'painted');
        } else if (definition.pattern === 'stairs') {
            Tile.drawStairs(ctx);
        } else if (definition.pattern === 'blocked') {
            Tile.drawBlocked(ctx);
        } else {
            Tile.drawSpeckles(ctx, side, 28, 0.25);
        }

        if (effect > 0) Tile.drawElementEffect(ctx, effect);
        Tile.applyElevationTone(ctx, elevationTone);
        Tile.drawRoundedFrame(ctx, definition.walkable);

        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        texture.needsUpdate = true;
        return texture;
    }

    static createSideTexture(definition, elevationTone = 0) {
        const canvas = document.createElement('canvas');
        canvas.width = 96;
        canvas.height = 96;
        const ctx = canvas.getContext('2d');
        const top = `#${definition.topColor.toString(16).padStart(6, '0')}`;
        const side = `#${definition.sideColor.toString(16).padStart(6, '0')}`;

        const gradient = ctx.createLinearGradient(0, 0, 0, 96);
        gradient.addColorStop(0, top);
        gradient.addColorStop(0.18, side);
        gradient.addColorStop(1, Tile.shadeColor(side, -34));
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 96, 96);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
        ctx.fillRect(0, 0, 96, 8);
        ctx.fillStyle = 'rgba(4, 9, 12, 0.26)';
        ctx.fillRect(0, 84, 96, 12);

        ctx.strokeStyle = definition.walkable ? 'rgba(31, 58, 35, 0.22)' : 'rgba(6, 9, 12, 0.38)';
        ctx.lineWidth = 3;
        for (let y = 22; y < 88; y += 22) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(96, y);
            ctx.stroke();
        }

        if (!definition.walkable) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(18, 16);
            ctx.lineTo(78, 76);
            ctx.moveTo(80, 18);
            ctx.lineTo(20, 78);
            ctx.stroke();
        }

        Tile.applyElevationTone(ctx, elevationTone * 0.9);

        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.needsUpdate = true;
        return texture;
    }

    static applyElevationTone(ctx, amount) {
        if (Math.abs(amount) < 0.001) return;
        ctx.save();
        ctx.globalCompositeOperation = amount > 0 ? 'screen' : 'multiply';
        ctx.globalAlpha = Math.min(0.42, Math.abs(amount));
        ctx.fillStyle = amount > 0 ? '#ffffff' : '#46513d';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.restore();
    }

    static shadeColor(color, amount) {
        const value = parseInt(color.replace('#', ''), 16);
        const r = Math.max(0, Math.min(255, (value >> 16) + amount));
        const g = Math.max(0, Math.min(255, ((value >> 8) & 0xff) + amount));
        const b = Math.max(0, Math.min(255, (value & 0xff) + amount));
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    static drawSoftTop(ctx, definition) {
        const gradient = ctx.createRadialGradient(34, 26, 8, 48, 48, 72);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.34)');
        gradient.addColorStop(0.52, 'rgba(255, 255, 255, 0.08)');
        gradient.addColorStop(1, definition.walkable ? 'rgba(45, 62, 44, 0.16)' : 'rgba(18, 24, 24, 0.34)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 96, 96);
    }

    static drawRoundedFrame(ctx, walkable) {
        ctx.save();
        ctx.lineWidth = walkable ? 4 : 6;
        ctx.strokeStyle = walkable ? 'rgba(255, 255, 255, 0.28)' : 'rgba(30, 24, 22, 0.42)';
        Tile.roundRect(ctx, 7, 7, 82, 82, 15);
        ctx.stroke();

        ctx.lineWidth = 3;
        ctx.strokeStyle = walkable ? 'rgba(43, 68, 45, 0.18)' : 'rgba(5, 7, 8, 0.34)';
        Tile.roundRect(ctx, 2.5, 2.5, 91, 91, 13);
        ctx.stroke();
        ctx.restore();
    }

    static drawElementEffect(ctx, effect) {
        const colors = {
            [ELEMENTS.GEO]: '#7ed957',
            [ELEMENTS.HYDRO]: '#4fc3f7',
            [ELEMENTS.ANEMO]: '#ffd978',
            [ELEMENTS.CRYO]: '#b8f0ff',
            [ELEMENTS.PYRO]: '#ff8a3d',
            [ELEMENTS.STRUCTURE]: '#ffb5cf'
        };
        const color = colors[effect];
        if (!color) return;

        ctx.save();
        ctx.globalAlpha = 0.22;
        ctx.fillStyle = color;
        Tile.roundRect(ctx, 14, 14, 68, 68, 18);
        ctx.fill();

        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.setLineDash([14, 10]);
        ctx.beginPath();
        ctx.arc(48, 48, 25, 0, Math.PI * 2);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.globalAlpha = 0.38;
        ctx.lineWidth = 3;
        for (let i = 0; i < 4; i++) {
            const angle = i * Math.PI * 0.5 + Math.PI * 0.25;
            const x = 48 + Math.cos(angle) * 27;
            const y = 48 + Math.sin(angle) * 27;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.restore();
    }

    static roundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + width, y, x + width, y + height, radius);
        ctx.arcTo(x + width, y + height, x, y + height, radius);
        ctx.arcTo(x, y + height, x, y, radius);
        ctx.arcTo(x, y, x + width, y, radius);
        ctx.closePath();
    }

    static drawGrass(ctx, top, side) {
        Tile.drawSpeckles(ctx, '#a4d37e', 32, 0.5);
        ctx.strokeStyle = side;
        ctx.lineWidth = 2;
        for (let i = 0; i < 18; i++) {
            const x = (i * 31) % 92 + 2;
            const y = (i * 47) % 88 + 5;
            ctx.beginPath();
            ctx.moveTo(x, y + 5);
            ctx.lineTo(x + 3, y);
            ctx.stroke();
        }
        ctx.fillStyle = top;
        ctx.globalAlpha = 0.25;
        ctx.fillRect(0, 0, 96, 96);
        ctx.globalAlpha = 1;
    }

    static drawForest(ctx) {
        Tile.drawSpeckles(ctx, '#2f8d48', 30, 0.32);
        ctx.fillStyle = 'rgba(20, 110, 54, 0.35)';
        for (let i = 0; i < 13; i++) {
            const x = (i * 29) % 82 + 8;
            const y = (i * 43) % 82 + 8;
            ctx.beginPath();
            ctx.arc(x, y, 4 + (i % 3), 0, Math.PI * 2);
            ctx.fill();
        }
    }

    static drawHill(ctx) {
        Tile.drawSpeckles(ctx, '#d4ed91', 24, 0.36);
        ctx.strokeStyle = 'rgba(57, 108, 53, 0.34)';
        ctx.lineWidth = 4;
        for (let y = 20; y < 86; y += 22) {
            ctx.beginPath();
            ctx.moveTo(13, y);
            ctx.bezierCurveTo(30, y - 10, 52, y + 10, 80, y - 2);
            ctx.stroke();
        }
    }

    static drawStone(ctx) {
        Tile.drawSpeckles(ctx, '#dce2b2', 30, 0.28);
        ctx.strokeStyle = 'rgba(75, 84, 72, 0.32)';
        ctx.lineWidth = 3;
        for (let i = 0; i < 8; i++) {
            const x = (i * 19) % 74 + 10;
            const y = (i * 31) % 74 + 10;
            ctx.beginPath();
            ctx.moveTo(x - 8, y);
            ctx.lineTo(x, y - 6);
            ctx.lineTo(x + 10, y - 2);
            ctx.lineTo(x + 6, y + 8);
            ctx.closePath();
            ctx.stroke();
        }
    }

    static drawRoad(ctx) {
        ctx.save();
        ctx.strokeStyle = 'rgba(163, 112, 53, 0.28)';
        ctx.lineWidth = 5;
        ctx.setLineDash([10, 9]);
        ctx.beginPath();
        ctx.moveTo(4, 51);
        ctx.bezierCurveTo(24, 38, 50, 60, 92, 43);
        ctx.stroke();
        ctx.restore();
        Tile.drawSpeckles(ctx, '#fff1bd', 34, 0.38);
    }

    static drawFloor(ctx) {
        ctx.strokeStyle = 'rgba(92, 58, 32, 0.26)';
        ctx.lineWidth = 3;
        for (let y = 16; y < 92; y += 16) {
            ctx.beginPath();
            ctx.moveTo(5, y);
            ctx.lineTo(91, y);
            ctx.stroke();
        }
        ctx.strokeStyle = 'rgba(255, 246, 206, 0.22)';
        for (let x = 18; x < 96; x += 22) {
            ctx.beginPath();
            ctx.moveTo(x, 10);
            ctx.lineTo(x - 6, 88);
            ctx.stroke();
        }
    }

    static drawWaves(ctx, color, alpha) {
        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 3;
        for (let y = 14; y < 96; y += 20) {
            ctx.beginPath();
            for (let x = -8; x < 104; x += 12) {
                const waveY = y + Math.sin(x * 0.18) * 3;
                if (x === -8) ctx.moveTo(x, waveY);
                else ctx.lineTo(x, waveY);
            }
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    }

    static drawSpeckles(ctx, color, count, alpha) {
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        for (let i = 0; i < count; i++) {
            const x = (i * 37) % 92 + 2;
            const y = (i * 53) % 92 + 2;
            const size = 1 + (i % 3);
            ctx.fillRect(x, y, size, size);
        }
        ctx.globalAlpha = 1;
    }

    static drawIce(ctx, color) {
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 2;
        for (let i = 0; i < 7; i++) {
            const start = (i * 13) % 96;
            ctx.beginPath();
            ctx.moveTo(start, 4);
            ctx.lineTo(96 - start / 2, 92);
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    }

    static drawLava(ctx) {
        const gradient = ctx.createRadialGradient(48, 48, 4, 48, 48, 70);
        gradient.addColorStop(0, '#ffd166');
        gradient.addColorStop(0.45, '#f97316');
        gradient.addColorStop(1, '#7c1d12');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 96, 96);
        ctx.strokeStyle = 'rgba(255, 224, 102, 0.65)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(8, 28);
        ctx.bezierCurveTo(28, 10, 42, 60, 62, 28);
        ctx.bezierCurveTo(72, 12, 84, 30, 91, 18);
        ctx.stroke();
    }

    static drawBrick(ctx) {
        ctx.strokeStyle = 'rgba(137, 85, 44, 0.36)';
        ctx.lineWidth = 3;
        for (let y = 18; y < 96; y += 18) {
            ctx.beginPath();
            ctx.moveTo(4, y);
            ctx.lineTo(92, y);
            ctx.stroke();
        }
        for (let y = 9; y < 96; y += 18) {
            const offset = (Math.floor(y / 18) % 2) * 18;
            for (let x = 8 + offset; x < 96; x += 36) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y + 18);
                ctx.stroke();
            }
        }
    }

    static drawMasonry(ctx) {
        Tile.drawSpeckles(ctx, '#f1f4f0', 18, 0.18);
        ctx.strokeStyle = 'rgba(76, 84, 90, 0.36)';
        ctx.lineWidth = 3;
        for (let y = 16; y < 96; y += 16) {
            ctx.beginPath();
            ctx.moveTo(6, y);
            ctx.lineTo(90, y);
            ctx.stroke();
        }
        for (let y = 8; y < 96; y += 16) {
            const offset = (Math.floor(y / 16) % 2) * 18;
            for (let x = 9 + offset; x < 96; x += 36) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y + 16);
                ctx.stroke();
            }
        }
    }

    static drawTimber(ctx) {
        Tile.drawSpeckles(ctx, '#f3c285', 18, 0.16);
        ctx.strokeStyle = 'rgba(83, 49, 27, 0.38)';
        ctx.lineWidth = 5;
        for (let x = 18; x < 96; x += 24) {
            ctx.beginPath();
            ctx.moveTo(x, 8);
            ctx.lineTo(x - 4, 88);
            ctx.stroke();
        }
        ctx.strokeStyle = 'rgba(255, 232, 179, 0.26)';
        ctx.lineWidth = 2;
        for (let x = 28; x < 96; x += 24) {
            ctx.beginPath();
            ctx.moveTo(x, 8);
            ctx.lineTo(x - 4, 88);
            ctx.stroke();
        }
    }

    static drawDoor(ctx, style = 'oak') {
        const palettes = {
            oak: {
                panel: 'rgba(70, 39, 24, 0.38)',
                frame: 'rgba(255, 218, 132, 0.45)',
                accent: 'rgba(255, 221, 128, 0.7)'
            },
            iron: {
                panel: 'rgba(36, 43, 49, 0.52)',
                frame: 'rgba(190, 207, 216, 0.52)',
                accent: 'rgba(224, 191, 92, 0.78)'
            },
            painted: {
                panel: 'rgba(25, 85, 79, 0.5)',
                frame: 'rgba(174, 232, 207, 0.5)',
                accent: 'rgba(244, 205, 93, 0.78)'
            }
        };
        const colors = palettes[style] || palettes.oak;

        ctx.fillStyle = colors.panel;
        Tile.roundRect(ctx, 22, 14, 52, 68, 10);
        ctx.fill();
        ctx.strokeStyle = colors.frame;
        ctx.lineWidth = 4;
        Tile.roundRect(ctx, 24, 16, 48, 64, 9);
        ctx.stroke();
        ctx.lineWidth = style === 'iron' ? 5 : 3;
        for (let y = 32; y <= 64; y += 16) {
            ctx.beginPath();
            ctx.moveTo(27, y);
            ctx.lineTo(69, y);
            ctx.stroke();
        }
        ctx.fillStyle = colors.accent;
        ctx.beginPath();
        ctx.arc(62, 48, 4, 0, Math.PI * 2);
        ctx.fill();
    }

    static drawStairs(ctx) {
        ctx.save();
        ctx.fillStyle = 'rgba(84, 58, 35, 0.18)';
        ctx.fillRect(12, 18, 72, 62);
        ctx.strokeStyle = 'rgba(255, 246, 218, 0.42)';
        ctx.lineWidth = 5;
        for (let i = 0; i < 6; i++) {
            const y = 22 + i * 10;
            ctx.beginPath();
            ctx.moveTo(20 + i * 4, y);
            ctx.lineTo(76 - i * 3, y);
            ctx.stroke();
        }
        ctx.strokeStyle = 'rgba(92, 58, 32, 0.34)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(20, 78);
        ctx.lineTo(80, 20);
        ctx.stroke();
        ctx.restore();
    }

    static drawBlocked(ctx) {
        ctx.save();
        ctx.fillStyle = 'rgba(20, 24, 28, 0.2)';
        Tile.roundRect(ctx, 12, 12, 72, 72, 15);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(22, 28);
        ctx.lineTo(74, 68);
        ctx.moveTo(72, 25);
        ctx.lineTo(24, 73);
        ctx.stroke();
        ctx.restore();
    }

    destroy() {
        this.clearObjects();
        if (this.mesh) {
            this.restoreBaseMaterial();
            this.threeManager.removeFromWorld(this.mesh);
            this.mesh = null;
        }
    }
}
