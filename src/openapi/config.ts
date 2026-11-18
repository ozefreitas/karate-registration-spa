import axios from "axios";
import { OpenAPI } from "./core/OpenAPI";
import {
  apiBaseUrl,
  restoreAccessToken,
  retryWithRefreshedAccessToken,
} from "../api/authToken";

OpenAPI.BASE = apiBaseUrl;
OpenAPI.WITH_CREDENTIALS = true;
OpenAPI.CREDENTIALS = "same-origin";
OpenAPI.TOKEN = async () => (await restoreAccessToken()) ?? "";

if (typeof window !== "undefined") {
  window.localStorage.removeItem("token");
}

axios.interceptors.response.use(
  (response) => response,
  (error) =>
    retryWithRefreshedAccessToken(error, (request) => axios.request(request)),
);
