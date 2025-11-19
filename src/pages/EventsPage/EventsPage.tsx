import {
  Card,
  CardContent,
  Grid,
  Avatar,
  Box,
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Button,
} from "@mui/material";
import EventFilters from "../../components/filter_drawers/EventFilters";
import SettingsButton from "../../components/Buttons/SettingsButton";
import AddButton from "../../components/Buttons/AddButton";
import stringAvatar from "../../dashboard/utils/avatarColor";
import { Today, LocationPin, HowToReg, AccessTime } from "@mui/icons-material";
import CompInfoToolTip from "../../dashboard/CompInfoToolTip";
import { ReactNode, useState } from "react";
import { eventsHooks } from "../../hooks";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function EventsPage(props: Readonly<{ userRole: string }>) {
  type Event = {
    id: string;
    name: string;
    season: string;
    location: string;
    event_date: string;
    has_registrations: boolean;
    number_registrations: number;
    is_open: boolean;
    is_retification: boolean;
    is_closed: boolean;
    has_ended: boolean;
  };
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event);
    setPage(value);
  };

  const {
    control,
    watch,
    formState: { errors },
    formState: { dirtyFields },
  } = useForm({
    defaultValues: {
      season: "2025/2026",
      has_registrations: false,
      has_categories: false,
      is_open: false,
      is_retification: false,
      is_closed: false,
      encounter: false,
      has_ended: false,
      has_teams: false,
    },
  });

  const changedCount = Object.keys(dirtyFields).length;

  const {
    data: eventsData,
    isLoading: isEventsDataLoading,
    error: eventsError,
  } = eventsHooks.useFetchEventsData(page, 5, watch("season"));

  const infoCard: ReactNode =
    props.userRole === "free_club" ? (
      <>
        Aqui poderá consultar todos os Eventos que se encontram abertos a
        receber inscrições, ou que se irão realizar dentro dos próximos 7 dias.
        <p></p>Consultando cada cartão de Evento, pode observar toda a
        informação relevante sobre esse Evento, assim como os passos para
        inscrever os seus Atletas.
      </>
    ) : (
      <>
        Aqui poderá consultar todos os Eventos disponíveis no momento. Mais
        tarde será também possível ver Estágios e outras provas de interesse.{" "}
        <p></p> Consultando cada cartão de Evento, pode observar toda a
        informação relevante sobre esse Evento, assim como os passos para
        inscrever os seus Atletas.
      </>
    );

  return (
    <>
      <PageInfoCard description={infoCard} title="Eventos"></PageInfoCard>
      <Grid container size={12} sx={{ m: 2, mt: 0 }}>
        <Grid
          size={12}
          container
          px={3}
          pb={2}
          spacing={2}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <EventFilters
            control={control}
            errors={errors}
            changedCount={changedCount}
          ></EventFilters>
        </Grid>
        {isEventsDataLoading ? (
          <Grid sx={{ mt: 3 }} container justifyContent="center" size={12}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          </Grid>
        ) : eventsError ? (
          <Grid sx={{ mt: 3 }} container justifyContent="center" size={12}>
            <ListItem>
              <ListItemText primary="Ocorreu um erro ao encontrar os Eventos disponíveis, tente mais tarde ou contacte um administrador."></ListItemText>
            </ListItem>
            <Button onClick={() => navigate("/events/")}>Refrescar</Button>
          </Grid>
        ) : eventsData?.data.count === 0 ? (
          <Grid
            sx={{ mt: 1, mb: 3 }}
            container
            justifyContent="center"
            size={12}
          >
            <Typography variant="h6" sx={{ color: "gray" }}>
              Não foram encontrados Eventos.
            </Typography>
          </Grid>
        ) : (
          <Grid size={12}>
            <Card sx={{ m: 2, mt: 0 }}>
              <CardContent>
                {eventsData?.data.results.map((comp: Event, index: string) => (
                  <Grid size={12} key={index} sx={{ p: 1 }}>
                    <Card elevation={3}>
                      <CardContent
                        sx={{
                          p: 0,
                          pl: 1,
                          "&:last-child": {
                            paddingBottom: 0,
                          },
                        }}
                      >
                        <Grid container alignItems="center" size={12}>
                          <Grid size={4} sx={{ p: 1 }}>
                            <Card
                              sx={{
                                backgroundColor: "lightgray",
                                display: "flex",
                                justifyContent: "center",
                                p: 2,
                              }}
                            >
                              <Avatar
                                {...stringAvatar(comp.name, 120)}
                              ></Avatar>
                            </Card>
                          </Grid>
                          <Grid container size={8} sx={{ p: 2 }}>
                            <Grid size={12}>
                              <Typography
                                sx={{ pl: 3, fontWeight: "bold" }}
                                variant="h5"
                              >
                                {comp.name}
                              </Typography>
                            </Grid>
                            <Grid size={8}>
                              <List>
                                <Grid container size={12}>
                                  <Grid size={7}>
                                    <CompInfoToolTip
                                      title="Dia do Evento"
                                      text={comp.event_date}
                                      icon={<Today />}
                                    ></CompInfoToolTip>
                                  </Grid>
                                  <Grid size={5}>
                                    {comp.has_registrations ? (
                                      <CompInfoToolTip
                                        title="Número de Inscritos"
                                        text={comp.number_registrations.toString()}
                                        icon={<HowToReg />}
                                      ></CompInfoToolTip>
                                    ) : null}
                                  </Grid>
                                </Grid>
                                <CompInfoToolTip
                                  title="Localização"
                                  text={comp.location}
                                  icon={<LocationPin />}
                                ></CompInfoToolTip>
                                <CompInfoToolTip
                                  title="Estado"
                                  text={
                                    comp.has_ended
                                      ? "Realizado"
                                      : comp.is_open || comp.is_retification
                                      ? "Inscrições em Progresso"
                                      : comp.is_closed
                                      ? "Inscrições Encerradas"
                                      : "Por Iniciar"
                                  }
                                  icon={<AccessTime />}
                                ></CompInfoToolTip>
                              </List>
                            </Grid>
                            <Grid
                              container
                              justifyContent="flex-end"
                              alignContent="flex-end"
                              size={4}
                            >
                              <SettingsButton
                                size="large"
                                label="Consultar"
                                to={`/events/${comp.id}/`}
                              ></SettingsButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </CardContent>
            </Card>
          </Grid>
        )}

        <Grid
          sx={{ m: 3, mt: 1 }}
          container
          justifyContent={
            props.userRole === "main_admin" ? "space-between" : "flex-end"
          }
          alignItems="center"
          size={12}
        >
          {eventsData?.data.count === 0 ? null : (
            <Grid size={12} mt={3} container justifyContent={"center"}>
              <Pagination
                count={Math.ceil(eventsData?.data.count / 5)}
                page={page}
                onChange={handleChange}
                color="primary"
              />
            </Grid>
          )}
          {props.userRole === "main_admin" ? (
            <AddButton label="Adicionar" to="new_event/"></AddButton>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
}
