import { useQuery } from "@tanstack/react-query";
import { ClassificationsService } from "../../openapi";

export const useFetchLastEventClassifications = (userRole: string) => {
  return useQuery({
    queryKey: ["last-event-classification"],
    queryFn: ClassificationsService.classificationsLastCompQualiRetrieve,
    refetchOnWindowFocus: false,
    select: (data) => (Array.isArray(data) ? data : []),
    refetchOnMount: false,
    enabled: userRole !== "free_club",
  });
};

export const useFetchPerCompClassifications = () => {
  return useQuery({
    queryKey: ["per-event-classification"],
    queryFn: ClassificationsService.classificationsPerCompRetrieve,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
