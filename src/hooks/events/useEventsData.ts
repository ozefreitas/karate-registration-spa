import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { EventsService } from "../../openapi";
import { eventsExportMembersExcelRetrieve } from "../../api";

export const useFetchEventsData = (
  page: number,
  pageSize: number,
  ordering?: string,
  season?: string,
  hasEnded?: boolean,
  hasTeams?: boolean,
  hasCategories?: boolean,
  hasRegistrations?: boolean,
  month?: string,
  day?: string,
  isOngoing?: boolean,
  enabled?: boolean,
) => {
  return useQuery({
    queryKey: [
      "events",
      page,
      pageSize,
      ordering,
      season,
      hasEnded,
      hasTeams,
      hasCategories,
      hasRegistrations,
      month,
      day,
      isOngoing,
    ],
    queryFn: () =>
      EventsService.eventsList(
        hasCategories,
        hasEnded,
        hasRegistrations,
        hasTeams,
        day,
        month,
        isOngoing,
        ordering,
        page,
        pageSize,
        season,
      ),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000,
    enabled: pageSize !== 100 && enabled,
  });
};

export const useFetchSingleEventData = (eventId: string) => {
  return useQuery({
    queryKey: ["single-event", eventId],
    queryFn: () => EventsService.eventsRetrieve(eventId),
  });
};

export const useFetchNextEventData = () => {
  return useQuery({
    queryKey: ["next-event"],
    queryFn: EventsService.eventsNextEventRetrieve,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useFetchLastEvent = (userRole: string) => {
  return useQuery({
    queryKey: ["last-event"],
    queryFn: EventsService.eventsLastEventRetrieve,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: ["subed_club", "main_admin", "single_admin", "superuser"].includes(
      userRole,
    ),
  });
};

export const useExportEventRegistrationFile = (eventId: string) => {
  return useQuery({
    queryKey: ["registration-file", eventId],
    queryFn: async () => await eventsExportMembersExcelRetrieve(eventId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    enabled: false,
  });
};

interface EventRegistrationCount {
  number_registrations: string;
  name: string;
}

export const useRegistrationsPerEventData = (): UseQueryResult<
  EventRegistrationCount[]
> => {
  return useQuery({
    queryKey: ["registration-counts"],
    queryFn: () =>
      EventsService.eventsRegistrationCountsList() as unknown as Promise<
        EventRegistrationCount[]
      >,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
