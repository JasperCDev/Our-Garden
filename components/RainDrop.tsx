import React, { CSSProperties, useMemo } from "react";
import styles from "./RainDrop.module.scss";

interface Props {
  className?: string;
  randomHeight: number;
  randomWidth: number;
}

export default function RainDrop(props: Props) {
  const animationDelay = useMemo(() => Math.random() * 3, []);

  return (
    <path
      className={styles.rainDrop}
      d={`M${props.randomWidth} 0 L${props.randomWidth} ${props.randomHeight}`}
      strokeDasharray={`${50 / props.randomHeight} ${
        (props.randomHeight - 50) / props.randomHeight
      }`}
      pathLength={1}
      style={
        {
          "--path-length": 1,
          "--animation-duration": `${(
            props.randomHeight / window.innerHeight
          ).toFixed(2)}s`,
          "--translate-y": `${-(props.randomHeight * 2)}px`,
          "--animation-delay": `${animationDelay}s`,
        } as CSSProperties
      }
    ></path>
  );
}
