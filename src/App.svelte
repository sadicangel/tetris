<script lang="ts">
  import { Application } from 'pixi.js';
  import { Border } from '@lib/border.js';
  import { Piece, randomPiece } from '@/lib/piece.js';
  import controller from '@lib/controller.js';
  import { Grid } from './lib/grid.js';
  import { Config } from './lib/config.js';

  const app = new Application({ width: Config.APP_WIDTH, height: Config.APP_HEIGHT });

  const border = new Border();
  app.stage.addChild(border);

  let piece = undefined as any as Piece;
  let nextPiece = randomPiece();
  function newPiece() {
    piece = nextPiece;
    nextPiece = randomPiece();
    app.stage.addChild(piece);
  }

  const grid = new Grid();
  app.stage.addChild(grid);

  let elapsedMsHorizontal = 0;
  const horizontalMsRequired = 90;
  let elapsedMsVertical = 0;
  const rotateMsRequired = 90;
  let elapsedMsRotate = 0;
  const verticalMsRequiredDefault = 1000;
  const verticalMsRequiredSpeed = 50;

  let canMove = true;

  newPiece();

  function onUpdate(deltaTime: number) {
    let { x, y } = piece.position;
    const elapsedMS = app.ticker.elapsedMS;

    elapsedMsHorizontal += elapsedMS;
    if (elapsedMsHorizontal >= horizontalMsRequired) {
      elapsedMsHorizontal = 0;
      if (canMove) {
        const hasAnyDirectionHorizontal =
          controller.left !== controller.right || controller.leftTapped !== controller.rightTapped;
        if (hasAnyDirectionHorizontal) {
          if (controller.left || controller.leftTapped) {
            if (grid.canFit(piece.row, piece.col - 1, piece.layout)) x -= Config.BLOCK_SIZE;
          } else {
            if (grid.canFit(piece.row, piece.col + 1, piece.layout)) x += Config.BLOCK_SIZE;
          }
          controller.leftTapped = false;
          controller.rightTapped = false;
        }
      }
    }

    elapsedMsRotate += elapsedMS;
    if (elapsedMsRotate >= rotateMsRequired) {
      elapsedMsRotate = 0;
      if (controller.rotate) {
        if (grid.canFit(piece.row, piece.col, piece.nextLayout)) piece.rotateLayout();
      }
    }

    elapsedMsVertical += elapsedMS;
    const verticalMsRequired = controller.down
      ? verticalMsRequiredSpeed
      : verticalMsRequiredDefault;
    if (grid.canFit(piece.row + 1, piece.col, piece.layout)) {
      if (elapsedMsVertical >= verticalMsRequired) {
        elapsedMsVertical = 0;
        y += Config.BLOCK_SIZE;
      }
    } else if (canMove) {
      if (elapsedMsVertical >= verticalMsRequired) {
        elapsedMsVertical = 0;
        canMove = false;
      }
    } else {
      const tetris = grid.place(piece);
      if (tetris.length > 0) console.log('tetris', tetris);
      app.stage.removeChild(piece);
      newPiece();
      x = piece.x;
      y = piece.y;
      canMove = true;
    }

    piece.position.set(x, y);
  }

  app.ticker.add(onUpdate);

  // Configure bindings.
  function onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'a':
      case 'A':
      case 'ArrowLeft':
        controller.left = true;
        controller.leftTapped = true;
        controller.rightTapped = false;
        e.preventDefault();
        break;

      case 'd':
      case 'D':
      case 'ArrowRight':
        controller.right = true;
        controller.rightTapped = true;
        controller.leftTapped = false;
        e.preventDefault();
        break;

      case 's':
      case 'S':
      case 'ArrowDown':
        controller.down = true;
        e.preventDefault();
        break;

      case 'w':
      case 'W':
      case 'ArrowUp':
        controller.rotate = true;
        e.preventDefault();
        break;

      case ' ':
        app.stage.removeChild(piece);
        piece = randomPiece();
        app.stage.addChild(piece);
        e.preventDefault();
        break;
    }
  }

  function onKeyUp(e: KeyboardEvent) {
    switch (e.key) {
      case 'a':
      case 'A':
      case 'ArrowLeft':
        controller.left = false;
        e.preventDefault();
        break;

      case 'd':
      case 'D':
      case 'ArrowRight':
        controller.right = false;
        e.preventDefault();
        break;

      case 's':
      case 'S':
      case 'ArrowDown':
        controller.down = false;
        e.preventDefault();
        break;

      case 'w':
      case 'W':
      case 'ArrowUp':
        controller.rotate = false;
        e.preventDefault();
        break;
    }
  }
  window.removeEventListener('keydown', onKeyDown);
  window.removeEventListener('keyup', onKeyUp);
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  // Append to body.
  while (document.body.lastChild) {
    document.body.removeChild(document.body.lastChild);
  }
  document.body.appendChild(app.view as any);
</script>
