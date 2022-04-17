import type { NextPage } from "next";
import React from "react";
import Tiles from "../components/Tiles";
import { GET_CLICKS_SWR_KEY } from "../util/constants";
import GetClicks from "../util/GetClicksSWR";
import useCount from "../util/useCount";

const Home: NextPage = () => {
  const { data: newestCount } = GetClicks();
  const { count, incrementCount } = useCount(newestCount, GET_CLICKS_SWR_KEY);

  return (
    <div>
      <div>{count}</div>
      <button onClick={incrementCount}>click me!</button>
      <Tiles />
    </div>
  );
};

export default Home;
