import { useState, useLayoutEffect } from "react";

interface WindowSizeProps {
  height: number;
  width: number;
}

export function useOnScreenResize(): WindowSizeProps {
  const [size, setSize] = useState<WindowSizeProps>({ height: 0, width: 0 });
  useLayoutEffect(() => {
    function updateScreenSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", updateScreenSize);
    updateScreenSize();
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);
  return size;
}
