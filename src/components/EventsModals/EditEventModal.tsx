import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Grid,
  CircularProgress,
  TextField,
  MenuItem,
} from "@mui/material";
import { useUpdateEventData } from "../../hooks/useEventData";
import { useForm, Controller } from "react-hook-form";
import React from "react";
import { TransitionProps } from "notistack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Close } from "@mui/icons-material";
import { SeasonOptions } from "../../config";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditEventModal(
  props: Readonly<{ isOpen: boolean; handleClose: any; singleEventData: any }>
) {
  console.log(props.singleEventData);
  const updateEvent = useUpdateEventData();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      location: "",
      season: "",
      start_registration: undefined,
      end_registration: undefined,
      retifications_deadline: undefined,
      event_date: undefined,
      // description will be edited in the event card page itself
      description: props.singleEventData?.description,
      custody: "",
      email_contact: "",
      contact: undefined,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Dialog
      keepMounted
      open={props.isOpen}
      onClose={props.handleClose}
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
            onClick={props.handleClose}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Editar Evento {props.singleEventData?.name}
            {/* {props.control._fields?.firstName?._f?.value} {props.control._fields?.lastName?._f?.value} */}
          </Typography>
          <Button
            autoFocus
            size="large"
            color="inherit"
            onClick={() => {
              handleSubmit(onSubmit)();
              props.handleClose();
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
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Nome"
                  required
                  fullWidth
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
          <Grid sx={{ m: 2 }} size={8}>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Localização"
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
          <Grid sx={{ m: 2 }} container justifyContent="center" size={8}>
            <Controller
              name="event_date"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    format="YYYY-MM-DD"
                    label="Data Evento *"
                    onChange={(date) => {
                      field.onChange(date ? date.format("YYYY-MM-DD") : "");
                    }}
                    value={field.value ? dayjs(field.value) : null}
                    slots={{ textField: TextField }}
                    enableAccessibleFieldDOMStructure={false}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors?.event_date,
                        helperText: errors?.event_date?.message || "",
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          </Grid>
          <Grid sx={{ m: 2 }} container justifyContent="center" size={8}>
            <Controller
              name="start_registration"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    format="YYYY-MM-DD"
                    label="Início Inscrições"
                    onChange={(date) => {
                      field.onChange(date ? date.format("YYYY-MM-DD") : "");
                    }}
                    value={field.value ? dayjs(field.value) : null}
                    slots={{ textField: TextField }}
                    enableAccessibleFieldDOMStructure={false}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors?.start_registration,
                        helperText: errors?.start_registration?.message || "",
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          </Grid>
          <Grid sx={{ m: 2 }} container justifyContent="center" size={8}>
            <Controller
              name="end_registration"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    format="YYYY-MM-DD"
                    label="Fim Inscrições"
                    onChange={(date) => {
                      field.onChange(date ? date.format("YYYY-MM-DD") : "");
                    }}
                    value={field.value ? dayjs(field.value) : null}
                    slots={{ textField: TextField }}
                    enableAccessibleFieldDOMStructure={false}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors?.end_registration,
                        helperText: errors?.end_registration?.message || "",
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          </Grid>
          <Grid sx={{ m: 2 }} container justifyContent="center" size={8}>
            <Controller
              name="retifications_deadline"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    format="YYYY-MM-DD"
                    label="Data limite retificações"
                    onChange={(date) => {
                      field.onChange(date ? date.format("YYYY-MM-DD") : "");
                    }}
                    value={field.value ? dayjs(field.value) : null}
                    slots={{ textField: TextField }}
                    enableAccessibleFieldDOMStructure={false}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors?.retifications_deadline,
                        helperText:
                          errors?.retifications_deadline?.message || "",
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          </Grid>
          <Grid sx={{ m: 2 }} size={8}>
            <Controller
              name="season"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Época"
                  fullWidth
                  select
                  multiline
                  required
                  maxRows={8}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.season}
                  helperText={errors.season?.message}
                >
                  {SeasonOptions.map((item, index) => (
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
              name="custody"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Tutela"
                  fullWidth
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.custody}
                  helperText={errors.custody?.message}
                />
              )}
            />
          </Grid>
          <Grid sx={{ m: 2, mr: 1 }} size={4}>
            <Controller
              name="email_contact"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Email de contacto"
                  fullWidth
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.email_contact}
                  helperText={errors.email_contact?.message}
                />
              )}
            />
          </Grid>
          <Grid sx={{ m: 2, ml: 1 }} size={4}>
            <Controller
              name="contact"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Contacto telefónico"
                  fullWidth
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.contact}
                  helperText={errors.contact?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      {/* <DialogActions></DialogActions> */}
    </Dialog>
  );
}
