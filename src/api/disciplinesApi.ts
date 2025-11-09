import { authClient } from "./apiClient";

export const fetchDisciplines = (eventId: string, restricted: boolean) => {
  return authClient.get(`/disciplines/`, {
    params: {
      event_disciplines: eventId,
      restricted: restricted,
    },
  });
};

export const createDiscipline = (data: any) => {
  return authClient.post("/disciplines/", data);
};

// discipline members operations

export const addDisciplineAthlete = (disciplineId: string, data: any) => {
  return authClient.post(`/disciplines/${disciplineId}/add_athlete/`, data);
};

export const removeDisciplineAthlete = (disciplineId: string, data: any) => {
  return authClient.post(`/disciplines/${disciplineId}/delete_athlete/`, data);
};

export const removeAllDisciplineAthlete = (disciplineId: string) => {
  return authClient.delete(
    `/disciplines/${disciplineId}/delete_all_individuals/`
  );
};

// discipline categories operations

export const addDisciplineCategory = (disciplineId: string, data: any) => {
  return authClient.post(`/disciplines/${disciplineId}/add_category/`, data);
};

export const removeDisciplineCategory = (disciplineId: string, data: any) => {
  return authClient.post(`/disciplines/${disciplineId}/delete_category/`, data);
};
