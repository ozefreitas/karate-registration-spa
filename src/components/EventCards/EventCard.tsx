import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  Stack,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  CardActions,
  Button,
  Box,
  CircularProgress,
  Tooltip,
  TextField,
  ListItem,
} from "@mui/material";
import AddButton from "../Buttons/AddButton";
import { eventsHooks } from "../../hooks";
import InfoButton from "../Buttons/InfoButton";
import GenerateButton from "../Buttons/GenerateButton";
import SettingsButton from "../Buttons/SettingsButton";
import {
  Event,
  LocationPin,
  EventBusy,
  LocalPolice,
  Email,
  Tty,
  EditCalendar,
  ThumbUp,
  ThumbDown,
  ThumbsUpDown,
  Info,
  Delete,
  Today,
  FileDownload,
  Edit,
} from "@mui/icons-material";
import CompInfoToolTip from "../../dashboard/CompInfoToolTip";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import EditEventModal from "../EventsModals/EditEventModal";
import DeleteEventModal from "../EventsModals/DeleteEventModal";
import PageInfoCard from "../info-cards/PageInfoCard";

export default function EventCard(props: Readonly<{ userRole: string }>) {
  const { id: eventId } = useParams<{ id: string }>();
  const [isDescriptionEdit, setIsDescriptionEdit] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const {
    data: singleEventData,
    isLoading: isSingleEventLoading,
    error: singleEventError,
  } = eventsHooks.useFetchSingleEventData(eventId!);

  const {
    data: eventRateData,
    isLoading: isEventRateLoading,
    error: eventRateError,
  } = eventsHooks.useFetchEventRate(eventId!);

  const rateEvent = eventsHooks.useRateEvent();

  const patchEvent = eventsHooks.usePatchEventData();

  const [selected, setSelected] = useState<number>(-1);

  const handleClick = (number: number) => {
    setSelected(number);
  };

  const handleEventRating = () => {
    const data = {
      eventId: eventId!,
      data: { rating_signal: selected },
    };
    rateEvent.mutate(data, {
      onSuccess: () => {
        setSelected(-1);
      },
    });
  };

  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    setDescription(singleEventData?.data.description);
  }, [singleEventData]);

  const handleDescriptionSubmit = (description: string) => {
    const data = { description: description };
    const event = eventId!;
    patchEvent.mutate(
      { eventId: event, data: data },
      {
        onSettled: () => {
          setIsDescriptionEdit(false);
        },
      }
    );
  };

  const { refetch: refetchRegistrationsFile } =
    eventsHooks.useFetchEventRegistrationFile(eventId!);

  const handleDownloadRegistrationsFile = async () => {
    const { data } = await refetchRegistrationsFile();
    if (data) {
      const url = window.URL.createObjectURL(data.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `lista_inscritos_evento_${eventId}_.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    }
  };

  if (singleEventError) return <Navigate to="/not_found/" />;

  return (
    <>
      <PageInfoCard
        description="Aqui poderá consultar cada cartão de prova, pode observar toda a
          informação relevante sobre essa prova, assim como os passos para
          inscrever os seus Atletas ou Equipas."
        title={`Evento - ${singleEventData?.data.name}`}
      ></PageInfoCard>
      <Grid container sx={{ mt: 0 }}>
        <Grid container size={12} sx={{ m: 2 }}>
          <Grid size={6}>
            <Card sx={{ mr: 2, height: "100%" }}>
              <CardHeader
                title="Informação Geral"
                sx={{
                  "& .MuiCardHeader-title": {
                    fontWeight: "bold",
                  },
                }}
              ></CardHeader>
              <CardContent sx={{ pb: 0 }}>
                {isSingleEventLoading ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    <Stack alignItems="center">
                      <Typography variant="h4">
                        {singleEventData?.data.name}
                      </Typography>
                    </Stack>
                    <Stack sx={{ p: 2 }}>
                      <List>
                        <CompInfoToolTip
                          title="Tipo de Evento"
                          text={
                            singleEventData?.data.encounter
                              ? `Encontro/Estágio ${singleEventData?.data.encounter_type}`
                              : "Competição/Torneio"
                          }
                          icon={<Info />}
                        ></CompInfoToolTip>
                        <CompInfoToolTip
                          title="Localização"
                          text={singleEventData?.data.location}
                          icon={<LocationPin />}
                        ></CompInfoToolTip>
                        <CompInfoToolTip
                          title="Início de Inscrições"
                          text={singleEventData?.data.start_registration}
                          icon={<Event />}
                        ></CompInfoToolTip>
                        <CompInfoToolTip
                          title="Fim de Inscrições"
                          text={singleEventData?.data.end_registration}
                          icon={<EventBusy />}
                        ></CompInfoToolTip>
                        <CompInfoToolTip
                          title="Data limite de Retificações"
                          text={singleEventData?.data.retifications_deadline}
                          icon={<EditCalendar />}
                        ></CompInfoToolTip>
                        <CompInfoToolTip
                          title="Data do Evento"
                          text={singleEventData?.data.event_date}
                          icon={<Today />}
                        ></CompInfoToolTip>
                        <CompInfoToolTip
                          title="Responsável"
                          text={singleEventData?.data.custody}
                          icon={<LocalPolice />}
                        ></CompInfoToolTip>
                        <CompInfoToolTip
                          title="Email"
                          text={singleEventData?.data.email_contact}
                          icon={<Email />}
                        ></CompInfoToolTip>
                        <CompInfoToolTip
                          title="Contacto"
                          text={singleEventData?.data.contact}
                          icon={<Tty />}
                        ></CompInfoToolTip>
                      </List>
                    </Stack>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid size={6} container>
            <Grid size={12}>
              <Card>
                <CardHeader
                  title="Ficheiros"
                  sx={{
                    "& .MuiCardHeader-title": {
                      fontWeight: "bold",
                    },
                  }}
                ></CardHeader>
                <CardContent sx={{ ml: 2 }}>
                  <li style={{ color: "grey" }}>
                    Não existem ficheiros para este Evento.
                  </li>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={12}>
              <Card sx={{ mt: 2, mb: 2 }}>
                <CardHeader
                  title="Notas Importantes"
                  subheader={
                    props.userRole === "main_admin" ? (
                      <Button
                        sx={{ m: 2, ml: 0 }}
                        variant="contained"
                        size="small"
                        color="warning"
                        onClick={() => setIsDescriptionEdit((prev) => !prev)}
                        startIcon={<Edit />}
                      >
                        Editar
                      </Button>
                    ) : null
                  }
                  sx={{
                    "& .MuiCardHeader-title": {
                      fontWeight: "bold",
                    },
                  }}
                ></CardHeader>
                <CardContent sx={{ pt: 0, ml: 2 }}>
                  {isDescriptionEdit ? (
                    <TextField
                      color="warning"
                      variant={"outlined"}
                      label="Descrição"
                      fullWidth
                      required
                      multiline
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  ) : singleEventData?.data?.description === "" ? (
                    <li style={{ color: "grey" }}>
                      Não existem informações adicionais para este Evento.
                    </li>
                  ) : (
                    <Typography paddingLeft={1}>
                      {singleEventData?.data?.description}
                    </Typography>
                  )}
                </CardContent>
                {isDescriptionEdit ? (
                  <CardActions
                    sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}
                  >
                    <Button
                      size="small"
                      onClick={() => handleDescriptionSubmit(description)}
                      variant="contained"
                    >
                      Enviar
                    </Button>
                  </CardActions>
                ) : null}
              </Card>
            </Grid>
            <Grid size={12} container>
              <Card sx={{ width: "100%" }}>
                <CardHeader
                  title="Avaliação"
                  subheader={
                    props.userRole === "main_admin"
                      ? "Depois da realização da prova, os Clubes poderão avaliar o Evento."
                      : "Depois da realização da prova, poderá deixar uma avaliação"
                  }
                  sx={{
                    "& .MuiCardHeader-title": {
                      fontWeight: "bold",
                      marginBottom: 1,
                    },
                  }}
                ></CardHeader>
                <CardContent sx={{ pt: 0, pb: 0, ml: 2 }}>
                  {props.userRole === "main_admin" ? (
                    <Typography>
                      Nota geral do Evento: {singleEventData?.data.rating}
                    </Typography>
                  ) : isEventRateLoading ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <CircularProgress />
                    </Box>
                  ) : eventRateError ? (
                    <ListItem disablePadding sx={{ m: 0 }}>
                      <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
                        <ListItemText primary={"Um error ocorreu."} />
                      </ListItemButton>
                    </ListItem>
                  ) : eventRateData?.data.code === "event_not_ended" ? (
                    <li style={{ color: "grey" }}>
                      {eventRateData?.data?.message}
                    </li>
                  ) : eventRateData?.data.code === "already_rated" ? (
                    <li style={{ color: "grey" }}>
                      {eventRateData?.data?.message}
                    </li>
                  ) : (
                    <Grid justifyContent="center" container spacing={2}>
                      <ListItemButton
                        selected={selected === 5}
                        onClick={() => handleClick(5)}
                      >
                        <ListItemIcon>
                          <ThumbUp
                            color="success"
                            fontSize="large"
                            sx={{ cursor: "pointer" }}
                          />
                        </ListItemIcon>
                        <ListItemText>Muito boa</ListItemText>
                      </ListItemButton>
                      <ListItemButton
                        selected={selected === 2}
                        onClick={() => handleClick(2)}
                      >
                        <ListItemIcon>
                          <ThumbsUpDown
                            color="warning"
                            fontSize="large"
                            sx={{ cursor: "pointer" }}
                          />
                        </ListItemIcon>
                        <ListItemText>Assim-Assim</ListItemText>
                      </ListItemButton>
                      <ListItemButton
                        selected={selected === 0}
                        onClick={() => handleClick(0)}
                      >
                        <ListItemIcon>
                          <ThumbDown
                            color="error"
                            fontSize="large"
                            sx={{ cursor: "pointer" }}
                          />
                        </ListItemIcon>
                        <ListItemText>Muito má</ListItemText>
                      </ListItemButton>
                    </Grid>
                  )}
                </CardContent>
                {props.userRole === "main_admin" ? null : (
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Stack
                      direction={{
                        xs: "row-reverse",
                        sm: "row",
                      }}
                      sx={{
                        p: 1,
                        gap: 4,
                        flexShrink: 0,
                        alignSelf: { xs: "flex-end", sm: "center" },
                      }}
                    >
                      <Button
                        size="small"
                        disabled={selected === -1}
                        onClick={handleEventRating}
                        variant="contained"
                      >
                        Enviar
                      </Button>
                      <Button
                        size="small"
                        disabled={selected === -1}
                        onClick={() => setSelected(-1)}
                      >
                        Remover seleção
                      </Button>
                    </Stack>
                  </CardActions>
                )}
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          {props.userRole === undefined ? null : (
            <Card sx={{ m: 2 }}>
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
                    gap: 7,
                    rowGap: 2,
                  }}
                >
                  {["main_admin", "superuser"].includes(props.userRole) ? (
                    // props.userRole === "subed_club" ? (
                    //   <Tooltip
                    //     disableHoverListener={!singleEventData?.data.has_ended}
                    //     title="Este evento já foi realizado. Poderá visualizar os atletas que participaram numa próxima versão"
                    //   >
                    //     <span>
                    //       <AddButton
                    //         label="Adicionar/Consultar Inscrições"
                    //         to="individuals/"
                    //         disabled={singleEventData?.data.has_ended}
                    //       ></AddButton>
                    //     </span>
                    //   </Tooltip>
                    // ) : (
                    //   <Tooltip
                    //     disableHoverListener={props.userRole === "subed_club"}
                    //     title="Comece uma subscrição para ter acesso a esta funcionalidade"
                    //   >
                    //     <span>
                    //       <AddButton
                    //         label="Adicionar/Consultar Inscrições"
                    //         to="individuals/"
                    //         disabled={props.userRole === "free_club"}
                    //       ></AddButton>
                    //     </span>
                    //   </Tooltip>
                    // )
                    <>
                      <Button
                        sx={{ m: 1 }}
                        variant="contained"
                        size="large"
                        color="error"
                        onClick={handleDeleteModalOpen}
                        startIcon={<Delete />}
                      >
                        Eliminar Evento
                      </Button>
                      <SettingsButton
                        size="large"
                        label="Editar Evento"
                        handleOpen={handleEditModalOpen}
                      ></SettingsButton>
                    </>
                  ) : (
                    <AddButton
                      label="Adicionar/Consultar Inscrições"
                      to="individuals/"
                      disabled={
                        isSingleEventLoading ||
                        singleEventData?.data.has_ended ||
                        !singleEventData?.data.has_registrations
                      }
                    ></AddButton>
                  )}
                  {!isSingleEventLoading && singleEventData?.data?.has_teams ? (
                    <AddButton
                      label="Consultar Equipas"
                      to="teams/"
                    ></AddButton>
                  ) : null}
                  {singleEventData?.data.has_registrations ? (
                    <>
                      <Tooltip
                        disableHoverListener={[
                          "main_admin",
                          "superuser",
                        ].includes(props.userRole)}
                        title="Esta funcionalidade ficará disponível em breve"
                      >
                        <span>
                          <InfoButton
                            disabled={
                              !["main_admin", "superuser"].includes(
                                props.userRole
                              )
                            }
                            label="Inscrições completas"
                            to="all_registry/"
                          ></InfoButton>
                        </span>
                      </Tooltip>
                      <InfoButton
                        label="Consultar Sorteios"
                        to="draw/"
                      ></InfoButton>
                    </>
                  ) : null}
                  {singleEventData?.data.has_categories ? (
                    <SettingsButton
                      size="large"
                      label="Consultar Escalões"
                      to={`/events/${eventId!}/categories/`}
                    ></SettingsButton>
                  ) : null}
                  {["main_admin", "superuser"].includes(props.userRole) &&
                  singleEventData?.data.has_registrations ? (
                    <>
                      <GenerateButton
                        label="Gerar Sorteio"
                        to="draw/generate/"
                      ></GenerateButton>
                      <Button
                        sx={{ m: 1 }}
                        variant="contained"
                        color="success"
                        onClick={handleDownloadRegistrationsFile}
                        startIcon={<FileDownload />}
                      >
                        Descarregar Inscrições
                      </Button>
                    </>
                  ) : null}
                </Grid>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
      <DeleteEventModal
        isModalOpen={isDeleteModalOpen}
        handleModalClose={handleDeleteModalClose}
        id={eventId}
      ></DeleteEventModal>
      <EditEventModal
        handleClose={handleEditModalClose}
        isOpen={isEditModalOpen}
        singleEventData={singleEventData?.data}
      ></EditEventModal>
    </>
  );
}
