import React, { useEffect, useState } from "react";
import styles from "./Rain.module.scss";
import Raindrop from "components/Raindrop";

interface Props {}

type Raindrops = Array<[number, number]>;

function getRaindrops() {
  const rainDropCount = Math.floor(window.innerWidth / 5);
  const rainDrops: Raindrops = [];

  for (let i = 0; i < rainDropCount; i++) {
    const randomWidth = Math.random() * window.innerWidth;
    const randomHeight =
      Math.random() * window.innerHeight + window.innerHeight * 0.2;
    rainDrops.push([randomWidth, randomHeight]);
  }

  return rainDrops;
}

export default function Rain(props: Props) {
  const [raindrops, setRaindrops] = useState<Raindrops>([]);

  useEffect(() => {
    setRaindrops(getRaindrops());

    function onResize() {
      setRaindrops(getRaindrops());
    }

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <svg className={styles.rain} width="100%" height="100%">
      {raindrops.map(([randomWidth, randomHeight], indx) => {
        return (
          <Raindrop
            randomHeight={randomHeight}
            randomWidth={randomWidth}
            key={indx}
          />
        );
      })}
    </svg>
  );
}
