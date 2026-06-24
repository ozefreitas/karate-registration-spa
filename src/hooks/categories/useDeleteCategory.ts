import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { CategoriesService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useDeleteCategory = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CategoriesService.categoriesDestroy,
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Escalão(ões) removido(s) da plataforma com sucesso!",
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

export const useDeleteAllCategoriesData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CategoriesService.categoriesDeleteAllDestroy,
    onSuccess: (data: any) => {
      callNotiStack(enqueueSnackbar, `${data.message}!`, "success", 5000);

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
