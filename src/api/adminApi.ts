import { authClient } from "./apiClient";

export const fetchClubUsers = (username?: string) => {
  let url = "/users/";
  if (username) {
    url += `?username=${encodeURIComponent(username)}`;
  }
  return authClient.get(url);
};

export const eventsExportMembersExcelRetrieve = (eventId: string) => {
  return authClient.get(`/events/${eventId}/export_members_excel/`);
};
