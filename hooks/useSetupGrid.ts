import { RefObject, useEffect, useLayoutEffect, useState } from "react";
import { PX_TO_REM_CONVERTER } from "../constants";
import { GridDimensions } from "../types";
import { getRemToPixelMultiplier } from "../utils/getRemToPixelMultiplier";

interface WindowSizeProps {
  height: number;
  width: number;
}

export const useSetupGrid = (gridRef: RefObject<HTMLDivElement>) => {
  const [gridLoading, setGridLoading] = useState<boolean>(false);
  const [gridDimensions, setGridDimensions] = useState<GridDimensions>({
    rows: 0,
    cols: 0,
  });

  const [size, setSize] = useState<WindowSizeProps>({ height: 0, width: 0 });
  useLayoutEffect(() => {
    function updateScreenSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", updateScreenSize);
    updateScreenSize();
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  useEffect(() => {
    setGridLoading(true);
    // setTimeout(() => {
      const newGrid: GridDimensions = {
        rows: 10,
        cols: 10,
      };
      if (gridRef.current) {
        console.log(size.width)
        const px = getRemToPixelMultiplier(size.width)
        newGrid.cols = Math.floor(
          gridRef.current.getBoundingClientRect().width / (PX_TO_REM_CONVERTER*px)
        );
        newGrid.rows = Math.floor(
          gridRef.current.getBoundingClientRect().height / (px*PX_TO_REM_CONVERTER)
        );
      }

      setGridDimensions(newGrid);
      setGridLoading(false);
    // }, 250);
  }, [size.width, size.height]);

  return { size, gridDimensions, gridLoading };
};
