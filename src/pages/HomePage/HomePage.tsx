import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Box,
  CircularProgress,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
  Tooltip,
  IconButton,
} from "@mui/material";
import AthletesHomeComponent from "../../components/home-cards/AthletesHomeComponent";
import TeamsHomeComponent from "../../components/home-cards/TeamsHomeComponent";
import NextCompHomeComponent from "../../components/home-cards/NextCompHomeComponent";
import LastCompQualiHomeComponent from "../../components/home-cards/LastCompQualiHomeComponent";
import {
  useFetchHomeDojoNotifications,
  useRemoveNotification,
} from "../../hooks/useNotificationData";
import { Delete, KeyboardArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function HomePage(props: Readonly<{ userRole: string }>) {
  type Notification = {
    id: string;
    notification: string;
    urgency: string;
    can_remove: boolean;
    type: string;
  };

  const navigate = useNavigate()

  const {
    data: notificationData,
    isLoading: isNotificationLoading,
    error: notificationError,
  } = useFetchHomeDojoNotifications();

  const removeNotification = useRemoveNotification();

  const handleFollowingAction = (noti_type: string) => {
    if (noti_type === "create_athlete") {
      navigate("/athletes/")
    }
  }

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
          subheader="Neste espaço aparecerão notificações importantes para o seu dojo. Fique
          atento."
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent sx={{ p: 0 }}>
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
            ) : axios.isAxiosError(notificationError) &&
              notificationError.response?.status === 403 ? (
              <ListItem disablePadding sx={{ m: 0 }}>
                <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
                  <ListItemText
                    primary={
                      "Comece uma subscrição para ter acesso a esta funcionalidade."
                    }
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              <li style={{ color: "grey" }}>
                Ocorreu um erro ao carregar as suas notificações.
              </li>
            )
          ) : notificationData?.data.length !== 0 ? (
            <List sx={{ p: 5, pt: 2 }}>
              {notificationData?.data.map(
                (noti: Notification, index: string) => (
                  <ListItem
                    key={index}
                    disablePadding
                    secondaryAction={
                      <>
                        <Tooltip title="Remover Notificação" placement="right">
                          <IconButton
                            disabled={!noti.can_remove}
                            onClick={() => {
                              removeNotification.mutate(noti.id);
                            }}
                            aria-label="delete notification"
                          >
                            <Delete
                              color={noti.can_remove ? "error" : "disabled"}
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Prosseguir ação" placement="left">
                          <IconButton
                            onClick={() => {handleFollowingAction(noti.type)}}
                            aria-label="notification action"
                            disabled={noti.type === "none"}
                          >
                            <KeyboardArrowRight color={noti.type === "none" ? "disabled" : "success"} />
                          </IconButton>
                        </Tooltip>
                      </>
                    }
                  >
                    <ListItemButton
                      disabled
                      sx={{
                        m: 0,
                        p: 1,
                        pl: 2,
                        borderLeft: `5px solid ${noti.urgency}`,
                        borderRight: `5px solid ${noti.urgency}`,
                        backgroundColor: "gray",
                      }}
                    >
                      <ListItemText
                        sx={{ color: noti.urgency, pr: 5 }}
                        primary={noti.notification}
                      />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List>
          ) : (
            <li style={{ color: "grey" }}>De momento não tem notificações.</li>
          )}
        </CardContent>
      </Card>
      <Grid container size={12}>
        <Grid size={6}>
          <AthletesHomeComponent
            userRole={props.userRole}
          ></AthletesHomeComponent>
          <TeamsHomeComponent userRole={props.userRole}></TeamsHomeComponent>
        </Grid>
        <Grid size={6}>
          <NextCompHomeComponent
            userRole={props.userRole}
          ></NextCompHomeComponent>
          <LastCompQualiHomeComponent
            userRole={props.userRole}
          ></LastCompQualiHomeComponent>
        </Grid>
      </Grid>
    </>
  );
}
