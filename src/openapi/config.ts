import { OpenAPI } from "./core/OpenAPI";

// Base URL (from env)
OpenAPI.BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// Token injection (runs before every request)
OpenAPI.TOKEN = async () => {
  const token = localStorage.getItem("token");
  return token ? `Token ${token}` : "";
};

// Optional: global 401 handling
OpenAPI.HEADERS = async () => {
  const token = localStorage.getItem("token");

  return {
    ...(token ? { Authorization: `Token ${token}` } : {}),
  };
};
