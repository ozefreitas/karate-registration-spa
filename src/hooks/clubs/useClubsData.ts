import { useQuery } from "@tanstack/react-query";
import { fetchAvailableClubs } from "../../api";

export const useFetchAvailableClubs = () => {
  return useQuery({
    queryKey: ["available-clubs"],
    queryFn: fetchAvailableClubs,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
