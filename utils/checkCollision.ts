import { Snake } from "../classes/Snake";
import { Direction, GridDimensions} from "../types";

export const checkCollision = (
  snake: Snake,
  direction: Direction,
  gridDimensions: GridDimensions
): boolean => {
  const x = snake.head.x + direction.x;
  const y = snake.head.y + direction.y;
  const { rows, cols } = gridDimensions;
  if (x >= rows) return true;
  if (x < 0) return true;
  if (y >= cols) return true;
  if (y < 0) return true;
  return snake.has(x, y);
};
