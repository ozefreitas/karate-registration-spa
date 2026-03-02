import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { MemberValidationService, PersonsService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useUpdateMemberData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ memberId, data }: { memberId: string; data: any }) =>
      PersonsService.personsUpdate(memberId, data),
    onSuccess: (data: any) => {
      callNotiStack(enqueueSnackbar, data.message, "success");
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["disciplines"] });
      queryClient.invalidateQueries({ queryKey: ["single-member"] });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      queryClient.invalidateQueries({ queryKey: ["members-notin-event"] });
    },
    onError: (data: any) => {
      const errorData = data.response?.data || {};
      if (errorData.not_allowed?.[0]) {
        callNotiStack(
          enqueueSnackbar,
          errorData.not_allowed?.[0],
          "error",
          3000,
        );
      } else {
        callNotiStack(
          enqueueSnackbar,
          "Ocorreu um erro! Tente novamente.",
          "error",
          3000,
        );
      }
    },
  });
};

export const usePatchMemberData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ personId, data }: { personId: string; data: any }) =>
      PersonsService.personsPartialUpdate(personId, data),
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Membro atualizado com sucesso!",
        "success",
      );
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["single-member"] });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
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

export const usePatchMemberValidationRequest = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ validationId, data }: { validationId: string; data: any }) =>
      MemberValidationService.memberValidationPartialUpdate(
        Number(validationId),
        data,
      ),
    onSuccess: () => {
      callNotiStack(enqueueSnackbar, "Estado atualizado!", "success");
      queryClient.invalidateQueries({ queryKey: ["members-validation"] });
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

export const useDeleteMemberValidationRequest = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ validationId }: { validationId: string }) =>
      MemberValidationService.memberValidationDestroy(Number(validationId)),
    onSuccess: () => {
      callNotiStack(enqueueSnackbar, "Pedido eliminado.", "success");
      queryClient.invalidateQueries({ queryKey: ["members-validation"] });
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
