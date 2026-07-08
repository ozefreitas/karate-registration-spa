import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiError, MatchService } from "../../openapi";
import { useSnackbar } from "notistack";
import { callNotiStack } from "../../utils/utils";

const channel = new BroadcastChannel("match_updates");

const invalidateMatchQueries = (() => {
  let timer: ReturnType<typeof setTimeout>;
  return (queryClient: QueryClient) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["brackets"] });
      queryClient.invalidateQueries({ queryKey: ["event-matches"] });
      queryClient.invalidateQueries({ queryKey: ["event-scoring-entries"] });
    }, 100);
  };
})();

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
      channel.postMessage({ type: "MATCH_UPDATED" });
      invalidateMatchQueries(queryClient);
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

export const usePatchMatch = (userRole: string, reset?: boolean) => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ matchId, data }: { matchId: number; data: any }) =>
      MatchService.matchPartialUpdate(matchId, data),
    onSuccess: (data: any) => {
      if (data.ongoing) {
        callNotiStack(
          enqueueSnackbar,
          reset
            ? "Ecrã limpo! Sem partida em direto!"
            : userRole === "technician"
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

      channel.postMessage({ type: "MATCH_UPDATED" });
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
      queryClient.invalidateQueries({ queryKey: ["event-scoring-entries"] });
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
      queryClient.invalidateQueries({ queryKey: ["event-scoring-entries"] });
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
          ? `VENCEDOR de ${data.discipline} de ${data.category} encontrado! Conclua o Escalão para oficializar o pódio.`
          : data.is_third_place
            ? "3º Lugar encontrado!"
            : "Vencedor atualizado e movido para ronda seguinte!",
        "success",
      );
      channel.postMessage({ type: "MATCH_UPDATED" });
      invalidateMatchQueries(queryClient);
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
