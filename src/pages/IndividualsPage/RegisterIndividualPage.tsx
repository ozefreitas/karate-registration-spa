import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, Grid } from "@mui/material";
import AddButton from "../../components/AddButton/AddButton";

export default function RegisterIndividualPage() {
  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página de seleção de Atletas"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui terá de selecionar os Atletas que pretende levar a esta prova.
          Para isso basta marcar as caixas, e carregar em "Inscrever". À medida
          que inscreve, esses Atletas não aparecerão outra vez. Apenas pode
          selecionar 10 Atletas de cada vez, por razões de espaço/performace da
          plataforma.
        </CardContent>
      </Card>
      <Grid container sx={{ m: 2 }}></Grid>
      <Grid>
        {/* This button should get back to the individuals page */}
        <AddButton label="Inscrever" to="register/"></AddButton>
      </Grid>
    </>
  );
}
