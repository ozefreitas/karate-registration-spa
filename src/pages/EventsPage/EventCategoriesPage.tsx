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
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { disciplinesHooks } from "../../hooks";
import AthletesTable from "../../components/Table/AthletesTable";
import CategoriesModal from "../../components/Categories/CategoriesModal";
import { Link, useParams } from "react-router-dom";

export default function EventCategoriesPage(
  props: Readonly<{ userRole: string }>
) {
  type Category = {
    id: string;
    name: string;
    gender: string;
    min_age: string;
    has_age: string;
    has_grad: string;
    has_weight: string;
  };

  type Discipline = {
    id: string;
    name: string;
    categories: Category[];
  };

  const { id: eventId } = useParams<{ id: string }>();
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
    disciplinesHooks.useFetchDisciplinesData(eventId!);

  useEffect(() => {}, [disciplinesData]);

  // Memoize `rows` to compute only when `athletes` changes
  const categoriesRows = useMemo(() => {
    return disciplinesData?.data.results.map((discipline: Discipline) =>
      discipline.categories.map((category: Category) => ({
        id: category.id,
        name: category.name,
        gender: category.gender,
        sort_age: category.min_age,
        has_age: category.has_age,
        has_grad: category.has_grad,
        has_weight: category.has_weight,
      }))
    );
  }, [disciplinesData]);

  const getColumnMaping = () => {
    const columnMapping = [
      { key: "name", label: "Nome" },
      { key: "gender", label: "Género" },
      { key: "has_age", label: "Limite Idades" },
      { key: "has_grad", label: "Limite Ranks" },
      { key: "has_weight", label: "Limite Pesos" },
    ];
    return columnMapping;
  };

  const columnMaping = getColumnMaping();

  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página de Escalões por Evento"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          {["main_admin", "superuser"].includes(props.userRole) ? (
            <>
              Aqui poderá consultar todos os Escalões que escolheu para este
              Evento. Pode também adicionar novos ou remover. Se pretender
              editar algum específico, deve dirigir-se à{" "}
              <Link to={"/categories/"}>página de Escalões</Link>, remover o
              Escalão que deseja editar e adicionar um novo.
            </>
          ) : (
            "Aqui poderá consultar todos os Escalões disponíveis para este Evento. Caso depare com algum problema ou incorcordância com as regras, por favor contacte."
          )}
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
                  type="EventCategories"
                  data={categoriesRows[index]}
                  count={categoriesRows[index].length}
                  columnsHeaders={columnMaping}
                  actions
                  selection
                  deletable
                  userRole={props.userRole}
                  discipline={discipline.id}
                ></AthletesTable>
                {["main_admin", "superuser"].includes(props.userRole) ? (
                  <Grid sx={{ p: 1, pt: 2, pb: 1 }} container size={0.5}>
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
                  </Grid>
                ) : null}
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
