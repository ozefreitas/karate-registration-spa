import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchEvents = () => {
  const token = localStorage.getItem("token");
  return axios.get(`http://127.0.0.1:8000/competitions/`, {
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

const fetchEventName = (eventId: any) => {
  return axios.get(`http://127.0.0.1:8000/competitions/${eventId}/`);
};

export const useSingleFetchEventData = () => {
  return useQuery({
    queryKey: ["event-name", location.pathname.split("/").slice(-1)[0]],
    queryFn: () => fetchEventName(location.pathname.split("/").slice(-1)[0]),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!location.pathname.split("/").slice(-1)[0],
  });
};