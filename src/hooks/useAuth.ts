import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";

const fetchMe = () => {
  const token = localStorage.getItem("token");
  return axios.get(`http://127.0.0.1:8000/me/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useFetchMeData = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

const fetchAvailableClubs = () => {
  return axios.get("http://127.0.0.1:8000/dojos/", {});
};

export const useFetchAvailableClubs = () => {
  return useQuery({
    queryKey: ["available-clubs"],
    queryFn: fetchAvailableClubs,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

const createClub = (data: any) => {
  const token = localStorage.getItem("token");
  return axios.post(`http://127.0.0.1:8000/dojos/`, data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useCreateClub = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: any }) => createClub(data),
    onSuccess: () => {
      enqueueSnackbar("Clube criado com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: () => {
      enqueueSnackbar("Um erro ocorreu! Tente novamente.", {
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

const removeClub = (clubId: string) => {
  const token = localStorage.getItem("token");
  return axios.delete(`http://127.0.0.1:8000/dojos/${clubId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useRemoveClub = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ clubId }: { clubId: string }) => removeClub(clubId),
    onSuccess: () => {
      enqueueSnackbar("Clube removido com sucesso", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["available-clubs"] });
    },
    onError: () => {
      enqueueSnackbar(`Não foi possível remover este Clube. Tente novamente`, {
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

const fetchTokenUsername = (token: string) => {
  return axios.get(`http://127.0.0.1:8000/get_token_username/?token=${token}`);
};

export const useFetchTokenUsername = (token: string) => {
  return useQuery({
    queryKey: ["token_username", token],
    queryFn: () => fetchTokenUsername(token),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });
};

const fetchToken = (username: string) => {
  const token = localStorage.getItem("token");
  return axios.get(
    `http://127.0.0.1:8000/get_token_by_username/?username=${username}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

export const useFetchToken = (username: string) => {
  return useQuery({
    queryKey: ["token_username", username],
    queryFn: () => fetchToken(username),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });
};

const fetchRequestingAccounts = () => {
  const token = localStorage.getItem("token");
  return axios.get(`http://127.0.0.1:8000/request_acount/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useFetchRequestingAccounts = () => {
  return useQuery({
    queryKey: ["request-acount"],
    queryFn: fetchRequestingAccounts,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

const createRequestAcount = (data: any) => {
  return axios.post(`http://127.0.0.1:8000/request_acount/`, data);
};

export const useCreateRequestAcount = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: any }) => createRequestAcount(data),
    onSuccess: () => {
      enqueueSnackbar("Pedido de conta enviado! Será contactado em breve", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["request-acount"] });
    },
    onError: () => {
      enqueueSnackbar("Um erro ocorreu! Tente novamente.", {
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

const removeRequestAcount = (requestAcountId: string) => {
  const token = localStorage.getItem("token");
  return axios.delete(
    `http://127.0.0.1:8000/request_acount/${requestAcountId}/`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

export const useRemoveRequestAcount = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeRequestAcount,
    onSuccess: () => {
      enqueueSnackbar("Pedido de conta rejeitado e removido.", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["request-acount"] });
    },
    onError: () => {
      enqueueSnackbar("Um erro ocorreu! Tente novamente.", {
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

const createSignUpToken = (data: any) => {
  const token = localStorage.getItem("token");
  return axios.post(`http://127.0.0.1:8000/generate_token/`, data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useCreateSignUpToken = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: any }) => createSignUpToken(data),
    onSuccess: () => {
      enqueueSnackbar("Token criado!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["request-acount"] });
    },
    onError: () => {
      enqueueSnackbar("Um erro ocorreu! Tente novamente.", {
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
