import { useQuery } from "@tanstack/react-query";
import { fetchCurrentDojoNotifications, fetchNotifications } from "../../api";

export const useFetchHomeDojoNotifications = () => {
  return useQuery({
    queryKey: ["club-notifications"],
    queryFn: fetchCurrentDojoNotifications,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
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