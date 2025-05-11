import {
  Person,
  SportsMma,
  EmojiEvents,
  Feedback,
  Celebration,
  Rule,
  Phone,
  HelpCenter,
  Home,
} from "@mui/icons-material";

export const sideMenuConfig = [
  {
    name: "home",
    label: "Início",
    icon: <Home sx={{ color: "#e81c24" }} />,
    to: "/",
  },
  {
    name: "athletes",
    label: "Atletas",
    icon: <Person sx={{ color: "#e81c24" }} />,
    to: "/athletes/",
  },
  {
    name: "competitions",
    label: "Competições",
    icon: <SportsMma sx={{ color: "#e81c24" }} />,
    to: "/competitions/",
  },
  {
    name: "rules",
    label: "Regras",
    icon: <Rule sx={{ color: "#e81c24" }} />,
    to: "/rules/",
  },
  {
    name: "classifications",
    label: "Classificações",
    icon: <EmojiEvents sx={{ color: "#e81c24" }} />,
    to: "/classifications/",
  },
  {
    name: "help",
    label: "Ajuda",
    icon: <HelpCenter sx={{ color: "#e81c24" }} />,
    to: "/help/",
  },
];

export const accountSideMenuConfig = [
  { name: "news", label: "Novidades", icon: <Celebration />, to: "/news/" },
  {
    name: "feedback",
    label: "Feedback",
    icon: <Feedback />,
    to: "/feedback/",
  },
  {
    name: "contacts",
    label: "Contactos",
    icon: <Phone />,
    to: "/contacts/",
  },
];
