import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MatchService } from "../../openapi";
import { useSnackbar } from "notistack";
import { callNotiStack } from "../../utils/utils";

export const useUpdateMatch = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ matchId, data }: { matchId: number; data: any }) =>
      MatchService.matchUpdate(matchId, data),
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Partida atualizada com sucesso!",
        "success",
      );
      queryClient.invalidateQueries({ queryKey: ["brackets"] });
      queryClient.invalidateQueries({ queryKey: ["event-matches"] });
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

export const useAdvanceMatch = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ matchId, data }: { matchId: number; data: any }) =>
      MatchService.matchAdvanceMatchPartialUpdate(matchId, data),
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Próxima partida!",
        "success",
      );
      queryClient.invalidateQueries({ queryKey: ["brackets"] });
      queryClient.invalidateQueries({ queryKey: ["event-matches"] });
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

export const usePatchMatchWinner = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ matchId, data }: { matchId: number; data: any }) =>
      MatchService.matchSetWinnerPartialUpdate(matchId, data),
    onSuccess: (data: any) => {
      callNotiStack(
        enqueueSnackbar,
        data.is_final
          ? `VENCEDOR de ${data.discipline} de ${data.category} encontrado!`
          : "Vencedor atualizado e movido para ronda seguinte!",
        "success",
      );
      queryClient.invalidateQueries({ queryKey: ["brackets"] });
      queryClient.invalidateQueries({ queryKey: ["event-matches"] });
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
