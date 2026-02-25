import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { RequestAcountService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useRemoveRequestAcount = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: RequestAcountService.requestAcountDestroy,
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Pedido de conta rejeitado e removido.",
        "success",
        5000,
      );
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
