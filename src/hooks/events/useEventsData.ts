import { useQuery } from "@tanstack/react-query";
import {
  fetchEvents,
  fetchSingleEvent,
  fetchNextEvent,
  fetchLastEvent,
  fetchEventRegistrationFile,
} from "../../api/";

export const useFetchEventsData = (page: number, pageSize: number, season?: string) => {
  return useQuery({
    queryKey: ["events", page, pageSize, season],
    queryFn: () => fetchEvents(page, pageSize, season),
    refetchOnWindowFocus: false,
    enabled: pageSize !== 100,
  });
};

export const useFetchSingleEventData = (eventId: string) => {
  return useQuery({
    queryKey: ["single-event", eventId],
    queryFn: () => fetchSingleEvent(eventId),
  });
};

export const useFetchNextEventData = () => {
  return useQuery({
    queryKey: ["next-event"],
    queryFn: fetchNextEvent,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useFetchLastEvent = (userRole: string) => {
  return useQuery({
    queryKey: ["last-event"],
    queryFn: fetchLastEvent,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: ["subed_club", "main_admin", "single_admin", "superuser"].includes(
      userRole
    ),
  });
};

export const useFetchEventRegistrationFile = (eventId: string) => {
  return useQuery({
    queryKey: ["registration-file", eventId],
    queryFn: async () => await fetchEventRegistrationFile(eventId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    enabled: false,
  });
};
