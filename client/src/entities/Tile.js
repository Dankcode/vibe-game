import * as THREE from 'three';

export class Tile {
    constructor(threeManager, gridX, gridY, elevation, attributes = {}) {
        this.threeManager = threeManager;
        this.gridX = gridX;
        this.gridY = gridY;
        this.elevation = elevation;
        this.attributes = attributes;
        
        // Elemental system: similar to Genshin Impact
        this.element = attributes.element || 1;    // Default: Ground/Geo (1)
        this.textureValue = attributes.textureValue || 0; // Variant/Texture offset

        this.render();
    }

    setElementalType(element, textureValue) {
        this.element = element;
        this.textureValue = textureValue;
        if (this.mesh) {
            this.mesh.material.color.setHex(this.getColorForType(element, textureValue));
        }
    }

    render() {
        // In 3D: (x, y, z) -> gridX, elevation, gridY
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const color = this.getColorForType(this.element, this.textureValue);
        const material = new THREE.MeshStandardMaterial({ 
            color,
            roughness: 0.8,
            metalness: 0.1
        });

        this.mesh = new THREE.Mesh(geometry, material);
        
        // Position: use (gridX, elevation, gridY)
        // Note: Three.js y is UP.
        this.mesh.position.set(this.gridX, this.elevation, this.gridY);
        
        this.threeManager.addToWorld(this.mesh);
    }

    getColorForType(element, textureValue) {
        switch (element) {
            case 1: // Ground / Geo
                return 0x7cb87a;
            case 2: // Water / Hydro
                if (textureValue === 4) return 0x4a5d23; // Brackish water
                return 0x6aa3c8; // Normal water
            case 3: // Sand / Anemo? (using as terrain)
                return 0xe8c97d;
            case 4: // Ice / Cryo
                return 0xdef3f6;
            case 5: // Fire / Pyro
                return 0xe67e22;
            default:
                return 0x888888;
        }
    }

    destroy() {
        if (this.mesh) {
            this.threeManager.removeFromWorld(this.mesh);
            this.mesh.geometry.dispose();
            this.mesh.material.dispose();
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

