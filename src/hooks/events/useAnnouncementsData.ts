import { useQuery } from "@tanstack/react-query";
import { ActiveAnnouncementService } from "../../openapi";

export const useFetchAnnouncementData = () => {
  return useQuery({
    queryKey: ["active-annoucement"],
    queryFn: ActiveAnnouncementService.activeAnnouncementList,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
