import { useEffect, useRef, useState } from "react";
import {
  ESTIMATED_SERVER_RESPONSE_TIME_MS,
  MILLISECONDS_SERVER_INTERVAL,
} from "./constants";

export default function useCount<T>(newestCount: number) {
  // const [sessionClicks, setSessionClicks] = useState(0);

  const [currentCount, setCurrentCount] = useState(newestCount);

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
    // count from api + the users clicks that haven't been sent to the api yet
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
  }, [newestCount]);

  return { count: currentCount, incrementCount };
}