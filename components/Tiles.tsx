import React from "react";
import { GetClicks2 } from "../util/GetClicksSWR";
import Tile from "./tile";

export default function Tiles() {
  const { data } = GetClicks2();

  return (
    <div style={{ display: "flex", fontSize: "1rem", flexWrap: "wrap" }}>
      {Object.keys(data || {}).map((key) => {
        return <Tile key={key} clicks={data![key].clicks} />;
      })}
    </div>
  );
}
