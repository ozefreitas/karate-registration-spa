import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

const fetchAthleteData = (athleteId: string) => {
  const token = localStorage.getItem("token");
  return axios.post(`http://127.0.0.1:8000/athletes/${athleteId}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const athleteDataQuery = (athleteId: string) => {
  useQuery({
    queryKey: ["notifications"],
    queryFn: () => fetchAthleteData(athleteId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
