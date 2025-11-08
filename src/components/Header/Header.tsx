import * as React from "react";
import {
  Avatar,
  Stack,
  Typography,
  Toolbar,
  Box,
  AppBar,
  Menu,
  MenuItem,
  List,
  IconButton,
  Breadcrumbs,
  Button,
  Grid,
  Badge,
  ListItem,
  Tooltip,
  ListItemText,
  ListItemButton,
  CircularProgress,
  ListItemIcon,
} from "@mui/material";
import fighttecLogo from "./../../assets/FightTecLogo-white-font-removebg-cropped.png";
import skipLogo from "./../../assets/skip-logo.png";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { NotificationsActive, Logout } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import {
  breadcrumbsConvertion,
  getNotificationTypeIcon,
  NotificationTypeOptions,
} from "../../dashboard/config";
import stringAvatar from "../../dashboard/utils/avatarColor";
import { useAuth } from "../../access/GlobalAuthProvider";
import { adminHooks, notificationsHooks, authHooks } from "../../hooks";
import { formatTimeDifference } from "../../utils/utils";

export default function Header(
  props: Readonly<{ me: AxiosResponse<any, any> | undefined }>
) {
  type Notification = {
    id: string;
    notification: string;
    can_remove: boolean;
    type: string;
    created_at: any;
    target_event: any;
  };

  const navigate = useNavigate();
  const [currentSeason, setCurrentSeason] = useState<string>("");

  const { user, isAuthenticated } = useAuth();

  let shouldStop = false;
  const paths = window.location.pathname.split("/").slice(1);
  const breadcrumbs: { title: string; link: string }[] = [];
  paths.forEach((p, index) => {
    const routeTo = p;
    if (shouldStop) return;
    if (p == "signup" || p == "reset") {
      breadcrumbs.push({
        title: `${breadcrumbsConvertion[routeTo]}`,
        link: `${paths.slice(0, index + 1).join("/")}/`,
      });
      shouldStop = true;
      return;
    }
    if (p !== "" && breadcrumbsConvertion[routeTo]) {
      breadcrumbs.push({
        title: `${breadcrumbsConvertion[routeTo]}`,
        link: `${paths.slice(0, index + 1).join("/")}/`,
      });
    } else if (breadcrumbsConvertion[routeTo] === undefined) {
      breadcrumbs.push({
        title: `${p}`,
        link: `${paths.slice(0, index + 1).join("/")}/`,
      });
    }
  });

  const { data } = adminHooks.useFetchCurrentSeason();

  useEffect(() => {
    if (data?.data?.season) {
      setCurrentSeason(data.data.season);
    }
  }, [data]);

  const logOutUser = authHooks.useLogOutUser();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    setAnchorEl(null);
  };

  const {
    data: notificationData,
    isLoading: isNotificationLoading,
    error: notificationError,
  } = notificationsHooks.useFetchHomeClubNotifications();

  const [anchorElNotifications, setAnchorElNotifications] =
    React.useState<null | HTMLElement>(null);
  const openNotifications = Boolean(anchorElNotifications);
  const handleClickNotifications = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNotifications = async () => {
    setAnchorElNotifications(null);
  };

  const handleLogOut = async () => {
    setAnchorEl(null);
    await logOutUser.mutateAsync();
  };

  const shouldRender = breadcrumbs.some(
    (item) => item.title === "Não permitido" && item.link === "unauthorized/"
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            borderRadius: 2,
            width: "99%",
            margin: "auto",
            backgroundColor: "#5a5a5a",
          }}
          position="static"
        >
          <Toolbar>
            <a href="/">
              <Grid
                sx={{
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                <img
                  style={{
                    width: "250px",
                    margin: "10px",
                    marginTop: 30,
                    marginLeft: 0,
                    marginRight: 20,
                    marginBottom: 30,
                  }}
                  src={fighttecLogo}
                  alt=""
                />
              </Grid>
            </a>
            <img src={skipLogo} style={{ width: 80 }} alt="" />
            <Typography
              pl={1}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Stack alignItems="center" direction="row" spacing={3}>
              <Typography variant="body1">
                Época desportiva: {currentSeason}
              </Typography>
              {props.me?.data.role === undefined ? null : (
                <Tooltip
                  title={"Consultar planos"}
                  disableHoverListener={["superuser", "main_admin"].includes(
                    props.me?.data.role
                  )}
                >
                  <span>
                    <Button
                      onClick={() => {
                        if (
                          !["superuser", "main_admin"].includes(
                            props.me?.data.role
                          )
                        ) {
                          navigate("/pricing/");
                        }
                      }}
                      color="warning"
                      variant="contained"
                      disableRipple
                      disableFocusRipple
                      disableElevation
                      size="large"
                    >
                      {props.me?.data.role === "main_admin" ||
                      props.me?.data.role === "single_admin"
                        ? `ADMIN - ${import.meta.env.VITE_DISPLAY_BUTTON_SIGLA}`
                        : props.me?.data.role === "superuser"
                        ? "SUPER ADMIN"
                        : props.me?.data.role === "free_club"
                        ? "CLUBE - GRÁTIS"
                        : props.me?.data.role === "subed_club"
                        ? "CLUBE - PREMIUM"
                        : "TÉCNICO"}
                    </Button>
                  </span>
                </Tooltip>
              )}
              <Grid container>
                {location.pathname.startsWith("/profile/list") ? null : (
                  <IconButton
                    onClick={(event) => {
                      if (isAuthenticated) {
                        handleClickNotifications(event);
                      }
                    }}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={
                      openNotifications ? "notification-menu" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={openNotifications ? "true" : undefined}
                  >
                    {isAuthenticated && user?.data.role !== "technician" ? (
                      <Tooltip title="Notificações" placement="top">
                        <Badge
                          color="error"
                          badgeContent={notificationData?.data.length}
                          max={9}
                        >
                          <Avatar
                            sx={{
                              height:
                                notificationData?.data.length === 0 ||
                                notificationData === null
                                  ? null
                                  : 50,
                              width:
                                notificationData?.data.length === 0 ||
                                notificationData === null
                                  ? null
                                  : 50,
                              bgcolor:
                                notificationData?.data.length === 0 ||
                                notificationData === null
                                  ? null
                                  : "green",
                            }}
                          >
                            <NotificationsActive
                              sx={{
                                height:
                                  notificationData?.data.length === 0 ||
                                  notificationData === null
                                    ? 20
                                    : 25,
                                width:
                                  notificationData?.data.length === 0 ||
                                  notificationData === null
                                    ? 20
                                    : 25,
                              }}
                            />
                          </Avatar>
                        </Badge>
                      </Tooltip>
                    ) : null}
                  </IconButton>
                )}
                <IconButton
                  onClick={(event) => {
                    if (isAuthenticated) {
                      handleClick(event);
                    }
                  }}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  {isAuthenticated ? (
                    <Grid container gap={3}>
                      <Avatar {...stringAvatar(user?.data.username)}></Avatar>
                    </Grid>
                  ) : (
                    <Grid container spacing={2}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => navigate("/login/")}
                      >
                        Login
                      </Button>
                      {props.me?.data.role === "single_admin" ? null : (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => navigate("/request_account/")}
                        >
                          Pedir Conta
                        </Button>
                      )}
                    </Grid>
                  )}
                </IconButton>
              </Grid>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 20,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem divider sx={{ p: 2 }}>
          Bem-vindo&nbsp;
          <Typography style={{ fontWeight: 1000 }}>
            {user?.data.username}
          </Typography>
        </MenuItem>
        <MenuItem
          selected={location.pathname.startsWith("/profile")}
          sx={{ p: 2 }}
          onClick={() => {
            handleClose();
            navigate("/profile/");
          }}
        >
          <Avatar /> Perfil
        </MenuItem>
        <MenuItem sx={{ p: 2 }} onClick={handleLogOut}>
          <Logout sx={{ m: 0, mr: 1 }} /> Logout
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorElNotifications}
        id="notification-menu"
        open={openNotifications}
        onClose={handleCloseNotifications}
        onClick={handleCloseNotifications}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 25,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem divider sx={{ p: 2 }}>
          Notificações
        </MenuItem>
        {isNotificationLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : notificationError ? (
          axios.isAxiosError(notificationError) &&
          notificationError.response?.status === 401 ? (
            <ListItem disablePadding sx={{ m: 0 }}>
              <ListItemButton disabled sx={{ m: 0, pb: 0, pl: 5 }}>
                <ListItemText primary={"Sem sessão iniciada. Faça Login."} />
              </ListItemButton>
            </ListItem>
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
            <ListItem disablePadding sx={{ m: 0 }}>
              <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
                <ListItemText
                  primary={"Ocorreu um erro ao carregar as suas notificações."}
                />
              </ListItemButton>
            </ListItem>
          )
        ) : notificationData?.data.length === 0 ? (
          <ListItem>
            <ListItemButton disabled sx={{ m: 0, p: 3, pb: 0 }}>
              <ListItemText primary={"De momento não tem notificações."} />
            </ListItemButton>
          </ListItem>
        ) : (
          <List sx={{ display: "flex", flexDirection: "column" }}>
            {notificationData?.data.map((noti: Notification, index: number) => (
              <MenuItem
                divider={
                  notificationError !== null ||
                  notificationData.data.length - 1 === index
                }
                disableRipple
                disableTouchRipple
                key={index}
              >
                <ListItem disablePadding sx={{ width: 700, mb: 0 }}>
                  <ListItemIcon sx={{ px: 1 }}>
                    {getNotificationTypeIcon(noti.type)}
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      p: 1,
                      pl: 3,
                      pr: 3,
                      "& .MuiListItemText-secondary": {
                        whiteSpace: "normal",
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                        hyphens: "auto", // 👈 key line
                      },
                    }}
                    primary={
                      <Grid
                        container
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography>
                          {noti.type === "none"
                            ? "Geral"
                            : NotificationTypeOptions.find(
                                (item) => item.value === noti.type
                              )?.label}
                        </Typography>
                        <Typography variant="caption" color="textDisabled">
                          {formatTimeDifference(noti.created_at)}
                        </Typography>
                      </Grid>
                    }
                    secondary={noti.notification}
                  />
                </ListItem>
              </MenuItem>
            ))}
          </List>
        )}
        <MenuItem
          disabled={
            notificationData?.data.length === 0 || notificationError !== null
          }
          onClick={() => navigate("/profile/list_notifications/")}
          sx={{ p: 2, display: "flex", justifyContent: "center" }}
        >
          Abrir todas as Notificações
        </MenuItem>
      </Menu>
      {!shouldRender && (
        <Breadcrumbs sx={{ p: 3, pb: 1 }}>
          {breadcrumbs.length === 0 ? (
            ""
          ) : (
            <Link to={"/"}>
              <Typography color="red">Início</Typography>
            </Link>
          )}
          {breadcrumbs.map((b, index) =>
            index === breadcrumbs.length - 1 ? (
              <Typography key={index}>
                {b.title.charAt(0).toUpperCase() + b.title.slice(1)}
              </Typography>
            ) : (
              <Box key={index}>
                <Link to={b.link}>
                  <Typography color="red">
                    {b.title.charAt(0).toUpperCase() + b.title.slice(1)}
                  </Typography>
                </Link>
              </Box>
            )
          )}
        </Breadcrumbs>
      )}
    </>
  );
}
