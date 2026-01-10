import {
  Grid,
  Card,
  CardHeader,
  CardActions,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Tooltip,
  Box,
  CircularProgress,
  Typography,
  Chip,
} from "@mui/material";
import { SportsMma } from "@mui/icons-material";
import InfoButton from "../Buttons/InfoButton";
import { useNavigate } from "react-router-dom";
import { eventsHooks } from "../../hooks";
import AddButton from "../Buttons/AddButton";

export default function NextCompHomeComponent(
  props: Readonly<{ userRole: string }>
) {
  const navigate = useNavigate();
  const {
    data: nextCompData,
    isLoading: isNextCompLoading,
    error: nextCompError,
  } = eventsHooks.useFetchNextEventData();

  return (
    <Grid size={12}>
      <Card sx={{ m: 2 }}>
        <CardHeader
          title={"Próxima prova"}
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        {isNextCompLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : nextCompError ? (
          <ListItem sx={{ m: 0 }}>
            <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
              <ListItemText
                primary={"Ocorreu um erro a procurar o próximo Evento."}
              />
            </ListItemButton>
          </ListItem>
        ) : nextCompData?.data.length === 0 ? (
          <ListItem sx={{ m: 0 }}>
            <ListItemButton disabled sx={{ m: 0 }}>
              <ListItemIcon>
                <SportsMma></SportsMma>
              </ListItemIcon>
              <ListItemText primary={"Não há Eventos disponíveis."} />
            </ListItemButton>
          </ListItem>
        ) : (
          <List>
            <ListItem sx={{ m: 0 }}>
              <Tooltip title={"Consultar"} placement="left">
                <span>
                  <ListItemButton
                    sx={{
                      minWidth: 0,
                    }}
                    onClick={() => navigate(`events/${nextCompData?.data.id}/`)}
                  >
                    <ListItemIcon>
                      <SportsMma></SportsMma>
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                        minWidth: 0,
                        "&::-webkit-scrollbar": {
                          height: 0,
                        },
                        maskImage:
                          "linear-gradient(to right, black 85%, transparent 100%)",
                      }}
                      primary={
                        <Grid
                          container
                          alignItems="center"
                          spacing={2}
                          pr={5}
                          wrap="nowrap"
                          sx={{
                            width: "max-content",
                          }}
                        >
                          <Typography>{nextCompData?.data.name}</Typography>
                          {nextCompData?.data.has_registrations ? (
                            <Chip
                              variant="outlined"
                              color={
                                nextCompData?.data.is_open
                                  ? "success"
                                  : nextCompData?.data.is_retification
                                  ? "warning"
                                  : "error"
                              }
                              label={
                                nextCompData?.data.is_open
                                  ? "Inscrições Abertas"
                                  : nextCompData?.data.is_retification
                                  ? "Periodo Retificalções"
                                  : "Inscrições Fechadas"
                              }
                            ></Chip>
                          ) : null}
                          <Chip
                            label={nextCompData?.data.season}
                            variant="outlined"
                          ></Chip>
                          <Chip
                            label={
                              nextCompData?.data.encounter
                                ? "Encontro"
                                : "Competição"
                            }
                            variant="outlined"
                          ></Chip>
                          {nextCompData?.data.has_any_team ? (
                            <Chip label="Equipas" variant="outlined"></Chip>
                          ) : null}
                        </Grid>
                      }
                    />
                  </ListItemButton>
                </span>
              </Tooltip>
            </ListItem>
          </List>
        )}
        <CardActions
          sx={{
            justifyContent:
              props.userRole === "main_admin" ? "space-between" : "flex-end",
          }}
        >
          {props.userRole === "main_admin" ? (
            <AddButton label="Adicionar" to="events/new_event/"></AddButton>
          ) : null}
          <InfoButton label="Ver Todas" to="events/"></InfoButton>
        </CardActions>
      </Card>
    </Grid>
  );
}
