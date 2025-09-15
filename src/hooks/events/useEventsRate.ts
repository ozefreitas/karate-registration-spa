import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchEventRate, rateEvent } from "../../api";
import { useSnackbar } from "notistack";

export const useFetchEventRate = (eventId: string) => {
  return useQuery({
    queryKey: ["events", eventId],
    queryFn: fetchEventRate,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useRateEvent = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: any }) =>
      rateEvent(eventId, data),
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
      queryClient.invalidateQueries({ queryKey: ["event-rate"] });
    },
    onError: (data: any) => {
      enqueueSnackbar(`${data.data.error}`, {
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
