import { Sprite, Texture } from "pixi.js";
import { Config } from "./config.js";

export class Block extends Sprite {
    readonly row: number;
    readonly col: number;
    constructor(texture: Texture, row?: number, col?: number) {
        super(texture);
        this.row = row || 0;
        this.col = col || 0;
        this.x = this.col * Config.BLOCK_SIZE;
        this.y = this.row * Config.BLOCK_SIZE;
    }
}