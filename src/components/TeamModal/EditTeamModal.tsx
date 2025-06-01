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
  FormControl,
  FormControlLabel,
} from "@mui/material";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Close } from "@mui/icons-material";
import { useUpdateTeamData } from "../../hooks/useTeamsData";
import { Controller, SubmitHandler } from "react-hook-form";
import PickOneAthleteModal from "../AthletesModal/PickOneAthleteModal";

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
    handleChoseModalClose: any;
    id: string;
    control: any;
    setValue: any;
    errors: any;
    handleSubmit: any;
  }>
) {
  type UpdateTeam = {
    athlete1Id: string;
    athlete2Id: string;
    athlete3Id: string | null;
    athlete4Id: string | null;
    athlete5Id: string | null;
  };

  const [isPickOneAthleteModalOpen, setIsPickOneAthleteModalOpen] =
    React.useState<boolean>(false);
  const [athleteNumber, setAthleteNumber] = React.useState<number | null>(null);
  const updateTeamData = useUpdateTeamData();

  const handlePickOneAthleteModalOpen = (number: number) => {
    setAthleteNumber(number);
    setIsPickOneAthleteModalOpen(true);
  };

  const handlePickOneAthleteModalClose = () => {
    setIsPickOneAthleteModalOpen(false);
  };

  const onSubmit: SubmitHandler<UpdateTeam> = (data) => {
    const formData = {
      athlete1: data.athlete1Id,
      athlete2: data.athlete2Id,
      athlete3: data.athlete3Id,
      athlete4: data.athlete4Id,
      athlete5: data.athlete5Id,
    };
    updateTeamData.mutate(
      { teamId: props.id, data: formData },
      {
        onSuccess: () => {
          props.handleChoseModalClose();
        },
      }
    );
  };

  return (
    <>
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
              Editar Equipa {props.control._formValues.category}{" "}
              {props.control._formValues.gender}{" "}
              {props.control._formValues.teamNumber}
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
                name="athlete1"
                control={props.control}
                render={({ field }) => (
                  <FormControl component="fieldset" variant="standard">
                    <FormControlLabel
                      labelPlacement="start"
                      control={
                        <>
                          {/* <Checkbox
                          {...field}
                          checked={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                            // handleKataChecked(e);
                          }}
                          name="athlete1"
                        /> */}
                          <Button
                            sx={{ ml: 2 }}
                            size="small"
                            onClick={() => handlePickOneAthleteModalOpen(1)}
                            variant="contained"
                          >
                            Alterar
                          </Button>
                          <TextField
                            sx={{ ml: 2 }}
                            disabled
                            id="athlete1"
                            {...field}
                          />
                        </>
                      }
                      label="Atleta 1:"
                    />
                  </FormControl>
                )}
              />
            </Grid>
            <Grid sx={{ m: 2 }} size={8}>
              <Controller
                name="athlete2"
                control={props.control}
                render={({ field }) => (
                  <FormControl component="fieldset" variant="standard">
                    <FormControlLabel
                      labelPlacement="start"
                      control={
                        <>
                          {/* <Checkbox
                          {...field}
                          checked={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                            // handleKataChecked(e);
                          }}
                          name="athlete1"
                        /> */}
                          <Button
                            sx={{ ml: 2 }}
                            size="small"
                            onClick={() => handlePickOneAthleteModalOpen(2)}
                            variant="contained"
                          >
                            Alterar
                          </Button>
                          <TextField
                            sx={{ ml: 2 }}
                            disabled
                            id="athlete2"
                            {...field}
                          />
                        </>
                      }
                      label="Atleta 2:"
                    />
                  </FormControl>
                )}
              />
            </Grid>
            <Grid sx={{ m: 2 }} size={8}>
              <Controller
                name="athlete3"
                control={props.control}
                render={({ field }) => (
                  <FormControl component="fieldset" variant="standard">
                    <FormControlLabel
                      labelPlacement="start"
                      control={
                        <>
                          {/* <Checkbox
                          {...field}
                          checked={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                            // handleKataChecked(e);
                          }}
                          name="athlete1"
                        /> */}
                          <Button
                            size="small"
                            sx={{ ml: 2 }}
                            onClick={() => handlePickOneAthleteModalOpen(3)}
                            variant="contained"
                          >
                            Alterar
                          </Button>
                          <TextField
                            sx={{ ml: 2 }}
                            disabled
                            id="athlete3"
                            {...field}
                          />
                        </>
                      }
                      label="Atleta 3:"
                    />
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        {/* <DialogActions></DialogActions> */}
      </Dialog>
      <PickOneAthleteModal
        isModalOpen={isPickOneAthleteModalOpen}
        handleModalClose={handlePickOneAthleteModalClose}
        setValue={props.setValue}
        control={props.control}
        number={athleteNumber}
      ></PickOneAthleteModal>
    </>
  );
}
