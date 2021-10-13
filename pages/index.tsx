import type { NextPage } from "next";
import React, { useState } from "react";
import { Game } from "../components/Game";
import { Head } from "../components/Head";
import { DIRECTIONS } from "../constants";
import { useModelSetup } from "../hooks/useModelSetup";
import { Direction } from "../types";
import { getWord } from "../utils/getWord";

const Home: NextPage = () => {
  const { recognizer, labels, loading } = useModelSetup();
  const [direction, setDirection] = useState<Direction>(DIRECTIONS.RIGHT);

  const listen = async () => {
    if (recognizer)
      await recognizer.listen(
        async (result) => {
          const curWord = getWord(
            Array.from(result.scores as Float32Array)
          ).index;
          switch (labels![curWord]) {
            case "down":
              setDirection(DIRECTIONS.DOWN);
              break;
            case "up":
              setDirection(DIRECTIONS.UP);
              break;
            case "right":
              setDirection(DIRECTIONS.RIGHT);
              break;
            case "left":
              setDirection(DIRECTIONS.LEFT);
              break;
          }
        },
        { includeSpectrogram: true, probabilityThreshold: 0.9 }
      );
  };

  const stopListening = () => {
    if (recognizer) recognizer.stopListening();
    setDirection(DIRECTIONS.RIGHT);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "Down":
      case "ArrowDown":
        setDirection(DIRECTIONS.DOWN);
        break;
      case "Up":
      case "ArrowUp":
        setDirection(DIRECTIONS.UP);
        break;
      case "Right":
      case "ArrowRight":
        setDirection(DIRECTIONS.RIGHT);
        break;
      case "Left":
      case "ArrowLeft":
        setDirection(DIRECTIONS.LEFT);
        break;
    }
  };

  if (loading)
    return <div className="bg-gray-900 min-h-screen text-white">LOADING</div>;

  return (
    <div className="bg-gray-900 p-12 flex flex-col space-y-12 min-h-screen justify-center">
      <div className="bg-gray-800 border rounded-md border-gray-700 text-white p-6 w-full items-center flex flex-col">
        <Head />
        <Game
          direction={direction}
          tabIndex={-1}
          onKeyDown={handleKeyPress}
          listen={listen}
          stopListening={stopListening}
        />
      </div>
    </div>
  );
};

export default Home;
