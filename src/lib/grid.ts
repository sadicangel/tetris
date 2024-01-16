import { Container, Sprite } from "pixi.js";
import { Config } from "./config.js";
import type { Piece, SPiece } from "./piece.js";
import type { Block } from "./block.js";

export class Grid extends Container {
    cells: Array<Sprite | null>;

    constructor() {
        super();
        this.cells = new Array<Sprite>(Config.GRID_ROWS * Config.GRID_COLS);
        this.cells.fill(null);
    }


    isFree(index: number): boolean
    isFree(row: number, col: number): boolean
    isFree(row: number, col?: number): boolean {
        if (col) {
            if (row < 0 || row > Config.GRID_ROWS)
                return false;
            if (col < 0 || col >= Config.GRID_COLS)
                return false;
            return this.cells[row * Config.GRID_COLS + col] === null;
        }
        else {
            if (row < 0 || row > this.cells.length)
                return false;
            return this.cells[row] === null;
        }
    }

    fill(row: number, col: number, sprite: Sprite) {
        this.cells[row * Config.GRID_COLS + col] = sprite;
        sprite.tint = 0xDDDDDD;
        sprite.position.set(
            (col + 1) * Config.BLOCK_SIZE,
            (row) * Config.BLOCK_SIZE
        );
        this.addChild(sprite);
    }

    canFit(row: number, col: number, layout: ReadonlyArray<Block>): boolean {
        for (const block of layout) {
            if (!this.isFree(row + block.row, col + block.col))
                return false;
        }
        return true;
    }

    place(piece: Piece): number[] {
        const set = new Set<number>();
        for (const block of piece.layout) {
            const row = piece.row + block.row;
            const col = piece.col + block.col;
            const sprite = new Sprite(block.texture);
            this.fill(row, col, sprite);
            set.add(row);
        }
        return [...set].filter(r => this.isTetris(r)).sort((a, b) => a - b);
    }

    isTetris(row: number): boolean {
        const start = row * Config.GRID_COLS;
        const end = start + Config.GRID_COLS;
        for (let i = start; i < end; ++i) {
            if (this.isFree(i))
                return false;
        }
        return true;
    }

    clear(rows: number[]) {
        for (const row of rows) {
            const start = row * Config.GRID_COLS;
            console.log(rows, row)
            const end = start + Config.GRID_COLS;
            for (let i = start; i < end; ++i) {
                if (this.cells[i] !== null)
                    this.cells[i]!.tint = 0x333333;
            }
        }
        // const length = (rows[rows.length - 1] - rows[0] + 1) * Config.GRID_COLS;
        // for (let row = rows[rows.length - 1] + 1; row >= -1; --row) {
        //     console.log(row);
        //     const start = row * Config.GRID_COLS;
        //     const end = start + Config.GRID_COLS;
        //     for (let i = start; i < end; ++i) {
        //         const cell = this.cells[i - length] || null;
        //         this.cells[i] = cell;
        //         if (cell !== null) {
        //             cell.y = row * Config.BLOCK_SIZE;
        //         }
        //     }
        // }
    }
}