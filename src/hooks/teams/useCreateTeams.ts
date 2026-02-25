import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { TeamsService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useCreateTeam = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TeamsService.teamsCreate,
    onSuccess: () => {
      callNotiStack(enqueueSnackbar, "Equipa criada com sucesso!", "success");
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
    onError: (data: any) => {
      const errorData = data.response?.data || {};
      if (errorData.athletes?.[0]) {
        callNotiStack(enqueueSnackbar, errorData.athletes?.[0], "error", 5000);
      } else
        callNotiStack(
          enqueueSnackbar,
          "Ocorreu um erro! Tente novamente.",
          "error",
          3000,
        );
    },
  });
};
