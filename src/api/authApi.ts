import { apiClient, authClient } from "./apiClient";

export const fetchTokenUsername = (token: string) => {
  return apiClient.get(`/sign_up/get_token_username/?token=${token}`);
};

export const fetchToken = (username: string) => {
  return authClient.get(`/sign_up/get_token_by_username/?username=${username}`);
};
