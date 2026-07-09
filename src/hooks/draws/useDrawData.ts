import { useQuery } from "@tanstack/react-query";
import {
  BracketService,
  MatchService,
  ScoringEntryService,
} from "../../openapi";
import { drawsExportBracketInfoExcelRetrieve } from "../../api";

export const useBracketsData = (eventId: string) => {
  return useQuery({
    queryKey: ["brackets", eventId],
    queryFn: () => BracketService.bracketList(eventId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useEventMatchesData = (bracketId: string, eventId: string) => {
  return useQuery({
    queryKey: ["event-matches", bracketId, eventId],
    queryFn: () => MatchService.matchList(bracketId, eventId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!bracketId,
  });
};

export const useMembersPerBracketData = (bracketId: number) => {
  return useQuery({
    queryKey: ["bracket-members", bracketId],
    queryFn: () => BracketService.bracketPersonsList(bracketId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useTeamsPerBracketData = (bracketId: number) => {
  return useQuery({
    queryKey: ["bracket-teams", bracketId],
    queryFn: () => BracketService.bracketTeamsList(bracketId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useEventScoringEntriesData = (
  bracketId: string,
  eventId: string,
) => {
  return useQuery({
    queryKey: ["event-scoring-entries", bracketId, eventId],
    queryFn: () => ScoringEntryService.scoringEntryList(bracketId, eventId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!bracketId,
  });
};

export const useExportBracketDrawFile = (bracketId: string) => {
  return useQuery({
    queryKey: ["bracket-draw-file", bracketId],
    queryFn: async () => await drawsExportBracketInfoExcelRetrieve(bracketId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    enabled: false,
  });
};
