import React, { CSSProperties, useMemo } from "react";
import styles from "./Raindrop.module.scss";

interface Props {
  className?: string;
  randomHeight: number;
  randomWidth: number;
}

const pathLength = 1;

export default function Raindrop(props: Props) {
  const animationDelay = useMemo(() => `${Math.random() * 3}s`, []);
  const animationDuration = `${
    props.randomHeight / (window.innerHeight * 0.75)
  }s`;
  const translateY = `${-(props.randomHeight * 2)}px`;

  const strokeDasharray = `${25 / props.randomHeight} ${
    (props.randomHeight - 25) / props.randomHeight
  }`;

  const d = `M${props.randomWidth} 0 L${props.randomWidth} ${props.randomHeight}`;

  const customProperties = {
    "--path-length": pathLength,
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
