import React from "react";
import { ClickMap } from "../util/types";
import useCount from "../util/useCount";
import Plant from "./Plant";
import styles from "./Tile.module.css";

interface Props {
  clicks: number;
  incrementSessionClickMap: (id: string) => void;
  id: string;
}

export default function Tile(props: Props) {
  const { incrementCount, count, isCounting } = useCount(props.clicks);

  function handleClick() {
    props.incrementSessionClickMap(props.id);
    incrementCount();
  }

  return (
    <div
      className={styles.tile}
      onClick={handleClick}
      style={
        {
          "--background-color": isCounting ? "lightcyan" : "transparent",
        } as React.CSSProperties
      }
    >
      <Plant count={count} />
      <h2>{count}</h2>
    </div>
  );
}
