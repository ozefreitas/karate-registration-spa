import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import InfoButton from "../../components/InfoButton/InfoButton";
import { useFetchEventsData } from "../../hooks/useEventData";

export default function CompetitionsPage() {
  type Event = {
    id: string;
    name: string;
    location: string;
    competition_date: string;
  };

  const {
    data: eventsData,
    isLoading: isEventsDataLoading,
    error: eventsError,
  } = useFetchEventsData();

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
          Aqui poderá consultar todas as competições da SKI-Portugal. Mais tarde
          será também possível ver Estágios e outras provas de interesse.
          <p></p>
          Consultando cada cartão de prova, pode observar toda a informação
          relevante sobre essa prova, assim como os passos para inscrever os
          seus Atletas.
        </CardContent>
      </Card>
      <Grid container size={12}>
        {isEventsDataLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          eventsData?.data.results.map((comp: Event, index: string) => (
            <Grid key={index} size={6}>
              <Card sx={{ m: 2, border: "1px solid red" }}>
                <CardHeader title={comp.name}></CardHeader>
                <CardContent>
                  {comp.location} {comp.competition_date}
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <InfoButton
                    size="large"
                    label="Consultar"
                    to={`/competitions/${comp.id}`}
                  ></InfoButton>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}
