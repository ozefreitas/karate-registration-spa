import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { ClubSubscriptionService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const usePatchClubSubscriptionData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ clubId, data }: { clubId: number; data: any }) =>
      ClubSubscriptionService.clubSubscriptionPartialUpdate(clubId, data),
    onSuccess: () => {
      callNotiStack(enqueueSnackbar, "Quotas atualizadas!", "success", 5000);
      queryClient.invalidateQueries({ queryKey: ["club-subscriptions"] });
    },
    onError: () => {
      callNotiStack(
        enqueueSnackbar,
        "Não foi possível remover este Clube. Tente novamente.",
        "error",
        3000,
      );
    },
  });
};

export const usePatchClubSubscriptionAmountConfig = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: any }) =>
      ClubSubscriptionService.clubSubscriptionUpdateSubscriptionAmountPartialUpdate(
        data,
      ),
    onSuccess: (data: any) => {
      callNotiStack(enqueueSnackbar, data.data.message, "success", 5000);
      queryClient.invalidateQueries({ queryKey: ["club-subscriptions"] });
    },
    onError: () => {
      callNotiStack(
        enqueueSnackbar,
        "Não foi possível remover este Clube. Tente novamente.",
        "error",
        3000,
      );
    },
  });
};

export const usePatchClubSubscriptionAmountbyYear = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:
      ClubSubscriptionService.clubSubscriptionUpdateAllUsersAmountPartialUpdate,
    onSuccess: (data: any) => {
      callNotiStack(enqueueSnackbar, data.data.message, "success", 5000);
      queryClient.invalidateQueries({ queryKey: ["club-subscriptions"] });
    },
    onError: (data: any) => {
      callNotiStack(enqueueSnackbar, data.response.data.error, "error", 3000);
    },
  });
};

export const usePatchClubSubscriptionDueDatebyYear = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:
      ClubSubscriptionService.clubSubscriptionUpdateAllUsersDueDatePartialUpdate,
    onSuccess: (data: any) => {
      callNotiStack(enqueueSnackbar, data.data.message, "success", 5000);
      queryClient.invalidateQueries({ queryKey: ["club-subscriptions"] });
    },
    onError: (data: any) => {
      callNotiStack(enqueueSnackbar, data.response.data.error, "error", 3000);
    },
  });
};
