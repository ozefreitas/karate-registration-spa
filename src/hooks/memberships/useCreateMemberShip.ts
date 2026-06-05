import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { MembershipsService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useCreateMemberShip = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: MembershipsService.membershipsCreate,
    onSuccess: (data) => {
      callNotiStack(
        enqueueSnackbar,
        "Novo tipo de praticante criado com sucesso!",
        "success",
      );
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({
        queryKey: ["single-member", data.person],
      });
      queryClient.invalidateQueries({ queryKey: ["member-ships"] });
      queryClient.invalidateQueries({ queryKey: ["club-members"] });
      queryClient.invalidateQueries({ queryKey: ["members-notin-event"] });
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
