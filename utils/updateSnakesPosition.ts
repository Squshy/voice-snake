import { Snake } from "../classes/Snake";
import { SnakeNode } from "../types";

export const updateSnakesPosition = (snake: Snake, direction: string) => {
  let current: SnakeNode | null = snake.head;
  let prevX = current.x;
  let prevY = current.y;
  current = current.prev;

  while (current !== null) {
    const tmp_x = current.x;
    const tmp_y = current.y;
    current.x = prevX;
    current.y = prevY;
    prevX = tmp_x;
    prevY = tmp_y;
    current = current.prev;
  }

  switch (direction) {
    case "left":
      snake.head.y -= 1;
      break;
    case "right":
      snake.head.y += 1;
      break;
    case "up":
      snake.head.x -= 1;
      break;
    case "down":
      snake.head.x += 1;
      break;
    default:
      snake.head.y += 1;
      break;
  }
};
