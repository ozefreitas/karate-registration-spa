import { useQuery } from "@tanstack/react-query";
import { ClubNotificationsService, NotificationsService } from "../../openapi";

export const useFetchHomeClubNotifications = (userRole: string) => {
  return useQuery({
    queryKey: ["club-notifications"],
    queryFn: ClubNotificationsService.clubNotificationsRetrieve,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!userRole && !["technician", "free_club"].includes(userRole),
  });
};

export const useFetchNotificationsData = (
  page: number,
  pageSize: number,
  ordering: string,
  types?: string,
  canRemove?: boolean,
  userId?: string,
) => {
  return useQuery({
    queryKey: [
      "notifications",
      ordering,
      page,
      pageSize,
      types,
      canRemove,
      userId,
    ],
    queryFn: () =>
      NotificationsService.notificationsList(
        canRemove,
        ordering,
        page,
        pageSize,
        types,
        userId,
      ),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
