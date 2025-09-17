import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Box,
  CircularProgress,
  Tooltip,
  ListItem,
  List,
  ListItemButton,
  IconButton,
  ListItemText,
} from "@mui/material";
import { Delete, KeyboardArrowRight } from "@mui/icons-material";
import NextCompHomeComponent from "../../components/home-cards/NextCompHomeComponent";
import LastCompQualiHomeComponent from "../../components/home-cards/LastCompQualiHomeComponent";
import DojoStats from "../../components/home-cards/DojoStats";
import { notificationsHooks } from "../../hooks";
import { useNavigate } from "react-router-dom";

export default function AdminHomePage(props: Readonly<{ userRole: string }>) {
  type Notification = {
    id: string;
    notification: string;
    urgency: string;
    can_remove: boolean;
    type: string;
  };

  const navigate = useNavigate();

  const handleFollowingAction = (noti_type: string) => {
    if (noti_type === "create_athlete") {
      navigate("/athletes/");
    } else if (noti_type === "rate_event") {
      navigate("/events/");
    } else if (noti_type === "request") {
      navigate("/settings/");
    }
  };

  const {
    data: notificationData,
    isLoading: isNotificationLoading,
    error: notificationError,
  } = notificationsHooks.useFetchHomeDojoNotifications();

  const removeNotification = notificationsHooks.useRemoveNotification();

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
          {isNotificationLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : notificationError ? (
            <ListItem disablePadding sx={{ m: 0 }}>
              <ListItemButton disabled sx={{ m: 0, pb: 0, pl: 5 }}>
                <ListItemText
                  primary={"Ocorreu um erro ao carregar as suas notificações."}
                />
              </ListItemButton>
            </ListItem>
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
                            onClick={() => {
                              handleFollowingAction(noti.type);
                            }}
                            aria-label="notification action"
                            disabled={noti.type === "none"}
                          >
                            <KeyboardArrowRight
                              color={
                                noti.type === "none" ? "disabled" : "success"
                              }
                            />
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
                        borderLeft: `6px solid ${noti.urgency}`,
                        borderRight: `6px solid ${noti.urgency}`,
                        borderTop: `3px solid ${noti.urgency}`,
                        borderBottom: `3px solid ${noti.urgency}`,
                      }}
                    >
                      <ListItemText
                        sx={{ color: "black", pr: 5 }}
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
