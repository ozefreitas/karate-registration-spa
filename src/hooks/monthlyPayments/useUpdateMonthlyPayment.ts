import { patchMonthlyMemberSubscription } from "./../../api/monthlyPaymentsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

export const usePatchMonthlyMemberSubscriptionData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      monthlySubscriptionId,
      data,
    }: {
      monthlySubscriptionId: string;
      data: any;
    }) => patchMonthlyMemberSubscription(monthlySubscriptionId, data),
    onSuccess: () => {
      enqueueSnackbar("Estado de quota alterado com sucesso", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["member-monthly-subscription"],
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
