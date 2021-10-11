import { Snake } from "../classes/Snake";
import { Direction, GridDimensions, SnakeNode } from "../types";
import { checkCollision } from "./checkCollision";
import { snakeToString } from "./snakeToString";

// returns true if its a not losing move, false otherwise
export const updateSnakesPosition = (
  snake: Snake,
  direction: Direction,
  gridDimensions: GridDimensions
): boolean => {
  let current: SnakeNode | null = snake.head;
  let prevX = current.x;
  let prevY = current.y;

  // check if head would move into a wall or snake body and return false if so
  if(checkCollision(snake, direction, gridDimensions)) return false;


  current = current.prev;

  while (current !== null) {
    const tmp_x = current.x;
    const tmp_y = current.y;
    current.x = prevX;
    current.y = prevY;
    prevX = tmp_x;
    prevY = tmp_y;
    if (current.prev === null) {
      snake.body.delete(snakeToString(tmp_x, tmp_y));
    }
    current = current.prev;
  }

  snake.head.x += direction.x;
  snake.head.y += direction.y;

  return true;
};
