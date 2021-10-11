import { Snake } from "../classes/Snake";
import { Food } from "../types";

export const didSnakeEatFood = (snake: Snake, food: Food): boolean => {
  if (snake.head.x === food!.x && snake.head.y === food!.y) return true;
  return false;
};
