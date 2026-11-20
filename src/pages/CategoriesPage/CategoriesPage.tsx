import {
  Grid,
  Box,
  CircularProgress,
  ListItem,
  ListItemText,
  Chip,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import { categoriesHooks } from "../../hooks";
import AddButton from "../../components/Buttons/AddButton";
import AllUseTable from "../../components/Table/AllUseTable";
import { useMemo, useState } from "react";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import CategoriesFilters from "../../components/filter_drawers/CategoriesFilters";
import { useForm } from "react-hook-form";
import CategoriesOrdering from "../../components/filter_drawers/CategoriesOrdering";
import { Check, Close, Add } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

function CategoryStatusChip({ enabled }: Readonly<{ enabled: boolean }>) {
  return (
    <Chip
      size="small"
      variant="outlined"
      icon={enabled ? <Check /> : <Close />}
      label={enabled ? "Sim" : "Não"}
      sx={(theme) => {
        const statusColor = enabled
          ? theme.palette.success
          : theme.palette.error;

        return {
          height: 26,
          borderRadius: 999,
          color:
            theme.palette.mode === "dark"
              ? statusColor.light
              : statusColor.dark,
          borderColor: alpha(statusColor.main, 0.4),
          bgcolor: alpha(
            statusColor.main,
            theme.palette.mode === "dark" ? 0.18 : 0.08,
          ),
          "& .MuiChip-icon": {
            color: "inherit",
            fontSize: 15,
            ml: 0.75,
          },
          "& .MuiChip-label": {
            px: 0.75,
            fontSize: "0.68rem",
            fontWeight: 700,
          },
        };
      }}
    />
  );
}

export default function CategoriesPage(props: Readonly<{ userRole: string }>) {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const navigate = useNavigate();

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
    refetch,
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
    return categoriesData?.results.map((category) => ({
      id: category.id,
      name: category.name,
      gender: category.gender,
      has_age: <CategoryStatusChip enabled={category.has_age === "Sim"} />,
      has_grad: <CategoryStatusChip enabled={category.has_grad === "Sim"} />,
      has_weight: (
        <CategoryStatusChip enabled={category.has_weight === "Sim"} />
      ),
      max_athletes: (
        <CategoryStatusChip enabled={category.max_athletes !== null} />
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
      <Grid size={12} m={{ xs: 1, sm: 2 }}>
        {categoriesError ? null : (
          <Grid
            sx={{ borderBottom: 1, borderColor: "divider" }}
            size={12}
            container
            spacing={1}
            ml={1}
            mr={2}
            mb={2}
            pb={1}
            justifyContent={
              props.userRole === "main_admin" ? "space-between" : "flex-end"
            }
            alignItems={"center"}
          >
            {props.userRole === "main_admin" ? (
              <Grid size={{ xs: 12, sm: 3 }}>
                <Grid
                  sx={{
                    display: { xs: "none", sm: "flex" },
                  }}
                >
                  <AddButton
                    borderless
                    label="Adicionar"
                    to="new_category/"
                  ></AddButton>
                </Grid>
                <Grid
                  sx={{
                    display: { xs: "flex", sm: "none" },
                  }}
                >
                  <Tooltip placement="top" title="Adicionar">
                    <IconButton
                      onClick={() => navigate("new_category/")}
                      sx={{
                        border: 1,
                        borderRadius: 3,
                        bgcolor: "#2e7d32",
                        "&:hover": { bgcolor: "#2e7d32" },
                      }}
                      color="success"
                      aria-label="Adicionar membro"
                    >
                      <Add sx={{ color: "white" }}></Add>
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            ) : null}
            <Grid container spacing={1}>
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
            <Button
              onClick={() => {
                filtersReset();
                orderReset();
                setPage(1);
                refetch();
              }}
            >
              Refrescar
            </Button>
          </Grid>
        ) : categoriesData === undefined ? null : (
          <AllUseTable
            type="Categorias"
            data={categoryRows}
            count={categoriesData?.count}
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
