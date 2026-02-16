import {
  Typography,
  Grid,
  FormControl,
  FormControlLabel,
  TextField,
  Button,
  MenuItem,
  Switch,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import DeleteMemberModal from "../../components/Modals/DeleteMemberModal";
import {
  Delete,
  Edit,
  Update,
  Clear,
  ArrowDropDown,
  ContentCopy,
  AccountCircle,
  VerifiedUser,
  Upgrade,
} from "@mui/icons-material";
import { GenderOptions, GraduationsOptions } from "../../config";
import { membersHooks } from "../../hooks";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useAuth } from "../../access/GlobalAuthProvider";
import { useSearchParams } from "react-router-dom";
import WeightConfirmModal from "../../components/Modals/WeightConfirmModal";
import { isFloat } from "../../utils/utils";
import { useSnackbar } from "notistack";
import DuplicateMemberModal from "../../components/Modals/DuplicateMemberModal";
import RequestModal from "../../components/Modals/RequestModal";

export default function PersonalInfoSection(
  props: Readonly<{ memberData: any }>,
) {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const userRole = user?.data.role;

  const [searchParams] = useSearchParams();
  const editField = searchParams.get("edit_field");

  const isPrivileged = ["main_admin", "superuser", "subed_club"].includes(
    userRole,
  );

  const canUpdateSensitive =
    userRole === "main_admin" || !props.memberData?.data.is_validated;

  useEffect(() => {
    if (editField === "weight") {
      if (watch("weight") === "N/A") {
        setValue("weight", "");
      }
      setIsEditMode(true);
    }
  }, [editField]);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] =
    useState<boolean>(false);
  const [isDeleteMemberModalOpen, setIsDeleteMemberModalOpen] =
    useState<boolean>(false);
  const [isWeightRedirectionModalOpen, setIsWeightRedirectionModalOpen] =
    useState<boolean>(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState<boolean>(false);

  const handleRequestExamModalOpen = () => {
    setIsRequestModalOpen(true);
  };

  const handleRequestExamModalClose = () => {
    setIsRequestModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsDeleteMemberModalOpen(true);
  };

  const handleModalClose = () => {
    setIsDeleteMemberModalOpen(false);
  };

  const handleDuplicateModalOpen = () => {
    setIsDuplicateModalOpen(true);
  };

  const handleDuplicateModalClose = () => {
    setIsDuplicateModalOpen(false);
  };

  const handleWeightModalOpen = () => {
    setIsWeightRedirectionModalOpen(true);
  };

  const handleWeightModalClose = () => {
    setIsWeightRedirectionModalOpen(false);
  };

  const updateMember = membersHooks.useUpdateMemberData();
  const patchMember = membersHooks.usePatchMemberData();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: {
      firstName: props.memberData?.data.first_name,
      lastName: props.memberData?.data.last_name,
      age: props.memberData?.data.age,
      graduation: props.memberData?.data.graduation,
      id_number:
        props.memberData?.data.id_number === null
          ? "N/A"
          : props.memberData?.data.id_number,
      gender: props.memberData?.data.gender,
      taxNumber:
        props.memberData?.data.taxpayer_number === null
          ? "N/A"
          : props.memberData?.data.taxpayer_number,
      postCode: props.memberData?.data.post_code,
      registrationDate: props.memberData?.data.registration_date,
      cardNumber:
        props.memberData?.data.national_card_number === null
          ? "N/A"
          : props.memberData?.data.national_card_number,
      address:
        props.memberData?.data.address === null ||
        props.memberData?.data.address === ""
          ? "N/A"
          : props.memberData?.data.address,
      competitor: props.memberData?.data.member_type === "athlete",
      birthDate: props.memberData?.data.birth_date,
      quotesLegible: props.memberData?.data.quotes_legible,
      weight:
        props.memberData?.data.weight === null
          ? "N/A"
          : props.memberData?.data.weight,
      observations:
        props.memberData?.data.observations === null ||
        props.memberData?.data.observations === ""
          ? "N/A"
          : props.memberData?.data.observations,
      conditions:
        props.memberData?.data.conditions === null ||
        props.memberData?.data.conditions === ""
          ? "N/A"
          : props.memberData?.data.conditions,
    },
  });

  const onSubmit = (data: any) => {
    if (isFloat(data.weight)) {
      enqueueSnackbar("Peso tem de ser um número real inteiro!", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      return;
    }
    if (
      editField === "weight"
      // || !["main_admin", "superuser"].includes(userRole)
    ) {
      const payload = {
        memberId: props.memberData?.data.id,
        data: { weight: data.weight },
      };
      patchMember.mutateAsync(payload, {
        onError: () => {
          setValue("weight", props.memberData?.data.weight);
        },
      });
    } else {
      if (Object.keys(dirtyFields).length === 0) {
        setIsEditMode(false);
        reset();
        return;
      }
      const formData = {
        first_name: data.firstName,
        last_name: data.lastName,
        graduation: data.graduation,
        id_number:
          data.id_number === "N/A" || data.id_number === ""
            ? null
            : data.id_number,
        gender: data.gender,
        taxpayer_number:
          data.taxNumber === "N/A" || data.taxNumber === ""
            ? null
            : data.taxNumber,
        post_code: data.postCode,
        registration_date: data.registrationDate,
        national_card_number:
          data.cardNumber === "N/A" || data.cardNumber === ""
            ? null
            : data.cardNumber,
        address:
          data.address === "N/A" || data.address === "" ? null : data.address,
        conditions:
          data.conditions === "N/A" || data.conditions === ""
            ? null
            : data.conditions,
        observations:
          data.observations === "N/A" || data.observations === ""
            ? null
            : data.observations,
        member_type:
          props.memberData?.data.member_type === "coach"
            ? "coach"
            : data.competitor
              ? "athlete"
              : "student",
        quotes_legible: data.quotesLegible,
        birth_date: data.birthDate,
        weight:
          data.weight === "N/A" || data.weight === "" ? null : data.weight,
      };
      const updateData = {
        memberId: props.memberData?.data.id,
        data: formData,
      };
      updateMember.mutate(updateData, {
        onSuccess: (data: any) => {
          setValue("age", data.data.data.age);
          if (editField === "weight") {
            handleWeightModalOpen();
          }
        },
        onError: () => {
          reset();
        },
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("update_button")?.click();
      } else if (event.key === "Escape") {
        event.preventDefault();
        document.getElementById("escape_button")?.click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Grid container alignItems={"center"} size={12}>
        <Grid size={11} container gap={3} alignItems={"center"}>
          <Typography
            sx={{ color: "#e81c24", fontWeight: "bold", ml: 1 }}
            variant="h4"
          >
            INFORMAÇÕES PESSOAIS
          </Typography>
          {props.memberData?.data.is_validated ? (
            <Tooltip title="Verificado">
              <VerifiedUser color="info" fontSize="large" />
            </Tooltip>
          ) : (
            <Tooltip title="Próprio" sx={{ cursor: "pointer" }}>
              <AccountCircle color="info" fontSize="large" />
            </Tooltip>
          )}
        </Grid>
        {["superuser", "subed_club"].includes(userRole) ? (
          <Grid size={1}>
            <Tooltip title="Duplicar Membro">
              <span>
                <Button onClick={() => handleDuplicateModalOpen()}>
                  <ContentCopy></ContentCopy>
                </Button>
              </span>
            </Tooltip>
          </Grid>
        ) : null}
      </Grid>
      <Grid mb={5} mt={2}>
        {["main_admin", "superuser", "subed_club"].includes(userRole) ? (
          <Button
            sx={{ m: 1, mr: 4 }}
            variant="contained"
            size="small"
            color="error"
            startIcon={<Delete />}
            disabled={!canUpdateSensitive}
            onClick={handleModalOpen}
          >
            Remover
          </Button>
        ) : null}
        {isEditMode ? (
          <>
            <Button
              id="update_button"
              sx={{ m: 1 }}
              variant="contained"
              size="small"
              color="success"
              onClick={() => {
                handleSubmit(onSubmit)();
                setIsEditMode(false);
              }}
              startIcon={<Update />}
            >
              Atualizar
            </Button>
            <Button
              id="escape_button"
              sx={{ m: 1 }}
              variant="contained"
              size="small"
              color="inherit"
              onClick={() => {
                reset();
                setIsEditMode(false);
              }}
              startIcon={<Clear />}
            >
              Cancelar
            </Button>
          </>
        ) : (
          <Button
            sx={{ m: 1 }}
            variant="contained"
            size="small"
            color="warning"
            onClick={() => {
              if (isEditMode === false) {
                if (getValues("address") === "N/A") {
                  setValue("address", "");
                }
                if (getValues("conditions") === "N/A") {
                  setValue("conditions", "");
                }
                if (getValues("observations") === "N/A") {
                  setValue("observations", "");
                }
              }
              setIsEditMode(true);
            }}
            startIcon={<Edit />}
          >
            Editar
          </Button>
        )}
      </Grid>
      <Grid
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          rowGap: "30px",
          justifyItems: "start",
          alignItems: "center",
        }}
      >
        <FormControl component="fieldset" variant="standard">
          <FormControlLabel
            sx={{ mr: 2 }}
            labelPlacement="start"
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                Primeiro Nome:
              </Typography>
            }
            control={
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    variant={
                      canUpdateSensitive && isPrivileged && isEditMode
                        ? "outlined"
                        : "standard"
                    }
                    label=""
                    fullWidth
                    slotProps={{
                      input: {
                        readOnly: !isEditMode || !canUpdateSensitive,
                        disableUnderline: true,
                        style: { fontSize: 20, marginRight: 10 },
                      },
                    }}
                    required
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!errors.firstName}
                  />
                )}
              />
            }
          ></FormControlLabel>
        </FormControl>
        <FormControl
          component="fieldset"
          variant="standard"
          // error={!!errors.has_registrations}
        >
          <FormControlLabel
            sx={{ mr: 2 }}
            labelPlacement="start"
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                Último Nome:
              </Typography>
            }
            control={
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    variant={
                      canUpdateSensitive && isPrivileged && isEditMode
                        ? "outlined"
                        : "standard"
                    }
                    label=""
                    fullWidth
                    multiline
                    maxRows={2}
                    slotProps={{
                      input: {
                        readOnly: !isEditMode || !canUpdateSensitive,
                        disableUnderline: true,
                        style: { fontSize: 20, marginRight: 10 },
                      },
                    }}
                    required
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!errors.firstName}
                  />
                )}
              />
            }
          ></FormControlLabel>
        </FormControl>
        <FormControl
          component="fieldset"
          variant="standard"
          // error={!!errors.has_registrations}
        >
          <FormControlLabel
            sx={{ mr: 2 }}
            labelPlacement="start"
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                Data de Nascimento:
              </Typography>
            }
            control={
              <Controller
                name="birthDate"
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...field}
                      format="YYYY-MM-DD"
                      label=""
                      onChange={(date) => {
                        if (isEditMode && canUpdateSensitive) {
                          field.onChange(date ? date.format("YYYY-MM-DD") : "");
                        }
                      }}
                      value={field.value ? dayjs(field.value) : null}
                      enableAccessibleFieldDOMStructure={false}
                      slotProps={{
                        textField:
                          isPrivileged && isEditMode && canUpdateSensitive
                            ? {}
                            : {
                                variant: "standard",
                                InputProps: {
                                  disableUnderline: true,
                                  sx: {
                                    border: "none",
                                    padding: 0,
                                    fontSize: 20,
                                  },
                                },
                                sx: {
                                  // width: "100px",
                                  "& .MuiInputBase-root": {
                                    border: "none",
                                    padding: 0,
                                  },
                                  "& .MuiInputBase-input": {
                                    textAlign: "left",
                                    padding: 0,
                                  },
                                },
                              },
                      }}
                      slots={
                        isPrivileged && isEditMode && canUpdateSensitive
                          ? undefined
                          : {
                              openPickerIcon: () => null,
                              textField: TextField,
                            }
                      }
                    />
                  </LocalizationProvider>
                )}
              />
            }
          ></FormControlLabel>
        </FormControl>
        <FormControl
          sx={{ pb: 2, justifyContent: "center" }}
          component="fieldset"
          variant="standard"
          // error={!!errors.has_registrations}
        >
          <FormControlLabel
            sx={{ mr: 2 }}
            labelPlacement="start"
            label={
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: 18,
                  pr: 2,
                  width: "fit-content",
                }}
              >
                Idade (real):
              </Typography>
            }
            control={
              <Controller
                name="age"
                control={control}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    variant="standard"
                    label=""
                    fullWidth
                    slotProps={{
                      input: {
                        readOnly: true,
                        disableUnderline: true,
                        style: { fontSize: 20, marginRight: 10 },
                      },
                    }}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!errors.age}
                  />
                )}
              />
            }
          ></FormControlLabel>
        </FormControl>
        <FormControl
          sx={{ pb: 2 }}
          component="fieldset"
          variant="standard"
          // error={!!errors.has_registrations}
        >
          <FormControlLabel
            sx={{ mr: 2 }}
            labelPlacement="start"
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                Número {import.meta.env.VITE_DISPLAY_BUTTON_SIGLA}:
              </Typography>
            }
            control={
              <Controller
                name="id_number"
                control={control}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    type={isEditMode && canUpdateSensitive ? "number" : "text"}
                    variant={
                      canUpdateSensitive && isPrivileged && isEditMode
                        ? "outlined"
                        : "standard"
                    }
                    label=""
                    fullWidth
                    slotProps={{
                      input: {
                        readOnly: !isEditMode || !canUpdateSensitive,
                        disableUnderline: true,
                        style: {
                          fontSize: 20,
                          marginRight: 10,
                          color:
                            field.value === "N/A" ? "lightgray" : "inherit",
                        },
                      },
                    }}
                    required
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!errors.id_number}
                  />
                )}
              />
            }
          ></FormControlLabel>
        </FormControl>
        <FormControl
          sx={{
            pb: 2,
            flexDirection: "row",
            alignItems: "center",
          }}
          component="fieldset"
          // error={!!errors.has_registrations}
        >
          <FormControlLabel
            sx={{ mr: 2 }}
            labelPlacement="start"
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                Graduação:
              </Typography>
            }
            control={
              <Controller
                name="graduation"
                control={control}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    select
                    variant={
                      canUpdateSensitive && isPrivileged && isEditMode
                        ? "outlined"
                        : "standard"
                    }
                    label=""
                    fullWidth
                    slotProps={{
                      input: {
                        readOnly: !isEditMode || !canUpdateSensitive,
                        disableUnderline: true,
                        style: { fontSize: 20 },
                      },
                      select: {
                        IconComponent:
                          isEditMode && canUpdateSensitive
                            ? ArrowDropDown
                            : () => null,
                        readOnly: !isEditMode || !canUpdateSensitive,
                      },
                    }}
                    required
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!errors.gender}
                  >
                    {GraduationsOptions.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            }
          ></FormControlLabel>
          <Grid container flexDirection={"column"} alignItems={"center"}>
            <Tooltip
              arrow
              placement="top"
              title={
                props.memberData?.data.is_validated
                  ? "Pedir Proposta Exame"
                  : "Precisa de verificar este Membro para o propor a Exame."
              }
            >
              <span>
                <IconButton
                  disabled={!props.memberData?.data.is_validated}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRequestExamModalOpen();
                  }}
                >
                  <Upgrade
                    fontSize="large"
                    color={
                      props.memberData?.data.is_validated ? "info" : "disabled"
                    }
                  />
                </IconButton>
              </span>
            </Tooltip>
          </Grid>
        </FormControl>
        <FormControl
          sx={{ pb: 2 }}
          component="fieldset"
          // error={!!errors.has_registrations}
        >
          <FormControlLabel
            sx={{ mr: 2 }}
            labelPlacement="start"
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                Género:
              </Typography>
            }
            control={
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    select
                    variant={
                      canUpdateSensitive && isPrivileged && isEditMode
                        ? "outlined"
                        : "standard"
                    }
                    label=""
                    fullWidth
                    slotProps={{
                      input: {
                        readOnly: !isEditMode || !canUpdateSensitive,
                        disableUnderline: true,
                        style: { fontSize: 20, marginRight: 10 },
                      },
                      select: {
                        IconComponent:
                          isEditMode && canUpdateSensitive
                            ? ArrowDropDown
                            : () => null,
                        readOnly: !isEditMode || !canUpdateSensitive,
                      },
                    }}
                    required
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!errors.gender}
                  >
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
            }
          ></FormControlLabel>
        </FormControl>
        <FormControl sx={{ pb: 2 }} component="fieldset">
          <FormControlLabel
            labelPlacement="start"
            label={
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: 18,
                  pr: 2,
                  color: editField === "weight" ? "red" : "black",
                }}
              >
                Peso (kg):
              </Typography>
            }
            control={
              <Controller
                name="weight"
                control={control}
                render={({ field }) => (
                  <TextField
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && editField) {
                        e.preventDefault();
                        handleSubmit(onSubmit)();
                        setIsEditMode(false);
                      }
                    }}
                    color="warning"
                    variant={isEditMode ? "outlined" : "standard"}
                    label=""
                    type={isEditMode ? "number" : "text"}
                    fullWidth
                    slotProps={{
                      input: {
                        readOnly: !isEditMode,
                        disableUnderline: true,
                        style: {
                          fontSize: 20,
                          marginRight: 10,
                          width: 200,
                          color:
                            field.value === "N/A" ? "lightgray" : "inherit",
                        },
                      },
                    }}
                    required
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!errors.weight || editField === "weight"}
                  />
                )}
              />
            }
          ></FormControlLabel>
        </FormControl>
        {props.memberData?.data.member_type === "coach" ||
        userRole === "main_admin" ? null : (
          <Controller
            name="competitor"
            control={control}
            render={({ field }) => (
              <FormControl
                sx={{ pb: 2, justifyContent: "center" }}
                component="fieldset"
                variant="standard"
              >
                <FormControlLabel
                  sx={{ mr: 2 }}
                  labelPlacement="start"
                  label={
                    <Typography
                      sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}
                    >
                      É competidor:
                    </Typography>
                  }
                  control={
                    <Switch
                      disabled={!isEditMode}
                      sx={{ ml: 2 }}
                      {...field}
                      checked={field.value}
                      color="warning"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                      }}
                    />
                  }
                ></FormControlLabel>
              </FormControl>
            )}
          />
        )}
        {!["subed_club", "single_admin"].includes(userRole) ? null : (
          <Controller
            name="quotesLegible"
            control={control}
            render={({ field }) => (
              <FormControl
                sx={{ pb: 2, justifyContent: "center" }}
                component="fieldset"
                variant="standard"
              >
                <FormControlLabel
                  sx={{ mr: 2 }}
                  labelPlacement="start"
                  label={
                    <Typography
                      sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}
                    >
                      Paga quotas:
                    </Typography>
                  }
                  control={
                    <Switch
                      disabled={!isEditMode}
                      sx={{ ml: 2 }}
                      {...field}
                      checked={field.value}
                      color="warning"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                      }}
                    />
                  }
                ></FormControlLabel>
              </FormControl>
            )}
          />
        )}
        <FormControl
          component="fieldset"
          variant="standard"
          // error={!!errors.has_registrations}
        >
          <FormControlLabel
            sx={{ mr: 2 }}
            labelPlacement="start"
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                Data de Inscrição:
              </Typography>
            }
            control={
              <Controller
                name="registrationDate"
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...field}
                      format="YYYY-MM-DD"
                      label=""
                      onChange={(date) => {
                        if (isEditMode && canUpdateSensitive) {
                          field.onChange(date ? date.format("YYYY-MM-DD") : "");
                        }
                      }}
                      value={field.value ? dayjs(field.value) : null}
                      enableAccessibleFieldDOMStructure={false}
                      slotProps={{
                        textField:
                          isPrivileged && isEditMode && canUpdateSensitive
                            ? {}
                            : {
                                variant: "standard",
                                InputProps: {
                                  disableUnderline: true,
                                  sx: {
                                    border: "none",
                                    padding: 0,
                                    fontSize: 20,
                                  },
                                },
                                sx: {
                                  // width: "100px",
                                  "& .MuiInputBase-root": {
                                    border: "none",
                                    padding: 0,
                                  },
                                  "& .MuiInputBase-input": {
                                    textAlign: "left",
                                    padding: 0,
                                  },
                                },
                              },
                      }}
                      slots={
                        isPrivileged && isEditMode && canUpdateSensitive
                          ? undefined
                          : {
                              openPickerIcon: () => null,
                              textField: TextField,
                            }
                      }
                    />
                  </LocalizationProvider>
                )}
              />
            }
          ></FormControlLabel>
        </FormControl>
      </Grid>
      <Grid size={11}>
        <Typography
          sx={{ color: "#e81c24", fontWeight: "bold", ml: 1, mt: 8, mb: 4 }}
          variant="h5"
        >
          Detalhes Adicionais
        </Typography>
      </Grid>
      <Grid
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          rowGap: "30px",
          justifyItems: "start",
          alignItems: "center",
        }}
      >
        <FormControl
          sx={{ pb: 2 }}
          component="fieldset"
          variant="standard"
          // error={!!errors.has_registrations}
        >
          <FormControlLabel
            sx={{ mr: 2 }}
            labelPlacement="start"
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                Morada:
              </Typography>
            }
            control={
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    variant={
                      isPrivileged && isEditMode ? "outlined" : "standard"
                    }
                    label=""
                    fullWidth
                    slotProps={{
                      input: {
                        readOnly: !isEditMode,
                        disableUnderline: true,
                        style: {
                          fontSize: 20,
                          marginRight: 10,
                          color:
                            field.value === "N/A" ? "lightgray" : "inherit",
                        },
                      },
                    }}
                    required
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!errors.address}
                  />
                )}
              />
            }
          ></FormControlLabel>
        </FormControl>
        <FormControl
          sx={{ pb: 2 }}
          component="fieldset"
          variant="standard"
          // error={!!errors.has_registrations}
        >
          <FormControlLabel
            sx={{ mr: 2 }}
            labelPlacement="start"
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                NIF:
              </Typography>
            }
            control={
              <Controller
                name="taxNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    variant={
                      isPrivileged && isEditMode ? "outlined" : "standard"
                    }
                    label=""
                    type={isEditMode ? "number" : "text"}
                    fullWidth
                    slotProps={{
                      input: {
                        readOnly: !isEditMode,
                        disableUnderline: true,
                        style: {
                          fontSize: 20,
                          marginRight: 10,
                          color:
                            field.value === "N/A" ? "lightgray" : "inherit",
                        },
                      },
                    }}
                    required
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!errors.taxNumber}
                  />
                )}
              />
            }
          ></FormControlLabel>
        </FormControl>
        <FormControl
          sx={{ pb: 2 }}
          component="fieldset"
          variant="standard"
          // error={!!errors.has_registrations}
        >
          <FormControlLabel
            sx={{ mr: 2 }}
            labelPlacement="start"
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                Número C.C./B.I.:
              </Typography>
            }
            control={
              <Controller
                name="cardNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    type={isEditMode ? "number" : "text"}
                    variant={
                      isPrivileged && isEditMode ? "outlined" : "standard"
                    }
                    label=""
                    fullWidth
                    slotProps={{
                      input: {
                        readOnly: !isEditMode,
                        disableUnderline: true,
                        style: {
                          fontSize: 20,
                          marginRight: 10,
                          color:
                            field.value === "N/A" ? "lightgray" : "inherit",
                        },
                      },
                    }}
                    required
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!errors.cardNumber}
                  />
                )}
              />
            }
          ></FormControlLabel>
        </FormControl>
      </Grid>
      <Grid mt={"30px"} container rowSpacing={"30px"}>
        <Grid size={12}>
          <FormControl
            sx={{ width: "100%" }}
            component="fieldset"
            variant="standard"
            // error={!!errors.has_registrations}
          >
            <FormControlLabel
              sx={{ mr: 2 }}
              labelPlacement="start"
              label={
                <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                  Condições Médicas/ Alergias/Medicações:
                </Typography>
              }
              control={
                <Controller
                  name="conditions"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      color="warning"
                      variant={
                        isPrivileged && isEditMode ? "outlined" : "standard"
                      }
                      label=""
                      fullWidth
                      multiline
                      maxRows={4}
                      slotProps={{
                        input: {
                          readOnly: !isEditMode,
                          disableUnderline: true,
                          style: {
                            fontSize: 20,
                            marginRight: 10,
                            color:
                              field.value === "N/A" ? "lightgray" : "inherit",
                          },
                        },
                      }}
                      required
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      error={!!errors.firstName}
                    />
                  )}
                />
              }
            ></FormControlLabel>
          </FormControl>
        </Grid>
        <Grid size={12} mt={2} container>
          <FormControl
            sx={{ width: "100%" }}
            component="fieldset"
            variant="standard"
            // error={!!errors.has_registrations}
          >
            <FormControlLabel
              sx={{ mr: 2 }}
              labelPlacement="start"
              label={
                <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                  Observações:
                </Typography>
              }
              control={
                <Controller
                  name="observations"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      color="warning"
                      variant={
                        isPrivileged && isEditMode ? "outlined" : "standard"
                      }
                      label=""
                      fullWidth
                      multiline
                      maxRows={4}
                      slotProps={{
                        input: {
                          readOnly: !isEditMode,
                          disableUnderline: true,
                          style: {
                            fontSize: 20,
                            marginRight: 10,
                            color:
                              field.value === "N/A" ? "lightgray" : "inherit",
                          },
                        },
                      }}
                      required
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      error={!!errors.firstName}
                    />
                  )}
                />
              }
            ></FormControlLabel>
          </FormControl>
        </Grid>
      </Grid>
      <DuplicateMemberModal
        handleModalClose={handleDuplicateModalClose}
        isModalOpen={isDuplicateModalOpen}
        memberData={props.memberData?.data}
      ></DuplicateMemberModal>
      <DeleteMemberModal
        from="Atletas"
        handleModalClose={handleModalClose}
        handleModalOpen={handleModalOpen}
        isModalOpen={isDeleteMemberModalOpen}
        id={props.memberData?.data.id}
      ></DeleteMemberModal>
      <WeightConfirmModal
        handleModalClose={handleWeightModalClose}
        handleModalOpen={handleWeightModalOpen}
        isModalOpen={isWeightRedirectionModalOpen}
        id={searchParams.get("event_id")}
      ></WeightConfirmModal>
      <RequestModal
        id={props.memberData?.data.id}
        isOpen={isRequestModalOpen}
        handleClose={handleRequestExamModalClose}
        requestType="exams"
      ></RequestModal>
    </>
  );
}
