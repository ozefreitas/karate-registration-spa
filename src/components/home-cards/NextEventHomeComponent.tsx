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
import { EncounterOptions } from "../../config";

export default function NextEventHomeComponent(
  props: Readonly<{ userRole: string }>,
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
            pb: 0,
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        {isNextCompLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
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
        ) : nextCompData === undefined ? (
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
            <ListItem sx={{ m: 0, pb: 0 }}>
              <Tooltip title={"Consultar"}>
                <span style={{ width: "100%" }}>
                  <ListItemButton
                    sx={{
                      minWidth: 0,
                    }}
                    onClick={() => navigate(`events/${nextCompData?.id}/`)}
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
                          <Typography>{nextCompData?.name}</Typography>
                          {nextCompData?.has_registrations ? (
                            <Chip
                              variant="outlined"
                              color={
                                nextCompData?.is_open
                                  ? "success"
                                  : nextCompData?.is_retification
                                    ? "warning"
                                    : "error"
                              }
                              label={
                                nextCompData?.is_open
                                  ? "Inscrições Abertas"
                                  : nextCompData?.is_retification
                                    ? "Periodo Retificalções"
                                    : "Inscrições Fechadas"
                              }
                            ></Chip>
                          ) : null}
                          <Chip
                            label={nextCompData?.season}
                            variant="outlined"
                          ></Chip>
                          <Chip
                            label={
                              EncounterOptions.find(
                                (item) =>
                                  item.value === nextCompData?.encounter_type,
                              )?.label
                            }
                            variant="outlined"
                          ></Chip>
                          {nextCompData?.has_any_team ? (
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
