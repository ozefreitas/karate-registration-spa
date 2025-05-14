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
  Tooltip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import AddButton from "../../components/AddButton/AddButton";
import InfoButton from "../../components/InfoButton/InfoButton";
import { Person, SportsMma, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  type Competition = {
    id: string;
    name: string;
    season: string;
    location: string;
    competition_date: string;
  };

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

  type Team = {
    id: string;
    team_number: number;
    category: string;
    match_type: string;
    gender: string;
  };

  type Notification = {
    notification: string;
    urgency: string;
  };

  type CategoryClassification = {
    id: number;
    full_category: string;
    first_place: Athlete;
    second_place: Athlete;
    third_place: Athlete;
  };

  const [nextCompetition, setNextCompetitions] = useState<Competition>();
  const [lastCompetition, setLastCompetitions] = useState<Competition>();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [classifications, setClassifications] = useState<
    CategoryClassification[]
  >([]);
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/competitions/next_comp/")
      .then((response) => setNextCompetitions(response.data))
      .catch((error) => console.error(error));
    axios
      .get("http://127.0.0.1:8000/competitions/last_comp/")
      .then((response) => setLastCompetitions(response.data))
      .catch((error) => console.error(error));
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/athletes/last_five/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => setAthletes(response.data))
      .catch((error) => console.error(error));
    axios
      .get("http://127.0.0.1:8000/teams/last_five/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => setTeams(response.data))
      .catch((error) => console.error(error));
    axios
      .get("http://127.0.0.1:8000/dojos/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => setNotifications(response.data))
      .catch((error) => console.error(error));
    axios
      .get("http://127.0.0.1:8000/classifications/last_comp_quali/")
      .then((response) => setClassifications(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
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
        <CardContent sx={{ p: 0 }}>
          <ul>
            {notifications.length >= 1 ? (
              notifications.map((noti, index) => (
                <li style={{ color: noti.urgency }} key={index}>
                  {noti.notification}
                </li>
              ))
            ) : (
              <li style={{ color: "grey" }}>
                De momento não tem notificações.
              </li>
            )}
          </ul>
        </CardContent>
      </Card>
      <Grid container size={12}>
        <Grid size={6}>
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
                {athletes.length > 1 ? (
                  athletes.map((athlete, index) => (
                    <Tooltip key={index} title={"Consultar"}>
                      <ListItem sx={{ m: 0, pb: 0 }}>
                        <ListItemButton
                          onClick={() => navigate(`athletes/${athlete.id}`)}
                        >
                          <ListItemIcon>
                            <Person></Person>
                          </ListItemIcon>
                          <ListItemText
                            primary={`${athlete.first_name} ${athlete.last_name} ${athlete.match_type} ${athlete.category} ${athlete.gender}`}
                          />
                        </ListItemButton>
                      </ListItem>
                    </Tooltip>
                  ))
                ) : (
                  <ListItem sx={{ m: 0 }}>
                    <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
                      <ListItemIcon>
                        <Person></Person>
                      </ListItemIcon>
                      <ListItemText
                        primary={"Não registou nenhum Atleta recentemente."}
                      />
                    </ListItemButton>
                  </ListItem>
                )}
              </List>
              <CardActions sx={{ justifyContent: "space-between" }}>
                <InfoButton label="Ver Todos" to="athletes/"></InfoButton>
                <AddButton
                  label="Adicionar"
                  to="athletes/new_athlete/"
                ></AddButton>
              </CardActions>
            </Card>
          </Grid>
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
                {teams.length >= 1 ? (
                  teams.map((team, index) => (
                    <Tooltip key={index} title={"Consultar"}>
                      <ListItem sx={{ m: 0, pb: 0 }}>
                        <ListItemButton
                          onClick={() => navigate(`teams/${team.id}`)}
                        >
                          <ListItemIcon>
                            <Person></Person>
                          </ListItemIcon>
                          <ListItemText
                            primary={`${team.match_type} ${team.category} ${team.gender} Nº ${team.team_number}`}
                          />
                        </ListItemButton>
                      </ListItem>
                    </Tooltip>
                  ))
                ) : (
                  <ListItem sx={{ m: 0 }}>
                    <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
                      <ListItemIcon>
                        <Person></Person>
                      </ListItemIcon>
                      <ListItemText
                        primary={"Não registou nenhuma Equipa recentemente."}
                      />
                    </ListItemButton>
                  </ListItem>
                )}
              </List>
              <CardActions sx={{ justifyContent: "space-between" }}>
                <InfoButton label="Ver Todas" to="teams/"></InfoButton>
                <AddButton label="Adicionar" to="teams/new_team/"></AddButton>
              </CardActions>
            </Card>
          </Grid>
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
              {nextCompetition?.name !== "" ? (
                <List>
                  <Tooltip title={"Consultar"}>
                    <ListItem sx={{ m: 0 }}>
                      <ListItemButton sx={{ m: 0, pb: 0 }}>
                        <ListItemIcon>
                          <SportsMma></SportsMma>
                        </ListItemIcon>
                        <ListItemText primary={nextCompetition?.name} />
                      </ListItemButton>
                    </ListItem>
                  </Tooltip>
                </List>
              ) : (
                <ListItem sx={{ m: 0 }}>
                  <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
                    <ListItemIcon>
                      <SportsMma></SportsMma>
                    </ListItemIcon>
                    <ListItemText primary={"Não há competições disponíveis."} />
                  </ListItemButton>
                </ListItem>
              )}
              <CardActions sx={{ justifyContent: "space-between" }}>
                <InfoButton
                  disabled={nextCompetition?.id ? false : true}
                  label="Ver Prova"
                  to={`competitions/${nextCompetition?.id}`}
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
                subheader={`Última prova: ${lastCompetition?.name} ${lastCompetition?.season}`}
              ></CardHeader>
              <CardContent sx={{ pt: 0, pb: 0 }}>
                {classifications.map((category, index) => (
                  <Accordion key={index} sx={{ m: 2 }}>
                    <AccordionSummary
                      sx={{ pl: 4 }}
                      expandIcon={<ExpandMore />}
                    >
                      <Typography component="span">
                        {category.full_category}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 1, mb: 1 }}>
                      <List sx={{ m: 0, p: 0 }}>
                        <ListItem
                          sx={{
                            m: 0,
                          }}
                        >
                          <Tooltip title={"Consultar"}>
                            <ListItemButton
                              onClick={() =>
                                navigate(`athletes/${category.first_place.id}`)
                              }
                              sx={{
                                m: 0,
                                pb: 0,
                              }}
                            >
                              <ListItemText
                                primary={`🥇 ${category.first_place.first_name} ${category.first_place.last_name}`}
                              />
                            </ListItemButton>
                          </Tooltip>
                        </ListItem>
                        <Tooltip title={"Consultar"}>
                          <ListItem
                            onClick={() =>
                              navigate(`athletes/${category.second_place.id}`)
                            }
                            sx={{ m: 0 }}
                          >
                            <ListItemButton
                              sx={{
                                m: 0,
                                pb: 0,
                                pt: 0,
                              }}
                            >
                              <ListItemText
                                primary={`🥈 ${category.second_place.first_name} ${category.second_place.last_name}`}
                              />
                            </ListItemButton>
                          </ListItem>
                        </Tooltip>
                        <Tooltip title={"Consultar"}>
                          <ListItem sx={{ m: 0 }}>
                            <ListItemButton
                              onClick={() =>
                                navigate(`athletes/${category.third_place.id}`)
                              }
                              sx={{
                                m: 0,
                                pb: 0,
                                pt: 0,
                              }}
                            >
                              <ListItemText
                                primary={`🥉 ${category.third_place.first_name} ${category.third_place.last_name}`}
                              />
                            </ListItemButton>
                          </ListItem>
                        </Tooltip>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ))}
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
