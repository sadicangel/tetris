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

    getCellAt(row: number, col: number): Sprite | null {
        return this.cells[row * Config.GRID_COLS + col] || null;
    }

    setCellAt(row: number, col: number, cell: Sprite | null): void {
        if (row < 0 || row >= Config.GRID_ROWS)
            return;
        if (col < 0 || col >= Config.GRID_COLS)
            return;
        this.cells[row * Config.GRID_COLS + col] = cell;
    }

    isFree(index: number): boolean
    isFree(row: number, col: number): boolean
    isFree(row: number, col?: number): boolean {
        if (typeof col === 'number') {
            if (row < 0 || row >= Config.GRID_ROWS)
                return false;
            if (col < 0 || col >= Config.GRID_COLS)
                return false;
            return this.cells[row * Config.GRID_COLS + col] === null;
        }
        else {
            if (row < 0 || row >= this.cells.length)
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

    removeRow(row: number) {
        const start = row * Config.GRID_COLS;
        const end = start + Config.GRID_COLS;
        for (let i = start; i < end; ++i) {
            const cell = this.cells[i];
            if (cell !== null)
                this.removeChild(cell);
        }
    }

    moveRow(row: number, offset: number) {
        for (let col = 0; col < Config.GRID_COLS; ++col) {
            const cell = this.getCellAt(row - offset, col);
            this.setCellAt(row, col, cell);
            if (cell !== null)
                cell.y = row * Config.BLOCK_SIZE;
        }
    }

    clear(rows: number[]) {
        for (const row of rows) {
            this.removeRow(row);
        }
        const index = rows[rows.length - 1];
        const offset = index - rows[0] + 1;
        for (let i = index; i >= 0; --i) {
            this.moveRow(i, offset);
        }
    }
}