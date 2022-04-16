import { useEffect, useRef, useState } from "react";
import { updateClicks } from "../api/fetchers";
import {
  ESTIMATED_SERVER_RESPONSE_TIME_MS,
  MILLISECONDS_SERVER_INTERVAL,
} from "./constants";
import GetClicks from "./GetClicksSWR";

export default function useCount() {
  const { data: newestCount, mutate } = GetClicks();
  const [sessionClicks, setSessionClicks] = useState(0);

  const [currentCount, setCurrentCount] = useState(newestCount);

  /* state needs to be in refs so that I can access state within the requestAnimationFrame callback */
  const newestCountRef = useRef(0);
  newestCountRef.current = newestCount;

  const sessionClicksRef = useRef(0);
  sessionClicksRef.current = sessionClicks;

  const mutateRef = useRef(mutate);
  mutateRef.current = mutate;

  const currentCountRef = useRef(0);
  currentCountRef.current = currentCount;
  /* ----------------------------------------------------------------------------------------------- */

  const incrementCount = () => {
    setSessionClicks((x) => x + 1);
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

  useEffect(() => {
    /* send user clicks to database every second */
    let session_clicks: number;
    const interval = setInterval(() => {
      session_clicks = sessionClicksRef.current;

      updateClicks(session_clicks)
        .then(() => mutateRef.current())
        .then(() => {
          // reset sessionclicks after update
          setSessionClicks((x) => x - session_clicks);
        });
    }, MILLISECONDS_SERVER_INTERVAL);
    /* ----------------------------------------- */

    // unsubscribe from interval on unmount
    return () => clearInterval(interval);
  }, []);

  return { count: currentCount, incrementCount };
}
