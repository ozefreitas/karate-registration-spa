import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { addEventAthlete, deleteEventAthlete } from "../../api";

export const useAddEventMember = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: any }) =>
      addEventAthlete(eventId, data),
    onSuccess: (data: any) => {
      enqueueSnackbar(`${data.data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["single-event"] });
      queryClient.invalidateQueries({ queryKey: ["athletes-notin-event"] });
    },
    onError: (data: any) => {
      enqueueSnackbar(`${data.response.data.error}`, {
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

export const useRemoveEventAthlete = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: any }) =>
      deleteEventAthlete(eventId, data),
    onSuccess: (data: any) => {
      enqueueSnackbar(`${data.data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["single-event"] });
      queryClient.invalidateQueries({ queryKey: ["athletes-notin-event"] });
    },
    onError: (data: any) => {
      enqueueSnackbar(`${data.response.data.error}`, {
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