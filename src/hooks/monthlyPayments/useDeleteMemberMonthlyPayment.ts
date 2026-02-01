import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMonthlyMemberSubscription } from "../../api";
import { useSnackbar } from "notistack";

export const useDeleteMonthlyMemberSubscription = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMonthlyMemberSubscription,
    onSuccess: () => {
      enqueueSnackbar("Pagamento removido com sucesso.", {
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
