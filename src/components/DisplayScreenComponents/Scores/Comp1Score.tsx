import styles from "./comp1score.module.css";
import { useEffect, useState } from "react";

export default function Comp1Score(
  props: Readonly<{ id: string; winner: any }>
) {
  //   const handleKeyPress = useCallback(
  //     (event) => {
  //       const numberKeys = ["0", "1", "2", "3", "4", "5"];
  //       if (event.ctrlKey && numberKeys.some((anyKey) => event.key === anyKey)) {
  //         event.preventDefault();
  //         setAkaScore(event.key);
  //       } else if (event.key === "Backspace" && event.ctrlKey) {
  //         setAkaScore("");
  //       } else if (event.code === "Space" && event.ctrlKey) {
  //         setAkaScore("");
  //         setWinner({ aka: false, shiro: false });
  //       }
  //     },
  //     [setAkaScore]
  //   );

  //   useEffect(() => {
  //     // attach the event listener
  //     document.addEventListener("keydown", handleKeyPress);

  //     // remove the event listener
  //     return () => {
  //       document.removeEventListener("keydown", handleKeyPress);
  //     };
  //   }, [handleKeyPress]);

  const [player1Score, setPlayer1Score] = useState<number>(0);

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/match/123/");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.player1) {
       setPlayer1Score((prev) => prev + data.player1);
      }
    };

    return () => socket.close();
  }, []);

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
