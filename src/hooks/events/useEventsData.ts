import { useQuery } from "@tanstack/react-query";
import { fetchEvents, fetchSingleEvent, fetchNextEvent, fetchLastEvent } from "../../api/";


export const useFetchEventsData = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ["events", page, pageSize],
    queryFn: () => fetchEvents(page, pageSize),
    refetchOnWindowFocus: false,
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
    enabled: ["subed_dojo", "main_admin", "single_admin", "superuser"].includes(userRole),
  });
};