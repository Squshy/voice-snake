import { SnakeNode } from "../types";

export class Snake {
  head: SnakeNode;

  constructor() {
    this.head = { x: 0, y: 0, next: null };
  }
}
