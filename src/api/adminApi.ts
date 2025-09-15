import { authClient } from "./apiClient";

export const fetchClubUsers = (username?: string) => {
  let url = `http://127.0.0.1:8000/users/`;
  if (username) {
    url += `?username=${encodeURIComponent(username)}`;
  }
  return authClient.get(url);
};

export const fetchClubAthletes = () => {
  return authClient.get("/users/athletes/");
};
