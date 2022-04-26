import React from "react";
import { GET_CLICKS_SWR_KEY } from "../util/constants";
import { GetClicks } from "../util/GetClicksSWR";
import useCountInterval from "../util/useCountInterval";
import Tile from "./Tile";
import styles from "./Tiles.module.css";

export default function Tiles() {
  const { data } = GetClicks();
  const { setSessionClickMap } = useCountInterval(GET_CLICKS_SWR_KEY);

  return (
    <div className={styles.tiles}>
      {Object.keys(data).map((key) => {
        const clicks = data[Number(key)];
        return (
          <Tile
            key={key}
            clicks={clicks}
            setSessionClickMap={setSessionClickMap}
            id={Number(key)}
          />
        );
      })}
    </div>
  );
}
