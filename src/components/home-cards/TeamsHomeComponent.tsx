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
} from "@mui/material";
import { Groups } from "@mui/icons-material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import InfoButton from "../Buttons/InfoButton";
import AddButton from "../Buttons/AddButton";
import { useNavigate } from "react-router-dom";

const fetchLastFiveTeams = () => {
  const token = localStorage.getItem("token");
  return axios.get("http://127.0.0.1:8000/teams/last_five/", {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export default function TeamsHomeComponent(
  props: Readonly<{ userRole: string }>,
) {
  type Category = { name: string };
  type Team = {
    id: string;
    team_number: number;
    category: Category;
    gender: string;
    events: any;
    disciplines: any;
  };

  const navigate = useNavigate();

  const {
    data: lastFiveTeamsData,
    isLoading: isLastFiveTeamsLoading,
    error: lastFiveTeamError,
  } = useQuery({
    queryKey: ["last-five-teams"],
    queryFn: fetchLastFiveTeams,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: props.userRole === "subed_club",
  });

  return (
    <Grid size={12}>
      <Card sx={{ m: 2 }}>
        <CardHeader
          title={"Equipas adicionadas recentemente"}
          subheader={"A mostrar apenas as 5 últimas Equipas."}
          sx={{
            pb: 0,
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
              mb: 1,
            },
          }}
        ></CardHeader>
        <List>
          {props.userRole === undefined ? (
            <ListItem sx={{ m: 0 }}>
              <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
                <ListItemIcon>
                  <Groups />
                </ListItemIcon>
                <ListItemText primary={"Sem sessão iniciada. Faça Login."} />
              </ListItemButton>
            </ListItem>
          ) : isLastFiveTeamsLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : lastFiveTeamError ? (
            <ListItem sx={{ m: 0 }}>
              <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
                <ListItemIcon>
                  <Groups />
                </ListItemIcon>
                <ListItemText
                  primary={"Ocorreu um erro ao carregar as Equipas."}
                />
              </ListItemButton>
            </ListItem>
          ) : lastFiveTeamsData?.data.length === 0 ? (
            <ListItem sx={{ m: 0 }}>
              <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
                <ListItemIcon>
                  <Groups />
                </ListItemIcon>
                <ListItemText
                  primary={"Não registou nenhuma Equipa recentemente."}
                />
              </ListItemButton>
            </ListItem>
          ) : (
            lastFiveTeamsData?.data.map((team: Team, index: string) => (
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
        <CardActions sx={{ justifyContent: "space-between" }}>
          {props.userRole === "free_club" ? null : (
            <>
              <AddButton label="Adicionar" to="teams/new_team/"></AddButton>
              <InfoButton label="Ver Todas" to="teams/"></InfoButton>
            </>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
