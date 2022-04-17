import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { mutate } from "swr";
import { ScopedMutator } from "swr/dist/types";
import { updateClicks } from "../api/fetchers";
import { MILLISECONDS_SERVER_INTERVAL } from "./constants";
import { GetClicks } from "./GetClicksSWR";

export default function useCountInterval<T>(mutateKey: string) {
  const { data: clickMap } = GetClicks();

  const [sessionClickMap, setSessionClickMap] = useState({});

  /* state needs to be in refs so that I can access state within the setInterval callback */
  const clickMapRef = useRef({});
  clickMapRef.current = clickMap;

  const sessionClickMapRef = useRef({});
  sessionClickMapRef.current = sessionClickMap;

  const mutateRef = useRef<ScopedMutator<T>>(mutate);
  mutateRef.current = mutate;

  const mutateKeyRef = useRef("");
  mutateKeyRef.current = mutateKey;
  /* ----------------------------------------------------------------------------------------------- */

  useEffect(() => {
    /* send user clicks to database every cycle */
    const interval = setInterval(() => {
      updateClicks(sessionClickMapRef.current)
        .then(() => mutateRef.current(mutateKeyRef.current))
        .then(() => {
          // reset session after update
          setSessionClickMap(clickMapRef.current);
        });
    }, MILLISECONDS_SERVER_INTERVAL);
    /* ----------------------------------------- */

    // unsubscribe from interval on unmount
    return () => clearInterval(interval);
  }, []);

  return { sessionClickMap, setSessionClickMap };
}
