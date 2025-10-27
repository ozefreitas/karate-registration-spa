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
  Tooltip,
  ListItemIcon,
} from "@mui/material";
import { useState } from "react";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  Close,
  KeyboardArrowRight,
  KeyboardArrowLeft,
  Category,
} from "@mui/icons-material";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { getGraduationFromValue } from "../../config";

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

export default function CategoriesReadOnlyModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    disciplineData: any;
    currentDisicpline: string;
  }>
) {
  console.log(props.disciplineData);
  type Category = {
    id: string;
    name: string;
    gender: string;
    has_age: string;
    min_age: string;
    max_age: string;
    has_grad: string;
    min_grad: number;
    max_grad: number;
    has_weight: string;
    min_weight: string;
    max_weight: string;
  };

  const [page, setPage] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleBackButtonClick = () => {
    setPage(page - 1);
  };

  const handleNextButtonClick = () => {
    setPage(page + 1);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const disicplinesSearched = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return props.disciplineData[0].categories ?? [];

    return props.disciplineData[0].categories.filter((category: Category) => {
      return (
        category.name.toLowerCase().includes(query) ||
        category.gender.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, props.disciplineData]);

  return (
    <Dialog
      open={props.isModalOpen}
      onClose={props.handleModalClose}
      maxWidth="sm"
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
            Escalões para {props.currentDisicpline}
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
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ pb: 0 }}>
        <List>
          {disicplinesSearched.length !== 0 ? (
            disicplinesSearched.map((category: Category, index: string) => (
              <ListItem key={index} disablePadding>
                <ListItemButton key={index}>
                  <ListItemIcon>
                    <Category />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${category.name} ${category.gender}`}
                    secondary={
                      <>
                        Idade Min.: {category.min_age ?? "N/A"} / Idade Máx.:{" "}
                        {category.max_age ?? "N/A"} <br /> Grad Min.:{" "}
                        {getGraduationFromValue(Number(category.min_grad)) ??
                          "N/A"}{" "}
                        / Grad Máx.:{" "}
                        {getGraduationFromValue(Number(category.max_grad)) ??
                          "N/A"}
                        <br /> Peso Min.: {category.min_weight ?? "N/A"} / Peso
                        Máx.: {category.max_weight ?? "N/A"}
                      </>
                    }
                  />
                </ListItemButton>
                <Divider />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="Não tem Escalões que ainda não estejam associadas a esta Modalidade."></ListItemText>
            </ListItem>
          )}
        </List>
      </DialogContent>
      <DialogActions sx={{ pr: 4, pb: 2 }}>
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
              disabled={page >= Math.ceil(props.disciplineData.length / 10) - 1}
              aria-label="next page"
            >
              <KeyboardArrowRight />
            </IconButton>
          </Tooltip>
        </>
      </DialogActions>
    </Dialog>
  );
}
