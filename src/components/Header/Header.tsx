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
  IconButton,
  Breadcrumbs,
  Button,
  Grid,
} from "@mui/material";
import skipLogo from "./../../assets/skip-logo.png";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Logout } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { breadcrumbsConvertion } from "../../dashboard/config";
import stringAvatar from "../../dashboard/utils/avatarColor";
import { useAuth } from "../../access/GlobalAuthProvider";
import { adminHooks } from "../../hooks";
import { authHooks } from "../../hooks";

export default function ButtonAppBar(
  props: Readonly<{ me: AxiosResponse<any, any> | undefined }>
) {
  const navigate = useNavigate();
  const [currentSeason, setCurrentSeason] = useState<string>("");

  const { user, isAuthenticated } = useAuth();

  let shouldStop = false;
  const paths = window.location.pathname.split("/").slice(1);
  const breadcrumbs: { title: string; link: string }[] = [];
  paths.forEach((p, index) => {
    const routeTo = p;
    if (shouldStop) return;
    if (p == "signup") {
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
            <img
              style={{ width: "100px", margin: "10px" }}
              src={skipLogo}
              alt=""
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link style={{ color: "white" }} to="/">
                Karate Score App - {import.meta.env.VITE_DISPLAY_ADMIN_NAME}
              </Link>
            </Typography>
            <Stack alignItems="center" direction="row" spacing={2}>
              {props.me?.data.role !== undefined ? (
                <Button
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
                    : props.me?.data.role === "free_dojo"
                    ? "DOJO - GRÁTIS"
                    : "DOJO - PREMIUM"}
                </Button>
              ) : null}
              <Typography variant="body1">
                Época desportiva: {currentSeason}
              </Typography>
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
                  <Avatar {...stringAvatar(user?.data.username)}></Avatar>
                ) : (
                  <Grid container spacing={2}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => navigate("/login/")}
                    >
                      Login
                    </Button>
                    {props.me?.data.role !== "single_admin" ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate("/request_account/")}
                      >
                        Pedir Conta
                      </Button>
                    ) : null}
                  </Grid>
                )}
              </IconButton>
            </Stack>
            {/* <Button color="inherit">Login</Button> */}
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
                right: 14,
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
          Bem-vindo {user?.data.username}
        </MenuItem>
        <MenuItem
          disabled
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
      {!shouldRender && (
        <Breadcrumbs sx={{ p: 3 }}>
          {breadcrumbs.length !== 0 ? (
            <Link to={"/"}>
              <Typography color="red">Início</Typography>
            </Link>
          ) : (
            ""
          )}
          {breadcrumbs.map((b, index) =>
            index !== breadcrumbs.length - 1 ? (
              <Box key={index}>
                <Link to={b.link}>
                  <Typography color="red">
                    {b.title.charAt(0).toUpperCase() + b.title.slice(1)}
                  </Typography>
                </Link>
              </Box>
            ) : (
              <Typography key={index}>
                {b.title.charAt(0).toUpperCase() + b.title.slice(1)}
              </Typography>
            )
          )}
        </Breadcrumbs>
      )}
    </>
  );
}
