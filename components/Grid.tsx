import React, { useRef } from "react";
import { Snake } from "../classes/Snake";
import { useSetupGrid } from "../hooks/useSetupGrid";
import { SnakeNode } from "../types";
import { range } from "../utils/range";
import { GridNode } from "./GridNode";

interface GridProps {
  snake: Snake;
}

export const Grid: React.FC<GridProps> = ({ snake }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { gridDimensions, size, gridLoading } = useSetupGrid(gridRef);

  const displayGrid = () => {
    return range(gridDimensions.rows).map((row, rowInd) =>
      range(gridDimensions.cols).map((col, colInd) => {
        var isSnake = false;
        var current: SnakeNode | null = snake.head;
        while (current !== null) {
          if (current.x === row && current.y === col) {
            isSnake = true;
            break;
          }
          current = current.next;
        }
        return (
          <GridNode
            row={row}
            col={col}
            key={`${rowInd} | ${colInd}`}
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
