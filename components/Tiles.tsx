import React from "react";
import { GET_CLICKS_SWR_KEY } from "../util/constants";
import { GetClicks } from "../util/GetClicksSWR";
import useCountInterval from "../util/useCountInterval";
import Tile from "./Tile";

export default function Tiles() {
  const { data } = GetClicks();
  useCountInterval(GET_CLICKS_SWR_KEY);

  const dataKeys = Object.keys(data || {});

  return (
    <div style={{ display: "flex", fontSize: "1rem", flexWrap: "wrap" }}>
      {dataKeys.map((key) => {
        const clicks = data![key].clicks;
        return <Tile key={key} clicks={clicks} />;
      })}
    </div>
  );
}
