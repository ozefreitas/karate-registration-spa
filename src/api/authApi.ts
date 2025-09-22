import { apiClient, authClient } from "./apiClient";

export const fetchMe = () => {
  return authClient.get("/me/");
};

export const loginUser = (data: any) => {
  return apiClient.post("/login/", data);
};

export const LogoutUser = () => {
  return authClient.post("/logout/", {});
};

export const fetchTokenUsername = (token: string) => {
  return apiClient.get(`/sign_up/get_token_username/?token=${token}`);
};

export const signUpWithToken = (data: any) => {
  return apiClient.post("/sign_up/register_user/", data);
};

export const createSignUpToken = (data: any) => {
  return authClient.post("/sign_up/generate_token/", data);
};

export const fetchToken = (username: string) => {
  return authClient.get(`/sign_up/get_token_by_username/?username=${username}`);
};

export const fetchRequestingAcounts = () => {
  return authClient.get(`/request_acount/`);
};

export const createRequestAcount = (data: any) => {
  return apiClient.post("/request_acount/", data);
};

export const deleteRequestAcount = (requestAcountId: string) => {
  return authClient.delete(`/request_acount/${requestAcountId}/`);
};

// Reset Password

export const fetchPasswordRequests = () => {
  return authClient.get("/password_recovery/list_requests/");
};

export const createResetPasswordRequest = (data: any) => {
  return apiClient.post("/password_recovery/request/", data);
};

export const createResetPasswordURL = (data: any) => {
  return authClient.post("/password_recovery/generate_url/", data);
};

export const passwordConfirmation = (
  uidb64: string,
  token: string,
  data: any
) => {
  return apiClient.post(`/password_recovery/confirm/${uidb64}/${token}/`, data);
};
