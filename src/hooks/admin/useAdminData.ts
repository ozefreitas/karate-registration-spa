import { useQuery } from "@tanstack/react-query";
import { fetchClubUsers, fetchClubAthletes } from "../../api";

export const useFetchDojoUsersData = (username?: string) => {
  return useQuery({
    queryKey: ["club-users"],
    queryFn: () => fetchClubUsers(username),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useFetchDojoAthletesData = () => {
  return useQuery({
    queryKey: ["club-athletes"],
    queryFn: fetchClubAthletes,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
