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
} from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { GraduationsOptions, GenderOptions, ReasonOptions } from "../../config";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import FormCard from "../../dashboard/FormCard";
import { membersHooks, adminHooks } from "../../hooks";

export default function NewAthletePage() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<boolean>(true);

  const { data: dojoUserData } = adminHooks.useFetchClubUsersData();
  const createAthlete = membersHooks.useCreateMember();

  const {
    control,
    handleSubmit,
    setError,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      graduation: "",
      category: "",
      gender: "",
      force_ident: false,
      id_number: "",
      birth_date: undefined,
      // weight: "",
      competitor: false,
      reason: "",
      dojo: "",
    },
  });

  const is_force_ident = getValues("force_ident");

  const onSubmit = async (data: any, mode: "redirect" | "scroll") => {
    const formData = {
      first_name: data.first_name,
      last_name: data.last_name,
      graduation: data.graduation,
      category: data.category,
      id_number: data.id_number,
      gender: data.gender,
      competitor: data.competitor,
      birth_date: data.birth_date,
      // weight: data.weight,
      dojo: data.dojo,
    };

    if (!data.is_force_ident) {
      formData.id_number = 0;
    }

    createAthlete.mutate(formData, {
      onSuccess: () => {
        if (mode === "redirect") {
          navigate("/athletes/");
        } else {
          reset();
          setExpanded(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      },
      onError: (data: any) => {
        if (data.response?.data.incompatible_athlete) {
          setError("competitor", {
            message: data.response?.data.incompatible_athlete[0],
          });
        } else if (data.response?.data.impossible_gender) {
          setError("gender", {
            message: data.response?.data.impossible_gender[0],
          });
        }

        const errorData = data.response?.data || {};

        type Fields =
          | "first_name"
          | "last_name"
          | "graduation"
          | "birth_date"
          | "gender"
          | "dojo";

        const fields: Fields[] = [
          "first_name",
          "last_name",
          "graduation",
          "birth_date",
          "gender",
          "dojo",
        ];

        fields.forEach((field) => {
          if (errorData[field]?.[0]) {
            setError(field, { message: errorData[field][0] });
          }
        });
      },
    });
  };

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
          informação que é obrigatória. Criar um atleta sem número SKIP irá
          incrementar ao maior número que encontrar na base de dados.<p></p>
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
              name="first_name"
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
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message}
                />
              )}
            />
          </Grid>
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="last_name"
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
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
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
          <Grid sx={{ p: 2, pt: 1 }} size={6}>
            <Controller
              name="birth_date"
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
                      enableAccessibleFieldDOMStructure={false}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors?.birth_date,
                          helperText: errors?.birth_date?.message || "",
                        },
                      }}
                      slots={{ textField: TextField }}
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
                  {GenderOptions.filter((item) =>
                    ["Masculino", "Feminino"].includes(item.value)
                  ).map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid size={6}></Grid>
          <Grid sx={{ p: 3, pt: 1 }} container size={6}>
            <Controller
              name="force_ident"
              control={control}
              render={({ field }) => (
                <FormControl component="fieldset" variant="standard">
                  <FormLabel sx={{ mb: 2 }}>
                    Se, por alguma razão, pretende forçar um Nº SKI-P.
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
                          name="force_ident"
                        />
                      }
                      label="Forçar Nº SKI-P"
                      sx={{ justifyContent: "left", marginLeft: 0 }}
                    />
                    {!!errors.competitor && (
                      <FormHelperText error sx={{ marginLeft: "14px" }}>
                        {errors.competitor?.message}
                      </FormHelperText>
                    )}
                  </Stack>
                </FormControl>
              )}
            />
          </Grid>
          <Grid sx={{ p: 2, pt: 3 }} size={6}>
            <Controller
              name="id_number"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label={`Nº ${import.meta.env.VITE_DISPLAY_BUTTON_SIGLA}`}
                  type="text"
                  slotProps={{
                    htmlInput: { inputMode: "numeric", pattern: "[0-9]*" },
                  }}
                  fullWidth
                  disabled={!is_force_ident}
                  multiline
                  maxRows={8}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.id_number}
                  helperText={errors.id_number?.message}
                ></TextField>
              )}
            />
          </Grid>
        </FormCard>
        <FormCard title="Praticante">
          <Grid sx={{ p: 3, pt: 1 }} container size={6}>
            <Controller
              name="competitor"
              control={control}
              render={({ field }) => (
                <FormControl component="fieldset" variant="standard">
                  <FormLabel sx={{ mb: 2 }}>
                    Se pretende inscrever em provas, selecione este campo.
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
                          name="competitor"
                        />
                      }
                      label="É Competidor"
                      sx={{ justifyContent: "left", marginLeft: 0 }}
                    />
                    {!!errors.competitor && (
                      <FormHelperText error sx={{ marginLeft: "14px" }}>
                        {errors.competitor?.message}
                      </FormHelperText>
                    )}
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
                  disabled={watch("competitor") === true}
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
        {/* <FormAccordion
          title="Competições"
          expanded={expanded}
          tooltipMessage="Apenas poderá abrir esta secção, se este Atleta for participar em competições."
        >
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="weight"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  type="text"
                  label="Peso"
                  multiline
                  required
                  slotProps={{ input: { inputProps: { min: 0, max: 100 } } }}
                  maxRows={8}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.weight}
                  helperText={errors.weight?.message}
                ></TextField>
              )}
            />
          </Grid>
        </FormAccordion> */}
        <FormCard title="Associar Dojo/Associação">
          <Grid size={12} sx={{ p: 2 }}>
            <Controller
              name="dojo"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Dojo"
                  fullWidth
                  select
                  multiline
                  required
                  maxRows={8}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.dojo}
                  helperText={errors.dojo?.message}
                >
                  <MenuItem value="0">-- Selecionar --</MenuItem>
                  {dojoUserData?.data.map((item: any, index: string) => (
                    <MenuItem key={index} value={item.id}>
                      {item.username}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        </FormCard>
        <Grid
          sx={{ m: 3, mr: 4 }}
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
          container
          size={12}
        >
          <Button
            variant="contained"
            size={"large"}
            color={"success"}
            type={"submit"}
            onClick={handleSubmit((data) => onSubmit(data, "redirect"))}
          >
            Submeter e voltar
          </Button>
          <Button
            variant="contained"
            size={"large"}
            color={"success"}
            type={"submit"}
            onClick={handleSubmit((data) => onSubmit(data, "scroll"))}
          >
            Submeter e Adicionar outro
          </Button>
          <Button
            variant="outlined"
            size="medium"
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
