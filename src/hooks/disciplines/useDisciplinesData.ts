import { useQuery } from "@tanstack/react-query";
import { fetchDisciplines } from "../../api";

export const useFetchDisciplinesData = (eventId: string, restricted: boolean = false) => {
  return useQuery({
    queryKey: ["disciplines", eventId, restricted],
    queryFn: () => fetchDisciplines(eventId, restricted),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
