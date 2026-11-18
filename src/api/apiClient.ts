import axios from "axios";
import {
  apiBaseUrl,
  restoreAccessToken,
  retryWithRefreshedAccessToken,
} from "./authToken";

// Public client (token optional)
export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

apiClient.interceptors.request.use(async (config) => {
  const isAuthFreeEndpoint =
    config.url?.includes("/login/") ||
    config.url?.includes("/register/") ||
    config.url?.includes("/auth/token/");

  if (!isAuthFreeEndpoint) {
    const token = await restoreAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// if authentication credential are not valid, remove the current token (if available) and redirect to the login page
apiClient.interceptors.response.use(
  (response) => response,
  (error) =>
    retryWithRefreshedAccessToken(error, (request) =>
      apiClient.request(request),
    ),
);

// Auth client (token required)
export const authClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

authClient.interceptors.request.use(async (config) => {
  const token = await restoreAccessToken();
  if (!token) {
    throw new Error("Authentication required");
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

authClient.interceptors.response.use(
  (response) => response,
  (error) =>
    retryWithRefreshedAccessToken(error, (request) =>
      authClient.request(request),
    ),
);
