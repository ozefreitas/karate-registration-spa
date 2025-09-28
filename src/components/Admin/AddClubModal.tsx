import {
  Dialog,
  DialogContent,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Grid,
  TextField,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import React from "react";
import { TransitionProps } from "notistack";
import { Close } from "@mui/icons-material";
import { clubsHoks } from "../../hooks";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddClubModal(
  props: Readonly<{ isOpen: boolean; handleClose: any }>
) {
  const createClub = clubsHoks.useCreateClub();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: any) => {
    const formData = { club: data.name };
    createClub.mutate(formData);
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
            Adicionar Clube
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
            Adicionar
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Grid container justifyContent={"center"}>
          <Grid sx={{ m: 2 }} size={6}>
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
          <FormHelperText sx={{ p: 1, pb: 0 }}>
            Insira o nome do Clube que pretende adicionar à sua tutela. Este
            nome será o username que o Clube irá usar para fazer Login na sua
            conta.
          </FormHelperText>
        </Grid>
      </DialogContent>
      {/* <DialogActions></DialogActions> */}
    </Dialog>
  );
}
