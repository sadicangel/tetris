import blocks from '@/lib/blocks';
import { Container, Sprite } from 'pixi.js';
import { Piece } from './piece';

const BLOCK_WIDTH = 12;
const BLOCK_HEIGHT = 20;

export class Border extends Container {
    static readonly WIDTH = BLOCK_WIDTH * Piece.BLOCK_SIZE;
    static readonly HEIGHT = BLOCK_HEIGHT * Piece.BLOCK_SIZE;

    constructor() {
        super();

        // Left side.
        for (let i = 0; i < BLOCK_HEIGHT; ++i) {
            const sprite = new Sprite(blocks.grey);
            this.addChild(sprite);
            sprite.x = 0;
            sprite.y = i * Piece.BLOCK_SIZE;
        }

        // Right side.
        for (let i = 0; i < BLOCK_HEIGHT; ++i) {
            const sprite = new Sprite(blocks.grey);
            this.addChild(sprite);
            sprite.x = (BLOCK_WIDTH - 1) * Piece.BLOCK_SIZE;
            sprite.y = i * Piece.BLOCK_SIZE;
        }

        // Bottom.
        for (let i = 1; i < BLOCK_WIDTH - 1; ++i) {
            const sprite = new Sprite(blocks.grey);
            this.addChild(sprite);
            sprite.x = i * Piece.BLOCK_SIZE;
            sprite.y = (BLOCK_HEIGHT - 1) * Piece.BLOCK_SIZE;
        }
    }
}