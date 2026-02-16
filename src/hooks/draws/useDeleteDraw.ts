import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EventsService } from "../../openapi";
import { useSnackbar } from "notistack";
import { callNotiStack } from "../../utils/utils";

export const useDeleteDraw = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: EventsService.eventsDeleteDrawDestroy,
    onSuccess: (data: any) => {
      callNotiStack(enqueueSnackbar, data.message, "success", 5000);
      queryClient.invalidateQueries({ queryKey: ["brackets"] });
    },
    onError: () => {
      callNotiStack(enqueueSnackbar, "Sorteio não encontrado.", "error", 5000);
    },
  });
};
