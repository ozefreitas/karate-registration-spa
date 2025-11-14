import { Grid, Box, CircularProgress, Typography } from "@mui/material";
import AthletesTable from "../../components/Table/AthletesTable";
import { disciplinesHooks, eventsHooks } from "../../hooks";
import { useParams } from "react-router-dom";
import PageInfoCard from "../info-cards/PageInfoCard";

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

  const getColumnMaping = (isCoach?: boolean) => {
    const columnMapping = [
      { key: "first_name", label: "Primeiro Nome" },
      { key: "last_name", label: "Último Nome" },
      { key: "gender", label: "Género" },
      { key: "club", label: "Clube" },
    ];
    if (
      disciplinesData?.data.results.length !== 0 &&
      (isCoach === undefined || isCoach === false)
    ) {
      columnMapping.push({ key: "category", label: "Escalão" });
    }
    return columnMapping;
  };

  const columnMaping = getColumnMaping();

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
          disciplinesData?.data.results.map((discipline: any) => (
            <>
              <Typography sx={{ m: 3 }} variant="h5">
                {discipline.name}
              </Typography>
              <AthletesTable
                count={discipline.individuals.length}
                type="Modalidades"
                discipline={discipline.id}
                data={discipline.individuals}
                columnsHeaders={getColumnMaping(discipline.is_coach)}
                actions={["main_admin", "superuser"].includes(props.userRole)}
                selection={false}
                userRole={props.userRole}
              ></AthletesTable>
            </>
          ))
        )}
      </Grid>
    </>
  );
}
