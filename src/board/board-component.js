import Creamie from "@creamie/core";
import BoardConfig from "./board-config";

const Type = {
  SPACE: 0,
  FOOD: 1,
  SNAKE: 2,
};

const BoardProps = {
  WIDHT: 60,
  HEIGHT: 60,
};

const Direction = {
  TOP: -BoardProps.HEIGHT,
  BOTTOM: BoardProps.HEIGHT,
  LEFT: -1,
  RIGHT: 1,
};

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export default class Board extends Creamie {
  constructor() {
    super(BoardConfig);
  }

  connectedCallback() {
    this.board = document.getElementById("board");
    this.cells = this.board.children;
    this.init();
    document.addEventListener("keydown", (e) => {
      let inputDirection = null;
      let isValidKey = true;
      switch (e.key) {
        case "ArrowLeft":
          inputDirection = Direction.LEFT;
          break;
        case "ArrowUp":
          inputDirection = Direction.TOP;
          break;
        case "ArrowRight":
          inputDirection = Direction.RIGHT;
          break;
        case "ArrowDown":
          inputDirection = Direction.BOTTOM;
          break;
        default:
          isValidKey = false;
      }
      isValidKey && this.setDirection(inputDirection);
    });
    this.events.init({
      reInit: () => {
        this.init();
      },
      up: () => {
        this.setDirection(Direction.TOP);
      },
      left: () => {
        this.setDirection(Direction.LEFT);
      },
      right: () => {
        this.setDirection(Direction.RIGHT);
      },
      down: () => {
        this.setDirection(Direction.BOTTOM);
      },
    });
  }

  play() {
    this.snakeRunInterval = setInterval(() => {
      this.moveSnake(this.currentDirection);
    }, this.speed);
  }

  pause() {
    clearInterval(this.snakeRunInterval);
  }

  soundHorn(type) {
    var audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3');
    audio.play();
  }

  init() {
    this.data.showPlay = false;
    this.speed = 150;
    this.data.score = 0;
    this.board.setAttribute("snake-theme", "base");
    let middleCell =
      (BoardProps.HEIGHT * BoardProps.WIDHT) / 2 + BoardProps.WIDHT / 2;
    this.snakeHead = new Node(middleCell);
    this.boundaryValue = {
      LEFT: 0,
      RIGHT: BoardProps.WIDHT - 1,
      TOP: 0,
      BOTTOM: BoardProps.WIDHT * BoardProps.HEIGHT - 1,
    };
    this.currentDirection = Direction.LEFT;
    this.snakeSet = new Set();
    [...new Array(5)].forEach(() => this.growSnake(Direction.LEFT));
    this.data.cells = new Array(BoardProps.WIDHT * BoardProps.HEIGHT).fill({
      type: Type.SPACE,
    });
    this.loop.cells.setPreprocessor((data, index) => {
      if (this.cells[index]) {
        this.cells[index].className = "";
        switch (data.type) {
          case Type.FOOD:
            this.cells[index].classList.add("d-food-color");
            break;
          case Type.SNAKE:
            this.cells[index].classList.add("d-snake-color");
            break;
        }
      }
    });
    this.drawFood();
    this.drawSnake();
    this.play();
  }

  drawSnake() {
    let tempSnake = this.snakeHead;
    while (tempSnake != null) {
      this.data.cells[tempSnake.data] = {
        type: Type.SNAKE,
      };
      tempSnake = tempSnake.next;
    }
  }

  getRandomFoodCell() {
    this.currentFoodCell = Math.ceil(
      Math.random() * (BoardProps.WIDHT * BoardProps.HEIGHT)
    );
    console.log(this.currentFoodCell);
    return this.currentFoodCell;
  }

  drawFood() {
    this.data.cells[this.getRandomFoodCell()] = {
      type: Type.FOOD,
    };
  }

  setDirection(inputDirection) {
    if (
      (this.currentDirection == Direction.LEFT &&
        inputDirection != Direction.RIGHT) ||
      (this.currentDirection == Direction.RIGHT &&
        inputDirection != Direction.LEFT) ||
      (this.currentDirection == Direction.TOP &&
        inputDirection != Direction.BOTTOM) ||
      (this.currentDirection == Direction.BOTTOM &&
        inputDirection != Direction.TOP)
    ) {
      this.currentDirection = inputDirection;
    }
  }

  moveSnake(currentDirection) {
    let tempSnake = this.snakeHead;
    let cellValue = tempSnake.data + currentDirection;
    if (!this.isSnakeDead(cellValue, currentDirection)) {
      let prevData = tempSnake.data;
      this.snakeSet.add(prevData);
      tempSnake.data = cellValue;
      tempSnake = tempSnake.next;
      while (tempSnake != null) {
        let tempData = tempSnake.data;
        tempSnake.data = prevData;
        prevData = tempData;
        tempSnake = tempSnake.next;
      }
      this.snakeSet.delete(prevData);
      this.data.cells[prevData] = {
        type: Type.SPACE,
      };
      this.drawSnake();
      if (cellValue == this.currentFoodCell) {
        this.data.score = this.data.score + 1;
        this.growSnake(currentDirection);
        this.drawFood();
      }
    } else {
      this.board.setAttribute("snake-theme", "blink");
      let endText = "Game Over!";
      console.log(endText);
      this.showMessage(endText);
      this.pause();
      this.data.showPlay = true;
    }
    let row = Math.floor(this.snakeHead.data / BoardProps.WIDHT);
    this.boundaryValue.LEFT = row * BoardProps.WIDHT;
    this.boundaryValue.RIGHT = this.boundaryValue.LEFT + BoardProps.WIDHT - 1;
  }

  growSnake(currentDirection) {
    let decidedCell = this.snakeHead.data + currentDirection;
    let newHead = new Node(decidedCell);
    this.snakeSet.add(decidedCell);
    newHead.next = this.snakeHead;
    this.snakeHead = newHead;
    this.speed--;
  }

  isSnakeDead(cellValue, currentDirection) {
    if (this.isSnakeReachedEnd(cellValue, currentDirection)) {
      console.log("Snake crashed on wall!");
      return true;
    } else if (this.snakeSet.has(cellValue)) {
      console.log("Snake bites itself!");
      return true;
    }
    return false;
  }

  isSnakeReachedEnd(cellValue, currentDirection) {
    switch (currentDirection) {
      case Direction.TOP:
        return cellValue < this.boundaryValue.TOP;
      case Direction.BOTTOM:
        return cellValue > this.boundaryValue.BOTTOM;
      case Direction.LEFT:
        return cellValue < this.boundaryValue.LEFT;
      case Direction.RIGHT:
        return cellValue > this.boundaryValue.RIGHT;
    }
    return false;
  }

  showMessage(text, color = "red-text") {
    let message = document.querySelector(".message");
    this.data.message = text;
    message.classList.add(color);
    message.style.display = "block";
    setTimeout(() => {
      message.style.display = "none";
    }, 1000);
  }
}
window.customElements.define(BoardConfig.tag, Board);
