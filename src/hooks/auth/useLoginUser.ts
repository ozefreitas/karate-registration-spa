import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../openapi";
import { clearAccessToken, setAccessToken } from "../../api/authToken";
import { callNotiStack } from "../../utils/utils";

export const useLogInUser = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: any) => {
      clearAccessToken();
      localStorage.removeItem("token");
      return AuthService.authTokenCreate(variables);
    },
    onSuccess: (data: any) => {
      setAccessToken(data.access);
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
