import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError, MatchService } from "../../openapi";
import { useSnackbar } from "notistack";
import { callNotiStack } from "../../utils/utils";

const channel = new BroadcastChannel("match_updates");

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

export const usePatchMatch = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ matchId, data }: { matchId: number; data: any }) =>
      MatchService.matchPartialUpdate(matchId, data),
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Partida selecionada com sucesso! Está agora visível no ecrã de resultados!",
        "success",
      );
      channel.postMessage({ type: "MATCH_UPDATED" });
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
      callNotiStack(enqueueSnackbar, "Próxima partida!", "success");
      channel.postMessage({ type: "MATCH_UPDATED" });
      queryClient.invalidateQueries({ queryKey: ["brackets"] });
      queryClient.invalidateQueries({ queryKey: ["event-matches"] });
    },
    onError: (error: ApiError) => {
      callNotiStack(
        enqueueSnackbar,
        error.body?.error ?? "Ocorreu um erro! Tente novamente.",
        "error",
        5000,
      );
    },
  });
};

export const useTrackBackMatch = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ matchId, data }: { matchId: number; data: any }) =>
      MatchService.matchTrackBackMatchPartialUpdate(matchId, data),
    onSuccess: () => {
      callNotiStack(enqueueSnackbar, "Partida anterior!", "success");
      channel.postMessage({ type: "MATCH_UPDATED" });
      queryClient.invalidateQueries({ queryKey: ["brackets"] });
      queryClient.invalidateQueries({ queryKey: ["event-matches"] });
    },
    onError: (error: ApiError) => {
      callNotiStack(
        enqueueSnackbar,
        error.body?.error ?? "Ocorreu um erro! Tente novamente.",
        "error",
        5000,
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
      channel.postMessage({ type: "MATCH_UPDATED" });
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
