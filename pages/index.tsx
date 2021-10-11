import type { NextPage } from "next";
import React, { useState } from "react";
import { Grid } from "../components/Grid";
import { Head } from "../components/Head";
import { useModelSetup } from "../hooks/useModelSetup";
import { getWord } from "../utils/getWord";

const Home: NextPage = () => {
  const [currentWord, setCurrentWord] = useState<number | null>(null);
  const { recognizer, labels, loading } = useModelSetup();
  const [direction, setDirection] = useState<string>("right");

  const listen = async () => {
    if (recognizer)
      await recognizer.listen(
        async (result) => {
          const curWord = getWord(
            Array.from(result.scores as Float32Array)
          ).index;
          setCurrentWord(curWord);
          setDirection(labels![curWord]);
        },
        { includeSpectrogram: true, probabilityThreshold: 0.7 }
      );
  };

  const stopListening = () => {
    if (recognizer) recognizer.stopListening();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "Down":
      case "ArrowDown":
        setDirection("down");
        break;
      case "Up":
      case "ArrowUp":
        setDirection("up");
        break;
      case "Right":
      case "ArrowRight":
        setDirection("right");
        break;
      case "Left":
      case "ArrowLeft":
        setDirection("left");
        break;
      default:
        setDirection("right");
        break;
    }
  };

  if (loading)
    return <div className="bg-gray-900 min-h-screen text-white">LOADING</div>;

  return (
    <div className="bg-gray-900 p-12 flex flex-col space-y-12 items-center min-h-screen">
      <div className="bg-gray-800 border rounded-md border-gray-700 text-white p-6 w-full">
        <Head />
        <button onClick={() => listen()} className="p-4 border rounded-md mr-8">
          Listen
        </button>
        <button
          onClick={() => stopListening()}
          className="p-4 border rounded-md"
        >
          Stop listening
        </button>
        <div>current word: {currentWord && labels![currentWord]}</div>
        <Grid direction={direction} tabIndex={-1} onKeyDown={handleKeyPress} />
      </div>
    </div>
  );
};

export default Home;
