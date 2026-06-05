import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { callNotiStack } from "../../utils/utils";
import { EventsService } from "../../openapi";
import { eventsExportDrawPdf } from "../../api";

export const useGenerateDraw = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: any }) =>
      EventsService.eventsGenerateDrawCreate(eventId, data),
    onSuccess: () => {
      callNotiStack(enqueueSnackbar, "Sorteios gerados com sucesso!", "success", 5000);
      queryClient.invalidateQueries({ queryKey: ["brackets"] });
    },
    onError: () => {
      callNotiStack(
        enqueueSnackbar,
        "Ocorreu um erro! Tente novamente.",
        "error",
        5000,
      );
    },
  });
};

export const useGenerateDrawPDF = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: any }) =>
      eventsExportDrawPdf(eventId, data),
    onSuccess: (data: any) => {
      callNotiStack(enqueueSnackbar, data.message, "success", 5000);
    },
    onError: () => {
      callNotiStack(
        enqueueSnackbar,
        "Ocorreu um erro! Tente novamente.",
        "error",
        5000,
      );
    },
  });
};
