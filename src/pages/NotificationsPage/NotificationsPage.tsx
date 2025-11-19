import {
  Grid,
  Card,
  Typography,
  Pagination,
  CircularProgress,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import { notificationsHooks } from "../../hooks";
import { useState } from "react";
import { getNotificationTypeIcon } from "../../dashboard/config";
import { formatDateTime } from "../../utils/utils";
import { Delete, KeyboardArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PageInfoCard from "../../components/info-cards/PageInfoCard";

const NotificationsPage = (props: { me: any }) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, _] = useState<number>(5);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event);
    setPage(value);
  };

  const removeNotification = notificationsHooks.useRemoveNotification();

  const handleFollowingAction = (noti_type: string) => {
    if (noti_type === "create_athlete") {
      navigate("/members/");
    } else if (noti_type === "rate_event") {
      navigate("/events/");
    } else if (noti_type === "reset") {
      navigate("/settings/");
    } else if (noti_type === "classifications_available") {
      navigate("/classifications/");
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

  console.log(props.me.data.id)
  const { data: notificationsData, isLoading: isNotificationsLoading } =
    notificationsHooks.useFetchNotificationsData(page, pageSize, props.me.data.id);

  return (
    <>
      <PageInfoCard description="" title="Notificações"></PageInfoCard>
      <Grid size={12} container m={2} spacing={2}>
        {isNotificationsLoading ? (
          <Grid
            height={100}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Grid>
        ) : notificationsData?.data.results.length === 0 ? (
          <Grid
            sx={{ mt: 1, mb: 3 }}
            container
            justifyContent="center"
            size={12}
          >
            <Typography variant="h6" sx={{ color: "gray", mt: 2 }}>
              Não foram encontrados registos.
            </Typography>
          </Grid>
        ) : (
          notificationsData?.data.results.map((item: any, index: any) => (
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
              <CardContent sx={{ p: 3, pr: 0, display: "flex" }}>
                <Grid container alignItems={"center"}>
                  {getNotificationTypeIcon(item.type)}
                </Grid>
                <Grid container alignItems={"center"} size={12} pl={4}>
                  <Typography width={"100%"}>{item.notification}</Typography>
                  <Typography variant="body2" color="textDisabled">
                    {formatDateTime(item.created_at, "day")} às{" "}
                    {formatDateTime(item.created_at, "hour")}
                  </Typography>
                </Grid>
                <Grid borderRadius={5}>
                  <Tooltip title="Remover Notificação" placement="bottom-start">
                    <IconButton
                      disabled={!item.can_remove}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification.mutate(item.id);
                      }}
                      aria-label="delete notification"
                    >
                      <Delete color={item.can_remove ? "error" : "disabled"} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Prosseguir ação" placement="bottom-start">
                    <IconButton
                      onClick={() => {
                        handleFollowingAction(item.type);
                      }}
                      aria-label="notification action"
                      disabled={
                        item.type === "none" || item.type === "administrative"
                      }
                    >
                      <KeyboardArrowRight
                        color={
                          item.type === "none" || item.type === "administrative"
                            ? "disabled"
                            : "success"
                        }
                      />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </CardContent>
            </Card>
          ))
        )}
        <Grid size={12} mt={3} container justifyContent={"center"}>
          <Pagination
            count={Math.ceil(notificationsData?.data.count / pageSize)}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default NotificationsPage;
