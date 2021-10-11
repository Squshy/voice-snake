import { SnakeNode } from "../types";

export class Snake {
  head: SnakeNode;

  constructor() {
    this.head = { x: 0, y: 2, prev: null };
    this.head.prev = { x: 0, y: 1, prev: null };
  }
}
