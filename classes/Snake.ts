import { SnakeBody } from "../types";
import { snakeToString } from "../utils/snakeToString";

export class Snake {
  body: SnakeBody[];
  locations: Set<string>;

  constructor() {
    this.body = [{x: 0, y: 0}]
    this.locations = new Set<string>(snakeToString(this.body[0].x, this.body[0].y));
  }
}
