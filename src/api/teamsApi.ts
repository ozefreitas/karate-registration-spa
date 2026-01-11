import { authClient } from "./apiClient";

export const createTeam = (data: any) => {
  return authClient.post("/teams/", data);
};