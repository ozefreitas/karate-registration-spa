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
  Tooltip,
} from "@mui/material";
import { Add, ContentCopy, Visibility } from "@mui/icons-material";
import AllUseTable from "../../components/Table/AllUseTable";
import MembersModal from "../../components/Modals/MembersModal";
import { disciplinesHooks, eventsHooks } from "../../hooks";
import CategoriesReadOnlyModal from "../../components/Categories/CategoriesReadOnlyModal";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import { formatDateTime } from "../../utils/utils";
import DuplicateRegistrationsModal from "../../components/Modals/DuplicateRegistrationsModal";

export default function IndividualsPage(props: Readonly<{ userRole: string }>) {
  const { id: eventId } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCategoriesListModalOpen, setIsCategoriesListModalOpen] =
    useState<boolean>(false);
  const [disciplineToDuplicate, setDisciplineToDuplicate] =
    useState<string>("");
  const [currentDiscipline, setCurrentDiscipline] = useState<string>("");
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] =
    useState<boolean>(false);

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

  const handleDuplicateModalOpen = (disciplineName: string) => {
    setDisciplineToDuplicate(disciplineName);
    setIsDuplicateModalOpen(true);
  };

  const handleDuplicateModalClose = () => {
    setIsDuplicateModalOpen(false);
  };

  const { data: singleEventData, isLoading: isSingleEventLoading } =
    eventsHooks.useFetchSingleEventData(eventId!);

  const { data: disciplinesData } = disciplinesHooks.useFetchDisciplinesData(
    eventId!,
    false,
    false,
    false,
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
            Aqui poderá consultar todos os Membros que estão inscritos para a
            prova que selecionou. <p></p> Tal como presente nas regras, no
            período de retificações apenas pode eliminar inscrições, e quando as
            inscrições estiverem fechadas não podem ser efetuadas operações,
            apenas ser visualizadas as inscrições. <p></p>
            Ao clicar em "Selecionar Atleta", apenas irão aparecer aqueles que
            estejam marcados como "Competidores". Se Membro não constar na
            lista, por favor verifique na página de perfil desse Membro se o
            campo "É Competidor" está selecionado. Caso não possua uma
            subscrição, contacte um administrador de imediato.
          </>
        }
        title={`Inscritos em ${singleEventData?.data.name}`}
      ></PageInfoCard>
      <Grid container mx={4}>
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
                  px={2}
                  sx={{
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
          <AllUseTable
            type="Individuais"
            data={singleEventData?.data.individuals}
            count={singleEventData?.data.individuals.length}
            columnsHeaders={columnMaping}
            actions
            selection={["main_admin", "superuser", "subed_club"].includes(
              props.userRole,
            )}
            deletable={["main_admin", "superuser", "subed_club"].includes(
              props.userRole,
            )}
            userRole={props.userRole}
          ></AllUseTable>
        ) : (
          disciplinesData?.data.results.map((discipline: any, index: any) => {
            const disciplineIndividuals = discipline?.individuals.map(
              (memberInfo: any) => ({
                id: memberInfo.member.id,
                full_name: memberInfo.member.full_name,
                gender: memberInfo.member.gender,
                club: memberInfo.member.club,
                category: memberInfo.category.name,
                added_at: formatDateTime(memberInfo.added_at, "both"),
              }),
            );
            return (
              <span key={index}>
                <Grid
                  size={12}
                  pr={2}
                  mt={3}
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography p={3} variant="h5">
                    {discipline.name}
                  </Typography>
                  <Grid container spacing={2}>
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
                    {singleEventData?.data.has_ended &&
                    ["superuser", "subed_club"].includes(props.userRole) &&
                    disciplineIndividuals.length !== 0 ? (
                      <Grid size={1}>
                        <Tooltip title="Copiar Inscrições">
                          <span>
                            <Button
                              startIcon={<ContentCopy></ContentCopy>}
                              variant="contained"
                              onClick={() =>
                                handleDuplicateModalOpen(discipline.name)
                              }
                            >
                              Copiar
                            </Button>
                          </span>
                        </Tooltip>
                      </Grid>
                    ) : null}
                  </Grid>
                </Grid>
                <AllUseTable
                  count={discipline.individuals.length}
                  type="Modalidades"
                  discipline={discipline.id}
                  data={disciplineIndividuals}
                  columnsHeaders={columnMaping}
                  actions
                  selection
                  deletable
                  userRole={props.userRole}
                ></AllUseTable>
              </span>
            );
          })
        )}
      </Grid>
      {singleEventData?.data.is_open ? (
        <Grid container justifyContent="flex-end" m={4}>
          <Button
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
      <MembersModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        eventData={singleEventData?.data}
        disciplinesData={disciplinesData}
      ></MembersModal>
      {disciplineToDuplicate === "" ? null : (
        <DuplicateRegistrationsModal
          handleModalClose={handleDuplicateModalClose}
          isModalOpen={isDuplicateModalOpen}
          disciplineData={disciplinesData?.data.results.find(
            (disicpline: any) => disicpline.name === disciplineToDuplicate,
          )}
          eventName={singleEventData?.data.name}
        ></DuplicateRegistrationsModal>
      )}
      {currentDiscipline === "" ? null : (
        <CategoriesReadOnlyModal
          currentDisicpline={currentDiscipline}
          disciplineData={disciplinesData?.data.results.filter(
            (disicpline: any) => disicpline.name === currentDiscipline,
          )}
          handleModalClose={handleCategoriesListModalClose}
          isModalOpen={isCategoriesListModalOpen}
        ></CategoriesReadOnlyModal>
      )}
    </>
  );
}
