import { SnakeNode } from "../types";

export class Snake {
  head: SnakeNode;

  constructor() {
    this.head = {
      x: 0,
      y: 2,
      prev: { x: 0, y: 1, prev: { x: 0, y: 0, prev: null } },
    };
  }
}
