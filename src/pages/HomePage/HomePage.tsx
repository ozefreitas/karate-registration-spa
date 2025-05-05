import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./homepage.module.css";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  CardActions,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import AddButton from "../../components/AddButton/AddButton";
import InfoButton from "../../components/InfoButton/InfoButton";
import { Person, SportsMma } from "@mui/icons-material";
import { Medal } from "lucide-react";

export default function HomePage() {
  type Competition = {
    id: string;
    name: string;
    season: string;
    location: string;
    competition_date: string;
  };

  type Athlete = {
    first_name: string;
    last_name: string;
    age: string;
    graduation: string;
    category: string;
    match_type: string;
    gender: string;
  };

  type Notification = {
    notification: string;
    urgency: string;
  };

  const [nextCompetition, setNextCompetitions] = useState<Competition>();
  const [lastCompetition, setLastCompetitions] = useState<Competition>();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/competitions/next_comp/")
      .then((response) => setNextCompetitions(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/competitions/last_comp/")
      .then((response) => setLastCompetitions(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/athletes/last_five/")
      .then((response) => setAthletes(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/dojos/")
      .then((response) => setNotifications(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Card sx={{ m: 2, mt: 6 }}>
        <CardHeader
          title={"Bem-vindo à plataforma de registos da SKI-P."}
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Este é o ecrã principal desta plataforma. Aqui poderá ver informações
          relevantes e rápidas, assim como notificações específicas para si.
        </CardContent>
      </Card>
      <Card sx={{ m: 2 }}>
        <CardHeader
          title={"Central de notificações"}
          subheader="Neste espaço aparecerão notificações importante para o seu dojo. Fique
          atento."
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          <ul>
            {notifications.map((noti, index) => (
              <li style={{ color: noti.urgency }} key={index}>
                {noti.notification}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Grid container size={12}>
        <Grid size={6}>
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
              {athletes.map((athlete, index) => (
                <ListItem key={index} sx={{ m: 0, pb: 0 }}>
                  <ListItemButton>
                    <ListItemIcon>
                      <Person></Person>
                    </ListItemIcon>
                    <ListItemText
                      primary={`${athlete.first_name} ${athlete.last_name} ${athlete.match_type} ${athlete.category} ${athlete.gender}`}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <CardActions sx={{ justifyContent: "space-between" }}>
              <InfoButton label="Ver Todos" to="athletes/"></InfoButton>
              <AddButton label="Adicionar"></AddButton>
            </CardActions>
          </Card>
        </Grid>
        <Grid size={6}>
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
              {nextCompetition ? (
                <List>
                  <ListItem sx={{ m: 0 }}>
                    <ListItemButton sx={{ m: 0, pb: 0 }}>
                      <ListItemIcon>
                        <SportsMma></SportsMma>
                      </ListItemIcon>
                      <ListItemText primary={nextCompetition?.name} />
                    </ListItemButton>
                  </ListItem>
                </List>
              ) : (
                <Typography variant="h6">Não há competições.</Typography>
              )}
              <CardActions sx={{ justifyContent: "space-between" }}>
                <InfoButton
                  label="Ver Prova"
                  to={`competition/${nextCompetition?.id}`}
                ></InfoButton>
                <InfoButton label="Ver Todas" to="competitions/"></InfoButton>
              </CardActions>
            </Card>
          </Grid>
          <Grid size={12}>
            <Card sx={{ m: 2 }}>
              <CardHeader
                sx={{
                  "& .MuiCardHeader-title": {
                    fontWeight: "bold",
                    mb: 1,
                  },
                }}
                title="Últimas Classificações"
                subheader={`${lastCompetition?.name} ${lastCompetition?.season}`}
              ></CardHeader>
              <CardContent sx={{ pt: 0, pb: 0 }}>
                <List>
                  <ListItem sx={{ m: 0 }}>
                    <ListItemButton sx={{ m: 0, pb: 0 }}>
                      <ListItemIcon>
                        <Medal size={22} color="gold" />
                      </ListItemIcon>
                      <ListItemText primary="Portugal" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem sx={{ m: 0 }}>
                    <ListItemButton sx={{ m: 0, pb: 0 }}>
                      <ListItemIcon>
                        <Medal size={22} color="silver" />
                      </ListItemIcon>
                      <ListItemText primary="Portugal" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem sx={{ m: 0 }}>
                    <ListItemButton sx={{ m: 0, pb: 0 }}>
                      <ListItemIcon>
                        <Medal size={22} color="#cd7f32" />
                      </ListItemIcon>
                      <ListItemText primary="Portugal" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <InfoButton
                  label="Ver Todas"
                  to="classifications/"
                ></InfoButton>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      {/* <div className={styles.competition_card_selector}>
        {competitions.map((competition, i) => (
          <div key={i} className={styles.competition_card}>
            {competition.name} {competition.season}
            <p className={styles.quick_info}>
              <span>{competition.competition_date}</span>
              <span>{competition.location}</span>
            </p>
            <button className="default-button">Consultar</button>
          </div>
        ))}
      </div> */}
    </>
  );
}
