import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { LogoutService } from "../../openapi";
import { clearAccessToken } from "../../api/authToken";
import { callNotiStack } from "../../utils/utils";

export const useLogOutUser = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: LogoutService.logoutCreate,
    onSuccess: () => {
      callNotiStack(enqueueSnackbar, "Saiu da sua conta!", "success");
      clearAccessToken();
      localStorage.removeItem("dismissedAnnouncementIds");
      localStorage.removeItem("membersView");
      localStorage.removeItem("eventsView");
      queryClient.clear();
      globalThis.location.replace("/login/");
    },
    onError: () => {
      callNotiStack(
        enqueueSnackbar,
        "Ocorreu um erro. Tente mais tarde.",
        "error",
        3000,
      );
    },
  });
};
