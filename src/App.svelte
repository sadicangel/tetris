<script lang="ts">
  import { Application } from 'pixi.js';
  import { Border } from '@lib/border';
  import { Piece, randomPiece } from '@/lib/piece';
  import controller from '@lib/controller';

  const { WIDTH, HEIGHT } = Border;

  const app = new Application({ width: WIDTH, height: HEIGHT });

  const border = new Border();
  app.stage.addChild(border);

  let piece = randomPiece();
  app.stage.addChild(piece);

  // Configure bindings.
  window.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'a':
      case 'A':
      case 'ArrowLeft':
        controller.left = true;
        controller.leftTapped = true;
        controller.rightTapped = false;
        break;

      case 'd':
      case 'D':
      case 'ArrowRight':
        controller.right = true;
        controller.rightTapped = true;
        controller.leftTapped = false;
        break;

      case 's':
      case 'S':
      case 'ArrowDown':
        controller.down = true;
        break;

      case 'q':
      case 'Q':
        controller.rotateLeft = true;
        break;

      case 'e':
      case 'E':
        controller.rotateLeft = true;
        break;

      case ' ':
        app.stage.removeChild(piece);
        piece = randomPiece();
        app.stage.addChild(piece);
        break;
    }
  });

  window.addEventListener('keyup', (e) => {
    switch (e.key) {
      case 'a':
      case 'A':
      case 'ArrowLeft':
        controller.left = false;
        break;

      case 'd':
      case 'D':
      case 'ArrowRight':
        controller.right = false;
        break;

      case 's':
      case 'S':
      case 'ArrowDown':
        controller.down = false;
        break;

      case 'q':
      case 'Q':
        controller.rotateLeft = false;
        break;

      case 'e':
      case 'E':
        controller.rotateLeft = false;
        break;
    }
  });

  let elapsedMsHorizontal = 0;
  const horizontalTimeRequired = 90;
  let elapsedMsVertical = 0;
  const verticalTimeRequired = 1000;

  app.ticker.add((deltaTime) => {
    let { x, y } = piece.position;
    const elapsedMS = app.ticker.elapsedMS;

    elapsedMsHorizontal += elapsedMS;
    const canMoveHorizontally = elapsedMsHorizontal >= horizontalTimeRequired;
    if (canMoveHorizontally) {
      elapsedMsHorizontal -= horizontalTimeRequired;
      const hasAnyDirectionHorizontal =
        controller.left !== controller.right || controller.leftTapped !== controller.rightTapped;
      if (hasAnyDirectionHorizontal) {
        if (controller.left || controller.leftTapped) {
          if (x > Piece.BLOCK_SIZE) x -= Piece.BLOCK_SIZE;
        } else {
          if (x + piece.width < WIDTH - Piece.BLOCK_SIZE) x += Piece.BLOCK_SIZE;
        }
        controller.leftTapped = false;
        controller.rightTapped = false;
      }
    }

    elapsedMsVertical += elapsedMS;
    const canMoveVertically = elapsedMsVertical >= verticalTimeRequired;
    if (canMoveVertically) {
      elapsedMsVertical -= verticalTimeRequired;
      y += Piece.BLOCK_SIZE;
    }

    piece.position.set(x, y);
  });

  // Append to body.
  while (document.body.lastChild) {
    document.body.removeChild(document.body.lastChild);
  }
  document.body.appendChild(app.view as any);
</script>
