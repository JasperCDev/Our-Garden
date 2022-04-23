import React from "react";
import { ClickMap } from "../util/types";
import useCount from "../util/useCount";
import Plant from "./Plant";
import styles from "./Tile.module.css";

interface Props {
  clicks: number;
  setSessionClickMap: React.Dispatch<React.SetStateAction<ClickMap>>;
  id: string;
}

export default function Tile(props: Props) {
  const { incrementCount, count, isCounting } = useCount(props.clicks);

  function handleClick() {
    props.setSessionClickMap((map) => {
      return {
        ...map,
        [props.id]: {
          clicks: map[props.id].clicks + 1,
        },
      };
    });
    incrementCount();
  }

  return (
    <div
      className={styles.tile}
      onClick={handleClick}
      style={
        {
          "--background-color": isCounting ? "lightcyan" : "white",
        } as React.CSSProperties
      }
    >
      <Plant count={count} />
      <h1>{count}</h1>
    </div>
  );
}
