import { useQuery } from "@tanstack/react-query";
import { fetchActiveAnnouncement } from "../../api";

export const useFetchAnnouncementData = () => {
  return useQuery({
    queryKey: ["active-annoucement"],
    queryFn: fetchActiveAnnouncement,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
