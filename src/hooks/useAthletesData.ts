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

const fetchSingleAthlete = (athleteId: string) => {
  const token = localStorage.getItem("token");
  return axios.get(`http://127.0.0.1:8000/athletes/${athleteId}`, {
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

export const useFetchSingleAthleteData = (athleteId: string) => {
  return useQuery({
    queryKey: ["single-athlete"],
    queryFn: () => fetchSingleAthlete(athleteId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
