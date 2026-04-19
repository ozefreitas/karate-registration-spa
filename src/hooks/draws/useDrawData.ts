import { useQuery } from "@tanstack/react-query";
import { BracketService, MatchService, ScoringEntryService } from "../../openapi";

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

export const useEventScoringEntriesData = (bracketId: string, eventId: string) => {
  return useQuery({
    queryKey: ["event-scoring-entries", bracketId, eventId],
    queryFn: () => ScoringEntryService.scoringEntryList(bracketId, eventId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!bracketId,
  });
};
