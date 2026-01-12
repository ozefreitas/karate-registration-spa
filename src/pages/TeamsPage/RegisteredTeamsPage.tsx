import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import DuplicateRegistrationsModal from "../../components/Modals/DuplicateRegistrationsModal";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import { disciplinesHooks, eventsHooks } from "../../hooks";
import { useParams } from "react-router-dom";
import AllUseTable from "../../components/Table/AllUseTable";
import { Add, ContentCopy, Visibility } from "@mui/icons-material";
import { formatDateTime } from "../../utils/utils";
import { useState } from "react";
import CategoriesReadOnlyModal from "../../components/Categories/CategoriesReadOnlyModal";
import NewTeamPageModal from "./NewTeamPageModal";

export default function RegisteredTeamsPage(
  props: Readonly<{ userRole: string }>
) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [disciplineToDuplicate, setDisciplineToDuplicate] =
    useState<string>("");
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] =
    useState<boolean>(false);
  const [isCategoriesListModalOpen, setIsCategoriesListModalOpen] =
    useState<boolean>(false);
  const [currentDiscipline, setCurrentDiscipline] = useState<string>("");
  const { id: eventId } = useParams<{ id: string }>();

  const { data: singleEventData, isLoading: isSingleEventLoading } =
    eventsHooks.useFetchSingleEventData(eventId!);

  const { data: disciplinesData } = disciplinesHooks.useFetchDisciplinesData(
    eventId!,
    false,
    false,
    true
  );
  const state = singleEventData?.data.is_open
    ? "Inscrições abertas"
    : singleEventData?.data.is_retification
    ? "Período de retificações"
    : "Inscrições fechadas";

  const handleAddNewTeamModalOpen = (disciplineName: string) => {
    setCurrentDiscipline(disciplineName);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDuplicateModalOpen = (disciplineName: string) => {
    setDisciplineToDuplicate(disciplineName);
    setIsDuplicateModalOpen(true);
  };

  const handleDuplicateModalClose = () => {
    setIsDuplicateModalOpen(false);
  };

  const handleCategoriesListModalClose = () => {
    setIsCategoriesListModalOpen(false);
  };

  const handleCategoriesListModalOpen = (disciplineName: string) => {
    setCurrentDiscipline(disciplineName);
    setIsCategoriesListModalOpen(true);
  };

  const getColumnMapping = (isCoach?: boolean) => {
    // Base columns except the one that must be last
    const baseColumns = [
      { key: "member1", label: "Atleta 1" },
      { key: "member2", label: "Atleta 2" },
      { key: "member3", label: "Atleta 3" },
      { key: "gender", label: "Género" },
      { key: "category", label: "Escalão" },
    ];

    // Conditionally add category
    // if (
    //   disciplinesData?.data.results.length !== 0 &&
    //   (isCoach === undefined || isCoach === false)
    // ) {
    //   baseColumns.push({ key: "category", label: "Escalão" });
    // }

    // Always add this one last
    baseColumns.push({ key: "added_at", label: "Data Inscrição" });

    return baseColumns;
  };

  const columnMaping = getColumnMapping();

  return (
    <>
      <PageInfoCard
        description="Aqui poderá consultar todos os Atletas que estão inscritos para a
          prova que selecionou (ver abaixo). Alterar informações de um Atleta
          irá modificar o próprio Atleta, e não apenas a própria inscrição (são
          a mesma coisa)."
        title="Página de inscritos em Equipas"
      ></PageInfoCard>
      <Grid container m={2}>
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
              props.userRole
            )}
            deletable={["main_admin", "superuser", "subed_club"].includes(
              props.userRole
            )}
            userRole={props.userRole}
          ></AllUseTable>
        ) : (
          disciplinesData?.data.results.map((discipline: any, index: any) => {
            const disciplineTeams = discipline?.teams.map((teamInfo: any) => ({
              id: teamInfo.team.id,
              member1: teamInfo.team.athlete1.full_name,
              member2: teamInfo.team.athlete2.full_name,
              member3: teamInfo.team.athlete3.full_name,
              // full_name: teamInfo.full_name,
              gender: teamInfo.team.gender,
              // club: memberInfo.member.club,
              // category: memberInfo.member.category,
              added_at: formatDateTime(teamInfo.added_at, "both"),
            }));
            return (
              <span key={index}>
                <Grid
                  size={12}
                  pr={2}
                  mt={5}
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
                    disciplineTeams.length !== 0 ? (
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
                  count={discipline.teams.length}
                  type="Modalidades"
                  discipline={discipline.id}
                  data={disciplineTeams}
                  columnsHeaders={columnMaping}
                  actions
                  selection
                  deletable
                  userRole={props.userRole}
                ></AllUseTable>
                <Grid container justifyContent="flex-end" m={2}>
                  <Button
                    sx={{ m: 1, mr: 0 }}
                    variant="contained"
                    size="large"
                    color="success"
                    onClick={() => {
                      handleAddNewTeamModalOpen(discipline.name);
                    }}
                    startIcon={<Add />}
                  >
                    Adicionar
                  </Button>
                </Grid>
              </span>
            );
          })
        )}
      </Grid>
      <NewTeamPageModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        disciplineData={disciplinesData?.data.results.find(
          (disicpline: any) => disicpline.name === currentDiscipline
        )}
      ></NewTeamPageModal>
      {disciplineToDuplicate === "" ? null : (
        <DuplicateRegistrationsModal
          handleModalClose={handleDuplicateModalClose}
          isModalOpen={isDuplicateModalOpen}
          disciplineData={disciplinesData?.data.results.find(
            (disicpline: any) => disicpline.name === disciplineToDuplicate
          )}
          eventName={singleEventData?.data.name}
        ></DuplicateRegistrationsModal>
      )}
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
