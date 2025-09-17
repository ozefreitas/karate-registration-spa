import {
  Card,
  CardHeader,
  CardContent,
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
} from "@mui/material";
import FormCard from "../../dashboard/FormCard";
import { Controller, useForm } from "react-hook-form";
import { GenderOptions, GraduationsOptions } from "../../config";
import FormAccordion from "../../dashboard/FormAccordion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoriesHooks } from "../../hooks";

export default function NewCategoryPage() {
  const navigate = useNavigate();
  const [isAgeExpanded, setIsAgeExpanded] = useState<boolean>(true);
  const [isGradExpanded, setIsGradExpanded] = useState<boolean>(true);
  const [isWeightExpanded, setIsWeightExpanded] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    setError,
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
    },
  });

  const weight_type = watch("weight_type");

  useEffect(() => {
    setValue("min_weight", undefined);
    setValue("max_weight", undefined);
  }, [weight_type]);

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
            reset();
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
          onError: () => {
            // reset();
          },
        }
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
            reset();
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
          onError: () => {
            // reset();
          },
        }
      );
    } else {
      createCategory.mutate(
        { data: formData },
        {
          onSuccess: () => {
            reset();
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
          onError: () => {
            // reset();
          },
        }
      );
    }
  };

  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página de criação de Escalões"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá registar um Escalão, que poderá mais tarde ser usado para
          associar às diferentes Modalidades dos seus Eventos (competições).{" "}
          <br />
          Estes Escalões serão úties para facilmente mudar pequenos aspetos de
          cada competição quando regras mudam por exemplo. <br /> Sorteios
          também serão gerados de acordo com cada Escalão. <p></p>
          Todos os valores numéricos são <strong>inclusivos</strong>, isto é,
          selecionar 9 anos para a idade mínima de um escalão, irá incluir os 9
          anos para esse escalão.
        </CardContent>
      </Card>
      <Grid>
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
                    color="warning"
                    variant={"outlined"}
                    label="Género"
                    fullWidth
                    required
                    select
                    {...field}
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
                      Selecione este campo se esta categoria tiver limites de
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
                      Selecione este campo se esta categoria tiver limites de
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
                      Selecione este campo se esta categoria tiver limites de
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
          </Grid>
        </FormCard>
        <FormAccordion
          title="Seleção de idades"
          expanded={isAgeExpanded}
          tooltipMessage='Apenas poderá abrir esta secção se tiver selecionado "Idades".'
          size="split"
        >
          <Grid sx={{ p: 1, pt: 1, pb: 1 }} size={6}>
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
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
          </Grid>
          <Grid sx={{ p: 1, pt: 1, pb: 1 }} size={6}>
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
          <Grid sx={{ p: 1, pt: 1, pb: 1 }} size={6}>
            <Controller
              name="min_grad"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Graduação Mínima"
                  select
                  fullWidth
                  multiline
                  required={isGradExpanded}
                  disabled={!isGradExpanded}
                  maxRows={8}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.min_grad}
                  helperText={errors.min_grad?.message}
                >
                  <MenuItem value="">--Selecionar--</MenuItem>
                  {GraduationsOptions.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid sx={{ p: 1, pt: 1, pb: 1 }} container size={6}>
            <Controller
              name="max_grad"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Graduação Máxima"
                  select
                  fullWidth
                  multiline
                  required={isGradExpanded}
                  disabled={!isGradExpanded}
                  maxRows={8}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.max_grad}
                  helperText={errors.max_grad?.message}
                >
                  <MenuItem value="">--Selecionar--</MenuItem>
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
                    {/* {field.value && (
                        <FormHelperText
                          variant="filled"
                          sx={{ fontSize: 12, marginLeft: "14px" }}
                        >
                          Terá de selecionar ou um limite de separação, ou
                          limites inferiores e inferiores
                        </FormHelperText>
                      )} */}
                  </Stack>
                </FormControl>
              )}
            />
          </Grid>
          {weight_type ? (
            <>
              <Grid sx={{ p: 1, pt: 1, pb: 1 }} size={3}>
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
              <Grid sx={{ p: 1, pt: 1, pb: 1 }} size={3}>
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
            <Grid sx={{ p: 1, pt: 1, pb: 1 }} size={3}>
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
              setValue("min_age", "");
              setValue("max_age", "");
            }}
          >
            Submeter e Adicionar Outra
          </Button>
          <Button
            variant="contained"
            size={"large"}
            color={"success"}
            type={"submit"}
            sx={{ marginBottom: "20px" }}
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
            sx={{ marginBottom: "20px" }}
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
