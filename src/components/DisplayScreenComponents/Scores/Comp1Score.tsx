import { useDisplaySocket } from "../../../pages/DisplayPanelPages/useDisplaySocket";
import styles from "./comp1score.module.css";
import { useState } from "react";

export default function Comp1Score(
  props: Readonly<{ id: string; winner: any }>,
) {
  const [player1Score, setPlayer1Score] = useState<number>(0);

  useDisplaySocket((data) => {
    if (data.player1) {
      setPlayer1Score((prev) => prev + data.player1);
    }
    if (data.reset || data.nextMatch) {
      setPlayer1Score(0);
    }
  });

  return (
    <div
      className={`${styles.bigNumberContainer} ${
        props.winner.aka ? styles.blinking : ""
      }`}
    >
      <input
        min="0"
        max="5"
        placeholder="0"
        className={`${styles.bigNumber} ${
          props.id === "aka" ? styles.white : styles.black
        }`}
        value={player1Score}
        type="number"
        readOnly
      />
    </div>
  );
}
