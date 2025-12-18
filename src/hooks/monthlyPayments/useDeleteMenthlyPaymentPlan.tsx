import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { deleteMonthlyPaymentPlan } from "../../api";

export const useDeleteMonthlyPaymentPlanData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMonthlyPaymentPlan,
    onSuccess: () => {
      enqueueSnackbar("Plano removido com sucesso!", {
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
