import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { updateClicks } from "../api/fetchers";
import { MILLISECONDS_SERVER_INTERVAL } from "../util/constants";
import GetClicks from "../util/GetClicksSWR";
import useCount from "../util/useCount";

const Home: NextPage = () => {
  const { mutate } = GetClicks();

  const [sessionClicks, setSessionClicks] = useState(0);
  const sessionClicksRef = useRef(0);
  sessionClicksRef.current = sessionClicks;
  const count = useCount(sessionClicks);

  const mutateRef = useRef(mutate);
  mutateRef.current = mutate;

  const handleButtonClick = () => {
    setSessionClicks((x) => x + 1);
  };

  useEffect(() => {
    /* send user clicks to database every second */
    const interval = setInterval(() => {
      updateClicks(sessionClicksRef.current)
        .then(() => mutateRef.current())
        .then(() => {
          // reset sessionclicks after update
          setSessionClicks(0);
        });
    }, MILLISECONDS_SERVER_INTERVAL);
    /* ----------------------------------------- */

    // unsbscribe from interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div>{count + sessionClicks}</div>
      <button onClick={handleButtonClick}>click me!</button>
    </div>
  );
};

export default Home;
