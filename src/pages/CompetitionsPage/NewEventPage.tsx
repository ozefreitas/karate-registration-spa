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
  IconButton,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  EncounterOptions,
  SeasonOptions,
  GraduationsOptions,
  GenderOptions,
  MatchTypeOptions,
} from "../../config";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import FormCard from "../../dashboard/FormCard";
import FormAccordion from "../../dashboard/FormAccordion";
import { useCreateEvent } from "../../hooks/useEventData";

export default function NewEventPage() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isRulesExpanded, setIsRulesExpanded] = useState<boolean>(false);
  const [createCategories, setCreateCategories] = useState<boolean>(false);

  const createEvent = useCreateEvent();

  const {
    control: eventMetadataControl,
    handleSubmit,
    setError,
    reset,
    setValue,
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
      contact: "",
      has_teams: false,
      encounter: false,
      encounter_type: "",
      has_registrations: true,
      change_categories: false,
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
      // change_categories: data.change_categories,
    };

    createEvent.mutate(
      { data: formData },
      {
        onSuccess: () => {
          navigate("/events/");
        },
        onError: (data: any) => {
          setError("name", { message: data.response.data.name[0] });
          setError("location", { message: data.response.data.location[0] });
          setError("season", { message: data.response.data.season[0] });
          setError("event_date", { message: data.response.data.event_date[0] });
          setError("contact", { message: data.response.data.contact[0] });
          setError("email_contact", {
            message: data.response.data.email_contact[0],
          });
        },
      }
    );

    // else {
    //   setError("kata", {
    //     type: "manual",
    //     message: "Selecione pelo menos uma opção.",
    //   });
    //   setError("kumite", {
    //     type: "manual",
    //     message: "Selecione pelo menos uma opção.",
    //   });
    // }
  };

  const {
    control: CategoryControl,
    handleSubmit: handleSubmitCategoryControl,
    setError: setErrorCategoryControl,
    reset: resetCategoryControl,
    formState: { errors: CategoryControlErrors },
  } = useForm({
    defaultValues: {
      category: "",
      min_age: "",
      max_age: "",
      min_grad: "",
      max_grad: "",
      gender: "",
      match_type: "",
    },
  });

  const onSubmitCategory = async (data: any) => {
    console.log(data);
    const formData = {};
    resetCategoryControl();
  };

  const isEncounter = useWatch({
    control: eventMetadataControl,
    name: "encounter",
  });

  const isEnabled = isEncounter === true;

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
                            if (isRulesExpanded) {
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
          <Grid sx={{ p: 3, pt: 1, pb: 1 }} container size={8}>
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
                            if (isRulesExpanded) {
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
                  type="text"
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
          setExpanded={setExpanded}
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
                          // error: !!localErrors?.publication_date,
                          // helperText:
                          //   localErrors?.publication_date?.message || "",
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
                          // error: !!localErrors?.publication_date,
                          // helperText:
                          //   localErrors?.publication_date?.message || "",
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
                          // error: !!localErrors?.publication_date,
                          // helperText:
                          //   localErrors?.publication_date?.message || "",
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
          title="Definição de Regras"
          expanded={isRulesExpanded}
          setExpanded={setIsRulesExpanded}
        >
          <Grid sx={{ p: 3, pt: 1, pb: 1 }} container size={12}>
            <Controller
              name="change_categories"
              control={eventMetadataControl}
              render={({ field }) => (
                <FormControl
                  component="fieldset"
                  variant="standard"
                  error={!!errors.has_registrations}
                >
                  <FormLabel sx={{ mb: 1 }}>
                    Selecione este campo caso pretenda usar escalões distintos
                    dos padrões da SKIP.
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
                            setCreateCategories((prev) => !prev);
                          }}
                          name="change_categories"
                        />
                      }
                      label="Criar escalões"
                      sx={{ justifyContent: "left" }}
                    />
                    {field.value && (
                      <FormHelperText
                        variant="filled"
                        sx={{ fontSize: 12, marginLeft: "14px" }}
                      >
                        Isto tornará obrigatório o fornecimento de escalões com
                        os limites de idades respetivos. Irá também eliminar os
                        escalões SKIP.
                      </FormHelperText>
                    )}
                  </Stack>
                </FormControl>
              )}
            />
          </Grid>
          <Grid sx={{ p: 1, pt: 1, pb: 1 }} container size={2.5}>
            <Controller
              name="category"
              control={CategoryControl}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Escalão"
                  fullWidth
                  required={createCategories}
                  disabled={!createCategories}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
          </Grid>
          <Grid sx={{ p: 1, pt: 1, pb: 1 }} container size={1.5}>
            <Controller
              name="min_age"
              control={CategoryControl}
              render={({ field }) => (
                <TextField
                  color="warning"
                  type="number"
                  variant={"outlined"}
                  label="Idade Min."
                  fullWidth
                  required={createCategories}
                  disabled={!createCategories}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
          </Grid>
          <Grid sx={{ p: 1, pt: 1, pb: 1 }} container size={1.5}>
            <Controller
              name="max_age"
              control={CategoryControl}
              render={({ field }) => (
                <TextField
                  color="warning"
                  type="number"
                  variant={"outlined"}
                  label="Idade Máx."
                  fullWidth
                  required={createCategories}
                  disabled={!createCategories}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
          </Grid>
          <Grid sx={{ p: 1, pt: 1, pb: 1 }} container size={1.5}>
            <Controller
              name="min_grad"
              control={CategoryControl}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Grad. Min."
                  select
                  fullWidth
                  multiline
                  disabled={!createCategories}
                  maxRows={8}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!CategoryControlErrors.min_grad}
                  helperText={CategoryControlErrors.min_grad?.message}
                >
                  {GraduationsOptions.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid sx={{ p: 1, pt: 1, pb: 1 }} container size={1.5}>
            <Controller
              name="max_grad"
              control={CategoryControl}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Grad. Máx."
                  select
                  fullWidth
                  multiline
                  disabled={!createCategories}
                  maxRows={8}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!CategoryControlErrors.max_grad}
                  helperText={CategoryControlErrors.max_grad?.message}
                >
                  {GraduationsOptions.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid sx={{ p: 1, pt: 1, pb: 1 }} container size={1.5}>
            <Controller
              name="gender"
              control={CategoryControl}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Género"
                  select
                  fullWidth
                  multiline
                  required={createCategories}
                  disabled={!createCategories}
                  maxRows={8}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!CategoryControlErrors.gender}
                  helperText={CategoryControlErrors.gender?.message}
                >
                  {GenderOptions.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid sx={{ p: 1, pt: 1, pb: 1 }} container size={1.5}>
            <Controller
              name="match_type"
              control={CategoryControl}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Partida"
                  select
                  fullWidth
                  multiline
                  required={createCategories}
                  disabled={!createCategories}
                  maxRows={8}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!CategoryControlErrors.match_type}
                  helperText={CategoryControlErrors.match_type?.message}
                >
                  {MatchTypeOptions.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid sx={{ p: 1, pt: 1, pb: 1 }} container size={0.5}>
            <Tooltip title="Adicionar">
              <IconButton
                disabled={!createCategories}
                onClick={() => {
                  handleSubmitCategoryControl(onSubmitCategory)();
                }}
              >
                <Add color={createCategories ? "success" : "disabled"}></Add>
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid sx={{ p: 3, pt: 3, pb: 1 }} container size={6}>
            <Controller
              name="has_teams"
              control={eventMetadataControl}
              render={({ field }) => (
                <FormControl
                  component="fieldset"
                  variant="standard"
                  error={!!errors.has_registrations}
                >
                  <FormLabel sx={{ mb: 1 }}>
                    Selecione este campo caso a competição tenha provas de
                    Equipas.
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
                          name="has_teams"
                        />
                      }
                      label="Tem Equipas"
                      sx={{ justifyContent: "left" }}
                    />
                    {field.value && (
                      <FormHelperText
                        variant="filled"
                        sx={{ fontSize: 12, marginLeft: "14px" }}
                      >
                        Isto tornará obrigatório o fornecimento das regras para
                        as Equipas.
                      </FormHelperText>
                    )}
                  </Stack>
                </FormControl>
              )}
            />
          </Grid>
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
      </Grid>
    </>
  );
}
