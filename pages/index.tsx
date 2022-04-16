import type { NextPage } from "next";
import useCount from "../util/useCount";

const Home: NextPage = () => {
  const { count, incrementCount } = useCount();

  return (
    <div>
      <div>{count}</div>
      <button onClick={incrementCount}>click me!</button>
    </div>
  );
};

export default Home;
