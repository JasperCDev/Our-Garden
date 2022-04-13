import axios from "axios";
import type { NextPage } from "next";
import { useEffect } from "react";
import { updateClicks } from "../api/fetchers";

const Home: NextPage = () => {
  useEffect(() => {
    updateClicks(5);
  }, []);

  return <div>Hello World</div>;
};

export default Home;
