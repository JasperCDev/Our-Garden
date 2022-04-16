import type { NextPage } from "next";
import { useEffect } from "react";
import useSWR from "swr";
import { getClicks, updateClicks } from "../api/fetchers";
import useCount from "../util/useCount";

let sessionClicks = 0;

const Home: NextPage = () => {
  const { isValidating } = useSWR("/api/clicks", getClicks, {
    refreshInterval: 1000,
  });

  const count = useCount();

  const handleButtonClick = () => {
    sessionClicks++;
  };

  useEffect(() => {
    updateClicks(sessionClicks);
    sessionClicks = 0;
  }, [isValidating]);

  return (
    <div>
      <div>{count}</div>
      <button onClick={handleButtonClick}>click me!</button>
    </div>
  );
};

export default Home;
