import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { ClubsService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useRemoveClub = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ClubsService.clubsDestroy,
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Clube removido com sucesso.",
        "success",
        5000,
      );
      queryClient.invalidateQueries({ queryKey: ["available-clubs"] });
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
