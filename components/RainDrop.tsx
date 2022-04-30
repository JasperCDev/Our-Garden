import React, { CSSProperties, useMemo } from "react";
import styles from "./RainDrop.module.scss";

interface Props {
  className?: string;
  randomHeight: number;
  randomWidth: number;
}

const pathLength = 1;

export default function RainDrop(props: Props) {
  const animationDelay = useMemo(() => `${Math.random() * 3}s`, []);
  const animationDuration = `${props.randomHeight / window.innerHeight}s`;
  const translateY = `${-(props.randomHeight * 2)}px`;

  const strokeDasharray = `${50 / props.randomHeight} ${
    (props.randomHeight - 50) / props.randomHeight
  }`;

  const d = `M${props.randomWidth} 0 L${props.randomWidth} ${props.randomHeight}`;

  const customProperties = {
    "--path-length": 1,
    "--animation-duration": animationDuration,
    "--translate-y": translateY,
    "--animation-delay": animationDelay,
  } as CSSProperties;

  return (
    <path
      className={styles.rainDrop}
      d={d}
      strokeDasharray={strokeDasharray}
      pathLength={pathLength}
      style={customProperties}
    ></path>
  );
}
