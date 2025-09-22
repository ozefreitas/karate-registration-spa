import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import AthletesTable from "../../components/Table/AthletesTable";
import { disciplinesHooks, eventsHooks } from "../../hooks";
import { useParams } from "react-router-dom";

export default function EventAllRegistryPage(
  props: Readonly<{ userRole: string }>
) {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(25);
  const { id: eventId } = useParams<{ id: string }>();

  const {
    data: singleEventData,
    isLoading: isSingleEventLoading,
    error: singleEventError,
  } = eventsHooks.useFetchSingleEventData(eventId!);

  const { data: disciplinesData } = disciplinesHooks.useFetchDisciplinesData(
    eventId!
  );

  const getColumnMaping = () => {
    const columnMapping = [
      { key: "first_name", label: "Primeiro Nome" },
      { key: "last_name", label: "Último Nome" },
      { key: "gender", label: "Género" },
      { key: "dojo", label: "Dojo" },
    ];
    if (disciplinesData?.data.results.length !== 0) {
      columnMapping.push({ key: "category", label: "Escalão" });
    }
    return columnMapping;
  };

  const columnMaping = getColumnMaping();

  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title={`Página de inscritos em ${singleEventData?.data.name}`}
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá consultar todos os Atletas/Alunos que estão inscritos para
          a prova que selecionou (ver acima).
        </CardContent>
      </Card>
      <Grid size={12} sx={{ m: 2 }}>
        {isSingleEventLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : disciplinesData?.data.results.length !== 0 ? (
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
                columnsHeaders={columnMaping}
                actions={false}
                selection={false}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                userRole={props.userRole}
              ></AthletesTable>
            </>
          ))
        ) : (
          <AthletesTable
            count={singleEventData?.data.individuals.length}
            type="Individuais"
            data={singleEventData?.data.individuals}
            columnsHeaders={columnMaping}
            actions={false}
            selection={false}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            userRole={props.userRole}
          ></AthletesTable>
        )}
      </Grid>
    </>
  );
}
