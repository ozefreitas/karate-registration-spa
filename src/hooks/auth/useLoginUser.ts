import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { loginUser } from "../../api";
import { useNavigate } from "react-router-dom";

export const useLogInUser = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data: any) => {
      localStorage.setItem("token", data.data.token);
      enqueueSnackbar("Login com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate("/");
    },
    onError: () => {
      enqueueSnackbar("Credenciais inválidas!", {
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
