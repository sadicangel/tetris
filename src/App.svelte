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
        break;

      case 'd':
      case 'D':
      case 'ArrowRight':
        controller.right = true;
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

  let elaspedMs = 0;
  const horizontalTimeRequired = 90;
  const verticalSpeed = 0.5;
  const verticalSpeedBonus = 5;

  app.ticker.add((deltaTime) => {
    elaspedMs += app.ticker.elapsedMS;
    const canMove = elaspedMs >= horizontalTimeRequired;
    if (canMove) elaspedMs -= horizontalTimeRequired;
    let { x, y } = piece.position;
    if (canMove && controller.left !== controller.right) {
      if (controller.left) {
        if (x > Piece.BLOCK_SIZE) x -= Piece.BLOCK_SIZE;
      } else {
        if (x + piece.width < WIDTH - Piece.BLOCK_SIZE) x += Piece.BLOCK_SIZE;
      }
    }

    // y += verticalSpeed * deltaTime;
    // if (controller.down) {
    //   y += verticalSpeedBonus * deltaTime;
    // }

    piece.position.set(x, y);
  });

  // Append to body.
  while (document.body.lastChild) {
    document.body.removeChild(document.body.lastChild);
  }
  document.body.appendChild(app.view as any);
</script>
