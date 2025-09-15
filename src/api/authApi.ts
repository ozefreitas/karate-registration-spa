import { apiClient, authClient } from "./apiClient";

export const fetchMe = () => {
  return authClient.get("/me/");
};

export const fetchTokenUsername = (token: string) => {
  return apiClient.get(`/sign_up/get_token_username/?token=${token}`);
};

export const createSignUpToken = (data: any) => {
  return authClient.post("/sign_up/generate_token/", data);
};

export const fetchToken = (username: string) => {
  return authClient.get(`/sign_up/get_token_by_username/?username=${username}`);
};

export const fetchRequestingAcounts = () => {
  return authClient.get(`/request_acount`);
};

export const createRequestAcount = (data: any) => {
  return apiClient.post("/request_acount", data);
};

export const deleteRequestAcount = (requestAcountId: string) => {
  return authClient.delete(
    `http://127.0.0.1:8000/request_acount/${requestAcountId}/`
  );
};