import { useState, useMemo, useEffect } from "react";
import {
  Grid,
  Box,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { disciplinesHooks, eventsHooks } from "../../hooks";
import AllUseTable from "../../components/Table/AllUseTable";
import AddEventCategoriesModal from "../../components/Categories/AddEventCategoriesModal";
import { Link, useParams } from "react-router-dom";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import { getFullDate } from "../../utils/utils";
import NotFoundPage from "../ErrorPages/NotFoundPage";
import BooleanStatusChip from "../../components/BooleanStatusChip";

export default function EventCategoriesPage(
  props: Readonly<{ userRole: string }>,
) {
  const { id: eventId } = useParams<{ id: string }>();
  const {
    data: singleEventData,
    // isLoading: isSingleEventLoading,
    error: singleEventError,
  } = eventsHooks.useFetchSingleEventData(eventId!);

  const [isCategoriesModalOpen, setIsCategoriesModalOpen] =
    useState<boolean>(false);
  const [currentDiscipline, setCurrentDiscipline] = useState<{
    name: string;
    id: string;
    isTeam?: boolean;
  }>({ name: "", id: "", isTeam: undefined });

  const handleCategoriesModalOpen = () => {
    setIsCategoriesModalOpen(true);
  };

  const handleCategoriesModalClose = () => {
    setIsCategoriesModalOpen(false);
  };

  const { data: disciplinesData, isLoading: isDisciplinesDataLoading } =
    disciplinesHooks.useFetchDisciplinesData(eventId!, undefined, false);

  useEffect(() => {}, [disciplinesData]);

  // Memoize `rows` to compute only when `members` changes
  const categoriesRows = useMemo(() => {
    return disciplinesData?.results.map((discipline) =>
      discipline.categories.map((category) => ({
        id: category.id,
        name: category.name,
        gender: category.gender,
        sort_age: category.min_age,
        has_age: <BooleanStatusChip enabled={category.has_age === "Sim"} />,
        has_grad: <BooleanStatusChip enabled={category.has_grad === "Sim"} />,
        has_weight: (
          <BooleanStatusChip enabled={category.has_weight === "Sim"} />
        ),
        max_athletes: (
          <BooleanStatusChip enabled={category.max_athletes !== null} />
        ),
      })),
    );
  }, [disciplinesData]);

  const getColumnMaping = () => {
    const columnMapping = [
      { key: "name", label: "Nome" },
      { key: "gender", label: "Género" },
      { key: "has_age", label: "Limite Idades" },
      { key: "has_grad", label: "Limite Graduações" },
      { key: "has_weight", label: "Limite Pesos" },
      { key: "max_athletes", label: "Limite Atletas (Equipas)" },
    ];
    return columnMapping;
  };

  const columnMaping = getColumnMaping();

  if (singleEventError) {
    return <NotFoundPage />;
  }

  return (
    <>
      <PageInfoCard
        description={
          ["main_admin", "superuser"].includes(props.userRole) ? (
            <>
              Aqui poderá consultar todos os Escalões que escolheu para este
              Evento. Pode também adicionar novos ou remover. Se pretender
              editar algum específico, deve dirigir-se à{" "}
              <Link to={"/categories/"}>página de Escalões</Link>, remover o
              Escalão que deseja editar e adicionar um novo.
            </>
          ) : (
            "Aqui poderá consultar todos os Escalões disponíveis para este Evento. Caso depare com algum problema ou incorcordância com as regras, por favor contacte."
          )
        }
        title="Escalões de Evento"
      ></PageInfoCard>
      <Grid size={12} m={{ xs: 2, sm: 3, md: 4 }}>
        {isDisciplinesDataLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : disciplinesData === undefined ||
          categoriesRows === undefined ? null : (
          disciplinesData.results.map((discipline, index: any) => (
            <span key={index}>
              <Typography mt={5} mb={3} variant="h5" fontWeight={"bold"}>
                {discipline.name}
              </Typography>
              <AllUseTable
                type="EventCategories"
                data={categoriesRows[index]}
                count={categoriesRows[index].length}
                columnsHeaders={columnMaping}
                actions
                selection={
                  ["main_admin", "superuser"].includes(props.userRole) &&
                  singleEventData &&
                  singleEventData?.event_date > getFullDate()
                }
                deletable={
                  ["main_admin", "superuser"].includes(props.userRole) &&
                  singleEventData &&
                  singleEventData?.event_date > getFullDate()
                }
                userRole={props.userRole}
                discipline={discipline.id}
              ></AllUseTable>
              {["main_admin", "superuser"].includes(props.userRole) &&
              !discipline.is_coach ? (
                <Grid container size={12} mt={2}>
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    onClick={() => {
                      setCurrentDiscipline({
                        name: discipline.name,
                        id: String(discipline.id),
                        isTeam: discipline.is_team,
                      });
                      handleCategoriesModalOpen();
                    }}
                    startIcon={<Add />}
                  >
                    Adicionar
                  </Button>
                </Grid>
              ) : null}
            </span>
          ))
        )}
      </Grid>
      <AddEventCategoriesModal
        handleModalClose={handleCategoriesModalClose}
        isModalOpen={isCategoriesModalOpen}
        disciplineData={currentDiscipline}
      ></AddEventCategoriesModal>
    </>
  );
}
