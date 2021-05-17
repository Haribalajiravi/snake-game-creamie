/* eslint-disable max-classes-per-file */
/**
 * @author Haribalaji Ravi
 * @copyright 2021
 * License: MIT
 */
import Creamie from '@creamie/core';
import BoardConfig from './board-config';

const Type = {
  SPACE: 0,
  FOOD: 1,
  FOOD_REV: -1,
  SNAKE: 2,
};

/**
 * Food probability percentage (should be asc order)
 */
const Food = [
  {
    type: Type.FOOD,
    percentage: 70,
  },
  {
    type: Type.FOOD_REV,
    percentage: 30,
  },
].sort((a, b) => a.percentage - b.percentage);

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

const SOUND_DOMAIN = 'https://gamesounds.xyz';
const Sounds = {
  SNAKE_CRASH: `${SOUND_DOMAIN}/99Sounds/The%20Weird%20Side%20Samples%20%2899Sounds%29/Tech/Tech-07.wav`,
  SNAKE_EAT: `${SOUND_DOMAIN}/99Sounds/The%20Weird%20Side%20Samples%20%2899Sounds%29/Tech/Tech-13.wav`,
};

export default class Board extends Creamie {
  constructor() {
    super(BoardConfig);
    /* Preload sound */
    this.sounds = {};
    Object.keys(Sounds).forEach((soundKey) => {
      const aud = new Audio(Sounds[soundKey]);
      aud.preload = 'auto';
      this.sounds[soundKey] = aud;
    });
  }

  connectedCallback() {
    this.board = document.getElementById('board');
    this.cells = this.board.children;
    this.init();
    document.addEventListener('keydown', (e) => {
      let inputDirection = null;
      let isValidKey = true;
      switch (e.key) {
        case 'ArrowLeft':
          inputDirection = Direction.LEFT;
          break;
        case 'ArrowUp':
          inputDirection = Direction.TOP;
          break;
        case 'ArrowRight':
          inputDirection = Direction.RIGHT;
          break;
        case 'ArrowDown':
          inputDirection = Direction.BOTTOM;
          break;
        default:
          isValidKey = false;
      }
      if (isValidKey) {
        this.setDirection(inputDirection);
      }
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
      const front = this.directionQ.shift();
      this.moveSnake(front || this.currentDirection);
    }, this.speed);
  }

  pause() {
    clearInterval(this.snakeRunInterval);
  }

