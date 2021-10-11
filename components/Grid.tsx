import React, { HTMLProps, useRef, useState } from "react";
import { Snake } from "../classes/Snake";
import useInterval from "../hooks/useInterval";
import { useSetupGrid } from "../hooks/useSetupGrid";
import { SnakeNode } from "../types";
import { range } from "../utils/range";
import { updateSnakesPosition } from "../utils/updateSnakesPosition";
import { GameModal } from "./GameModal";
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
    won: boolean | null;
    score: number;
  }>({ won: null, score: 0 });
  const [__, setReDraw] = useState(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const maxScore = gridDimensions.rows * gridDimensions.cols - 1;
  const [snakeLocations, setSnakeLocations] = useState(
    new Set<string>(`${snake.head.x} | ${snake.head.y}`)
  );

  useInterval(() => {
    if (
      !updateSnakesPosition(snake, direction, snakeLocations, gridDimensions)
    ) {
      setGameState({ ...gameState, won: false });
      setDelay(null);
      setModalOpen(true);
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
      <GameModal
        isOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        hasWon={gameState.won}
        score={gameState.score}
        maxScore={maxScore}
      />
      <button onClick={() => setModalOpen((prev) => !prev)}>Toggle</button>
      <button
        onClick={() => setDelay(250)}
        className="p-4 border rounded-md m-2"
      >
        Play
      </button>
    </div>
  );
};
