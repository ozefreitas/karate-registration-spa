import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { Card, CardHeader, CardContent, Grid } from "@mui/material";
import AddButton from "../AddButton/AddButton";
import { useFetchEventData } from "../../hooks/useEventData";

export default function CompetitionCard(props: Readonly<{ eventData: any }>) {

  const {
    data: eventData,
    isLoading: isEventLoading,
    error: eventError,
  } = useFetchEventData();

  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página da Competição"
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
      <Grid sx={{ m: 4, gap: 5 }}>
        <AddButton label="Consultar Individuais" to="individuals/"></AddButton>
        {!isEventLoading && eventData?.data?.has_teams ? (
          <AddButton label="Consultar Equipas" to="teams/"></AddButton>
        ) : null}
      </Grid>
    </>
  );
}
