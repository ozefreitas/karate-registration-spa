import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, Grid } from "@mui/material";
import AddButton from "../../components/AddButton/AddButton";

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
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página de Atletas"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá consultar todos os seus Atletas/Alunos, e
          também Equipas. Pode consultar a informação de cada um, editar e
          remover. <p></p>
          <strong>Importante</strong>: Estes não servem como inscrição em
          qualquer prova.
        </CardContent>
      </Card>
      <AddButton label="Adicionar" to="new_athlete/"></AddButton>
    </>
  );
}
