import { useQuery } from "@tanstack/react-query";
import { fetchDisciplines } from "../../api";

export const useFetchDisciplinesData = (
  eventId: string,
  restricted: boolean = false,
  is_coach?: boolean,
  is_team?: boolean,
) => {
  return useQuery({
    queryKey: ["disciplines", eventId, restricted, is_coach, is_team],
    queryFn: () => fetchDisciplines(eventId, restricted, is_coach, is_team),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
