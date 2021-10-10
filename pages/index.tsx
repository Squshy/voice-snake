import type { NextPage } from "next";
import { useState } from "react";
import { Snake } from "../classes/Snake";
import { Grid } from "../components/Grid";
import { Head } from "../components/Head";
import { useModelSetup } from "../hooks/useModelSetup";
import { getWord } from "../utils/getWord";

const Home: NextPage = () => {
  const [currentWord, setCurrentWord] = useState<number | null>(null);
  const { recognizer, labels, loading } = useModelSetup();
  const [snake, setSnake] = useState<Snake>(new Snake());

  const listen = async () => {
    if (recognizer)
      await recognizer.listen(
        async (result) => {
          setCurrentWord(
            getWord(Array.from(result.scores as Float32Array)).index
          );
        },
        { includeSpectrogram: true, probabilityThreshold: 0.7 }
      );
  };

  const stopListening = () => {
    if (recognizer) recognizer.stopListening();
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
        <Grid snake={snake} />
      </div>
    </div>
  );
};

export default Home;
