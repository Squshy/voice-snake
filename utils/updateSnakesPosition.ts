import { Snake } from "../classes/Snake";
import { Direction, SnakeNode } from "../types";

// returns true if its a not losing move, false otherwise
export const updateSnakesPosition = (
  snake: Snake,
  direction: Direction
): boolean => {
  // if the snake is only the head remove its position so we can update it after
  if (snake.head.prev === null) snake.removePosition(snake.head);
  else {
    let current: SnakeNode | null = snake.head;
    let prevX = current.x;
    let prevY = current.y;

    current = current.prev;
    while (current !== null) {
      const tmp_x = current.x;
      const tmp_y = current.y;
      // Remove the last snake body
      if (current.prev === null) snake.removePosition(current);
      current.x = prevX;
      current.y = prevY;
      prevX = tmp_x;
      prevY = tmp_y;

      current = current.prev;
    }
  }
  
  snake.head.x += direction.x;
  snake.head.y += direction.y;
  snake.addPosition(snake.head);
  return true;
};
