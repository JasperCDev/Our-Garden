import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";
import Tiles from "../components/Tiles";
const Rain = dynamic(() => import("../components/Rain"), { ssr: false });

const Home: NextPage = () => {
  return (
    <div>
      <Rain />
      <Tiles />
    </div>
  );
};

export default Home;
