import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { CategoriesService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useCreateCategory = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: any }) =>
      CategoriesService.categoriesCreate(data),
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Escalão criado com sucesso!",
        "success",
        5000,
      );
      queryClient.invalidateQueries({ queryKey: ["categories"] });
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
