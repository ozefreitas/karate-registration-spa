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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  GraduationsOptions,
  GenderOptions,
  CategoryOptions,
  WeightOptions,
  ReasonOptions,
} from "../../config";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import FormCard from "../../dashboard/FormCard";
import FormAccordion from "../../dashboard/FormAccordion";
import { useCreateAthlete } from "../../hooks/useAthletesData";

export default function NewAthletePage() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<boolean>(false);

  const createAthlete = useCreateAthlete();

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      graduation: "",
      category: "",
      skip_number: "",
      kata: false,
      kumite: false,
      gender: "",
      is_student: false,
      birthDate: undefined,
      weight: "",
      student: false,
      reason: "",
    },
  });

  const onSubmit = async (data: any) => {
    const formData = {
      first_name: data.firstName,
      last_name: data.lastName,
      graduation: data.graduation,
      category: data.category,
      skip_number: data.skip_number,
      gender: data.gender,
      is_student: data.is_student,
      birth_date: data.birthDate,
      match_type: "",
      weight: data.weight,
    };

    if (data.kumite) {
      formData.match_type = "kumite";
      createAthlete.mutate(formData, { onSuccess: () => {} });
    } else if (data.kata) {
      formData.match_type = "kata";
      formData.weight = "";
      createAthlete.mutate(formData, { onSuccess: () => {} });
    } else {
      setError("kata", {
        type: "manual",
        message: "Selecione pelo menos uma opção.",
      });
      setError("kumite", {
        type: "manual",
        message: "Selecione pelo menos uma opção.",
      });
    }
  };

  type WeightCategory = keyof typeof WeightOptions;
  const [currentCategory, setCurrentCategory] = useState<WeightCategory | null>(
    null
  );

  const handleChange = (e: any) => {
    const value = e.target.value;
    if (isWeightCategory(value)) {
      setCurrentCategory(value);
    } else {
      setCurrentCategory(null);
    }
  };

  const isWeightCategory = (value: string): value is WeightCategory => {
    return [
      "Juvenil",
      "Cadete",
      "Júnior",
      "Sénior",
      "Veterano +35",
      "Veterano +50",
    ].includes(value);
  };

  const kumite = useWatch({
    control,
    name: "kumite",
  });

  const isEnabled = currentCategory !== null && kumite === true;

  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página de criação de Atletas"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá registar cada Atleta/Aluno. Todos têm um conjunto de
          informação que é obrigatória.<p></p>
          <strong>Importante</strong>: A regras em vigor ditam que a idade
          considerada para determinação de escalão é a idade que uma atleta tem
          no primeiro dia do último ano da presente época. <br /> Por exemplo:
          Um atleta nascido no dia 16 de dezembro de 2010 terá, para todas as
          provas da época 2024/2025, 14 anos, independentemente da idade a que
          se apresentar a dada prova. Isto é, havendo uma prova no dia 02 de
          novembro de 2024, o atleta terá na realidade 13 anos e por isso seria
          Juvenil, no entanto, essa não é a idade tida em conta, mas sim a do
          dia 1 de janeiro de 2025, onde terá 14 anos e será Cadete.
        </CardContent>
      </Card>
      <Grid container>
        <FormCard title="Dados Pessoais">
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Primeiro Nome"
                  fullWidth
                  required
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />
          </Grid>
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Último Nome"
                  fullWidth
                  required
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />
          </Grid>
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="graduation"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Graduação"
                  select
                  fullWidth
                  multiline
                  required
                  maxRows={8}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.graduation}
                  helperText={errors.graduation?.message}
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
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="skip_number"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Nº ASKIP"
                  type="text"
                  slotProps={{
                    htmlInput: { inputMode: "numeric", pattern: "[0-9]*" },
                  }}
                  fullWidth
                  multiline
                  maxRows={8}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.skip_number}
                  helperText={errors.skip_number?.message}
                ></TextField>
              )}
            />
          </Grid>
          <Grid sx={{ p: 2, pt: 1 }} size={6}>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      {...field}
                      format="YYYY-MM-DD"
                      label="Data de Nascimento *"
                      onChange={(date) => {
                        field.onChange(date ? date.format("YYYY-MM-DD") : "");
                      }}
                      value={field.value ? dayjs(field.value) : null}
                      slotProps={{
                        textField: {
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
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Género"
                  select
                  fullWidth
                  multiline
                  required
                  maxRows={8}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.gender}
                  helperText={errors.gender?.message}
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
        </FormCard>
        <FormCard title="Praticante">
          <Grid sx={{ p: 3, pt: 1 }} container size={6}>
            <Controller
              name="student"
              control={control}
              render={({ field }) => (
                <FormControl component="fieldset" variant="standard">
                  <FormLabel sx={{ mb: 2 }}>
                    Se não pretende inscrever em provas, selecione este campo.
                  </FormLabel>
                  <Stack spacing={1}>
                    <FormControlLabel
                      labelPlacement="start"
                      control={
                        <Switch
                          {...field}
                          checked={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                            setExpanded((prev) => !prev);
                          }}
                          name="student"
                        />
                      }
                      label="É Aluno"
                      sx={{ justifyContent: "left", marginLeft: 0 }}
                    />
                  </Stack>
                </FormControl>
              )}
            />
          </Grid>
          <Grid sx={{ p: 3 }} size={6}>
            <Controller
              name="reason"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Razão da Prática"
                  select
                  fullWidth
                  multiline
                  maxRows={8}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                >
                  <MenuItem value="None">Prefere não dizer</MenuItem>
                  {ReasonOptions.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        </FormCard>
        <FormAccordion
          title="Competições"
          expanded={expanded}
          setExpanded={setExpanded}
          tooltipMessage="Apenas poderá abrir esta secção, se este Atleta for participar em competições."
        >
          <Grid sx={{ p: 3 }} container justifyContent="center" size={3}>
            <Controller
              name="kata"
              control={control}
              render={({ field }) => (
                <FormControl
                  component="fieldset"
                  variant="standard"
                  error={!!errors.kata}
                >
                  <Stack spacing={1}>
                    <FormControlLabel
                      labelPlacement="start"
                      control={
                        <Switch
                          {...field}
                          checked={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                            // handleKataChecked(e);
                          }}
                          name="kata"
                        />
                      }
                      label="Kata"
                      sx={{ justifyContent: "center", marginLeft: 0 }}
                    />
                    {!!errors.kata && (
                      <FormHelperText error sx={{ marginLeft: "14px" }}>
                        {errors.kata.message}
                      </FormHelperText>
                    )}
                  </Stack>
                </FormControl>
              )}
            />
          </Grid>
          <Grid sx={{ p: 3 }} size={9}>
            <Controller
              name="kumite"
              control={control}
              render={({ field }) => (
                <FormControl component="fieldset" variant="standard">
                  {/* <FormLabel component="legend">
                    Whether to make this document available for RAG pipelines
                    and information extraction.
                  </FormLabel> */}
                  <Stack spacing={1}>
                    <FormControlLabel
                      labelPlacement="start"
                      control={
                        <Switch
                          {...field}
                          checked={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                            // handleKumiteChecked(e);
                          }}
                          name="kumite"
                        />
                      }
                      label="Kumite"
                      sx={{ justifyContent: "center", marginLeft: 0 }}
                    />
                    {!!errors.kumite && (
                      <FormHelperText error sx={{ marginLeft: "14px" }}>
                        {errors.kumite.message}
                      </FormHelperText>
                    )}
                  </Stack>
                </FormControl>
              )}
            />
          </Grid>
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Escalão"
                  fullWidth
                  select
                  multiline
                  required
                  maxRows={8}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange(e);
                  }}
                  error={!!errors.category}
                  helperText={errors.category?.message}
                >
                  {CategoryOptions.map((item, index) => (
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
              name="weight"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Peso"
                  fullWidth
                  select
                  multiline
                  disabled={!isEnabled}
                  required
                  maxRows={8}
                  helperText="Só poderá escolher um peso se selecionar Kumite."
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.weight}
                >
                  <MenuItem value="None">-- Não Definido --</MenuItem>
                  {currentCategory
                    ? WeightOptions[currentCategory].map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))
                    : null}
                </TextField>
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
              navigate("/athletes/");
            }}
          >
            Submeter e voltar
          </Button>
          <Button
            variant="contained"
            size={"large"}
            color={"success"}
            type={"submit"}
            sx={{ marginBottom: "20px" }}
            onClick={() => {
              handleSubmit(onSubmit)();
              reset();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Submeter e Adicionar outro
          </Button>
          <Button
            variant="contained"
            size={"large"}
            color={"success"}
            type={"submit"}
            sx={{ marginBottom: "20px" }}
            onClick={() => {
              navigate("/athletes/");
            }}
          >
            Voltar
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
