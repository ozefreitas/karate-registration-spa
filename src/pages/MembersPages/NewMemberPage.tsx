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
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  GraduationsOptions,
  GenderOptions,
  ReasonOptions,
  MemberTypes,
} from "../../config";
import { useSnackbar } from "notistack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useAuth } from "../../access/GlobalAuthProvider";
import FormCard from "../../dashboard/FormCard";
import { membersHooks, adminHooks } from "../../hooks";
import FormAccordion from "../../dashboard/FormAccordion";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import { Clear } from "@mui/icons-material";

export default function NewMemberPage() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userRole = user?.role;
  const [loading, setLoading] = useState<boolean>(false);

  const { data: clubUserData } = adminHooks.useFetchClubUsersData(
    undefined,
    userRole,
  );

  const handleSuccess = (mode: any) => {
    setLoading(false);
    if (mode === "redirect") {
      navigate("/members/");
    } else {
      reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleError = (data: any) => {
    setLoading(false);
    if (data.response?.data.incompatible_member) {
      setError("member_type", {
        message: data.response?.data.incompatible_member[0],
      });
    } else if (data.response?.data.impossible_gender) {
      setError("gender", {
        message: data.response?.data.impossible_gender[0],
      });
    } else if (data.response?.data.impossible_age) {
      setError("birth_date", {
        message: data.response?.data.impossible_age[0],
      });
    }

    const errorData = data.response?.data || {};

    type Fields =
      | "first_name"
      | "last_name"
      | "graduation"
      | "birth_date"
      | "gender"
      | "club"
      | "id_number"
      | "registration_date"
      | "post_code"
      | "national_card_number"
      | "taxpayer_number"
      | "address";

    const fields: Fields[] = [
      "first_name",
      "last_name",
      "graduation",
      "birth_date",
      "gender",
      "club",
      "id_number",
      "registration_date",
      "post_code",
      "national_card_number",
      "taxpayer_number",
      "address",
    ];

    fields.forEach((field) => {
      if (errorData[field]?.[0]) {
        setError(field, { message: errorData[field][0] });
      }
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const modeRef = useRef<"redirect" | "scroll">("redirect");

  const createMember = membersHooks.useCreateMember({
    onSuccess: () => handleSuccess(modeRef.current),
    onError: (data: any) => handleError(data),
  });

  const {
    control,
    handleSubmit,
    setError,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      graduation: "",
      gender: "",
      force_ident: false,
      national_card_number: "",
      taxpayer_number: "",
      force_registration_date: false,
      id_number: "",
      birth_date: undefined,
      weight: "",
      post_code: "",
      address: "",
      registration_date: undefined,
      member_type: [""],
      reason: "",
      club: "",
    },
  });

  const is_force_ident = watch("force_ident");
  const is_force_registration_date = watch("force_registration_date");

  const onSubmit = async (data: any, mode: "redirect" | "scroll") => {
    if (data.member_type.length <= 1 && userRole !== "main_admin") {
      enqueueSnackbar("Tem de selecionar um Tipo de Praticante!", {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      return;
    }
    modeRef.current = mode;
    setLoading(true);

    const formData = {
      first_name: data.first_name,
      last_name: data.last_name,
      graduation: data.graduation,
      id_number: data.id_number,
      gender: data.gender,
      member_type: data.member_type,
      birth_date: data.birth_date,
      registration_date: data.registration_date,
      weight: data.weight,
      club: data.club,
      national_card_number: data.national_card_number,
      taxpayer_number: data.taxpayer_number,
      post_code: data.post_code,
      address: data.address,
    };

    (["national_card_number", "post_code", "taxpayer_number"] as const).forEach(
      (key) => {
        if (data[key] === "") {
          formData[key] = null;
        }
      },
    );

    if (data.weight === "") formData.weight = null;
    if (data.force_ident) formData.id_number = 0;
    if (data.force_registration_date) formData.registration_date = undefined;
    if (userRole === "main_admin") {
      // main admins dont need to send a member type (membership defaults to student)
      createMember.mutate(formData);
    } else {
      const member_types = data.member_type.filter(
        (item: string) => item !== "",
      );
      const payload = { ...formData, member_type: member_types };

      createMember.mutate(payload);
    }
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
            provas realizadas em 2024.
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
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("first_name") === ""}
                            onClick={() => setValue("first_name", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("first_name") === ""
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
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("last_name") === ""}
                            onClick={() => setValue("last_name", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("last_name") === "" ? "disabled" : "error"
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
                  label="Graduação"
                  select
                  fullWidth
                  required
                  {...field}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("graduation") === ""}
                            onClick={() => setValue("graduation", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("graduation") === ""
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
              name="birth_date"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                      field: {
                        clearable: true,
                      },
                      textField: {
                        fullWidth: true,
                        error: !!errors?.birth_date,
                        helperText: errors?.birth_date?.message || "",
                      },
                    }}
                    slots={{ textField: TextField }}
                  />
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
                  select
                  fullWidth
                  required
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
                  error={!!errors.gender}
                  helperText={errors.gender?.message}
                >
                  <MenuItem sx={{ color: "lightgrey" }} value="">
                    -- Selecionar --
                  </MenuItem>
                  {GenderOptions.filter((item) =>
                    ["Masculino", "Feminino"].includes(item.value),
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
                          sx={{ ml: 2 }}
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
          <Grid sx={{ p: 2, pt: 3 }} container size={6}>
            <Controller
              name="id_number"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label={`Nº ${import.meta.env.VITE_DISPLAY_BUTTON_SIGLA}`}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("id_number") === ""}
                            onClick={() => setValue("id_number", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("id_number") === "" ? "disabled" : "error"
                              }
                            ></Clear>
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                    htmlInput: { inputMode: "numeric", pattern: "[0-9]*" },
                  }}
                  fullWidth
                  disabled={is_force_ident}
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
          <Grid sx={{ p: 3, pt: 1 }} container size={6}>
            <Controller
              name="force_registration_date"
              control={control}
              render={({ field }) => (
                <FormControl component="fieldset" variant="standard">
                  <FormLabel sx={{ mb: 2 }}>
                    Insira a data em que o registo deste membro foi efetivado.
                    Caso esteja a data seja a atual, ligue o botão abaixo.
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
                          name="force_registration_date"
                        />
                      }
                      label="Data de registo é a atual"
                      sx={{ justifyContent: "left" }}
                    />
                    {!!errors.force_registration_date && (
                      <FormHelperText error sx={{ marginLeft: "14px" }}>
                        {errors.force_registration_date?.message}
                      </FormHelperText>
                    )}
                  </Stack>
                </FormControl>
              )}
            />
          </Grid>
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="registration_date"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disabled={is_force_registration_date}
                    {...field}
                    format="YYYY-MM-DD"
                    label="Data de Registo em Clube"
                    onChange={(date) => {
                      field.onChange(date ? date.format("YYYY-MM-DD") : "");
                    }}
                    value={field.value ? dayjs(field.value) : null}
                    enableAccessibleFieldDOMStructure={false}
                    slotProps={{
                      field: {
                        clearable: true,
                      },
                      textField: {
                        fullWidth: true,
                        error: !!errors?.registration_date,
                        helperText: errors?.registration_date?.message || "",
                      },
                    }}
                    slots={{ textField: TextField }}
                  />
                </LocalizationProvider>
              )}
            />
          </Grid>
        </FormCard>
        <FormAccordion expanded={undefined} title="Dados Opcionais">
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="national_card_number"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  type="number"
                  label="Nª C.C./B.I."
                  fullWidth
                  {...field}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("national_card_number") === ""}
                            onClick={() => setValue("national_card_number", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("national_card_number") === ""
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
                  error={!!errors.national_card_number}
                  helperText={errors.national_card_number?.message}
                />
              )}
            />
          </Grid>
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="taxpayer_number"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  type="number"
                  label="NIF"
                  fullWidth
                  {...field}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("taxpayer_number") === ""}
                            onClick={() => setValue("taxpayer_number", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("taxpayer_number") === ""
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
                  error={!!errors.taxpayer_number}
                  helperText={errors.taxpayer_number?.message}
                />
              )}
            />
          </Grid>
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Morada"
                  fullWidth
                  {...field}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("address") === ""}
                            onClick={() => setValue("address", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("address") === "" ? "disabled" : "error"
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
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              )}
            />
          </Grid>
          <Grid sx={{ p: 2 }} size={6}>
            <Controller
              name="post_code"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  type="number"
                  label="Código Postal"
                  fullWidth
                  {...field}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("post_code") === ""}
                            onClick={() => setValue("post_code", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("post_code") === "" ? "disabled" : "error"
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
                  error={!!errors.post_code}
                  helperText={errors.post_code?.message}
                />
              )}
            />
          </Grid>
        </FormAccordion>
        {userRole === "main_admin" ? null : (
          <FormCard title="Tipo de Praticante">
            <Grid sx={{ p: 3, pt: 1 }} container size={6}>
              <Controller
                name="member_type"
                control={control}
                defaultValue={[]}
                render={({ field }) => {
                  const { value = [], onChange } = field;

                  const handleToggle = (optionValue: string) => {
                    let newValue = [...value];

                    // If already selected → remove it
                    if (newValue.includes(optionValue)) {
                      newValue = newValue.filter((v) => v !== optionValue);
                    } else {
                      // Otherwise, add it — but handle "student" vs "member" exclusivity
                      if (optionValue === "student") {
                        newValue = newValue.filter((v) => v !== "athlete");
                      } else if (optionValue === "athlete") {
                        newValue = newValue.filter((v) => v !== "student");
                      }
                      newValue.push(optionValue);
                    }

                    onChange(newValue);
                  };

                  return (
                    <FormControl component="fieldset" variant="standard">
                      <FormLabel sx={{ mb: 2 }}>
                        Escolha pelo menos um tipo de membro. Não pode ser aluno
                        e competidor em simultâneo .
                      </FormLabel>
                      <Stack spacing={1}>
                        {MemberTypes.map((type) => (
                          <FormControlLabel
                            key={type.value}
                            labelPlacement="start"
                            control={
                              <Checkbox
                                checked={value.includes(type.value)}
                                onChange={() => handleToggle(type.value)}
                              />
                            }
                            label={type.label}
                            sx={{ justifyContent: "left", marginLeft: 0 }}
                          />
                        ))}

                        {!!errors.member_type && (
                          <FormHelperText error sx={{ marginLeft: "14px" }}>
                            {errors.member_type?.message}
                          </FormHelperText>
                        )}
                      </Stack>
                    </FormControl>
                  );
                }}
              />
            </Grid>
            <Grid sx={{ p: 3 }} size={6}>
              <Controller
                name="reason"
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
                    label="Razão da Prática"
                    select
                    fullWidth
                    disabled={!watch("member_type").includes("student")}
                    {...field}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              disabled={watch("reason") === ""}
                              onClick={() => setValue("reason", "")}
                              edge="end"
                              aria-label="toggle password visibility"
                            >
                              <Clear
                                color={
                                  watch("reason") === "" ? "disabled" : "error"
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
        )}
        {userRole === "subed_club" ? (
          <FormAccordion
            title="Competições"
            expanded={watch("member_type").includes("athlete")}
            tooltipMessage="Apenas poderá abrir esta secção, se este Membro for do tipo Competidor."
          >
            <Grid sx={{ p: 2 }} size={6}>
              <Controller
                name="weight"
                control={control}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    variant={"outlined"}
                    type="number"
                    label="Peso"
                    required
                    slotProps={{
                      input: {
                        inputProps: {
                          min: 0,
                          max: 100,
                        },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              disabled={watch("weight") === ""}
                              onClick={() => setValue("weight", "")}
                              edge="end"
                              aria-label="toggle password visibility"
                            >
                              <Clear
                                color={
                                  watch("weight") === "" ? "disabled" : "error"
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
                    error={!!errors.weight}
                    helperText={errors.weight?.message}
                  ></TextField>
                )}
              />
            </Grid>
          </FormAccordion>
        ) : userRole === "main_admin" ? (
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
                    required
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!errors.club}
                    helperText={errors.club?.message}
                  >
                    <MenuItem sx={{ color: "lightgrey" }} value="0">
                      -- Selecionar --
                    </MenuItem>
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
          m={3}
          mr={6}
          mb={0}
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
