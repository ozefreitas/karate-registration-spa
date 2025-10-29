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
  props: Readonly<{ userRole: string }>
) {
  type Team = {
    id: string;
    team_number: number;
    category: string;
    match_type: string;
    gender: string;
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
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
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
                <ListItem sx={{ m: 0, pb: 0 }}>
                  <ListItemButton onClick={() => navigate(`teams/${team.id}/`)}>
                    <ListItemIcon>
                      <Groups />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${team.match_type} ${team.category} ${team.gender} Nº ${team.team_number}`}
                    />
                  </ListItemButton>
                </ListItem>
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
