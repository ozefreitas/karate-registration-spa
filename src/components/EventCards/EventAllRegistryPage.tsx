import {
  Grid,
  Box,
  CircularProgress,
  Typography,
  Tooltip,
  Button,
} from "@mui/material";
import AllUseTable from "../Table/AllUseTable";
import { disciplinesHooks, eventsHooks } from "../../hooks";
import { useParams } from "react-router-dom";
import PageInfoCard from "../info-cards/PageInfoCard";
import { formatDateTime } from "../../utils/utils";
import { ContentCopy } from "@mui/icons-material";
import { useState } from "react";
import DuplicateRegistrationsModal from "../Modals/DuplicateRegistrationsModal";

export default function EventAllRegistryPage(
  props: Readonly<{ userRole: string }>,
) {
  const today = new Date();
  const getFullDate = () => {
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  };
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
    // error: singleEventError,
  } = eventsHooks.useFetchSingleEventData(eventId!);

  const { data: disciplinesData, isLoading: isDisciplinesLoading } = disciplinesHooks.useFetchDisciplinesData(
    eventId!,
    !["superuser", "main_admin"].includes(props.userRole),
  );

  const getColumnMapping = (isCoach?: boolean) => {
    // Base columns except the one that must be last
    const baseColumns = [
      { key: "full_name", label: "Nome" },
      { key: "gender", label: "Género" },
      { key: "club", label: "Clube" },
    ];

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
        title="Visualização de inscrições gerais"
      ></PageInfoCard>
      <Grid size={12} sx={{ m: 2 }}>
        {isSingleEventLoading || isDisciplinesLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
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
                  personInfo.category === null
                    ? "N/A"
                    : personInfo.category.name,
                added_at: formatDateTime(personInfo.added_at, "both"),
              }),
            );
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
                  <Typography variant="h5">
                    {discipline.name}
                  </Typography>
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
                <AllUseTable
                  count={discipline.individuals.length}
                  type="Modalidades"
                  discipline={discipline.id}
                  data={disciplineIndividuals}
                  columnsHeaders={getColumnMapping(discipline.is_coach)}
                  actions={["main_admin", "superuser"].includes(props.userRole)}
                  selection={false}
                  userRole={props.userRole}
                ></AllUseTable>
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
