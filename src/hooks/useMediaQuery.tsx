import { useEffect, useLayoutEffect, useState } from "react";

export const useMediaQuery = (query?: string) => {
  const [matches, setMatches] = useState(true);
  const onResize = () => {
    const media = window.matchMedia(`${query}`);
    setMatches(media.matches);
  };
  useLayoutEffect(() => {
    onResize();
    addEventListener("resize", () => {
      onResize();
    });
    return removeEventListener("resize", () => {
      onResize();
    });
  }, []);

  return matches;
};
