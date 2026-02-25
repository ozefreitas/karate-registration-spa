import { useQuery } from "@tanstack/react-query";
import {
  fetchClubUsers,
} from "../../api";
import { CurrentSeasonService, PasswordRecoveryService, UsersService } from "../../openapi";

// Let be for now
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
    queryFn: UsersService.usersMembersList,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useFetchCurrentSeason = () => {
  return useQuery({
    queryKey: ["current-season"],
    queryFn: CurrentSeasonService.currentSeasonRetrieve,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useFetchPasswordResetRequests = () => {
  return useQuery({
    queryKey: ["password-requests"],
    queryFn: PasswordRecoveryService.passwordRecoveryListRequestsRetrieve,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
