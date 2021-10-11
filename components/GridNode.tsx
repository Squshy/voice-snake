import React from "react";

interface GridNodeProps {
  row: number;
  col: number;
  snake: boolean;
  food: boolean;
}

export const GridNode: React.FC<GridNodeProps> = ({
  row,
  col,
  food,
  snake,
}) => {
  return (
    <div
    className={`h-4 w-4 ${snake && "bg-gray-700 border border-gray-500"} ${food && "bg-red-800"}`}
      id={`row:${row} | col:${col}`}
    ></div>
  );
};
