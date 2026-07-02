import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { MemberValidationService, PersonsService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useCreateMember = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (data: any) => void;
} = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PersonsService.personsCreate,
    onSuccess: () => {
      callNotiStack(enqueueSnackbar, "Membro criado com sucesso!", "success");
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["club-members"] });
      queryClient.invalidateQueries({ queryKey: ["members-notin-event"] });
      onSuccess?.();
    },
    onError: (data: any) => {
      const errorData = data.response?.data || {};
      if (errorData.member_type_missmatch?.[0]) {
        callNotiStack(
          enqueueSnackbar,
          errorData.member_type_missmatch?.[0],
          "error",
          5000,
        );
      } else {
        callNotiStack(
          enqueueSnackbar,
          "Ocorreu um erro! Tente novamente.",
          "error",
          3000,
        );
      }
      onError?.(data);
    },
  });
};

export const useCreateMemberValidationRequest = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: MemberValidationService.memberValidationCreate,

    onSuccess: (_data, variables) => {
      const person = variables.person;
      callNotiStack(
        enqueueSnackbar,
        "Pedido para validar membro enviado!",
        "success",
      );
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["club-members"] });
      queryClient.invalidateQueries({ queryKey: ["members-notin-event"] });
      queryClient.invalidateQueries({ queryKey: ["last-five-members"] });
      queryClient.invalidateQueries({
        queryKey: ["single-member", person],
      });
    },
    onError: (data: any) => {
      const errorData = data.response?.data || {};
      if (errorData.member?.[0]) {
        callNotiStack(
          enqueueSnackbar,
          "Já existe um pedido para esse membro!",
          "error",
          5000,
        );
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
