import { useQuery } from "@tanstack/react-query";
import { fetchCurrentClubNotifications, fetchNotifications } from "../../api";

export const useFetchHomeClubNotifications = () => {
  return useQuery({
    queryKey: ["club-notifications"],
    queryFn: fetchCurrentClubNotifications,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useFetchNotificationsData = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ["notifications", page, pageSize],
    queryFn: () => fetchNotifications(page, pageSize),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
