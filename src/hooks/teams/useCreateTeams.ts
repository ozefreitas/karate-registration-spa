import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { createTeam } from "../../api";

export const useCreateTeam = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTeam,
    onSuccess: () => {
      enqueueSnackbar("Equipa criada com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
    onError: (data: any) => {
      const errorData = data.response?.data || {};
      if (errorData.athletes?.[0]) {
        enqueueSnackbar(errorData.athletes?.[0], {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          autoHideDuration: 5000,
          preventDuplicate: true,
        });
      } else
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
