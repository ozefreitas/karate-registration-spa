import { authClient } from "./apiClient";

export const fetchDisciplines = (eventId: string) => {
  return authClient.get(`/disciplines/`, {
    params: {
      event_disciplines: eventId,
    },
  });
};

export const createDiscipline = (data: any) => {
  return authClient.post("/disciplines/", data);
};

// discipline members operations

export const addDisciplineAthlete = (eventId: string, data: any) => {
  return authClient.post(`/disciplines/${eventId}/add_athlete/`, data);
};

export const removeDisciplineAthlete = (eventId: string, data: any) => {
  return authClient.post(`/disciplines/${eventId}/delete_athlete/`, data);
};

// discipline categories operations

export const addDisciplineCategory = (disciplineId: string, data: any) => {
  return authClient.post(`/disciplines/${disciplineId}/add_category/`, data);
};

export const removeDisciplineCategory = (disciplineId: string, data: any) => {
  return authClient.post(`/disciplines/${disciplineId}/delete_category/`, data);
};
