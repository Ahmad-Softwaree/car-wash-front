import { ScreenSizes } from "@/types/global";
import { useState, useEffect, useCallback } from "react";

// Define the breakpoints based on Tailwind CSS
const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const getScreenSize = (width: number): ScreenSizes => {
  if (width >= breakpoints.xl) return "xl";
  if (width >= breakpoints.lg) return "lg";
  if (width >= breakpoints.md) return "md";
  if (width >= breakpoints.sm) return "sm";
  return "xs";
};

const useScreenSize = (): { size: ScreenSizes } => {
  const [screenSize, setScreenSize] = useState<ScreenSizes>(
    getScreenSize(window.innerWidth)
  );

  const handleResize = useCallback(() => {
    setScreenSize(getScreenSize(window.innerWidth));
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return { size: screenSize };
};

export default useScreenSize;
