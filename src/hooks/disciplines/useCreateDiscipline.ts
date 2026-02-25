import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { DisciplinesService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useCreateDiscipline = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: any }) =>
      DisciplinesService.disciplinesCreate(data),
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Modalidade(s) adicionada(s) com sucesso!",
        "success",
        5000,
      );
      queryClient.invalidateQueries({ queryKey: ["events"] });
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
