import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { MonthlyPaymentsService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useCreateMonthlyMemberSubscription = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: MonthlyPaymentsService.monthlyPaymentsCreate,
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Pagamento criado com sucesso.",
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
