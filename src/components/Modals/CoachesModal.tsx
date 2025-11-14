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
  Checkbox,
  Box,
  CircularProgress,
  ListItemIcon,
} from "@mui/material";
import { useState } from "react";
import * as React from "react";
import { GraduationsOptions } from "../../config";
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
import { disciplinesHooks, membersHooks } from "../../hooks";
import { useSnackbar } from "notistack";
import { useLocation, useParams } from "react-router-dom";
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

export default function CoachesModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    eventData: any;
    disciplineId: string;
  }>
) {
  type Member = {
    age: any;
    id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    graduation: string;
    gender: string;
    weight: string;
  };

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

  const addDisciplineMember = disciplinesHooks.useAddDisciplineAthlete();

  const handleIndividualsSubmit = (memberList: string[]) => {
    if (memberList.length === 0) {
      enqueueSnackbar("Tem de selecionar pelo menos um treinador!", {
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
        const memberData = {
          member_id: member,
          event_id: props.eventData.id,
        };
        const data = { disciplineId: props.disciplineId, data: memberData };
        addDisciplineMember.mutate(data);
      });
      setChecked([]);
      props.handleModalClose();
    }
  };

  const location = useLocation();
  const [searchQuery, setSearchQuery] = React.useState("");

  const {
    data: coachesNotInEventData,
    isLoading: isCoachesNotInEventLoading,
    error: coachesNotInEventError,
    refetch,
  } = membersHooks.useFetchCoachesNotInEvent(eventId!, page + 1, 10);

  React.useEffect(() => {
    refetch();
  }, [location]);

  const filteredCoaches = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return coachesNotInEventData?.data.results ?? [];

    return coachesNotInEventData?.data.results.filter((athlete: any) => {
      const fullName =
        `${athlete.first_name} ${athlete.last_name}`.toLowerCase();
      return (
        athlete.first_name.toLowerCase().includes(query) ||
        athlete.last_name.toLowerCase().includes(query) ||
        fullName.includes(query) ||
        athlete.id_number === Number(query)
      );
    });
  }, [searchQuery, coachesNotInEventData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Dialog
      // keepMounted
      open={props.isModalOpen}
      onClose={() => {
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
            onClick={props.handleModalClose}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Inscrever Treinadores em {props.eventData?.name}
          </Typography>
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

          <Button
            autoFocus
            size="large"
            color="inherit"
            onClick={() => {
              handleIndividualsSubmit(checked);
            }}
            disabled={coachesNotInEventData?.data.results.length === 0}
          >
            Adicionar
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ pb: 0 }}>
        <List>
          {isCoachesNotInEventLoading ? (
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
          ) : coachesNotInEventError ? (
            <div>Ocorreu um erro</div>
          ) : filteredCoaches.length === 0 ? (
            <ListItem>
              <ListItemText primary="Não tem Treinadores que ainda não estejam inscritos nesta prova."></ListItemText>
            </ListItem>
          ) : userRole === "free_club" && searchQuery === "" ? (
            <ListItem>
              <ListItemText primary="O seu plano não concede acesso à listagem de Treinadores. Pesquise pelo Nº de Indentificação ou nome, ou inicie uma subscrição."></ListItemText>
            </ListItem>
          ) : (
            filteredCoaches.map((member: Member, index: string) => (
              <ListItem
                key={index}
                disablePadding
                secondaryAction={
                  <label>
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                      edge="end"
                      onChange={() => handleToggle(member.id)}
                      checked={checked.includes(member.id)}
                      slotProps={{
                        input: {
                          "aria-labelledby": `checkbox-list-secondary-label-${member.first_name}`,
                        },
                      }}
                    />
                  </label>
                }
              >
                <ListItemButton
                  key={index}
                  onClick={() => {
                    handleToggle(member.id);
                  }}
                >
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${member.full_name}`}
                    secondary={`${member.gender} | Graduação: ${
                      GraduationsOptions.find(
                        (grad: any) =>
                          grad.value.toString() === member.graduation
                      )?.label ?? "N/A"
                    }`}
                  />
                </ListItemButton>
                <Divider />
              </ListItem>
            ))
          )}
        </List>
      </DialogContent>
      {coachesNotInEventData?.data?.count === 0 ? null : (
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
              {Math.ceil(coachesNotInEventData?.data.count / 10)}
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
                  !coachesNotInEventData?.data?.count ||
                  coachesNotInEventData?.data.count <= (page + 1) * 10
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
