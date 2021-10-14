import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "@heroicons/react/solid";
import React from "react";
import { ButtonContainer } from "./ButtonContainer";

interface ControlsProps {}

const ICON_STYLES = "w-6 h-6 text-white transition group-hover:scale-105 duration-150 ease-out";

export const Controls: React.FC<ControlsProps> = ({}) => {
  return (
    <div className="flex flex-row items-center">
      <ButtonContainer>
        <ArrowLeftIcon className={`${ICON_STYLES}`} />
      </ButtonContainer>
      <div>
        <ButtonContainer>
          <ArrowUpIcon className={`${ICON_STYLES}`} />
        </ButtonContainer>

        <ButtonContainer>
          <ArrowDownIcon className={`${ICON_STYLES}`} />
        </ButtonContainer>
      </div>
      <ButtonContainer>
        <ArrowRightIcon className={`${ICON_STYLES}`} />
      </ButtonContainer>
    </div>
  );
};
