import { useQuery } from "@tanstack/react-query";
import {
  fetchClubUsers,
  fetchClubMembers,
  fetchCurrentSeason,
  fetchPasswordRequests,
} from "../../api";

export const useFetchClubUsersData = (username?: string, userRole?: string) => {
  return useQuery({
    queryKey: ["club-users"],
    queryFn: () => fetchClubUsers(username),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: userRole === "main_admin",
  });
};

export const useFetchClubMembersData = () => {
  return useQuery({
    queryKey: ["club-members"],
    queryFn: fetchClubMembers,
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
