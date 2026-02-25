import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { MonthlyPaymentPlansService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useDeleteMonthlyPaymentPlanData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: MonthlyPaymentPlansService.monthlyPaymentPlansDestroy,
    onSuccess: () => {
      callNotiStack(enqueueSnackbar, "Plano removido com sucesso!", "success");
      queryClient.invalidateQueries({
        queryKey: ["monthly-subscription-plans"],
      });
    },
    onError: (data: any) => {
      const errorData = data.response?.data || {};
      if (errorData.detail) {
        callNotiStack(enqueueSnackbar, errorData.detail, "error", 3000);
      } else {
        callNotiStack(
          enqueueSnackbar,
          "Ocorreu um erro! Tente novamente.",
          "error",
          3000,
        );
      }
    },
  });
};
