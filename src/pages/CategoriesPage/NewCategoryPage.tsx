import {
  Grid,
  TextField,
  MenuItem,
  Stack,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Switch,
  Typography,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import FormCard from "../../dashboard/FormCard";
import { Controller, useForm } from "react-hook-form";
import { GenderOptions, GraduationsOptions } from "../../config";
import FormAccordion from "../../dashboard/FormAccordion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoriesHooks } from "../../hooks";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import { Clear } from "@mui/icons-material";
import { callNotiStack } from "../../utils/utils";
import { useSnackbar } from "notistack";

export default function NewCategoryPage() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isAgeExpanded, setIsAgeExpanded] = useState<boolean>(true);
  const [isGradExpanded, setIsGradExpanded] = useState<boolean>(true);
  const [isWeightExpanded, setIsWeightExpanded] = useState<boolean>(false);
  const [isMaxAthletesExpanded, setIsMaxAthletesExpanded] =
    useState<boolean>(false);
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      gender: "",
      has_age: true,
      min_age: "",
      max_age: "",
      has_gard: true,
      min_grad: "",
      max_grad: "",
      has_weight: false,
      // this is a switch, so false is separation and true is limits
      weight_type: false,
      min_weight: undefined,
      max_weight: undefined,
      has_athlete_max: false,
      max_athletes: "",
    },
  });

  const weight_type = watch("weight_type");

  useEffect(() => {
    setValue("min_weight", undefined);
    setValue("max_weight", undefined);
  }, [weight_type, setValue]);

  const createCategory = categoriesHooks.useCreateCategory();

  const onSubmit = (data: any) => {
    const formData = {
      name: data.name,
      gender: data.gender,
      min_age: Number(data.min_age),
      max_age: Number(data.max_age),
      min_grad: data.min_grad === "" ? undefined : data.min_grad,
      max_grad: data.max_grad === "" ? undefined : data.max_grad,
      min_weight: data.min_weight,
      max_weight: data.max_weight,
      max_athletes: data.max_athletes === "" ? undefined : data.max_athletes,
    };

    if (data.gender === "Ambos") {
      const formData1 = {
        ...formData,
        gender: "Masculino",
      };
      const formData2 = {
        ...formData,
        gender: "Feminino",
      };

      createCategory.mutate({ data: formData1 });

      createCategory.mutate(
        { data: formData2 },
        {
          onSuccess: () => {
            callNotiStack(
              enqueueSnackbar,
              "Escalões criado com sucesso!",
              "success",
              5000,
            );
            reset();
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
          onError: () => {
            // reset();
          },
        },
      );
    } else if (data.has_weight && !data.weight_type) {
      const formData1 = {
        ...formData,
        min_weight: data.max_weight,
        max_weight: undefined,
      };
      const formData2 = {
        ...formData,
        min_weight: undefined,
        max_weight: data.max_weight,
      };

      createCategory.mutate({ data: formData1 });

      createCategory.mutate(
        { data: formData2 },
        {
          onSuccess: () => {
            callNotiStack(
              enqueueSnackbar,
              "Escalões criado com sucesso!",
              "success",
              5000,
            );
            reset();
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
          onError: () => {
            // reset();
          },
        },
      );
    } else {
      createCategory.mutate(
        { data: formData },
        {
          onSuccess: () => {
            callNotiStack(
              enqueueSnackbar,
              "Escalão criado com sucesso!",
              "success",
              5000,
            );
            reset();
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
          onError: () => {
            // reset();
          },
        },
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("add_another_cat_button")?.click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <PageInfoCard
        description={
          <>
            Aqui poderá registar um Escalão, que poderá mais tarde ser usado
            para associar às diferentes Modalidades dos seus Eventos
            (competições). <br />
            Estes Escalões serão úties para facilmente mudar pequenos aspetos de
            cada competição quando regras mudam por exemplo. <br /> Sorteios
            também serão gerados de acordo com cada Escalão. <p></p>
            Todos os valores numéricos são <strong>inclusivos</strong>, isto é,
            selecionar 9 anos para a idade mínima de um escalão, irá incluir os
            9 anos para esse escalão.
          </>
        }
        title="Novo Escalão"
      ></PageInfoCard>
      <Grid container>
        <FormCard title="Informações Gerais">
          <Grid container size={12}>
            <Grid sx={{ p: 2 }} size={6}>
              <Controller
                name="name"
                control={control}
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
                name="gender"
                control={control}
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
                    label="Género"
                    fullWidth
                    required
                    select
                    {...field}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              disabled={watch("gender") === ""}
                              onClick={() => setValue("gender", "")}
                              edge="end"
                              aria-label="toggle password visibility"
                            >
                              <Clear
                                color={
                                  watch("gender") === "" ? "disabled" : "error"
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
            <Grid sx={{ p: 3, pt: 1 }} container size={6}>
              <Controller
                name="has_age"
                control={control}
                render={({ field }) => (
                  <FormControl
                    component="fieldset"
                    variant="standard"
                    error={!!errors.has_age}
                  >
                    <FormLabel sx={{ mb: 1 }}>
                      Selecione este campo se este Escalão tiver limites de
                      idades
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
                                setIsAgeExpanded(true);
                              } else {
                                setIsAgeExpanded(false);
                              }
                            }}
                            name="has_age"
                          />
                        }
                        label="Idades"
                        sx={{ justifyContent: "left", marginLeft: 0 }}
                      />
                      {field.value && (
                        <FormHelperText
                          variant="filled"
                          sx={{ fontSize: 12, marginLeft: "14px" }}
                        >
                          Terá de selecionar pelo menos um dos limites, seja ele
                          o inferior ou o superior.
                        </FormHelperText>
                      )}
                    </Stack>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid sx={{ p: 3, pt: 1 }} container size={6}>
              <Controller
                name="has_gard"
                control={control}
                render={({ field }) => (
                  <FormControl
                    component="fieldset"
                    variant="standard"
                    error={!!errors.has_age}
                  >
                    <FormLabel sx={{ mb: 1 }}>
                      Selecione este campo se este Escalão tiver limites de
                      graduações
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
                                setIsGradExpanded(true);
                              } else {
                                setIsGradExpanded(false);
                              }
                            }}
                            name="has_grad"
                          />
                        }
                        label="Graduações"
                        sx={{ justifyContent: "left", marginLeft: 0 }}
                      />
                      {field.value && (
                        <FormHelperText
                          variant="filled"
                          sx={{ fontSize: 12, marginLeft: "14px" }}
                        >
                          Terá de selecionar pelo menos um dos limites, seja ele
                          o inferior ou o superior.
                        </FormHelperText>
                      )}
                    </Stack>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid sx={{ p: 3, pt: 1 }} container size={6}>
              <Controller
                name="has_weight"
                control={control}
                render={({ field }) => (
                  <FormControl
                    component="fieldset"
                    variant="standard"
                    error={!!errors.has_age}
                  >
                    <FormLabel sx={{ mb: 1 }}>
                      Selecione este campo se este Escalão tiver limites de
                      pesos
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
                                setIsWeightExpanded(true);
                              } else {
                                setIsWeightExpanded(false);
                              }
                            }}
                            name="has_weight"
                          />
                        }
                        label="Pesos"
                        sx={{ justifyContent: "left", marginLeft: 0 }}
                      />
                      {field.value && (
                        <FormHelperText
                          variant="filled"
                          sx={{ fontSize: 12, marginLeft: "14px" }}
                        >
                          Terá de selecionar ou um limite de separação, ou
                          limites inferiores e inferiores
                        </FormHelperText>
                      )}
                    </Stack>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid sx={{ p: 3, pt: 1 }} container size={6}>
              <Controller
                name="has_athlete_max"
                control={control}
                render={({ field }) => (
                  <FormControl
                    component="fieldset"
                    variant="standard"
                    error={!!errors.has_age}
                  >
                    <FormLabel sx={{ mb: 1 }}>
                      Selecione este campo se este Escalão for fazer parte de
                      Equipas, de forma a ter um limite de Atletas
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
                                setIsMaxAthletesExpanded(true);
                              } else {
                                setIsMaxAthletesExpanded(false);
                              }
                            }}
                            name="has_athlete_max"
                          />
                        }
                        label="Limite Máximo de Atletas"
                        sx={{ justifyContent: "left", marginLeft: 0 }}
                      />
                    </Stack>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </FormCard>
        <FormAccordion
          title="Seleção de idades"
          expanded={isAgeExpanded}
          tooltipMessage='Apenas poderá abrir esta secção se tiver selecionado "Idades".'
          size="split"
        >
          <Grid sx={{ p: 2, py: 1 }} size={6}>
            <Controller
              name="min_age"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  type="number"
                  variant={"outlined"}
                  label="Idade Mínima."
                  fullWidth
                  required={isAgeExpanded}
                  disabled={!isAgeExpanded}
                  {...field}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("min_age") === ""}
                            onClick={() => setValue("min_age", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("min_age") === "" ? "disabled" : "error"
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
                />
              )}
            />
          </Grid>
          <Grid sx={{ p: 2, py: 1 }} size={6}>
            <Controller
              name="max_age"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  type="number"
                  variant={"outlined"}
                  label="Idade Máxima"
                  fullWidth
                  required={isAgeExpanded}
                  disabled={!isAgeExpanded}
                  {...field}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("max_age") === ""}
                            onClick={() => setValue("max_age", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("max_age") === "" ? "disabled" : "error"
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
                />
              )}
            />
          </Grid>
        </FormAccordion>
        <FormAccordion
          title="Seleção de Graduações"
          expanded={isGradExpanded}
          tooltipMessage='Apenas poderá abrir esta secção se tiver selecionado "Graduações".'
          size="split"
        >
          <Grid sx={{ p: 2, py: 1 }} size={6}>
            <Controller
              name="min_grad"
              control={control}
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
                  label="Graduação Mínima"
                  select
                  fullWidth
                  required={isGradExpanded}
                  disabled={!isGradExpanded}
                  {...field}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("min_grad") === ""}
                            onClick={() => setValue("min_grad", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("min_grad") === "" ? "disabled" : "error"
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
                  error={!!errors.min_grad}
                  helperText={errors.min_grad?.message}
                >
                  <MenuItem sx={{ color: "lightgrey" }} value="">
                    -- Selecionar --
                  </MenuItem>
                  {GraduationsOptions.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid sx={{ p: 2, py: 1 }} container size={6}>
            <Controller
              name="max_grad"
              control={control}
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
                  label="Graduação Máxima"
                  select
                  fullWidth
                  required={isGradExpanded}
                  disabled={!isGradExpanded}
                  {...field}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("max_grad") === ""}
                            onClick={() => setValue("max_grad", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("max_grad") === "" ? "disabled" : "error"
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
                  error={!!errors.max_grad}
                  helperText={errors.max_grad?.message}
                >
                  <MenuItem sx={{ color: "lightgrey" }} value="">
                    -- Selecionar --
                  </MenuItem>
                  {GraduationsOptions.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        </FormAccordion>
        <FormAccordion
          title="Seleção de Pesos"
          expanded={isWeightExpanded}
          tooltipMessage='Apenas poderá abrir esta secção se tiver selecionado "Graduações".'
          size="split"
        >
          <Grid sx={{ p: 3, pt: 1 }} container size={6}>
            <Controller
              name="weight_type"
              control={control}
              render={({ field }) => (
                <FormControl
                  component="fieldset"
                  variant="standard"
                  error={!!errors.has_age}
                >
                  <FormLabel sx={{ mb: 1 }}>
                    Selecione "Seperação" se quer dividir os Atletas por um
                    certo peso. Selecione "Limites" se quer incluir dentro de um
                    intervalo de pesos
                  </FormLabel>
                  <Stack spacing={1} direction="row" alignItems="center">
                    <Typography>Separação</Typography>
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
                          name="has_weight"
                        />
                      }
                      label=""
                      sx={{ justifyContent: "left", marginLeft: 0 }}
                    />
                    <Typography sx={{ pl: 1 }}>Limites</Typography>
                  </Stack>
                </FormControl>
              )}
            />
          </Grid>
          {weight_type ? (
            <>
              <Grid sx={{ p: 2, py: 1 }} size={3}>
                <Controller
                  name="min_weight"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      color="warning"
                      type="number"
                      variant={"outlined"}
                      label="Peso Min."
                      fullWidth
                      required={isAgeExpanded}
                      disabled={!isAgeExpanded}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid sx={{ p: 2, py: 1 }} size={3}>
                <Controller
                  name="max_weight"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      color="warning"
                      type="number"
                      variant={"outlined"}
                      label="Peso Máx."
                      fullWidth
                      required={isAgeExpanded}
                      disabled={!isAgeExpanded}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  )}
                />
              </Grid>
            </>
          ) : (
            <Grid sx={{ p: 2, py: 2 }} size={3}>
              <Controller
                name="max_weight"
                control={control}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    type="number"
                    variant={"outlined"}
                    label="Peso"
                    fullWidth
                    required={isAgeExpanded}
                    disabled={!isAgeExpanded}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                )}
              />
            </Grid>
          )}
        </FormAccordion>
        <FormAccordion
          title="Seleção de Número Máximo de Atletas"
          expanded={isMaxAthletesExpanded}
          tooltipMessage='Apenas poderá abrir esta secção se tiver selecionado "Graduações".'
          size="split"
        >
          <Grid sx={{ p: 2, py: 1 }} size={3}>
            <Controller
              name="max_athletes"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  type="number"
                  variant={"outlined"}
                  label="Número Máximo"
                  required={isMaxAthletesExpanded}
                  disabled={!isMaxAthletesExpanded}
                  {...field}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("max_athletes") === ""}
                            onClick={() => setValue("max_athletes", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("max_athletes") === ""
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
                />
              )}
            />
          </Grid>
        </FormAccordion>
        <Grid
          m={4}
          mr={6}
          mb={0}
          justifyContent="flex-end"
          spacing={2}
          container
          size={12}
        >
          <Button
            id="add_another_cat_button"
            variant="contained"
            size={"large"}
            color={"success"}
            type={"submit"}
            onClick={() => {
              handleSubmit(onSubmit)();
              setValue("min_age", "");
              setValue("max_age", "");
            }}
          >
            Submeter e Adicionar Outro
          </Button>
          <Button
            variant="contained"
            size={"large"}
            color={"success"}
            type={"submit"}
            onClick={() => {
              handleSubmit(onSubmit)();
              navigate("/categories/");
            }}
          >
            Submeter e Voltar
          </Button>
          <Button
            variant="outlined"
            size={"small"}
            type={"submit"}
            onClick={() => {
              navigate("/categories/");
            }}
          >
            Voltar
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
