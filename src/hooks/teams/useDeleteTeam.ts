import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { deleteTeam } from "../../api";

export const useDeleteTeamData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      enqueueSnackbar("Equipa(s) removida(s) da plataforma com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["disciplines"] });
    },
    onError: () => {
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
