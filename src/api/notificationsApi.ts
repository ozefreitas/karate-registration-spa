import { authClient } from "./apiClient";

export const fetchCurrentClubNotifications = () => {
  return authClient.get("/club_notifications/");
};

export const fetchNotifications = (page: number, pageSize: number) => {
  return authClient.get("/notifications/", {
    params: { page: page, pageSize: pageSize },
  });
};

export const createNotification = (data: any) => {
  return authClient.post("/notifications/", data);
};

export const createAllClubsNotification = (data: any) => {
  return authClient.post("/notifications/create_all_users/", data);
};

export const deleteNotification = (notificationId: string) => {
  return authClient.delete(`/notifications/${notificationId}/`);
};
