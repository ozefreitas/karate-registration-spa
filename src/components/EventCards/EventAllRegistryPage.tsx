import {
  Grid,
  CircularProgress,
  Typography,
  Tooltip,
  Button,
} from "@mui/material";
import AllUseTable from "../Table/AllUseTable";
import { disciplinesHooks, eventsHooks } from "../../hooks";
import { useParams } from "react-router-dom";
import PageInfoCard from "../info-cards/PageInfoCard";
import { formatDateTime, getFullDate } from "../../utils/utils";
import { ContentCopy } from "@mui/icons-material";
import { useState } from "react";
import DuplicateRegistrationsModal from "../Modals/DuplicateRegistrationsModal";

export default function EventAllRegistryPage(
  props: Readonly<{ userRole: string }>,
) {
  const { id: eventId } = useParams<{ id: string }>();

  const [disciplineToDuplicate, setDisciplineToDuplicate] =
    useState<string>("");
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] =
    useState<boolean>(false);

  const handleDuplicateModalOpen = (disciplineName: string) => {
    setDisciplineToDuplicate(disciplineName);
    setIsDuplicateModalOpen(true);
  };

  const handleDuplicateModalClose = () => {
    setIsDuplicateModalOpen(false);
  };

  const {
    data: singleEventData,
    isLoading: isSingleEventLoading,
    error: singleEventError,
  } = eventsHooks.useFetchSingleEventData(eventId!);

  const { data: disciplinesData, isLoading: isDisciplinesLoading } =
    disciplinesHooks.useFetchDisciplinesData(
      eventId!,
      !["superuser", "main_admin"].includes(props.userRole),
      undefined,
      undefined,
      true,
    );

  const getColumnMapping = (isTeam?: boolean, isCoach?: boolean) => {
    // Base columns except the one that must be last
    const baseColumns = [];
    if (
      disciplinesData?.results.length !== 0 &&
      (isTeam === undefined || isTeam === false)
    ) {
      baseColumns.push({ key: "full_name", label: "Nome" });
    } else if (disciplinesData?.results.length !== 0 && isTeam) {
      baseColumns.push(
        { key: "athlete1", label: "Atleta 1" },
        { key: "athlete2", label: "Atleta 2" },
        { key: "athlete3", label: "Atleta 3" },
      );
    }

    // Always add these ones
    baseColumns.push(
      { key: "gender", label: "Género" },
      { key: "club", label: "Clube" },
    );

    // Conditionally add category
    if (
      disciplinesData?.results.length !== 0 &&
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
            Aqui poderá consultar todos os Atletas/Treinadores que estão
            inscritos para a prova que selecionou (ver acima).
          </>
        }
        title="Inscrições gerais"
      ></PageInfoCard>
      <Grid size={12} mt={5}>
        {isSingleEventLoading || isDisciplinesLoading ? (
          <Grid container justifyContent={"center"} mt={5}>
            <CircularProgress />
          </Grid>
        ) : singleEventError ? (
          <Grid mt={5} container justifyContent="center" size={12}>
            <Typography>
              Ocorreu um erro ao encontrar as Atletas inscritos neste Evento
              para este Evento, tente mais tarde ou contacte um administrador.
            </Typography>
          </Grid>
        ) : disciplinesData?.results.length === 0 ? (
          <AllUseTable
            count={singleEventData?.individuals.length!}
            type="Individuais"
            data={singleEventData?.individuals}
            columnsHeaders={columnMaping}
            actions={false}
            selection={false}
            userRole={props.userRole}
          ></AllUseTable>
        ) : (
          disciplinesData?.results.map((discipline: any) => {
            const disciplineIndividuals = discipline?.individuals.map(
              (personInfo: any) => ({
                id: personInfo.person.id,
                full_name: personInfo.person.full_name,
                gender: personInfo.person.gender,
                club: personInfo.person.club,
                category:
                  personInfo.category === null ? (
                    <Typography color="textDisabled">N/A</Typography>
                  ) : (
                    personInfo.category.name
                  ),
                added_at: formatDateTime(personInfo.added_at, "both"),
              }),
            );
            const disciplineTeams = discipline?.teams.map((teamInfo: any) => ({
              id: teamInfo.team.id,
              athlete1: teamInfo.team.athlete1?.full_name ?? "N/A",
              athlete2: teamInfo.team.athlete2?.full_name ?? "N/A",
              athlete3: teamInfo.team.athlete3?.full_name ?? "N/A",
              gender: teamInfo.team.gender,
              club: teamInfo.team.club,
              category:
                teamInfo.category === null ? (
                  <Typography color="textDisabled">N/A</Typography>
                ) : (
                  teamInfo.team.category.name
                ),
              added_at: formatDateTime(teamInfo.added_at, "both"),
            }));
            return (
              <>
                <Grid
                  container
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mb={3}
                  mt={5}
                  ml={3}
                >
                  <Typography variant="h5">{discipline.name}</Typography>
                  {singleEventData !== undefined &&
                  singleEventData.event_date < getFullDate() &&
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
                {discipline.is_team ? (
                  <AllUseTable
                    count={discipline.teams.length}
                    type="Modalidades"
                    discipline={discipline.id}
                    data={disciplineTeams}
                    columnsHeaders={getColumnMapping(
                      discipline.is_team,
                      discipline.is_coach,
                    )}
                    actions={["main_admin", "superuser"].includes(
                      props.userRole,
                    )}
                    selection={false}
                    userRole={props.userRole}
                  ></AllUseTable>
                ) : (
                  <AllUseTable
                    count={discipline.individuals.length}
                    type="Modalidades"
                    discipline={discipline.id}
                    data={disciplineIndividuals}
                    columnsHeaders={getColumnMapping(
                      discipline.is_team,
                      discipline.is_coach,
                    )}
                    actions={["main_admin", "superuser"].includes(
                      props.userRole,
                    )}
                    selection={false}
                    userRole={props.userRole}
                  ></AllUseTable>
                )}
              </>
            );
          })
        )}
      </Grid>
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
    </>
  );
}
