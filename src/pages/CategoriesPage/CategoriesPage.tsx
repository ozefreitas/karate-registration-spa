import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { categoriesHooks } from "../../hooks";
import AddButton from "../../components/Buttons/AddButton";
import AthletesTable from "../../components/Table/AthletesTable";
import { useMemo, useState } from "react";

export default function CategoriesPage(props: Readonly<{ userRole: string }>) {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    categoriesHooks.useFetchCategoriesData(page + 1, pageSize);

  type Category = {
    id: string;
    name: string;
    gender: string;
    has_age: string;
    has_grad: string;
    has_weight: string;
  };

  // Memoize `rows` to compute only when `athletes` changes
  const categoryRows = useMemo(() => {
    return categoriesData?.data.results.map((category: Category) => ({
      id: category.id,
      name: category.name,
      gender: category.gender,
      has_age: category.has_age,
      has_grad: category.has_grad,
      has_weight: category.has_weight,
    }));
  }, [categoriesData]);

  const columnMaping = [
    { key: "name", label: "Nome" },
    { key: "gender", label: "Género" },
    { key: "has_age", label: "Idade" },
    { key: "has_grad", label: "Rank" },
    { key: "has_weight", label: "Peso" },
  ];

  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página de Escalões"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá registar ver todos os Escalões que tem registado na
          plataforma. Pode adicionar novos e eliminar. Deve criar Escalões
          duplicados para diferentes Modalidades. <br />
          Se desejar alterar algum Escalão, deverá apagar e criar um de novo.
        </CardContent>
      </Card>
      <Grid size={12} sx={{ m: 2 }}>
        {isCategoriesLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : categoriesData?.data === undefined ? null : (
          <AthletesTable
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
          ></AthletesTable>
        )}
        {props.userRole === "main_admin" ? (
          <Grid sx={{ m: 3, mt: 1 }} size={12}>
            <AddButton label="Adicionar" to="new_category/"></AddButton>
          </Grid>
        ) : null}
      </Grid>
    </>
  );
}
