// import axios from "axios";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useSnackbar } from "notistack";

// const fetchIndividuals = (page: number, pageSize: number) => {
//   const token = localStorage.getItem("token");
//   return axios.get("http://127.0.0.1:8000/individuals/", {
//     headers: {
//       Authorization: `Token ${token}`,
//     },
//     params: {
//       in_competition: location.pathname.split("/")[2],
//       page: page,
//       page_size: pageSize,
//     },
//   });
// };

// export const useFetchIndividualsData = (page: number, pageSize: number) => {
//   return useQuery({
//     queryKey: ["individuals", page, pageSize],
//     queryFn: () => fetchIndividuals(page, pageSize),
//     refetchOnWindowFocus: false,
//     refetchOnMount: false,
//   });
// };

// const addIndividual = (data: any) => {
//   const token = localStorage.getItem("token");
//   return axios.post("http://127.0.0.1:8000/individuals/", data, {
//     headers: {
//       Authorization: `Token ${token}`,
//     },
//   });
// };

// export const useAddIndividualData = () => {
//   const { enqueueSnackbar } = useSnackbar();

//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: addIndividual,
//     onSuccess: () => {
//       enqueueSnackbar("Atleta(s) adicionados com sucesso!", {
//         variant: "success",
//         anchorOrigin: {
//           vertical: "top",
//           horizontal: "center",
//         },
//         autoHideDuration: 5000,
//         preventDuplicate: true,
//       });
//       queryClient.invalidateQueries({ queryKey: ["individuals"] });
//       queryClient.invalidateQueries({ queryKey: ["athletes-notin-event"] });
//     },
//     onError: () => {
//       enqueueSnackbar("Um erro ocorreu! Tente novamente.", {
//         variant: "error",
//         anchorOrigin: {
//           vertical: "top",
//           horizontal: "center",
//         },
//         autoHideDuration: 5000,
//         preventDuplicate: true,
//       });
//     },
//   });
// };

// const removeIndividual = (individualId: string) => {
//   const token = localStorage.getItem("token");
//   return axios.delete(`http://127.0.0.1:8000/individuals/${individualId}/`, {
//     headers: {
//       Authorization: `Token ${token}`,
//     },
//   });
// };

// export const useRemoveIndividualData = () => {
//   const { enqueueSnackbar } = useSnackbar();

//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: removeIndividual,
//     onSuccess: () => {
//       enqueueSnackbar("Atleta(s) removido(s) deste evento com sucesso!", {
//         variant: "success",
//         anchorOrigin: {
//           vertical: "top",
//           horizontal: "center",
//         },
//         autoHideDuration: 5000,
//         preventDuplicate: true,
//       });
//       queryClient.invalidateQueries({ queryKey: ["individuals"] });
//       queryClient.invalidateQueries({ queryKey: ["athletes-notin-event"] });
//     },
//     onError: () => {
//       enqueueSnackbar("Um erro ocorreu! Tente novamente.", {
//         variant: "error",
//         anchorOrigin: {
//           vertical: "top",
//           horizontal: "center",
//         },
//         autoHideDuration: 5000,
//         preventDuplicate: true,
//       });
//     },
//   });
// };

// const removeAllIndividuals = () => {
//   const token = localStorage.getItem("token");
//   return axios.delete(`http://127.0.0.1:8000/individuals/delete_all/`, {
//     headers: {
//       Authorization: `Token ${token}`,
//     },
//   });
// };

// export const useRemoveAllIndividualsData = () => {
//   const { enqueueSnackbar } = useSnackbar();

//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: removeAllIndividuals,
//     onSuccess: (data: any) => {
//       enqueueSnackbar(`${data.data.message}!`, {
//         variant: "success",
//         anchorOrigin: {
//           vertical: "top",
//           horizontal: "center",
//         },
//         autoHideDuration: 5000,
//         preventDuplicate: true,
//       });
//       queryClient.invalidateQueries({ queryKey: ["individuals"] });
//       queryClient.invalidateQueries({ queryKey: ["athletes-notin-event"] });
//     },
//     onError: () => {
//       enqueueSnackbar("Um erro ocorreu! Tente novamente.", {
//         variant: "error",
//         anchorOrigin: {
//           vertical: "top",
//           horizontal: "center",
//         },
//         autoHideDuration: 5000,
//         preventDuplicate: true,
//       });
//     },
//   });
// };
