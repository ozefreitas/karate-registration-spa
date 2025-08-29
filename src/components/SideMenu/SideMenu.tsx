import { styled, Theme, CSSObject } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  CssBaseline,
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
import {
  getSideMenuConfig,
  getAccountSideMenuConfig,
} from "../../dashboard/config";
import { AxiosResponse } from "axios";

const drawerWidth = 300;

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

export default function SideMenu(
  props: Readonly<{ me: AxiosResponse<any, any> | undefined }>
) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDrawerBehavior = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const sideMenuConfig = getSideMenuConfig(props.me?.data.role);
  const accountSideMenuConfig = getAccountSideMenuConfig(props.me?.data.role);

  return (
    <Box>
      <CssBaseline>
        <Drawer variant="permanent" open={isMenuOpen}>
          <Divider />
          <List>
            {sideMenuConfig.map((options, index) => (
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <Tooltip title={options.label} placement="right">
                  <ListItemButton
                    selected={location.pathname.split("/")[1] === options.name}
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
