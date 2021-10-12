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
    this.body = new Set<string>([]);
    this.addPosition(this.head);
  }

  removePosition(node: SnakeNode) {
    this.body.delete(snakeToString(node.x, node.y));
  }

  addPosition(node: SnakeNode) {
    this.body.add(snakeToString(node.x, node.y));
    console.log("SNAKE BODY:", this.body);
  }
}
