import {
  Dialog,
  DialogContent,
  IconButton,
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
import { Controller, useForm } from "react-hook-form";
import { membersHooks } from "../../hooks";
import { GraduationsOptions, GenderOptions } from "../../config";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditMemberModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    id: string;
  }>,
) {
  const { data: singleMemberData, isLoading: isSingleMemberLoading } =
    membersHooks.useFetchSingleMemberData(props.id);

  const {
    control: memberControl,
    handleSubmit: memberHandleSubmit,
    reset: memberReset,
    formState: { errors: memberErrors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      graduation: "",
      category: "",
      id_number: null,
      gender: "",
      is_student: false,
      birthDate: "",
    },
  });

  React.useEffect(() => {
    // update the form with that member info
    const formData = {
      firstName: singleMemberData?.first_name,
      lastName: singleMemberData?.last_name,
      graduation: singleMemberData?.graduation ?? "",
      gender: singleMemberData?.gender ?? "",
      birthDate: singleMemberData?.birth_date,
    };
    memberReset(formData);
  }, [singleMemberData]);

  const updateMemberData = membersHooks.useUpdateMemberData();

  const onSubmit = (data: any) => {
    const formData = {
      first_name: data?.firstName,
      last_name: data?.lastName,
      graduation: data?.graduation,
      gender: data?.gender,
      id_number: data?.id_number,
      birth_date: data?.birthDate ?? null,
    };
    updateMemberData.mutate({ memberId: props.id, data: formData });
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
        <Toolbar style={{ paddingRight: 0 }}>
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
          </Typography>
          <Button
            sx={{ bgcolor: "#2e7d32", mr: 2 }}
            autoFocus
            color="inherit"
            size="large"
            onClick={() => {
              memberHandleSubmit(onSubmit)();
              props.handleModalClose();
            }}
            // disabled={membersNotInEventData?.length === 0}
          >
            Guardar
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        {isSingleMemberLoading ? (
          <Grid container justifyContent="center" size={12}>
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container justifyContent={"center"}>
            <Grid sx={{ m: 2 }} size={8}>
              <Controller
                name="firstName"
                control={memberControl}
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
                    error={!!memberErrors.firstName}
                    helperText={memberErrors.firstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid sx={{ m: 2 }} size={8}>
              <Controller
                name="lastName"
                control={memberControl}
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
                    error={!!memberErrors.lastName}
                    helperText={memberErrors.lastName?.message}
                  />
                )}
              />
            </Grid>
            <Grid sx={{ m: 2 }} size={8}>
              <Controller
                name="graduation"
                control={memberControl}
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
                    error={!!memberErrors.graduation}
                    helperText={memberErrors.graduation?.message}
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
                control={memberControl}
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
                    error={!!memberErrors.graduation}
                    helperText={memberErrors.graduation?.message}
                  >
                    {GenderOptions.filter((item) =>
                      ["Masculino", "Feminino"].includes(item.label),
                    ).map((item, index) => (
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
