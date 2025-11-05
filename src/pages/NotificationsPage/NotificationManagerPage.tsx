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
  CircularProgress,
  FormControl,
  Stack,
  FormControlLabel,
  Switch,
  FormHelperText,
  Tooltip,
} from "@mui/material";
import { notificationsHooks, adminHooks } from "../../hooks";
import FormCard from "../../dashboard/FormCard";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Add, NotificationsActive } from "@mui/icons-material";
import NotificationActionModal from "./NotificationActionModal";
import { NotificationTypeOptions } from "../../dashboard/config";
import { PaymentTypes } from "../../config";
import { eventsHooks } from "../../hooks";

export default function NotificationManagerPage() {
  const [selectedUserId, setSelectedUserId] = useState<string>("0");
  const { data: clubUserData } = adminHooks.useFetchClubUsersData();
  const { data: notificationData, isLoading: isNotificationDataLoading } =
    notificationsHooks.useFetchNotificationsData(selectedUserId);
  const createNotification = notificationsHooks.useCreateNotification();
  const createAllClubsNotification =
    notificationsHooks.useCreateAllClubsNotification();
  const removeNotification = notificationsHooks.useRemoveNotification();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedNotificationId, setSelectedNotificationId] =
    useState<string>("");

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      notification: "",
      club_user: "0",
      noti_all: false,
      type: "none",
      payment_object: "none",
      can_remove: true,
      target_event: "",
    },
  });

  const onSubmit = async (data: any) => {
    if (data.noti_all) {
      createAllClubsNotification.mutateAsync(data, {
        onSuccess: () => {
          reset();
        },
      });
    } else {
      createNotification.mutate(data, {
        onSuccess: () => {
          reset();
        },
      });
    }
  };

  const {
    data: eventsData,
    isLoading: isEventsLoading,
    refetch,
    isFetching,
    isFetched,
    isStale,
  } = eventsHooks.useFetchEventsData(1, 100);

  const formType = watch("type");

  useEffect(() => {
    const shouldRefetch = [
      "registrations_closing",
      "registrations_close",
      "open_registrations",
      "classifications_available",
      "rate_event",
    ].includes(formType);

    if (shouldRefetch && !isFetching && !isFetched) {
      refetch();
    } else if (shouldRefetch && !isFetching && isFetched && isStale) {
      refetch();
    }
  }, [formType, isFetching, isStale, isFetched, refetch]);

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
          Aqui poderá registar gerir todas as notificações para os clubes
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
            label="Clube Associada"
            select
            fullWidth
            value={selectedUserId}
            onChange={handleChange}
          >
            <MenuItem value="0">-- Selecionar --</MenuItem>
            {clubUserData?.data.map((item: any, index: string) => (
              <MenuItem key={index} value={item.id}>
                {item.username}
              </MenuItem>
            ))}
          </TextField>
          <List sx={{ mt: 1 }}>
            {selectedUserId === "0" ? (
              <ListItem sx={{ pb: 0, mb: 0, color: "grey" }}>
                Comece por selecionar um Clube.
              </ListItem>
            ) : isNotificationDataLoading ? (
              <Grid container justifyContent="center" mt={1} size={12}>
                <CircularProgress />
              </Grid>
            ) : notificationData?.data.results.length === 0 ? (
              <ListItem sx={{ pb: 0, mb: 0, color: "grey" }}>
                Este Clube não tem notificações em seu nome.
              </ListItem>
            ) : (
              notificationData?.data.results.map(
                (notification: any, index: string) => (
                  <ListItem dense sx={{ m: 0 }} key={index}>
                    <Tooltip title="Clique para eliminar esta Notificação">
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
                          }}
                        >
                          {notification.notification}
                        </Typography>
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                )
              )
            )}
          </List>
        </Grid>
      </FormCard>
      <FormCard title="Criar Notificação">
        <Grid sx={{ p: 2 }} size={6}>
          <Controller
            name="club_user"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Clube para Notificar"
                type="text"
                fullWidth
                disabled={watch("noti_all")}
                select
                required
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.club_user}
                helperText={errors.club_user?.message}
              >
                <MenuItem value="0">-- Selecionar --</MenuItem>
                {clubUserData?.data.map((item: any, index: string) => (
                  <MenuItem key={index} value={item.id}>
                    {item.username}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid sx={{ p: 3 }} container justifyContent={"flex-end"} size={6}>
          <Controller
            name="noti_all"
            control={control}
            render={({ field }) => (
              <FormControl component="fieldset" variant="standard">
                <Stack spacing={1}>
                  <FormControlLabel
                    labelPlacement="start"
                    control={
                      <Switch
                        {...field}
                        checked={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                        }}
                        name="noti_all"
                      />
                    }
                    label="Notificar todos os Clubes associados"
                    sx={{ justifyContent: "left", marginLeft: 0 }}
                  />
                  {!!errors.noti_all && (
                    <FormHelperText error sx={{ marginLeft: "14px" }}>
                      {errors.noti_all?.message}
                    </FormHelperText>
                  )}
                </Stack>
              </FormControl>
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
        <Grid sx={{ p: 2 }} size={6}>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Tipo de Notificação"
                type="text"
                fullWidth
                select
                required
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.type}
                helperText={errors.type?.message}
              >
                {NotificationTypeOptions.filter(
                  (item) => !["reset"].includes(item.value)
                ).map((item: any, index: any) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        {["payment_available", "payment_overdue"].includes(watch("type")) ? (
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="payment_object"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Tipo de Pagamento"
                  type="text"
                  fullWidth
                  select
                  required
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.payment_object}
                  helperText={errors.payment_object?.message}
                >
                  <MenuItem value="none">-- Selecionar --</MenuItem>
                  {PaymentTypes.map((item: any, index: any) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        ) : [
            "registrations_closing",
            "registrations_close",
            "open_registrations",
            "classifications_available",
            "rate_event",
          ].includes(watch("type")) ? (
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="target_event"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Evento Alvo"
                  type="text"
                  fullWidth
                  select
                  required
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.payment_object}
                  helperText={errors.payment_object?.message}
                >
                  <MenuItem value="">-- Selecionar --</MenuItem>
                  {isEventsLoading ? (
                    <Grid container justifyContent="center" mt={1} size={12}>
                      <CircularProgress />
                    </Grid>
                  ) : (
                    eventsData?.data.results.map((item: any, index: any) => (
                      <MenuItem key={index} value={item.id}>
                        {item.name} {item.season}
                      </MenuItem>
                    ))
                  )}
                </TextField>
              )}
            />
          </Grid>
        ) : null}
        <CardActions
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid sx={{ p: 2 }} container size={6}>
            <Controller
              name="can_remove"
              control={control}
              render={({ field }) => (
                <FormControl component="fieldset" variant="standard">
                  <Stack spacing={1}>
                    <FormControlLabel
                      labelPlacement="start"
                      control={
                        <Switch
                          {...field}
                          checked={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                          }}
                          name="can_remove"
                        />
                      }
                      label="Pode ser dispensada pelo(s) Clube(s)"
                      sx={{ justifyContent: "left", marginLeft: 0 }}
                    />
                    {!!errors.can_remove && (
                      <FormHelperText error sx={{ marginLeft: "14px" }}>
                        {errors.can_remove?.message}
                      </FormHelperText>
                    )}
                  </Stack>
                </FormControl>
              )}
            />
          </Grid>
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
      {selectedNotificationId === "" ? null : (
        <NotificationActionModal
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
          handleModalOpen={handleModalOpen}
          id={selectedNotificationId}
          mutation={removeNotification.mutate}
          setSelected={setSelectedNotificationId}
        ></NotificationActionModal>
      )}
    </>
  );
}
