import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Box,
  CircularProgress,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useFetchDisciplinesData } from "../../hooks/useEventData";
import AthletesTable from "../../components/Table/AthletesTable";
import CategoriesModal from "../../components/Categories/CategoriesModal";

export default function EventCategoriesPage(
  props: Readonly<{ userRole: string }>
) {
  type Category = {
    id: string;
    name: string;
    gender: string;
    max_age: string;
    min_age: string;
    max_grad: string;
    min_grad: string;
    max_weight: string;
    min_weight: string;
  };

  type Discipline = {
    id: string;
    name: string;
    categories: Category[];
  };

  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] =
    useState<boolean>(false);
  const [currentDiscipline, setCurrentDiscipline] = useState<string>("");
  const [disciplineCategories, setDisciplineCategories] = useState<any>([]);

  const handleCategoriesModalOpen = () => {
    setIsCategoriesModalOpen(true);
  };

  const handleCategoriesModalClose = () => {
    setIsCategoriesModalOpen(false);
  };

  const { data: disciplinesData, isLoading: isDisciplinesDataLoading } =
    useFetchDisciplinesData(location.pathname.split("/")[2]);

  useEffect(() => {}, [disciplinesData]);

  // Memoize `rows` to compute only when `athletes` changes
  const categoriesRows = useMemo(() => {
    return disciplinesData?.data.results.map((discipline: Discipline) =>
      discipline.categories.map((category: Category) => ({
        id: category.id,
        name: category.name,
        gender: category.gender,
      }))
    );
  }, [disciplinesData]);

  const getColumnMaping = () => {
    const columnMapping = [
      { key: "name", label: "Nome" },
      { key: "gender", label: "Género" },
    ];
    return columnMapping;
  };

  const columnMaping = getColumnMaping();

  console.log(categoriesRows);

  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página de Categorias por Evento"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá consultar todos os seus Atletas/Alunos, e também Equipas.
          Pode consultar a informação de cada um, editar e remover. <p></p>
          <strong>Importante</strong>: Estes não servem como inscrição em
          qualquer prova.
        </CardContent>
      </Card>
      <Grid size={12} sx={{ m: 2 }}>
        {isDisciplinesDataLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : disciplinesData?.data !== undefined ? (
          disciplinesData.data.results.map(
            (discipline: Discipline, index: any) => (
              <span key={index}>
                <Typography sx={{ m: 3 }} variant="h5">
                  {discipline.name}
                </Typography>
                <AthletesTable
                  type="Categorias"
                  data={categoriesRows[index]}
                  count={categoriesRows[index].length}
                  columnsHeaders={columnMaping}
                  actions
                  selection
                  deletable
                  page={page}
                  setPage={setPage}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  userRole={props.userRole}
                ></AthletesTable>
                <Grid sx={{ p: 1, pt: 2, pb: 1 }} container size={0.5}>
                  <Tooltip title="Adicionar">
                    <Button
                      sx={{ m: 1 }}
                      variant="contained"
                      size="large"
                      color="success"
                      onClick={() => {
                        setCurrentDiscipline(discipline.name);
                        handleCategoriesModalOpen();
                      }}
                      startIcon={<Add />}
                    >
                      Adicionar
                    </Button>
                  </Tooltip>
                </Grid>
              </span>
            )
          )
        ) : null}
      </Grid>
      <CategoriesModal
        handleModalClose={handleCategoriesModalClose}
        isModalOpen={isCategoriesModalOpen}
        disciplineData={currentDiscipline}
        disciplineCategories={disciplineCategories}
        setDisciplineCategories={setDisciplineCategories}
      ></CategoriesModal>
    </>
  );
}
