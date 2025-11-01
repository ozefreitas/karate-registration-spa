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
import InfoButton from "../Buttons/InfoButton";
import { useNavigate } from "react-router-dom";
import { membersHooks } from "../../hooks";

export default function AthletesHomeComponent(
  props: Readonly<{ userRole: string }>
) {
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
  } = membersHooks.useFetchLastFiveMembers();

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
          {props.userRole === undefined ? (
            <ListItem sx={{ m: 0 }}>
              <ListItemButton disabled sx={{ m: 0 }}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary={"Sem sessão iniciada. Faça Login."} />
              </ListItemButton>
            </ListItem>
          ) : isLastFiveAthletesLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : lastFiveAthletesError ? (
            <ListItem sx={{ m: 0 }}>
              <ListItemButton disabled sx={{ m: 0 }}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText
                  primary={"Ocorreu um erro ao carregar os atletas."}
                />
              </ListItemButton>
            </ListItem>
          ) : lastFiveAthletesData?.data.length === 0 ? (
            <ListItem sx={{ m: 0 }}>
              <ListItemButton disabled sx={{ m: 0 }}>
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
                      onClick={() => navigate(`athletes/${athlete.id}/`)}
                    >
                      <ListItemIcon>
                        <Person />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${athlete.first_name} ${athlete.last_name} | ${athlete.gender} | ${athlete.age} anos`}
                      />
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              )
            )
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

        <CardActions sx={{ justifyContent: "flex-end" }}>
          {props.userRole !== "free_club" ? (
            <InfoButton label="Ver Todos" to="athletes/"></InfoButton>
          ) : null}
        </CardActions>
      </Card>
    </Grid>
  );
}
