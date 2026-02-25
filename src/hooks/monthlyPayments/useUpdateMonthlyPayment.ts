import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import {
  MonthlyMemberPaymentConfigsService,
  MonthlyPaymentPlansService,
  MonthlyPaymentsService,
} from "../../openapi";
import { callNotiStack } from "../../utils/utils";

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
    }) =>
      MonthlyPaymentsService.monthlyPaymentsPartialUpdate(
        Number(monthlySubscriptionId),
        data,
      ),
    onSuccess: (data: any) => {
      callNotiStack(enqueueSnackbar, data.data.message, "success");
      queryClient.invalidateQueries({
        queryKey: ["member-monthly-subscription"],
      });
      queryClient.invalidateQueries({
        queryKey: ["member-single-monthly-subscription"],
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
    }) =>
      MonthlyMemberPaymentConfigsService.monthlyMemberPaymentConfigsPartialUpdate(
        Number(monthlyPaymentConfigId),
        data,
      ),
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Definições de pagamento atualizadas.",
        "success",
      );
      queryClient.invalidateQueries({
        queryKey: ["single-member"],
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

export const usePatchMonthlyPaymentPlanData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ planId, data }: { planId: string; data: any }) =>
      MonthlyPaymentPlansService.monthlyPaymentPlansPartialUpdate(
        Number(planId),
        data,
      ),
    onSuccess: () => {
      callNotiStack(enqueueSnackbar, "Plano atualizado.", "success");
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
