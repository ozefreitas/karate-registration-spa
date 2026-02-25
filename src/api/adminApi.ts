import { authClient } from "./apiClient";

export const fetchClubUsers = (username?: string) => {
  let url = "/users/";
  if (username) {
    url += `?username=${encodeURIComponent(username)}`;
  }
  return authClient.get(url);
};