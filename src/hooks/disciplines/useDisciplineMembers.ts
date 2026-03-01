import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { DisciplinesService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useAddDisciplineMember = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ disciplineId, data }: { disciplineId: string; data: any }) =>
      DisciplinesService.disciplinesAddMemberCreate(Number(disciplineId), data),
    retry: false,
    onSuccess: (data: any) => {
      callNotiStack(
        enqueueSnackbar,
        data.message,
        data?.status === "info" ? "warning" : "success",
        5000,
      );
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["single-event"] });
      queryClient.invalidateQueries({ queryKey: ["disciplines"] });
      queryClient.invalidateQueries({ queryKey: ["members-notin-event"] });
      queryClient.invalidateQueries({ queryKey: ["coaches-notin-event"] });
    },
    onError: async (error: any) => {
      const body = await error.body; 
      callNotiStack(
        enqueueSnackbar,
        body?.error || body?.detail || "Ocorreu um erro! Tente novamente.",
        "error",
        5000,
      );
    },
  });
};

export const useDeleteDisciplineMember = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ disciplineId, data }: { disciplineId: string; data: any }) =>
      DisciplinesService.disciplinesDeleteMemberCreate(
        Number(disciplineId),
        data,
      ),
    onSuccess: (data: any) => {
      callNotiStack(enqueueSnackbar, data.message, "success", 5000);
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["single-event"] });
      queryClient.invalidateQueries({ queryKey: ["disciplines"] });
      queryClient.invalidateQueries({ queryKey: ["members-notin-event"] });
      queryClient.invalidateQueries({ queryKey: ["coaches-notin-event"] });
      queryClient.invalidateQueries({
        queryKey: ["disciplines-not-in-member"],
      });
    },
    onError: (data: any) => {
      callNotiStack(enqueueSnackbar, data.response.data.error, "error", 5000);
    },
  });
};

export const useDeleteAllDisciplineMember = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ disciplineId }: { disciplineId: string }) =>
      DisciplinesService.disciplinesDeleteAllIndividualsDestroy(
        Number(disciplineId),
      ),
    onSuccess: (data: any) => {
      callNotiStack(enqueueSnackbar, data.data.message, "success", 5000);
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["single-event"] });
      queryClient.invalidateQueries({ queryKey: ["disciplines"] });
      queryClient.invalidateQueries({ queryKey: ["members-notin-event"] });
    },
    onError: (data: any) => {
      callNotiStack(enqueueSnackbar, data.response.data.error, "error", 5000);
    },
  });
};
