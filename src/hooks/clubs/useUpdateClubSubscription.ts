import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { ClubSubscriptionService } from "../../openapi";
import { ApiError } from "../../openapi/core/ApiError";
import { callNotiStack } from "../../utils/utils";

const getSubscriptionErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof ApiError && typeof error.body?.error === "string") {
    return error.body.error;
  }

  return fallback;
};

export const useCreateClubSubscriptionsForAllUsers = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ClubSubscriptionService.clubSubscriptionCreateAllUsersCreate,
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Quotas e notificações criadas para os clubes.",
        "success",
        5000,
      );
      queryClient.invalidateQueries({ queryKey: ["club-subscriptions"] });
      queryClient.invalidateQueries({
        queryKey: ["subscriptions-available-years"],
      });
    },
    onError: (error: unknown) => {
      callNotiStack(
        enqueueSnackbar,
        getSubscriptionErrorMessage(
          error,
          "Não foi possível criar as quotas. Tente novamente.",
        ),
        "error",
        3000,
      );
    },
  });
};

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
        "Não foi possível atualizar o estado do pagamento. Tente novamente.",
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
      callNotiStack(enqueueSnackbar, data.message, "success", 5000);
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
      callNotiStack(enqueueSnackbar, data.message, "success", 5000);
      queryClient.invalidateQueries({ queryKey: ["club-subscriptions"] });
    },
    onError: (error: unknown) => {
      callNotiStack(
        enqueueSnackbar,
        getSubscriptionErrorMessage(
          error,
          "Não foi possível atualizar o montante das quotas. Tente novamente.",
        ),
        "error",
        3000,
      );
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
      callNotiStack(enqueueSnackbar, data.message, "success", 5000);
      queryClient.invalidateQueries({ queryKey: ["club-subscriptions"] });
    },
    onError: (error: unknown) => {
      callNotiStack(
        enqueueSnackbar,
        getSubscriptionErrorMessage(
          error,
          "Não foi possível atualizar as datas limite. Tente novamente.",
        ),
        "error",
        3000,
      );
    },
  });
};
