import axios from "axios";
import { useEffect, useState } from "react";

export default function CompetitionsPage() {
  type Competition = {
    name: string;
    location: string;
  };

  const [competitions, setCompetitions] = useState<Competition[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/competitions/")
      .then((response) => setCompetitions(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div>
        {competitions.map((competition) => (
          <div>{competition.name}</div>
        ))}
      </div>
    </div>
  );
}
