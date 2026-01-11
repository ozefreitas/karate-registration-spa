import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { Controller, useForm } from "react-hook-form";
import {
  Avatar,
  Card,
  CardContent,
  Chip,
  FormHelperText,
  Grid,
  MenuItem,
  TextField,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
} from "@mui/material";
import { membersHooks, teamsHooks, disciplinesHooks } from "../../hooks";
import { GenderOptions } from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../access/GlobalAuthProvider";
import stringAvatar from "../../dashboard/utils/avatarColor";

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

  const createTeam = teamsHooks.useCreateTeam();
  const addDisciplineTeam = disciplinesHooks.useAddDisciplineTeam();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      athlete1: "",
      athlete2: "",
      athlete3: "",
      gender: undefined,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const team = await createTeam.mutateAsync(data);

      await addDisciplineTeam.mutateAsync({
        disciplineId: props.disciplineData.id,
        data: { team_id: team.data.id },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const selectedGender =
    watch("gender") === "Misto" ? undefined : watch("gender");

  const {
    data: membersNotInEventData,
    isLoading: isMembersNotInEventLoading,
    error: membersNotInEventError,
    refetch,
  } = membersHooks.useFetchMembersNotInEvent(
    eventId!,
    1,
    100,
    selectedGender,
    props.isModalOpen && watch("gender") !== undefined
  );

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
            Adicionar nova Equipa a {props.disciplineData?.name}
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={() => {
              handleSubmit(onSubmit)();
            }}
          >
            Adicionar
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container size={12} p={5} pt={3}>
        <Grid container size={12} p={2}>
          <FormHelperText sx={{ p: 2, pt: 0 }}>
            Comece por selecionar um género. Este será usado tanto para procurar
            os seus Atletas como para criar esta Equipa.
          </FormHelperText>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Género"
                fullWidth
                select
                required
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.athlete1}
              >
                <MenuItem sx={{ color: "lightgrey" }} value={undefined}>
                  -- Selecionar --
                </MenuItem>
                {GenderOptions?.filter((item) => item.value !== "Ambos").map(
                  (item: any, index: any) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  )
                )}
              </TextField>
            )}
          ></Controller>
        </Grid>
        <Grid p={2} pb={0} size={12}>
          <FormHelperText sx={{ p: 2, pt: 0 }}>
            Depois selecione os Membros para formarem esta Equipa. Poderá ver
            mais informações acerca de cada Membro depois de o selecionar.
          </FormHelperText>
        </Grid>
        <Grid container size={4} p={2} pt={0} alignContent={"flex-start"}>
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
                disabled={watch("gender") === undefined}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.athlete1}
              >
                <MenuItem sx={{ color: "lightgrey" }} value="">
                  -- Selecionar --
                </MenuItem>
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
          <Card
            elevation={watch("athlete1") === "" ? 1 : 3}
            sx={{
              width: "100%",
              minHeight: "40vh",
              m: 2,
              mt: 5,
            }}
          >
            <CardContent sx={{ textAlign: "center", p: 4, width: "100%" }}>
              {watch("athlete1") === "" ? (
                <Typography color="textDisabled" mt={8}>
                  Prévisualização indisponível. <br></br> Selecione um Atleta
                  acima.
                </Typography>
              ) : (
                <Grid
                  container
                  direction={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  spacing={2}
                >
                  <Avatar
                    {...stringAvatar(
                      membersNotInEventData?.data.results.find(
                        (item: any) => item.id === watch("athlete1")
                      ).full_name,
                      128
                    )}
                  ></Avatar>
                  <Typography variant="h4">
                    {
                      membersNotInEventData?.data.results.find(
                        (item: any) => item.id === watch("athlete1")
                      ).full_name
                    }
                  </Typography>
                  <Grid container justifyContent={"center"}>
                    <Chip
                      sx={{ p: 1 }}
                      label={`
                        ${
                          membersNotInEventData?.data.results.find(
                            (item: any) => item.id === watch("athlete1")
                          ).age
                        } anos
                      `}
                    ></Chip>
                    <Chip
                      sx={{ p: 1 }}
                      label={`
                        ${
                          membersNotInEventData?.data.results.find(
                            (item: any) => item.id === watch("athlete1")
                          ).gender
                        }
                      `}
                    ></Chip>
                    <Chip
                      sx={{ p: 1 }}
                      label={`
                        ${
                          membersNotInEventData?.data.results.find(
                            (item: any) => item.id === watch("athlete1")
                          ).weight
                        } Kg
                      `}
                    ></Chip>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid container size={4} p={2} pt={0} alignContent={"flex-start"}>
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
                disabled={watch("gender") === undefined}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.athlete2}
              >
                <MenuItem sx={{ color: "lightgrey" }} value="">
                  -- Selecionar --
                </MenuItem>
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
          <Card
            elevation={watch("athlete2") === "" ? 1 : 3}
            sx={{
              width: "100%",
              minHeight: "40vh",
              m: 2,
              mt: 5,
            }}
          >
            <CardContent sx={{ textAlign: "center", p: 4, width: "100%" }}>
              {watch("athlete2") === "" ? (
                <Typography color="textDisabled" mt={8}>
                  Prévisualização indisponível. <br></br> Selecione um Atleta
                  acima.
                </Typography>
              ) : (
                <Grid
                  container
                  direction={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  spacing={2}
                >
                  <Avatar
                    {...stringAvatar(
                      membersNotInEventData?.data.results.find(
                        (item: any) => item.id === watch("athlete2")
                      ).full_name,
                      128
                    )}
                  ></Avatar>
                  <Typography variant="h4">
                    {
                      membersNotInEventData?.data.results.find(
                        (item: any) => item.id === watch("athlete2")
                      ).full_name
                    }
                  </Typography>
                  <Grid container justifyContent={"center"}>
                    <Chip
                      sx={{ p: 1 }}
                      label={`
                        ${
                          membersNotInEventData?.data.results.find(
                            (item: any) => item.id === watch("athlete2")
                          ).age
                        } anos
                      `}
                    ></Chip>
                    <Chip
                      sx={{ p: 1 }}
                      label={`
                        ${
                          membersNotInEventData?.data.results.find(
                            (item: any) => item.id === watch("athlete2")
                          ).gender
                        }
                      `}
                    ></Chip>
                    <Chip
                      sx={{ p: 1 }}
                      label={`
                        ${
                          membersNotInEventData?.data.results.find(
                            (item: any) => item.id === watch("athlete2")
                          ).weight
                        } Kg
                      `}
                    ></Chip>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid container size={4} p={2} pt={0} alignContent={"flex-start"}>
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
                disabled={watch("gender") === undefined}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.athlete3}
              >
                <MenuItem sx={{ color: "lightgrey" }} value="">
                  -- Selecionar --
                </MenuItem>
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
          <Card
            elevation={watch("athlete3") === "" ? 1 : 3}
            sx={{
              width: "100%",
              minHeight: "40vh",
              m: 2,
              mt: 5,
            }}
          >
            <CardContent sx={{ textAlign: "center", p: 4, width: "100%" }}>
              {watch("athlete3") === "" ? (
                <Typography color="textDisabled" mt={8}>
                  Prévisualização indisponível. <br></br> Selecione um Atleta
                  acima.
                </Typography>
              ) : (
                <Grid
                  container
                  direction={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  spacing={2}
                >
                  <Avatar
                    {...stringAvatar(
                      membersNotInEventData?.data.results.find(
                        (item: any) => item.id === watch("athlete3")
                      ).full_name,
                      128
                    )}
                  ></Avatar>
                  <Typography variant="h4">
                    {
                      membersNotInEventData?.data.results.find(
                        (item: any) => item.id === watch("athlete3")
                      ).full_name
                    }
                  </Typography>
                  <Grid container justifyContent={"center"}>
                    <Chip
                      sx={{ p: 1 }}
                      label={`
                        ${
                          membersNotInEventData?.data.results.find(
                            (item: any) => item.id === watch("athlete3")
                          ).age
                        } anos
                      `}
                    ></Chip>
                    <Chip
                      sx={{ p: 1 }}
                      label={`
                        ${
                          membersNotInEventData?.data.results.find(
                            (item: any) => item.id === watch("athlete3")
                          ).gender
                        }
                      `}
                    ></Chip>
                    <Chip
                      sx={{ p: 1 }}
                      label={`
                        ${
                          membersNotInEventData?.data.results.find(
                            (item: any) => item.id === watch("athlete3")
                          ).weight
                        } Kg
                      `}
                    ></Chip>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
        <FormHelperText sx={{ p: 2, pt: 0 }}>
          O escalão será calculado automaticamente de acordo com os Escalões
          disponíveis para esta Modalidade. Também a graduação e pesos (quando
          obrigatórios) serão verificados.
        </FormHelperText>
      </Grid>
    </Dialog>
  );
}
