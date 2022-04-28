import React, { CSSProperties, useMemo } from "react";
import styles from "./RainDrop.module.scss";

interface Props {
  className?: string;
  randomHeight: number;
  randomWidth: number;
}

export default function RainDrop(props: Props) {
  const pathLength = useMemo(() => Math.random() * 500, []);

  return (
    <path
      className={styles.rainDrop}
      d={`M${props.randomWidth} 0 L${props.randomWidth} ${props.randomHeight}`}
      strokeDasharray={`${pathLength * 0.025} ${pathLength * 0.975}`}
      pathLength={pathLength}
      style={
        {
          "--path-length": pathLength,
          "--animation-duration": `${(
            props.randomHeight / window.innerHeight
          ).toFixed(2)}s`,
        } as CSSProperties
      }
    ></path>
  );
}
