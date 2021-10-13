import { useEffect, useState } from "react";
import * as speechCommands from "@tensorflow-models/speech-commands";
import { RecordType } from "../types";
import { getLabelRecord } from "../utils/getLabelRecord";
import * as tf from "@tensorflow/tfjs";

export const useModelSetup = () => {
  const [recognizer, setRecognizer] =
    useState<speechCommands.SpeechCommandRecognizer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [labels, setLabels] = useState<RecordType | null>(null);
  useEffect(() => {
    async function loadRecognizer() {
      setLoading(true);
      await tf.getBackend();
      const rec = await speechCommands.create("BROWSER_FFT");
      await rec.ensureModelLoaded();
      const labelRecord = await getLabelRecord(rec.wordLabels());
      setLabels(labelRecord);
      setRecognizer(rec);
      setLoading(false);
    }
    loadRecognizer();
  }, []);

  return { recognizer, labels, loading}
};
