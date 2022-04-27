import { useEffect, useRef, useState } from "react";
import { mutate } from "swr";
import { ScopedMutator } from "swr/dist/types";
import { updateClicks } from "../api/fetchers";
import { MILLISECONDS_SERVER_INTERVAL } from "./constants";
import { GetClicks } from "./GetClicksSWR";
import { ClickMap } from "./types";
import defaultClickMap from "./defaultClickMap";

let hasClicked = false;
let isActive = true;

export default function useCountInterval<T>(mutateKey: string) {
  const { data: clickMap } = GetClicks();

  const [sessionClickMap, setSessionClickMap] =
    useState<ClickMap>(defaultClickMap);

  /* state needs to be in refs so that I can access them within the setInterval callback */
  const clickMapRef = useRef({});
  clickMapRef.current = clickMap;

  const sessionClickMapRef = useRef<ClickMap>({});
  sessionClickMapRef.current = sessionClickMap;

  const mutateRef = useRef<ScopedMutator<T>>(mutate);
  mutateRef.current = mutate;

  const mutateKeyRef = useRef("");
  mutateKeyRef.current = mutateKey;
  /* ----------------------------------------------------------------------------------------------- */

  async function getAndUpdateClicks(previousSessionClickMap: ClickMap) {
    if (!isActive) return;
    if (hasClicked) {
      hasClicked = false;
      await updateClicks(sessionClickMapRef.current);
    }
    await mutateRef.current(mutateKey);
    // generate new click map who's properties are equal to the current session previous click map argument. This is to prevent the clicks done during this update from being lost
    const newSessionClickMap: ClickMap = {};
    for (let key in Object.keys(previousSessionClickMap)) {
      newSessionClickMap[key] =
        sessionClickMapRef.current[key] - previousSessionClickMap[key];
    }
    setSessionClickMap(newSessionClickMap);
  }

  useEffect(() => {
    /* send user clicks to database every cycle */
    const interval = setInterval(() => {
      getAndUpdateClicks(sessionClickMapRef.current);
    }, MILLISECONDS_SERVER_INTERVAL);
    /* ----------------------------------------- */

    let onBlur: (this: Window, ev: FocusEvent) => any;
    let onFocus: (this: Window, ev: FocusEvent) => any;
    if (typeof window !== undefined) {
      onBlur = () => {
        isActive = false;
      };

      onFocus = () => {
        isActive = true;
      };

      window.addEventListener("blur", onBlur);
      window.addEventListener("focus", onFocus);
    }
    // unsubscribe from subscriptions on unmount
    return () => {
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      clearInterval(interval);
    };
  }, []);

  function incrementSessionClickMap(id: string) {
    if (!hasClicked) {
      hasClicked = true;
    }
    setSessionClickMap((map) => {
      return {
        ...map,
        [id]: map[id] + 1,
      };
    });
  }

  return { sessionClickMap, incrementSessionClickMap };
}
