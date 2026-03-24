import Phaser from 'phaser';
import BootScene from './scenes/BootScene.js';
import WorldScene from './scenes/WorldScene.js';
import UIScene from './scenes/UIScene.js';
import CombatScene from './scenes/CombatScene.js';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [BootScene, WorldScene, UIScene, CombatScene]
};

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});

export default game;
