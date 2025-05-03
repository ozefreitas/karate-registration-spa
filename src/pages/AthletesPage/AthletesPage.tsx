import axios from "axios";
import { useEffect, useState } from "react";

export default function AthletesPage() {
  type Athlete = {
    first_name: string;
    last_name: string;
    age: number;
  };

  const [athletes, setAthletes] = useState<Athlete[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/athletes/")
      .then((response) => setAthletes(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div>
        {athletes.map((athlete) => (
          <div>{athlete.first_name}</div>
        ))}
      </div>
    </div>
  );
}
