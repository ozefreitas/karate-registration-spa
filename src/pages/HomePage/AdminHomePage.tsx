import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import NextCompHomeComponent from "../../components/home-cards/NextCompHomeComponent";
import LastCompQualiHomeComponent from "../../components/home-cards/LastCompQualiHomeComponent";
import DojoStats from "../../components/home-cards/DojoStats";
import { useFetchHomeDojoNotifications } from "../../hooks/useNotificationData";

export default function AdminHomePage(props: Readonly<{ userRole: string }>) {
  type Notification = {
    notification: string;
    urgency: string;
  };

  const {
    data: notificationData,
    isLoading: isNotificationLoading,
    error: notificationError,
  } = useFetchHomeDojoNotifications();

  return (
    <>
      <Card sx={{ m: 2, mb: 0 }}>
        <CardHeader
          title={"Central de notificações"}
          subheader="Neste espaço aparecerão notificações importantes acerca dos seus dojos. Fique
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
          <NextCompHomeComponent
            userRole={props.userRole}
          ></NextCompHomeComponent>
          <DojoStats></DojoStats>
        </Grid>
        <Grid size={6}>
          <LastCompQualiHomeComponent
            userRole={props.userRole}
          ></LastCompQualiHomeComponent>
        </Grid>
      </Grid>
    </>
  );
}
