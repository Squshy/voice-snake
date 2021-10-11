import React, { useRef, useState } from "react";
import { Snake } from "../classes/Snake";
import useInterval from "../hooks/useInterval";
import { useSetupGrid } from "../hooks/useSetupGrid";
import { SnakeNode } from "../types";
import { range } from "../utils/range";
import { GridNode } from "./GridNode";

interface GridProps {
  direction: string;
}

export const Grid: React.FC<GridProps> = ({ direction }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [snake, _] = useState<Snake>(new Snake());
  const [delay, setDelay] = useState<number | null>(1000);
  const { gridDimensions, size, gridLoading } = useSetupGrid(gridRef);
  const [__, setReDraw] = useState(false);

  useInterval(() => {
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
    setReDraw((prev) => !prev);
  }, delay);

  const displayGrid = () => {
    return range(gridDimensions.rows).map((row) =>
      range(gridDimensions.cols).map((col) => {
        var isSnake = false;
        var current: SnakeNode | null = snake.head;
        while (current !== null) {
          if (current.x === row && current.y === col) {
            isSnake = true;
            break;
          }
          current = current.prev;
        }
        return (
          <GridNode
            row={row}
            col={col}
            key={`${row} | ${col}`}
            snake={isSnake}
            food={false}
          />
        );
      })
    );
  };

  return (
    <div>
      <div
        ref={gridRef}
        className="h-96 w-96 bg-black bg-opacity-50 flex flex-wrap"
      >
        {gridLoading ? <div>loading</div> : displayGrid()}
      </div>
    </div>
  );
};
