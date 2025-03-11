// board
let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

// snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let velocityX = 0;
let velocityY = 0;

// snake body
let snakeBody = [];
let snakeLength = 0;

// food
let foodX;
let foodY;

let gameOver = false;

window.onload = function () {
  board = document.getElementById('board');
  board.height = blockSize * rows;
  board.width = blockSize * cols;
  context = board.getContext('2d'); // 2d rendering context

  placeFoodRandomly();

  document.addEventListener('keyup', changeDirection);
  setInterval(updateContext, 1000 / 10);
};

function updateContext() {
  if (gameOver) return;
  // board
  context.fillStyle = 'black';
  context.fillRect(0, 0, board.width, board.height);

  // snake head
  context.fillStyle = 'red';
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]);
    snakeLength += 1;
    placeFoodRandomly();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length > 0) {
    snakeBody[0] = [snakeX, snakeY];
  }

  //   food
  context.fillStyle = 'lime';

  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);

  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  // game over conditions
  if (
    snakeX < 0 ||
    snakeX >= cols * blockSize ||
    snakeY < 0 ||
    snakeY >= rows * blockSize
  ) {
    gameOver = true;

    if (gameOver) {
      alert(`Game over! Score: ${snakeLength * 10}`);
      location.reload();
    }
  }
  for (i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
      // gameover true alert gameover reload the page
      gameOver = true;
      alert('Game Over!');
    }
  }
}

function placeFoodRandomly() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(e) {
  if (e.code === 'ArrowUp' && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code === 'ArrowDown' && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code === 'ArrowLeft' && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code === 'ArrowRight' && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  }
}
