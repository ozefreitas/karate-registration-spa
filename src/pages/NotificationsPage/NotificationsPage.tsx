import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  MenuItem,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Grid,
  CardActions,
  Button,
  ListItemIcon,
} from "@mui/material";
import { notificationsHooks, adminHooks } from "../../hooks";
import FormCard from "../../dashboard/FormCard";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { NotificationUrgencyOptions } from "../../config";
import { Add, NotificationsActive } from "@mui/icons-material";
import NotificationActionModal from "./NotificationActionModal";

export default function NotificationsPage() {
  const [selectedUserId, setSelectedUserId] = useState<string>("0");
  const { data: dojoUserData } = adminHooks.useFetchClubUsersData();
  const { data: notificationData } =
    notificationsHooks.useFetchNotificationsData(selectedUserId);
  const createNotification = notificationsHooks.useCreateNotification();
  const removeNotification = notificationsHooks.useRemoveNotification();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedNotificationId, setSelectedNotificationId] =
    useState<string>("");

  const {
    control,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      notification: "",
      urgency: "",
      dojo: "0",
    },
  });

  const onSubmit = async (data: any) => {
    createNotification.mutate({ data: data });
    reset();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUserId(event.target.value);
  };

  const handleClick = (notificationId: string) => {
    setSelectedNotificationId(notificationId);
    handleModalOpen();
  };

  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página de gerenciamento de Notificações"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá registar gerir todas as notificações para as contas
          associadas. Caso queira apagar um notificação, basta clicar nela. Não
          é, para já, possível editar notificações, para isso recomenda-se
          apagar e criar uma nova.
        </CardContent>
      </Card>
      <FormCard title="Notificações ativas">
        <Grid size={12} sx={{ p: 2 }}>
          <TextField
            color="warning"
            variant={"outlined"}
            label="Conta Associada"
            select
            fullWidth
            multiline
            maxRows={8}
            value={selectedUserId}
            onChange={handleChange}
          >
            <MenuItem value="0">-- Selecionar --</MenuItem>
            {dojoUserData?.data.map((item: any, index: string) => (
              <MenuItem key={index} value={item.id}>
                {item.username}
              </MenuItem>
            ))}
          </TextField>

          <List sx={{ mt: 1 }}>
            {selectedUserId == "0" ? null : notificationData?.data.results
                .length !== 0 ? (
              notificationData?.data.results.map(
                (notification: any, index: string) => (
                  <ListItem dense key={index} sx={{ m: 0 }}>
                    <ListItemButton
                      sx={{ p: 1 }}
                      onClick={() => handleClick(notification.id)}
                    >
                      <ListItemIcon>
                        <NotificationsActive />
                      </ListItemIcon>
                      <Typography
                        sx={{
                          m: 0,
                          pb: 0,
                          color:
                            notification.urgency == "yellow"
                              ? "gold"
                              : notification.urgency,
                        }}
                      >
                        {notification.notification}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                )
              )
            ) : (
              <ListItem sx={{ pb: 0, mb: 0, color: "grey" }}>
                Esta conta não tem notificações em seu nome.
              </ListItem>
            )}
          </List>
        </Grid>
      </FormCard>
      <FormCard title="Criar Notificação">
        <Grid sx={{ p: 2 }} size={6}>
          <Controller
            name="dojo"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Conta para Notificar"
                type="text"
                fullWidth
                multiline
                select
                required
                maxRows={8}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.dojo}
                helperText={errors.dojo?.message}
              >
                <MenuItem value="0">-- Selecionar --</MenuItem>
                {dojoUserData?.data.map((item: any, index: string) => (
                  <MenuItem key={index} value={item.id}>
                    {item.username}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid sx={{ p: 2 }} size={6}>
          <Controller
            name="urgency"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Gravidade"
                type="text"
                fullWidth
                multiline
                select
                required
                maxRows={8}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.urgency}
                helperText={errors.urgency?.message}
              >
                <MenuItem value="0">-- Selecionar --</MenuItem>
                {NotificationUrgencyOptions.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid sx={{ p: 2 }} size={12}>
          <Controller
            name="notification"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Conteúdo"
                type="text"
                fullWidth
                multiline
                required
                maxRows={8}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.notification}
                helperText={errors.notification?.message}
              ></TextField>
            )}
          />
        </Grid>
        <CardActions
          sx={{ width: "100%", display: "flex", justifyContent: " flex-end" }}
        >
          <Button
            sx={{ m: 1 }}
            variant="contained"
            size="large"
            color="success"
            onClick={() => handleSubmit(onSubmit)()}
            startIcon={<Add />}
          >
            Notificar
          </Button>
        </CardActions>
      </FormCard>
      {selectedNotificationId !== "" ? (
        <NotificationActionModal
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
          handleModalOpen={handleModalOpen}
          id={selectedNotificationId}
          mutation={removeNotification.mutate}
          setSelected={setSelectedNotificationId}
        ></NotificationActionModal>
      ) : null}
    </>
  );
}
