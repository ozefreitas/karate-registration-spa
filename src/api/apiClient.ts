import axios from "axios";
import {
  apiBaseUrl,
  isAuthFreeEndpoint,
  restoreAccessToken,
  retryWithRefreshedAccessToken,
} from "./authToken";

// Public client (token optional)
export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

apiClient.interceptors.request.use(async (config) => {
  if (!isAuthFreeEndpoint(config.url)) {
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
