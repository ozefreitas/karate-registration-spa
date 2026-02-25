import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { SignUpService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useSignUpWithToken = () => {
  const { enqueueSnackbar } = useSnackbar();

  //   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SignUpService.signUpRegisterUserCreate,
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Conta criada com sucesso!",
        "success",
        5000,
      );
      enqueueSnackbar("Conta criada com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      //   queryClient.invalidateQueries({ queryKey: ["available-clubs"] });
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
