import React, { HTMLProps, useEffect, useRef, useState } from "react";
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

type GameProps = HTMLProps<HTMLDivElement> & {
  direction: Direction;
  listen: () => void;
  stopListening: () => void;
};

export const Game: React.FC<GameProps> = ({
  direction,
  listen,
  stopListening,
  ...props
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const [snake, setSnake] = useState<Snake>(() => new Snake());
  const [delay, setDelay] = useState<number | null>(null);
  const { gridDimensions, size } = useSetupGrid(gridRef);
  const [gameState, setGameState] = useState<{
    won: boolean | null;
    score: number;
  }>({ won: null, score: 0 });
  const [_, setReDraw] = useState(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [food, setFood] = useState<Food>(null);
  const maxScore = gridDimensions.rows * gridDimensions.cols - 1;

  // when the width changes, reset game and redraw seeing as responsive values could have changed
  useEffect(() => {
    resetGame();
    setDelay(null);
  }, [size.width]);

  useInterval(() => {
    if (checkCollision(snake, direction, gridDimensions)) {
      setGameState({ ...gameState, won: false });
      endGame();
      return;
    }
    updateSnakesPosition(snake, direction);
    if (didSnakeEatFood(snake, food)) {
      extendSnake(snake);
      if (checkForWin(gameState.score, maxScore)) {
        setGameState({ won: true, score: gameState.score });
        endGame();
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
    if (gameContainerRef.current) {
      gameContainerRef.current.focus();
    }
    resetGame();
    setDelay(250);
    listen();
    spawnFood();
  };

  const resetGame = () => {
    setSnake(() => new Snake());
    setGameState({ won: null, score: 0 });
  };

  const endGame = () => {
    stopListening();
    setDelay(null);
    setModalOpen(true);
  };

  return (
    <div
      {...props}
      ref={gameContainerRef}
      className="flex focus:outline-none focus-visible:outline-none flex-col space-y-6"
    >
      <div className="flex h-60 w-60 md:h-96 md:w-96 items-center relative z-0">
        <div
          ref={gridRef}
          className="bg-black w-full h-full bg-opacity-50 flex flex-wrap"
        >
          {displayGrid()}
        </div>
        {delay === null && (
          <div className="absolute inset-0 flex justify-center items-center z-10 backdrop-filter backdrop-blur-sm ">
            <button
              onClick={() => playGame()}
              className="p-4 border rounded-md bg-green-500 border-green-400 w-3/4 h-14"
            >
              Play
            </button>
          </div>
        )}
      </div>
      <GameModal
        isOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        hasWon={gameState.won}
        score={gameState.score}
        maxScore={maxScore}
      />
      <div className="p-4 border rounded-md w-full bg-black bg-opacity-25 border-opacity-25 flex justify-center justify-evenly text-center">
        <h3 className="text-md font-semibold w-full">Score: {gameState.score}</h3>
        <h3 className="text-md font-semibold w-full">Speed: {}</h3>
      </div>
    </div>
  );
};
