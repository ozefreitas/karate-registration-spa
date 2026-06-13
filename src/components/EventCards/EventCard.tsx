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
  HowToReg,
  DeveloperBoard,
  EmojiEvents,
  Clear,
} from "@mui/icons-material";
import CompInfoToolTip from "../../dashboard/CompInfoToolTip";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import EditEventModal from "../EventsModals/EditEventModal";
import DeleteEventModal from "../EventsModals/DeleteEventModal";
import PageInfoCard from "../info-cards/PageInfoCard";
import { EncounterOptions } from "../../config";
import { useAuth } from "../../access/GlobalAuthProvider";
import { getFullDate } from "../../utils/utils";

export default function EventCard(props: Readonly<{ userRole: string }>) {
  const { user: meData } = useAuth();
  const { id: eventId } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
    setDescription(singleEventData?.description!);
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
      },
    );
  };

  const { refetch: refetchRegistrationsFile } =
    eventsHooks.useExportEventRegistrationFile(eventId!);

  const handleDownloadRegistrationsFile = async () => {
    const { data } = await refetchRegistrationsFile();
    if (data) {
      const url = globalThis.URL.createObjectURL(data.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `lista_inscritos_evento_${eventId}_.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      globalThis.URL.revokeObjectURL(url);
    }
  };

  const state =
    singleEventData?.is_open && !singleEventData?.is_retification
      ? "Inscrições abertas"
      : singleEventData?.is_retification
        ? "Período de retificações"
        : "Inscrições Encerradas";

  if (singleEventError) return <Navigate to="/not_found/" />;

  return (
    <>
      <PageInfoCard
        description="Aqui poderá consultar cada cartão de prova, pode observar toda a
          informação relevante sobre essa prova, assim como os passos para
          inscrever os seus Atletas, Equipas e Treinadores."
        title={isSingleEventLoading ? "" : `Evento - ${singleEventData?.name}`}
      ></PageInfoCard>
      <Grid container columnSpacing={3}>
        <Grid container size={12} m={2}>
          <Grid size={props.userRole === undefined ? 12 : 6}>
            <Card elevation={4}>
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
                        {singleEventData?.name ?? ""}
                      </Typography>
                    </Stack>
                    <Stack sx={{ p: 2, pb: 0 }}>
                      <List>
                        <CompInfoToolTip
                          title="Tipo de Evento"
                          text={
                            EncounterOptions.find(
                              (item) =>
                                item.value === singleEventData?.encounter_type,
                            )?.label!
                          }
                          icon={<Info />}
                        ></CompInfoToolTip>
                        <CompInfoToolTip
                          title="Localização"
                          text={singleEventData?.location!}
                          icon={<LocationPin />}
                        ></CompInfoToolTip>
                        <CompInfoToolTip
                          title="Início de Inscrições"
                          text={singleEventData?.start_registration!}
                          icon={<Event />}
                        ></CompInfoToolTip>
                        <CompInfoToolTip
                          title="Fim de Inscrições"
                          text={singleEventData?.end_registration!}
                          icon={<EventBusy />}
                        ></CompInfoToolTip>
                        <CompInfoToolTip
                          title="Data limite de Retificações"
                          text={singleEventData?.retifications_deadline!}
                          icon={<EditCalendar />}
                        ></CompInfoToolTip>
                        <CompInfoToolTip
                          title="Data do Evento"
                          text={singleEventData?.event_date!}
                          icon={<Today />}
                        ></CompInfoToolTip>
                        <CompInfoToolTip
                          title="Responsável"
                          text={
                            singleEventData?.custody === null ||
                            singleEventData?.custody === ""
                              ? null
                              : singleEventData?.custody!
                          }
                          icon={<LocalPolice />}
                        ></CompInfoToolTip>
                        <CompInfoToolTip
                          title="Email"
                          text={
                            singleEventData?.email_contact === null ||
                            singleEventData?.email_contact === ""
                              ? null
                              : String(singleEventData?.email_contact)
                          }
                          icon={<Email />}
                        ></CompInfoToolTip>
                        <CompInfoToolTip
                          title="Contacto"
                          text={
                            singleEventData?.contact === null
                              ? null
                              : String(singleEventData?.contact)
                          }
                          icon={<Tty />}
                        ></CompInfoToolTip>
                        {singleEventData?.has_registrations ? (
                          <CompInfoToolTip
                            title="Número de Inscritos"
                            text={singleEventData?.number_registrations.toString()}
                            icon={<HowToReg />}
                          ></CompInfoToolTip>
                        ) : null}
                      </List>
                    </Stack>
                  </>
                )}
                {props.userRole === undefined ? (
                  <Grid
                    container
                    size={12}
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                  >
                    <GenerateButton
                      label="Consultar Sorteios"
                      to="draw/dynamic_view/"
                    ></GenerateButton>
                  </Grid>
                ) : null}
              </CardContent>
            </Card>
          </Grid>
          {props.userRole === undefined ? null : (
            <Grid size={6} container alignContent={"space-between"}>
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
                    <ListItemText
                      primary={"Não existem ficheiros para este Evento."}
                      sx={{ color: "GrayText" }}
                    />
                  </CardContent>
                </Card>
              </Grid>
              {props.userRole === "technician" ? null : (
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
                            color={isDescriptionEdit ? "inherit" : "warning"}
                            onClick={() =>
                              setIsDescriptionEdit((prev) => !prev)
                            }
                            startIcon={isDescriptionEdit ? <Clear /> : <Edit />}
                          >
                            {isDescriptionEdit ? "Cancelar" : "Editar"}
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
                      ) : singleEventData?.description === "" ? (
                        <ListItemText
                          primary={
                            "Não existem informações adicionais para este Evento."
                          }
                          sx={{ color: "GrayText" }}
                        />
                      ) : (
                        <Typography paddingLeft={1}>
                          {singleEventData?.description}
                        </Typography>
                      )}
                    </CardContent>
                    {isDescriptionEdit ? (
                      <CardActions
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          p: 2,
                        }}
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
              )}
              {props.userRole === "technician" ? null : (
                <Grid size={12}>
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
                          Nota geral do Evento: {singleEventData?.rating}
                        </Typography>
                      ) : isEventRateLoading ? (
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <CircularProgress />
                        </Box>
                      ) : eventRateError ? (
                        <ListItem disablePadding sx={{ m: 0 }}>
                          <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
                            <ListItemText primary={"Um erro ocorreu."} />
                          </ListItemButton>
                        </ListItem>
                      ) : eventRateData?.code === "event_not_ended" ? (
                        <li style={{ color: "grey", marginLeft: 30 }}>
                          {eventRateData?.message}
                        </li>
                      ) : eventRateData?.code === "already_rated" ? (
                        <li style={{ color: "grey", marginLeft: 30 }}>
                          {eventRateData?.message}
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
                            p: 2,
                            pt: 1,
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
              )}
            </Grid>
          )}
        </Grid>
        {singleEventData?.has_registrations &&
        props.userRole !== undefined &&
        singleEventData?.event_date > getFullDate() ? (
          <Grid container size={12} sx={{ mx: 2 }}>
            <Card
              sx={{
                width: "100%",
                bgcolor:
                  singleEventData?.is_open && !singleEventData?.is_retification
                    ? "green"
                    : singleEventData?.is_retification
                      ? "#ffc40c"
                      : "red",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  p: 2,
                  "&:last-child": {
                    paddingBottom: 2,
                  },
                }}
              >
                {isSingleEventLoading ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: singleEventData?.is_retification
                        ? "grey"
                        : "white",
                    }}
                  >
                    Estado: {state}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ) : null}
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
                {isSingleEventLoading ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  singleEventData !== undefined && (
                    <Grid
                      container
                      direction="row"
                      px={5}
                      gap={5}
                      rowGap={2}
                      justifyContent={"space-evenly"}
                      alignItems={"center"}
                    >
                      {["main_admin", "superuser"].includes(props.userRole) ||
                      meData?.id === singleEventData?.created_by ? (
                        <>
                          <Button
                            sx={{ m: 1 }}
                            variant="contained"
                            size="medium"
                            color="error"
                            onClick={handleDeleteModalOpen}
                            startIcon={<Delete />}
                          >
                            Eliminar Evento
                          </Button>
                          <SettingsButton
                            size="medium"
                            label="Editar Evento"
                            handleOpen={handleEditModalOpen}
                          ></SettingsButton>
                        </>
                      ) : null}
                      {["main_admin", "superuser", "technician"].includes(
                        props.userRole,
                      ) ||
                      singleEventData?.event_date < getFullDate() ||
                      !singleEventData?.has_registrations ? null : singleEventData?.has_any_indiv ? (
                        <AddButton
                          label="Adicionar/Consultar Inscrições"
                          to="individuals/"
                        ></AddButton>
                      ) : null}
                      {["main_admin", "superuser", "technician"].includes(
                        props.userRole,
                      ) ? null : singleEventData?.has_coach ? (
                        <AddButton
                          label="Adicionar/Consultar Treinadores"
                          to="coaches/"
                          disabled={
                            singleEventData.event_date < getFullDate() ||
                            !singleEventData?.has_registrations
                          }
                        ></AddButton>
                      ) : null}
                      {["main_admin", "superuser", "technician"].includes(
                        props.userRole,
                      ) ? null : singleEventData?.has_any_team ? (
                        <AddButton
                          label="Adicionar/Consultar Equipas"
                          to="teams/"
                          disabled={
                            isSingleEventLoading ||
                            singleEventData.event_date < getFullDate() ||
                            !singleEventData?.has_registrations
                          }
                        ></AddButton>
                      ) : null}
                      {props.userRole === "main_admin" ? (
                        <InfoButton
                          label="Consultar Inscrições"
                          to="individuals/"
                        ></InfoButton>
                      ) : null}
                      {singleEventData?.has_registrations &&
                      !["technician", "main_admin"].includes(props.userRole) ? (
                        <InfoButton
                          label="Inscrições completas"
                          to="all_registry/"
                        ></InfoButton>
                      ) : null}
                      {singleEventData?.has_categories &&
                      props.userRole !== "technician" ? (
                        <SettingsButton
                          size="medium"
                          label="Consultar Escalões"
                          to={`/events/${eventId!}/categories/`}
                        ></SettingsButton>
                      ) : null}
                      {singleEventData?.encounter_type === "comp" ? (
                        <GenerateButton
                          label="Sorteios"
                          to="draw/"
                        ></GenerateButton>
                      ) : null}
                      <Tooltip
                        title={"Este Evento ainda não foi realizado"}
                        disableHoverListener={
                          singleEventData?.event_date < getFullDate()
                        }
                      >
                        <span>
                          <Button
                            disabled={
                              singleEventData?.event_date >= getFullDate()
                            }
                            startIcon={<EmojiEvents></EmojiEvents>}
                            variant="contained"
                            color="info"
                            onClick={() =>
                              navigate(`/classifications/${eventId}/`)
                            }
                          >
                            Classificações
                          </Button>
                        </span>
                      </Tooltip>
                      {["main_admin", "superuser"].includes(props.userRole) &&
                      singleEventData?.has_registrations ? (
                        <Button
                          sx={{ m: 1 }}
                          variant="contained"
                          color="success"
                          onClick={handleDownloadRegistrationsFile}
                          startIcon={<FileDownload />}
                        >
                          Descarregar Inscrições
                        </Button>
                      ) : null}
                      {["main_admin", "superuser", "technician"].includes(
                        props.userRole,
                      ) && singleEventData?.encounter_type === "comp" ? (
                        <Button
                          onClick={() => {
                            navigate("results_display/");
                          }}
                          disabled={singleEventData?.event_date < getFullDate()}
                          variant="contained"
                          startIcon={<DeveloperBoard />}
                        >
                          Ecrã de resultados e Monitorização
                        </Button>
                      ) : null}
                    </Grid>
                  )
                )}
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
        singleEventData={singleEventData}
      ></EditEventModal>
    </>
  );
}
