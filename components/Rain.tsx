import React, { useEffect, useRef } from "react";
import styles from "./Rain.module.scss";
import RainDrop from "./RainDrop";

interface Props {}

export default function Rain(props: Props) {
  return (
    <svg className={styles.rain} width="100%" height="100%">
      {new Array(200).fill(1).map((_, indx) => {
        const randomWidth = Math.random() * window.innerWidth;
        const randomHeight =
          Math.random() * window.innerHeight + window.innerHeight * 0.2;
        return (
          <RainDrop
            randomHeight={randomHeight}
            randomWidth={randomWidth}
            key={indx}
          />
        );
      })}
    </svg>
  );
}
