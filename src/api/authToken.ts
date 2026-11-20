import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

export const apiBaseUrl =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const refreshClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _jwtRetried?: boolean;
};

let accessToken: string | undefined;
let authInitialized = false;
let refreshRequest: Promise<string | undefined> | undefined;

export const getAccessToken = () => accessToken;

export const setAccessToken = (token: string) => {
  accessToken = token;
  authInitialized = true;
};

export const clearAccessToken = () => {
  accessToken = undefined;
  authInitialized = true;
};

export const isAuthFreeEndpoint = (url?: string) =>
  [
    "/auth/token/",
    "/password_recovery/request/",
    "/password_recovery/confirm/",
    "/sign_up/get_token_username/",
    "/sign_up/register_user/",
  ].some((endpoint) => url?.includes(endpoint));

export const refreshAccessToken = (): Promise<string | undefined> => {
  if (refreshRequest !== undefined) return refreshRequest;

  authInitialized = true;
  refreshRequest = refreshClient
    .post<{ access: string }>("/auth/token/refresh/", {})
    .then(({ data }) => {
      setAccessToken(data.access);
      return data.access;
    })
    .catch(() => {
      accessToken = undefined;
      return undefined;
    })
    .finally(() => {
      refreshRequest = undefined;
    });

  return refreshRequest;
};

export const restoreAccessToken = () => {
  if (accessToken || authInitialized) return Promise.resolve(accessToken);
  return refreshAccessToken();
};

export const retryWithRefreshedAccessToken = async (
  error: unknown,
  retryRequest: (request: InternalAxiosRequestConfig) => Promise<unknown>,
): Promise<unknown> => {
  const axiosError = error as AxiosError;
  const request = axiosError.config as RetriableRequestConfig | undefined;

  if (
    axiosError.response?.status !== 401 ||
    !request ||
    isAuthFreeEndpoint(request.url)
  ) {
    throw error;
  }

  if (request._jwtRetried) {
    clearAccessToken();
    window.location.assign("/login/");
    throw error;
  }

  if (!accessToken) throw error;

  request._jwtRetried = true;
  const refreshedToken = await refreshAccessToken();
  if (!refreshedToken) {
    clearAccessToken();
    window.location.assign("/login/");
    throw error;
  }

  request.headers.Authorization = `Bearer ${refreshedToken}`;
  return retryRequest(request);
};
