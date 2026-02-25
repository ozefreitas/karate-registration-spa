import { useQuery } from "@tanstack/react-query";
import {
  fetchTokenUsername,
  fetchToken,
} from "../../api";
import { MeService, RequestAcountService } from "../../openapi";

export const useFetchMeData = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: MeService.meRetrieve,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

// Leave be for now
export const useFetchTokenUsername = (token: string) => {
  return useQuery({
    queryKey: ["token_username", token],
    queryFn: () => fetchTokenUsername(token),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });
};

// Leave be for now
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
    queryFn: () => RequestAcountService.requestAcountList,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
