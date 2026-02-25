import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { EventsService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useCreateEvent = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: EventsService.eventsCreate,
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Evento criado com sucesso!",
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
