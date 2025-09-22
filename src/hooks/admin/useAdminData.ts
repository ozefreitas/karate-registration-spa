import { useQuery } from "@tanstack/react-query";
import {
  fetchClubUsers,
  fetchClubAthletes,
  fetchCurrentSeason,
  fetchPasswordRequests,
} from "../../api";

export const useFetchClubUsersData = (username?: string) => {
  return useQuery({
    queryKey: ["club-users"],
    queryFn: () => fetchClubUsers(username),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useFetchClubAthletesData = () => {
  return useQuery({
    queryKey: ["club-athletes"],
    queryFn: fetchClubAthletes,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useFetchCurrentSeason = () => {
  return useQuery({
    queryKey: ["current-season"],
    queryFn: fetchCurrentSeason,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useFetchPasswordResetRequests = () => {
  return useQuery({
    queryKey: ["password-requests"],
    queryFn: fetchPasswordRequests,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
