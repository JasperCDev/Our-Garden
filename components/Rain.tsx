import React from "react";
import styles from "./Rain.module.scss";

interface Props {}

export default function Rain(props: Props) {
  return (
    <svg className={styles.rain} width="100%" height="100%">
      {new Array(100).fill(1).map((_, indx) => {
        const randomWidth = Math.random() * window.innerWidth;
        const randomHeight = Math.random() * window.innerHeight;
        return (
          <path
            key={indx}
            d={`M${randomWidth} 0 L${randomWidth} ${randomHeight}`}
            stroke="lightblue"
            strokeWidth="1"
          ></path>
        );
      })}
    </svg>
  );
}
