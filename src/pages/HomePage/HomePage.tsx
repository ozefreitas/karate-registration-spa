import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AthletesHomeComponent from "./AthletesHomeComponent";
import TeamsHomeComponent from "./TeamsHomeComponent";
import NextCompHomeComponent from "./NextCompHomeComponent";
import LastCompQualiHomeComponent from "./LastCompQualiHomeComponent";
import { useFetchNotifications } from "../../hooks/useAuth";

export default function HomePage() {
  type Notification = {
    notification: string;
    urgency: string;
  };

  const {
    data: notificationData,
    isLoading: isNotificationLoading,
    error: notificationError,
  } = useFetchNotifications();

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
      <Card sx={{ m: 2, mb: 0 }}>
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
            {isNotificationLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : notificationError ? (
              axios.isAxiosError(notificationError) &&
              notificationError.response?.status === 401 ? (
                <li style={{ color: "grey" }}>
                  Sem sessão iniciada. Faça Login.
                </li>
              ) : (
                <li style={{ color: "grey" }}>
                  Ocorreu um erro ao carregar as suas notificações.
                </li>
              )
            ) : notificationData?.data.length !== 0 ? (
              notificationData?.data.map(
                (noti: Notification, index: string) => (
                  <li style={{ color: noti.urgency }} key={index}>
                    {noti.notification}
                  </li>
                )
              )
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
          <AthletesHomeComponent></AthletesHomeComponent>
          <TeamsHomeComponent></TeamsHomeComponent>
        </Grid>
        <Grid size={6}>
          <NextCompHomeComponent></NextCompHomeComponent>
          <LastCompQualiHomeComponent></LastCompQualiHomeComponent>
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
