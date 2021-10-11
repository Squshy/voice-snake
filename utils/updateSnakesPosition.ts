import { Snake } from "../classes/Snake";
import { GridDimensions, SnakeNode } from "../types";
import { snakeToString } from "./snakeToString";

// returns true if its a not losing move, false otherwise
export const updateSnakesPosition = (
  snake: Snake,
  direction: string,
  gridDimensions: GridDimensions
): boolean => {
  let current: SnakeNode | null = snake.head;
  let prevX = current.x;
  let prevY = current.y;

  // check if head would move into a wall or snake body and return false if so
  switch (direction) {
    case "left":
      if (
        snake.head.x - 1 < 0 ||
        snake.body.has(snakeToString(snake.head.x - 1, snake.head.y))
      )
        return false;
      break;
    case "right":
      if (
        snake.head.x + 1 >= gridDimensions.rows ||
        snake.body.has(snakeToString(snake.head.x + 1, snake.head.y))
      )
        return false;
      break;
    case "up":
      if (
        snake.head.y - 1 < 0 ||
        snake.body.has(snakeToString(snake.head.x, snake.head.y - 1))
      )
        return false;
      break;
    case "down":
      if (
        snake.head.y + 1 >= gridDimensions.cols ||
        snake.body.has(snakeToString(snake.head.x, snake.head.y + 1))
      )
        return false;
      break;
  }
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

  switch (direction) {
    case "left":
      snake.head.x -= 1;
      break;
    case "right":
      snake.head.x += 1;
      break;
    case "up":
      snake.head.y -= 1;
      break;
    case "down":
      snake.head.y += 1;
      break;
  }
  return true;
};
