import {
  patchMonthlyMemberSubscription,
  patchMemberMonthlyPaymentConfig,
} from "./../../api/monthlyPaymentsApi";
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
    onSuccess: (data: any) => {
      enqueueSnackbar(data.data.message, {
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
      queryClient.invalidateQueries({
        queryKey: ["member-single-monthly-subscription"],
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

export const usePatchMemberMonthlyPaymentConfig = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      monthlyPaymentConfigId,
      data,
    }: {
      monthlyPaymentConfigId: string;
      data: any;
    }) => patchMemberMonthlyPaymentConfig(monthlyPaymentConfigId, data),
    onSuccess: () => {
      enqueueSnackbar("Definições de pagamento atualizadas", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["single-member"],
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
