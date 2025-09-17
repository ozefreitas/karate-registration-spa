import {
  Dialog,
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
  Tooltip,
} from "@mui/material";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Close, Add } from "@mui/icons-material";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { membersHooks } from "../../hooks";

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

export default function PickOneAthleteModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    setValue: any;
    control: any;
    number: number | null;
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

  const {
    data: athleteInCategoryGenderData,
    isLoading: isAthleteInCategoryGenderLoading,
    error: athleteInCategoryGenderError,
  } = membersHooks.useFetchAthletesInCategoryGender(
    props.control._formValues.category,
    props.control._formValues.gender
  );

  const handleAthletePick = (athleteData: any) => {
    console.log(athleteData.full_name);
    const athelete = `athlete${props.number}`;
    const atheleteId = `athlete${props.number}Id`;
    console.log(atheleteId);
    props.setValue(athelete, athleteData.full_name);
    props.setValue(atheleteId, athleteData.id);
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
            Escolher Atleta para Atleta {props.number}
          </Typography>
          {athleteInCategoryGenderData?.data.length !== 0 ? (
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
        </Toolbar>
      </AppBar>
      <DialogContent>
        <List>
          {isAthleteInCategoryGenderLoading ? (
            <div>Is Loading</div>
          ) : athleteInCategoryGenderError ? (
            <div>Ocorreu um erro</div>
          ) : athleteInCategoryGenderData?.data.length !== 0 ? (
            athleteInCategoryGenderData?.data.results.map(
              (athlete: Athlete, index: string) => (
                <ListItem
                  key={index}
                  disablePadding
                  secondaryAction={
                    <Tooltip title="Escolher">
                      <IconButton
                        onClick={() => {
                          handleAthletePick(athlete);
                          props.handleModalClose();
                        }}
                      >
                        <Add color="success"></Add>
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemButton
                    key={index}
                    onClick={() => {
                      handleAthletePick(athlete);
                      props.handleModalClose();
                    }}
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
