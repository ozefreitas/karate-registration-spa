import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { callNotiStack } from "../../utils/utils";
import { MonthlyPaymentsService } from "../../openapi";

export const useDeleteMonthlyMemberSubscription = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: MonthlyPaymentsService.monthlyPaymentsDestroy,
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Pagamento removido com sucesso.",
        "success",
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
