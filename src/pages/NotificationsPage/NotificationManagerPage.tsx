import {
  TextField,
  MenuItem,
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
  ListItemText,
} from "@mui/material";
import { notificationsHooks, adminHooks, eventsHooks } from "../../hooks";
import FormCard from "../../dashboard/FormCard";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Add } from "@mui/icons-material";
import NotificationActionModal from "./NotificationActionModal";
import {
  getNotificationTypeIcon,
  NotificationTypeOptions,
} from "../../dashboard/config";
import { PaymentTypes } from "../../config";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import { Notifications } from "../../openapi";

export default function NotificationManagerPage(
  props: Readonly<{ userRole: string }>,
) {
  const [selectedUserId, setSelectedUserId] = useState<string>("0");
  const { data: clubUserData } = adminHooks.useFetchClubUsersData(
    undefined,
    props.userRole,
  );
  const { data: notificationData, isLoading: isNotificationDataLoading } =
    notificationsHooks.useFetchNotificationsData(
      1,
      100,
      "",
      undefined,
      undefined,
      selectedUserId,
    );
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
      "draw_available",
      "draw_patched",
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
      <PageInfoCard
        description="Aqui poderá registar gerir todas as notificações para os clubes
          associadas. Caso queira apagar um notificação, basta clicar nela. Não
          é, para já, possível editar notificações, para isso recomenda-se
          apagar e criar uma nova."
        title="Gestor de Notificações"
      ></PageInfoCard>
      <Grid container spacing={2}>
        <FormCard title="Notificações ativas">
          <Grid size={12} p={2}>
            <TextField
              color="warning"
              variant={"outlined"}
              label="Clube Associado"
              select
              fullWidth
              value={selectedUserId}
              onChange={handleChange}
            >
              {clubUserData ? (
                <MenuItem sx={{ color: "lightgrey" }} value="">
                  -- Selecionar --
                </MenuItem>
              ) : (
                <MenuItem disabled>Sem opções disponíveis.</MenuItem>
              )}
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
              ) : notificationData?.results.length === 0 ? (
                <ListItem sx={{ pb: 0, mb: 0, color: "grey" }}>
                  Este Clube não tem notificações em seu nome.
                </ListItem>
              ) : (
                <Grid
                  borderRadius={5}
                  bgcolor={"#bad7ff63"}
                  py={2}
                  px={1}
                  width={"100%"}
                >
                  {notificationData?.results.map(
                    (notification: Notifications, index: any) => (
                      <ListItem sx={{ m: 0 }} key={index}>
                        <Tooltip title="Eliminar">
                          <span style={{ width: "100%" }}>
                            <ListItemButton
                              sx={{ pr: 2 }}
                              onClick={() =>
                                handleClick(notification.id.toString())
                              }
                            >
                              <ListItemIcon>
                                {getNotificationTypeIcon(notification.type!)}
                              </ListItemIcon>
                              <ListItemText
                                primary={notification.notification}
                              ></ListItemText>
                              {/* <Typography
                              sx={{
                                m: 0,
                                pb: 0,
                              }}
                            >

                            </Typography> */}
                            </ListItemButton>
                          </span>
                        </Tooltip>
                      </ListItem>
                    ),
                  )}
                </Grid>
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
                  {clubUserData ? (
                    <MenuItem sx={{ color: "lightgrey" }} value="">
                      -- Selecionar --
                    </MenuItem>
                  ) : (
                    <MenuItem disabled>Sem opções disponíveis.</MenuItem>
                  )}
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
                          sx={{ ml: 2 }}
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
                    (item) => !["reset", "member_request"].includes(item.value),
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
                    <MenuItem sx={{ color: "lightgrey" }} value="none">
                      -- Selecionar --
                    </MenuItem>
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
              "draw_available",
              "draw_patched",
              "rate_event",
              "member_updated",
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
                    {isEventsLoading ? (
                      <Grid container justifyContent="center" mt={1} size={12}>
                        <CircularProgress />
                      </Grid>
                    ) : (
                      <>
                        {eventsData?.count === 0 ? (
                          <MenuItem disabled>Sem opções disponíveis.</MenuItem>
                        ) : (
                          <MenuItem sx={{ color: "lightgrey" }} value="">
                            -- Selecionar --
                          </MenuItem>
                        )}
                        {eventsData?.results.map((item: any, index: any) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name} {item.season}
                          </MenuItem>
                        ))}
                      </>
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
      </Grid>

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
