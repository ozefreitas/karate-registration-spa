import { apiClient, authClient } from "./apiClient";

export const fetchClubUsers = (username?: string) => {
  let url = "/users/";
  if (username) {
    url += `?username=${encodeURIComponent(username)}`;
  }
  return authClient.get(url);
};

export const fetchClubAthletes = () => {
  return authClient.get("/users/athletes/");
};

export const fetchCurrentSeason = () => {
  return apiClient.get("/current_season/");
};
