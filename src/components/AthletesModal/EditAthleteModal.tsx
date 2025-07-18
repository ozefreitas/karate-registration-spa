import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Grid,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Close } from "@mui/icons-material";
import {
  useUpdateAthleteData,
  useFetchSingleAthleteData,
} from "../../hooks/useAthletesData";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  CategoryOptions,
  GraduationsOptions,
  GenderOptions,
} from "../../config";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditAthleteModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    id: string;
  }>
) {
  type Athlete = {
    firstName: string;
    lastName: string;
    category: string;
    graduation: number;
    gender: string;
    skip_number: number;
    is_student: boolean;
    birthDate: any;
  };

  const { data: singleAthleteData, isLoading: isSingleAthleteLoading } =
    useFetchSingleAthleteData(props.id);

  const {
    control: athleteControl,
    handleSubmit: athleteHandleSubmit,
    reset: athleteReset,
    formState: { errors: athleteErrors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      graduation: "",
      category: "",
      skip_number: null,
      gender: "",
      is_student: false,
      birthDate: "",
    },
  });

  React.useEffect(() => {
    // update the form with that athlete info
    const formData = {
      firstName: singleAthleteData?.data.first_name,
      lastName: singleAthleteData?.data.last_name,
      graduation: singleAthleteData?.data.graduation ?? "",
      category: singleAthleteData?.data.category ?? "",
      gender: singleAthleteData?.data.gender ?? "",
      is_student: singleAthleteData?.data.is_student,
      birthDate: singleAthleteData?.data.birth_date,
    };
    athleteReset(formData);
  }, [singleAthleteData]);

  const updateAthleteData = useUpdateAthleteData();

  const onSubmit = (data: any) => {
    const formData = {
      first_name: data?.firstName,
      last_name: data?.lastName,
      graduation: data?.graduation,
      category: data?.category,
      gender: data?.gender,
      skip_number: data?.skip_number,
      is_student: data?.is_student ?? false,
      birth_date: data?.birthDate ?? null,
    };
    updateAthleteData.mutate({ athleteId: props.id, data: formData });
  };

  return (
    <Dialog
      keepMounted
      open={props.isModalOpen}
      onClose={props.handleModalClose}
      maxWidth="md"
      fullWidth
      slots={{
        transition: Transition,
      }}
    >
      <AppBar
        sx={{
          position: "relative",
          width: "99%",
          margin: "auto",
          marginTop: "8px",
          backgroundColor: "#e81c24",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleModalClose}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Editar Atleta
            {/* {props.control._fields?.firstName?._f?.value} {props.control._fields?.lastName?._f?.value} */}
          </Typography>
          <Button
            autoFocus
            size="large"
            color="inherit"
            onClick={() => {
              athleteHandleSubmit(onSubmit)();
              props.handleModalClose();
            }}
            // disabled={athletesNotInEventData?.data.length === 0}
          >
            Guardar
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        {isSingleAthleteLoading ? (
          <Grid container justifyContent="center" size={12}>
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container justifyContent={"center"}>
            <Grid sx={{ m: 2 }} size={8}>
              <Controller
                name="firstName"
                control={athleteControl}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    variant={"outlined"}
                    label="Primeiro Nome"
                    fullWidth
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!athleteErrors.firstName}
                    helperText={athleteErrors.firstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid sx={{ m: 2 }} size={8}>
              <Controller
                name="lastName"
                control={athleteControl}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    variant={"outlined"}
                    label="Último Nome"
                    fullWidth
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!athleteErrors.lastName}
                    helperText={athleteErrors.lastName?.message}
                  />
                )}
              />
            </Grid>
            <Grid sx={{ m: 2 }} size={8}>
              <Controller
                name="category"
                control={athleteControl}
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
                    }}
                    error={!!athleteErrors.category}
                    helperText={athleteErrors.category?.message}
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
            <Grid sx={{ m: 2 }} size={8}>
              <Controller
                name="graduation"
                control={athleteControl}
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
                    error={!!athleteErrors.graduation}
                    helperText={athleteErrors.graduation?.message}
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
            <Grid sx={{ m: 2 }} size={8}>
              <Controller
                name="gender"
                control={athleteControl}
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
                    error={!!athleteErrors.graduation}
                    helperText={athleteErrors.graduation?.message}
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
          </Grid>
        )}
      </DialogContent>
      {/* <DialogActions></DialogActions> */}
    </Dialog>
  );
}
