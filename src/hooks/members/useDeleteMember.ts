import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { PersonsService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useDeleteMemberData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PersonsService.personsDestroy,
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Membro(s) removido(s) da plataforma com sucesso!",
        "success",
      );
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["individuals"] });
      queryClient.invalidateQueries({ queryKey: ["members-notin-event"] });
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

export const useDeleteAllMemberData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PersonsService.personsDeleteAllDestroy,
    onSuccess: (data: any) => {
      callNotiStack(enqueueSnackbar, data.data.message, "success");
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["individuals"] });
      queryClient.invalidateQueries({ queryKey: ["members-notin-event"] });
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
