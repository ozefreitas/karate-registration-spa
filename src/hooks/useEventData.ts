import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";

const fetchEvents = (page: number, pageSize: number) => {
  const token = localStorage.getItem("token");
  if (token !== null) {
    return axios.get(`http://127.0.0.1:8000/events/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: {
        page: page,
        page_size: pageSize,
      },
    });
  } else {
    return axios.get(`http://127.0.0.1:8000/events/`, {
      params: {
        page: page,
        page_size: pageSize,
      },
    });
  }
};

export const useFetchEventsData = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ["events", page, pageSize],
    queryFn: () => fetchEvents(page, pageSize),
    refetchOnWindowFocus: false,
  });
};

const createEvent = (data: any) => {
  const token = localStorage.getItem("token");
  return axios.post(`http://127.0.0.1:8000/events/`, data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useCreateEvent = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: any }) => createEvent(data),
    onSuccess: () => {
      enqueueSnackbar("Evento criado com sucesso!", {
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

const updateEvent = (eventId: string | null, data: any) => {
  const token = localStorage.getItem("token");
  return axios.put(`http://127.0.0.1:8000/events/${eventId}/`, data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useUpdateEventData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string | null; data: any }) =>
      updateEvent(eventId, data),
    onSuccess: () => {
      enqueueSnackbar("Evento atualizado com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["single-event"] });
      queryClient.invalidateQueries({ queryKey: ["last-event"] });
      queryClient.invalidateQueries({ queryKey: ["next-event"] });
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

const patchEvent = (eventId: string | null, data: any) => {
  const token = localStorage.getItem("token");
  return axios.patch(`http://127.0.0.1:8000/events/${eventId}/`, data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const usePatchEventData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string | null; data: any }) =>
      patchEvent(eventId, data),
    onSuccess: () => {
      enqueueSnackbar("Evento atualizado com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["single-event"] });
      queryClient.invalidateQueries({ queryKey: ["last-event"] });
      queryClient.invalidateQueries({ queryKey: ["next-event"] });
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

const removeEvent = (eventId: string) => {
  const token = localStorage.getItem("token");
  return axios.delete(`http://127.0.0.1:8000/events/${eventId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useRemoveEvent = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeEvent,
    onSuccess: () => {
      enqueueSnackbar("Evento removido da plataforma com sucesso!", {
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

const fetchNextEvent = () => {
  return axios.get("http://127.0.0.1:8000/events/next_event/");
};

export const useFetchNextEventData = () => {
  return useQuery({
    queryKey: ["next-event"],
    queryFn: fetchNextEvent,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

const fetchLastEvent = () => {
  return axios.get("http://127.0.0.1:8000/events/last_event/");
};

export const useFetchLastEvent = (userRole: string) => {
  return useQuery({
    queryKey: ["last-event"],
    queryFn: fetchLastEvent,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: ["subed_dojo", "main_admin", "superuser"].includes(userRole),
  });
};

const fetchLastCompQuali = () => {
  return axios.get("http://127.0.0.1:8000/classifications/last_comp_quali/");
};

export const useFetchLastCompQuali = (userRole: string) => {
  return useQuery({
    queryKey: ["event-classifications"],
    queryFn: fetchLastCompQuali,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: ["subed_dojo", "main_admin", "superuser"].includes(userRole),
  });
};

const fetchSingleEvent = (eventId: any) => {
  const token = localStorage.getItem("token");
  return axios.get(`http://127.0.0.1:8000/events/${eventId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useSingleFetchEventData = (location: any) => {
  return useQuery({
    queryKey: ["single-event"],
    queryFn: () => fetchSingleEvent(location),
  });
};

const addEventAthlete = (eventId: string, data: any) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `http://127.0.0.1:8000/events/${eventId}/add_athlete/`,
    data,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

export const useAddEventAthlete = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: any }) =>
      addEventAthlete(eventId, data),
    onSuccess: (data: any) => {
      enqueueSnackbar(`${data.data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["single-event"] });
      queryClient.invalidateQueries({ queryKey: ["athletes-notin-event"] });
    },
    onError: (data: any) => {
      enqueueSnackbar(`${data.data.error}`, {
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

const removeEventAthlete = (eventId: string, data: any) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `http://127.0.0.1:8000/events/${eventId}/delete_athlete/`,
    data,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

export const useRemoveEventAthlete = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: any }) =>
      removeEventAthlete(eventId, data),
    onSuccess: (data: any) => {
      enqueueSnackbar(`${data.data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["single-event"] });
      queryClient.invalidateQueries({ queryKey: ["athletes-notin-event"] });
    },
    onError: (data: any) => {
      enqueueSnackbar(`${data.data.error}`, {
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

const fetchEventRate = (eventId: any) => {
  const token = localStorage.getItem("token");
  return axios.get(
    `http://127.0.0.1:8000/events/${eventId}/check_event_rate/`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

export const useFetchEventRate = (location: any) => {
  return useQuery({
    queryKey: ["event-rate"],
    queryFn: () => fetchEventRate(location),
  });
};

const rateEvent = (eventId: string, data: any) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `http://127.0.0.1:8000/events/${eventId}/rate_event/`,
    data,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

export const useRateEvent = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: any }) =>
      rateEvent(eventId, data),
    onSuccess: (data: any) => {
      enqueueSnackbar(`${data.data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["event-rate"] });
    },
    onError: (data: any) => {
      enqueueSnackbar(`${data.data.error}`, {
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

// modalities

const fetchDisciplines = (eventId: string) => {
  const token = localStorage.getItem("token");
  return axios.get(`http://127.0.0.1:8000/disciplines/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
    params: {
      event_disciplines: eventId,
    },
  });
};

export const useFetchDisciplinesData = (eventId: string) => {
  return useQuery({
    queryKey: ["disciplines", eventId],
    queryFn: () => fetchDisciplines(eventId),
    refetchOnWindowFocus: false,
  });
};

const createDiscipline = (data: any) => {
  const token = localStorage.getItem("token");
  return axios.post(`http://127.0.0.1:8000/disciplines/`, data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useCreateDiscipline = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: any }) => createDiscipline(data),
    onSuccess: () => {
      enqueueSnackbar("Modalidade(s) adicionada(s) com sucesso!", {
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

const addDisciplineAthlete = (disciplineId: string, data: any) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `http://127.0.0.1:8000/disciplines/${disciplineId}/add_athlete/`,
    data,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

export const useAddDisciplineAthlete = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ disciplineId, data }: { disciplineId: string; data: any }) =>
      addDisciplineAthlete(disciplineId, data),
    onSuccess: (data: any) => {
      if (data.data.status === "info") {
        enqueueSnackbar(`${data.data.message}`, {
          variant: "warning",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          autoHideDuration: 5000,
          preventDuplicate: true,
        });
      }
      enqueueSnackbar(`${data.data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["single-event"] });
      queryClient.invalidateQueries({ queryKey: ["disciplines"] });
    },
    onError: (data: any) => {
      enqueueSnackbar(`${data.response.data.error}`, {
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

const removeDisciplineAthlete = (disciplineId: string, data: any) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `http://127.0.0.1:8000/disciplines/${disciplineId}/delete_athlete/`,
    data,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

export const useRemoveDisciplineAthlete = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ disciplineId, data }: { disciplineId: string; data: any }) =>
      removeDisciplineAthlete(disciplineId, data),
    onSuccess: (data: any) => {
      enqueueSnackbar(`${data.data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["single-event"] });
      queryClient.invalidateQueries({ queryKey: ["disciplines"] });
      queryClient.invalidateQueries({ queryKey: ["athletes-notin-event"] });
    },
    onError: (data: any) => {
      enqueueSnackbar(`${data.data.error}`, {
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

// categories

const fetchCategories = (page?: number, pageSize?: number) => {
  const token = localStorage.getItem("token");
  const params: any = {};
  if (page !== undefined && pageSize !== undefined) {
    params.page = page;
    params.page_size = pageSize;
  }
  return axios.get(`http://127.0.0.1:8000/categories/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
    params,
  });
};

export const useFetchCategories = (page?: number, pageSize?: number) => {
  return useQuery({
    queryKey: ["categories", page, pageSize],
    queryFn: () => fetchCategories(page, pageSize),
    refetchOnWindowFocus: false,
  });
};

const fetchSingleCategory = (categoryId: string) => {
  const token = localStorage.getItem("token");
  return axios.get(`http://127.0.0.1:8000/categories/${categoryId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useFetchSingleCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ["single-category", categoryId],
    queryFn: () => fetchSingleCategory(categoryId),
    refetchOnWindowFocus: false,
    enabled: !!categoryId,
  });
};

const createCategory = (data: any) => {
  const token = localStorage.getItem("token");
  return axios.post(`http://127.0.0.1:8000/categories/`, data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useCreateCategory = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: any }) => createCategory(data),
    onSuccess: () => {
      enqueueSnackbar("Escalão criado com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
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

const addDisciplineCategory = (disciplineId: string, data: any) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `http://127.0.0.1:8000/disciplines/${disciplineId}/add_category/`,
    data,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

export const useAddDisciplineCategory = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ disciplineId, data }: { disciplineId: string; data: any }) =>
      addDisciplineCategory(disciplineId, data),
    onSuccess: (data: any) => {
      enqueueSnackbar(`${data.data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["single-event"] });
      queryClient.invalidateQueries({ queryKey: ["disciplines"] });
    },
    onError: (data: any) => {
      enqueueSnackbar(`${data.data.error}`, {
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

const removeDisciplineCategory = (disciplineId: string, data: any) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `http://127.0.0.1:8000/disciplines/${disciplineId}/delete_category/`,
    data,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

export const useRemoveDisciplineCategory = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ disciplineId, data }: { disciplineId: string; data: any }) =>
      removeDisciplineCategory(disciplineId, data),
    onSuccess: (data: any) => {
      enqueueSnackbar(`${data.data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["single-event"] });
      queryClient.invalidateQueries({ queryKey: ["disciplines"] });
    },
    onError: (data: any) => {
      enqueueSnackbar(`${data.data.error}`, {
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

const removeCategory = (categoryId: string) => {
  const token = localStorage.getItem("token");
  return axios.delete(`http://127.0.0.1:8000/categories/${categoryId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useRemoveCategory = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeCategory,
    onSuccess: () => {
      enqueueSnackbar("Escalão removido da plataforma com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
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

const removeAllCategories = () => {
  const token = localStorage.getItem("token");
  return axios.delete(`http://127.0.0.1:8000/categories/delete_all/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const useRemoveAllCategoriesData = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeAllCategories,
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
      queryClient.invalidateQueries({ queryKey: ["categories"] });
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
