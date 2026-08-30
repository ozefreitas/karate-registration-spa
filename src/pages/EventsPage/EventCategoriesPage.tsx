import { useState, useMemo, useEffect } from "react";
import {
  Grid,
  Box,
  CircularProgress,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import { Add, Check, Close } from "@mui/icons-material";
import { disciplinesHooks, eventsHooks } from "../../hooks";
import AllUseTable from "../../components/Table/AllUseTable";
import AddEventCategoriesModal from "../../components/Categories/AddEventCategoriesModal";
import { Link, useParams, useNavigate } from "react-router-dom";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import { getFullDate } from "../../utils/utils";
import NotFoundPage from "../ErrorPages/NotFoundPage";

export default function EventCategoriesPage(
  props: Readonly<{ userRole: string }>,
) {
  const navigate = useNavigate();

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
        has_age:
          category.has_age === "Sim" ? (
            <Chip
              icon={<Check />}
              label=""
              color="success"
              sx={{
                bgcolor: "#d9ffe7",
                color: "#004d1f",
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
                bgcolor: "#ff8fa3",
                color: "#800f2f",
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
                bgcolor: "#d9ffe7",
                color: "#004d1f",
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
                bgcolor: "#ff8fa3",
                color: "#800f2f",
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
                bgcolor: "#d9ffe7",
                color: "#004d1f",
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
                bgcolor: "#ff8fa3",
                color: "#800f2f",
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
                bgcolor: "#ff8fa3",
                color: "#800f2f",
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
                bgcolor: "#d9ffe7",
                color: "#004d1f",
                "& .MuiChip-label": {
                  display: "none",
                },
                pl: 0.5,
                pr: 2,
              }}
            />
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
      <Grid size={12} sx={{ m: 2 }}>
        {isDisciplinesDataLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : disciplinesData === undefined ||
          categoriesRows === undefined ? null : (
          disciplinesData.results.map((discipline, index: any) => (
            <span key={index}>
              <Typography ml={3} mt={5} mb={3} variant="h5" fontWeight={"bold"}>
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
                <Grid container size={12}>
                  <Button
                    sx={{ m: 2 }}
                    variant="contained"
                    size="large"
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
