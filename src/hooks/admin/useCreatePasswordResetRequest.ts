import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { PasswordRecoveryService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

export const useCreatePasswordResetRequest = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PasswordRecoveryService.passwordRecoveryRequestCreate,
    onSuccess: (data: any) => {
      callNotiStack(enqueueSnackbar, data.message, "success", 5000);
      queryClient.invalidateQueries({ queryKey: ["password-requests"] });
    },
    onError: (data: any) => {
      callNotiStack(enqueueSnackbar, data.response.data.error, "error", 5000);
    },
  });
};

export const useCreatePasswordRecoveryURL = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PasswordRecoveryService.passwordRecoveryGenerateUrlCreate,
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "URL criado com sucesso!",
        "success",
        5000,
      );
      queryClient.invalidateQueries({ queryKey: ["password-requests"] });
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

export const useConfirmPassword = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      uidb,
      token,
      data,
    }: {
      uidb: string;
      token: string;
      data: any;
    }) =>
      PasswordRecoveryService.passwordRecoveryConfirmCreate(uidb, token, data),
    onSuccess: () => {
      callNotiStack(
        enqueueSnackbar,
        "Password alterada com sucesso!",
        "success",
        5000,
      );
      queryClient.invalidateQueries({ queryKey: ["password-requests"] });
    },
    onError: (data: any) => {
      callNotiStack(enqueueSnackbar, data.response.data.error, "error", 5000);
    },
  });
};
