import { useEffect, useState } from "react";
import styles from "./comp2score.module.css";

export default function Comp2Score(
  props: Readonly<{ id: string; winner: any }>,
) {
  // const [shiroScore, setShiroScore] = useState(0);

  //   useEffect(() => {
  //     if (akaScore === "0") {
  //       setShiroScore(5);
  //     } else if (akaScore === "1") {
  //       setShiroScore(4);
  //     } else if (akaScore === "2") {
  //       setShiroScore(3);
  //     } else if (akaScore === "3") {
  //       setShiroScore(2);
  //     } else if (akaScore === "4") {
  //       setShiroScore(1);
  //     } else if (akaScore === "5") {
  //       setShiroScore(0);
  //     }
  //   }, [akaScore]);

  const [player2Score, setPlayer2Score] = useState<number>(0);

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/match/123/");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.player1) {
        setPlayer2Score((prev) => prev + 5 - data.player1);
      }
    };

    return () => socket.close();
  }, []);

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
