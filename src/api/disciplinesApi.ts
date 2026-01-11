import { authClient } from "./apiClient";

export const fetchDisciplines = (
  eventId: string,
  restricted: boolean,
  is_coach?: boolean,
  is_team?: boolean,
) => {
  return authClient.get(`/disciplines/`, {
    params: {
      event_disciplines: eventId,
      restricted: restricted,
      is_coach: is_coach,
      is_team: is_team,
    },
  });
};

export const createDiscipline = (data: any) => {
  return authClient.post("/disciplines/", data);
};

// discipline members operations

export const addDisciplineMember = (disciplineId: string, data: any) => {
  return authClient.post(`/disciplines/${disciplineId}/add_member/`, data);
};

export const removeDisciplineMember = (disciplineId: string, data: any) => {
  return authClient.post(`/disciplines/${disciplineId}/delete_member/`, data);
};

export const removeAllDisciplineMember = (disciplineId: string) => {
  return authClient.delete(
    `/disciplines/${disciplineId}/delete_all_individuals/`
  );
};

// discipline teams operations

export const addDisciplineTeam = (disciplineId: string, data: any) => {
  return authClient.post(`/disciplines/${disciplineId}/add_team/`, data);
};

export const removeDisciplineTeam = (disciplineId: string, data: any) => {
  return authClient.post(`/disciplines/${disciplineId}/delete_team/`, data);
};

export const removeAllDisciplineTeam = (disciplineId: string) => {
  return authClient.delete(
    `/disciplines/${disciplineId}/delete_all_teams/`
  );
};

// discipline categories operations

export const addDisciplineCategory = (disciplineId: string, data: any) => {
  return authClient.patch(`/disciplines/${disciplineId}/add_categories/`, data);
};

export const removeDisciplineCategory = (disciplineId: string, data: any) => {
  return authClient.post(`/disciplines/${disciplineId}/delete_category/`, data);
};
