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
    refetchOnMount: false,
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
    queryKey: ["event-name"],
    queryFn: fetchLastCompQuali,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

const fetchSingleEvent = (eventId: any) => {
  return axios.get(`http://127.0.0.1:8000/events/${eventId}/`);
};

export const useSingleFetchEventData = () => {
  return useQuery({
    queryKey: ["event-name", location.pathname.split("/").slice(-1)[0]],
    queryFn: () => fetchSingleEvent(location.pathname.split("/").slice(-1)[0]),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!location.pathname.split("/").slice(-1)[0],
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
