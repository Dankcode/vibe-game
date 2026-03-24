import Phaser from 'phaser';
import WorldScene from './scenes/WorldScene';
import UIScene from './scenes/UIScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    width: 1280, 
    height: 544, // 21:9-ish cinematic ratio (1280 / (21/9) ≈ 548)
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [WorldScene, UIScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 }
        }
    }
};

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});
