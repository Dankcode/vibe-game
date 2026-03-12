import Phaser from 'phaser';

export default class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene', active: true });
    }

    create() {
        const { width, height } = this.scale;

        // Inventory Button (Bottom Right)
        const inventoryBtn = this.add.container(width - 100, height - 40);
        const bg = this.add.rectangle(0, 0, 120, 40, 0x111111, 0.9).setStrokeStyle(2, 0x00ff00);
        const text = this.add.text(0, 0, 'INVENTORY', { fontSize: '14px', color: '#00ff00', fontStyle: 'bold' }).setOrigin(0.5);
        
        inventoryBtn.add([bg, text]);
        inventoryBtn.setSize(120, 40);
        inventoryBtn.setInteractive();

        inventoryBtn.on('pointerover', () => {
            bg.setFillStyle(0x00ff00);
            text.setColor('#000000');
        });
        inventoryBtn.on('pointerout', () => {
            bg.setFillStyle(0x111111);
            text.setColor('#00ff00');
        });
        inventoryBtn.on('pointerdown', () => this.showNotification('Inventory Access Prohibited'));

        // Utility Buttons (Top Right)
        const buttons = ['STATS', 'GEAR', 'SKILLS', 'MAP'];
        buttons.forEach((label, i) => {
            const btn = this.add.container(width - 60, 40 + i * 50);
            const b = this.add.rectangle(0, 0, 80, 30, 0x111111, 0.9).setStrokeStyle(1, 0x555555);
            const t = this.add.text(0, 0, label, { fontSize: '12px', color: '#888888' }).setOrigin(0.5);
            
            btn.add([b, t]);
            btn.setSize(80, 30);
            btn.setInteractive();
            
            btn.on('pointerover', () => {
                b.setStrokeStyle(2, 0x00ff00);
                t.setColor('#00ff00');
            });
            btn.on('pointerout', () => {
                b.setStrokeStyle(1, 0x555555);
                t.setColor('#888888');
            });
            btn.on('pointerdown', () => this.showNotification(`${label} Locked`));
        });

        // Notification area
        this.notifText = this.add.text(width / 2, 50, '', { 
            fontSize: '18px', 
            color: '#00ff00',
            backgroundColor: '#00000088',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setAlpha(0);
    }

    showNotification(msg) {
        this.notifText.setText(msg);
        this.notifText.setAlpha(1);
        this.tweens.add({
            targets: this.notifText,
            alpha: 0,
            y: 30,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                this.notifText.y = 50;
            }
        });
    }
}
