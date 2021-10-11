import React, { HTMLProps, useRef, useState } from "react";
import { Snake } from "../classes/Snake";
import useInterval from "../hooks/useInterval";
import { useSetupGrid } from "../hooks/useSetupGrid";
import { Direction, Food, SnakeNode } from "../types";
import { didSnakeEatFood } from "../utils/didSnakeEatFood";
import { extendSnake } from "../utils/extendSnake";
import { range } from "../utils/range";
import { updateSnakesPosition } from "../utils/updateSnakesPosition";
import { GameModal } from "./GameModal";
import { GridNode } from "./GridNode";

type GridProps = HTMLProps<HTMLDivElement> & {
  direction: Direction;
};

export const Grid: React.FC<GridProps> = ({ direction, ...props }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [snake, _] = useState<Snake>(new Snake());
  const [delay, setDelay] = useState<number | null>(null);
  const { gridDimensions, gridLoading } = useSetupGrid(gridRef);
  const [gameState, setGameState] = useState<{
    won: boolean | null;
    score: number;
  }>({ won: null, score: 0 });
  const [__, setReDraw] = useState(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const maxScore = gridDimensions.rows * gridDimensions.cols - 1;
  const [food, setFood] = useState<Food>(null);

  useInterval(() => {
    if (!updateSnakesPosition(snake, direction, gridDimensions)) {
      setGameState({ ...gameState, won: false });
      setDelay(null);
      setModalOpen(true);
    }
    if (didSnakeEatFood(snake, food)) {
      extendSnake(snake, gridDimensions, direction);
      setGameState({ ...gameState, score: gameState.score + 1 });
      spawnFood();
    }
    setReDraw((prev) => !prev);
  }, delay);

  const displayGrid = () => {
    return range(gridDimensions.cols).map((col) =>
      range(gridDimensions.rows).map((row) => {
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
            food={
              food ? (food.x === row && food.y === col ? true : false) : false
            }
          />
        );
      })
    );
  };

  const spawnFood = () => {
    let xPos = Math.floor(Math.random() * gridDimensions.rows);
    let yPos = Math.floor(Math.random() * gridDimensions.cols);
    // if a snake is already on that square
    while (snake.body.has(`${xPos} | ${yPos}`)) {
      xPos = Math.floor(Math.random() * gridDimensions.rows);
      yPos = Math.floor(Math.random() * gridDimensions.cols);
    }
    setFood({ x: xPos, y: yPos });
  };

  const playGame = () => {
    setDelay(250);
    spawnFood();
  };

  return (
    <div {...props}>
      <div
        ref={gridRef}
        className="h-64 w-64 bg-black bg-opacity-50 flex flex-wrap"
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
      <button onClick={() => playGame()} className="p-4 border rounded-md m-2">
        Play
      </button>
    </div>
  );
};
