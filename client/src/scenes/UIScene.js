import Phaser from 'phaser';

export default class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
    }

    create() {
        this.inventoryText = this.add.text(10, 10, 'Inventory: ', {
            fontSize: '18px',
            fill: '#ffffff'
        }).setScrollFactor(0);

        this.scene.get('WorldScene').events.on('inventory:update', (items) => {
            this.updateInventoryDisplay(items);
        });
    }

    updateInventoryDisplay(items) {
        let text = 'Inventory:\n';
        for (const [item, quantity] of Object.entries(items)) {
            text += `${item}: ${quantity}\n`;
        }
        this.inventoryText.setText(text);
    }
}
