import { useFetchDisciplinesData } from "./useEventData";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

const fetchAthletes = (page: number, pageSize: number) => {
  const token = localStorage.getItem("token");
  return axios.get(`http://127.0.0.1:8000/athletes/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
    params: {
      page: page,
      page_size: pageSize,
    },
  });
};

export const useFetchAthletesData = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ["athletes", page, pageSize],
    queryFn: () => fetchAthletes(page, pageSize),
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
  });
};

const createAthlete = (data: any) => {
  const token = localStorage.getItem("token");
  return axios.post(`http://127.0.0.1:8000/athletes/`, data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useCreateAthlete = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAthlete,
    onSuccess: () => {
      enqueueSnackbar("Atleta criado com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["athletes"] });
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

const fetchSingleAthlete = (athleteId: string | null) => {
  const token = localStorage.getItem("token");
  return axios.get(`http://127.0.0.1:8000/athletes/${athleteId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useFetchSingleAthleteData = (athleteId: any) => {
  return useQuery({
    queryKey: ["single-athlete", athleteId],
    queryFn: () => fetchSingleAthlete(athleteId),
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled: !!athleteId,
  });
};

export const fetchLastFiveAthletes = () => {
  const token = localStorage.getItem("token");
  return axios.get("http://127.0.0.1:8000/athletes/last_five/", {
    headers: {
      Authorization: `Token ${token}`,
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
      queryClient.invalidateQueries({ queryKey: ["single-athlete"] });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
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

const fetchAthletesNotInEvent = (page: number, pageSize: number) => {
  const token = localStorage.getItem("token");
  return axios.get("http://127.0.0.1:8000/athletes/", {
    headers: {
      Authorization: `Token ${token}`,
    },
    params: {
      not_in_event: location.pathname.split("/")[2],
      page: page,
      page_size: pageSize,
    },
  });
};

export const useFetchAthletesNotInEvent = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ["athletes-notin-event", page, pageSize],
    queryFn: () => fetchAthletesNotInEvent(page, pageSize),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

const fetchAthletesInCategoryGender = (category: string, gender: string) => {
  const token = localStorage.getItem("token");
  return axios.get("http://127.0.0.1:8000/athletes/", {
    headers: {
      Authorization: `Token ${token}`,
    },
    params: {
      in_category: category,
      in_gender: gender,
    },
  });
};

export const useFetchAthletesInCategoryGender = (
  category: string,
  gender: string
) => {
  return useQuery({
    queryKey: ["athletes-in-category-gender", category, gender],
    queryFn: () => fetchAthletesInCategoryGender(category, gender),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
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
      enqueueSnackbar("Atleta(s) removido(s) da plataforma com sucesso!", {
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

const removeAllAtheletes = () => {
  const token = localStorage.getItem("token");
  return axios.delete(`http://127.0.0.1:8000/athletes/delete_all/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useRemoveAllAthletesData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeAllAtheletes,
    onSuccess: (data: any) => {
      enqueueSnackbar(`${data.data.message}!`, {
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

const fetchDisciplinesnotInAthlete = (athleteId: string, eventId: string) => {
  const token = localStorage.getItem("token");
  return axios.get(
    `http://127.0.0.1:8000/athletes/${athleteId}/unregistered_modalities/${eventId}/`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

export const useFetchDisciplinesnotInAthleteData = (
  athleteId: string,
  eventId: string
) => {
  return useQuery({
    queryKey: ["disciplines-not-in-athlete", athleteId, eventId],
    queryFn: () => fetchDisciplinesnotInAthlete(athleteId, eventId),
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
    enabled: athleteId !== "",
  });
};
