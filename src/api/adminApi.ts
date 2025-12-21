import { apiClient, authClient } from "./apiClient";

export const fetchClubUsers = (username?: string) => {
  let url = "/users/";
  if (username) {
    url += `?username=${encodeURIComponent(username)}`;
  }
  return authClient.get(url);
};

export const fetchClubMembers = () => {
  return authClient.get("/users/members/");
};

export const fetchCurrentSeason = () => {
  return apiClient.get("/current_season/");
};

// member validation requests

export const fetchMemberValidationRequests = () => {
  return authClient.get("/member_validation/");
};

export const patchMemberValidationRequests = (
  validationId: string,
  data: any
) => {
  return authClient.patch(`/member_validation/${validationId}/`, data);
};
