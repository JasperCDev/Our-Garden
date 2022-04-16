import type { NextPage } from "next";
import { useEffect } from "react";
import { updateClicks } from "../api/fetchers";
import useCount from "../util/useCount";

let sessionClicks = 0;

const Home: NextPage = () => {
  const count = useCount();

  const handleButtonClick = () => {
    sessionClicks++;
  };

  useEffect(() => {
    /* send user clicks to database every second */
    const interval = setInterval(() => {
      updateClicks(sessionClicks);
      // reset sessionclicks after update
      sessionClicks = 0;
    }, 1000);
    /* ----------------------------------------- */

    // unsbscribe from interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div>{count}</div>
      <button onClick={handleButtonClick}>click me!</button>
    </div>
  );
};

export default Home;