  init() {
    this.data.showPlay = false;
    this.speed = 150;
    this.data.score = 0;
    this.directionQ = [];
    this.board.setAttribute('snake-theme', 'base');
    const middleCell =
      (BoardProps.HEIGHT * BoardProps.WIDHT) / 2 +
      BoardProps.WIDHT / 2;
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
    this.data.cells = new Array(
      BoardProps.WIDHT * BoardProps.HEIGHT
    ).fill({
      type: Type.SPACE,
    });
    this.loop.cells.setPreprocessor((data, index) => {
      if (this.cells[index]) {
        this.cells[index].className = '';
        switch (data.type) {
          case Type.FOOD:
            this.cells[index].classList.add('d-food-color');
            break;
          case Type.SNAKE:
            this.cells[index].classList.add('d-snake-color');
            break;
          case Type.FOOD_REV:
            this.cells[index].classList.add('d-rev-food-color');
            break;
          default:
            this.cells[index].className = '';
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
    return this.foodInSnake(this.currentFoodCell)
      ? this.getRandomFoodCell()
      : this.currentFoodCell;
  }

  foodInSnake(foodCell) {
    return this.snakeSet.has(foodCell);
  }

  // eslint-disable-next-line class-methods-use-this
  getFoodType() {
    const randPercentage = Math.random() * 100;
    const match = Food.find(
      (food) => randPercentage <= food.percentage
    );
    return match ? match.type : Food[0].type;
  }

  drawFood() {
    this.currentFoodType = this.getFoodType();
    this.data.cells[this.getRandomFoodCell()] = {
      type: this.currentFoodType,
    };
  }

  setDirection(inputDirection, reversed = false) {
    if (
      (this.currentDirection === Direction.LEFT &&
        inputDirection !== Direction.RIGHT) ||
      (this.currentDirection === Direction.RIGHT &&
        inputDirection !== Direction.LEFT) ||
      (this.currentDirection === Direction.TOP &&
        inputDirection !== Direction.BOTTOM) ||
      (this.currentDirection === Direction.BOTTOM &&
        inputDirection !== Direction.TOP) ||
      reversed
    ) {
      this.currentDirection = inputDirection;
      this.directionQ.push(this.currentDirection);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getOppositeDirection(currentDirection) {
    switch (currentDirection) {
      case Direction.LEFT:
        return Direction.RIGHT;
      case Direction.RIGHT:
        return Direction.LEFT;
      case Direction.TOP:
        return Direction.BOTTOM;
      case Direction.BOTTOM:
        return Direction.TOP;
      default:
        return 0;
    }
  }

  moveSnake(currentDirection) {
    let tempSnake = this.snakeHead;
    const cellValue = tempSnake.data + currentDirection;
    if (!this.isSnakeDead(cellValue, currentDirection)) {
      let prevData = tempSnake.data;
      this.snakeSet.add(prevData);
      tempSnake.data = cellValue;
      tempSnake = tempSnake.next;
      while (tempSnake != null) {
        const tempData = tempSnake.data;
        tempSnake.data = prevData;
        prevData = tempData;
        tempSnake = tempSnake.next;
      }
      this.snakeSet.delete(prevData);
      this.data.cells[prevData] = {
        type: Type.SPACE,
      };
      this.drawSnake();
      if (cellValue === this.currentFoodCell) {
        this.data.score += 1;
        this.growSnake(currentDirection);
        if (this.currentFoodType === Type.FOOD_REV) {
          this.reverseSnake();
        }
        this.drawFood();
        this.sounds.SNAKE_EAT.play();
      }
    } else {
      this.sounds.SNAKE_CRASH.play();
      this.board.setAttribute('snake-theme', 'blink');
      const endText = 'Game Over!';
      // eslint-disable-next-line no-console
      console.log(endText);
      this.showMessage(endText);
      this.pause();
      this.data.showPlay = true;
    }
    const row = Math.floor(this.snakeHead.data / BoardProps.WIDHT);
    this.boundaryValue.LEFT = row * BoardProps.WIDHT;
    this.boundaryValue.RIGHT =
      this.boundaryValue.LEFT + BoardProps.WIDHT - 1;
  }

  growSnake(currentDirection) {
    const decidedCell = this.snakeHead.data + currentDirection;
    const newHead = new Node(decidedCell);
    this.snakeSet.add(decidedCell);
    newHead.next = this.snakeHead;
    this.snakeHead = newHead;
    this.speed -= 1;
  }

  isSnakeDead(cellValue, currentDirection) {
    if (this.isSnakeReachedEnd(cellValue, currentDirection)) {
      // eslint-disable-next-line no-console
      console.log('Snake crashed on wall!');
      return true;
    }
    if (this.snakeSet.has(cellValue)) {
      // eslint-disable-next-line no-console
      console.log('Snake bites itself!');
      return true;
    }
    return false;
  }

  reverseSnake() {
    let currPart = this.snakeHead;
    let prevPart = null;
    while (currPart != null) {
      const nextPart = currPart.next;
      currPart.next = prevPart;
      prevPart = currPart;
      currPart = nextPart;
    }
    this.snakeHead = prevPart;
    this.setDirection(
      this.snakeHead.data - this.snakeHead.next.data,
      true
    );
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
      default:
        return false;
    }
  }

  showMessage(text, color = 'red-text') {
    const message = document.querySelector('.message');
    this.data.message = text;
    message.classList.add(color);
    message.style.display = 'block';
    setTimeout(() => {
      message.style.display = 'none';
    }, 1000);
  }
}
window.customElements.define(BoardConfig.tag, Board);
