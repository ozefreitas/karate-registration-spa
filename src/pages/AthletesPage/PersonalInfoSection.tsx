import {
  Typography,
  Grid,
  FormControl,
  FormControlLabel,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import DeleteAthleteModal from "../../components/AthletesModal/DeleteAthleteModal";
import { Delete, Edit, Update, Clear } from "@mui/icons-material";
import { GenderOptions, GraduationsOptions } from "../../config";
import { useUpdateAthleteData } from "../../hooks/useAthletesData";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function PersonalInfoSection(
  props: Readonly<{ athleteData: any }>
) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isDeleteAthleteModalOpen, setIsDeleteAthleteModalOpen] =
    useState<boolean>(false);

  const handleModalOpen = () => {
    setIsDeleteAthleteModalOpen(true);
  };

  const handleModalClose = () => {
    setIsDeleteAthleteModalOpen(false);
  };

  const updateAthlete = useUpdateAthleteData();

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: props.athleteData?.data.first_name,
      lastName: props.athleteData?.data.last_name,
      age: props.athleteData?.data.age,
      graduation: props.athleteData?.data.graduation,
      category: props.athleteData?.data.category,
      skip_number: props.athleteData?.data.skip_number,
      gender: props.athleteData?.data.gender,
      student: props.athleteData?.data.student,
      birthDate: props.athleteData?.data.birth_date,
      weight: props.athleteData?.data.weight ?? "N/A",
    },
  });

  const onSubmit = (data: any) => {
    const formData = {
      first_name: data.firstName,
      last_name: data.lastName,
      graduation: data.graduation,
      category: data.category,
      skip_number: data.skip_number,
      gender: data.gender,
      student: data.student,
      birth_date: data.birthDate,
      weight: data.weight,
    };
    const updateData = {
      athleteId: props.athleteData?.data.id,
      data: formData,
    };
    updateAthlete.mutate(updateData);
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
            onClick={() => setIsEditMode(true)}
            startIcon={<Edit />}
          >
            Editar
          </Button>
        )}
      </Grid>
      <Grid container>
        <FormControl
          sx={{ pb: 2 }}
          component="fieldset"
          variant="standard"
          // error={!!errors.has_registrations}
        >
          {/* <FormLabel sx={{ mb: 1 }}>
                    Selecione este campo se o Evento <strong>PERMITE</strong>{" "}
                    inscrições livres.
                  </FormLabel> */}
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
                    variant={isEditMode ? "outlined" : "standard"}
                    label=""
                    slotProps={{
                      input: {
                        readOnly: !isEditMode,
                        disableUnderline: true,
                        style: { fontSize: 18, marginRight: 10 },
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
          sx={{ pb: 1 }}
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
                    variant={isEditMode ? "outlined" : "standard"}
                    label=""
                    slotProps={{
                      input: {
                        readOnly: !isEditMode,
                        disableUnderline: true,
                        style: { fontSize: 18, marginRight: 10 },
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
                Data de Nascimento:
              </Typography>
            }
            control={
              <Controller
                name="birthDate"
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
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
                          textField: isEditMode
                            ? {}
                            : {
                                variant: "standard",
                                InputProps: {
                                  disableUnderline: true,
                                  sx: {
                                    border: "none",
                                    padding: 0,
                                    fontSize: 16,
                                  },
                                },
                                sx: {
                                  width: "100px",
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
                          isEditMode
                            ? undefined
                            : {
                                openPickerIcon: () => null,
                                textField: TextField,
                              }
                        }
                      />
                    </DemoContainer>
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
              <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                Idade:
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
                    slotProps={{
                      input: {
                        readOnly: true,
                        disableUnderline: true,
                        style: { fontSize: 18, marginRight: 10 },
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
                Número SKI-P:
              </Typography>
            }
            control={
              <Controller
                name="skip_number"
                control={control}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    variant={isEditMode ? "outlined" : "standard"}
                    label=""
                    slotProps={{
                      input: {
                        readOnly: !isEditMode,
                        disableUnderline: true,
                        style: { fontSize: 18, marginRight: 10 },
                      },
                    }}
                    required
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!errors.skip_number}
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
                    variant={isEditMode ? "outlined" : "standard"}
                    label=""
                    slotProps={{
                      input: {
                        readOnly: !isEditMode,
                        disableUnderline: true,
                        style: { fontSize: 18, marginRight: 10 },
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
                Categoria/Escalão:
              </Typography>
            }
            control={
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    variant="standard"
                    disabled
                    label=""
                    slotProps={{
                      input: {
                        readOnly: true,
                        disableUnderline: true,
                        style: { fontSize: 18, marginRight: 10 },
                      },
                    }}
                    required
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!errors.category}
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
                    variant={isEditMode ? "outlined" : "standard"}
                    label=""
                    slotProps={{
                      input: {
                        readOnly: !isEditMode,
                        disableUnderline: true,
                        style: { fontSize: 18, marginRight: 10 },
                      },
                    }}
                    required
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!errors.gender}
                  >
                    {GenderOptions.map((item, index) => (
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
                Peso:
              </Typography>
            }
            control={
              <Controller
                name="weight"
                control={control}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    variant={isEditMode ? "outlined" : "standard"}
                    label=""
                    slotProps={{
                      input: {
                        readOnly: !isEditMode,
                        disableUnderline: true,
                        style: {
                          fontSize: 18,
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
                    error={!!errors.weight}
                  />
                )}
              />
            }
          ></FormControlLabel>
        </FormControl>
      </Grid>
      <DeleteAthleteModal
        from="Atletas"
        handleModalClose={handleModalClose}
        handleModalOpen={handleModalOpen}
        isModalOpen={isDeleteAthleteModalOpen}
        id={props.athleteData?.data.id}
      ></DeleteAthleteModal>
    </>
  );
}
