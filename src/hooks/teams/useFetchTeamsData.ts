import { useQuery } from "@tanstack/react-query";
import { TeamsService } from "../../openapi";

export const useFetchSingleTeamData = (teamId: any) => {
  return useQuery({
    queryKey: ["single-team", teamId],
    queryFn: () => TeamsService.teamsRetrieve(teamId),
    refetchOnWindowFocus: false,
    enabled: !!teamId,
  });
};
