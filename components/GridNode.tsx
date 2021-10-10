import React from "react";

interface GridNodeProps {
  row: number;
  col: number;
}

export const GridNode: React.FC<GridNodeProps> = ({ row, col }) => {
  return <div className="h-4 w-4" id={`row:${row} | col:${col}`}></div>;
};
