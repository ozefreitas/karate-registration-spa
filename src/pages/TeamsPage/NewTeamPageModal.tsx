import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Controller, useForm } from "react-hook-form";
import { Grid, MenuItem, TextField } from "@mui/material";
import { membersHooks } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../access/GlobalAuthProvider";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewTeamPageModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    disciplineData: any;
  }>
) {
  const navigate = useNavigate();
  const { id: eventId } = useParams<{ id: string }>();
  const { user } = useAuth();
  const userRole = user?.data.role;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { athlete1: "", athlete2: "", athlete3: "", gender: "" },
  });

  const onSubmit = async (data: any) => {};

  const {
    data: membersNotInEventData,
    isLoading: isMembersNotInEventLoading,
    error: membersNotInEventError,
    refetch,
  } = membersHooks.useFetchMembersNotInEvent(eventId!, 1, 100);

  return (
    <Dialog
      fullScreen
      open={props.isModalOpen}
      onClose={props.handleModalClose}
      slots={{
        transition: Transition,
      }}
    >
      <AppBar
        sx={{
          position: "relative",
          width: "99%",
          marginX: "auto",
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
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Adicionar nova Equipa
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={() => {
              handleSubmit(onSubmit)();
              props.handleModalClose();
            }}
          >
            Adicionar
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container size={12}>
        <Grid container size={4} p={2}>
          <Controller
            name="athlete1"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Atleta 1"
                fullWidth
                select
                required
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.athlete1}
              >
                <MenuItem value="">-- Selecionar --</MenuItem>
                {membersNotInEventData?.data.results.map(
                  (item: any, index: any) => (
                    <MenuItem key={index} value={item.id}>
                      {item.full_name}
                    </MenuItem>
                  )
                )}
              </TextField>
            )}
          ></Controller>
        </Grid>
        <Grid container size={4} p={2}>
          <Controller
            name="athlete2"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Atleta 2"
                fullWidth
                select
                required
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.athlete1}
              >
                <MenuItem value="">-- Selecionar --</MenuItem>
                {membersNotInEventData?.data.results.map(
                  (item: any, index: any) => (
                    <MenuItem key={index} value={item.id}>
                      {item.full_name}
                    </MenuItem>
                  )
                )}
              </TextField>
            )}
          ></Controller>
        </Grid>
        <Grid container size={4} p={2}>
          <Controller
            name="athlete3"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Atleta 3"
                fullWidth
                select
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.athlete1}
              >
                <MenuItem value="">-- Selecionar --</MenuItem>
                {membersNotInEventData?.data.results.map(
                  (item: any, index: any) => (
                    <MenuItem key={index} value={item.id}>
                      {item.full_name}
                    </MenuItem>
                  )
                )}
              </TextField>
            )}
          ></Controller>
        </Grid>
      </Grid>
    </Dialog>
  );
}
