import { useQuery } from "@tanstack/react-query";
import { fetchDisciplines } from "../../api";

export const useFetchDisciplinesData = (eventId: string) => {
  return useQuery({
    queryKey: ["disciplines", eventId],
    queryFn: () => fetchDisciplines(eventId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
