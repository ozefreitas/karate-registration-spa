import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { ScoringEntryService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

const channel = new BroadcastChannel("scoring_entry_updates");

export const useUpdateScoringEntry = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      scoringEntryId,
      data,
    }: {
      scoringEntryId: number;
      data: any;
    }) => ScoringEntryService.scoringEntryUpdate(scoringEntryId, data),
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Partida atualizada com sucesso!",
        "success",
      );
      channel.postMessage({ type: "SCORING_ENTRY_UPDATED" });
      queryClient.invalidateQueries({ queryKey: ["brackets"] });
      queryClient.invalidateQueries({ queryKey: ["event-matches"] });
      queryClient.invalidateQueries({ queryKey: ["event-scoring-entries"] });
    },
    onError: () => {
      callNotiStack(
        enqueueSnackbar,
        "Ocorreu um erro! Tente novamente.",
        "error",
        3000,
      );
    },
  });
};

export const usePatchScoringEntry = (userRole: string) => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      scoringEntryId,
      data,
    }: {
      scoringEntryId: number;
      data: any;
    }) => ScoringEntryService.scoringEntryPartialUpdate(scoringEntryId, data),
    onSuccess: (data: any) => {
      if (data.ongoing) {
        callNotiStack(
          enqueueSnackbar,
          userRole === "technician"
            ? "Partida selecionada com sucesso! Está agora visível no ecrã de resultados!"
            : "Partida selecionada com sucesso! Está agora em direto!",
          "success",
        );
      } else {
        callNotiStack(
          enqueueSnackbar,
          "Partida retirada de direto!",
          "success",
        );
      }

      channel.postMessage({ type: "SCORING_ENTRY_UPDATED" });
      queryClient.invalidateQueries({ queryKey: ["brackets"] });
      queryClient.invalidateQueries({ queryKey: ["event-matches"] });
      queryClient.invalidateQueries({ queryKey: ["event-scoring-entries"] });
    },
    onError: (data: any) => {
      callNotiStack(
        enqueueSnackbar,
        data.body.non_field_errors[0] ?? "Ocorreu um erro! Tente novamente.",
        "error",
        3000,
      );
    },
  });
};
