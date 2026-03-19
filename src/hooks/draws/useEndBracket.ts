import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError, BracketService, MatchService } from "../../openapi";
import { useSnackbar } from "notistack";
import { callNotiStack } from "../../utils/utils";

// const channel = new BroadcastChannel("match_updates");

export const useOfficializeBracket = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bracketId, data }: { bracketId: number; data: any }) =>
      BracketService.bracketOfficializeCreate(bracketId, data),
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Pódio criado!",
        "success",
      );
      //   channel.postMessage({ type: "MATCH_UPDATED" });
      queryClient.invalidateQueries({ queryKey: ["brackets"] });
      queryClient.invalidateQueries({ queryKey: ["event-matches"] });
    },
    onError: (error: ApiError) => {
      callNotiStack(
        enqueueSnackbar,
        error.body?.error ?? "Ocorreu um erro! Tente novamente.",
        "error",
        3000,
      );
    },
  });
};
