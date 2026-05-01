import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { DisciplinesService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useAddDisciplineTeam = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ disciplineId, data }: { disciplineId: string; data: any }) =>
      DisciplinesService.disciplinesAddTeamCreate(Number(disciplineId), data),
    retry: false,
    onSuccess: (data: any) => {
      callNotiStack(
        enqueueSnackbar,
        data.message,
        data.status !== undefined && data.status === "info"
          ? "warning"
          : "success",
      );
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["single-event"] });
      queryClient.invalidateQueries({ queryKey: ["disciplines"] });
    },
    onError: (err: any) => {
       const errorData = err?.body || {};
      if (errorData.athletes?.[0]) {
        callNotiStack(enqueueSnackbar, errorData.athletes?.[0], "error");
      } else if (errorData.error) {
        callNotiStack(enqueueSnackbar, errorData.error, "error");
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

export const useDeleteDisciplineTeam = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ disciplineId, data }: { disciplineId: string; data: any }) =>
      DisciplinesService.disciplinesDeleteTeamCreate(
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

export const useRemoveAllDisciplineTeams = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ disciplineId }: { disciplineId: string }) =>
      DisciplinesService.disciplinesDeleteAllTeamsDestroy(Number(disciplineId)),
    onSuccess: (data: any) => {
      callNotiStack(enqueueSnackbar, data.data.message, "success", 5000);
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["single-event"] });
      queryClient.invalidateQueries({ queryKey: ["disciplines"] });
    },
    onError: (data: any) => {
      callNotiStack(enqueueSnackbar, data.response.data.error, "error", 5000);
    },
  });
};
