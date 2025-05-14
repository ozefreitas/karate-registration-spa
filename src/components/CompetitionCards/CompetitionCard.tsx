import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import AddButton from "../AddButton/AddButton";

export default function CompetitionCard() {
  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página de Competições"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá consultar cada cartão de prova, pode observar toda a
          informação relevante sobre essa prova, assim como os passos para
          inscrever os seus Atletas ou Equipas.
        </CardContent>
      </Card>
      <Grid>
        <AddButton label="Consultar Individuais" to="individuals/"></AddButton>
      </Grid>
      <Grid>
        <AddButton label="Consultar Equipas" to="teams/"></AddButton>
      </Grid>
    </>
  );
}
