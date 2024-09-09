import { useState, useEffect, useCallback } from "react";

// Define the breakpoints based on Tailwind CSS

const useWindowSize = (): { windowX: number; windowY: number } => {
  const [windowSize, setWindowSize] = useState<{
    windowX: number;
    windowY: number;
  }>({
    windowX: window.innerWidth,
    windowY: window.innerHeight,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      windowX: window.innerWidth,
      windowY: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return { windowX: windowSize.windowX, windowY: windowSize.windowY };
};

export default useWindowSize;
