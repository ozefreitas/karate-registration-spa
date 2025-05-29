import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Close } from "@mui/icons-material";
import { useUpdateAthleteData } from "../../hooks/useAthletesData";
import { Controller, SubmitHandler } from "react-hook-form";
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

export default function EditTeamModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    id: string;
    control: any;
    errors: any;
    handleSubmit: any;
  }>
) {
  type Team = {
    id: string;
    firstName: string;
    lastName: string;
    category: string;
    graduation: number;
    gender: string;
    skip_number: number;
    is_student: boolean;
    birthDate: any;
  };

  const updateAthleteData = useUpdateAthleteData();

  const onSubmit: SubmitHandler<Team> = (data) => {
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
            Editar Equipa
            {/* {props.control._fields?.firstName?._f?.value} {props.control._fields?.lastName?._f?.value} */}
          </Typography>
          <Button
            autoFocus
            size="large"
            color="inherit"
            onClick={() => {
              props.handleSubmit(onSubmit)();
              props.handleModalClose();
            }}
            // disabled={athletesNotInEventData?.data.length === 0}
          >
            Guardar
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Grid container justifyContent={"center"}>
          <Grid sx={{ m: 2 }} size={8}>
            <Controller
              name="category"
              control={props.control}
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
                  error={!!props.errors.category}
                  helperText={props.errors.category?.message}
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
              name="gender"
              control={props.control}
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
                  error={!!props.errors.graduation}
                  helperText={props.errors.graduation?.message}
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
      </DialogContent>
      {/* <DialogActions></DialogActions> */}
    </Dialog>
  );
}
