import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import DuplicateRegistrationsModal from "../../components/Modals/DuplicateRegistrationsModal";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import { disciplinesHooks, eventsHooks } from "../../hooks";
import { useParams } from "react-router-dom";
import AllUseTable from "../../components/Table/AllUseTable";
import { Add, ContentCopy, Visibility } from "@mui/icons-material";
import { formatDateTime, getFullDate } from "../../utils/utils";
import { useState } from "react";
import CategoriesReadOnlyModal from "../../components/Categories/CategoriesReadOnlyModal";
import NewTeamPageModal from "./NewTeamPageModal";

export default function RegisteredTeamsPage(
  props: Readonly<{ userRole: string }>,
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

  const {
    data: singleEventData,
    isLoading: isSingleEventLoading,
    error: singleEventError,
  } = eventsHooks.useFetchSingleEventData(eventId!);

  const { data: disciplinesData, isLoading: isDisciplinesLoading } =
    disciplinesHooks.useFetchDisciplinesData(eventId!, false, false, true);

  const state = singleEventData?.is_open
    ? "Inscrições abertas"
    : singleEventData?.is_retification
      ? "Período de retificações"
      : "Inscrições Encerradas";

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

  const getColumnMapping = () => {
    // Base columns except the one that must be last
    const baseColumns = [
      { key: "member1", label: "Atleta 1" },
      { key: "member2", label: "Atleta 2" },
      { key: "member3", label: "Atleta 3" },
      { key: "category", label: "Escalão" },
      { key: "gender", label: "Género" },
      { key: "added_at", label: "Data Inscrição" },
    ];

    return baseColumns;
  };

  const columnMaping = getColumnMapping();

  return (
    <>
      <PageInfoCard
        description="Aqui poderá consultar todas as Equipas que estão inscritas para a
          prova que selecionou (ver abaixo). Equipas não são editáveis! Se precisar de
          fazer alterções terá que primeiro eliminar essa Equipa e voltar a adicionar
          com as informações corretas."
        title="Página de inscritos em Equipas"
      ></PageInfoCard>
      <Grid container mx={4} mb={4}>
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
                    color: singleEventData?.is_open
                      ? "green"
                      : singleEventData?.is_retification
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
      <Grid size={12} m={2}>
        {isSingleEventLoading || isDisciplinesLoading ? (
          <Grid container justifyContent={"center"} mt={5}>
            <CircularProgress />
          </Grid>
        ) : singleEventError ? (
          <Grid mt={5} container justifyContent="center" size={12}>
            <ListItem>
              <ListItemText primary="Ocorreu um erro ao encontrar as Equipas para este Evento, tente mais tarde ou contacte um administrador."></ListItemText>
            </ListItem>
          </Grid>
        ) : disciplinesData?.results.length === 0 ? (
          <Grid mt={5} container justifyContent="center" size={12}>
            <ListItem>
              <ListItemText primary="Não foram encontradas Modalidades para este Evento."></ListItemText>
            </ListItem>
          </Grid>
        ) : (
          disciplinesData?.results.map((discipline: any, index: any) => {
            const disciplineTeams = discipline?.teams.map((teamInfo: any) => ({
              id: teamInfo.team.id,
              member1:
                teamInfo.team.athlete1 === null ? (
                  <Typography color="textDisabled">N/A</Typography>
                ) : (
                  teamInfo.team.athlete1?.full_name
                ),
              member2:
                teamInfo.team.athlete2 === null ? (
                  <Typography color="textDisabled">N/A</Typography>
                ) : (
                  teamInfo.team.athlete2?.full_name
                ),
              member3:
                teamInfo.team.athlete3 === null ? (
                  <Typography color="textDisabled">N/A</Typography>
                ) : (
                  teamInfo.team.athlete3?.full_name
                ),
              gender:
                teamInfo.team.gender === "Masculino"
                  ? "M"
                  : teamInfo.team.gender === "Feminino"
                    ? "F"
                    : "Misto",
              category: teamInfo.team.category.name,
              added_at: formatDateTime(teamInfo.added_at, "both"),
            }));
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
                  <Typography p={3} variant="h5" fontWeight={"bold"}>
                    {discipline.name}
                  </Typography>
                  <Grid container spacing={2}>
                    {singleEventData?.has_categories ? (
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
                    {singleEventData !== undefined &&
                    singleEventData.event_date < getFullDate() &&
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
                  type="Equipas"
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
        disciplineData={disciplinesData?.results.find(
          (disicpline: any) => disicpline.name === currentDiscipline,
        )}
      ></NewTeamPageModal>
      {disciplineToDuplicate === "" ? null : (
        <DuplicateRegistrationsModal
          handleModalClose={handleDuplicateModalClose}
          isModalOpen={isDuplicateModalOpen}
          disciplineData={disciplinesData?.results.find(
            (disicpline: any) => disicpline.name === disciplineToDuplicate,
          )}
          eventName={singleEventData?.name!}
        ></DuplicateRegistrationsModal>
      )}
      {currentDiscipline === "" ? null : (
        <CategoriesReadOnlyModal
          currentDisicpline={currentDiscipline}
          disciplineData={disciplinesData?.results.filter(
            (disicpline: any) => disicpline.name === currentDiscipline,
          )}
          handleModalClose={handleCategoriesListModalClose}
          isModalOpen={isCategoriesListModalOpen}
        ></CategoriesReadOnlyModal>
      )}
    </>
  );
}
