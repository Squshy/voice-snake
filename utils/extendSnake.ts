import { Snake } from "../classes/Snake";
import { SnakeNode } from "../types";

export const extendSnake = (snake: Snake) => {
  let last: SnakeNode | null = snake.head;
  while (last.prev !== null) {
    last = last.prev;
  }
  let xpos: number = last.x,
    ypos: number = last.y;

  const newSnakeNode: SnakeNode = {
    x: xpos,
    y: ypos,
    prev: null,
  };

  last.prev = newSnakeNode;
  // snake.addPosition(newSnakeNode);
};
