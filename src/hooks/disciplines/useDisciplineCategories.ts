import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { DisciplinesService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useAddDisciplineCategory = (addToEvent?: boolean) => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ disciplineId, data }: { disciplineId: string; data: any }) =>
      DisciplinesService.disciplinesAddCategoriesPartialUpdate(
        Number(disciplineId),
        data,
      ),
    onSuccess: (data: any) => {
      callNotiStack(enqueueSnackbar, data.message, "success", 5000);
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["single-event"] });
      queryClient.invalidateQueries({ queryKey: ["disciplines"] });
      if (addToEvent) {
        queryClient.invalidateQueries({
          queryKey: ["category-not-in-discipline"],
        });
      }
    },
    onError: (data: any) => {
      callNotiStack(enqueueSnackbar, data.response.data.error, "error", 5000);
    },
  });
};

export const useRemoveDisciplineCategory = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ disciplineId, data }: { disciplineId: string; data: any }) =>
      DisciplinesService.disciplinesDeleteCategoryCreate(
        Number(disciplineId),
        data,
      ),
    onSuccess: (data: any) => {
      callNotiStack(enqueueSnackbar, data.message, "success", 5000);
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["single-event"] });
      queryClient.invalidateQueries({ queryKey: ["disciplines"] });
    },
    onError: (data: any) => {
      callNotiStack(enqueueSnackbar, data.response.data.error, "error", 5000);
    },
  });
};
