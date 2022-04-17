import type { NextPage } from "next";
import { useEffect } from "react";
import useCount from "../util/useCount";

const Home: NextPage = () => {
  const { count, incrementCount } = useCount();

  useEffect(() => {
    fetch("/api/clicks2", {
      method: "PUT",
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
