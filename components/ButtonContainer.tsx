import React from "react";

interface ButtonContainerProps {
  onClick: () => void;
}

export const ButtonContainer: React.FC<ButtonContainerProps> = ({
  onClick,
  children,
}) => {
  return (
    <button
      className="border-2 rounded-md border-gray-700 backdrop-filter backdrop-blur-slg bg-white bg-opacity-10 p-2 m-2 group transition hover:scale-105 ease-out"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
