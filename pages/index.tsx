import axios from "axios";
import type { NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    axios
      .put("/api/clicks", {
        clicks: "123456789",
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);

  return <div>Hello World</div>;
};

export default Home;
