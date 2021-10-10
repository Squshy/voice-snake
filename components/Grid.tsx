import React, { useEffect, useRef, useState } from "react";
import { PX_TO_REM_CONVERTER } from "../constants";
import { GridDimensions } from "../types";
import { range } from "../utils/range";
import { GridNode } from "./GridNode";

interface GridProps {
  height: number;
  width: number;
}

export const Grid: React.FC<GridProps> = ({ height, width }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [loadingGrid, setLoadingGrid] = useState<boolean>(false);
  const [gridDimensions, setGridDimensions] = useState<GridDimensions>({
    rows: 0,
    cols: 0,
  });

  useEffect(() => {
    setLoadingGrid(true);
    setTimeout(() => {
      const newGrid: GridDimensions = {
        rows: 5,
        cols: 0,
      };
      if (gridRef.current) {
        newGrid.cols = Math.floor(
          gridRef.current.getBoundingClientRect().width / PX_TO_REM_CONVERTER
        );
        newGrid.rows = Math.floor(
          gridRef.current.getBoundingClientRect().height / PX_TO_REM_CONVERTER
        );
      }

      setGridDimensions(newGrid);
      setLoadingGrid(false);
    }, 250);
  }, [width, height]);

  const displayGrid = () => {
    return range(gridDimensions.rows).map((row, rowInd) =>
      range(gridDimensions.cols).map((col, colInd) => (
        <GridNode row={row} col={col} key={`${rowInd} | ${colInd}`} />
      ))
    );
  };

  return (
    <div>
      <div
        ref={gridRef}
        className="h-96 w-96 bg-black bg-opacity-50 flex flex-wrap"
      >
        {displayGrid()}
      </div>
    </div>
  );
};
