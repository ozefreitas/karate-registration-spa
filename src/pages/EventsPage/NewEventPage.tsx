import {
  Card,
  CardContent,
  CardHeader,
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
  Typography,
  Tooltip,
  List,
  ListItem,
  ListItemButton,
  IconButton,
  ListItemIcon,
  Box,
  CircularProgress,
} from "@mui/material";
import { Add, Delete, SportsMartialArts } from "@mui/icons-material";
import { useEffect, useState, useMemo } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EncounterOptions, SeasonOptions } from "../../config";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import FormCard from "../../dashboard/FormCard";
import FormAccordion from "../../dashboard/FormAccordion";
import {
  useCreateEvent,
  useCreateDiscipline,
  useFetchCategories,
  useAddDisciplineCategory,
} from "../../hooks/useEventData";
import AthletesTable from "../../components/Table/AthletesTable";
import CategoriesModal from "../../components/Categories/CategoriesModal";

export default function NewEventPage(props: Readonly<{ userRole: string }>) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isRulesExpanded, setIsRulesExpanded] = useState<boolean>(true);
  const [isCategoriesExpanded, setIsCategoriesExpanded] =
    useState<boolean>(false);
  const [discipline, setDiscipline] = useState<string>("");
  const [disciplines, setDisciplines] = useState<string[]>([]);
  const [disciplineWarning, setDisciplineWarning] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [selectedDisciplineForCategory, setSelectedDisciplineForCategory] =
    useState<string>("");
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] =
    useState<boolean>(false);
  const [disciplineCategories, setDisciplineCategories] = useState<any>([]);

  const handleCategoriesModalOpen = () => {
    setIsCategoriesModalOpen(true);
  };

  const handleCategoriesModalClose = () => {
    setIsCategoriesModalOpen(false);
  };

  const handleRemove = (item: string) => {
    console.log(item);
    console.log(disciplineCategories);
    const indexToRemove = disciplines.indexOf(item);
    const indexToRemove2 = disciplineCategories.findIndex(
      (obj: any) => obj.discipline === item
    );
    console.log(indexToRemove2);
    const newDisciplines = [...disciplines];
    const newDisciplineCategories = [...disciplineCategories];
    if (indexToRemove > -1) {
      newDisciplines.splice(indexToRemove, 1);
    }
    if (indexToRemove2 > -1) {
      newDisciplineCategories.splice(indexToRemove2, 1);
    }
    setDisciplines(newDisciplines);
    setDisciplineCategories(newDisciplineCategories);
  };

  const createEvent = useCreateEvent();
  const createDiscipline = useCreateDiscipline();
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useFetchCategories();
  const addDisciplineCategory = useAddDisciplineCategory();

  type Category = {
    id: string;
    name: string;
    gender: string;
    has_age: string;
    has_grad: string;
    has_weight: string;
  };

  // Memoize `rows` to compute only when `athletes` changes
  const categoryRows = useMemo(() => {
    const currentIds = disciplineCategories.find(
      (item: any) => item.discipline === selectedDisciplineForCategory
    );
    return categoriesData?.data.results
      .filter((category: any) => currentIds?.categories.includes(category.id))
      .map((category: Category) => ({
        id: category.id,
        name: category.name,
        gender: category.gender,
        has_age: category.has_age,
        has_grad: category.has_grad,
        has_weight: category.has_weight,
      }));
  }, [categoriesData, selectedDisciplineForCategory, disciplineCategories]);

  const {
    control: eventMetadataControl,
    handleSubmit,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
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
      contact: undefined,
      has_teams: false,
      encounter: false,
      encounter_type: "",
      has_registrations: true,
      has_categories: true,
    },
  });

  const onSubmit = async (data: any) => {
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
      contact: data.contact,
      has_teams: data.has_teams,
      encounter: data.encounter,
      encounter_type: data.encounter_type,
      has_registrations: data.has_registrations,
    };

    const eventResponse = await createEvent.mutateAsync(
      { data: formData },
      {
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
        },
      }
    );
    const eventId = eventResponse.data.id;
    const disciplineResponses = await Promise.all(
      disciplines.map((discipline) =>
        createDiscipline.mutateAsync({
          data: { event: eventId, name: discipline },
        })
      )
    );
    disciplineResponses.forEach((discipline) => {
      const findDiscipline = disciplineCategories.find(
        (item: any) => item.discipline === discipline.data.name
      );
      findDiscipline.categories.forEach((category: string) => {
        const data = {
          disciplineId: discipline.data.id,
          data: { category_id: category },
        };
        addDisciplineCategory.mutate(data, {
          onSuccess: () => {
            navigate("/events/");
          },
        });
      });
    });
  };

  const isEncounter = useWatch({
    control: eventMetadataControl,
    name: "encounter",
  });

  const isEnabled = isEncounter === true;

  useEffect(() => {
    if (!isEncounter) {
      setIsCategoriesExpanded(true);
    }
  }, [isEncounter]);

  const hasTegistrations = getValues("has_registrations");

  useEffect(() => {
    if (hasTegistrations) {
      setExpanded(true);
    }
  }, [hasTegistrations]);

  const columnMaping = [
    { key: "name", label: "Nome" },
    { key: "gender", label: "Género" },
    { key: "has_age", label: "Idade" },
    { key: "has_grad", label: "Rank" },
    { key: "has_weight", label: "Peso" },
  ];

  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página de criação de Evento"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá registar um Evento.<p></p>
          Eventos podem ser (para já) Encontros ou Competições
        </CardContent>
      </Card>
      <Grid container>
        <FormCard title="Tipo de Evento">
          <Grid sx={{ p: 3, pt: 1 }} container size={6}>
            <Controller
              name="encounter"
              control={eventMetadataControl}
              render={({ field }) => (
                <FormControl
                  component="fieldset"
                  variant="standard"
                  error={!!errors.encounter}
                >
                  <FormLabel sx={{ mb: 1 }}>
                    Selecione este campo se o Evento <strong>NÃO</strong> for
                    uma competição.
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
                            if (!isRulesExpanded) {
                              setValue("has_registrations", true);
                            }
                            setIsRulesExpanded((prev) => !prev);
                          }}
                          name="encounter"
                        />
                      }
                      label="É encontro"
                      sx={{ justifyContent: "left", marginLeft: 0 }}
                    />
                    {!field.value && (
                      <FormHelperText
                        variant="filled"
                        sx={{ fontSize: 12, marginLeft: "14px" }}
                      >
                        Sendo uma competição, é obrigatório ter um período de
                        inscrições.
                      </FormHelperText>
                    )}
                  </Stack>
                </FormControl>
              )}
            />
          </Grid>
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
                  multiline
                  disabled={!isEnabled}
                  required
                  maxRows={8}
                  helperText="Só poderá escolher um tipo de encontro se selecionar o campo anterior."
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.encounter_type}
                >
                  <MenuItem value="None">-- Não Definido --</MenuItem>
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
                            if (isEncounter) {
                              field.onChange(e.target.checked);
                              setExpanded((prev) => !prev);
                            }
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
                        econtros gerais e de datas e regras para competições.
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
                    atribuição de Categorias para as inscrições. Para cada
                    evento (geralmente competições), as categorias terão de ser
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
                      label="Tem categorias"
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
                  color="warning"
                  variant={"outlined"}
                  label="Época"
                  type="number"
                  slotProps={{
                    htmlInput: { inputMode: "numeric", pattern: "[0-9]*" },
                  }}
                  fullWidth
                  multiline
                  select
                  required
                  maxRows={8}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.season}
                  helperText={errors.season?.message}
                >
                  <MenuItem value="None">-- Não Definido --</MenuItem>
                  {SeasonOptions.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid sx={{ p: 2, pt: 1 }} size={6}>
            <Controller
              name="event_date"
              control={eventMetadataControl}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
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
                        textField: {
                          fullWidth: true,
                          error: !!errors?.event_date,
                          helperText: errors?.event_date?.message || "",
                        },
                      }}
                    />
                  </DemoContainer>
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
                  multiline
                  {...field}
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
                  label="Contacto telefónico"
                  fullWidth
                  {...field}
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
          <Grid sx={{ p: 2, pt: 1 }} container justifyContent="center" size={4}>
            <Controller
              name="start_registration"
              control={eventMetadataControl}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
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
                        textField: {
                          fullWidth: true,
                          error: !!errors?.start_registration,
                          helperText: errors?.start_registration?.message || "",
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              )}
            />
          </Grid>
          <Grid sx={{ p: 2, pt: 1 }} container justifyContent="center" size={4}>
            <Controller
              name="end_registration"
              control={eventMetadataControl}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
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
                        textField: {
                          fullWidth: true,
                          error: !!errors?.end_registration,
                          helperText: errors?.end_registration?.message || "",
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              )}
            />
          </Grid>
          <Grid sx={{ p: 2, pt: 1 }} container justifyContent="center" size={4}>
            <Controller
              name="retifications_deadline"
              control={eventMetadataControl}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
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
                        textField: {
                          fullWidth: true,
                          error: !!errors?.retifications_deadline,
                          helperText:
                            errors?.retifications_deadline?.message || "",
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              )}
            />
          </Grid>
        </FormAccordion>
        <FormAccordion
          title="Modalidades"
          expanded={expanded}
          tooltipMessage="Apenas poderá abrir esta secção se este Evento não for um encontro."
        >
          <Grid sx={{ p: 2, pt: 1 }} container justifyContent="center" size={5}>
            <TextField
              color="warning"
              variant={"outlined"}
              label="Modalidade"
              fullWidth
              value={discipline}
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
              Preencha este campo com as Modalidades previstas para este Evento.
              <br></br> Depois de adicionar, pode apagar ao carregar na
              Modalidade que aparecerá emediatamente ao lado.
            </FormHelperText>
          </Grid>
          <Grid sx={{ p: 1, pt: 2, pb: 1 }} container size={0.5}>
            <Tooltip title="Adicionar">
              <IconButton
                onClick={() => {
                  if (discipline !== "") {
                    setDisciplines((prev) => [...prev, discipline]);
                    setDiscipline("");
                  } else {
                    setDisciplineWarning(true);
                  }
                }}
              >
                <Add color="success" />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid size={5} sx={{ ml: 3, mt: 1 }}>
            {disciplines.length !== 0 ? (
              <List dense>
                {disciplines.map((discipline, index) => (
                  <ListItem key={index}>
                    <ListItemButton sx={{ p: 1, pl: 3 }}>
                      <ListItemIcon>
                        <SportsMartialArts />
                      </ListItemIcon>
                      {discipline}
                    </ListItemButton>
                    <IconButton onClick={() => handleRemove(discipline)}>
                      <Delete color="error" />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            ) : (
              <ListItem>
                <ListItemButton sx={{ p: 1, pl: 3, color: "gray" }}>
                  Não tem modalidades para adicionar a este Evento.
                </ListItemButton>
              </ListItem>
            )}
          </Grid>
        </FormAccordion>
        <FormAccordion
          title="Escalões"
          expanded={isCategoriesExpanded}
          tooltipMessage='Apenas poderá abrir esta secção se selecionar "Categorias".'
        >
          <Grid size={3}>
            {disciplines.length !== 0 ? (
              <List dense>
                {disciplines.map((discipline, index) => (
                  <ListItem key={index}>
                    <ListItemButton
                      selected={discipline === selectedDisciplineForCategory}
                      onClick={() =>
                        setSelectedDisciplineForCategory(discipline)
                      }
                      sx={{ p: 1, pl: 3 }}
                    >
                      <ListItemIcon>
                        <SportsMartialArts />
                      </ListItemIcon>
                      {discipline}
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            ) : (
              <ListItem>
                <ListItemButton sx={{ p: 1, pl: 3, color: "gray" }}>
                  As Modalidades que adicionar no campo de cima aparecerão aqui.
                  Adicione Modalidades para poder adicionar Escalões às mesmas.
                </ListItemButton>
              </ListItem>
            )}
            <Button
              sx={{ m: 1 }}
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
            ) : selectedDisciplineForCategory !== "" ? (
              <AthletesTable
                type="CategoriasReadOnly"
                data={categoryRows}
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
              ></AthletesTable>
            ) : (
              <Grid container size={12} justifyContent="center">
                <Grid sx={{ mt: 5 }} size={6}>
                  <Typography sx={{ color: "gray" }}>
                    Selecione uma Modalidade no campo ao lado para visualizar as
                    categorias já adicionadas.
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid sx={{ m: 2, mt: 1 }} container size={12}></Grid>
        </FormAccordion>
        <Grid
          sx={{ m: 5 }}
          justifyContent="flex-end"
          spacing={2}
          container
          size={12}
        >
          <Button
            variant="contained"
            size={"large"}
            color={"success"}
            type={"submit"}
            sx={{ marginBottom: "20px" }}
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
            sx={{ marginBottom: "20px" }}
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
          setDisciplineCategories={setDisciplineCategories}
        ></CategoriesModal>
      </Grid>
    </>
  );
}
