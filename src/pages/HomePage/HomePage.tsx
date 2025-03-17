import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./homepage.module.css";

export default function HomePage() {
  type Competition = {
    name: string;
    season: string;
    location: string;
    competition_date: string;
  };

  const [competitions, setCompetitions] = useState<Competition[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/competitions/")
      .then((response) => setCompetitions(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <h1>Interface de registos</h1>
      <p>Escolha uma prova para inscrever os seus atletas:</p>
      <div className={styles.competition_card_selector}>
        {competitions.map((competition, i) => (
          <div key={i} className={styles.competition_card}>
            {competition.name} {competition.season}
            <p className={styles.quick_info}>
              <span>{competition.competition_date}</span>
              <span>{competition.location}</span>
            </p>
            <button className="default-button">Consultar</button>
          </div>
        ))}
      </div>
    </>
  );
}
