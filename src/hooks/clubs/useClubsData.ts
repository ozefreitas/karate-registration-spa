import { useQuery } from "@tanstack/react-query";
import {
  fetchAvailableClubs,
  fetchClubSubscriptions,
  fetchAvailableYears,
} from "../../api";

export const useFetchAvailableClubs = () => {
  return useQuery({
    queryKey: ["available-clubs"],
    queryFn: fetchAvailableClubs,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useFetchClubSubscriptions = (search: string) => {
  return useQuery({
    queryKey: ["club-subscriptions", search],
    queryFn: () => fetchClubSubscriptions(search),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!search
  });
};

export const useFetchAvailableYears = () => {
  return useQuery({
    queryKey: ["subscriptions-available-years"],
    queryFn: fetchAvailableYears,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
