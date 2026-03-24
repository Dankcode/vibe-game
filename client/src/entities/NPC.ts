import Phaser from 'phaser';
import { IsoSprite } from './IsoSprite';

export class NPC extends IsoSprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
    }
}
