import { useQuery } from "@tanstack/react-query";
import {
  fetchPerEventClassification,
  fetchLastEventClassification,
} from "../../api";

export const useFetchLastEventClassifications = (userRole: string) => {
  return useQuery({
    queryKey: ["last-event-classification"],
    queryFn: () => fetchLastEventClassification(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: userRole !== "free_club",
  });
};

export const useFetchPerCompClassifications = () => {
  return useQuery({
    queryKey: ["per-event-classification"],
    queryFn: () => fetchPerEventClassification(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
