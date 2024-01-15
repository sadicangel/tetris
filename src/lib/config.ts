import { Application } from "pixi.js";

const BLOCK_SIZE = 30;
const GRID_COLS = 10;
const GRID_ROWS = 20;

const GRID_WIDTH = GRID_COLS * BLOCK_SIZE;
const GRID_HEIGHT = GRID_ROWS * BLOCK_SIZE;

const SCREEN_COLS = GRID_COLS + 2;
const SCREEN_ROWS = GRID_ROWS + 1;

const APP_WIDTH = SCREEN_COLS * BLOCK_SIZE;
const APP_HEIGHT = SCREEN_ROWS * BLOCK_SIZE;

export abstract class Config {
    static readonly BLOCK_SIZE = BLOCK_SIZE;

    static readonly GRID_COLS = GRID_COLS;
    static readonly GRID_ROWS = GRID_ROWS;

    static readonly GRID_WIDTH = GRID_WIDTH;
    static readonly GRID_HEIGHT = GRID_HEIGHT;

    static readonly SCREEN_COLS = SCREEN_COLS;
    static readonly SCREEN_ROWS = SCREEN_ROWS;

    static readonly APP_WIDTH = APP_WIDTH;
    static readonly APP_HEIGHT = APP_HEIGHT;
}