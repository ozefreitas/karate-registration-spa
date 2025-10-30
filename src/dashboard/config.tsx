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
  Category,
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
      name: "categories",
      label: "Escalões",
      icon: <Category sx={{ color: "#e81c24" }} />,
      to: "/categories/",
    },
    {
      name: "notifications_manager",
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
      name: "results_display",
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
  if (userRole === "main_admin") {
    return baseMenu.filter(
      (item) =>
        item.name !== "help" &&
        item.name !== "classifications" &&
        item.name !== "rules" &&
        item.name !== "teams"
    );
  } else if (userRole === undefined || userRole === "free_club") {
    return baseMenu.filter(
      (item) =>
        item.name !== "athletes" &&
        item.name !== "teams" &&
        item.name !== "results_display" &&
        item.name !== "settings" &&
        item.name !== "notifications_manager" &&
        item.name !== "categories"
    );
  } else if (userRole === "subed_club") {
    return baseMenu.filter(
      (item) =>
        item.name !== "notifications_manager" &&
        item.name !== "results_display" &&
        item.name !== "settings" &&
        item.name !== "categories"
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

  if (userRole === "main_admin") {
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
  help: "Ajuda",
  news: "Novidades",
  profile: "Perfil",
  rules: "Regras",
  contacts: "Contactos",
  register: "Inscrever",
  request_account: "Pedir Conta",
  signup: "Criar Conta",
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
  categories: "Escalões",
  new_category: "Novo Escalão",
  reset: "Recuperar Password",
};
