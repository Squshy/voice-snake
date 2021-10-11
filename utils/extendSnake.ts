import { Snake } from "../classes/Snake";
import { Direction, GridDimensions, SnakeNode } from "../types";
import { snakeToString } from "./snakeToString";

export const extendSnake = (
  snake: Snake,
  gridDimensions: GridDimensions,
  direction: Direction
) => {
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
  snake.body.add(snakeToString(newSnakeNode.x, newSnakeNode.y));
};
