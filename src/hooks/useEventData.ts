import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";

const fetchEvents = () => {
  const token = localStorage.getItem("token");
  return axios.get(`http://127.0.0.1:8000/events/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useFetchEventsData = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    refetchOnWindowFocus: false,
  });
};

const createEvent = (data: any) => {
  const token = localStorage.getItem("token");
  return axios.post(`http://127.0.0.1:8000/events/`, data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useCreateEvent = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: any }) => createEvent(data),
    onSuccess: () => {
      enqueueSnackbar("Evento criado com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
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

const removeEvent = (eventId: string) => {
  const token = localStorage.getItem("token");
  return axios.delete(`http://127.0.0.1:8000/events/${eventId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useRemoveEvent = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeEvent,
    onSuccess: () => {
      enqueueSnackbar("Evento removido da plataforma com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
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

const fetchNextEvent = () => {
  return axios.get("http://127.0.0.1:8000/events/next_comp/");
};

export const useFetchNextEventData = () => {
  return useQuery({
    queryKey: ["next-event"],
    queryFn: fetchNextEvent,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

const fetchLastEvent = () => {
  return axios.get("http://127.0.0.1:8000/events/last_comp/");
};

export const useFetchLastEvent = () => {
  return useQuery({
    queryKey: ["last-event"],
    queryFn: fetchLastEvent,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

const fetchLastCompQuali = () => {
  return axios.get("http://127.0.0.1:8000/classifications/last_comp_quali/");
};

export const useFetchLastCompQuali = () => {
  return useQuery({
    queryKey: ["event-classifications"],
    queryFn: fetchLastCompQuali,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

const fetchSingleEvent = (eventId: any) => {
  return axios.get(`http://127.0.0.1:8000/events/${eventId}/`);
};

export const useSingleFetchEventData = (location: any) => {
  return useQuery({
    queryKey: ["event-name"],
    queryFn: () => fetchSingleEvent(location),
  });
};

const addEventAthlete = (eventId: string, data: any) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `http://127.0.0.1:8000/events/${eventId}/add_athlete/`,
    data,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

export const useAddEventAthlete = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: any }) =>
      addEventAthlete(eventId, data),
    onSuccess: (data: any) => {
      enqueueSnackbar(`${data.data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["athletes-notin-event"] });
    },
    onError: (data: any) => {
      enqueueSnackbar(`${data.data.error}`, {
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

const removeEventAthlete = (eventId: string, data: any) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `http://127.0.0.1:8000/events/${eventId}/delete_athlete/`,
    data,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

export const useRemoveEventAthlete = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: any }) =>
      removeEventAthlete(eventId, data),
    onSuccess: (data: any) => {
      enqueueSnackbar(`${data.data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["athletes-notin-event"] });
    },
    onError: (data: any) => {
      enqueueSnackbar(`${data.data.error}`, {
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

const fetchEventRate = (eventId: any) => {
  const token = localStorage.getItem("token");
  return axios.get(
    `http://127.0.0.1:8000/events/${eventId}/check_event_rate/`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

export const useFetchEventRate = (location: any) => {
  return useQuery({
    queryKey: ["event-rate"],
    queryFn: () => fetchEventRate(location),
  });
};

const rateEvent = (eventId: string, data: any) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `http://127.0.0.1:8000/events/${eventId}/rate_event/`,
    data,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

export const useRateEvent = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: any }) =>
      rateEvent(eventId, data),
    onSuccess: (data: any) => {
      enqueueSnackbar(`${data.data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["event-rate"] });
    },
    onError: (data: any) => {
      enqueueSnackbar(`${data.data.error}`, {
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
