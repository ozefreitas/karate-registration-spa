import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { ClubSubscriptionService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

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
