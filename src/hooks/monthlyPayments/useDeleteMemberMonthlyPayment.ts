import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMonthlyMemberSubscription } from "../../api";
import { useSnackbar } from "notistack";
import { callNotiStack } from "../../utils/utils";

export const useDeleteMonthlyMemberSubscription = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMonthlyMemberSubscription,
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Pagamento removido com sucesso.",
        "success",
        5000,
      );
      queryClient.invalidateQueries({
        queryKey: ["member-monthly-subscription"],
      });
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
