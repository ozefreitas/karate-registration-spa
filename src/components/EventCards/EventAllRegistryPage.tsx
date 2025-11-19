import { Grid, Box, CircularProgress, Typography } from "@mui/material";
import AthletesTable from "../../components/Table/AthletesTable";
import { disciplinesHooks, eventsHooks } from "../../hooks";
import { useParams } from "react-router-dom";
import PageInfoCard from "../info-cards/PageInfoCard";
import { formatDateTime } from "../../utils/utils";

export default function EventAllRegistryPage(
  props: Readonly<{ userRole: string }>
) {
  const { id: eventId } = useParams<{ id: string }>();

  const {
    data: singleEventData,
    isLoading: isSingleEventLoading,
    // error: singleEventError,
  } = eventsHooks.useFetchSingleEventData(eventId!);

  const { data: disciplinesData } = disciplinesHooks.useFetchDisciplinesData(
    eventId!,
    !["superuser", "main_admin"].includes(props.userRole)
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
            Aqui poderá consultar todos os Atletas/Treinadores que estão
            inscritos para a prova que selecionou (ver acima).
          </>
        }
        title="Visualização de inscrições gerais"
      ></PageInfoCard>
      <Grid size={12} sx={{ m: 2 }}>
        {isSingleEventLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : disciplinesData?.data.results.length === 0 ? (
          <AthletesTable
            count={singleEventData?.data.individuals.length}
            type="Individuais"
            data={singleEventData?.data.individuals}
            columnsHeaders={columnMaping}
            actions={false}
            selection={false}
            userRole={props.userRole}
          ></AthletesTable>
        ) : (
          disciplinesData?.data.results.map((discipline: any) => {
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
              <>
                <Typography sx={{ m: 3 }} variant="h5">
                  {discipline.name}
                </Typography>
                <AthletesTable
                  count={discipline.individuals.length}
                  type="Modalidades"
                  discipline={discipline.id}
                  data={disciplineIndividuals}
                  columnsHeaders={getColumnMapping(discipline.is_coach)}
                  actions={["main_admin", "superuser"].includes(props.userRole)}
                  selection={false}
                  userRole={props.userRole}
                ></AthletesTable>
              </>
            );
          })
        )}
      </Grid>
    </>
  );
}
