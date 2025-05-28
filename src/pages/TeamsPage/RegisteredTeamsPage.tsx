import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, Grid } from "@mui/material";
import AddButton from "../../components/AddButton/AddButton";

export default function RegisteredTeamsPage() {
  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página de inscritos em Equipas"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá consultar todos os Atletas que estão inscritos para a
          prova que selecionou (ver abaixo). Alterar informações de um Atleta
          irá modificar o próprio Atleta, e não apenas a própria inscrição (são
          a mesma coisa).
        </CardContent>
      </Card>
      <Grid container sx={{ m: 2 }}></Grid>
      <Grid sx={{ m: 4 }}>
        <AddButton label="Adicionar" to="register/"></AddButton>
      </Grid>
    </>
  );
}
