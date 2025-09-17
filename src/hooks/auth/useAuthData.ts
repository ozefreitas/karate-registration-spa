import { useQuery } from "@tanstack/react-query";
import {
  fetchMe,
  fetchTokenUsername,
  fetchToken,
  fetchRequestingAcounts,
} from "../../api";

export const useFetchMeData = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const useFetchTokenUsername = (token: string) => {
  return useQuery({
    queryKey: ["token_username", token],
    queryFn: () => fetchTokenUsername(token),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });
};

export const useFetchToken = (username: string) => {
  return useQuery({
    queryKey: ["token", username],
    queryFn: () => fetchToken(username),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    enabled: !!username,
  });
};

export const useFetchRequestingAccounts = () => {
  return useQuery({
    queryKey: ["request-acount"],
    queryFn: fetchRequestingAcounts,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
