import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { Controller, set, useForm } from "react-hook-form";
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
import { membersHooks, disciplinesHooks } from "../../hooks";
import { GenderOptions, getGraduationFromValue } from "../../config";
import { useNavigate, useParams } from "react-router-dom";
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
  const { id: eventId } = useParams<{ id: string }>();

  const [possible_categories, setPossibleCategories] = React.useState<string[]>(
    []
  );

  const addDisciplineTeam = disciplinesHooks.useAddDisciplineTeam();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      athlete1: "",
      athlete2: "",
      athlete3: "",
      category: "",
      gender: "",
      is_category_visible: false,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await addDisciplineTeam.mutateAsync(
        {
          disciplineId: props.disciplineData.id,
          data: {
            athlete1: data.athlete1,
            athlete2: data.athlete2,
            athlete3: data.athlete3,
            gender: data.gender,
            chosen_category: data.category,
          },
        },
        {
          onSuccess: (data: any) => {
            if (data.data.status === "info") {
              setValue("is_category_visible", true);
              setPossibleCategories(data.data.category_ids);
            } else {
              reset();
              props.handleModalClose();
            }
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const selectedGender =
    watch("gender") === "Misto" || watch("gender") === ""
      ? undefined
      : watch("gender");

  const {
    data: membersNotInEventData,
    // isLoading: isMembersNotInEventLoading,
    // error: membersNotInEventError,
    // refetch,
  } = membersHooks.useFetchMembersNotInEvent(
    eventId!,
    1,
    100,
    selectedGender,
    props.isModalOpen && watch("gender") !== undefined,
    true,
    props.disciplineData?.id
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
        <Toolbar style={{ paddingRight: 0 }}>
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
            sx={{ bgcolor: "#2e7d32", mr: 2 }}
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
      <Grid container size={12} px={{ xs: 2, sm: 5 }} pt={3}>
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
                disabled={watch("is_category_visible")}
                {...field}
                onChange={(e) => {
                  reset();
                  field.onChange(e);
                }}
                error={!!errors.gender}
              >
                <MenuItem sx={{ color: "lightgrey" }} value={""}>
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
        {watch("is_category_visible") ? (
          <Grid container size={12} p={2}>
            <FormHelperText sx={{ p: 2, pt: 0 }} error>
              Escolha entre os Escalões possíveis para esta Equipa, de acordo
              com os Atletas que selecionou anteriormente
            </FormHelperText>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Escalão"
                  fullWidth
                  select
                  required
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={true}
                >
                  <MenuItem sx={{ color: "lightgrey" }} value={undefined}>
                    -- Selecionar --
                  </MenuItem>
                  {props.disciplineData.categories
                    ?.filter((item: any) =>
                      possible_categories.includes(item.id)
                    )
                    .map((item: any, index: any) => (
                      <MenuItem key={index} value={item.id}>
                        <Grid
                          container
                          spacing={2}
                          py={1}
                          alignContent={"center"}
                        >
                          <Typography mr={2}>{item.name}</Typography>
                          <Chip
                            size="small"
                            label={`Idade Min.: ${item.min_age ?? "N/A"} anos`}
                          ></Chip>
                          <Chip
                            size="small"
                            label={`Idade Máx.: ${item.max_age ?? "N/A"} anos`}
                          ></Chip>
                          <Chip
                            size="small"
                            label={`Graduação Min.: ${
                              getGraduationFromValue(Number(item.min_grad)) ??
                              "N/A"
                            }`}
                          ></Chip>
                          <Chip
                            size="small"
                            label={`Graduação Máx.: ${
                              getGraduationFromValue(Number(item.max_grad)) ??
                              "N/A"
                            }`}
                          ></Chip>
                          <Chip
                            size="small"
                            label={`Peso Min.: ${item.min_weight ?? "N/A"} ${
                              item.min_weight ? "Kg" : ""
                            }`}
                          ></Chip>
                          <Chip
                            size="small"
                            label={`Peso Máx.: ${item.max_weight ?? "N/A"} ${
                              item.max_weight ? "Kg" : ""
                            }`}
                          ></Chip>
                          {item.max_athletes ? (
                            <Chip
                              size="small"
                              label={`Número Máx. de Atletas (Equipas): ${
                                item.max_athletes ?? "N/A"
                              } ${item.max_athletes ? "Atletas" : ""}`}
                            ></Chip>
                          ) : null}
                        </Grid>
                      </MenuItem>
                    ))}
                </TextField>
              )}
            ></Controller>
          </Grid>
        ) : null}
        <Grid p={2} pb={0} size={12}>
          <FormHelperText sx={{ p: 2, pt: 0 }}>
            Depois selecione os Membros para formarem esta Equipa. Poderá ver
            mais informações acerca de cada Membro depois de o selecionar.
          </FormHelperText>
        </Grid>
        <Grid
          p={2}
          pt={0}
          size={12}
          container
          justifyContent={"center"}
          spacing={2}
        >
          <Grid
            container
            size={{ xs: 12, md: 6, lg: 4 }}
            alignContent={"flex-start"}
          >
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
                  disabled={
                    watch("gender") === "" || watch("is_category_visible")
                  }
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
                minHeight: "30vh",
                m: 2,
                mt: 3,
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
                        } anos (calculados)
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
                      <Chip
                        sx={{ p: 1 }}
                        label={`Escalão (previsto): 
                        ${
                          membersNotInEventData?.data.results.find(
                            (item: any) => item.id === watch("athlete1")
                          ).category
                        }
                      `}
                      ></Chip>
                    </Grid>
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid
            container
            size={{ xs: 12, md: 6, lg: 4 }}
            alignContent={"flex-start"}
          >
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
                  disabled={
                    watch("gender") === "" || watch("is_category_visible")
                  }
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
                minHeight: "30vh",
                m: 2,
                mt: 3,
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
                        } anos (calculados)
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
                      <Chip
                        sx={{ p: 1 }}
                        label={`Escalão (previsto): 
                        ${
                          membersNotInEventData?.data.results.find(
                            (item: any) => item.id === watch("athlete2")
                          ).category
                        }
                      `}
                      ></Chip>
                    </Grid>
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid
            container
            size={{ xs: 12, md: 6, lg: 4 }}
            alignContent={"flex-start"}
          >
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
                  disabled={
                    watch("gender") === "" || watch("is_category_visible")
                  }
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
                minHeight: "30vh",
                m: 2,
                mt: 3,
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
                        } anos (calculados)
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
                      <Chip
                        sx={{ p: 1 }}
                        label={`Escalão (previsto): 
                        ${
                          membersNotInEventData?.data.results.find(
                            (item: any) => item.id === watch("athlete3")
                          ).category
                        }
                      `}
                      ></Chip>
                    </Grid>
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <FormHelperText sx={{ px: 2 }}>
          O escalão será calculado automaticamente de acordo com os Escalões
          disponíveis para esta Modalidade. Também a graduação e pesos (quando
          obrigatórios) serão verificados. <br />
          No caso de haver sobreposição de idades, ser-lhe-á pedido para
          selecionar o Escalão que pretende, dentro dos possíveis.
        </FormHelperText>
      </Grid>
      <Grid container justifyContent={"end"} size={12} mr={7}>
        <Grid>
          <Button
            color="error"
            sx={{ px: 3, mb: 2 }}
            onClick={() => {
              reset();
            }}
            variant="contained"
          >
            Limpar
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
}
