import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
} from "@mui/material";
import { useState } from "react";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  Close,
  KeyboardArrowRight,
  KeyboardArrowLeft,
} from "@mui/icons-material";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import {
  useFetchDisciplinesData,
  useAddDisciplineAthlete,
} from "../../hooks/useEventData";
import { useFetchAthletesNotInEvent } from "../../hooks/useAthletesData";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

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
  type Athlete = {
    id: string;
    first_name: string;
    last_name: string;
    category: string;
    gender: string;
  };

  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState<number>(0);

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setPage(page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setPage(page + 1);
  };

  const [isDisciplineScreenOpen, setIsDisciplineScreenOpen] =
    useState<boolean>(false);

  const handleDisciplineScreenOpen = () => {
    setIsDisciplineScreenOpen(true);
  };

  const handleDisciplineScreenClose = () => {
    setIsDisciplineScreenOpen(false);
  };

  const location = useLocation();
  const [currentAthleteId, setCurrentAthleteId] = useState<string>("");
  const { data: disciplinesData } = useFetchDisciplinesData(
    location.pathname.split("/").slice(-3)[0]
  );
  const addDisciplineAthlete = useAddDisciplineAthlete();

  React.useEffect(() => {
    const defaultValues: any = {};
    disciplinesData?.data.results.forEach((discipline: any) => {
      defaultValues[`${discipline.name}_${discipline.id}`] = false; // or prefill from backend if needed
    });

    reset(defaultValues);
  }, [disciplinesData]);

  type FormValues = Record<string, boolean>;

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: any) => {
    Object.entries(data).forEach(([discipline, value]) => {
      if (value) {
        const data = {
          disciplineId: discipline.split("_")[1],
          data: { athlete_id: currentAthleteId },
        };
        addDisciplineAthlete.mutate(data, {
          onSuccess: () => {
            props.handleModalClose();
            handleDisciplineScreenClose();
          },
        });
      }
    });
  };

  const {
    data: athletesNotInEventData,
    isLoading: isAthletesNotInEventLoading,
    error: athletesNotInEventError,
  } = useFetchAthletesNotInEvent(page + 1, 10);

  // const handleIndividualsSubmit = (athleteList: string[]) => {
  //   if (athleteList.length === 0) {
  //     enqueueSnackbar("Tem de selecionar pelo menos um atleta.", {
  //       variant: "warning",
  //       anchorOrigin: {
  //         vertical: "top",
  //         horizontal: "center",
  //       },
  //       autoHideDuration: 5000,
  //       preventDuplicate: true,
  //     });
  //   } else {
  //     athleteList.forEach((athlete: string) => {
  //       const athleteData = { athlete_id: athlete };
  //       const data = { eventId: props.eventData.id, data: athleteData };
  //       addEventAthlete.mutate(data);
  //     });
  //     // setChecked([]);
  //     props.handleModalClose();
  //   }
  // };

  return (
    <Dialog
      // keepMounted
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
            onClick={() => {
              handleDisciplineScreenClose();
              props.handleModalClose();
            }}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Selecionar Atletas para {props.eventData?.name}
          </Typography>
          {athletesNotInEventData?.data.length !== 0 &&
          !isDisciplineScreenOpen ? (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Procurar"
                inputProps={{ "aria-label": "procurar" }}
              />
            </Search>
          ) : null}
          {!isDisciplineScreenOpen ? null : (
            <Button
              autoFocus
              size="large"
              color="inherit"
              onClick={() => {
                handleSubmit(onSubmit)();
              }}
              disabled={athletesNotInEventData?.data.length === 0}
            >
              Adicionar
            </Button>
          )}
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
                as tais em que este Atleta irá participar.
              </Typography>
            </Grid>
            {Object.entries(control._defaultValues).map(
              ([fieldName, defaultValue]) => (
                <Grid
                  key={fieldName}
                  size={6}
                  container
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
              )
            )}
          </Grid>
        ) : (
          <List>
            {isAthletesNotInEventLoading ? (
              <div>Is Loading</div>
            ) : athletesNotInEventError ? (
              <div>Ocorreu um erro</div>
            ) : athletesNotInEventData?.data?.results.length !== 0 ? (
              athletesNotInEventData?.data?.results.map(
                (athlete: Athlete, index: string) => (
                  <ListItem
                    key={index}
                    disablePadding
                    secondaryAction={
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
                    }
                  >
                    <ListItemButton
                      key={index}
                      // onClick={() => handleToggle(athlete.id)}
                    >
                      <ListItemText
                        primary={`${athlete.first_name} ${athlete.last_name}`}
                        secondary={`${athlete.category} ${athlete.gender}`}
                      />
                    </ListItemButton>
                    <Divider />
                  </ListItem>
                )
              )
            ) : (
              <ListItem>
                <ListItemText primary="Não tem atletas que ainda não estejam inscritos nesta prova."></ListItemText>
              </ListItem>
            )}
          </List>
        )}
      </DialogContent>
      <DialogActions sx={{ pr: 4, pb: 2 }}>
        {isDisciplineScreenOpen ? null : (
          <>
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
                  page >=
                  Math.ceil(athletesNotInEventData?.data?.results.length / 10) -
                    1
                }
                aria-label="next page"
              >
                <KeyboardArrowRight />
              </IconButton>
            </Tooltip>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
