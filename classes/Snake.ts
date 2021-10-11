import { SnakeNode } from "../types";
import { snakeToString } from "../utils/snakeToString";

export class Snake {
  head: SnakeNode;
  body: Set<string>;

  constructor() {
    this.head = {
      x: 0,
      y: 0,
      prev: null,
    };
    this.body = new Set<string>(snakeToString(this.head.x, this.head.y));
  }
}
