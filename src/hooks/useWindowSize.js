import { useState, useEffect, useCallback } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth <= 640,
    isPortrait: window.matchMedia("(orientation: portrait)").matches,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth <= 640,
      isPortrait: window.matchMedia("(orientation: portrait)").matches,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return windowSize;
};
