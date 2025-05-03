import {
  Person,
  SportsMma,
  EmojiEvents,
  Feedback,
  AccountBox,
  Rule,
  Logout,
  Phone,
  HelpCenter,
} from "@mui/icons-material";

export const sideMenuConfig = [
  { name: "athletes", label: "Atletas", icon: <Person />, to: "athletes/" },
  {
    name: "competitions",
    label: "Competições",
    icon: <SportsMma />,
    to: "/competitions/",
  },
  {
    name: "rules",
    label: "Regras",
    icon: <Rule />,
    to: "/competitions/",
  },
  {
    name: "classifications",
    label: "Classificações",
    icon: <EmojiEvents />,
    to: "/classifications/",
  },
  {
    name: "help",
    label: "Ajuda",
    icon: <HelpCenter />,
    to: "/help/",
  },
];

export const accountSideMenuConfig = [
  { name: "profile", label: "Perfil", icon: <AccountBox />, to: "athletes/" },
  {
    name: "logout",
    label: "Logout",
    icon: <Logout />,
  },
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

