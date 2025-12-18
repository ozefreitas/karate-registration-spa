import { createMonthlyPaymentPlan } from "./../../api/monthlyPaymentsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

export const useCreateMemberMonthlyPaymentPlan = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMonthlyPaymentPlan,
    onSuccess: () => {
      enqueueSnackbar("Plano de pagamento criado com sucesso", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["monthly-subscription-plans"],
      });
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
