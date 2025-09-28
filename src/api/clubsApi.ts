import { apiClient, authClient } from "./apiClient";

export const fetchAvailableClubs = () => {
  return apiClient.get("/clubs/");
};

export const createClub = (data: any) => {
  return authClient.post("/clubs/", data);
};

export const deleteClub = (clubId: string) => {
  return authClient.delete(`/clubs/${clubId}/`);
};
