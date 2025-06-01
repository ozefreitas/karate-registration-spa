import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

const fetchTeams = (page: number, pageSize: number) => {
  const token = localStorage.getItem("token");
  return axios.get(`http://127.0.0.1:8000/teams/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
    params: {
      page: page,
      page_size: pageSize,
    },
  });
};

export const useFetchTeamsData = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ["teams", page, pageSize],
    queryFn: () => fetchTeams(page, pageSize),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

const fetchSingleTeam = (teamId: string | null) => {
  const token = localStorage.getItem("token");
  return axios.get(`http://127.0.0.1:8000/teams/${teamId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useFetchSingleTeamData = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: fetchSingleTeam,
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

const updateTeam = (teamId: string | null, data: any) => {
  const token = localStorage.getItem("token");
  return axios.put(`http://127.0.0.1:8000/teams/${teamId}/`, data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useUpdateTeamData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ teamId, data }: { teamId: string | null; data: any }) =>
      updateTeam(teamId, data),
    onSuccess: () => {
      enqueueSnackbar("Equipa atualizada com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["athletes"] });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
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

const removeTeam = (teamId: string) => {
  const token = localStorage.getItem("token");
  return axios.delete(`http://127.0.0.1:8000/teams/${teamId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useRemoveTeamData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeTeam,
    onSuccess: () => {
      enqueueSnackbar("Equipa removida deste evento com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
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
