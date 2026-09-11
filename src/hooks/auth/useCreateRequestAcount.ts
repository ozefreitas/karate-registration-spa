import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { SignUpService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useCreateSignUpToken = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SignUpService.signUpGenerateTokenCreate,
    onSuccess: () => {
      callNotiStack(enqueueSnackbar, "Token criado!", "success", 5000);
      queryClient.invalidateQueries({ queryKey: ["request-acount"] });
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
