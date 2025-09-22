import { apiClient, authClient } from "./apiClient";

// public endpoint
export const fetchEvents = (page: number, pageSize: number) => {
  return apiClient.get("/events/", {
    params: {
      page,
      page_size: pageSize,
    },
  });
};

// public endpoint
export const fetchSingleEvent = (eventId: string) => {
  return apiClient.get(`/events/${eventId}/`);
};

// public endpoint
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

export const addEventAthlete = (eventId: string, data: any) => {
  return authClient.post(`/events/${eventId}/add_athlete/`, data);
};

export const deleteEventAthlete = (eventId: string, data: any) => {
  return authClient.post(`/events/${eventId}/delete_athlete/`, data);
};

// file downloads

export const fetchEventRegistrationFile = (eventId: string) => {
  return authClient.get(`/events/${eventId}/export_athletes_excel/`, {
    responseType: "blob",
  });
};
