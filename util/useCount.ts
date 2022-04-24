import { useEffect, useRef, useState } from "react";
import { MILLISECONDS_SERVER_INTERVAL } from "./constants";

export default function useCount(newestCount: number) {
  const [currentCount, setCurrentCount] = useState(0);

  /* state needs to be in refs so that I can access state within the requestAnimationFrame callback */
  const newestCountRef = useRef(0);
  newestCountRef.current = newestCount;

  const currentCountRef = useRef(0);
  currentCountRef.current = currentCount;
  /* ----------------------------------------------------------------------------------------------- */

  const incrementCount = () => {
    setCurrentCount((x) => x + 1);
  };

  useEffect(() => {
    let previousCount = currentCountRef.current;

    if (newestCountRef.current <= previousCount) {
      return;
    }

    const range = newestCountRef.current - previousCount;

    let startTime: number;

    const callback = (currentTime: number) => {
      // initialize start time if not already initialized
      if (startTime === undefined) {
        startTime = currentTime;
      }

      const timePassed = currentTime - startTime;

      let progress = timePassed / MILLISECONDS_SERVER_INTERVAL;

      // don't let progress go above 1
      if (progress > 1) progress = 1;

      // set state and round to avoid decimals
      setCurrentCount(previousCount + Math.round(progress * range));

      // if progress is not complete, then recurse
      if (progress !== 1) {
        requestAnimationFrame(callback);
      }
    };

    // run recursive animation
    requestAnimationFrame(callback);
  }, [newestCount]);

  return {
    count: currentCount,
    incrementCount,
    // if we still need to count up to the newest count, then isCounting should be true
    isCounting: newestCount > currentCount,
  };
}
