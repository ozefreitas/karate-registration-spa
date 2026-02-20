import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { createMember, createMemberValidationRequest } from "../../api";

export const useCreateMember = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMember,
    onSuccess: () => {
      enqueueSnackbar("Membro criado com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["club-members"] });
      queryClient.invalidateQueries({ queryKey: ["members-notin-event"] });
    },
    onError: (data: any) => {
      const errorData = data.response?.data || {};
      if (errorData.member_type_missmatch?.[0]) {
        enqueueSnackbar(errorData.member_type_missmatch?.[0], {
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

export const useCreateMemberValidationRequest = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMemberValidationRequest,

    onSuccess: (_data, variables) => {
      const person = variables.person;

      enqueueSnackbar("Pedido para validar membro enviado!", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });

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
        enqueueSnackbar("Já existe um pedido para esse membro!", {
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
