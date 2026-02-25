import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { MonthlyPaymentPlansService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useCreateMemberMonthlyPaymentPlan = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: MonthlyPaymentPlansService.monthlyPaymentPlansCreate,
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Plano de pagamento criado com sucesso.",
        "success",
      );
      queryClient.invalidateQueries({
        queryKey: ["monthly-subscription-plans"],
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
