import Rain from "components/Rain";
import type { NextPage } from "next";
import React from "react";
import Tiles from "../components/Tiles";

const Home: NextPage = () => {
  return (
    <div>
      <Rain />
      <Tiles />
    </div>
  );
};

export default Home;
