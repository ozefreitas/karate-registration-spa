import { apiClient, authClient } from "./apiClient";

export const fetchAvailableClubs = () => {
  return apiClient.get("/dojos");
};

export const createClub = (data: any) => {
  return authClient.post("/dojos", data);
};

export const deleteClub = (clubId: string) => {
  return authClient.delete(`/dojos/${clubId}/`);
};
