import React, { HTMLProps, useRef, useState } from "react";
import { Snake } from "../classes/Snake";
import useInterval from "../hooks/useInterval";
import { useSetupGrid } from "../hooks/useSetupGrid";
import { Direction, Food, SnakeNode } from "../types";
import { checkCollision } from "../utils/checkCollision";
import { checkForWin } from "../utils/checkForWin";
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
  const [snake, setSnake] = useState<Snake>(() => new Snake());
  const [delay, setDelay] = useState<number | null>(null);
  const { gridDimensions, gridLoading } = useSetupGrid(gridRef);
  const [gameState, setGameState] = useState<{
    won: boolean | null;
    score: number;
  }>({ won: null, score: 0 });
  const [_, setReDraw] = useState(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const maxScore = gridDimensions.rows * gridDimensions.cols - 1;
  const [food, setFood] = useState<Food>(null);

  useInterval(() => {
    if (checkCollision(snake, direction, gridDimensions)) {
      setGameState({ ...gameState, won: false });
      setDelay(null);
      setModalOpen(true);
      return;
    }
    updateSnakesPosition(snake, direction);
    if (didSnakeEatFood(snake, food)) {
      extendSnake(snake);
      if (checkForWin(gameState.score, maxScore)) {
        setGameState({ won: true, score: gameState.score });
        setDelay(null);
        setModalOpen(true);
        return;
      } else {
        setGameState((prev) => {
          return { ...prev, score: prev.score + 1 };
        });
      }
      spawnFood();
    }
    // re-render
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
            head={snake.head.x === row && snake.head.y === col}
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
    while (snake.has(xPos, yPos)) {
      xPos = Math.floor(Math.random() * gridDimensions.rows);
      yPos = Math.floor(Math.random() * gridDimensions.cols);
    }
    setFood({ x: xPos, y: yPos });
  };

  const playGame = () => {
    resetGame();
    setDelay(250);
    spawnFood();
  };

  const resetGame = () => {
    setSnake(() => new Snake());
    setGameState({ won: null, score: 0 });
  };

  return (
    <div {...props}>
      <div
        ref={gridRef}
        className="h-8 w-8 bg-black bg-opacity-50 flex flex-wrap"
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
      <button onClick={() => playGame()} className="p-4 border rounded-md m-2">
        Play
      </button>
    </div>
  );
};
