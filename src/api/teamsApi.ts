import { authClient } from "./apiClient";

export const createTeam = (data: any) => {
  return authClient.post("/teams/", data);
};

export const fetchSingleTeam = (teamId: any) => {
  return authClient.get(`/teams/${teamId}`);
};

export const deleteTeam = (teamId: any) => {
  return authClient.delete(`/teams/${teamId}/`);
};