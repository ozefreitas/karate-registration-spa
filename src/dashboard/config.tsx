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
  NotificationsActive,
  DeveloperBoard,
  AdminPanelSettings,
} from "@mui/icons-material";

export const getSideMenuConfig = (userRole: string) => {
  const baseMenu = [
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
      name: "notifications",
      label: "Gestor de Notificações",
      icon: <NotificationsActive sx={{ color: "#e81c24" }} />,
      to: "/notifications_manager/",
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
    {
      name: "display",
      label: "Quadro Resultados",
      icon: <DeveloperBoard sx={{ color: "#e81c24" }} />,
      to: "/results_display/",
    },
    {
      name: "settings",
      label: "Definições",
      icon: <AdminPanelSettings sx={{ color: "#e81c24" }} />,
      to: "/settings/",
    },
  ];

  // Filter for SKIP (national) account
  if (userRole === "national_association") {
    return baseMenu.filter(
      (item) =>
        item.name !== "help" &&
        item.name !== "classifications" &&
        item.name !== "rules"
    );
  } else if (userRole === undefined || userRole === "free_dojo") {
    return baseMenu.filter(
      (item) =>
        item.name !== "athletes" &&
        item.name !== "teams" &&
        item.name !== "display" &&
        item.name !== "settings" &&
        item.name !== "notifications"
    );
  } else if (userRole === "subed_dojo") {
    return baseMenu.filter(
      (item) =>
        item.name !== "notifications" &&
        item.name !== "display" &&
        item.name !== "settings"
    );
  }

  return baseMenu;
};

export const getAccountSideMenuConfig = (userRole: string) => {
  const baseMenu = [
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

  if (userRole === "national_association") {
    return baseMenu.filter((item) => item.name !== "contacts");
  } else if (userRole === undefined) {
    return baseMenu.filter((item) => item.name !== "feedback");
  }

  return baseMenu;
};

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
  individuals: "Individuais Registados",
  registered_teams: "Equipas Registadas",
  draw: "Sorteios",
  generate: "Gerar",
  all_registry: "Inscrições",
  notifications_manager: "Gestor de Notificações",
  new_event: "Novo Evento",
  not_found: "Não Encontrado",
  unauthorized: "Não permitido",
  results_display: "Monitor Resultados",
  settings: "Definições",
};
