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
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Logout } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { breadcrumbsConvertion } from "../../dashboard/config";
import stringAvatar from "../../dashboard/utils/avatarColor";
import { useFetchMeData } from "../../hooks/useAuth";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const [currentSeason, setCurrentSeason] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  const { data: meData, refetch } = useFetchMeData();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setIsAuthenticated(false);
        setUsername("");
      } else {
        refetch();
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, [token]);

  useEffect(() => {
    if (meData?.data.username !== undefined) {
      setUsername(meData?.data.username);
    }
  }, [meData]);

  const paths = window.location.pathname.split("/").slice(1);
  const breadcrumbs: { title: string; link: string }[] = [];
  paths.forEach((p, index) => {
    const routeTo = p;
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

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/current_season/")
      .then((response) => setCurrentSeason(response.data.season))
      .catch((error) => console.error(error));
  }, []);

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
    await axios.post(
      "http://127.0.0.1:8000/logout/",
      {},
      {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      }
    );
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

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
                SKI-Portugal - Karate Score App
              </Link>
            </Typography>
            <Stack alignItems="center" direction="row" spacing={2}>
              {meData?.data.role !== undefined ? (
                <Button
                  color="warning"
                  variant="contained"
                  disableRipple
                  disableFocusRipple
                  disableElevation
                  size="large"
                >
                  {meData?.data.role === "national_association"
                    ? "ADMIN - SKIP"
                    : meData?.data.role === "superuser"
                    ? "SUPER ADMIN"
                    : "DOJO"}
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
                  <Avatar {...stringAvatar(username)}></Avatar>
                ) : (
                  <Grid container spacing={2}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => navigate("/login/")}
                    >
                      Login
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => navigate("/register_account/")}
                    >
                      Criar Conta
                    </Button>
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
          Bem-vindo {username}
        </MenuItem>
        <MenuItem
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
    </>
  );
}
