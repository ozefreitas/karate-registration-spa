import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

const fetchAthletes = () => {
  const token = localStorage.getItem("token");
  return axios.get(`http://127.0.0.1:8000/athletes/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useFetchAthletesData = () => {
  return useQuery({
    queryKey: ["athletes"],
    queryFn: fetchAthletes,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

const fetchSingleAthlete = (athleteId: string | null) => {
  const token = localStorage.getItem("token");
  return axios.get(`http://127.0.0.1:8000/athletes/${athleteId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useFetchSingleAthleteData = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: fetchSingleAthlete,
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

const updateAthlete = (athleteId: string | null, data: any) => {
  const token = localStorage.getItem("token");
  return axios.put(`http://127.0.0.1:8000/athletes/${athleteId}/`, data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useUpdateAthleteData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      athleteId,
      data,
    }: {
      athleteId: string | null;
      data: any;
    }) => updateAthlete(athleteId, data),
    onSuccess: () => {
      enqueueSnackbar("Atleta atualizado com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["athletes"] });
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
        preventDuplicate: true,
      });
    },
  });
};

const removeAthelete = (athleteId: string) => {
  const token = localStorage.getItem("token");
  return axios.delete(`http://127.0.0.1:8000/athletes/${athleteId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useRemoveAthleteData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeAthelete,
    onSuccess: () => {
      enqueueSnackbar("Atleta removido da plataforma com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["athletes"] });
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
        preventDuplicate: true,
      });
    },
  });
};
