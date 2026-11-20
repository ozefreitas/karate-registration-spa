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
  Chip,
} from "@mui/material";
import fighttecLogo from "./../../assets/FightTecLogo-white-font-removebg-cropped.png";
import skipLogo from "./../../assets/skip-logo.png";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  NotificationsActive,
  Logout,
  Refresh,
  Home,
  OpenInNew,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  breadcrumbsConvertion,
  getNotificationTypeIcon,
  NotificationTypeOptions,
} from "../../dashboard/config";
import stringAvatar from "../../dashboard/utils/avatarColor";
import { useAuth } from "../../access/GlobalAuthProvider";
import { adminHooks, notificationsHooks, authHooks } from "../../hooks";
import { formatTimeDifference } from "../../utils/utils";
import { ColoredIconBox } from "../icon-utils/boxes";
import { useThemeMode } from "../../theme/useThemeMode";

export default function Header(props: Readonly<{ me: any }>) {
  const navigate = useNavigate();
  const routeLocation = useLocation();
  const { mode, toggleColorMode } = useThemeMode();
  const [currentSeason, setCurrentSeason] = useState<string>("");
  const isLoginPage = routeLocation.pathname.replace(/\/+$/, "") === "/login";

  const { user, isAuthenticated } = useAuth();

  let shouldStop = false;
  const paths = globalThis.location.pathname.split("/").slice(1);
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
    if (data?.season) {
      setCurrentSeason(data.season);
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
    refetch,
  } = notificationsHooks.useFetchHomeClubNotifications(props.me?.role);

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
    (item) => item.title === "Não permitido" && item.link === "unauthorized/",
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            borderRadius: 4,
            width: "99%",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#242424" : "#5a5a5a",
          }}
          position="static"
        >
          <Toolbar
            sx={{
              width: { xs: "100%", sm: "auto" },
              flexWrap: { xs: "wrap", sm: "nowrap" },
              gap: { xs: 1, sm: 2 },
              p: { xs: 1, sm: 2 },
              justifyContent: { xs: "center", sm: "space-between" },
            }}
          >
            <Grid
              sx={{
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)",
                },
                flexShrink: 1,
              }}
            >
              <a href="/">
                <img
                  style={{
                    width: "clamp(150px, 18vw, 250px)",
                    margin: "10px 20px 10px 0",
                    marginTop: 10,
                    marginLeft: 0,
                    marginRight: 20,
                    marginBottom: 10,
                  }}
                  src={fighttecLogo}
                  alt=""
                />
              </a>
              <img
                src={skipLogo}
                style={{ width: "clamp(50px, 6vw, 80px)", flexShrink: 1 }}
                alt=""
              />
            </Grid>
            <Stack
              alignItems="center"
              direction="row"
              rowGap={2}
              spacing={{ xs: 1, sm: 2 }}
              sx={{
                flexWrap: "wrap",
                justifyContent: { xs: "center", sm: "flex-end" },
                minWidth: 0,
                width: { xs: "100%", sm: "auto" },
                px: { xs: 1, sm: 0 },
                pb: { xs: 1, sm: 0 },
                boxSizing: "border-box",
              }}
            >
              <Tooltip
                title={
                  mode === "dark" ? "Ativar modo claro" : "Ativar modo escuro"
                }
              >
                <IconButton
                  onClick={toggleColorMode}
                  color="inherit"
                  aria-label={
                    mode === "dark" ? "Ativar modo claro" : "Ativar modo escuro"
                  }
                >
                  {mode === "dark" ? <LightMode /> : <DarkMode />}
                </IconButton>
              </Tooltip>
              {currentSeason === "" ? null : (
                <Chip
                  sx={{ p: 1 }}
                  color="info"
                  size="small"
                  label={`Época: ${currentSeason}`}
                ></Chip>
              )}
              {props.me?.role === undefined ? null : (
                <Tooltip
                  title={"Consultar planos"}
                  disableHoverListener={["superuser", "main_admin"].includes(
                    props.me?.role,
                  )}
                >
                  <span>
                    <Button
                      onClick={() => {
                        if (
                          !["superuser", "main_admin"].includes(props.me?.role)
                        ) {
                          navigate("/pricing/");
                        }
                      }}
                      color="warning"
                      variant="contained"
                      disableRipple
                      disableFocusRipple
                      disableElevation
                      sx={{ border: 0 }}
                      // size="large"
                    >
                      {props.me?.role === "main_admin" ||
                      props.me?.role === "single_admin"
                        ? `ADMIN - ${import.meta.env.VITE_DISPLAY_BUTTON_SIGLA}`
                        : props.me?.role === "superuser"
                          ? "SUPER ADMIN"
                          : props.me?.role === "free_club"
                            ? "CLUBE - GRÁTIS"
                            : props.me?.role === "subed_club"
                              ? `CLUBE - PREMIUM - ${props.me.tier}`
                              : "TÉCNICO"}
                    </Button>
                  </span>
                </Tooltip>
              )}
              <Grid container spacing={1}>
                {location.pathname.startsWith("/profile/list") ? null : (
                  <IconButton
                    onClick={(event) => {
                      if (isAuthenticated) {
                        handleClickNotifications(event);
                      }
                    }}
                    size="small"
                    aria-controls={
                      openNotifications ? "notification-menu" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={openNotifications ? "true" : undefined}
                  >
                    {isAuthenticated && user?.role !== "technician" ? (
                      <Tooltip title="Notificações" placement="top">
                        <span>
                          <Badge
                            color="error"
                            badgeContent={notificationData?.total}
                            max={9}
                            sx={{
                              "& .MuiBadge-badge": {
                                minWidth: 16,
                                height: 16,
                                padding: "0 3px",
                                fontSize: "0.65rem",
                              },
                            }}
                          >
                            <Avatar
                              sx={{
                                height: 32,
                                width: 32,
                                bgcolor: notificationError
                                  ? "red"
                                  : notificationData?.total === 0 ||
                                      notificationData === null
                                    ? null
                                    : "green",
                              }}
                            >
                              <NotificationsActive
                                sx={{
                                  height:
                                    notificationData?.total === 0 ||
                                    notificationData === null
                                      ? 14
                                      : 16,
                                  width:
                                    notificationData?.total === 0 ||
                                    notificationData === null
                                      ? 14
                                      : 16,
                                }}
                              />
                            </Avatar>
                          </Badge>
                        </span>
                      </Tooltip>
                    ) : null}
                  </IconButton>
                )}
                {isAuthenticated && !isLoginPage ? (
                  <IconButton
                    onClick={(event) => {
                      if (isAuthenticated) {
                        handleClick(event);
                      }
                    }}
                    size="small"
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Grid container>
                      <Tooltip title="A sua Conta" placement="top">
                        <span>
                          <Avatar
                            {...stringAvatar(user?.username!, 32, "allow")}
                          ></Avatar>
                        </span>
                      </Tooltip>
                    </Grid>
                  </IconButton>
                ) : !isLoginPage ? (
                  <Grid
                    container
                    spacing={1}
                    sx={{ justifyContent: "flex-end", flexWrap: "wrap" }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      size="large"
                      onClick={() => navigate("/login/")}
                      sx={{
                        border: 0,
                        borderRadius: 2,
                        boxShadow: "none",
                        fontWeight: 700,
                        textTransform: "none",
                        "&:hover": {
                          boxShadow: 2,
                          bgcolor: "error.dark",
                        },
                      }}
                    >
                      Iniciar sessão
                    </Button>
                  </Grid>
                ) : null}
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
          <Typography style={{ fontWeight: 1000 }}>{user?.username}</Typography>
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
              width: { xs: "calc(100vw - 32px)", sm: 420 },
              maxWidth: "calc(100vw - 16px)",
              maxHeight: "calc(100vh - 96px)",
              overflowX: "hidden",
              overflowY: "auto",
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
        <MenuItem
          divider
          disableRipple
          disableTouchRipple
          onClick={(e) => e.stopPropagation()}
          sx={{
            p: 2,
            display: "flex",
            gap: 1,
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          Notificações Recentes
          {(!isNotificationLoading && notificationData?.total === 0) ||
          notificationError ? null : (
            <Typography color="textDisabled">
              (a mostrar 5 primeiras)
            </Typography>
          )}
          {notificationError ? (
            <IconButton onClick={() => refetch()}>
              <Refresh color="primary"></Refresh>
            </IconButton>
          ) : null}
        </MenuItem>
        {isNotificationLoading ? (
          <Box m={2} sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : notificationError ? (
          axios.isAxiosError(notificationError) &&
          notificationError.response?.status === 401 ? (
            <Typography>Sem sessão iniciada. Faça Login</Typography>
          ) : axios.isAxiosError(notificationError) &&
            notificationError.response?.status === 403 ? (
            <MenuItem divider>
              <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
                <ListItemText
                  primary={
                    "Comece uma subscrição para ter acesso a esta funcionalidade."
                  }
                />
              </ListItemButton>
            </MenuItem>
          ) : (
            <MenuItem divider>
              <ListItemButton disabled>
                <ListItemText
                  primary={"Ocorreu um erro ao carregar as suas notificações."}
                />
              </ListItemButton>
            </MenuItem>
          )
        ) : notificationData?.total === 0 ? (
          <MenuItem disabled divider>
            <Typography color="textDisabled" p={1} variant="subtitle1">
              De momento não tem notificações
            </Typography>
          </MenuItem>
        ) : (
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 0,
              width: "100%",
            }}
          >
            {notificationData?.response.map((noti, index: number) => (
              <MenuItem
                divider={
                  notificationError !== null ||
                  notificationData.response.length - 1 === index
                }
                onClick={(e) => e.stopPropagation()}
                key={index}
              >
                <ListItem
                  disablePadding
                  sx={{ width: "100%", minWidth: 0, mb: 0 }}
                >
                  <ListItemIcon sx={{ px: 1 }}>
                    <ColoredIconBox
                      bgColor={"red"}
                      color={"#fff"}
                      icon={getNotificationTypeIcon(noti.type!)}
                    ></ColoredIconBox>
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      p: 1,
                      pl: 3,
                      pr: 3,
                      "& .MuiListItemText-secondary": {
                        fontSize: "0.65rem",
                        whiteSpace: "normal",
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                        hyphens: "auto",
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
                                (item) => item.value === noti.type,
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
          disabled={notificationData?.total === 0 || notificationError !== null}
          onClick={() => navigate("/profile/list_notifications/")}
          sx={{ p: 1.5, display: "flex", justifyContent: "center", gap: 2 }}
        >
          <Typography>Abrir todas as Notificações </Typography>
          <OpenInNew fontSize="small"></OpenInNew>
          {notificationData?.total! > 5 ? (
            <Typography color="textDisabled">
              (+ {notificationData?.total! - 5})
            </Typography>
          ) : null}
        </MenuItem>
      </Menu>
      {!shouldRender && (
        <Breadcrumbs
          sx={{
            p: 3,
            pb: 0,
            display: "flex",
            alignItems: "stretch",
            position: "sticky",
            top: 0,
            zIndex: (theme) => theme.zIndex.appBar - 1,
            backgroundColor: "background.default",
          }}
        >
          {breadcrumbs.length === 0 ? (
            ""
          ) : (
            <Link to={"/"} style={{ display: "flex", alignItems: "center" }}>
              <Home
                color="error"
                fontSize="small"
                sx={{ m: 0, display: "block" }}
              ></Home>
            </Link>
          )}
          {breadcrumbs.map((b, index) =>
            index === breadcrumbs.length - 1 ? (
              <Typography key={index} variant="caption">
                {b.title.charAt(0).toUpperCase() + b.title.slice(1)}
              </Typography>
            ) : (
              <Box key={index}>
                <Link to={b.link}>
                  <Typography color="red" variant="caption">
                    {b.title.charAt(0).toUpperCase() + b.title.slice(1)}
                  </Typography>
                </Link>
              </Box>
            ),
          )}
        </Breadcrumbs>
      )}
    </>
  );
}
