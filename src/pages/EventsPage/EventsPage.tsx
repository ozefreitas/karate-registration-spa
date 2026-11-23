import {
  Card,
  CardContent,
  Grid,
  Avatar,
  CircularProgress,
  Typography,
  ListItem,
  ListItemText,
  Pagination,
  Button,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
} from "@mui/material";
import EventOrdering from "../../components/events-filters/EventOrdering";
import EventFiltering from "../../components/events-filters/EventFiltering";
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
  Search,
  Add,
  Clear,
  SportsMma,
} from "@mui/icons-material";
import CompInfoToolTip from "../../dashboard/CompInfoToolTip";
import { ReactNode, useEffect, useState } from "react";
import { eventsHooks } from "../../hooks";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import { useForm } from "react-hook-form";
import Calendar from "../../components/Callendars/Calendar";
import { useNavigate } from "react-router-dom";
import { getFullDate } from "../../utils/utils";

export default function EventsPage(props: Readonly<{ userRole: string }>) {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem("eventsView") ?? "list";
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

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
    // formState: { errors: filtersErrors },
    formState: { dirtyFields: filtersDirtyFields },
  } = useForm({
    defaultValues: {
      season: "2026/2027",
      has_registrations: false,
      has_categories: false,
      is_open: false,
      is_retification: false,
      is_closed: false,
      has_ended: false,
      has_not_ended: false,
      has_teams: false,
      isOngoing: false,
    },
  });

  const {
    control: orderControl,
    watch: orderWatch,
    reset: orderReset,
    // formState: { errors: orderErrors },
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
    undefined,
    // filtersWatch("has_ended"),
    filtersWatch("has_teams") === false ? undefined : true,
    filtersWatch("has_categories") === false ? undefined : true,
    filtersWatch("has_registrations") === false ? undefined : true,
    undefined,
    undefined,
    filtersWatch("isOngoing") === false ? undefined : true,
    // props.userRole === "technician" ? true : undefined,
    currentView === "list",
    debouncedQuery,
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
    ) : props.userRole === "technician" ? (
      <>A lista de Eventos que estão a decorrer neste momento (hoje).</>
    ) : (
      <>
        Aqui poderá consultar todos os Eventos disponíveis no momento. Mais
        tarde será também possível ver Estágios e outras provas de interesse.{" "}
        <p></p> Consultando cada cartão de Evento, pode observar toda a
        informação relevante sobre esse Evento, assim como os passos para
        inscrever os seus Membros.
      </>
    );

  const canAddEvents = [
    "main_admin",
    "superuser",
    "single_admin",
    "subed_club",
  ].includes(props.userRole);
  const canManageEvents = props.userRole !== "technician";
  const canSwitchEventView =
    props.userRole !== "technician" && props.userRole !== undefined;
  const canViewCalendar = canSwitchEventView && props.userRole !== "free_club";
  const showEventSearch = canManageEvents && currentView === "list";

  return (
    <>
      <PageInfoCard description={infoCard} title="Eventos"></PageInfoCard>
      <Grid container size={12} m={{ xs: 1, sm: 2, md: 4 }} mt={0}>
        {eventsError || props.userRole === "technician" ? null : (
          <Grid
            size={12}
            container
            spacing={{ xs: 1, sm: 1.5 }}
            pb={1}
            mb={3}
            sx={{ borderBottom: 1, borderColor: "divider" }}
            alignItems="center"
          >
            {canAddEvents ? (
              <Grid size={{ xs: 12, sm: 3 }}>
                <Grid sx={{ display: { xs: "none", sm: "flex" } }}>
                  <AddButton
                    borderless
                    label="Adicionar"
                    to="new_event/"
                  ></AddButton>
                </Grid>
                <Grid sx={{ display: { xs: "flex", sm: "none" } }}>
                  <Tooltip placement="top" title="Adicionar">
                    <IconButton
                      onClick={() => navigate("new_event/")}
                      sx={{
                        border: 1,
                        borderRadius: 3,
                        bgcolor: "#2e7d32",
                        "&:hover": { bgcolor: "#2e7d32" },
                      }}
                      color="success"
                      aria-label="Adicionar evento"
                    >
                      <Add sx={{ color: "white" }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            ) : null}
            <Grid
              size={{ xs: 12, sm: canAddEvents ? 9 : 12 }}
              container
              spacing={1}
              alignItems="center"
              justifyContent="flex-end"
            >
              {showEventSearch ? (
                <Grid size={{ xs: 12, md: 4 }} sx={{ minWidth: 0 }}>
                  <TextField
                    fullWidth
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Nome do Evento/Descrição/Localização..."
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: 36,
                        borderRadius: 3,
                      },
                      "& .MuiInputBase-input::placeholder": {
                        fontSize: "0.7rem",
                      },
                    }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search fontSize="small" />
                          </InputAdornment>
                        ),
                        endAdornment: isEventsDataLoading ? (
                          <CircularProgress size={16} />
                        ) : query === "" ? null : (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setQuery("")}
                              edge="end"
                              aria-label="remove event query"
                            >
                              <Clear color="error"></Clear>
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Grid>
              ) : null}
              <Grid
                size={{
                  xs: 12,
                  md: showEventSearch ? 8 : 12,
                }}
                container
                spacing={1}
                alignItems="center"
                justifyContent={{ xs: "space-between", md: "flex-end" }}
              >
                {canManageEvents ? (
                  <Grid container spacing={1} alignItems="center">
                    <EventOrdering
                      isLoading={isEventsDataLoading}
                      control={orderControl}
                      reset={orderReset}
                      changedCount={orderChangedCount}
                      orderFields={orderFields}
                      setOrderFields={setOrderFields}
                    ></EventOrdering>
                    <EventFiltering
                      isLoading={isEventsDataLoading}
                      control={filtersControl}
                      reset={filtersReset}
                      changedCount={filtersChangedCount}
                      setPage={setPage}
                    ></EventFiltering>
                  </Grid>
                ) : null}
                {canSwitchEventView ? (
                  <Grid container spacing={1} alignItems="center">
                    <Tooltip placement="top" title="Vista de Lista">
                      <span>
                        <Button
                          aria-label="Vista de lista"
                          aria-pressed={currentView === "list"}
                          sx={{
                            width: 38,
                            minWidth: 38,
                            height: 36,
                            p: 0,
                            color:
                              currentView === "list"
                                ? "common.white"
                                : "primary.main",
                            bgcolor:
                              currentView === "list"
                                ? "primary.main"
                                : "transparent",
                            borderColor: "primary.main",
                            "&:hover": {
                              bgcolor:
                                currentView === "list"
                                  ? "primary.dark"
                                  : "action.hover",
                            },
                          }}
                          variant="outlined"
                          onClick={() => setCurrentView("list")}
                        >
                          <Subject fontSize="small" />
                        </Button>
                      </span>
                    </Tooltip>
                    {canViewCalendar ? (
                      <Tooltip placement="top" title="Vista de Calendário">
                        <span>
                          <Button
                            aria-label="Vista de calendário"
                            aria-pressed={currentView === "calendar"}
                            sx={{
                              width: 38,
                              minWidth: 38,
                              height: 36,
                              p: 0,
                              color:
                                currentView === "calendar"
                                  ? "common.white"
                                  : "primary.main",
                              bgcolor:
                                currentView === "calendar"
                                  ? "primary.main"
                                  : "transparent",
                              borderColor: "primary.main",
                              "&:hover": {
                                bgcolor:
                                  currentView === "calendar"
                                    ? "primary.dark"
                                    : "action.hover",
                              },
                            }}
                            variant="outlined"
                            onClick={() => setCurrentView("calendar")}
                          >
                            <CalendarMonth fontSize="small" />
                          </Button>
                        </span>
                      </Tooltip>
                    ) : null}
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        )}
        {isEventsDataLoading && currentView === "list" ? (
          <Grid mt={3} container justifyContent={"center"} size={12}>
            <CircularProgress />
          </Grid>
        ) : eventsError && currentView === "list" ? (
          <Grid my={3} container justifyContent="center" size={12}>
            <ListItem sx={{ textAlign: "center" }}>
              <ListItemText primary="Ocorreu um erro ao encontrar os Eventos disponíveis, tente mais tarde ou contacte um administrador."></ListItemText>
            </ListItem>
            <Button
              onClick={() => {
                filtersReset();
                orderReset();
                setPage(1);
                refetch();
              }}
            >
              Refrescar
            </Button>
          </Grid>
        ) : eventsData?.count === 0 && currentView === "list" ? (
          <Card
            variant="outlined"
            sx={{ borderColor: "divider", width: "100%", mt: 2 }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 1,
                py: 3,
              }}
            >
              <SportsMma color="disabled" />
              <Typography variant="body2" color="textDisabled">
                Não foram encontrados Eventos.
              </Typography>
            </CardContent>
          </Card>
        ) : eventsData?.count !== 0 && currentView === "list" ? (
          <Grid size={12}>
            <Typography
              variant="subtitle1"
              ml={{ xs: 1, sm: 3 }}
              mb={1}
              sx={{ color: "text.secondary" }}
            >
              {eventsData?.count} Evento(s).
            </Typography>
            {eventsData?.results.map((comp, index: number) => (
              <Grid size={12} key={index} px={{ xs: 0.5, sm: 1, md: 2 }} py={1}>
                <Card elevation={3} sx={{ overflow: "hidden" }}>
                  <CardContent
                    sx={{
                      p: 0,
                      "&:last-child": {
                        paddingBottom: 0,
                      },
                    }}
                  >
                    <Grid
                      container
                      alignItems="stretch"
                      size={12}
                      spacing={{ xs: 0, sm: 1 }}
                    >
                      <Grid
                        size={{ xs: 12, sm: 4, md: 3 }}
                        p={{ xs: 1, sm: 2 }}
                      >
                        <Card
                          sx={{
                            height: "100%",
                            minHeight: { xs: 112, sm: 160, md: 190 },
                            bgcolor: "action.hover",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            p: { xs: 1.5, sm: 2, md: 3 },
                            boxShadow: "none",
                          }}
                        >
                          <Avatar
                            {...stringAvatar(comp.encounter_type!, 128)}
                            sx={{
                              ...stringAvatar(comp.encounter_type!, 128).sx,
                              width: { xs: 72, sm: 96, md: 128 },
                              height: { xs: 72, sm: 96, md: 128 },
                              fontSize: { xs: 28, sm: 36, md: 48 },
                            }}
                          ></Avatar>
                        </Card>
                      </Grid>
                      <Grid
                        container
                        size={{ xs: 12, sm: 8, md: 9 }}
                        p={2}
                        alignContent="center"
                      >
                        <Grid my={{ xs: 1, sm: 1.5 }} size={12}>
                          <Typography
                            pl={{ xs: 0, sm: 1 }}
                            fontWeight="bold"
                            textAlign={{ xs: "center", sm: "left" }}
                            sx={{
                              fontSize: {
                                xs: "1rem",
                                sm: "1.15rem",
                                md: "1.35rem",
                              },
                              overflowWrap: "anywhere",
                            }}
                          >
                            {comp.name}
                          </Typography>
                        </Grid>
                        <Grid
                          px={{ xs: 0.5, sm: 1 }}
                          size={{ xs: 12, md: 10.5 }}
                          sx={{ minWidth: 0 }}
                        >
                          <Grid
                            container
                            columnSpacing={{ xs: 0, md: 2 }}
                            size={12}
                          >
                            <Grid size={{ xs: 12, md: 6 }}>
                              <CompInfoToolTip
                                title="Dia do Evento"
                                text={comp.event_date}
                                icon={<Today />}
                              ></CompInfoToolTip>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                              {comp.has_registrations ? (
                                <CompInfoToolTip
                                  title="Número de Inscritos"
                                  text={comp.number_registrations.toString()}
                                  icon={<HowToReg />}
                                ></CompInfoToolTip>
                              ) : null}
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            columnSpacing={{ xs: 0, md: 2 }}
                            size={12}
                          >
                            <Grid size={{ xs: 12, md: 6 }}>
                              <CompInfoToolTip
                                title="Estado"
                                text={
                                  comp.event_date < getFullDate()
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
                            <Grid size={{ xs: 12, md: 6 }}>
                              {comp.has_any_team ? (
                                <CompInfoToolTip
                                  title="Equipas"
                                  text="Disponíveis"
                                  icon={<Groups />}
                                ></CompInfoToolTip>
                              ) : null}
                            </Grid>
                          </Grid>
                          <Grid size={12}>
                            <CompInfoToolTip
                              title="Localização"
                              text={comp.location}
                              icon={<LocationPin />}
                            ></CompInfoToolTip>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          justifyContent={{ xs: "center", md: "flex-end" }}
                          alignContent="center"
                          size={{ xs: 12, md: 1.5 }}
                          pt={{ xs: 1, md: 0 }}
                        >
                          <Tooltip placement="top" title="Ir para">
                            <span>
                              <IconButton
                                sx={{
                                  transition: "0.3s",
                                  borderRadius: 4,
                                  p: { xs: 1, md: 1.5 },
                                  border: 2,
                                  borderColor: "divider",
                                  bgcolor: "error.main",
                                  "&:hover": {
                                    transform: "translateY(-3px)",
                                    boxShadow: 6,
                                    borderColor: "error.dark",
                                    bgcolor: "error.dark",
                                  },
                                }}
                                onClick={() => navigate(`/events/${comp.id}/`)}
                              >
                                <East sx={{ color: "white" }}></East>
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
          </Grid>
        ) : null}
        {currentView === "calendar" &&
        ![undefined, "free_club"].includes(props.userRole) ? (
          <Calendar
            filters={filtersWatch}
            resetFilters={filtersReset}
          ></Calendar>
        ) : null}
        <Grid
          mt={1}
          container
          justifyContent={
            props.userRole === "main_admin" ? "space-between" : "flex-end"
          }
          alignItems="center"
          size={12}
        >
          {eventsData?.count === 0 ||
          isEventsDataLoading ||
          eventsError ||
          currentView === "calendar" ? null : (
            <Grid size={12} mt={3} container justifyContent={"center"}>
              <Pagination
                count={Math.ceil(eventsData?.count! / 5)}
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
