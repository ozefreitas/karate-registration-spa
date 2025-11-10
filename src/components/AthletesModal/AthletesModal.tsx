import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Tooltip,
  Grid,
  Stack,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
  Checkbox,
  Box,
  CircularProgress,
  ListItemIcon,
  TextField,
} from "@mui/material";
import { useState } from "react";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  Close,
  KeyboardArrowRight,
  KeyboardArrowLeft,
  Person,
} from "@mui/icons-material";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { eventsHooks, membersHooks, disciplinesHooks } from "../../hooks";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../access/GlobalAuthProvider";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AthletesModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    eventData: any;
  }>
) {
  type Member = {
    age: any;
    id: string;
    first_name: string;
    last_name: string;
    category: string;
    gender: string;
    weight: string;
  };

  const navigate = useNavigate();
  const { id: eventId } = useParams<{ id: string }>();
  const { user } = useAuth();
  const userRole = user?.data.role;

  const [page, setPage] = useState<number>(0);

  const handleBackButtonClick = () => {
    setPage(page - 1);
  };

  const handleNextButtonClick = () => {
    setPage(page + 1);
  };

  const [checked, setChecked] = React.useState<string[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleToggle = (value: string) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const addEventAthlete = eventsHooks.useAddEventAthlete();

  const handleIndividualsSubmit = (athleteList: string[]) => {
    if (athleteList.length === 0) {
      enqueueSnackbar("Tem de selecionar pelo menos um atleta.", {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
    } else {
      athleteList.forEach((athlete: string) => {
        const athleteData = { member_id: athlete };
        const data = { eventId: props.eventData.id, data: athleteData };
        addEventAthlete.mutate(data);
      });
      setChecked([]);
      props.handleModalClose();
    }
  };

  const [isDisciplineScreenOpen, setIsDisciplineScreenOpen] =
    useState<boolean>(false);
  const [isWeightInputScreenOpen, setIsWeightInputScreenOpen] =
    useState<boolean>(false);
  const [doesNotHaveWeight, setDoesNotHaveWeight] = useState<boolean>(false);
  const [freeClubWeight, setFreeClubWeight] = useState<string>("");

  const handleDisciplineScreenOpen = () => {
    setIsDisciplineScreenOpen(true);
  };

  const handleDisciplineScreenClose = () => {
    setCurrentAthleteId("");
    setIsDisciplineScreenOpen(false);
  };

  const handleWeightInputScreenOpen = () => {
    setIsDisciplineScreenOpen(false);
    setIsWeightInputScreenOpen(true);
    setIsMutationDelayActive(false);
  };

  const handleWeightInputScreenClose = () => {
    setIsWeightInputScreenOpen(false);
  };

  const location = useLocation();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentAthleteId, setCurrentAthleteId] = useState<string>("");
  const [disciplinesFree, setDisciplinesFree] = useState<string[]>([]);
  const [isMutationDelayActive, setIsMutationDelayActive] =
    useState<boolean>(false);

  const { data: modalitiesFreeData } =
    membersHooks.useFetchDisciplinesnotInAthleteData(
      currentAthleteId,
      props.eventData?.id
    );

  React.useEffect(() => {
    if (!modalitiesFreeData?.data) return;

    const newDisciplines = modalitiesFreeData.data.map(
      (modalities: any) => `${modalities.name}_${modalities.id}`
    );

    setDisciplinesFree(newDisciplines);
  }, [modalitiesFreeData]);

  const { data: disciplinesData } = disciplinesHooks.useFetchDisciplinesData(
    eventId!
  );

  React.useEffect(() => {
    const defaultValues: any = {};
    disciplinesData?.data.results.forEach((discipline: any) => {
      defaultValues[`${discipline.name}_${discipline.id}`] = false;
    });

    reset(defaultValues);
  }, [disciplinesData]);

  type FormValues = Record<string, boolean>;

  const {
    control,
    handleSubmit,
    reset,
    // setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const addDisciplineAthlete = disciplinesHooks.useAddDisciplineAthlete();
  const patchMember = membersHooks.usePatchMemberData();

  const onSubmit = async (data: any) => {
    if (
      Object.values(data).every((value) => value === false) &&
      !isWeightInputScreenOpen
    ) {
      enqueueSnackbar("Tem de selecionar pelo menos uma modalidade.", {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      return;
      // free dojos must go thought this screen to confirm athlete weight and change it if needed, since they don't have access to the profile pages
    } else if (
      !isWeightInputScreenOpen &&
      userRole === "free_club" &&
      props.eventData.has_categories
    ) {
      const target = filteredAthletes.find(
        (athlete: any) => athlete.id === currentAthleteId
      );
      const hasWeight = target[0].weight !== null;
      setDoesNotHaveWeight(!hasWeight);
      setFreeClubWeight(target[0].weight ?? "");
      handleWeightInputScreenOpen();
      return;
    }
    setIsMutationDelayActive(true);

    try {
      if (isWeightInputScreenOpen) {
        const target = filteredAthletes.find(
          (athlete: any) => athlete.id === currentAthleteId
        );
        if (target[0].weight !== freeClubWeight) {
          const payload = {
            memberId: currentAthleteId,
            data: { weight: freeClubWeight },
          };
          await patchMember.mutateAsync(payload);
        }
      }

      const entries = Object.entries(data).filter(([, value]) => value);

      console.log(entries);

      const results = await Promise.allSettled(
        entries.map(([discipline]) => {
          const payload = {
            disciplineId: discipline.split("_")[1],
            data: {
              member_id: currentAthleteId,
              event_id: props.eventData.id,
            },
          };
          return addDisciplineAthlete.mutateAsync(payload);
        })
      );

      const hasError = results.some((r) => r.status === "rejected");
      const hasWarning = results.some(
        (r: any) => r.value.data.status == "info"
      );

      if (hasWarning) {
        handleWeightInputScreenOpen();
      } else {
        if (!hasError) {
          setDisciplinesFree([]);
          await refetch();
          setTimeout(() => {
            handleDisciplineScreenClose();
            setIsWeightInputScreenOpen(false);
          }, 500);
        } else {
          handleDisciplineScreenClose();
          reset();
        }
      }

      setIsMutationDelayActive(false);
    } catch {
      setIsMutationDelayActive(false);
    }
  };

  const {
    data: athletesNotInEventData,
    isLoading: isAthletesNotInEventLoading,
    error: athletesNotInEventError,
    refetch,
  } = membersHooks.useFetchAthletesNotInEvent(eventId!, page + 1, 10);

  React.useEffect(() => {
    refetch();
  }, [location]);

  const filteredAthletes = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return athletesNotInEventData?.data.results ?? [];

    return athletesNotInEventData?.data.results.filter((athlete: any) => {
      const fullName =
        `${athlete.first_name} ${athlete.last_name}`.toLowerCase();
      return (
        athlete.first_name.toLowerCase().includes(query) ||
        athlete.last_name.toLowerCase().includes(query) ||
        fullName.includes(query) ||
        athlete.id_number === Number(query)
      );
    });
  }, [searchQuery, athletesNotInEventData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Dialog
      // keepMounted
      open={props.isModalOpen}
      onClose={() => {
        setIsDisciplineScreenOpen(false);
        setPage(0);
        props.handleModalClose();
      }}
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
            onClick={() => {
              handleDisciplineScreenClose();
              props.handleModalClose();
            }}
            aria-label="close"
          >
            <Close />
          </IconButton>
          {isDisciplineScreenOpen ? (
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Inscrever{" "}
              {
                athletesNotInEventData?.data.results.find(
                  (athlete: Member) => athlete.id === currentAthleteId
                )?.full_name
              }{" "}
              em {props.eventData?.name}
            </Typography>
          ) : (
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Inscrever em {props.eventData?.name}
            </Typography>
          )}
          {athletesNotInEventData?.data.results.length !== 0 &&
          !isDisciplineScreenOpen &&
          !isWeightInputScreenOpen ? (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Procurar"
                inputProps={{ "aria-label": "procurar" }}
                value={searchQuery}
                onChange={handleInputChange}
              />
            </Search>
          ) : null}
          {isDisciplineScreenOpen ||
          disciplinesData?.data.results.length === 0 ||
          (isWeightInputScreenOpen && userRole !== "free_club") ? (
            <Button
              autoFocus
              size="large"
              color="inherit"
              onClick={() => {
                if (isDisciplineScreenOpen || isWeightInputScreenOpen) {
                  handleSubmit(onSubmit)();
                } else {
                  handleIndividualsSubmit(checked);
                }
              }}
              disabled={athletesNotInEventData?.data.results.length === 0}
            >
              Adicionar
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ pb: 0 }}>
        {isDisciplineScreenOpen ? (
          <Grid container size={12}>
            <Grid size={1}>
              <Tooltip title="Voltar atrás">
                <IconButton
                  onClick={() => {
                    setCurrentAthleteId("");
                    handleDisciplineScreenClose();
                  }}
                  aria-label="back to athlete viwer"
                >
                  <KeyboardArrowLeft />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid size={11}>
              <Typography sx={{ m: 1, mb: 3 }}>
                Estas são as Modalidades disponíveis para este Evento. Selecione
                {props.eventData.has_categories ? " as tais" : " a tal"} em que
                este Atleta irá participar.
              </Typography>
            </Grid>
            {disciplinesFree.length !== 0 && !isMutationDelayActive ? (
              Object.keys(control._defaultValues)
                .filter((fieldName) => disciplinesFree?.includes(fieldName))
                .map((fieldName) => (
                  <Grid
                    key={fieldName}
                    size={12}
                    container
                    sx={{ p: 1 }}
                    justifyContent="center"
                  >
                    <Controller
                      name={fieldName}
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          component="fieldset"
                          variant="standard"
                          error={!!errors[fieldName]}
                        >
                          <Stack spacing={1}>
                            <FormControlLabel
                              labelPlacement="start"
                              control={
                                <Switch
                                  {...field}
                                  checked={field.value}
                                  onChange={(e) => {
                                    field.onChange(e.target.checked);
                                    // if (e.target.checked) {
                                    //   // turn all OFF, then only this one ON
                                    //   Object.keys(
                                    //     control._defaultValues
                                    //   ).forEach((name) => {
                                    //     // all defaultValues are set to False if the currernt field is not the one being clicked on
                                    //     setValue(name, name === fieldName, {
                                    //       shouldValidate: true,
                                    //       shouldDirty: true,
                                    //     });
                                    //   });
                                    // } else {
                                    //   // allow turning everything off if you want
                                    //   field.onChange(false);
                                    // }
                                  }}
                                  name={fieldName}
                                />
                              }
                              label={fieldName.split("_")[0]}
                              sx={{ justifyContent: "center", marginLeft: 0 }}
                            />
                            {!!errors[fieldName] && (
                              <FormHelperText error sx={{ marginLeft: "14px" }}>
                                {errors[fieldName].message}
                              </FormHelperText>
                            )}
                          </Stack>
                        </FormControl>
                      )}
                    />
                  </Grid>
                ))
            ) : (
              <Grid container justifyContent="center" size={12}>
                <CircularProgress />
              </Grid>
            )}
            {props.eventData.has_categories ? (
              <FormHelperText sx={{ pt: 1 }}>
                O escalão será calculado automaticamente de acordo com os
                Escalões disponíveis para cada uma destas Modalidades. <br />
                Também a graduação e pesos (quando obrigatórios) serão
                verificados.
              </FormHelperText>
            ) : (
              <FormHelperText sx={{ pt: 1 }}>
                Apenas poderá selecionar uma Modalidade para cada Aluno. Quando
                inscrito, este Aluno não voltará a aparecer na lista de seleção,
                para isso terá de o eliminar da Modalidade corrente, e inscrever
                de novo na correta.
              </FormHelperText>
            )}
          </Grid>
        ) : isWeightInputScreenOpen ? (
          isMutationDelayActive ? (
            <Grid sx={{ mt: 3, p: 2 }} justifyContent="center" size={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </Box>
            </Grid>
          ) : (
            <Grid container size={12}>
              <Grid size={1}>
                <Tooltip title="Voltar atrás">
                  <IconButton
                    onClick={() => {
                      handleWeightInputScreenClose();
                      handleDisciplineScreenOpen();
                    }}
                    aria-label="back to disciplines viwer"
                  >
                    <KeyboardArrowLeft />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid size={11}>
                <Typography sx={{ m: 1, mb: 3 }}>
                  O escalão disponível na Modalidade encontrada requer um peso,
                  {userRole === "free_club"
                    ? doesNotHaveWeight
                      ? " e este Atleta não tem um peso associado."
                      : " e este Atleta já tem um peso associado."
                    : null}
                  <br />
                  {userRole === "free_club"
                    ? doesNotHaveWeight
                      ? "Insira o peso do Atleta no campo seguinte para prosseguir."
                      : "Confirme o peso do Atleta para prosseguir."
                    : "Dirija-se à pagina e insira o peso deste Atleta clicando neste botão."}
                </Typography>
              </Grid>
              <Grid sx={{ p: 2 }} size={12} container justifyContent="center">
                {userRole === "free_club" ? (
                  <Grid
                    container
                    justifyContent="space-evenly"
                    alignItems="center"
                    size={12}
                  >
                    <TextField
                      color="warning"
                      variant={"outlined"}
                      label="Peso"
                      required
                      value={freeClubWeight}
                      onChange={(e) => {
                        setFreeClubWeight(e.target.value);
                      }}
                    />
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleSubmit(onSubmit)()}
                    >
                      Prosseguir
                    </Button>
                  </Grid>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => {
                      navigate(
                        `/members/${currentAthleteId}/?edit_field=weight&event_id=${props.eventData.id}`
                      );
                    }}
                  >
                    Ir para Atleta
                  </Button>
                )}
              </Grid>
            </Grid>
          )
        ) : (
          <List>
            {isAthletesNotInEventLoading ? (
              <Grid sx={{ mt: 3, p: 2 }} justifyContent="center" size={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              </Grid>
            ) : athletesNotInEventError ? (
              <div>Ocorreu um erro</div>
            ) : filteredAthletes.length === 0 ? (
              <ListItem>
                <ListItemText primary="Não tem atletas que ainda não estejam inscritos nesta prova."></ListItemText>
              </ListItem>
            ) : userRole === "free_club" && searchQuery === "" ? (
              <ListItem>
                <ListItemText primary="O seu plano não concede acesso à listagem de atletas. Pesquise pelo Nº de Indentificação ou nome do Membro, ou inicie uma subscrição."></ListItemText>
              </ListItem>
            ) : (
              filteredAthletes.map((athlete: Member, index: string) => (
                <ListItem
                  key={index}
                  disablePadding
                  secondaryAction={
                    disciplinesData?.data.results.length === 0 ? (
                      <label>
                        <Checkbox
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                          edge="end"
                          onChange={() => handleToggle(athlete.id)}
                          checked={checked.includes(athlete.id)}
                          slotProps={{
                            input: {
                              "aria-labelledby": `checkbox-list-secondary-label-${athlete.first_name}`,
                            },
                          }}
                        />
                      </label>
                    ) : (
                      <Tooltip title="Selecionar Modalidade">
                        <IconButton
                          onClick={() => {
                            setCurrentAthleteId(athlete.id);
                            handleDisciplineScreenOpen();
                          }}
                          aria-label="go to disciplines selection"
                        >
                          <KeyboardArrowRight color="success" />
                        </IconButton>
                      </Tooltip>
                    )
                  }
                >
                  <ListItemButton
                    key={index}
                    onClick={() => {
                      setCurrentAthleteId(athlete.id);
                      handleDisciplineScreenOpen();
                      handleToggle(athlete.id);
                    }}
                  >
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${athlete.first_name} ${athlete.last_name}`}
                      secondary={`${athlete.gender} / Idade calculada: ${
                        athlete.age
                      } / Peso: ${athlete.weight ?? "N/A"}`}
                    />
                  </ListItemButton>
                  <Divider />
                </ListItem>
              ))
            )}
          </List>
        )}
      </DialogContent>
      {isDisciplineScreenOpen ||
      isWeightInputScreenOpen ||
      !athletesNotInEventData?.data?.count ? null : (
        <DialogActions sx={{ pr: 4, pb: 2 }}>
          <>
            <Typography variant="body1" mr={1} color="textSecondary">
              Página:
            </Typography>
            <Typography mr={1}>{page + 1}</Typography>
            <Typography variant="body1" mr={1} color="textSecondary">
              de
            </Typography>
            <Typography mr={2}>
              {Math.ceil(athletesNotInEventData?.data.count / 10)}
            </Typography>
            <Tooltip title="Página anterior">
              <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
              >
                <KeyboardArrowLeft />
              </IconButton>
            </Tooltip>
            <Tooltip title="Próxima página">
              <IconButton
                onClick={handleNextButtonClick}
                disabled={
                  !athletesNotInEventData?.data?.count ||
                  athletesNotInEventData?.data.count <= (page + 1) * 10
                }
                aria-label="next page"
              >
                <KeyboardArrowRight />
              </IconButton>
            </Tooltip>
          </>
        </DialogActions>
      )}
    </Dialog>
  );
}
