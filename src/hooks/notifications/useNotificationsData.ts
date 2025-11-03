import { useQuery } from "@tanstack/react-query";
import { fetchCurrentClubNotifications, fetchNotifications } from "../../api";

export const useFetchHomeClubNotifications = () => {
  return useQuery({
    queryKey: ["club-notifications"],
    queryFn: fetchCurrentClubNotifications,
    refetchOnWindowFocus: false,
  });
};

export const useFetchNotificationsData = (clubId: string) => {
  return useQuery({
    queryKey: ["notifications", clubId],
    queryFn: () => fetchNotifications(clubId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};