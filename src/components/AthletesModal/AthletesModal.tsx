import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  Typography,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Close } from "@mui/icons-material";
import axios from "axios";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useAddIndividualData } from "../../hooks/useIndividualsData";

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

const fetchAthletesNotInEvent = () => {
  const token = localStorage.getItem("token");
  return axios.get("http://127.0.0.1:8000/athletes/", {
    headers: {
      Authorization: `Token ${token}`,
    },
    params: {
      not_in_competition: location.pathname.split("/")[2],
    },
  });
};

export default function AthletesModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    eventName: any;
  }>
) {
  type Athlete = {
    id: string;
    first_name: string;
    last_name: string;
    category: string;
    gender: string;
    match_type: string;
  };

  const [checked, setChecked] = React.useState<string[]>([]);

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

  const {
    data: athletesNotInEventData,
    isLoading: isAthletesNotInEventLoading,
    error: athletesNotInEventError,
  } = useQuery({
    queryKey: ["athletes-notin-event"],
    queryFn: fetchAthletesNotInEvent,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const addIndividual = useAddIndividualData();

  const handleIndividualsSubmit = (athleteList: string[]) => {
    athleteList.forEach((athlete: string) => {
      const data = { athlete: athlete, competition: props.eventName.id };
      addIndividual.mutate(data);
    });
    setChecked([]);
  };

  return (
    <Dialog
      keepMounted
      open={props.isModalOpen}
      onClose={props.handleModalClose}
      maxWidth="lg"
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
            Selecionar Atletas para {props.eventName?.name}
          </Typography>
          {athletesNotInEventData?.data.length !== 0 ? (
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
          <Button
            autoFocus
            size="large"
            color="inherit"
            onClick={() => {
              handleIndividualsSubmit(checked);
              props.handleModalClose();
            }}
            disabled={athletesNotInEventData?.data.length === 0}
          >
            Adicionar
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <List>
          {isAthletesNotInEventLoading ? (
            <div>Is Loading</div>
          ) : athletesNotInEventError ? (
            <div>Ocorreu um erro</div>
          ) : athletesNotInEventData?.data.length !== 0 ? (
            athletesNotInEventData?.data.map(
              (athlete: Athlete, index: string) => (
                <ListItem
                  key={index}
                  disablePadding
                  secondaryAction={
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
                  }
                >
                  <ListItemButton
                    key={index}
                    onClick={() => handleToggle(athlete.id)}
                  >
                    <ListItemText
                      primary={`${athlete.first_name} ${athlete.last_name}`}
                      secondary={`${athlete.match_type} ${athlete.category} ${athlete.gender}`}
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
      </DialogContent>
      {/* <DialogActions></DialogActions> */}
    </Dialog>
  );
}
