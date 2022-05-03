import React from "react";
import LeafyGreen from "./leafyGreen";
import styles from "./Plant.module.scss";

interface Props {
  count: number;
}

export default function Plant(props: Props) {
  function renderPlant() {
    switch (props.count) {
      default:
        return <LeafyGreen count={props.count} />;
    }
  }

  return (
    <div className={styles.plantContainer}>
      <svg
        viewBox="0 0 80 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.soil}
      >
        <ellipse cx="40" cy="8" rx="40" ry="8" fill="#c97c59" />
      </svg>
      {renderPlant()}
    </div>
  );
}
