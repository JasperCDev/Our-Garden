import React, {
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
      stroke="lightblue"
      strokeDasharray={`${pathLength * 0.025} ${pathLength * 0.975}`}
      pathLength={pathLength}
      style={
        {
          "--path-length": pathLength,
          "--animation-duration": `${(pathLength / 500).toFixed(2)}s`,
        } as CSSProperties
      }
    ></path>
  );
}
