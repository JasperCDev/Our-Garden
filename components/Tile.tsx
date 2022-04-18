import React from "react";
import { ClickMap } from "../util/types";
import useCount from "../util/useCount";
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
  if (props.id === "15") {
    console.log(isCounting);
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
      {count}
    </div>
  );
}
