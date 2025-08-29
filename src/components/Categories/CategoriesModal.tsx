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
  Checkbox,
  Box,
  CircularProgress,
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
import { useFetchCategories } from "../../hooks/useEventData";
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

export default function CategoriesModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    disciplineData: any;
    disciplineCategories: any;
    setDisciplineCategories: any;
  }>
) {
  console.log(props.disciplineCategories);
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
  const [checked, setChecked] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useFetchCategories();

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

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

  const categoryAthletes = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return categoriesData?.data.results ?? [];

    return categoriesData?.data.results.filter((category: Category) => {
      return category.name.toLowerCase().includes(query);
    });
  }, [searchQuery, categoriesData]);

  const handleSubmit = () => {
    const data = { discipline: props.disciplineData, categories: checked };
    props.setDisciplineCategories((prev: any[]) => {
      const existingIndex = prev.findIndex(
        (item) => item.discipline === props.disciplineData
      );

      if (existingIndex !== -1) {
        // Merge categories without duplicates
        const updatedCategories = Array.from(
          new Set([...prev[existingIndex].categories, ...checked])
        );

        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          categories: updatedCategories,
        };

        return updated;
      } else {
        return [...prev, data];
      }
    });
    props.handleModalClose();
    setChecked([]);
  };

  return (
    <Dialog
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
            Selecionar Categorias para {props.disciplineData}
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
          <span>
            <Button
              autoFocus
              size="large"
              color="inherit"
              onClick={handleSubmit}
              disabled={categoriesData?.data.results.length === 0}
            >
              Adicionar
            </Button>
          </span>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ pb: 0 }}>
        <List>
          {isCategoriesLoading ? (
            <Grid sx={{ mt: 3 }} container justifyContent="center" size={12}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            </Grid>
          ) : categoriesError ? (
            <div>Ocorreu um erro</div>
          ) : categoryAthletes.length !== 0 ? (
            categoryAthletes
              .filter((category: Category) => {
                if (props.disciplineCategories.length === 0) {
                  return category;
                } else {
                  props.disciplineCategories[props.disciplineData].includes(
                    category.id
                  );
                }
              })
              .map((category: Category, index: string) => (
                <ListItem
                  key={index}
                  disablePadding
                  secondaryAction={
                    <label>
                      <Checkbox
                        // sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                        edge="end"
                        onChange={() => handleToggle(category.id)}
                        checked={checked.includes(category.id)}
                        slotProps={{
                          input: {
                            "aria-labelledby": `checkbox-list-secondary-label-${category.name}`,
                          },
                        }}
                      />
                    </label>
                  }
                >
                  <ListItemButton
                    key={index}
                    onClick={() => handleToggle(category.id)}
                  >
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
                          <br /> Peso Min.: {category.min_weight ?? "N/A"} /
                          Peso Máx.: {category.max_weight ?? "N/A"}
                        </>
                      }
                    />
                  </ListItemButton>
                  <Divider />
                </ListItem>
              ))
          ) : (
            <ListItem>
              <ListItemText primary="Não tem Categorias que ainda não estejam associadas a esta Modalidade."></ListItemText>
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
              disabled={
                page >= Math.ceil(categoriesData?.data?.results.length / 10) - 1
              }
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
