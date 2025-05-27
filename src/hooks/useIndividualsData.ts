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
        autoHideDuration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["individuals"] });
      queryClient.invalidateQueries({ queryKey: ["athletes-notin-event"] });
    },
    onError: () => {
      enqueueSnackbar("Um erro ocorreu! Tente novamente.", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 3000,
      });
    },
  });
};
