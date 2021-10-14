import type { NextPage } from "next";
import React, { useState } from "react";
import { AboutModal } from "../components/AboutModal";
import { Controls } from "../components/Controls";
import { Game } from "../components/Game";
import { Head } from "../components/Head";
import { Settings } from "../components/Settings";
import { DIRECTIONS } from "../constants";
import { useModelSetup } from "../hooks/useModelSetup";
import { Direction } from "../types";
import { getWord } from "../utils/getWord";

const Home: NextPage = () => {
  const { recognizer, labels, loading } = useModelSetup();
  const [direction, setDirection] = useState<Direction>(DIRECTIONS.RIGHT);
  const [showAbout, setShowAbout] = useState(true);

  const listen = async () => {
    if (recognizer) {
      if (recognizer.isListening()) await recognizer.stopListening();
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
        { includeSpectrogram: true, probabilityThreshold: 0.7 }
      );
    }
  };

  const stopListening = () => {
    if (recognizer) if (recognizer.isListening()) recognizer.stopListening();
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

  const updateDirection = (direction: Direction) => {
    setDirection(direction);
  };

  return (
    <>
      <AboutModal
        canLeave={!loading}
        closeModal={() => setShowAbout(false)}
        isOpen={showAbout}
      />
      <div className="bg-gray-900 p-6 md:p-12 space-y-4 md:space-y-12 flex min-h-screen justify-center items-center flex-col">
        <div className="bg-gray-800 border rounded-md border-gray-700 text-white p-6 max-w-lg items-center flex flex-col">
          <Head />
          {!loading && (
            <Game
              direction={direction}
              tabIndex={-1}
              onKeyDown={handleKeyPress}
              listen={listen}
              stopListening={stopListening}
            />
          )}
        </div>
        <Controls setDirection={updateDirection} />
        <Settings />
      </div>
    </>
  );
};

export default Home;
