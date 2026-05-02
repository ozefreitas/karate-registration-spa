import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import {
  ClubSettingsService,
  ClubSubscriptionConfigService,
} from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const usePatchClubSettingsData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ settingId, data }: { settingId: number; data: any }) =>
      ClubSettingsService.clubSettingsPartialUpdate(settingId, data),
    onSuccess: () => {
      callNotiStack(enqueueSnackbar, "Dia atualizado!", "success", 5000);
      queryClient.invalidateQueries({ queryKey: ["club-settings"] });
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

export const usePatchClubSubscriptionConfigData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ configId, data }: { configId: string; data: any }) =>
      ClubSubscriptionConfigService.clubSubscriptionConfigPartialUpdate(
        configId,
        data,
      ),
    onSuccess: () => {
      callNotiStack(enqueueSnackbar, "Montante atualizado!", "success", 5000);
      queryClient.invalidateQueries({ queryKey: ["club-subscription-config"] });
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
