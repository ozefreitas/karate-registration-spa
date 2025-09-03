import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";

const fetchHomeDojNotifications = () => {
  const token = localStorage.getItem("token");
  return axios.get("http://127.0.0.1:8000/dojo_notifications/", {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useFetchHomeDojoNotifications = () => {
  return useQuery({
    queryKey: ["home-notifications"],
    queryFn: fetchHomeDojNotifications,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });
};

const fetchDojoUsers = (username?: string) => {
  const token = localStorage.getItem("token");
  let url = `http://127.0.0.1:8000/users/`;

  if (username) {
    url += `?username=${encodeURIComponent(username)}`;
  }

  return axios.get(url, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useFetchDojoUsersData = (username?: string) => {
  return useQuery({
    queryKey: ["dojo-users"],
    queryFn: () => fetchDojoUsers(username),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

const fetchDojoAthletes = () => {
  const token = localStorage.getItem("token");
  return axios.get(`http://127.0.0.1:8000/users/athletes/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useFetchDojoAthletesData = () => {
  return useQuery({
    queryKey: ["dojo-athletes"],
    queryFn: fetchDojoAthletes,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};


const fetchNotifications = (dojoId: string) => {
  const token = localStorage.getItem("token");
  return axios.get(`http://127.0.0.1:8000/notifications/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
    params: {
      dojo_notification: dojoId,
    },
  });
};

export const useFetchNotificationsData = (dojoId: string) => {
  return useQuery({
    queryKey: ["notifications", dojoId],
    queryFn: () => fetchNotifications(dojoId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

const createNotification = (data: any) => {
  const token = localStorage.getItem("token");
  return axios.post(`http://127.0.0.1:8000/notifications/`, data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useCreateNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: any }) => createNotification(data),
    onSuccess: () => {
      enqueueSnackbar("Notificação criada e enviada para a conta remetente!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {
      enqueueSnackbar("Um erro ocorreu! Tente novamente.", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
    },
  });
};

// This should not be protect because some actions may trigger, however, only SKIP and superuser may call it "manually"
const removeNotification = (notificationId: string) => {
  const token = localStorage.getItem("token");
  return axios.delete(
    `http://127.0.0.1:8000/notifications/${notificationId}/`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

export const useRemoveNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeNotification,
    onSuccess: () => {
      enqueueSnackbar("Notificação removida com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["home-notifications"] });
    },
    onError: () => {
      enqueueSnackbar("Um erro ocorreu! Tente novamente.", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
    },
  });
};
