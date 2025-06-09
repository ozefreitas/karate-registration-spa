import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  ListItem,
  List,
  ListItemText,
  Divider,
  ListItemIcon,
  ListItemButton,
  Tooltip,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  getSideMenuConfig,
  getAccountSideMenuConfig,
} from "../../dashboard/config";
import { useFetchMeData } from "../../hooks/useAuth";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1.5),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function SideMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDrawerBehavior = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const { data: meData, refetch } = useFetchMeData();
  const token = localStorage.getItem("token");

  useEffect(() => {
    refetch();
  }, [token]);

  const sideMenuConfig = getSideMenuConfig(meData?.data.role);
  const accountSideMenuConfig = getAccountSideMenuConfig(meData?.data.role);

  return (
    <Box>
      <CssBaseline>
        {/* <AppBar>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  marginRight: 5,
                },
                isMenuOpen && { display: "none" },
              ]}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Mini variant drawer
            </Typography>
          </Toolbar>
        </AppBar> */}
        <Drawer variant="permanent" open={isMenuOpen}>
          <Divider />
          <List>
            {sideMenuConfig.map((options, index) => (
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <Tooltip title={options.label} placement="right">
                  <ListItemButton
                    selected={
                      location.pathname.split("/")[1] === options.name
                        ? true
                        : false
                    }
                    onClick={() => navigate(options.to)}
                    sx={[
                      {
                        "&.Mui-selected": {
                          borderRadius: "10px",
                        },
                        "&:hover": {
                          borderRadius: "10px",
                        },
                        minHeight: 48,
                        px: 2.5,
                      },
                      isMenuOpen
                        ? { justifyContent: "initial" }
                        : { justifyContent: "center" },
                    ]}
                  >
                    <ListItemIcon
                      sx={[
                        { minWidth: 0, justifyContent: "center" },
                        isMenuOpen ? { mr: 3 } : { mr: "auto" },
                      ]}
                    >
                      {options.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={options.label}
                      sx={[isMenuOpen ? { opacity: 1 } : { opacity: 0 }]}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {accountSideMenuConfig.map((options, index) => (
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <Tooltip title={options.label} placement="right">
                  <ListItemButton
                    selected={location.pathname === options.to}
                    onClick={() => navigate(options.to)}
                    sx={[
                      { minHeight: 48, px: 2.5 },
                      isMenuOpen
                        ? { justifyContent: "initial" }
                        : { justifyContent: "center" },
                    ]}
                  >
                    <ListItemIcon
                      sx={[
                        { minWidth: 0, justifyContent: "center" },
                        isMenuOpen ? { mr: 3 } : { mr: "auto" },
                      ]}
                    >
                      {options.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={options.label}
                      sx={[isMenuOpen ? { opacity: 1 } : { opacity: 0 }]}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
          <DrawerHeader>
            <IconButton onClick={handleDrawerBehavior}>
              {!isMenuOpen ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </DrawerHeader>
        </Drawer>
      </CssBaseline>
    </Box>
  );
}
