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
  Groups,
} from "@mui/icons-material";

export const sideMenuConfig = [
  {
    name: "",
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
    name: "teams",
    label: "Equipas",
    icon: <Groups sx={{ color: "#e81c24" }} />,
    to: "/teams/",
  },
  {
    name: "events",
    label: "Eventos",
    icon: <SportsMma sx={{ color: "#e81c24" }} />,
    to: "/events/",
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

export const breadcrumbsConvertion: Record<string, string> = {
  "": "Início",
  athletes: "Atletas",
  teams: "Equipas",
  classifications: "Classificações",
  events: "Eventos",
  news: "Novidades",
  profile: "Perfil",
  rules: "Regras",
  contacts: "Contactos",
  register: "Inscrever",
  register_account: "Criar Conta",
  new_athlete: "Novo Atleta",
  new_team: "Nova Equipa",
  registered_individuals: "Individuais Registados",
  registered_teams: "Equipas Registadas",
  draw: "Sorteios",
  generate: "Gerar",
  all_registry: "Inscrições",
};
