import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
  });
};

const fetchNotifications = () => {
  const token = localStorage.getItem("token");
  return axios.get("http://127.0.0.1:8000/dojos/", {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useFetchNotifications = () => {
  return useQuery({
    queryKey: ["home-notifications"],
    queryFn: fetchNotifications,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};