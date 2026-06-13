import { useState } from "react";
import styles from "./comp2score.module.css";
import { useDisplaySocket } from "../../../pages/DisplayPanelPages/useDisplaySocket";

export default function Comp2Score(
  props: Readonly<{ id: string; winner: any }>,
) {
  const [player2Score, setPlayer2Score] = useState<number>(0);

  useDisplaySocket((data) => {
    if (data.player1) {
      setPlayer2Score((prev) => prev + 5 - data.player1);
    }
    if (data.reset || data.nextMatch) {
      setPlayer2Score(0);
    }
  });

  return (
    <div
      className={`${styles.bigNumberContainer} ${
        props.winner.shiro ? styles.blinking : ""
      }`}
    >
      <input
        min="0"
        max="5"
        placeholder="0"
        className={`${styles.bigNumber} ${
          props.id === "aka" ? styles.white : styles.black
        }`}
        value={player2Score}
        type="number"
        readOnly
      />
    </div>
  );
}
