import * as THREE from 'three';
import { ELEMENTS, getTileDefinition } from '../data/TileRegistry.js';

export class Tile {
    static geometry = new THREE.BoxGeometry(1, 1, 1);
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

        this.render();
    }

    setElementalType(element, textureValue) {
        this.element = element;
        this.textureValue = textureValue;
        if (this.mesh) {
            this.restoreBaseMaterial();
            this.mesh.material = Tile.getMaterial(element, textureValue);
        }
    }

    render() {
        // In 3D: (x, y, z) -> gridX, elevation, gridY
        const material = Tile.getMaterial(this.element, this.textureValue);

        this.mesh = new THREE.Mesh(Tile.geometry, material);
        this.mesh.castShadow = !getTileDefinition(this.element, this.textureValue).walkable;
        this.mesh.receiveShadow = true;
        
        // Position: use (gridX, elevation, gridY)
        // Note: Three.js y is UP.
        this.mesh.position.set(this.gridX, this.elevation, this.gridY);
        
        // Store reference to this Tile instance
        this.mesh.userData.tile = this;
        
        this.threeManager.addToWorld(this.mesh);
    }

    highlight(color = 0x555555) {
        if (this.mesh && this.mesh.material) {
            if (!this.highlightMaterial) {
                this.highlightMaterial = this.mesh.material.clone();
                this.mesh.material = this.highlightMaterial;
            }
            this.mesh.material.emissive.setHex(color);
        }
    }

    clearHighlight() {
        this.restoreBaseMaterial();
    }

    restoreBaseMaterial() {
        if (!this.mesh || !this.highlightMaterial) return;
        this.highlightMaterial.dispose();
        this.highlightMaterial = null;
        this.mesh.material = Tile.getMaterial(this.element, this.textureValue);
    }

    static getMaterial(element, textureValue = 0) {
        const key = `${element}:${textureValue}`;
        if (!Tile.materialCache.has(key)) {
            const definition = getTileDefinition(element, textureValue);
            const texture = Tile.createTexture(definition);
            const material = new THREE.MeshStandardMaterial({
                color: definition.sideColor,
                map: texture,
                roughness: definition.roughness,
                metalness: 0.05
            });
            Tile.materialCache.set(key, material);
        }
        return Tile.materialCache.get(key);
    }

    static createTexture(definition) {
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
        } else if (definition.pattern === 'road') {
            Tile.drawRoad(ctx);
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
        } else if (definition.pattern === 'blocked') {
            Tile.drawBlocked(ctx);
        } else {
            Tile.drawSpeckles(ctx, side, 28, 0.25);
        }

        Tile.drawRoundedFrame(ctx, definition.walkable);

        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        texture.needsUpdate = true;
        return texture;
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
        if (this.mesh) {
            this.restoreBaseMaterial();
            this.threeManager.removeFromWorld(this.mesh);
            this.mesh = null;
        }
        if (this.objects) {
            this.objects.forEach(obj => {
                if (obj.destroy) obj.destroy();
                else if (obj.dispose) obj.dispose();
            });
            this.objects = [];
        }
    }
}
