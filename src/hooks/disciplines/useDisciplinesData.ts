import { useQuery } from "@tanstack/react-query";
import { DisciplinesService } from "../../openapi";

export const useFetchDisciplinesData = (
  eventId: string,
  restricted: boolean = false,
  is_coach?: boolean,
  is_team?: boolean,
  allRegistry: boolean = false,
) => {
  return useQuery({
    queryKey: ["disciplines", eventId, restricted, is_coach, is_team],
    queryFn: () =>
      DisciplinesService.disciplinesList(
        allRegistry,
        eventId,
        is_coach,
        is_team,
        undefined,
        undefined,
        restricted,
      ),
    refetchOnWindowFocus: false,
    enabled: !!eventId,
  });
};

export const useFetchSingleDisciplines = (disciplineId: number) => {
  return useQuery({
    queryKey: ["single-discipline"],
    queryFn: () => DisciplinesService.disciplinesRetrieve(disciplineId),
    refetchOnWindowFocus: false,
    enabled: false,
  });
};
