import React from "react";

interface GridNodeProps {
  snake: boolean;
  head: boolean;
  food: boolean;
}

export const GridNode: React.FC<GridNodeProps> = ({
  food,
  head,
  snake,
}) => {
  return (
    <div
      className={`h-4 w-4 md:h-8 md:w-8 ${
        snake ? " bg-green-700 border border-green-500 rounded-md" : food ? " bg-red-800 rounded-lg border-red-300 border" : ''
      } ${head ? " bg-green-300 rounded-md" : ''}`}
    ></div>
  );
};
