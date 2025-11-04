import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// Public client (token optional)
export const apiClient = axios.create({ baseURL });

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Do NOT attach token for login or signup requests EVER
  const isAuthFreeEndpoint =
    config.url?.includes("/login/") || config.url?.includes("/register/");

  if (token && !isAuthFreeEndpoint) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});

// if authentication credential are not valid, remove the current token (if available) and redirect to the login page
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);


// Auth client (token required)
export const authClient = axios.create({ baseURL });

authClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required");
  }
  config.headers.Authorization = `Token ${token}`;
  return config;
});
