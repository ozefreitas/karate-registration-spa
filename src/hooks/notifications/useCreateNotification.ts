import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { NotificationsService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useCreateNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: NotificationsService.notificationsCreate,
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Notificação criada e enviada para a conta remetente!",
        "success",
      );
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
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

export const useCreateAllClubsNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: NotificationsService.notificationsCreateAllUsersCreate,
    onSuccess: (data: any) => {
      callNotiStack(enqueueSnackbar, data.data.message, "success");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (data: any) => {
      callNotiStack(enqueueSnackbar, data.response.data.error, "error", 5000);
    },
  });
};
