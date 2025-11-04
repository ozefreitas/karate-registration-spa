import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { logoutUser } from "../../api";
import { useNavigate } from "react-router-dom";

export const useLogOutUser = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: logoutUser,
    onSettled: () => {
      enqueueSnackbar("Saiu da sua conta!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("dismissedAnnouncementId");
      navigate("/");
      window.location.reload();
    },
    onError: () => {
      enqueueSnackbar("Um erro ocorreu. Tente mais tarde.", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 3000,
        preventDuplicate: true,
      });
    },
  });
};
