import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { createClub, createAllClubsSubscription } from "../../api";

export const useCreateClub = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createClub,
    onSuccess: () => {
      enqueueSnackbar("Clube criado com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["available-clubs"] });
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

export const useCreateAllClubsSubscription = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAllClubsSubscription,
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
      queryClient.invalidateQueries({
        queryKey: ["subscriptions-available-years"],
      });
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
