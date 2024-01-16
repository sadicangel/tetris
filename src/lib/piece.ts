import { Container } from "pixi.js";
import textures from "./textures.js";
import { Config } from "./config.js";
import { Block } from "./block.js";

export type RotateDirection = 'left' | 'right';

export abstract class Piece extends Container {
    readonly layouts: ReadonlyArray<ReadonlyArray<Block>>;
    layoutIndex: number;

    get layout(): ReadonlyArray<Block> {
        return this.layouts[this.layoutIndex];
    }
    get nextLayout(): ReadonlyArray<Block> {
        const nextLayoutIndex = (this.layoutIndex + 1) % this.layouts.length;
        return this.layouts[nextLayoutIndex];
    }

    get row(): number {
        return (this.y / Config.BLOCK_SIZE);
    }
    get col(): number {
        return (this.x / Config.BLOCK_SIZE) - 1;
    }

    constructor(layouts: ReadonlyArray<ReadonlyArray<Block>>) {
        super();
        this.layoutIndex = 0;
        this.layouts = layouts;
        for (const block of this.layouts[this.layoutIndex]) {
            this.addChild(block);
        }
    }

    rotateLayout(): void {
        this.removeChild(...this.layout);
        this.layoutIndex = (this.layoutIndex + 1) % this.layouts.length;
        this.addChild(...this.layout);
    }
}

export class IPiece extends Piece {
    constructor() {
        super([
            [
                new Block(textures.teal, 0, 0),
                new Block(textures.teal, 0, 1),
                new Block(textures.teal, 0, 2),
                new Block(textures.teal, 0, 3)
            ],
            [
                new Block(textures.teal, 0, 0),
                new Block(textures.teal, 1, 0),
                new Block(textures.teal, 2, 0),
                new Block(textures.teal, 3, 0)
            ]
        ]);
    }
}

export class JPiece extends Piece {
    constructor() {
        super([
            [
                new Block(textures.blue, 2, 0),
                new Block(textures.blue, 0, 1),
                new Block(textures.blue, 1, 1),
                new Block(textures.blue, 2, 1)
            ],
        ]);
    }
}


export class LPiece extends Piece {
    constructor() {
        super([
            [
                new Block(textures.orange, 0, 0),
                new Block(textures.orange, 1, 0),
                new Block(textures.orange, 2, 0),
                new Block(textures.orange, 2, 1)
            ]
        ]);
    }


}

export class OPiece extends Piece {
    constructor() {
        super([
            [
                new Block(textures.yellow, 0, 0),
                new Block(textures.yellow, 0, 1),
                new Block(textures.yellow, 1, 0),
                new Block(textures.yellow, 1, 1),
            ]
        ]);
    }


}

export class SPiece extends Piece {
    constructor() {
        super([
            [
                new Block(textures.green, 0, 1),
                new Block(textures.green, 0, 2),
                new Block(textures.green, 1, 0),
                new Block(textures.green, 1, 1),
            ]
        ]);
    }


}

export class ZPiece extends Piece {
    constructor() {
        super([
            [
                new Block(textures.red, 0, 0),
                new Block(textures.red, 0, 1),
                new Block(textures.red, 1, 1),
                new Block(textures.red, 1, 2),
            ]
        ]);
    }


}

export class TPiece extends Piece {
    constructor() {
        super([
            [
                new Block(textures.purple, 0, 0),
                new Block(textures.purple, 0, 1),
                new Block(textures.purple, 0, 2),
                new Block(textures.purple, 1, 1),
            ]
        ]);
    }


}

function makePiece() {
    switch (7 * Math.random() | 0) {
        case 0:
            return new IPiece();
        case 1:
            return new JPiece();
        case 2:
            return new LPiece();
        case 3:
            return new OPiece();
        case 4:
            return new SPiece();
        case 5:
            return new ZPiece();
        case 6:
            return new TPiece();
        default:
            throw new Error('invalid piece');
    }
}

export const randomPiece = (): Piece => {
    const piece = new IPiece(); // makePiece();
    piece.position.set(Config.APP_WIDTH / 2 - piece.width / 2 + ((piece.width / 2) % Config.BLOCK_SIZE), 0);
    return piece;
}