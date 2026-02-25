import {
  Grid,
  Card,
  Typography,
  Pagination,
  CircularProgress,
  CardContent,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import { notificationsHooks } from "../../hooks";
import { useState } from "react";
import { getNotificationTypeIcon } from "../../dashboard/config";
import { formatDateTime, formatTimeDifference } from "../../utils/utils";
import { Delete, KeyboardArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import NotificationsFilters from "../../components/filter_drawers/NotificationsFilters";
import NotificationsOrdering from "../../components/filter_drawers/NotificationsOrdering";
import { useForm } from "react-hook-form";

const NotificationsPage = (props: { me: any }) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, _] = useState<number>(10);
  const [selectedTypes, setSelectedTypes] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const removeNotification = notificationsHooks.useRemoveNotification();

  const handleFollowingAction = (noti: any) => {
    const noti_type = noti.type;
    if (noti_type === "create_member") {
      navigate("/members/");
    } else if (noti_type === "member_updated") {
      navigate(`/members/${noti.target_person}/?section=personal_info`);
    } else if (noti_type === "rate_event") {
      navigate(`/events/${noti.target_event.id}/`);
    } else if (noti_type === "reset") {
      navigate("/settings/");
    } else if (noti_type === "classifications_available") {
      navigate("/classifications/");
    } else if (noti_type === "member_request") {
      navigate("/settings/?section=members_manager");
    } else if (noti_type === "payment_overdue") {
      navigate(`/members/${noti.target_person}/?section=payments_management`);
    } else if (noti_type === "draw_available") {
      navigate(`/events/${noti.target_event.id}/draw/`);
    } else if (noti_type === "draw_patched") {
      navigate(`/events/${noti.target_event.id}/draw/`);
    } else if (noti_type === "exam_prop") {
      navigate("/settings/?section=members_manager");
    } else if (
      [
        "open_registrations",
        "registrations_closing",
        "registrations_close",
      ].includes(noti_type)
    ) {
      navigate("/events/");
    }
  };

  const {
    control: filtersControl,
    watch: filtersWatch,
    setValue: filtersSetValue,
    reset: filtersReset,
    formState: { errors: filtersErrors, dirtyFields: filtersDirtyFields },
  } = useForm({
    defaultValues: {
      canRemove: undefined,
    },
  });

  console.log(filtersWatch("canRemove"));

  const {
    control: orderControl,
    watch: orderWatch,
    reset: orderReset,
    formState: { errors: orderErrors, dirtyFields: orderDirtyFields },
  } = useForm({
    defaultValues: {
      notification: "",
      type: "",
      created_at: "-created_at",
    },
  });

  const filtersChangedCount = Object.keys(filtersDirtyFields).length;
  const orderChangedCount = Object.keys(orderDirtyFields).length;

  const [orderFields, setOrderFields] = useState([
    {
      key: "notification",
      label: "Conteúdo",
      options: ["notification", "-notification"],
    },
    {
      key: "type",
      label: "Tipo",
      options: ["type", "-type"],
    },
    {
      key: "created_at",
      label: "Data",
      options: ["created_at", "-created_at"],
    },
  ]);

  const ordering = orderFields
    .map((f: any) => orderWatch(f.key)) // get value from react-hook-form
    .filter(Boolean)
    .join(",");

  const { data: notificationsData, isLoading: isNotificationsLoading } =
    notificationsHooks.useFetchNotificationsData(
      page,
      pageSize,
      ordering,
      selectedTypes,
      filtersWatch("canRemove"),
      ["superuser", "main_admin", "single_admin"].includes(props.me.data.role)
        ? props.me.data.id
        : undefined,
    );

  function IconBox({ icon }: Readonly<{ icon: React.ReactNode }>) {
    return (
      <Box
        sx={{
          width: 54,
          height: 54,
          borderRadius: 2,
          bgcolor: "red",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          color: "#fff",
        }}
      >
        {icon}
      </Box>
    );
  }

  return (
    <>
      <PageInfoCard
        description={
          <p>
            Verifique todas as notificações disponíveis. Clicando em{" "}
            <strong>Prosseguir Ação</strong> pode dirigir-se de imediato para o
            local da notificação. <br />
            Algumas Notificações não poderão ser eliminadas sem tomar a devida
            ação.
          </p>
        }
        title="Notificações"
      ></PageInfoCard>
      <Grid size={12} container m={2} spacing={2}>
        <Grid
          m={1}
          container
          justifyContent={"space-between"}
          alignItems={"center"}
          size={12}
        >
          {isNotificationsLoading ? (
            <Grid
              height={100}
              container
              justifyContent={"center"}
              alignItems={"center"}
            >
              <CircularProgress />
            </Grid>
          ) : notificationsData?.count === 0 ? null : (
            <Typography variant="h6" sx={{ color: "gray", ml: 1 }}>
              {notificationsData?.count} Notificações.
            </Typography>
          )}
          <Grid container spacing={2}>
            <NotificationsOrdering
              isLoading={isNotificationsLoading}
              control={orderControl}
              reset={orderReset}
              errors={orderErrors}
              changedCount={orderChangedCount}
              orderFields={orderFields}
              setOrderFields={setOrderFields}
            ></NotificationsOrdering>
            <NotificationsFilters
              isLoading={isNotificationsLoading}
              control={filtersControl}
              setValue={filtersSetValue}
              reset={filtersReset}
              errors={filtersErrors}
              changedCount={filtersChangedCount}
              setSelectedTypes={setSelectedTypes}
              userRole={props.me.data.role}
            ></NotificationsFilters>
          </Grid>
        </Grid>
        {isNotificationsLoading ? (
          <Grid
            height={100}
            container
            justifyContent={"center"}
            alignItems={"center"}
          >
            <CircularProgress />
          </Grid>
        ) : notificationsData?.count === 0 ? (
          <Grid mt={1} mb={3} container justifyContent="center" size={12}>
            <Typography variant="h6" sx={{ color: "gray", mt: 2 }}>
              Não foram encontrados registos.
            </Typography>
          </Grid>
        ) : (
          <Grid container m={1}>
            {notificationsData?.results.map((item: any, index: any) => (
              <Card
                sx={{
                  width: "100%",
                  transition: "0.3s",
                  border: 2,
                  borderColor: "transparent",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: 6,
                    borderColor: "red",
                  },
                }}
                key={index}
              >
                <CardContent sx={{ pt: 3, pl: 5, pr: 0, display: "flex" }}>
                  <Grid container alignItems={"center"} pr={1}>
                    <IconBox
                      icon={getNotificationTypeIcon(item.type)}
                    ></IconBox>
                  </Grid>
                  <Grid container alignItems={"center"} size={12} px={4}>
                    <Typography width={"100%"}>{item.notification}</Typography>
                    <Typography variant="body2" color="textDisabled">
                      {formatDateTime(item.created_at, "day")} às{" "}
                      {formatDateTime(item.created_at, "hour")} | (
                      {formatTimeDifference(item.created_at)})
                    </Typography>
                  </Grid>
                  <Grid borderRadius={5}>
                    <Tooltip title="Remover Notificação" placement="top-start">
                      <span>
                        <IconButton
                          disabled={!item.can_remove}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification.mutate(item.id);
                          }}
                          aria-label="delete notification"
                        >
                          <Delete
                            color={item.can_remove ? "error" : "disabled"}
                          />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Prosseguir ação" placement="bottom-end">
                      <span>
                        <IconButton
                          onClick={() => {
                            handleFollowingAction(item);
                          }}
                          aria-label="notification action"
                          disabled={
                            item.type === "none" ||
                            item.type === "administrative"
                          }
                        >
                          <KeyboardArrowRight
                            color={
                              item.type === "none" ||
                              item.type === "administrative"
                                ? "disabled"
                                : "success"
                            }
                          />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Grid>
        )}
        {notificationsData?.results.length === 0 ? null : (
          <Grid size={12} mt={3} container justifyContent={"center"}>
            <Pagination
              count={Math.ceil(notificationsData?.count! / pageSize)}
              page={page}
              onChange={handleChange}
              color="primary"
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default NotificationsPage;
