import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { EventsService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useRemoveEvent = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: EventsService.eventsDestroy,
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Evento removido da plataforma com sucesso!",
        "success",
        5000,
      );
      queryClient.invalidateQueries({ queryKey: ["events"] });
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
