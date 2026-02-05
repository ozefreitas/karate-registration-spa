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
  IconButton,
  Tooltip,
} from "@mui/material";
import EventsFilters from "../../components/filter_drawers/EventsFilters";
import EventsOrdering from "../../components/filter_drawers/EventsOrdering";
import AddButton from "../../components/Buttons/AddButton";
import stringAvatar from "../../dashboard/utils/avatarColor";
import {
  Today,
  LocationPin,
  HowToReg,
  AccessTime,
  CalendarMonth,
  Subject,
  East,
  Groups,
} from "@mui/icons-material";
import CompInfoToolTip from "../../dashboard/CompInfoToolTip";
import { ReactNode, useEffect, useState } from "react";
import { eventsHooks } from "../../hooks";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import { useForm } from "react-hook-form";
import EventCallendar from "../../components/Callendars/EventsCallendar";
import { useNavigate } from "react-router-dom";

export default function EventsPage(props: Readonly<{ userRole: string }>) {
  type Event = {
    id: string;
    name: string;
    location: string;
    season: string;
    event_date: string;
    has_registrations: boolean;
    number_registrations: number;
    is_open: boolean;
    is_retification: boolean;
    is_closed: boolean;
    has_ended: boolean;
    has_any_team: boolean;
  };
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem("eventsView") ?? "list";
  });

  useEffect(() => {
    localStorage.setItem("eventsView", currentView);
  }, [currentView]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const {
    control: filtersControl,
    watch: filtersWatch,
    reset: filtersReset,
    formState: { errors: filtersErrors },
    formState: { dirtyFields: filtersDirtyFields },
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

  const {
    control: orderControl,
    watch: orderWatch,
    reset: orderReset,
    formState: { errors: orderErrors },
    formState: { dirtyFields: orderDirtyFields },
  } = useForm({
    defaultValues: {
      name: "",
      event_date: "event_date",
      start_registration: "",
    },
  });

  const filtersChangedCount = Object.keys(filtersDirtyFields).length;
  const orderChangedCount = Object.keys(orderDirtyFields).length;

  const [orderFields, setOrderFields] = useState([
    {
      key: "name",
      label: "Nome",
      options: ["name", "-name"],
    },
    {
      key: "event_date",
      label: "Data",
      options: ["event_date", "-event_date"],
    },
    {
      key: "start_registration",
      label: "Início de inscrições",
      options: ["start_registration", "-start_registration"],
    },
  ]);

  const ordering = orderFields
    .map((f: any) => orderWatch(f.key))
    .filter(Boolean)
    .join(",");

  const {
    data: eventsData,
    isLoading: isEventsDataLoading,
    error: eventsError,
    refetch,
  } = eventsHooks.useFetchEventsData(
    page,
    5,
    ordering,
    filtersWatch("season"),
    filtersWatch("has_ended"),
    filtersWatch("has_teams"),
    filtersWatch("has_categories"),
    filtersWatch("has_registrations"),
  );

  const infoCard: ReactNode =
    props.userRole === "free_club" ? (
      <>
        Aqui poderá consultar todos os Eventos que se encontram abertos a
        receber inscrições, ou que se irão realizar dentro dos próximos 7 dias.
        <p></p>Consultando cada cartão de Evento, pode observar toda a
        informação relevante sobre esse Evento, assim como os passos para
        inscrever os seus Membros.
      </>
    ) : (
      <>
        Aqui poderá consultar todos os Eventos disponíveis no momento. Mais
        tarde será também possível ver Estágios e outras provas de interesse.{" "}
        <p></p> Consultando cada cartão de Evento, pode observar toda a
        informação relevante sobre esse Evento, assim como os passos para
        inscrever os seus Membros.
      </>
    );

  return (
    <>
      <PageInfoCard description={infoCard} title="Eventos"></PageInfoCard>
      <Grid container size={12} sx={{ m: 2, mt: 0 }}>
        {eventsError ? null : (
          <Grid
            size={12}
            container
            px={2}
            mb={3}
            justifyContent={
              ["superuser", "main_admin"].includes(props.userRole)
                ? "space-between"
                : "flex-end"
            }
            alignItems={"center"}
          >
            {props.userRole === "main_admin" ? (
              <AddButton label="Adicionar" to="new_event/"></AddButton>
            ) : null}
            <Grid
              container
              spacing={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <EventsOrdering
                isLoading={isEventsDataLoading}
                control={orderControl}
                reset={orderReset}
                errors={orderErrors}
                changedCount={orderChangedCount}
                orderFields={orderFields}
                setOrderFields={setOrderFields}
              ></EventsOrdering>
              <EventsFilters
                isLoading={isEventsDataLoading}
                control={filtersControl}
                reset={filtersReset}
                errors={filtersErrors}
                changedCount={filtersChangedCount}
              ></EventsFilters>
              <Grid pl={2} container spacing={1} borderRadius={3}>
                <Tooltip placement="top" title={"Vista de Lista"}>
                  <span>
                    <IconButton
                      size="large"
                      onClick={() => setCurrentView("list")}
                      sx={{
                        bgcolor:
                          currentView === "list" ? "#1976d2;" : undefined,
                      }}
                      color="info"
                    >
                      <Subject
                        sx={{
                          color: currentView === "list" ? "white" : undefined,
                        }}
                      ></Subject>
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip placement="top" title={"Vista de Calendário"}>
                  <span>
                    <IconButton
                      size="large"
                      sx={{
                        bgcolor:
                          currentView === "calendar" ? "#1976d2;" : undefined,
                      }}
                      onClick={() => setCurrentView("calendar")}
                      color="info"
                    >
                      <CalendarMonth
                        sx={{
                          color:
                            currentView === "calendar" ? "white" : undefined,
                        }}
                      ></CalendarMonth>
                    </IconButton>
                  </span>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        )}
        {isEventsDataLoading ? (
          <Box mt={3} display={"flex"} justifyContent={"center"}>
            <CircularProgress />
          </Box>
        ) : eventsError ? (
          <Grid my={3} container justifyContent="center" size={12}>
            <ListItem sx={{ textAlign: "center" }}>
              <ListItemText primary="Ocorreu um erro ao encontrar os Eventos disponíveis, tente mais tarde ou contacte um administrador."></ListItemText>
            </ListItem>
            <Button onClick={() => refetch()}>Refrescar</Button>
          </Grid>
        ) : eventsData?.data.count === 0 && currentView === "list" ? (
          <Grid mt={5} container justifyContent="center" size={12}>
            <Typography variant="h6" sx={{ color: "gray" }}>
              Não foram encontrados Eventos.
            </Typography>
          </Grid>
        ) : eventsData?.data.count !== 0 && currentView === "list" ? (
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
                            <Grid size={9}>
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
                                <Grid container size={12}>
                                  <Grid size={7}>
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
                                  </Grid>
                                  <Grid size={5}>
                                    {comp.has_any_team ? (
                                      <CompInfoToolTip
                                        title=""
                                        text="Equipas Disponíveis"
                                        icon={<Groups />}
                                      ></CompInfoToolTip>
                                    ) : null}
                                  </Grid>
                                </Grid>
                                <CompInfoToolTip
                                  title="Localização"
                                  text={comp.location}
                                  icon={<LocationPin />}
                                ></CompInfoToolTip>
                              </List>
                            </Grid>
                            <Grid
                              container
                              justifyContent="flex-end"
                              alignContent="flex-end"
                              size={3}
                            >
                              <Tooltip arrow placement="top" title="Ir para">
                                <span>
                                  <IconButton
                                    sx={{
                                      transition: "0.3s",
                                      borderRadius: 4,
                                      p: 1.5,
                                      px: 2,
                                      border: 2,
                                      borderColor: "red",
                                      "&:hover": {
                                        transform: "translateY(-3px)",
                                        boxShadow: 6,
                                        borderColor: "red",
                                        bgcolor: "red",
                                      },
                                    }}
                                    onClick={() =>
                                      navigate(`/events/${comp.id}/`)
                                    }
                                  >
                                    <East sx={{ color: "black" }}></East>
                                  </IconButton>
                                </span>
                              </Tooltip>
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
        ) : (
          <EventCallendar
            ordering={ordering}
            filtersWatch={filtersWatch}
          ></EventCallendar>
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
          {eventsData?.data.count === 0 ||
          isEventsDataLoading ||
          eventsError ||
          currentView === "calendar" ? null : (
            <Grid size={12} mt={3} container justifyContent={"center"}>
              <Pagination
                count={Math.ceil(eventsData?.data.count / 5)}
                page={page}
                onChange={handleChange}
                color="primary"
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
}
