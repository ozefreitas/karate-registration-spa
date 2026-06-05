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
  Chip,
  Typography,
} from "@mui/material";
import { Groups } from "@mui/icons-material";
import InfoButton from "../Buttons/InfoButton";
import AddButton from "../Buttons/AddButton";
import { useNavigate } from "react-router-dom";
import { teamsHooks } from "../../hooks";

export default function TeamsHomeComponent(
  props: Readonly<{ userRole: string }>,
) {
  const navigate = useNavigate();

  const {
    data: lastFiveTeamsData,
    isLoading: isLastFiveTeamsLoading,
    error: lastFiveTeamError,
  } = teamsHooks.useFetchLastFiveTeamsData();

  return (
    <Grid size={12}>
      <Card sx={{ m: 2 }}>
        <CardHeader
          title={
            <Grid container alignItems={"center"} gap={2}>
              <Grid
                container
                justifyContent={"center"}
                alignItems={"center"}
                size={2}
                color={"#fff"}
                bgcolor={"#1976d2"}
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 1.5,
                }}
              >
                <Groups sx={{ fontSize: 28 }} />
              </Grid>
              <Grid size={10} container>
                <Typography variant="h5" fontWeight={"bold"}>
                  Equipas editados recentemente
                </Typography>
                <Typography>A mostrar 5 últimas Equipas</Typography>
              </Grid>
            </Grid>
          }
        ></CardHeader>
        <List>
          {props.userRole === undefined ? (
            <ListItem sx={{ m: 0 }}>
              <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
                <ListItemText primary={"Sem sessão iniciada. Faça Login."} />
              </ListItemButton>
            </ListItem>
          ) : isLastFiveTeamsLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <CircularProgress />
            </Box>
          ) : lastFiveTeamError ? (
            <ListItem sx={{ m: 0 }}>
              <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
                <ListItemText
                  primary={"Ocorreu um erro ao carregar as Equipas."}
                />
              </ListItemButton>
            </ListItem>
          ) : lastFiveTeamsData?.length === 0 ? (
            <ListItem sx={{ m: 0 }}>
              <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
                <ListItemText
                  primary={"Não registou nenhuma Equipa recentemente."}
                />
              </ListItemButton>
            </ListItem>
          ) : (
            lastFiveTeamsData?.map((team, index: any) => (
              <Tooltip key={index} title={"Consultar"}>
                <span style={{ width: "100%" }}>
                  <ListItem sx={{ m: 0, pb: 0 }}>
                    <ListItemButton
                      sx={{
                        minWidth: 0,
                      }}
                      onClick={() => navigate(`teams/${team.id}/`)}
                    >
                      <ListItemIcon>
                        <Groups />
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
                            pr={3}
                            wrap="nowrap"
                            sx={{
                              width: "max-content",
                            }}
                          >
                            <Chip
                              variant="outlined"
                              label={team.category.name}
                            ></Chip>
                            <Chip variant="outlined" label={team.gender}></Chip>
                            <Chip
                              variant="outlined"
                              color="primary"
                              label={`Evento: ${team.events}`}
                            ></Chip>
                            <Chip
                              variant="outlined"
                              color="secondary"
                              label={`Modalidade: ${team.disciplines}`}
                            ></Chip>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                </span>
              </Tooltip>
            ))
          )}
          {props.userRole === "free_club" ? (
            <ListItem sx={{ m: 0 }}>
              <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
                <ListItemText
                  primary={
                    "Comece uma subscrição para ter acesso a esta funcionalidade."
                  }
                />
              </ListItemButton>
            </ListItem>
          ) : null}
        </List>
        <CardActions
          sx={{
            justifyContent:
              props.userRole === "subed_club" ? "space-between" : "flex-end",
          }}
        >
          {props.userRole === "free_club" ? null : props.userRole ===
            "subed_club" ? (
            <>
              <AddButton
                label="Adicionar"
                to="teams/new_team/"
                size={"medium"}
              ></AddButton>
              <InfoButton label="Ver Todos" to="teams/"></InfoButton>
            </>
          ) : (
            <InfoButton label="Ver Todos" to="teams/"></InfoButton>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
