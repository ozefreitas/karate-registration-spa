import { useQuery } from "@tanstack/react-query";
import { DisciplinesService } from "../../openapi";

export const useFetchDisciplinesData = (
  eventId: string,
  restricted: boolean = false,
  is_coach?: boolean,
  is_team?: boolean,
) => {
  return useQuery({
    queryKey: ["disciplines", eventId, restricted, is_coach, is_team],
    queryFn: () =>
      DisciplinesService.disciplinesList(
        eventId,
        is_coach,
        is_team,
        undefined,
        undefined,
        restricted,
      ),
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
    enabled: !!eventId,
  });
};
