import type { NextPage } from "next";
import { useEffect } from "react";
import useCount from "../util/useCount";

interface ClickMap {
  [key: string]: {
    clicks: number;
  };
}

const Home: NextPage = () => {
  const { count, incrementCount } = useCount();

  useEffect(() => {
    const obj: ClickMap = {};
    for (let i = 0; i < 16; i++) {
      obj[i] = { clicks: 100 };
    }
    fetch("/api/clicks2", {
      method: "PUT",
      body: JSON.stringify(obj),
    });
  }, []);

  return (
    <div>
      <div>{count}</div>
      <button onClick={incrementCount}>click me!</button>
    </div>
  );
};

export default Home;
