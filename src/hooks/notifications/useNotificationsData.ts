import { useQuery } from "@tanstack/react-query";
import { ClubNotificationsService, NotificationsService } from "../../openapi";

export const useFetchHomeClubNotifications = () => {
  return useQuery({
    queryKey: ["club-notifications"],
    queryFn: ClubNotificationsService.clubNotificationsRetrieve,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useFetchNotificationsData = (
  page: number,
  pageSize: number,
  userId?: string,
) => {
  return useQuery({
    queryKey: ["notifications", page, pageSize, userId],
    queryFn: () => NotificationsService.notificationsList(undefined, page, pageSize, userId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
