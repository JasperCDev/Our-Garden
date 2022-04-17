import React from "react";

interface Props {
  clicks: number;
}

export default function Tile(props: Props) {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "1rem",
        cursor: "pointer",
      }}
    >
      {props.clicks}
    </div>
  );
}
