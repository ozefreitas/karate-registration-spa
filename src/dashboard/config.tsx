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
  DeveloperBoard,
  AdminPanelSettings,
  Category,
  EventBusy,
  EventAvailable,
  Info,
  StarRate,
  PersonAddAlt1,
  Password,
  AccountBalanceWallet,
  Email,
  HourglassDisabled,
  Settings,
  RecordVoiceOver,
  Warning,
  Report,
  EditNotifications,
  MonetizationOn,
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
      name: "members",
      label: "Membros",
      icon: <Person sx={{ color: "#e81c24" }} />,
      to: "/members/",
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
      icon: <EditNotifications sx={{ color: "#e81c24" }} />,
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
      label: "Mostrador",
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

  // mentioned names are not displayed
  if (userRole === "main_admin") {
    return baseMenu.filter(
      (item) =>
        item.name !== "help" &&
        item.name !== "classifications" &&
        item.name !== "rules" &&
        item.name !== "teams" &&
        item.name !== "results_display"
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
  } else if (userRole === "technician") {
    return baseMenu.filter(
      (item) =>
        item.name !== "athletes" &&
        item.name !== "teams" &&
        item.name !== "settings" &&
        item.name !== "notifications_manager" &&
        item.name !== "categories" &&
        item.name !== "events" &&
        item.name !== "help" &&
        item.name !== "rules" &&
        item.name !== "classifications"
    );
  }

  return baseMenu;
};

export const getAccountSideMenuConfig = (userRole: string) => {
  const baseMenu = [
    {
      name: "pricing",
      label: "Planos",
      icon: <MonetizationOn />,
      to: "/pricing/",
    },
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
    return baseMenu.filter(
      (item) => item.name !== "contacts" && item.name !== "pricing"
    );
  } else if (userRole === undefined) {
    return baseMenu.filter((item) => item.name !== "feedback");
  } else if (userRole === "technician") {
    return baseMenu.filter(
      (item) =>
        item.name !== "feedback" &&
        item.name !== "contacts" &&
        item.name !== "news" &&
        item.name !== "pricing"
    );
  }

  return baseMenu;
};

export const breadcrumbsConvertion: Record<string, string> = {
  "": "Início",
  athletes: "Atletas",
  members: "Membros",
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
  new_member: "Novo Membro",
  new_team: "Nova Equipa",
  individuals: "Individuais Registados",
  registered_teams: "Equipas Registadas",
  draw: "Sorteios",
  generate: "Gerar",
  all_registry: "Inscrições",
  notifications_manager: "Gestor de Notificações",
  list_notifications: "Notificações",
  new_event: "Novo Evento",
  not_found: "Não Encontrado",
  unauthorized: "Não permitido",
  results_display: "Monitor Resultados",
  settings: "Definições",
  categories: "Escalões",
  new_category: "Novo Escalão",
  reset: "Recuperar Password",
  coaches: "Treinadores Registados",
  pricing: "Planos de Subscrição",
};

export const NotificationTypeOptions: {
  label: string;
  value: string;
  icon: any;
}[] = [
  { value: "none", label: "Geral", icon: <Info fontSize="large" /> },
  {
    value: "request",
    label: "Pedido de Conta",
    icon: <RecordVoiceOver fontSize="large" />,
  },
  {
    value: "reset",
    label: "Reposição de Password",
    icon: <Password fontSize="large" />,
  },
  {
    value: "create_athlete",
    label: "Novo Membro Adicionado",
    icon: <PersonAddAlt1 fontSize="large" />,
  },
  {
    value: "rate_event",
    label: "Classificar Evento",
    icon: <StarRate fontSize="large" />,
  },
  {
    value: "registrations_closing",
    label: "Inscrições a Fechar",
    icon: <Warning fontSize="large" />,
  },
  {
    value: "registrations_close",
    label: "Inscrições Fechadas",
    icon: <EventBusy fontSize="large" />,
  },
  {
    value: "open_registrations",
    label: "Inscrições Abertas",
    icon: <EventAvailable fontSize="large" />,
  },
  {
    value: "classifications_available",
    label: "Resultados Disponíveis",
    icon: <EmojiEvents fontSize="large" />,
  },
  {
    value: "payment_available",
    label: "Pagamento Disponível",
    icon: <AccountBalanceWallet fontSize="large" />,
  },
  {
    value: "payment_overdue",
    label: "Pagamento Expirado",
    icon: <HourglassDisabled fontSize="large" />,
  },
  {
    value: "administrative",
    label: "Mensagem Administrativa",
    icon: <Email fontSize="large" />,
  },
  {
    value: "system",
    label: "Alterações de Sistema",
    icon: <Settings fontSize="large" />,
  },
  {
    value: "Danger",
    label: "Atenção Imediata!",
    icon: <Report color="error" fontSize="large" />,
  },
];

export const getNotificationTypeIcon = (type: string) => {
  const obj = NotificationTypeOptions.find((item) => item.value === type);
  return obj?.icon;
};
