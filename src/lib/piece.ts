import { Container, IPointData, ObservablePoint, Sprite, Texture, TextureUvs } from "pixi.js";
import blocks from "./blocks";
import { Border } from "./border";
import { Grid } from "./grid";
import { Config } from "./config";

export type RotateDirection = 'left' | 'right';

export type BlockPosition = { col: number, row: number };
export type BlockPositionWithSprite = BlockPosition & { sprite: Sprite };

export type Layout = BlockPosition[];
export type LayoutWithSprite = BlockPositionWithSprite[];

export abstract class Piece extends Container {
    readonly blocks: number;
    readonly layout: LayoutWithSprite;
    readonly sprites: ReadonlyArray<Sprite>;

    get row(): number { return (this.y / Config.BLOCK_SIZE); }
    get col(): number { return (this.x / Config.BLOCK_SIZE) - 1; }

    constructor(texture: Texture, layout: Layout) {
        super();
        this.layout = [];
        this.blocks = this.layout.length;
        const sprites = new Array<Sprite>(this.blocks);
        let i = 0;
        for (const { row, col } of layout) {
            const sprite = sprites[i++] = new Sprite(texture);
            this.addChild(sprite);
            sprite.x = col * Config.BLOCK_SIZE;
            sprite.y = row * Config.BLOCK_SIZE;
            this.layout.push({
                row: row,
                col: col,
                sprite: sprite
            })
        }
        this.sprites = sprites;
    }

    abstract rotate(): void;
}

export class IPiece extends Piece {
    static readonly HORIZONTAL = [
        {
            col: 0,
            row: 0
        },
        {
            col: 1,
            row: 0
        },
        {
            col: 2,
            row: 0
        },
        {
            col: 3,
            row: 0
        },
    ];
    static readonly VERTICAL = [
        {
            col: 0,
            row: 0
        },
        {
            col: 0,
            row: 1
        },
        {
            col: 0,
            row: 2
        },
        {
            col: 0,
            row: 3
        },
    ];
    constructor() {
        super(blocks.teal, IPiece.HORIZONTAL);
    }

    override rotate(): void {
        for (const block of this.layout) {
            const temp = block.row;
            block.row = block.col;
            block.col = temp;
            block.sprite.position.set(
                block.sprite.x = block.col * Config.BLOCK_SIZE,
                block.sprite.y = block.row * Config.BLOCK_SIZE
            );
        }
    }
}

export class JPiece extends Piece {
    constructor() {
        super(blocks.blue, [
            {
                col: 0,
                row: 2
            },
            {
                col: 1,
                row: 0
            },
            {
                col: 1,
                row: 1
            },
            {
                col: 1,
                row: 2
            },
        ]);
    }

    override rotate(): void {

    }
}


export class LPiece extends Piece {
    constructor() {
        super(blocks.orange, [
            {
                col: 1,
                row: 2
            },
            {
                col: 0,
                row: 0
            },
            {
                col: 0,
                row: 1
            },
            {
                col: 0,
                row: 2
            },
        ]);
    }

    override rotate(): void {

    }
}

export class OPiece extends Piece {
    constructor() {
        super(blocks.yellow, [
            {
                col: 0,
                row: 0
            },
            {
                col: 1,
                row: 0
            },
            {
                col: 0,
                row: 1
            },
            {
                col: 1,
                row: 1
            },
        ]);
    }

    override rotate(): void {

    }
}

export class SPiece extends Piece {
    constructor() {
        super(blocks.green, [
            {
                col: 1,
                row: 0
            },
            {
                col: 2,
                row: 0
            },
            {
                col: 0,
                row: 1
            },
            {
                col: 1,
                row: 1
            },
        ]);
    }

    override rotate(): void {

    }
}

export class ZPiece extends Piece {
    constructor() {
        super(blocks.red, [
            {
                col: 0,
                row: 0
            },
            {
                col: 1,
                row: 0
            },
            {
                col: 1,
                row: 1
            },
            {
                col: 2,
                row: 1
            },
        ]);
    }

    override rotate(): void {

    }
}

export class TPiece extends Piece {
    constructor() {
        super(blocks.purple, [
            {
                col: 0,
                row: 0
            },
            {
                col: 1,
                row: 0
            },
            {
                col: 2,
                row: 0
            },
            {
                col: 1,
                row: 1
            },
        ]);
    }

    override rotate(): void {

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
    const piece = makePiece();
    piece.position.set(Config.APP_WIDTH / 2 - piece.width / 2 + ((piece.width / 2) % Config.BLOCK_SIZE), 0);
    return piece;
}