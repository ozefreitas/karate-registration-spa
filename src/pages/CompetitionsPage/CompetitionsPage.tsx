import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import InfoButton from "../../components/InfoButton/InfoButton";

export default function CompetitionsPage() {
  type Competition = {
    id: string;
    name: string;
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
      <Card sx={{ m: 2, mt: 6 }}>
        <CardHeader
          title="Página de Competições"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá consultar todas as competições da SKI-Portugal. Mais tarde
          será também possível ver Estágios e outras provas de interesse.
          <p></p>
          Consultando cada cartão de prova, pode observar toda a informação
          relevante sobre essa prova, assim como os passos para inscrever os
          seus Atletas.
        </CardContent>
      </Card>
      <Grid container size={12}>
        {competitions.map((comp, index) => (
          <Grid key={index} size={6}>
            <Card sx={{ m: 2, border: "1px solid red" }}>
              <CardHeader title={comp.name}></CardHeader>
              <CardContent>{comp.location} {comp.competition_date}</CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <InfoButton
                  label="Consultar"
                  to={`/competition/${comp.id}`}
                ></InfoButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
