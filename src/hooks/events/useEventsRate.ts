import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { callNotiStack } from "../../utils/utils";
import { EventsService } from "../../openapi";

export const useFetchEventRate = (eventId: string) => {
  return useQuery({
    queryKey: ["event-rate", eventId],
    queryFn: () => EventsService.eventsCheckEventRateRetrieve(eventId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });
};

export const useRateEvent = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: any }) =>
      EventsService.eventsRateEventCreate(eventId, data),
    onSuccess: (data: any) => {
      callNotiStack(enqueueSnackbar, data.data.message, "success", 5000);
      queryClient.invalidateQueries({ queryKey: ["event-rate"] });
    },
    onError: (data: any) => {
      callNotiStack(enqueueSnackbar, data.response.data.error, "error", 5000);
    },
  });
};
