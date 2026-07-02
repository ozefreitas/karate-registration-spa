import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { MembershipsService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useDeleteMemberShipData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: MembershipsService.membershipsDestroy,
    onSuccess: (data: any) => {
        console.log(data)
      callNotiStack(
        enqueueSnackbar,
        "Tipo de praticante removido com sucesso!",
        "success",
      );
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({
        queryKey: ["single-member", data.person],
      });
      queryClient.invalidateQueries({ queryKey: ["member-ships"] });
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
