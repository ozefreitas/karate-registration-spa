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
  Checkbox,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  GraduationsOptions,
  GenderOptions,
  ReasonOptions,
  MemberTypes,
} from "../../config";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useAuth } from "../../access/GlobalAuthProvider";
import FormCard from "../../dashboard/FormCard";
import { membersHooks, adminHooks } from "../../hooks";
import FormAccordion from "../../dashboard/FormAccordion";
import PageInfoCard from "../../components/info-cards/PageInfoCard";

export default function NewMemberPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const { data: clubUserData } = adminHooks.useFetchClubUsersData();
  const createAthlete = membersHooks.useCreateMember();

  const {
    control,
    handleSubmit,
    setError,
    reset,
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
      weight: "",
      member_type: [""],
      reason: "",
      club: "",
    },
  });

  const is_force_ident = watch("force_ident");

  const onSubmit = async (data: any, mode: "redirect" | "scroll") => {
    setLoading(true);

    const formData = {
      first_name: data.first_name,
      last_name: data.last_name,
      graduation: data.graduation,
      category: data.category,
      id_number: data.id_number,
      gender: data.gender,
      member_type: data.member_type,
      birth_date: data.birth_date,
      weight: data.weight,
      club: data.club,
    };

    if (data.weight === "") {
      formData.weight = null;
    }

    if (data.force_ident === true) {
      formData.id_number = 0;
    }

    createAthlete.mutate(formData, {
      onSuccess: () => {
        setLoading(false);
        if (mode === "redirect") {
          navigate("/members/");
        } else {
          reset();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      },
      onError: (data: any) => {
        setLoading(false);
        if (data.response?.data.incompatible_athlete) {
          setError("member_type", {
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
          | "club";

        const fields: Fields[] = [
          "first_name",
          "last_name",
          "graduation",
          "birth_date",
          "gender",
          "club",
        ];

        fields.forEach((field) => {
          if (errorData[field]?.[0]) {
            setError(field, { message: errorData[field][0] });
          }
        });
      },
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("add_another_button")?.click();
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
            Aqui poderá registar cada Atleta/Aluno. Todos têm um conjunto de
            informação que é obrigatória. Criar um atleta sem número SKIP irá
            incrementar ao maior número que encontrar na base de dados.<p></p>
            <strong>Importante</strong>: A regras em vigor ditam que a idade
            considerada para determinação de escalão é a idade que uma atleta
            tem no primeiro dia do último ano da presente época. <br /> Por
            exemplo: Um atleta nascido no dia 16 de dezembro de 2010 terá,
            paExemplo: Um atleta nascido a 16 de dezembro de 2010 é considerado
            Cadete na época 2024/2025, pois a idade tida em conta é a que terá a
            1 de janeiro de 2025 (14 anos), mesmo que ainda tenha 13 anos em
            provas realizadas em 2024.
          </>
        }
        title="Novo Atleta"
      ></PageInfoCard>
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
                    Insira o Nº de identificação{" "}
                    {import.meta.env.VITE_DISPLAY_BUTTON_SIGLA}. Caso ainda não
                    tenha um atribuído, ligue o botão abaixo.
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
                          }}
                          name="force_ident"
                        />
                      }
                      label={`Não tem Nº ${
                        import.meta.env.VITE_DISPLAY_BUTTON_SIGLA
                      }`}
                      sx={{ justifyContent: "left", marginLeft: 0 }}
                    />
                    {!!errors.force_ident && (
                      <FormHelperText error sx={{ marginLeft: "14px" }}>
                        {errors.force_ident?.message}
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
                  disabled={is_force_ident}
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
        <FormCard title="Tipo de Praticante">
          <Grid sx={{ p: 3, pt: 1 }} container size={6}>
            <Controller
              name="member_type"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <FormControl component="fieldset" variant="standard">
                  <FormLabel sx={{ mb: 2 }}>
                    Se pretende inscrever em provas, selecione este campo.
                  </FormLabel>

                  <Stack spacing={1}>
                    {MemberTypes.map((opt) => {
                      const selected = field.value?.includes(opt.value);

                      return (
                        <FormControlLabel
                          key={opt.value}
                          labelPlacement="start"
                          control={
                            <Checkbox
                              checked={selected}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  // add to array
                                  field.onChange([
                                    ...(field.value || []),
                                    opt.value,
                                  ]);
                                } else {
                                  // remove from array
                                  field.onChange(
                                    (field.value || []).filter(
                                      (v) => v !== opt.value
                                    )
                                  );
                                }
                              }}
                            />
                          }
                          label={opt.label}
                          sx={{ justifyContent: "left", marginLeft: 0 }}
                        />
                      );
                    })}

                    {!!errors.member_type && (
                      <FormHelperText error sx={{ marginLeft: "14px" }}>
                        {errors.member_type?.message}
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
                  disabled={watch("member_type").includes("student")}
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
        {user?.data.role === "subed_club" ? (
          <FormAccordion
            title="Competições"
            expanded={watch("member_type").includes("athlete")}
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
          </FormAccordion>
        ) : user?.data.role === "main_admin" ? (
          <FormCard
            title="Associar Clube/Associação"
            subheader="Aqui aparecerão todos os Clubes disponíveis na plataforma, quer já tenham criado uma conta ou não."
          >
            <Grid size={12} sx={{ p: 2 }}>
              <Controller
                name="club"
                control={control}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    variant={"outlined"}
                    label="Clube"
                    fullWidth
                    select
                    multiline
                    required
                    maxRows={8}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!errors.club}
                    helperText={errors.club?.message}
                  >
                    <MenuItem value="0">-- Selecionar --</MenuItem>
                    {clubUserData?.data.map((item: any, index: string) => (
                      <MenuItem key={index} value={item.id}>
                        {item.username}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
          </FormCard>
        ) : null}
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
            loading={loading}
            loadingPosition="start"
            onClick={handleSubmit((data) => onSubmit(data, "redirect"))}
          >
            Submeter e voltar
          </Button>
          <Button
            id="add_another_button"
            variant="contained"
            size={"large"}
            color={"success"}
            type={"submit"}
            loading={loading}
            loadingPosition="start"
            onClick={handleSubmit((data) => onSubmit(data, "scroll"))}
          >
            Submeter e Adicionar outro
          </Button>
          <Button
            variant="outlined"
            size="medium"
            onClick={() => {
              navigate("/members/");
            }}
          >
            Voltar
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
