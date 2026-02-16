import { useQuery } from "@tanstack/react-query";
import { BracketService } from "../../openapi";

export const useBracketsData = (eventId: string) => {
  return useQuery({
    queryKey: ["brackets", eventId],
    queryFn: () => BracketService.bracketList(eventId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
