import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { Card, CardHeader, CardContent, Grid } from "@mui/material";
import AddButton from "../AddButton/AddButton";
import { useSingleFetchEventData } from "../../hooks/useEventData";

export default function CompetitionCard(props: Readonly<{ eventData: any }>) {
  const {
    data: singleEventData,
    isLoading: isSingleEventLoading,
    error: singleEventError,
  } = useSingleFetchEventData();

  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página da Competição"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
            // pb: 0
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá consultar cada cartão de prova, pode observar toda a
          informação relevante sobre essa prova, assim como os passos para
          inscrever os seus Atletas ou Equipas.
        </CardContent>
      </Card>
      <Grid container sx={{ m: 2 }}>
        <Grid size={6}>
          <Card sx={{ m: 2 }}>
            <CardHeader
              title="Informação Geral"
              sx={{
                "& .MuiCardHeader-title": {
                  fontWeight: "bold",
                },
              }}
            ></CardHeader>
            <CardContent>
              Aqui estarão os campos de informação geral, datas, epoca e
              localização
            </CardContent>
          </Card>
        </Grid>
        <Grid size={6}>
          <Grid size={12}>
            <Card sx={{ m: 2 }}>
              <CardHeader
                title="Ficheiros"
                sx={{
                  "& .MuiCardHeader-title": {
                    fontWeight: "bold",
                  },
                }}
              ></CardHeader>
              <CardContent>
                Aqui ficheiros que podem ser descarregados, cajo haja
              </CardContent>
            </Card>
          </Grid>
          <Grid size={12}>
            <Card sx={{ m: 2 }}>
              <CardHeader
                title="Notas Importantes"
                sx={{
                  "& .MuiCardHeader-title": {
                    fontWeight: "bold",
                  },
                }}
              ></CardHeader>
              <CardContent>{singleEventData?.data?.description}</CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Card sx={{ m: 2, mt: 0 }}>
            <CardHeader
              title="Ações"
              sx={{
                "& .MuiCardHeader-title": {
                  fontWeight: "bold",
                },
              }}
            ></CardHeader>
            <CardContent>
              <Grid
                container
                direction="row"
                sx={{
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  gap: 10
                }}
              >
                <AddButton
                  label="Consultar Individuais"
                  to="individuals/"
                ></AddButton>
                {!isSingleEventLoading && singleEventData?.data?.has_teams ? (
                  <AddButton label="Consultar Equipas" to="teams/"></AddButton>
                ) : null}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
