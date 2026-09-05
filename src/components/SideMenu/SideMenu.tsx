import { styled, Theme, CSSObject } from "@mui/material/styles";
import { useState, useRef, useEffect, useCallback } from "react";
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
import {
  ChevronRight,
  ChevronLeft,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  getSideMenuConfig,
  getAccountSideMenuConfig,
} from "../../dashboard/config";
import { clubsHooks, membersHooks } from "../../hooks";

const drawerWidth = 275;

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
  width: `calc(${theme.spacing(5)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(6)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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

export default function SideMenu(props: Readonly<{ me: any }>) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [showTopScrollHint, setShowTopScrollHint] = useState(false);
  const paperRef = useRef<HTMLDivElement | null>(null);

  const handleDrawerBehavior = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const sideMenuConfig = getSideMenuConfig(props.me?.role);
  const accountSideMenuConfig = getAccountSideMenuConfig(props.me?.role);
  const currentYear = new Date().getFullYear();

  const { data: subscriptionsData } = clubsHooks.useFetchClubSubscriptions(
    `${currentYear}`,
    props.me?.role,
  );

  const { data: memberValidationRequestData } =
    membersHooks.useFetchMemberValidationRequestsData(props.me?.role);

  const checkScroll = useCallback(() => {
    const el = paperRef.current;
    if (!el) return;
    const remaining = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowScrollHint(remaining > 25);
    setShowTopScrollHint(el.scrollTop > 20);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = paperRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    // Content height can change after menu items / badges load in —
    // ResizeObserver catches that without needing extra effect deps.
    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      resizeObserver.disconnect();
    };
  }, [checkScroll, isMenuOpen]);

  return (
    <Box>
      <CssBaseline>
        <Drawer
          variant="permanent"
          open={isMenuOpen}
          sx={{
            scollbarWidth: "none",
            "& .MuiDrawer-paper": {
              marginTop: "10px",
              marginBottom: "10px",
              marginLeft: "10px",
              height: "calc(100% - 20px)",
              "&::-webkit-scrollbar": {
                width: 0,
              },
            },
          }}
          slotProps={{
            paper: {
              ref: paperRef,
            },
          }}
        >
          {/* Scroll hint: sticks to the top of the scrollable area once the
              user has scrolled down, disappears again at the very top. */}
          <Box
            sx={{
              position: "sticky",
              top: 0,
              left: 0,
              right: 0,
              height: 48,
              mb: -5,
              pointerEvents: "none",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              zIndex: 1,
              opacity: showTopScrollHint ? 1 : 0,
              transition: "opacity 0.25s ease",
              background: (theme) =>
                `linear-gradient(to top, transparent, ${theme.palette.background.paper} 85%)`,
            }}
          >
            <KeyboardArrowUp
              fontSize="small"
              sx={{
                mt: 2.5,
                color: "text.secondary",
                animation: showTopScrollHint
                  ? "bounceUp 1.4s infinite"
                  : "none",
                "@keyframes bounceUp": {
                  "0%, 100%": { transform: "translateY(0)" },
                  "50%": { transform: "translateY(-3px)" },
                },
              }}
            />
          </Box>

          <List
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
            {sideMenuConfig.map((options, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{ display: "block", mb: 0 }}
              >
                <Tooltip title={options.label} placement="right">
                  <span>
                    <ListItemButton
                      selected={
                        options.name === ""
                          ? location.pathname === "/"
                          : location.pathname.startsWith(`/${options.name}`)
                      }
                      onClick={() => navigate(options.to)}
                      sx={[
                        {
                          m: 0.5,
                          ...(options.name === "payment_manager" &&
                            subscriptionsData?.some(
                              (item: any) => item.paid === false,
                            ) && {
                              animation: "pulseRed 1.5s infinite",
                            }),
                          ...(options.name === "settings" &&
                            memberValidationRequestData !== undefined && {
                              animation: "pulseRed 1.5s infinite",
                            }),
                          "@keyframes pulseRed": {
                            "0%": {
                              boxShadow: "0 0 0 0 rgba(255, 165, 0, 0.7)",
                              backgroundColor: "rgba(255, 165, 0, 0.15)",
                            },
                            "70%": {
                              boxShadow: "0 0 0 12px rgba(255, 165, 0, 0)",
                              backgroundColor: "rgba(255, 165, 0, 0.25)",
                            },
                            "100%": {
                              boxShadow: "0 0 0 0 rgba(255, 165, 0, 0)",
                              backgroundColor: "rgba(255, 165, 0, 0.15)",
                            },
                          },
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
                  </span>
                </Tooltip>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
            {accountSideMenuConfig.map((options, index) => (
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <Tooltip title={options.label} placement="right">
                  <span>
                    <ListItemButton
                      selected={location.pathname === options.to}
                      onClick={() => navigate(options.to)}
                      sx={[
                        { minHeight: 48, px: 2.5, m: 0.5 },
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
                  </span>
                </Tooltip>
              </ListItem>
            ))}
          </List>
          <DrawerHeader>
            <IconButton onClick={handleDrawerBehavior}>
              {!isMenuOpen ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </DrawerHeader>

          {/* Scroll hint: sticks to the bottom of the scrollable area while
              there's more content below, settles into place at the true end.
              Fades out via opacity once the user has scrolled all the way down. */}
          <Box
            sx={{
              position: "sticky",
              bottom: 0,
              left: 0,
              right: 0,
              height: 48,
              mt: -6, // pulls it over the content instead of adding scroll length
              pointerEvents: "none",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              opacity: showScrollHint ? 1 : 0,
              transition: "opacity 0.25s ease",
              background: (theme) =>
                `linear-gradient(to bottom, transparent, ${theme.palette.background.paper} 85%)`,
            }}
          >
            <KeyboardArrowDown
              fontSize="small"
              sx={{
                mb: 2,
                color: "text.secondary",
                animation: showScrollHint ? "bounceDown 1.4s infinite" : "none",
                "@keyframes bounceDown": {
                  "0%, 100%": { transform: "translateY(0)" },
                  "50%": { transform: "translateY(3px)" },
                },
              }}
            />
          </Box>
        </Drawer>
      </CssBaseline>
    </Box>
  );
}
