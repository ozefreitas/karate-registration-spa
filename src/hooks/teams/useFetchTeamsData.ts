import { useQuery } from "@tanstack/react-query";
import { fetchSingleTeam } from "../../api";

export const useFetchSingleTeamData = (teamId: any) => {
  return useQuery({
    queryKey: ["single-team", teamId],
    queryFn: () => fetchSingleTeam(teamId),
    refetchOnWindowFocus: false,
    enabled: !!teamId,
  });
};
