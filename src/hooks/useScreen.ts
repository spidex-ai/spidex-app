import { useEffect, useState } from "react";

export const SAMSUNG_FOLD_SMALL_WIDTH = 355;
export const IPAD_PRO = 1270;

export const useScreen = () => {
  const [width, setWidth] = useState(window.innerWidth);
  console.log(width);
  useEffect(() => {
    const responsive = () => setWidth(window.innerWidth);

    window.addEventListener("resize", responsive);
    window.addEventListener("orientationchange", responsive);

    return () => {
      window.removeEventListener("resize", responsive);
      window.removeEventListener("orientationchange", responsive);
    };
  }, []);

  const isMobile = width < 768;
  const isTablet = width < 1024;
  const isLaptop = width < 1280;
  const isSmallScreen = (width < 1280 && isMobile) || isTablet;
  const isGalaxyFoldSmall = width <= SAMSUNG_FOLD_SMALL_WIDTH;
  const isLargeTablet = width <= IPAD_PRO;

  return { isMobile, isTablet, isLaptop, isGalaxyFoldSmall, isLargeTablet, isSmallScreen, width };
};
