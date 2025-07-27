import CompetitorCard from "../../components/DisplayScreenComponents/CompetitorCard/CompetitorCard";
import { useEffect, useState } from "react";

export default function KataFinal() {
  const [ponctuation, setPonctuation] = useState<number | undefined>(undefined)
  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/match/123/");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.player1Name) {
        setPonctuation(data.player1Name);
      }
      if (data.player2Name) {
        setPonctuation(data.player2Name);
      }
    };

    return () => socket.close();
  }, []);
  return <>Kata Final</>;
}
