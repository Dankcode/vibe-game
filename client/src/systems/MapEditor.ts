export class MapEditor {
    scene: unknown;

    constructor(scene: unknown) {
        this.scene = scene;
        this.engine = scene.engine;
        this.generator = scene.generator;
        this.enabled = false;
        
        // Editor settings
        this.selectedTileType = 0; // 0: ground, 1: rock, etc.
        this.currentZ = 0;
        
        // UI elements
        this.overlay = null;
        this.cursor = null;
        
        this.setupInput();
    }

    setupInput() {
        this.scene.input.on('pointerdown', (pointer) => {
            if (!this.enabled) return;

            const gridPos = this.engine.toGrid(pointer.worldX, pointer.worldY);
            
            if (pointer.leftButtonDown()) {
                this.addTile(gridPos.x, gridPos.y);
            } else if (pointer.rightButtonDown()) {
                this.removeTile(gridPos.x, gridPos.y);
            }
        });

        // Toggle editor with 'E'
        this.scene.input.keyboard.on('keydown-E', () => {
            this.toggle();
        });

        // Elevation control with Q/E or Shift+MouseWheel
        this.scene.input.keyboard.on('keydown-Q', () => { if(this.enabled) this.currentZ = Math.max(0, this.currentZ - 1); });
        this.scene.input.keyboard.on('keydown-R', () => { if(this.enabled) this.currentZ++; });

        // Save/Load
        this.scene.input.keyboard.on('keydown-S', () => { if(this.enabled) this.save(); });
        this.scene.input.keyboard.on('keydown-L', () => { if(this.enabled) this.load(); });
    }

    toggle() {
        this.enabled = !this.enabled;
        console.log(`[MapEditor] ${this.enabled ? 'Enabled' : 'Disabled'}`);
        
        if (this.enabled) {
            this.showUI();
            this.scene.player.speed = 0; // Freeze player
        } else {
            this.hideUI();
            this.scene.player.speed = 4.0; // Restore player speed
        }
    }

    showUI() {
        const { width, height } = this.scene.scale;
        this.overlay = this.scene.add.container(20, 20).setScrollFactor(0).setDepth(10000);
        
        const bg = this.scene.add.rectangle(0, 0, 240, 140, 0x000000, 0.7).setOrigin(0);
        const text = this.scene.add.text(10, 10, 'EDITOR MODE\nL-Click: Add\nR-Click: Remove\nQ/R: elevation\nS: Save Map\nL: Load Map\nE: Exit Editor', {
            fontSize: '14px',
            fill: '#fff',
            lineSpacing: 8
        });
        
        this.overlay.add([bg, text]);
    }

    hideUI() {
        if (this.overlay) {
            this.overlay.destroy();
            this.overlay = null;
        }
    }

    addTile(x, y) {
        // Find highest tile at this position to stack on top? Or use currentZ
        const topZ = this.generator.getElevation(x, y);
        const targetZ = Math.max(this.currentZ, topZ + 1);
        
        this.generator.addTile(x, y, targetZ, this.selectedTileType);
        console.log(`[MapEditor] Added tile at (${x}, ${y}, ${targetZ})`);
    }

    removeTile(x, y) {
        const topZ = this.generator.getElevation(x, y);
        this.generator.removeTile(x, y, topZ);
        console.log(`[MapEditor] Removed tile at (${x}, ${y}, ${topZ})`);
    }

    save() {
        const data = this.generator.exportWorld();
        localStorage.setItem('vibe-game-map', data);
        console.log('[MapEditor] Map saved to Local Storage');
    }

    load() {
        const data = localStorage.getItem('vibe-game-map');
        if (data) {
            this.generator.loadWorld(data);
            console.log('[MapEditor] Map loaded from Local Storage');
        }
    }

    update() {
        if (!this.enabled) return;
        // Could add a ghost cursor here
    }
}
