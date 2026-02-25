import {
  Grid,
  Box,
  CircularProgress,
  ListItem,
  ListItemText,
  Tooltip,
  IconButton,
  Chip,
} from "@mui/material";
import { categoriesHooks } from "../../hooks";
import AddButton from "../../components/Buttons/AddButton";
import AllUseTable from "../../components/Table/AllUseTable";
import { useMemo, useState } from "react";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import CategoriesFilters from "../../components/filter_drawers/CategoriesFilters";
import { useForm } from "react-hook-form";
import CategoriesOrdering from "../../components/filter_drawers/CategoriesOrdering";
import { Check, Close } from "@mui/icons-material";

export default function CategoriesPage(props: Readonly<{ userRole: string }>) {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  type Category = {
    id: string;
    name: string;
    gender: string;
    has_age: string;
    has_grad: string;
    has_weight: string;
    max_athletes: number;
  };

  const {
    control: filtersControl,
    reset: filtersReset,
    watch: filtersWatch,
    setValue: filtersSetValue,
    formState: { errors: filtersErrors },
    formState: { dirtyFields: filtersDirtyFields },
  } = useForm({
    defaultValues: {
      hasGrad: false,
      minGrad: true,
      maxGrad: true,
      hasAge: false,
      minAge: true,
      maxAge: true,
      hasWeight: false,
      minWeight: true,
      maxWeight: true,
      isMasculino: true,
      isFeminino: true,
    },
  });

  const {
    control: orderControl,
    watch: orderWatch,
    reset: orderReset,
    formState: { errors: orderErrors },
    formState: { dirtyFields: orderDirtyFields },
  } = useForm({
    defaultValues: {
      name: "",
      min_age: "min_age",
      max_age: "",
      min_grad: "",
      max_grad: "",
      min_weight: "",
      max_weight: "",
    },
  });

  const filtersChangedCount = Object.keys(filtersDirtyFields).length;
  const orderChangedCount = Object.keys(orderDirtyFields).length;

  const columnMaping = [
    { key: "name", label: "Nome" },
    { key: "gender", label: "Género" },
    { key: "has_age", label: "Limite Idades" },
    { key: "has_grad", label: "Limite Graduações" },
    { key: "has_weight", label: "Limite Pesos" },
    { key: "max_athletes", label: "Limite Atletas (Equipas)" },
  ];

  const [orderFields, setOrderFields] = useState([
    {
      key: "min_age",
      label: "Idade Mínima",
      options: ["min_age", "-min_age"],
    },
    {
      key: "name",
      label: "Nome",
      options: ["name", "-name"],
    },
    {
      key: "max_age",
      label: "Idade Máxima",
      options: ["max_age", "-max_age"],
    },
    {
      key: "min_grad",
      label: "Graduação Mínima",
      options: ["min_grad", "-min_grad"],
    },
    {
      key: "max_grad",
      label: "Graduação Máxima",
      options: ["max_grad", "-max_grad"],
    },
    {
      key: "min_weight",
      label: "Peso Mínimo",
      options: ["min_weight", "-min_weight"],
    },
    {
      key: "max_weight",
      label: "Peso Máximo",
      options: ["max_weight", "-max_weight"],
    },
  ]);

  const ordering = orderFields
    .map((f: any) => orderWatch(f.key))
    .filter(Boolean)
    .join(",");

  const selectedGender =
    filtersWatch("isMasculino") && filtersWatch("isFeminino")
      ? undefined
      : filtersWatch("isMasculino")
        ? "Masculino"
        : filtersWatch("isFeminino")
          ? "Feminino"
          : undefined;

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = categoriesHooks.useFetchCategoriesData(
    page,
    pageSize,
    ordering,
    selectedGender,
    filtersWatch("hasAge") ? !!filtersWatch("minAge") : undefined,
    filtersWatch("hasAge") ? !!filtersWatch("maxAge") : undefined,
    filtersWatch("hasGrad") ? !!filtersWatch("minGrad") : undefined,
    filtersWatch("hasGrad") ? !!filtersWatch("maxGrad") : undefined,
    filtersWatch("hasWeight") ? !!filtersWatch("minWeight") : undefined,
    filtersWatch("hasWeight") ? !!filtersWatch("maxWeight") : undefined,
  );

  // Memoize `rows` to compute only when `members` changes
  const categoryRows = useMemo(() => {
    return categoriesData?.data.results.map((category: Category) => ({
      id: category.id,
      name: category.name,
      gender: category.gender,
      has_age:
        category.has_age === "Sim" ? (
          <Chip
            icon={<Check />}
            label=""
            color="success"
            sx={{
              "& .MuiChip-label": {
                display: "none",
              },
              pl: 0.5,
              pr: 2,
            }}
          />
        ) : (
          <Chip
            icon={<Close />}
            label=""
            color="error"
            sx={{
              "& .MuiChip-label": {
                display: "none",
              },
              pl: 0.5,
              pr: 2,
            }}
          />
        ),
      has_grad:
        category.has_grad === "Sim" ? (
          <Chip
            icon={<Check />}
            label=""
            color="success"
            sx={{
              "& .MuiChip-label": {
                display: "none",
              },
              pl: 0.5,
              pr: 2,
            }}
          />
        ) : (
          <Chip
            icon={<Close />}
            label=""
            color="error"
            sx={{
              "& .MuiChip-label": {
                display: "none",
              },
              pl: 0.5,
              pr: 2,
            }}
          />
        ),
      has_weight:
        category.has_weight === "Sim" ? (
          <Chip
            icon={<Check />}
            label=""
            color="success"
            sx={{
              "& .MuiChip-label": {
                display: "none",
              },
              pl: 0.5,
              pr: 2,
            }}
          />
        ) : (
          <Chip
            icon={<Close />}
            label=""
            color="error"
            sx={{
              "& .MuiChip-label": {
                display: "none",
              },
              pl: 0.5,
              pr: 2,
            }}
          />
        ),
      max_athletes:
        category.max_athletes === null ? (
          <Chip
            icon={<Close />}
            label=""
            color="error"
            sx={{
              "& .MuiChip-label": {
                display: "none",
              },
              pl: 0.5,
              pr: 2,
            }}
          />
        ) : (
          <Chip
            icon={<Check />}
            label=""
            color="success"
            sx={{
              "& .MuiChip-label": {
                display: "none",
              },
              pl: 0.5,
              pr: 2,
            }}
          />
        ),
    }));
  }, [categoriesData]);

  return (
    <>
      <PageInfoCard
        description={
          <>
            Aqui poderá registar/ver todos os Escalões que tem guardado na
            plataforma. Pode adicionar novos e eliminar. Deve criar Escalões
            duplicados para diferentes Modalidades. <br />
            Não é possível editar escalões diretamente, para isso deve apagar e
            criar um novo.
          </>
        }
        title="Escalões"
      ></PageInfoCard>
      <Grid size={12} sx={{ m: 2 }}>
        {categoriesError ? null : (
          <Grid
            size={12}
            container
            mb={3}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            {props.userRole === "main_admin" ? (
              <Grid pl={1}>
                <AddButton label="Adicionar" to="new_category/"></AddButton>
              </Grid>
            ) : null}
            <Grid container spacing={2} pr={2}>
              <CategoriesOrdering
                isLoading={isCategoriesLoading}
                control={orderControl}
                reset={orderReset}
                errors={orderErrors}
                changedCount={orderChangedCount}
                orderFields={orderFields}
                setOrderFields={setOrderFields}
              ></CategoriesOrdering>
              <CategoriesFilters
                isLoading={isCategoriesLoading}
                control={filtersControl}
                reset={filtersReset}
                watch={filtersWatch}
                errors={filtersErrors}
                setValue={filtersSetValue}
                changedCount={filtersChangedCount}
              ></CategoriesFilters>
            </Grid>
          </Grid>
        )}
        {isCategoriesLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : categoriesError ? (
          <Grid sx={{ mt: 3 }} container justifyContent="center" size={12}>
            <ListItem>
              <ListItemText primary="Ocorreu um erro ao encontrar os Escalões, tente mais tarde ou contacte um administrador."></ListItemText>
            </ListItem>
          </Grid>
        ) : categoriesData?.data === undefined ? null : (
          <AllUseTable
            type="Categorias"
            data={categoryRows}
            count={categoriesData?.data.count}
            columnsHeaders={columnMaping}
            actions
            selection={["main_admin", "superuser"].includes(props.userRole)}
            deletable={["main_admin", "superuser"].includes(props.userRole)}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            userRole={props.userRole}
          ></AllUseTable>
        )}
      </Grid>
    </>
  );
}
