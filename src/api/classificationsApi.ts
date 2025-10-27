import { apiClient } from "./apiClient";

export const fetchLastEventClassification = () => {
  return apiClient.get("/classifications/last_comp_quali/");
};

export const fetchPerEventClassification = () => {
  return apiClient.get("/classifications/per_comp/");
};
