import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Button,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import SettingsButton from "../../components/Buttons/SettingsButton";
import { useFetchEventsData } from "../../hooks/useEventData";
import { useFetchMeData } from "../../hooks/useAuth";
import AddButton from "../../components/Buttons/AddButton";

export default function CompetitionsPage() {
  type Event = {
    id: string;
    name: string;
    location: string;
    event_date: string;
    number_registrations: number;
  };

  const { data: meData } = useFetchMeData();
  const userRole = meData?.data.role;

  const {
    data: eventsData,
    isLoading: isEventsDataLoading,
    error: eventsError,
  } = useFetchEventsData();

  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página de Eventos"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá consultar todos os Eventos da SKI-Portugal. Mais tarde
          será também possível ver Estágios e outras provas de interesse.
          <p></p>
          Consultando cada cartão de prova, pode observar toda a informação
          relevante sobre essa prova, assim como os passos para inscrever os
          seus Atletas.
        </CardContent>
      </Card>
      <Grid container size={12}>
        {isEventsDataLoading ? (
          <Grid sx={{ mt: 3 }} container justifyContent="center" size={12}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          </Grid>
        ) : eventsData?.data.results.length !== 0 ? (
          eventsData?.data.results.map((comp: Event, index: string) => (
            <Grid key={index} size={6}>
              <Card sx={{ m: 2 }}>
                <CardHeader title={comp.name}></CardHeader>
                <CardContent>
                  {comp.location} {comp.event_date} {comp.number_registrations}
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <SettingsButton
                    size="large"
                    label="Consultar"
                    to={`/events/${comp.id}/`}
                  ></SettingsButton>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid sx={{ mt: 3 }} container justifyContent="center" size={12}>
            <Typography variant="h6" sx={{ color: "gray" }}>
              Não foram encontrados Eventos.
            </Typography>
          </Grid>
        )}
        {userRole === "national_association" ? (
          <Grid sx={{ m: 3, mt: 1 }} size={12}>
            <AddButton label="Adicionar" to="new_event/"></AddButton>
          </Grid>
        ) : null}
      </Grid>
    </>
  );
}
