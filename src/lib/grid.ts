import { Container, Sprite } from "pixi.js";
import { Config } from "./config.js";
import type { Piece } from "./piece.js";
import type { Block } from "./block.js";

export class Grid extends Container {
    cells: Array<boolean>;

    constructor() {
        super();
        this.cells = new Array<boolean>(Config.GRID_ROWS * Config.GRID_COLS);
        this.cells.fill(true);
    }

    isFree(row: number, col: number) {
        if (row < 0 || row > Config.GRID_ROWS)
            return false;
        if (col < 0 || col >= Config.GRID_COLS)
            return false;
        return this.cells[row * Config.GRID_COLS + col];
    }

    fill(row: number, col: number) {
        this.cells[row * Config.GRID_COLS + col] = false;
    }

    canFit(row: number, col: number, layout: ReadonlyArray<Block>): boolean {
        for (const block of layout) {
            if (!this.isFree(row + block.row, col + block.col))
                return false;
        }
        return true;
    }

    place(piece: Piece): number[] {
        for (const block of piece.layout) {
            const row = piece.row + block.row;
            const col = piece.col + block.col;
            this.fill(row, col);
            const sprite = new Sprite(block.texture);
            sprite.tint = 0xDDDDDD;
            sprite.position.set(
                (piece.col + block.col + 1) * Config.BLOCK_SIZE,
                (piece.row + block.row) * Config.BLOCK_SIZE
            );
            this.addChild(sprite);
        }
        return piece.layout.map(b => piece.row + b.row);
    }

    // isTetris(row: number): boolean {

    // }
}