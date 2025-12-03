import { apiClient, authClient } from "./apiClient";

// public endpoint
export const fetchEvents = (
  page: number,
  pageSize: number,
  ordering?: string,
  season?: string,
  hasEnded?: boolean,
  hasTeams?: boolean,
  hasCategories?: boolean,
  hasRegistrations?: boolean,
  month?: string,
  day?: string
) => {
  return apiClient.get("/events/", {
    params: {
      page,
      page_size: pageSize,
      ordering: ordering,
      season: season,
      has_ended: hasEnded,
      has_teams: hasTeams,
      has_categories: hasCategories,
      has_registrations: hasRegistrations,
      in_month: month,
      in_day: day,
    },
  });
};

export const fetchEventDaysperMonth = (month: string) => {
  return authClient.get("/events/events_days_per_month/", {
    params: {
      month: month,
    },
  });
};

// public endpoint
export const fetchSingleEvent = (eventId: string) => {
  return apiClient.get(`/events/${eventId}/`);
};

export const fetchNextEvent = () => {
  return apiClient.get("/events/next_event/");
};

export const fetchLastEvent = () => {
  return authClient.get("/events/last_event/");
};

export const createEvent = (data: any) => {
  return authClient.post("/events/", data);
};

export const updateEvent = (eventId: string, data: any) => {
  return authClient.put(`/events/${eventId}/`, data);
};

export const patchEvent = (eventId: string, data: any) => {
  return authClient.patch(`/events/${eventId}/`, data);
};

export const deleteEvent = (eventId: string) => {
  return authClient.delete(`/events/${eventId}/`);
};

// event rating endpoints

export const fetchEventRate = (eventId: string) => {
  return authClient.get(`/events/${eventId}/check_event_rate/`);
};

export const rateEvent = (eventId: string, data: any) => {
  return authClient.post(`/events/${eventId}/rate_event/`, data);
};

// event member operations

export const addEventMember = (eventId: string, data: any) => {
  return authClient.post(`/events/${eventId}/add_member/`, data);
};

export const deleteEventMember = (eventId: string, data: any) => {
  return authClient.post(`/events/${eventId}/delete_member/`, data);
};

// file downloads

export const fetchEventRegistrationFile = (eventId: string) => {
  return authClient.get(`/events/${eventId}/export_members_excel/`, {
    responseType: "blob",
  });
};

// annoucements

export const fetchActiveAnnouncement = () => {
  return authClient.get(`/active_announcement/`, {});
};
