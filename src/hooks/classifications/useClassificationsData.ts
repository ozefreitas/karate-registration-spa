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

export const useFetchClassificationsData = (
  eventId?: string,
  bracketId?: string,
) => {
  return useQuery({
    queryKey: ["classification"],
    queryFn: () =>
      ClassificationsService.classificationsList(eventId, bracketId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: bracketId !== undefined,
  });
};
