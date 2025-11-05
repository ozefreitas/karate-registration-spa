import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { signUpWithToken } from "../../api";

export const useSignUpWithToken = () => {
  const { enqueueSnackbar } = useSnackbar();

  //   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signUpWithToken,
    onSuccess: () => {
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
      enqueueSnackbar("Ocorreu um erro! Tente novamente.", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
    },
  });
};
