import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { NotificationsService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useRemoveNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: NotificationsService.notificationsDestroy,
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Notificação removida com sucesso!",
        "success",
      );
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["club-notifications"] });
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
