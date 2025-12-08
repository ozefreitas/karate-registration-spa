import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import {
  patchClubSubscription,
  patchClubSubscriptionAmountConfig,
  patchClubSubscriptionAmountbyYear,
  patchClubSubscriptionDueDatebyYear,
} from "../../api";

export const usePatchClubSubscriptionData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ clubId, data }: { clubId: string; data: any }) =>
      patchClubSubscription(clubId, data),
    onSuccess: () => {
      enqueueSnackbar("Quotas atualizadas!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["club-subscriptions"] });
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

export const usePatchClubSubscriptionAmountConfig = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: any }) =>
      patchClubSubscriptionAmountConfig(data),
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
      queryClient.invalidateQueries({ queryKey: ["club-subscriptions"] });
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

export const usePatchClubSubscriptionAmountbyYear = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchClubSubscriptionAmountbyYear,
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
      queryClient.invalidateQueries({ queryKey: ["club-subscriptions"] });
    },
    onError: (data: any) => {
      enqueueSnackbar(data.response.data.error, {
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

export const usePatchClubSubscriptionDueDatebyYear = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchClubSubscriptionDueDatebyYear,
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
      queryClient.invalidateQueries({ queryKey: ["club-subscriptions"] });
    },
    onError: (data: any) => {
      enqueueSnackbar(data.response.data.error, {
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
