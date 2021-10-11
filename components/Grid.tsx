import React, { HTMLProps, useEffect, useRef, useState } from "react";
import { Snake } from "../classes/Snake";
import useInterval from "../hooks/useInterval";
import { useSetupGrid } from "../hooks/useSetupGrid";
import { SnakeNode } from "../types";
import { range } from "../utils/range";
import { updateSnakesPosition } from "../utils/updateSnakesPosition";
import { GridNode } from "./GridNode";

type GridProps = HTMLProps<HTMLDivElement> & {
  direction: string;
};

export const Grid: React.FC<GridProps> = ({ direction, ...props }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [snake, _] = useState<Snake>(new Snake());
  const [delay, setDelay] = useState<number | null>(250);
  const { gridDimensions, gridLoading } = useSetupGrid(gridRef);
  const [gameState, setGameState] = useState<{
    won: boolean;
    lost: boolean;
    message: string;
  }>({ won: false, lost: false, message: "" });
  const [__, setReDraw] = useState(false);

  useEffect(() => {
    if (gameState.lost || gameState.won) {
      setDelay(null);
    }
  }, [gameState]);

  useInterval(() => {
    updateSnakesPosition(snake, direction);
    if (
      snake.head.x >= gridDimensions.rows ||
      snake.head.x < 0 ||
      snake.head.y >= gridDimensions.cols ||
      snake.head.y < 0
    ) {
      setGameState({ ...gameState, lost: true, message: "You lose" });
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
    <div {...props}>
      <div
        ref={gridRef}
        className="h-96 w-96 bg-black bg-opacity-50 flex flex-wrap"
      >
        {gridLoading ? <div>loading</div> : displayGrid()}
      </div>
    </div>
  );
};
