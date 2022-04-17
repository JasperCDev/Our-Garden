import { useEffect, useRef, useState } from "react";
import { mutate } from "swr";
import { ScopedMutator } from "swr/dist/types";
import { updateClicks } from "../api/fetchers";
import { MILLISECONDS_SERVER_INTERVAL } from "./constants";
import { GetClicks } from "./GetClicksSWR";
import { ClickMap } from "./types";

export default function useCountInterval<T>(mutateKey: string) {
  const { data: clickMap } = GetClicks();

  const [sessionClickMap, setSessionClickMap] = useState<ClickMap>({});

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

  useEffect(() => {
    /* send user clicks to database every cycle */
    let session_click_map: ClickMap = {};
    const interval = setInterval(() => {
      session_click_map = sessionClickMapRef.current;
      updateClicks(sessionClickMapRef.current)
        .then(() => mutateRef.current(mutateKeyRef.current))
        .then(() => {
          // generate new click map who's properties are equal to the current session click map minus the closure click map we defined before we called updateClicks. This is to prevent the clicks done during this update from being lost
          const newSessionClickMap: ClickMap = {};
          for (let key in Object.keys(session_click_map)) {
            newSessionClickMap[key] = {
              clicks:
                sessionClickMapRef.current[key].clicks -
                session_click_map[key].clicks,
            };
          }

          setSessionClickMap(newSessionClickMap);
        });
    }, MILLISECONDS_SERVER_INTERVAL);
    /* ----------------------------------------- */

    // unsubscribe from interval on unmount
    return () => clearInterval(interval);
  }, []);

  return { sessionClickMap, setSessionClickMap };
}
