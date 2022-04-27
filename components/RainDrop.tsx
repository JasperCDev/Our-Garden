import React, { CSSProperties, useEffect, useRef } from "react";
import styles from "./RainDrop.module.scss";

interface Props {
  className?: string;
  randomHeight: number;
  randomWidth: number;
}

export default function RainDrop(props: Props) {
  const ref = useRef<SVGPathElement>(null);

  return (
    <path
      className={styles.rainDrop}
      d={`M${props.randomWidth} 0 L${props.randomWidth} ${props.randomHeight}`}
      stroke="lightblue"
      strokeWidth="1"
      ref={ref}
      style={
        {
          "--path-length": ref?.current?.getTotalLength(),
        } as CSSProperties
      }
    ></path>
  );
}
