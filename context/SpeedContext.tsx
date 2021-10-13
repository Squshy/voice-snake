import React, { useContext, useState, useMemo } from "react";
import { SPEEDS } from "../constants";
import { Speed } from "../types";

const SpeedContext = React.createContext<Speed>(SPEEDS[2]);
const SpeedUpdateContext = React.createContext<Function>(() => {});

export const useSpeed = () => {
  return useContext(SpeedContext);
};

export const useSpeedUpdate = () => {
  return useContext(SpeedUpdateContext);
};

export const SpeedProvider: React.FC = ({ children }) => {
  const [currentSpeed, setCurrentSpeed] = useState<Speed>(SPEEDS[2]);
  const providerValue = useMemo(
    () => ({ currentSpeed: currentSpeed, setCurrentSpeed: setCurrentSpeed }),
    [currentSpeed, setCurrentSpeed]
  );

  const updateCurrentSpeed = (speed: Speed) => {
    setCurrentSpeed(speed);
  };

  return (
    <SpeedContext.Provider value={providerValue.currentSpeed}>
      <SpeedUpdateContext.Provider value={updateCurrentSpeed}>
        {children}
      </SpeedUpdateContext.Provider>
    </SpeedContext.Provider>
  );
};
