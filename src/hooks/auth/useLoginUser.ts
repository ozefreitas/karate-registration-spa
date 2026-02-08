import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { LoginService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useLogInUser = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: LoginService.loginCreate,
    onSuccess: (data: any) => {
      const token = data.token;
      localStorage.setItem("token", token);

      callNotiStack(enqueueSnackbar, "Login com sucesso!", "success");

      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["club-notifications"] });

      navigate("/");
    },
    onError: () => {
      callNotiStack(enqueueSnackbar, "Credenciais inválidas!", "error");
    },
  });
};
