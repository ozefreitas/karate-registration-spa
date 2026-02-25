import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { TeamsService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useDeleteTeamData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TeamsService.teamsDestroy,
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Equipa(s) removida(s) da plataforma com sucesso!",
        "success",
      );
      queryClient.invalidateQueries({ queryKey: ["disciplines"] });
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

// export const useDeleteAllMemberData = () => {
//   const { enqueueSnackbar } = useSnackbar();

//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: deleteAllMembers,
//     onSuccess: (data: any) => {
//       enqueueSnackbar(data.data.message, {
//         variant: "success",
//         anchorOrigin: {
//           vertical: "top",
//           horizontal: "center",
//         },
//         autoHideDuration: 5000,
//         preventDuplicate: true,
//       });
//       queryClient.invalidateQueries({ queryKey: ["members"] });
//       queryClient.invalidateQueries({ queryKey: ["individuals"] });
//       queryClient.invalidateQueries({ queryKey: ["members-notin-event"] });
//     },
//     onError: () => {
//       enqueueSnackbar("Ocorreu um erro! Tente novamente.", {
//         variant: "error",
//         anchorOrigin: {
//           vertical: "top",
//           horizontal: "center",
//         },
//         autoHideDuration: 5000,
//         preventDuplicate: true,
//       });
//     },
//   });
// };
