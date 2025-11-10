import {
  Typography,
  Grid,
  FormControl,
  FormControlLabel,
  TextField,
  Button,
  MenuItem,
  Switch,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import DeleteAthleteModal from "../../components/AthletesModal/DeleteAthleteModal";
import {
  Delete,
  Edit,
  Update,
  Clear,
  ArrowDropDown,
} from "@mui/icons-material";
import { GenderOptions, GraduationsOptions, QuotesOptions } from "../../config";
import { membersHooks } from "../../hooks";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useAuth } from "../../access/GlobalAuthProvider";
import { useSearchParams } from "react-router-dom";
import WeightConfirmModal from "../../components/AthletesModal/WeightConfirmModal";

export default function PersonalInfoSection(
  props: Readonly<{ athleteData: any }>
) {
  const { user } = useAuth();
  const userRole = user?.data.role;

  const [searchParams] = useSearchParams();
  const editField = searchParams.get("edit_field");

  const isPrivileged = ["main_admin", "superuser", "subed_club"].includes(
    userRole
  );

  useEffect(() => {
    if (editField === "weight") {
      if (watch("weight") === "N/A") {
        setValue("weight", "");
      }
      setIsEditMode(true);
    }
  }, [editField]);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isDeleteAthleteModalOpen, setIsDeleteAthleteModalOpen] =
    useState<boolean>(false);
  const [isWeightRedirectionModalOpen, setIsWeightRedirectionModalOpen] =
    useState<boolean>(false);

  const handleModalOpen = () => {
    setIsDeleteAthleteModalOpen(true);
  };

  const handleModalClose = () => {
    setIsDeleteAthleteModalOpen(false);
  };

  const handleWeightModalOpen = () => {
    setIsWeightRedirectionModalOpen(true);
  };

  const handleWeightModalClose = () => {
    setIsWeightRedirectionModalOpen(false);
  };

  const updateAthlete = membersHooks.useUpdateMemberData();
  const patchMember = membersHooks.usePatchMemberData();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: props.athleteData?.data.first_name,
      lastName: props.athleteData?.data.last_name,
      age: props.athleteData?.data.age,
      graduation: props.athleteData?.data.graduation,
      id_number:
        props.athleteData?.data.id_number === null
          ? "N/A"
          : props.athleteData?.data.id_number,
      gender: props.athleteData?.data.gender,
      competitor: props.athleteData?.data.member_type === "athlete",
      birthDate: props.athleteData?.data.birth_date,
      weight:
        props.athleteData?.data.weight === null
          ? "N/A"
          : props.athleteData?.data.weight,
      quotes: props.athleteData?.data.quotes ? "regular" : "overdue",
    },
  });

  const onSubmit = (data: any) => {
    if (
      editField === "weight" 
      // || !["main_admin", "superuser"].includes(userRole)
    ) {
      const payload = {
        memberId: props.athleteData?.data.id,
        data: { weight: data.weight },
      };
      patchMember.mutateAsync(payload, {
        onError: () => {
          setValue("weight", props.athleteData?.data.weight);
        },
      });
    } else {
      const formData = {
        first_name: data.firstName,
        last_name: data.lastName,
        graduation: data.graduation,
        id_number: data.id_number,
        gender: data.gender,
        member_type: data.competitor ? "athlete" : "student",
        birth_date: data.birthDate,
        quotes: data.quotes === "regular",
        weight:
          data.weight === "N/A" || data.weight === "" ? null : data.weight,
      };
      const updateData = {
        memberId: props.athleteData?.data.id,
        data: formData,
      };
      updateAthlete.mutate(updateData, {
        onSuccess: () => {
          if (editField === "weight") {
            handleWeightModalOpen();
          }
        },
      });
    }
  };

  return (
    <>
      <Typography
        sx={{ color: "#e81c24", fontWeight: "bold", ml: 1, mb: 2 }}
        variant="h4"
      >
        INFORMAÇÕES PESSOAIS
      </Typography>
      <Grid sx={{ mb: 3 }}>
        {["main_admin", "superuser", "subed_club"].includes(userRole) ? (
          <Button
            sx={{ m: 1, mr: 4 }}
            variant="contained"
            size="small"
            color="error"
            startIcon={<Delete />}
            onClick={handleModalOpen}
          >
            Remover
          </Button>
        ) : null}
        {isEditMode ? (
          <>
            <Button
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
              if (watch("weight") === "N/A") {
                setValue("weight", "");
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
                      isPrivileged && isEditMode ? "outlined" : "standard"
                    }
                    label=""
                    fullWidth
                    slotProps={{
                      input: {
                        readOnly: !isPrivileged || !isEditMode,
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
                      isPrivileged && isEditMode ? "outlined" : "standard"
                    }
                    label=""
                    fullWidth
                    slotProps={{
                      input: {
                        readOnly: !isEditMode,
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
                        field.onChange(date ? date.format("YYYY-MM-DD") : "");
                      }}
                      value={field.value ? dayjs(field.value) : null}
                      enableAccessibleFieldDOMStructure={false}
                      slotProps={{
                        textField:
                          isPrivileged && isEditMode
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
                        isPrivileged && isEditMode
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
                    error={!!errors.id_number}
                  />
                )}
              />
            }
          ></FormControlLabel>
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
                      isPrivileged && isEditMode ? "outlined" : "standard"
                    }
                    label=""
                    fullWidth
                    slotProps={{
                      input: {
                        readOnly: !isEditMode,
                        disableUnderline: true,
                        style: { fontSize: 20, marginRight: 10 },
                      },
                      select: {
                        IconComponent: isEditMode ? ArrowDropDown : () => null,
                        readOnly: !isEditMode,
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
                      isPrivileged && isEditMode ? "outlined" : "standard"
                    }
                    label=""
                    fullWidth
                    slotProps={{
                      input: {
                        readOnly: !isEditMode,
                        disableUnderline: true,
                        style: { fontSize: 20, marginRight: 10 },
                      },
                      select: {
                        IconComponent: isEditMode ? ArrowDropDown : () => null,
                        readOnly: !isEditMode,
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
                      ["Masculino", "Feminino"].includes(item.value)
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
                      if (e.key === "Enter") {
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
              <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                Estado quotas:
              </Typography>
            }
            control={
              <Controller
                name="quotes"
                control={control}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    variant={
                      isPrivileged && isEditMode ? "outlined" : "standard"
                    }
                    label=""
                    fullWidth
                    select
                    slotProps={{
                      input: {
                        readOnly: true,
                        disableUnderline: true,
                        style: { fontSize: 20, marginRight: 10 },
                      },
                      select: {
                        IconComponent: isEditMode ? ArrowDropDown : () => null,
                        readOnly: !isEditMode,
                      },
                    }}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!errors.quotes}
                  >
                    {QuotesOptions.map((item, index) => (
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
        {props.athleteData?.data.member_type === "coach" ? null : (
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
      </Grid>
      <DeleteAthleteModal
        from="Atletas"
        handleModalClose={handleModalClose}
        handleModalOpen={handleModalOpen}
        isModalOpen={isDeleteAthleteModalOpen}
        id={props.athleteData?.data.id}
      ></DeleteAthleteModal>
      <WeightConfirmModal
        handleModalClose={handleWeightModalClose}
        handleModalOpen={handleWeightModalOpen}
        isModalOpen={isWeightRedirectionModalOpen}
        id={searchParams.get("event_id")}
      ></WeightConfirmModal>
    </>
  );
}
