import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Avatar,
  Box,
  CircularProgress,
  Typography,
  List,
  Tooltip,
  IconButton,
} from "@mui/material";
import SettingsButton from "../../components/Buttons/SettingsButton";
import { useFetchEventsData } from "../../hooks/useEventData";
import AddButton from "../../components/Buttons/AddButton";
import stringAvatar from "../../dashboard/utils/avatarColor";
import {
  Today,
  LocationPin,
  HowToReg,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import CompInfoToolTip from "../../dashboard/CompInfoToolTip";
import { useState } from "react";

export default function EventsPage(props: Readonly<{ userRole: string }>) {
  type Event = {
    id: string;
    name: string;
    location: string;
    event_date: string;
    number_registrations: number;
  };

  const [page, setPage] = useState<number>(0);

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setPage(page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setPage(page + 1);
  };

  const {
    data: eventsData,
    isLoading: isEventsDataLoading,
    error: eventsError,
  } = useFetchEventsData(page + 1, 5);

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
                                {...stringAvatar(comp.name, 100)}
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
                                    <CompInfoToolTip
                                      title="Número de Inscritos"
                                      text={comp.number_registrations.toString()}
                                      icon={<HowToReg />}
                                    ></CompInfoToolTip>
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
        ) : (
          <Grid sx={{ mt: 3 }} container justifyContent="center" size={12}>
            <Typography variant="h6" sx={{ color: "gray" }}>
              Não foram encontrados Eventos.
            </Typography>
          </Grid>
        )}

        <Grid
          sx={{ m: 3, mt: 1 }}
          container
          justifyContent={props.userRole === "national_association" ? "space-between" : "flex-end"}
          size={12}
        >
          {props.userRole === "national_association" ? (
            <AddButton label="Adicionar" to="new_event/"></AddButton>
          ) : null}
          <div>
            <Tooltip title="Página anterior">
              <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
              >
                <KeyboardArrowLeft />
              </IconButton>
            </Tooltip>
            <Tooltip title="Próxima página">
              <IconButton
                onClick={handleNextButtonClick}
                disabled={
                  page >= Math.ceil(eventsData?.data?.results.length / 5) - 1
                }
                aria-label="next page"
              >
                <KeyboardArrowRight />
              </IconButton>
            </Tooltip>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
