import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { ApiError, PasswordRecoveryService } from "../../openapi";
import { callNotiStack } from "../../utils/utils";

const getPasswordRecoveryErrorMessage = (error: unknown) => {
  if (
    error instanceof ApiError &&
    typeof error.body === "object" &&
    error.body !== null
  ) {
    if ("error" in error.body && typeof error.body.error === "string") {
      return error.body.error;
    }
    if ("message" in error.body && typeof error.body.message === "string") {
      return error.body.message;
    }
  }

  return "Ocorreu um erro. Tente novamente.";
};

export const useCreatePasswordResetRequest = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PasswordRecoveryService.passwordRecoveryRequestCreate,
    onSuccess: (data: any) => {
      callNotiStack(enqueueSnackbar, data.message, "success", 5000);
      queryClient.invalidateQueries({ queryKey: ["password-requests"] });
    },
    onError: (error) => {
      callNotiStack(
        enqueueSnackbar,
        getPasswordRecoveryErrorMessage(error),
        "error",
        5000,
      );
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
    onError: (error) => {
      callNotiStack(
        enqueueSnackbar,
        getPasswordRecoveryErrorMessage(error),
        "error",
        5000,
      );
    },
  });
};
