import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "@heroicons/react/solid";
import React from "react";
import { DIRECTIONS } from "../constants";
import { Direction } from "../types";
import { ButtonContainer } from "./ButtonContainer";

interface ControlsProps {
  setDirection: (dir:Direction) => void;
}

const ICON_STYLES = "w-6 h-6 text-white transition group-hover:scale-105 duration-150 ease-out";

export const Controls: React.FC<ControlsProps> = ({setDirection}) => {
  return (
    <div className="flex flex-row items-center">
      <ButtonContainer onClick={() => setDirection(DIRECTIONS.LEFT)}>
        <ArrowLeftIcon className={`${ICON_STYLES}`} />
      </ButtonContainer>
      <div className="flex flex-col justify-center items-center">
        <ButtonContainer onClick={() => setDirection(DIRECTIONS.UP)}>
          <ArrowUpIcon className={`${ICON_STYLES}`} />
        </ButtonContainer>

        <ButtonContainer onClick={() => setDirection(DIRECTIONS.DOWN)}>
          <ArrowDownIcon className={`${ICON_STYLES}`} />
        </ButtonContainer>
      </div>
      <ButtonContainer onClick={() => setDirection(DIRECTIONS.RIGHT)}>
        <ArrowRightIcon className={`${ICON_STYLES}`} />
      </ButtonContainer>
    </div>
  );
};
