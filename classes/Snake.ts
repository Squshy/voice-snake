import { SnakeNode } from "../types";

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
    this.body.delete(this.toString(node.x, node.y));
  }

  addPosition(node: SnakeNode) {
    this.body.add(this.toString(node.x, node.y));
  }

  has(x: number, y: number) {
    return this.body.has(this.toString(x, y));
  }

  toString(x: number, y: number) {
    return `${x} | ${y}`;
  }
}
