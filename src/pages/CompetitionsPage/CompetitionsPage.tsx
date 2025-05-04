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
        <Grid size={6}>
          <Card sx={{ m: 2, border: "1px solid red" }}>
            <CardHeader title="OLA"></CardHeader>
            <CardActions sx={{ justifyContent: "center" }}>
              <InfoButton
                label="Consultar"
                to={`competition/${competitions[0]}`}
              ></InfoButton>
            </CardActions>
          </Card>
        </Grid>
        <Grid size={6}>
          <Card sx={{ m: 2 }}>
            <CardHeader title="OLA"></CardHeader>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
