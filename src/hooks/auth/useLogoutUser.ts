import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { LogoutService } from "../../openapi";
import { useNavigate } from "react-router-dom";
import { callNotiStack } from "../../utils/utils";

export const useLogOutUser = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: LogoutService.logoutCreate,
    onSettled: () => {
      callNotiStack(enqueueSnackbar, "Saiu da sua conta!", "success");

      localStorage.removeItem("token");
      localStorage.removeItem("dismissedAnnouncementIds");
      localStorage.removeItem("membersView");
      localStorage.removeItem("eventsView");
      globalThis.location.reload();
      navigate("/");
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
