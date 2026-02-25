import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { EventsService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useAddEventMember = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: any }) =>
      EventsService.eventsAddMemberCreate(eventId, data),
    onSuccess: (data: any) => {
      callNotiStack(enqueueSnackbar, data.data.message, "success", 5000);
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["single-event"] });
      queryClient.invalidateQueries({ queryKey: ["members-notin-event"] });
    },
    onError: (data: any) => {
      callNotiStack(enqueueSnackbar, data.response.data.error, "error", 5000);
    },
  });
};

export const useRemoveEventMember = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: any }) =>
      EventsService.eventsDeleteMemberCreate(eventId, data),
    onSuccess: (data: any) => {
      callNotiStack(enqueueSnackbar, data.data.message, "success", 5000);
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["single-event"] });
      queryClient.invalidateQueries({ queryKey: ["members-notin-event"] });
    },
    onError: (data: any) => {
      callNotiStack(enqueueSnackbar, data.response.data.error, "error", 5000);
    },
  });
};
