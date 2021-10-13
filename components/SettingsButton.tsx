import React from "react";

interface SettingsButtonProps {
  onClick: () => void;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <button
      className="h-10 w-10 md:h-16 md:w-16 fixed z-50 flex items-center justify-center border-white text-white bg-white bg-opacity-10 border bottom-4 right-4 rounded-full border-opacity-20 focus:outline-none focus-visible:ring backdrop-filter backdrop-blur transition duration-150 ease-in-out"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
