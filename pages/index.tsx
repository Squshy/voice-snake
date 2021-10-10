import type { NextPage } from "next";
import Head from "next/head";
import { useState, useRef } from "react";
import { getWord } from "../utils/getWord";
import { Snake } from "../classes/Snake";
import { Grid } from "../components/Grid";
import { useModelSetup } from "../hooks/useModelSetup";
import { useOnScreenResize } from "../hooks/useOnResize";

const Home: NextPage = () => {
  const [currentWord, setCurrentWord] = useState<number | null>(null);
  const { recognizer, labels, loading } = useModelSetup();
  const { height, width } = useOnScreenResize();
  const [snake, setSnake] = useState<Snake>(new Snake());
  const gridRef = useRef<HTMLDivElement>(null);

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
        <Head>
          <title>Snek</title>
          <meta name="description" content="Voice controlled Snake game" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <button onClick={() => listen()} className="p-4 border rounded-md mr-8">
          Listen
        </button>
        <button
          onClick={() => stopListening()}
          className="p-4 border rounded-md"
        >
          Stop listening
        </button>
        <div>current word:{currentWord && labels![currentWord]}</div>
        <Grid height={height} width={width} />
      </div>
    </div>
  );
};

export default Home;
