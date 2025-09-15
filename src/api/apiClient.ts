import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// Public client (token optional)
export const apiClient = axios.create({ baseURL });
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

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