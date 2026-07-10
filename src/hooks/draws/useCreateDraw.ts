import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { callNotiStack } from "../../utils/utils";
import { BracketService } from "../../openapi";

export const useGenerateBracketDraw = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bracketId, data }: { bracketId: number; data: any }) =>
      BracketService.bracketGenerateBracketDrawCreate(bracketId, data),
    onSuccess: (data: any) => {
      callNotiStack(enqueueSnackbar, data.message, "success", 5000);
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

export const useMergeBrackets = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bracketId, data }: { bracketId: number; data: any }) =>
      BracketService.bracketMergeBracketCreate(bracketId, data),
    onSuccess: (data: any) => {
      callNotiStack(enqueueSnackbar, data.message, "success", 5000);
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
