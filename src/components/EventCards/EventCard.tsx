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
} from "@mui/material";
import AddButton from "../Buttons/AddButton";
import {
  useSingleFetchEventData,
  useRateEvent,
  useFetchEventRate,
} from "../../hooks/useEventData";
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
  Edit,
} from "@mui/icons-material";
import CompInfoToolTip from "../../dashboard/CompInfoToolTip";
import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import EditEventModal from "../EventsModals/EditEventModal";
import DeleteEventModal from "../EventsModals/DeleteEventModal";
import { usePatchEventData } from "../../hooks/useEventData";

export default function EventCard(props: Readonly<{ userRole: string }>) {
  const location = useLocation();
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
  } = useSingleFetchEventData(location.pathname.split("/").slice(-2)[0]);

  const { data: eventRateData, isLoading: isEventRateLoading } =
    useFetchEventRate(location.pathname.split("/").slice(-2)[0]);

  const rateEvent = useRateEvent();

  const patchEvent = usePatchEventData();

  const [selected, setSelected] = useState<number>(-2);

  const handleClick = (number: number) => {
    setSelected(number);
  };

  const handleEventRating = () => {
    const data = {
      eventId: location.pathname.split("/")[2],
      data: { rating_signal: selected },
    };
    rateEvent.mutate(data, {
      onSuccess: () => {
        setSelected(-2);
      },
    });
  };

  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    setDescription(singleEventData?.data.description);
  }, [singleEventData]);

  const handleDescriptionSubmit = (description: string) => {
    const data = { description: description };
    const event = location.pathname.split("/").slice(-2)[0];
    patchEvent.mutate(
      { eventId: event, data: data },
      {
        onSettled: () => {
          setIsDescriptionEdit(false);
        },
      }
    );
  };

  if (singleEventError) return <Navigate to="/not_found/" />;

  return (
    <>
      <Card sx={{ m: 2, mt: 0, mb: 0 }}>
        <CardHeader
          title="Página de Evento"
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
      <Grid container sx={{ m: 2, mt: 0 }}>
        <Grid container size={12}>
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
                  <li style={{ color: "grey" }}>
                    Não existem ficheiros para este Evento.
                  </li>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={12}>
              <Card sx={{ m: 2 }}>
                <CardHeader
                  title="Notas Importantes"
                  subheader={
                    props.userRole === "national_association" ? (
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
                <CardContent sx={{ pt: 0 }}>
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
            <Grid size={12}>
              <Card sx={{ m: 2 }}>
                <CardHeader
                  title="Avaliação"
                  subheader="Depois da realização da prova, poderá deixar uma avaliação."
                  sx={{
                    "& .MuiCardHeader-title": {
                      fontWeight: "bold",
                      marginBottom: 1,
                    },
                  }}
                ></CardHeader>
                <CardContent sx={{ pt: 0, pb: 0 }}>
                  {isEventRateLoading ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <CircularProgress />
                    </Box>
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
                        selected={selected === 1}
                        onClick={() => handleClick(1)}
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
                        onClick={() => handleClick(0)}
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
                        selected={selected === 3}
                        onClick={() => handleClick(-1)}
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
                      disabled={selected === -2}
                      onClick={handleEventRating}
                      variant="contained"
                    >
                      Enviar
                    </Button>
                    <Button
                      size="small"
                      disabled={selected === -2}
                      onClick={() => setSelected(-2)}
                    >
                      Remover seleção
                    </Button>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
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
                  gap: 7,
                  rowGap: 2,
                }}
              >
                {!["national_association", "superuser"].includes(
                  props.userRole
                ) ? (
                  props.userRole === "subed_dojo" ? (
                    <Tooltip
                      disableHoverListener={!singleEventData?.data.has_ended}
                      title="Este evento já foi realizado. Poderá visualizar os atletas que participaram numa próxima versão"
                    >
                      <span>
                        <AddButton
                          label="Consultar Inscrições"
                          to="individuals/"
                          disabled={singleEventData?.data.has_ended}
                        ></AddButton>
                      </span>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      disableHoverListener={props.userRole === "subed_dojo"}
                      title="Comece uma subscrição para ter acesso a esta funcionalidade"
                    >
                      <span>
                        <AddButton
                          label="Adicionar/Consultar Inscrições"
                          to="individuals/"
                          disabled={props.userRole === "free_dojo"}
                        ></AddButton>
                      </span>
                    </Tooltip>
                  )
                ) : (
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
                )}
                {!isSingleEventLoading && singleEventData?.data?.has_teams ? (
                  <AddButton label="Consultar Equipas" to="teams/"></AddButton>
                ) : null}
                <Tooltip
                  disableHoverListener={[
                    "national_association",
                    "superuser",
                  ].includes(props.userRole)}
                  title="Esta funcionalidade ficará disponível em breve"
                >
                  <span>
                    <InfoButton
                      disabled={
                        !["national_association", "superuser"].includes(
                          props.userRole
                        )
                      }
                      label="Inscrições completas"
                      to="all_registry/"
                    ></InfoButton>
                  </span>
                </Tooltip>
                <InfoButton label="Consultar Sorteios" to="draw/"></InfoButton>
                {["national_association", "superuser"].includes(
                  props.userRole
                ) ? (
                  <GenerateButton
                    label="Gerar Sorteio"
                    to="draw/generate/"
                  ></GenerateButton>
                ) : null}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <DeleteEventModal
        isModalOpen={isDeleteModalOpen}
        handleModalClose={handleDeleteModalClose}
        handleModalOpen={handleDeleteModalOpen}
        id={location.pathname.split("/").slice(-2)[0]}
      ></DeleteEventModal>
      <EditEventModal
        handleClose={handleEditModalClose}
        isOpen={isEditModalOpen}
        singleEventData={singleEventData?.data}
      ></EditEventModal>
    </>
  );
}
