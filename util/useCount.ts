import { useCallback, useEffect, useRef, useState } from "react";
import {
  ESTIMATED_SERVER_RESPONSE_TIME_MS,
  MILLISECONDS_SERVER_INTERVAL,
} from "./constants";
import GetClicks from "./getClicksSWR";

export default function useCount() {
  const { data: newestCount } = GetClicks();

  /* state needs to be in a ref so that I can access state within the requestAnimationFrame callback */
  const newestCountRef = useRef(0);
  newestCountRef.current = newestCount;
  /* ----------------------------------------------------------------------------------------------- */

  const [currentCount, setCurrentCount] = useState(newestCount);

  const animateCount = useCallback(() => {
    if (!newestCountRef.current) return;

    if (newestCountRef.current <= currentCount) return;

    let previousCount = currentCount;

    const range = newestCountRef.current - previousCount;

    let startTime: number;

    const callback = (currentTime: number) => {
      // initialize start time if not already initialized
      if (startTime === undefined) {
        startTime = currentTime;
      }

      const timePassed = currentTime - startTime;

      let progress =
        timePassed /
        (MILLISECONDS_SERVER_INTERVAL + ESTIMATED_SERVER_RESPONSE_TIME_MS);

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
  }, [currentCount]);

  useEffect(() => {
    animateCount();
  }, [animateCount, newestCount]);

  return currentCount;
}
