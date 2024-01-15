import blocks from '@/lib/blocks';
import { Container, Sprite } from 'pixi.js';
import { Piece } from './piece';
import { Config } from './config';

export class Border extends Container {
    constructor() {
        super();

        // Left side.
        for (let i = 0; i < Config.SCREEN_ROWS; ++i) {
            const sprite = new Sprite(blocks.grey);
            this.addChild(sprite);
            sprite.x = 0;
            sprite.y = i * Config.BLOCK_SIZE;
        }

        // Right side.
        for (let i = 0; i < Config.SCREEN_ROWS; ++i) {
            const sprite = new Sprite(blocks.grey);
            this.addChild(sprite);
            sprite.x = (Config.SCREEN_COLS - 1) * Config.BLOCK_SIZE;
            sprite.y = i * Config.BLOCK_SIZE;
        }

        // Bottom.
        for (let i = 1; i < Config.SCREEN_COLS - 1; ++i) {
            const sprite = new Sprite(blocks.grey);
            this.addChild(sprite);
            sprite.x = i * Config.BLOCK_SIZE;
            sprite.y = (Config.SCREEN_ROWS - 1) * Config.BLOCK_SIZE;
        }
    }
}