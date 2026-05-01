import {
  Grid,
  Button,
  MenuItem,
  TextField,
  FormControl,
  FormLabel,
  Stack,
  FormHelperText,
  FormControlLabel,
  Switch,
  Tooltip,
  List,
  ListItem,
  ListItemButton,
  IconButton,
  ListItemIcon,
  Box,
  CircularProgress,
  Chip,
  ListItemText,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import {
  Add,
  Check,
  Clear,
  Close,
  Delete,
  SportsMartialArts,
} from "@mui/icons-material";
import { useEffect, useState, useMemo, Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { EncounterOptions, SeasonOptions } from "../../config";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import FormCard from "../../dashboard/FormCard";
import FormAccordion from "../../dashboard/FormAccordion";
import { eventsHooks, disciplinesHooks, categoriesHooks } from "../../hooks";
import AllUseTable from "../../components/Table/AllUseTable";
import CategoriesModal from "../../components/Categories/CategoriesModal";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import { callNotiStack } from "../../utils/utils";
import { useSnackbar } from "notistack";

export default function NewEventPage(props: Readonly<{ userRole: string }>) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isCategoriesExpanded, setIsCategoriesExpanded] =
    useState<boolean>(true);
  const [discipline, setDiscipline] = useState<string>("");
  const [disciplines, setDisciplines] = useState<string[]>([]);
  const [disciplineWarning, setDisciplineWarning] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchParams, _] = useSearchParams();

  const predifinedDate = searchParams.get("date") || "";

  const [selectedDisciplineForCategory, setSelectedDisciplineForCategory] =
    useState<string>("");
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] =
    useState<boolean>(false);
  const [disciplineCategories, setDisciplineCategories] = useState<any>([]);
  type DisciplineOption = {
    discipline: string;
    is_coach: boolean;
    is_team: boolean;
  };

  const [disciplineOptions, setDisciplineOptions] = useState<
    DisciplineOption[]
  >([]);

  const handleCategoriesModalOpen = () => {
    setIsCategoriesModalOpen(true);
  };

  const handleCategoriesModalClose = () => {
    setIsCategoriesModalOpen(false);
  };

  const handleRemove = (item: string) => {
    const indexToRemove = disciplines.indexOf(item);
    const indexToRemove2 = disciplineCategories.findIndex(
      (obj: any) => obj.discipline === item,
    );
    const indexToRemove3 = disciplineOptions.findIndex(
      (obj: any) => obj.discipline === item,
    );

    const newDisciplines = [...disciplines];
    const newDisciplineCategories = [...disciplineCategories];
    const newDisciplineOptions = [...disciplineOptions];

    if (indexToRemove > -1) {
      newDisciplines.splice(indexToRemove, 1);
    }
    if (indexToRemove2 > -1) {
      newDisciplineCategories.splice(indexToRemove2, 1);
    }

    if (indexToRemove3 > -1) {
      newDisciplineOptions.splice(indexToRemove3, 1);
    }

    setDisciplines(newDisciplines);
    setDisciplineCategories(newDisciplineCategories);
    setDisciplineOptions(newDisciplineOptions);
  };

  const createEvent = eventsHooks.useCreateEvent();
  const createDiscipline = disciplinesHooks.useCreateDiscipline();
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    categoriesHooks.useFetchCategoriesData(1, 100);
  const addDisciplineCategory = disciplinesHooks.useAddDisciplineCategory();

  // Memoize `rows` to compute only when `members` changes
  const categoryRows = useMemo(() => {
    const currentIds = disciplineCategories.find(
      (item: any) => item.discipline === selectedDisciplineForCategory,
    );
    return categoriesData?.results
      .filter((category) =>
        currentIds?.categories.includes(String(category.id)),
      )
      .map((category) => ({
        id: category.id,
        name: category.name,
        gender: category.gender,
        has_age:
          category.has_age === "Sim" ? (
            <Chip
              icon={<Check />}
              label=""
              color="success"
              sx={{
                bgcolor: "#d9ffe7",
                color: "#004d1f",
                "& .MuiChip-label": {
                  display: "none",
                },
                pl: 0.5,
                pr: 2,
              }}
            />
          ) : (
            <Chip
              icon={<Close />}
              label=""
              color="error"
              sx={{
                bgcolor: "#ff8fa3",
                color: "#800f2f",
                "& .MuiChip-label": {
                  display: "none",
                },
                pl: 0.5,
                pr: 2,
              }}
            />
          ),
        has_grad:
          category.has_grad === "Sim" ? (
            <Chip
              icon={<Check />}
              label=""
              color="success"
              sx={{
                bgcolor: "#d9ffe7",
                color: "#004d1f",
                "& .MuiChip-label": {
                  display: "none",
                },
                pl: 0.5,
                pr: 2,
              }}
            />
          ) : (
            <Chip
              icon={<Close />}
              label=""
              color="error"
              sx={{
                bgcolor: "#ff8fa3",
                color: "#800f2f",
                "& .MuiChip-label": {
                  display: "none",
                },
                pl: 0.5,
                pr: 2,
              }}
            />
          ),
        has_weight:
          category.has_weight === "Sim" ? (
            <Chip
              icon={<Check />}
              label=""
              color="success"
              sx={{
                bgcolor: "#d9ffe7",
                color: "#004d1f",
                "& .MuiChip-label": {
                  display: "none",
                },
                pl: 0.5,
                pr: 2,
              }}
            />
          ) : (
            <Chip
              icon={<Close />}
              label=""
              color="error"
              sx={{
                bgcolor: "#ff8fa3",
                color: "#800f2f",
                "& .MuiChip-label": {
                  display: "none",
                },
                pl: 0.5,
                pr: 2,
              }}
            />
          ),
        max_athletes:
          category.max_athletes === null ? (
            <Chip
              icon={<Close />}
              label=""
              color="error"
              sx={{
                bgcolor: "#ff8fa3",
                color: "#800f2f",
                "& .MuiChip-label": {
                  display: "none",
                },
                pl: 0.5,
                pr: 2,
              }}
            />
          ) : (
            <Chip
              icon={<Check />}
              label=""
              color="success"
              sx={{
                bgcolor: "#d9ffe7",
                color: "#004d1f",
                "& .MuiChip-label": {
                  display: "none",
                },
                pl: 0.5,
                pr: 2,
              }}
            />
          ),
      }));
  }, [categoriesData, selectedDisciplineForCategory, disciplineCategories]);

  console.log(categoryRows);

  type EventMetadataForm = {
    name: string;
    location: string;
    season: string;
    start_registration: undefined;
    end_registration: undefined;
    retifications_deadline: undefined;
    description: string;
    custody: string;
    email_contact: string;
    contact: string;
    encounter_type: string;
    has_registrations: boolean;
    has_categories: boolean;
    is_team: boolean;
    is_coach: boolean;
    event_date: string | undefined;
  };

  const {
    control: eventMetadataControl,
    handleSubmit,
    setError,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<EventMetadataForm>({
    defaultValues: {
      name: "",
      location: "",
      season: "",
      start_registration: undefined,
      end_registration: undefined,
      retifications_deadline: undefined,
      event_date: undefined,
      description: "",
      custody: "",
      email_contact: "",
      contact: "",
      encounter_type: "",
      has_registrations: true,
      has_categories: true,
      is_team: false,
      is_coach: false,
    },
  });

  useEffect(() => {
    if (predifinedDate !== "") {
      setValue("event_date", predifinedDate);
      callNotiStack(
        enqueueSnackbar,
        "Data do Evento predefinida com sucesso!",
        "success",
        3000,
      );
    }
  }, [predifinedDate]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    const formData = {
      name: data.name,
      location: data.location,
      season: data.season,
      start_registration: data.start_registration,
      end_registration: data.end_registration,
      retifications_deadline: data.retifications_deadline,
      event_date: data.event_date,
      description: data.description,
      custody: data.custody,
      email_contact: data.email_contact,
      contact: data.contact === "" ? null : data.contact,
      encounter: data.encounter,
      encounter_type: data.encounter_type,
      has_registrations: data.has_registrations,
      has_categories: data.has_categories,
    };

    const eventResponse = await createEvent.mutateAsync(formData, {
      onSuccess: () => {
        if (discipline.length === 0) {
          navigate("/events/");
          queryClient.refetchQueries({ queryKey: ["events"] });
        }
      },
      onError: (data: any) => {
        const errorData = data.response?.data || {};

        type Fields =
          | "name"
          | "location"
          | "season"
          | "event_date"
          | "contact"
          | "email_contact"
          | "start_registration"
          | "end_registration"
          | "retifications_deadline";

        const fields: Fields[] = [
          "name",
          "location",
          "season",
          "event_date",
          "contact",
          "email_contact",
          "start_registration",
          "end_registration",
          "retifications_deadline",
        ];

        fields.forEach((field) => {
          if (errorData[field]?.[0]) {
            setError(field, { message: errorData[field][0] });
          }
        });

        const dateFields: Fields[] = [
          "start_registration",
          "end_registration",
          "retifications_deadline",
        ];

        if (errorData.non_field_errors?.[0]) {
          const nonFieldMessage = errorData.non_field_errors[0];
          dateFields.forEach((field) => {
            if (formData[field] === undefined) {
              setError(field, { message: nonFieldMessage });
            }
          });
        }

        if (errorData.id?.[0]) {
          const sameIdMessage = errorData.id[0];
          setError("name", { message: sameIdMessage });
          setError("season", { message: sameIdMessage });
        }
        setLoading(false);
      },
      onSettled: () => {
        if (discipline.length === 0) {
          setLoading(false);
        }
      },
    });

    const eventId = eventResponse.id;

    const disciplineResponses = await Promise.all(
      disciplines.map((discipline) => {
        const options = disciplineOptions.find(
          (obj: any) => obj.discipline === discipline,
        );

        return createDiscipline.mutateAsync(
          {
            data: {
              event: eventId,
              name: discipline,
              is_coach: options?.is_coach,
              is_team: options?.is_team,
            },
          },
          {
            onSuccess: () => {
              if (!data.has_categories) {
                navigate("/events/");
                queryClient.refetchQueries({ queryKey: ["events"] });
              }
            },
          },
        );
      }),
    );

    disciplineResponses.forEach((discipline) => {
      const findDiscipline = disciplineCategories.find(
        (item: any) => item.discipline === discipline.name,
      );
      const data = {
        disciplineId: String(discipline.id),
        data: { category_ids: findDiscipline.categories },
      };
      addDisciplineCategory.mutate(data, {
        onSuccess: () => {
          navigate("/events/");
          queryClient.refetchQueries({ queryKey: ["events"] });
        },
      });
      setLoading(false);
    });
  };

  const hasTegistrations = watch("has_registrations");

  useEffect(() => {
    if (hasTegistrations) {
      setExpanded(true);
    }
  }, [hasTegistrations]);

  const columnMaping = [
    { key: "name", label: "Nome" },
    { key: "gender", label: "Género" },
    { key: "has_age", label: "Limite Idades" },
    { key: "has_grad", label: "Limite Ranks" },
    { key: "has_weight", label: "Limite Pesos" },
    { key: "max_athletes", label: "Limite Atletas (Equipas)" },
  ];

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("add_event_button")?.click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (discipline.toLowerCase() === "treinadores") {
      setValue("is_coach", true);
    }
  }, [discipline, setValue]);

  return (
    <>
      <PageInfoCard
        description={
          <>
            Aqui poderá registar um Evento.<p></p>
            Eventos podem ser (para já) Encontros ou Competições.
          </>
        }
        title="Novo Evento"
      ></PageInfoCard>
      <Grid container>
        <FormCard title="Tipo de Evento">
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="encounter_type"
              control={eventMetadataControl}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Tipo de Encontro"
                  sx={{
                    "& .MuiSelect-icon": {
                      left: "auto",
                      right: 40, // move arrow to the left
                    },
                    // "& .MuiSelect-select": {
                    //   paddingLeft: "40px", // avoid text overlapping the icon
                    // },
                    "& .MuiInputBase-root.Mui-disabled": {
                      cursor: "not-allowed",
                    },
                    "& .MuiSelect-select.Mui-disabled": {
                      cursor: "not-allowed",
                      display: "flex",
                      alignItems: "center",
                    },
                    "& .MuiSelect-select:empty.Mui-disabled::before": {
                      cursor: "not-allowed",
                    },
                    "& .Mui-disabled": {
                      pointerEvents: "auto",
                    },
                  }}
                  fullWidth
                  select
                  // disabled={!isEnabled}
                  required
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("encounter_type") === ""}
                            onClick={() => setValue("encounter_type", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("encounter_type") === ""
                                  ? "disabled"
                                  : "error"
                              }
                            ></Clear>
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.encounter_type}
                >
                  <MenuItem sx={{ color: "lightgrey" }} value="None">
                    -- Selecionar --
                  </MenuItem>
                  {EncounterOptions.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid sx={{ p: 3, pt: 1, pb: 1 }} container size={6}>
            <Controller
              name="has_registrations"
              control={eventMetadataControl}
              render={({ field }) => (
                <FormControl
                  component="fieldset"
                  variant="standard"
                  error={!!errors.has_registrations}
                >
                  <FormLabel sx={{ mb: 1 }}>
                    Selecione este campo se o Evento <strong>PERMITE</strong>{" "}
                    inscrições livres.
                  </FormLabel>
                  <Stack spacing={1}>
                    <FormControlLabel
                      labelPlacement="start"
                      control={
                        <Switch
                          sx={{ ml: 2 }}
                          {...field}
                          checked={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                            setExpanded((prev) => !prev);
                          }}
                          name="has_registrations"
                        />
                      }
                      label="Tem inscrições"
                      sx={{ justifyContent: "left", marginLeft: 0 }}
                    />
                    {field.value && (
                      <FormHelperText
                        variant="filled"
                        sx={{ fontSize: 12, marginLeft: "14px" }}
                      >
                        Isto tornará obrigatório o fornecimento de datas para
                        encontros gerais e de datas e regras para competições.
                      </FormHelperText>
                    )}
                  </Stack>
                </FormControl>
              )}
            />
          </Grid>
          <Grid sx={{ p: 3, pt: 1, pb: 1 }} container size={6}>
            <Controller
              name="has_categories"
              control={eventMetadataControl}
              render={({ field }) => (
                <FormControl
                  component="fieldset"
                  variant="standard"
                  error={!!errors.has_categories}
                >
                  <FormLabel sx={{ mb: 1 }}>
                    Selecione este campo se o Evento <strong>PERMITE</strong> a
                    atribuição de Escalões para as inscrições. Para cada evento
                    (geralmente competições), os Escalões terão de ser
                    selecionadas para posteriormente se poder inscrever Atletas.
                  </FormLabel>
                  <Stack spacing={1}>
                    <FormControlLabel
                      labelPlacement="start"
                      control={
                        <Switch
                          sx={{ ml: 2 }}
                          {...field}
                          checked={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                            if (e.target.checked) {
                              setIsCategoriesExpanded(true);
                            } else {
                              setIsCategoriesExpanded(false);
                            }
                          }}
                          name="has_registrations"
                        />
                      }
                      label="Tem Escalões"
                      sx={{ justifyContent: "left", marginLeft: 0 }}
                    />
                  </Stack>
                </FormControl>
              )}
            />
          </Grid>
        </FormCard>
        <FormCard title="Informações Gerais">
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="name"
              control={eventMetadataControl}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Nome"
                  fullWidth
                  required
                  {...field}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("name") === ""}
                            onClick={() => setValue("name", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("name") === "" ? "disabled" : "error"
                              }
                            ></Clear>
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="location"
              control={eventMetadataControl}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Localização"
                  fullWidth
                  required
                  {...field}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("location") === ""}
                            onClick={() => setValue("location", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("location") === "" ? "disabled" : "error"
                              }
                            ></Clear>
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.location}
                  helperText={errors.location?.message}
                />
              )}
            />
          </Grid>
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="season"
              control={eventMetadataControl}
              render={({ field }) => (
                <TextField
                  sx={{
                    "& .MuiSelect-icon": {
                      left: "auto",
                      right: 40, // move arrow to the left
                    },
                    // "& .MuiSelect-select": {
                    //   paddingLeft: "40px", // avoid text overlapping the icon
                    // },
                  }}
                  color="warning"
                  variant={"outlined"}
                  label="Época"
                  type="number"
                  slotProps={{
                    htmlInput: { inputMode: "numeric", pattern: "[0-9]*" },
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("season") === ""}
                            onClick={() => setValue("season", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("season") === "" ? "disabled" : "error"
                              }
                            ></Clear>
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  fullWidth
                  select
                  required
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.season}
                  helperText={errors.season?.message}
                >
                  <MenuItem sx={{ color: "lightgrey" }} value="None">
                    -- Selecionar --
                  </MenuItem>
                  {SeasonOptions.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="event_date"
              control={eventMetadataControl}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    format="YYYY-MM-DD"
                    label="Data Evento *"
                    onChange={(date) => {
                      field.onChange(date ? date.format("YYYY-MM-DD") : "");
                    }}
                    value={field.value ? dayjs(field.value) : null}
                    enableAccessibleFieldDOMStructure={false}
                    slots={{ textField: TextField }}
                    slotProps={{
                      field: {
                        clearable: true,
                      },
                      textField: {
                        fullWidth: true,
                        error: !!errors?.event_date,
                        helperText: errors?.event_date?.message || "",
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          </Grid>
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="description"
              control={eventMetadataControl}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Descrição"
                  fullWidth
                  {...field}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("description") === ""}
                            onClick={() => setValue("description", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("description") === ""
                                  ? "disabled"
                                  : "error"
                              }
                            ></Clear>
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </Grid>
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="custody"
              control={eventMetadataControl}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Organizador"
                  fullWidth
                  {...field}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("custody") === ""}
                            onClick={() => setValue("custody", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("custody") === "" ? "disabled" : "error"
                              }
                            ></Clear>
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.custody}
                  helperText={errors.custody?.message}
                />
              )}
            />
          </Grid>
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="email_contact"
              control={eventMetadataControl}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Email de contacto"
                  fullWidth
                  {...field}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("email_contact") === ""}
                            onClick={() => setValue("email_contact", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("email_contact") === ""
                                  ? "disabled"
                                  : "error"
                              }
                            ></Clear>
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.email_contact}
                  helperText={errors.email_contact?.message}
                />
              )}
            />
          </Grid>
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="contact"
              control={eventMetadataControl}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  type="number"
                  label="Contacto telefónico"
                  fullWidth
                  {...field}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("contact") === ""}
                            onClick={() => setValue("contact", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("contact") === "" ? "disabled" : "error"
                              }
                            ></Clear>
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.contact}
                  helperText={errors.contact?.message}
                />
              )}
            />
          </Grid>
        </FormCard>
        <FormAccordion
          title="Datas"
          expanded={expanded}
          tooltipMessage="Apenas poderá abrir esta secção, se tiver permitido a este Evento ter inscrições."
        >
          <Grid container justifyContent={"space-between"} size={12}>
            <Grid sx={{ p: 2 }} container justifyContent="center" size={4}>
              <Controller
                name="start_registration"
                control={eventMetadataControl}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...field}
                      format="YYYY-MM-DD"
                      label="Início Inscrições *"
                      onChange={(date) => {
                        field.onChange(date ? date.format("YYYY-MM-DD") : "");
                      }}
                      value={field.value ? dayjs(field.value) : null}
                      slots={{ textField: TextField }}
                      enableAccessibleFieldDOMStructure={false}
                      slotProps={{
                        field: {
                          clearable: true,
                        },
                        textField: {
                          fullWidth: true,
                          error: !!errors?.start_registration,
                          helperText: errors?.start_registration?.message || "",
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
            <Grid sx={{ p: 2 }} container justifyContent="center" size={4}>
              <Controller
                name="end_registration"
                control={eventMetadataControl}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...field}
                      format="YYYY-MM-DD"
                      label="Fim Inscrições *"
                      onChange={(date) => {
                        field.onChange(date ? date.format("YYYY-MM-DD") : "");
                      }}
                      value={field.value ? dayjs(field.value) : null}
                      slots={{ textField: TextField }}
                      enableAccessibleFieldDOMStructure={false}
                      slotProps={{
                        field: {
                          clearable: true,
                        },
                        textField: {
                          fullWidth: true,
                          error: !!errors?.end_registration,
                          helperText: errors?.end_registration?.message || "",
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
            <Grid sx={{ p: 2 }} container justifyContent="center" size={4}>
              <Controller
                name="retifications_deadline"
                control={eventMetadataControl}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...field}
                      format="YYYY-MM-DD"
                      label="Data limite retificações *"
                      onChange={(date) => {
                        field.onChange(date ? date.format("YYYY-MM-DD") : "");
                      }}
                      value={field.value ? dayjs(field.value) : null}
                      slots={{ textField: TextField }}
                      enableAccessibleFieldDOMStructure={false}
                      slotProps={{
                        field: {
                          clearable: true,
                        },
                        textField: {
                          fullWidth: true,
                          error: !!errors?.retifications_deadline,
                          helperText:
                            errors?.retifications_deadline?.message || "",
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
          </Grid>
          <FormHelperText sx={{ p: 1, pb: 0 }}>
            No caso de não pretender período de retificações, ajuste a "Data
            limite retificações" para o mesmo dia do "Fim Inscrições".
          </FormHelperText>
        </FormAccordion>
        <FormAccordion
          title="Modalidades"
          expanded={expanded}
          tooltipMessage="Apenas poderá abrir esta secção se este Evento for um Torneio/Competição."
        >
          <Grid size={6} container>
            <Grid p={2} pt={1} container justifyContent="center" size={11}>
              <TextField
                color="warning"
                variant={"outlined"}
                label="Modalidade"
                fullWidth
                value={discipline}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          disabled={discipline === ""}
                          onClick={() => setDiscipline("")}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          <Clear
                            color={discipline === "" ? "disabled" : "error"}
                          ></Clear>
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                onChange={(e) => {
                  setDisciplineWarning(false);
                  setDiscipline(e.target.value);
                }}
                error={disciplineWarning}
                helperText={
                  disciplineWarning ? "Este campo é obrigatório." : null
                }
              />
              <FormHelperText
                variant="filled"
                sx={{ fontSize: 12, marginTop: "10px" }}
              >
                Preencha este campo com as Modalidades previstas para este
                Evento.
                <br></br> Depois de adicionar, pode apagar ao carregar na
                Modalidade que aparecerá emediatamente ao lado.
              </FormHelperText>
            </Grid>
            <Grid sx={{ p: 1, pt: 2, pb: 1 }} container size={1}>
              <Tooltip title="Adicionar">
                <span>
                  <IconButton
                    onClick={() => {
                      if (discipline === "") {
                        setDisciplineWarning(true);
                        return;
                      }

                      const isCoach = getValues("is_coach");
                      const isTeam = getValues("is_team");

                      setDisciplines((prev) => [...prev, discipline]);

                      setDisciplineOptions((prev) => [
                        ...prev,
                        {
                          discipline,
                          is_coach: isCoach,
                          is_team: isTeam,
                        },
                      ]);

                      // Now it's safe to reset
                      setValue("is_coach", false);
                      setValue("is_team", false);
                      setDiscipline("");
                    }}
                  >
                    <Add color="success" />
                  </IconButton>
                </span>
              </Tooltip>
            </Grid>
            <Grid sx={{ p: 3, pt: 1 }} container size={12}>
              <Controller
                name="is_coach"
                control={eventMetadataControl}
                render={({ field }) => (
                  <FormControl
                    component="fieldset"
                    variant="standard"
                    error={!!errors.is_coach}
                  >
                    <FormLabel sx={{ mb: 1 }}>
                      Selecione este campo se esta Modalidade for direcionada
                      para a inscrição de Treinadores no evento.
                    </FormLabel>
                    <Stack spacing={1}>
                      <FormControlLabel
                        labelPlacement="start"
                        control={
                          <Switch
                            sx={{ ml: 2 }}
                            {...field}
                            checked={field.value}
                            onChange={(e) => {
                              field.onChange(e.target.checked);
                            }}
                            name="is_coach"
                          />
                        }
                        label="Treinadores"
                        sx={{ justifyContent: "left", marginLeft: 0 }}
                      />
                      {field.value && (
                        <FormHelperText
                          variant="filled"
                          sx={{ fontSize: 12, marginLeft: "14px" }}
                        >
                          Esta Modalidade irá aceitar apenas Membros guardados
                          com o tipo "Treinador".
                        </FormHelperText>
                      )}
                    </Stack>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid sx={{ p: 3, pt: 1 }} container size={12}>
              <Controller
                name="is_team"
                control={eventMetadataControl}
                render={({ field }) => (
                  <FormControl
                    component="fieldset"
                    variant="standard"
                    error={!!errors.is_team}
                  >
                    <FormLabel sx={{ mb: 1 }}>
                      Selecione este campo se esta Modalidade for direcionada
                      para a inscrição de Equipas no evento.
                    </FormLabel>
                    <Stack spacing={1}>
                      <FormControlLabel
                        labelPlacement="start"
                        control={
                          <Switch
                            sx={{ ml: 2 }}
                            {...field}
                            checked={field.value}
                            onChange={(e) => {
                              field.onChange(e.target.checked);
                            }}
                            name="is_team"
                          />
                        }
                        label="Equipas"
                        sx={{ justifyContent: "left", marginLeft: 0 }}
                      />
                      {field.value && (
                        <FormHelperText
                          variant="filled"
                          sx={{ fontSize: 12, marginLeft: "14px" }}
                        >
                          Esta Modalidade irá aceitar apenas Equipas.
                        </FormHelperText>
                      )}
                    </Stack>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
          <Grid size={6} textAlign={"center"}>
            {disciplines.length === 0 ? (
              <Typography p={3} color="textDisabled">
                Não tem Modalidades para adicionar a este Evento.
              </Typography>
            ) : (
              <List dense>
                {disciplines.map((discipline, index) => {
                  const options = disciplineOptions.filter(
                    (opt) => opt.discipline === discipline,
                  );

                  return (
                    <ListItem key={index}>
                      <ListItemButton sx={{ p: 1, pl: 3 }} disableTouchRipple>
                        <ListItemIcon>
                          <SportsMartialArts fontSize="large" />
                        </ListItemIcon>
                        <ListItemText
                          slotProps={{ primary: { fontSize: 20 } }}
                          primary={discipline}
                          secondary={
                            <Stack direction="row" spacing={1} mt={0.5}>
                              {options.map((opt, idx) => (
                                <Fragment key={idx}>
                                  {opt.is_coach && (
                                    <Chip
                                      color="success"
                                      size="small"
                                      label="Treinadores"
                                    />
                                  )}
                                  {opt.is_team && (
                                    <Chip
                                      color="success"
                                      size="small"
                                      label="Equipas"
                                    />
                                  )}
                                </Fragment>
                              ))}
                            </Stack>
                          }
                        />
                      </ListItemButton>

                      <IconButton onClick={() => handleRemove(discipline)}>
                        <Delete color="error" />
                      </IconButton>
                    </ListItem>
                  );
                })}
              </List>
            )}
          </Grid>
        </FormAccordion>
        <FormAccordion
          title="Escalões"
          expanded={isCategoriesExpanded}
          tooltipMessage='Apenas poderá abrir esta secção se selecionar "Escalões".'
        >
          <Grid size={3}>
            {disciplines.length === 0 ||
            (disciplines.length === 1 &&
              disciplines[0].toLowerCase() === "treinadores") ? (
              <ListItem>
                <ListItemButton sx={{ p: 1, pl: 3, color: "gray" }}>
                  As Modalidades que adicionar no campo de cima aparecerão aqui.
                  Adicione Modalidades para poder adicionar Escalões às mesmas.
                </ListItemButton>
              </ListItem>
            ) : (
              <List dense sx={{ mb: 2 }}>
                {disciplines
                  .filter(
                    (discipline: string) =>
                      discipline.toLowerCase() !== "treinadores",
                  )
                  .map((discipline, index) => (
                    <ListItem key={index}>
                      <ListItemButton
                        selected={discipline === selectedDisciplineForCategory}
                        onClick={() =>
                          setSelectedDisciplineForCategory(discipline)
                        }
                        sx={{ p: 1, pl: 3 }}
                      >
                        <ListItemIcon>
                          <SportsMartialArts fontSize="large" />
                        </ListItemIcon>
                        {discipline}
                      </ListItemButton>
                    </ListItem>
                  ))}
              </List>
            )}
            <Button
              variant="contained"
              size="large"
              color="success"
              onClick={handleCategoriesModalOpen}
              startIcon={<Add />}
              disabled={selectedDisciplineForCategory === ""}
            >
              Adicionar
            </Button>
          </Grid>
          <Grid size={9}>
            {isCategoriesLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : selectedDisciplineForCategory === "" ? (
              <Grid container size={12} justifyContent="center">
                <Typography mt={5} color="textDisabled">
                  Selecione uma Modalidade no campo ao lado para visualizar os
                  Escalões já adicionados.
                </Typography>
              </Grid>
            ) : (
              <AllUseTable
                type="CategoriasReadOnly"
                data={categoryRows}
                count={categoryRows?.length!}
                columnsHeaders={columnMaping}
                actions
                selection={false}
                deletable
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                userRole={props.userRole}
                selectedDisciplineForCategory={selectedDisciplineForCategory}
                disciplineCategories={disciplineCategories}
                setDisciplineCategories={setDisciplineCategories}
              ></AllUseTable>
            )}
          </Grid>
        </FormAccordion>
        <Grid
          mr={6}
          mt={2}
          justifyContent="flex-end"
          spacing={2}
          container
          size={12}
        >
          <Button
            id="add_event_button"
            variant="contained"
            size={"large"}
            color={"success"}
            type={"submit"}
            loading={loading}
            loadingPosition="start"
            onClick={() => {
              handleSubmit(onSubmit)();
            }}
          >
            Submeter
          </Button>
          <Button
            variant="outlined"
            size={"small"}
            type={"submit"}
            onClick={() => {
              navigate("/events/");
            }}
          >
            Voltar
          </Button>
        </Grid>
        <CategoriesModal
          handleModalClose={handleCategoriesModalClose}
          isModalOpen={isCategoriesModalOpen}
          disciplineData={selectedDisciplineForCategory}
          disciplineCategories={disciplineCategories}
          setDisciplineCategories={setDisciplineCategories}
        ></CategoriesModal>
      </Grid>
    </>
  );
}
