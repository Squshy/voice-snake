import { Snake } from "../classes/Snake";
import { Direction, GridDimensions, SnakeNode } from "../types";

export const checkCollision = (
  snake: Snake,
  direction: Direction,
  gridDimensions: GridDimensions
): boolean => {
  const updatedSnake: SnakeNode = {
    x: snake.head.x + direction.x,
    y: snake.head.y + direction.y,
    prev: snake.head.prev,
  };
  const { rows, cols } = gridDimensions;

  if (updatedSnake.x >= rows) return true;
  if (updatedSnake.x < 0) return true;
  if (updatedSnake.y >= cols) return true;
  if (updatedSnake.y < 0) return true;
  return false;
};
