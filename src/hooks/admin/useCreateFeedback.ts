import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { callNotiStack } from "../../utils/utils";
import { FeedbackService } from "../../openapi";

export const useCreateFeedback = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: ({ data }: { data: any }) =>
      FeedbackService.feedbackCreate(data),
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Feedback enviado! O administrador entrará em contacto em breve.",
        "success",
        5000,
      );
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
