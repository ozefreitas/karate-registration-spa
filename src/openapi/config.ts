import { OpenAPI } from "./core/OpenAPI";

OpenAPI.BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

OpenAPI.HEADERS = async () => {
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = {};

  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }

  return headers;
};
