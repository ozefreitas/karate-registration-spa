import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

const addIndividual = (data: any) => {
  const token = localStorage.getItem("token");
  return axios.post("http://127.0.0.1:8000/individuals/", data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

const removeIndividual = (individualId: string) => {
  const token = localStorage.getItem("token");
  return axios.delete(`http://127.0.0.1:8000/individuals/${individualId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};


export const useAddIndividualData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addIndividual,
    onSuccess: () => {
      enqueueSnackbar("Atleta(s) adicionados com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
      });
      queryClient.invalidateQueries({ queryKey: ["individuals"] });
      queryClient.invalidateQueries({ queryKey: ["athletes-notin-event"] });
    },
    onError: () => {
      enqueueSnackbar("Um erro ocorreu! Tente novamente.", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
      });
    },
  });
};

export const useRemoveIndividualData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeIndividual,
    onSuccess: () => {
      enqueueSnackbar("Atleta removido deste evento com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
      });
      queryClient.invalidateQueries({ queryKey: ["individuals"] });
      queryClient.invalidateQueries({ queryKey: ["athletes-notin-event"] });
    },
    onError: () => {
      enqueueSnackbar("Um erro ocorreu! Tente novamente.", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
      });
    },
  });
};
