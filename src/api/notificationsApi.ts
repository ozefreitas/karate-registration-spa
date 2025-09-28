import { authClient } from "./apiClient";

export const fetchCurrentClubNotifications = () => {
  return authClient.get("/club_notifications/");
};

export const fetchNotifications = (clubId: string) => {
  return authClient.get("/notifications/", {
    params: { club_notification: clubId },
  });
};

export const createNotification = (data: any) => {
  return authClient.post("/notifications/", data);
};

export const deleteNotification = (notificationId: string) => {
  return authClient.delete(`/notifications/${notificationId}/`);
};
