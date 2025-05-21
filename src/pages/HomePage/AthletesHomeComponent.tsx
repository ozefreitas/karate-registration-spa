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
import { Person } from "@mui/icons-material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import InfoButton from "../../components/InfoButton/InfoButton";
import AddButton from "../../components/AddButton/AddButton";
import { useNavigate } from "react-router-dom";

const fetchLastFiveAthletes = () => {
  const token = localStorage.getItem("token");
  return axios.get("http://127.0.0.1:8000/athletes/last_five/", {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export default function AthletesHomeComponent() {
  type Athlete = {
    id: string;
    first_name: string;
    last_name: string;
    age: string;
    graduation: string;
    category: string;
    match_type: string;
    gender: string;
  };

  const navigate = useNavigate();

  const {
    data: lastFiveAthletesData,
    isLoading: isLastFiveAthletesLoading,
    error: lastFiveAthletesError,
  } = useQuery({
    queryKey: ["last-five-athletes"],
    queryFn: fetchLastFiveAthletes,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <Grid size={12}>
      <Card sx={{ m: 2 }}>
        <CardHeader
          title={"Atletas adicionados recentemente"}
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <List>
          {isLastFiveAthletesLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : lastFiveAthletesError ? (
            axios.isAxiosError(lastFiveAthletesError) &&
            lastFiveAthletesError.response?.status === 401 ? (
              <ListItem sx={{ m: 0 }}>
                <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary={"Sem sessão iniciada. Faça Login."} />
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem sx={{ m: 0 }}>
                <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Ocorreu um erro ao carregar os atletas."}
                  />
                </ListItemButton>
              </ListItem>
            )
          ) : lastFiveAthletesData?.data.length === 0 ? (
            <ListItem sx={{ m: 0 }}>
              <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText
                  primary={"Não registou nenhum Atleta recentemente."}
                />
              </ListItemButton>
            </ListItem>
          ) : (
            lastFiveAthletesData?.data.map(
              (athlete: Athlete, index: number) => (
                <Tooltip key={index} title={"Consultar"}>
                  <ListItem sx={{ m: 0, pb: 0 }}>
                    <ListItemButton
                      onClick={() => navigate(`athletes/${athlete.id}`)}
                    >
                      <ListItemIcon>
                        <Person />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${athlete.first_name} ${athlete.last_name} ${athlete.match_type} ${athlete.category} ${athlete.gender}`}
                      />
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              )
            )
          )}
        </List>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <InfoButton label="Ver Todos" to="athletes/"></InfoButton>
          <AddButton label="Adicionar" to="athletes/new_athlete/"></AddButton>
        </CardActions>
      </Card>
    </Grid>
  );
}
