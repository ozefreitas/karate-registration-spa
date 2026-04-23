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
  Chip,
  MenuItem,
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
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../access/GlobalAuthProvider";
import { getGraduationFromValue, GraduationsOptions } from "../../config";
import { Disciplines, Persons, NotAdminLikeTypePersons } from "../../openapi";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginRight: 20,
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
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MembersModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    eventData: any;
    disciplinesData: any;
  }>,
) {
  const navigate = useNavigate();
  const { id: eventId } = useParams<{ id: string }>();
  const { user } = useAuth();
  const userRole = user?.role;

  const [page, setPage] = useState<number>(0);
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

  const [isDisciplineScreenOpen, setIsDisciplineScreenOpen] =
    useState<boolean>(false);
  const [isWeightInputScreenOpen, setIsWeightInputScreenOpen] =
    useState<boolean>(false);
  const [doesNotHaveWeight, setDoesNotHaveWeight] = useState<boolean>(false);
  const [freeClubWeight, setFreeClubWeight] = useState<string>("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentMemberId, setCurrentMemberId] = useState<string>("");
  const [disciplinesFree, setDisciplinesFree] = useState<string[]>([]);
  const [isMutationDelayActive, setIsMutationDelayActive] =
    useState<boolean>(false);
  const [possibleCategories, setPossibleCategories] = React.useState<string[]>(
    [],
  );

  const handleBackButtonClick = () => {
    setPage(page - 1);
  };

  const handleNextButtonClick = () => {
    setPage(page + 1);
  };

  const {
    data: membersNotInEventData,
    isLoading: isMembersNotInEventLoading,
    error: membersNotInEventError,
    refetch,
  } = membersHooks.useFetchMembersNotInEvent(
    eventId!,
    page + 1,
    10,
    undefined,
    false,
  );

  React.useEffect(() => {
    if (props.isModalOpen) {
      refetch();
    }
  }, [props.isModalOpen]);

  const { data: disciplinesFreeData } =
    membersHooks.useFetchDisciplinesnotInMemberData(
      currentMemberId,
      props.eventData?.id,
    );

  React.useEffect(() => {
    if (!disciplinesFreeData) return;

    type UnregisteredModalitiesResponse = Disciplines[];

    const newDisciplines = (
      disciplinesFreeData as unknown as UnregisteredModalitiesResponse
    ).map((modalities) => `${modalities.name}_${modalities.id}`);

    setDisciplinesFree(newDisciplines);
  }, [disciplinesFreeData]);

  React.useEffect(() => {
    const defaultValues: any = { category: false, chosen_category: "" };
    props.disciplinesData?.results.forEach((discipline: any) => {
      defaultValues[`${discipline.name}_${discipline.id}`] = false;
    });

    if (!isDisciplineScreenOpen) {
      reset(defaultValues);
    }
  }, [props.disciplinesData, isDisciplineScreenOpen]);

  const addEventMember = eventsHooks.useAddEventMember();

  const handleIndividualsSubmit = (memberList: string[]) => {
    if (memberList.length === 0) {
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
      memberList.forEach((member: string) => {
        const memberData = { member_id: member };
        const data = { eventId: props.eventData.id, data: memberData };
        addEventMember.mutate(data);
      });
      setChecked([]);
      props.handleModalClose();
    }
  };

  const handleDisciplineScreenOpen = () => {
    setIsDisciplineScreenOpen(true);
  };

  const handleDisciplineScreenClose = () => {
    setCurrentMemberId("");
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

  type FormValues = Record<string, boolean>;

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const addDisciplineMember = disciplinesHooks.useAddDisciplineMember();
  const patchMember = membersHooks.usePatchMemberData();

  const onSubmit = async (data: any) => {
    if (
      Object.entries(data)
        .filter(([key]) => key !== "chosen_category")
        .every(([, value]) => value === false) &&
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
      // free dojos must go thought this screen to confirm member weight and change it if needed, since they don't have access to the profile pages
    } else if (
      !isWeightInputScreenOpen &&
      userRole === "free_club" &&
      props.eventData.has_categories
    ) {
      const target: any = filteredMembers?.find(
        (member: Persons) => member.id === currentMemberId,
      );
      const hasWeight = target?.weight !== null;
      setDoesNotHaveWeight(!hasWeight);
      setFreeClubWeight(target[0].weight ?? "");
      handleWeightInputScreenOpen();
      return;
    }
    setIsMutationDelayActive(true);

    try {
      if (isWeightInputScreenOpen) {
        const target: any = filteredMembers?.find(
          (member: Persons) => member.id === currentMemberId,
        );
        if (target[0].weight !== freeClubWeight) {
          const payload = {
            personId: currentMemberId,
            data: { weight: freeClubWeight },
          };
          await patchMember.mutateAsync(payload);
        }
      }

      const entries = Object.entries(data).filter(([, value]) => value);
      const disciplinesFiltered = entries.filter(
        ([item]) => !["category", "chosen_category"].includes(item),
      );

      const results = await Promise.allSettled(
        disciplinesFiltered.map(([discipline]) => {
          const payload = {
            disciplineId: discipline.split("_")[1],
            data: {
              member_id: currentMemberId,
              event_id: props.eventData.id,
              chosen_category: data.chosen_category,
            },
          };
          return addDisciplineMember.mutateAsync(payload);
        }),
      );

      const hasError = results.some((r) => r.status === "rejected");
      const hasWeightWarning = results.some(
        (r: any) => r.value.status == "info" && !r.value.category_ids,
      );

      const hasMultipleCategories = results.some((r: any) => {
        if (r.value.status == "info" && r.value.category_ids) {
          setPossibleCategories(r.value.category_ids);
          return true;
        }
        return false;
      });

      if (hasMultipleCategories) {
        setValue("category", true);
      } else if (hasWeightWarning) {
        handleWeightInputScreenOpen();
      } else if (hasError) {
        handleDisciplineScreenClose();
        setPossibleCategories([]);
        reset();
      } else {
        setDisciplinesFree([]);
        await refetch();
        setTimeout(() => {
          handleDisciplineScreenClose();
          setIsWeightInputScreenOpen(false);
        }, 500);
        setPossibleCategories([]);
      }

      setIsMutationDelayActive(false);
    } catch {
      setIsMutationDelayActive(false);
      setPossibleCategories([]);
    }
  };

  const filteredMembers = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return membersNotInEventData?.results ?? [];

    return membersNotInEventData?.results.filter((member: any) => {
      return (
        member.full_name.toLowerCase().includes(query) ||
        member.id_number === Number(query)
      );
    });
  }, [searchQuery, membersNotInEventData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Dialog
      open={props.isModalOpen}
      onClose={() => {
        setIsDisciplineScreenOpen(false);
        setPage(0);
        setPossibleCategories([]);
        props.handleModalClose();
      }}
      maxWidth={possibleCategories.length > 0 ? "lg" : "md"}
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
                membersNotInEventData?.results.find(
                  (member) => member.id === currentMemberId,
                )?.full_name
              }{" "}
              em {props.eventData?.name}
            </Typography>
          ) : (
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Inscrever em {props.eventData?.name}
            </Typography>
          )}
          {membersNotInEventData?.results.length !== 0 &&
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
          props.disciplinesData?.results.length === 0 ||
          (isWeightInputScreenOpen && userRole !== "free_club") ? (
            <Button
              sx={{ bgcolor: "#2e7d32", mx: 2 }}
              autoFocus
              color="inherit"
              size="large"
              onClick={() => {
                if (isDisciplineScreenOpen || isWeightInputScreenOpen) {
                  handleSubmit(onSubmit)();
                } else {
                  handleIndividualsSubmit(checked);
                }
              }}
              disabled={membersNotInEventData?.results.length === 0}
            >
              Adicionar
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ pb: 0 }}>
        {isDisciplineScreenOpen ? (
          <Grid container size={12}>
            <Grid ml={3} size={1}>
              <Tooltip title="Voltar atrás">
                <span>
                  <IconButton
                    onClick={() => {
                      setCurrentMemberId("");
                      handleDisciplineScreenClose();
                    }}
                    aria-label="back to member viwer"
                  >
                    <KeyboardArrowLeft />
                  </IconButton>
                </span>
              </Tooltip>
            </Grid>
            <Grid size={10}>
              <Typography sx={{ m: 1, mb: 2 }}>
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

            {watch("category") && !isMutationDelayActive ? (
              <Grid p={2} container size={12}>
                <FormHelperText sx={{ p: 2, pt: 0 }} error>
                  Escolha entre os Escalões possíveis para este Membro.
                </FormHelperText>
                <Controller
                  name="chosen_category"
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
                      <MenuItem
                        sx={{ px: 3, py: 1, color: "lightgrey" }}
                        value={undefined}
                      >
                        -- Selecionar --
                      </MenuItem>
                      {props.disciplinesData.results[0].categories
                        ?.filter((item: any) =>
                          possibleCategories.includes(item.id),
                        )
                        .map((item: any, index: any) => (
                          <MenuItem key={index} value={item.id}>
                            <Grid
                              container
                              spacing={2}
                              py={1}
                              px={3}
                              alignContent={"center"}
                            >
                              <Typography mr={2}>
                                {item.name} {item.gender}
                              </Typography>
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
                                  getGraduationFromValue(
                                    Number(item.min_grad),
                                  ) ?? "N/A"
                                }`}
                              ></Chip>
                              <Chip
                                size="small"
                                label={`Graduação Máx.: ${
                                  getGraduationFromValue(
                                    Number(item.max_grad),
                                  ) ?? "N/A"
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
            {props.eventData.has_categories ? (
              <FormHelperText sx={{ p: 1, py: 2 }}>
                O escalão será calculado automaticamente de acordo com os
                Escalões disponíveis para cada uma destas Modalidades. <br />
                Também a graduação e pesos (quando obrigatórios) serão
                verificados.
              </FormHelperText>
            ) : (
              <FormHelperText sx={{ p: 1, py: 2 }}>
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
                  <span>
                    <IconButton
                      onClick={() => {
                        handleWeightInputScreenClose();
                        handleDisciplineScreenOpen();
                      }}
                      aria-label="back to disciplines viwer"
                    >
                      <KeyboardArrowLeft />
                    </IconButton>
                  </span>
                </Tooltip>
              </Grid>
              <Grid size={11}>
                <Typography sx={{ m: 1, mb: 3 }}>
                  O escalão disponível na Modalidade encontrada requer um peso.
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
                        `/members/${currentMemberId}/?edit_field=weight&event_id=${props.eventData.id}&section=personal_info`,
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
            {isMembersNotInEventLoading ? (
              <Grid mt={3} p={2} height={100} justifyContent="center" size={12}>
                <CircularProgress />
              </Grid>
            ) : membersNotInEventError ? (
              <div>Ocorreu um erro</div>
            ) : filteredMembers?.length === 0 ? (
              <ListItem>
                <ListItemText primary="Não tem atletas que ainda não estejam inscritos nesta prova."></ListItemText>
              </ListItem>
            ) : userRole === "free_club" && searchQuery === "" ? (
              <ListItem>
                <ListItemText primary="O seu plano não concede acesso à listagem de Atletas. Pesquise pelo Nº de Indentificação ou nome do Membro, ou inicie uma subscrição."></ListItemText>
              </ListItem>
            ) : (
              filteredMembers?.map((member: any, index: number) => (
                <ListItem
                  key={index}
                  disablePadding
                  secondaryAction={
                    props.disciplinesData?.count === 0 ? (
                      <label>
                        <Checkbox
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                          edge="end"
                          onChange={() => handleToggle(member.id)}
                          checked={checked.includes(member.id)}
                          slotProps={{
                            input: {
                              "aria-labelledby": `checkbox-list-secondary-label-${member.full_name}-${index}`,
                            },
                          }}
                        />
                      </label>
                    ) : (
                      <Tooltip title="Selecionar Modalidade">
                        <span>
                          <IconButton
                            onClick={() => {
                              setCurrentMemberId(member.id);
                              handleDisciplineScreenOpen();
                            }}
                            aria-label="go to disciplines selection"
                          >
                            <KeyboardArrowRight color="success" />
                          </IconButton>
                        </span>
                      </Tooltip>
                    )
                  }
                >
                  <ListItemButton
                    key={index}
                    onClick={() => {
                      if (props.disciplinesData?.count === 0) {
                        handleToggle(member.id);
                      } else {
                        setCurrentMemberId(member.id);
                        handleDisciplineScreenOpen();
                      }
                    }}
                  >
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${member.full_name}`}
                      secondary={
                        <Grid container spacing={2} mt={1}>
                          <Chip size="small" label={member.gender}></Chip>
                          <Chip
                            size="small"
                            label={`${member.age} anos (calculada)`}
                          ></Chip>
                          <Chip
                            size="small"
                            label={
                              GraduationsOptions.find(
                                (item) =>
                                  item.value === Number(member.graduation),
                              )?.label
                            }
                          ></Chip>
                          <Chip
                            size="small"
                            label={`Peso: ${
                              member.weight ? `${member.weight} Kg` : "N/A"
                            }`}
                          ></Chip>
                        </Grid>
                      }
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
      !membersNotInEventData?.count ? null : (
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
              {Math.ceil(membersNotInEventData?.count / 10)}
            </Typography>
            <Tooltip title="Página anterior">
              <span>
                <IconButton
                  onClick={handleBackButtonClick}
                  disabled={page === 0}
                  aria-label="previous page"
                >
                  <KeyboardArrowLeft />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Próxima página">
              <span>
                <IconButton
                  onClick={handleNextButtonClick}
                  disabled={
                    !membersNotInEventData?.count ||
                    membersNotInEventData?.count <= (page + 1) * 10
                  }
                  aria-label="next page"
                >
                  <KeyboardArrowRight />
                </IconButton>
              </span>
            </Tooltip>
          </>
        </DialogActions>
      )}
    </Dialog>
  );
}
