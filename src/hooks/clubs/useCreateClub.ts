import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { ClubsService, ClubSubscriptionService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useCreateClub = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ClubsService.clubsCreate,
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Clube criado com sucesso!",
        "success",
        5000,
      );
      queryClient.invalidateQueries({ queryKey: ["available-clubs"] });
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

export const useCreateAllClubsSubscription = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ClubSubscriptionService.clubSubscriptionCreateAllUsersCreate,
    onSuccess: (data: any) => {
      callNotiStack(enqueueSnackbar, data.data.message, "success", 5000);
      queryClient.invalidateQueries({ queryKey: ["club-subscriptions"] });
      queryClient.invalidateQueries({
        queryKey: ["subscriptions-available-years"],
      });
    },
    onError: (data: any) => {
      callNotiStack(enqueueSnackbar, data.response.data.error, "error", 3000);
    },
  });
};
