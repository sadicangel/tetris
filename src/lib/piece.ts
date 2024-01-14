import { Container, Sprite, Texture, TextureUvs } from "pixi.js";
import blocks from "./blocks";
import { Border } from "./border";

export type RotateDirection = 'left' | 'right';

export type Layout = {
    texture: Texture,
    x: number,
    y: number
}

export abstract class Piece extends Container {
    static readonly BLOCK_SIZE = 30;
    readonly blocks: number;
    readonly sprites: ReadonlyArray<Sprite>;
    constructor(layouts: ReadonlyArray<Layout>) {
        super();
        this.blocks = layouts.length;
        const sprites = new Array<Sprite>(this.blocks);
        let i = 0;
        for (const layout of layouts) {
            const sprite = sprites[i++] = new Sprite(layout.texture);
            this.addChild(sprite);
            sprite.x = layout.x;
            sprite.y = layout.y;
        }
        this.sprites = sprites;
    }
}

export class IPiece extends Piece {
    constructor() {
        super([
            {
                texture: blocks.teal,
                x: 0,
                y: 0
            },
            {
                texture: blocks.teal,
                x: Piece.BLOCK_SIZE,
                y: 0
            },
            {
                texture: blocks.teal,
                x: 2 * Piece.BLOCK_SIZE,
                y: 0
            },
            {
                texture: blocks.teal,
                x: 3 * Piece.BLOCK_SIZE,
                y: 0
            },
        ]);
    }
}

export class JPiece extends Piece {
    constructor() {
        super([
            {
                texture: blocks.blue,
                x: 0,
                y: 2 * Piece.BLOCK_SIZE
            },
            {
                texture: blocks.blue,
                x: Piece.BLOCK_SIZE,
                y: 0
            },
            {
                texture: blocks.blue,
                x: Piece.BLOCK_SIZE,
                y: Piece.BLOCK_SIZE
            },
            {
                texture: blocks.blue,
                x: Piece.BLOCK_SIZE,
                y: 2 * Piece.BLOCK_SIZE
            },
        ]);
    }
}


export class LPiece extends Piece {
    constructor() {
        super([
            {
                texture: blocks.orange,
                x: Piece.BLOCK_SIZE,
                y: 2 * Piece.BLOCK_SIZE
            },
            {
                texture: blocks.orange,
                x: 0,
                y: 0
            },
            {
                texture: blocks.orange,
                x: 0,
                y: Piece.BLOCK_SIZE
            },
            {
                texture: blocks.orange,
                x: 0,
                y: 2 * Piece.BLOCK_SIZE
            },
        ]);
    }
}

export class OPiece extends Piece {
    constructor() {
        super([
            {
                texture: blocks.yellow,
                x: 0,
                y: 0
            },
            {
                texture: blocks.yellow,
                x: Piece.BLOCK_SIZE,
                y: 0
            },
            {
                texture: blocks.yellow,
                x: 0,
                y: Piece.BLOCK_SIZE
            },
            {
                texture: blocks.yellow,
                x: Piece.BLOCK_SIZE,
                y: Piece.BLOCK_SIZE
            },
        ]);
    }
}

export class SPiece extends Piece {
    constructor() {
        super([
            {
                texture: blocks.green,
                x: Piece.BLOCK_SIZE,
                y: 0
            },
            {
                texture: blocks.green,
                x: 2 * Piece.BLOCK_SIZE,
                y: 0
            },
            {
                texture: blocks.green,
                x: 0,
                y: Piece.BLOCK_SIZE
            },
            {
                texture: blocks.green,
                x: Piece.BLOCK_SIZE,
                y: Piece.BLOCK_SIZE
            },
        ]);
    }
}

export class ZPiece extends Piece {
    constructor() {
        super([
            {
                texture: blocks.red,
                x: 0,
                y: 0
            },
            {
                texture: blocks.red,
                x: Piece.BLOCK_SIZE,
                y: 0
            },
            {
                texture: blocks.red,
                x: Piece.BLOCK_SIZE,
                y: Piece.BLOCK_SIZE
            },
            {
                texture: blocks.red,
                x: 2 * Piece.BLOCK_SIZE,
                y: Piece.BLOCK_SIZE
            },
        ]);
    }
}

export class TPiece extends Piece {
    constructor() {
        super([
            {
                texture: blocks.purple,
                x: 0,
                y: 0
            },
            {
                texture: blocks.purple,
                x: Piece.BLOCK_SIZE,
                y: 0
            },
            {
                texture: blocks.purple,
                x: 2 * Piece.BLOCK_SIZE,
                y: 0
            },
            {
                texture: blocks.purple,
                x: 1 * Piece.BLOCK_SIZE,
                y: Piece.BLOCK_SIZE
            },
        ]);
    }
}

const pieces = [
    new IPiece(),
    new JPiece(),
    new LPiece(),
    new OPiece(),
    new SPiece(),
    new ZPiece(),
    new TPiece()
];

export function randomPiece(): Piece {
    const piece = pieces[pieces.length * Math.random() | 0];
    piece.x = Border.WIDTH / 2 - piece.width / 2 + ((piece.width / 2) % Piece.BLOCK_SIZE);
    piece.y = 0;
    return piece;
}