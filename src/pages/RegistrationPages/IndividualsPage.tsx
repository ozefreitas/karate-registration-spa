import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Grid,
  Button,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Add, Visibility } from "@mui/icons-material";
import AthletesTable from "../../components/Table/AthletesTable";
import AthletesModal from "../../components/Modals/AthletesModal";
import { disciplinesHooks, eventsHooks } from "../../hooks";
import CategoriesReadOnlyModal from "../../components/Categories/CategoriesReadOnlyModal";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import { formatDateTime } from "../../utils/utils";

export default function IndividualsPage(props: Readonly<{ userRole: string }>) {
  const { id: eventId } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCategoriesListModalOpen, setIsCategoriesListModalOpen] =
    useState<boolean>(false);
  const [currentDiscipline, setCurrentDiscipline] = useState<string>("");

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCategoriesListModalClose = () => {
    setIsCategoriesListModalOpen(false);
  };

  const handleCategoriesListModalOpen = (disciplineName: string) => {
    setCurrentDiscipline(disciplineName);
    setIsCategoriesListModalOpen(true);
  };

  const { data: singleEventData, isLoading: isSingleEventLoading } =
    eventsHooks.useFetchSingleEventData(eventId!);

  const { data: disciplinesData } = disciplinesHooks.useFetchDisciplinesData(
    eventId!,
    false,
    false
  );

  const state = singleEventData?.data.is_open
    ? "Inscrições abertas"
    : singleEventData?.data.is_retification
    ? "Período de retificações"
    : "Inscrições fechadas";

  const getColumnMapping = (isCoach?: boolean) => {
    // Base columns except the one that must be last
    const baseColumns = [
      { key: "full_name", label: "Nome" },
      { key: "gender", label: "Género" },
    ];

    // Conditionally add category
    if (
      disciplinesData?.data.results.length !== 0 &&
      (isCoach === undefined || isCoach === false)
    ) {
      baseColumns.push({ key: "category", label: "Escalão" });
    }

    // Always add this one last
    baseColumns.push({ key: "added_at", label: "Data Inscrição" });

    return baseColumns;
  };

  const columnMaping = getColumnMapping();

  return (
    <>
      <PageInfoCard
        description={
          <>
            Aqui poderá consultar todos os Atletas que estão inscritos para a
            prova que selecionou. <p></p> Tal como presente nas regras, no
            período de retificações apenas pode eliminar inscrições, e quando as
            inscrições estiverem fechadas não podem ser efetuadas operações,
            apenas ser visualizadas as inscrições. <p></p>
            Ao clicar em "Selecionar Atleta", apenas irão aparecer aqueles que
            estejam marcados como "Competidores". Se algum Atleta não constar na
            lista, por favor verifique na página de perfil desse Atleta se o
            campo "É Competidor" está selecionado. Caso não possua uma
            subscrição, contacte um administrador de imediato.
          </>
        }
        title={`Inscritos em ${singleEventData?.data.name}`}
      ></PageInfoCard>
      <Grid container sx={{ m: 2 }}>
        <Grid>
          <Card>
            <CardContent
              sx={{
                p: 2,
                "&:last-child": {
                  paddingBottom: 2,
                },
              }}
            >
              {isSingleEventLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Typography
                  variant="h6"
                  sx={{
                    pl: 2,
                    pr: 2,
                    fontWeight: "bold",
                    color: singleEventData?.data.is_open
                      ? "green"
                      : singleEventData?.data.is_retification
                      ? "#ffc40c"
                      : "red",
                  }}
                >
                  Estado: {state}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid size={12} sx={{ m: 2 }}>
        {isSingleEventLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : disciplinesData?.data.results.length === 0 ? (
          <AthletesTable
            type="Individuais"
            data={singleEventData?.data.individuals}
            count={singleEventData?.data.individuals.length}
            columnsHeaders={columnMaping}
            actions
            selection={["main_admin", "superuser", "subed_club"].includes(
              props.userRole
            )}
            deletable={["main_admin", "superuser", "subed_club"].includes(
              props.userRole
            )}
            userRole={props.userRole}
          ></AthletesTable>
        ) : (
          disciplinesData?.data.results.map((discipline: any, index: any) => {
            const disciplineIndividuals = discipline?.individuals.map(
              (memberInfo: any) => ({
                id: memberInfo.member.id,
                full_name: memberInfo.member.full_name,
                gender: memberInfo.member.gender,
                club: memberInfo.member.club,
                category: memberInfo.member.category,
                added_at: formatDateTime(memberInfo.added_at, "both"),
              })
            );
            return (
              <span key={index}>
                <Grid
                  size={12}
                  sx={{ pr: 3 }}
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography sx={{ m: 3 }} variant="h5">
                    {discipline.name}
                  </Typography>
                  {singleEventData?.data.has_categories ? (
                    <Button
                      startIcon={<Visibility />}
                      variant="contained"
                      onClick={() => {
                        handleCategoriesListModalOpen(discipline.name);
                      }}
                    >
                      Escalões
                    </Button>
                  ) : null}
                </Grid>
                <AthletesTable
                  count={discipline.individuals.length}
                  type="Modalidades"
                  discipline={discipline.id}
                  data={disciplineIndividuals}
                  columnsHeaders={columnMaping}
                  actions
                  selection
                  deletable
                  userRole={props.userRole}
                ></AthletesTable>
              </span>
            );
          })
        )}
      </Grid>
      {singleEventData?.data.is_open ? (
        <Grid container justifyContent="flex-end" sx={{ m: 4 }}>
          <Button
            sx={{ m: 1 }}
            variant="contained"
            size="large"
            color="success"
            onClick={() => setIsModalOpen(true)}
            startIcon={<Add />}
          >
            Inscrever
          </Button>
        </Grid>
      ) : null}
      <AthletesModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        eventData={singleEventData?.data}
      ></AthletesModal>
      {currentDiscipline === "" ? null : (
        <CategoriesReadOnlyModal
          currentDisicpline={currentDiscipline}
          disciplineData={disciplinesData?.data.results.filter(
            (disicpline: any) => disicpline.name === currentDiscipline
          )}
          handleModalClose={handleCategoriesListModalClose}
          isModalOpen={isCategoriesListModalOpen}
        ></CategoriesReadOnlyModal>
      )}
    </>
  );
}
