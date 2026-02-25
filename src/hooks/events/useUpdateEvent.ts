import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { EventsService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useUpdateEventData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: any }) =>
      EventsService.eventsUpdate(eventId, data),
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Evento atualizado com sucesso!",
        "success",
        5000,
      );
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["single-event"] });
      queryClient.invalidateQueries({ queryKey: ["last-event"] });
      queryClient.invalidateQueries({ queryKey: ["next-event"] });
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

export const usePatchEventData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: any }) =>
      EventsService.eventsPartialUpdate(eventId, data),
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Evento atualizado com sucesso!",
        "success",
      );
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["single-event"] });
      queryClient.invalidateQueries({ queryKey: ["last-event"] });
      queryClient.invalidateQueries({ queryKey: ["next-event"] });
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
