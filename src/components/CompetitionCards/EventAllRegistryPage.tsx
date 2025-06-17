import { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import AthletesTable from "../../components/Table/AthletesTable";
import { useFetchEventsData } from "../../hooks/useEventData";

export default function EventAllRegistryPage() {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(25);

  const {
    data: singleEventData,
    isLoading: isSingleEventLoading,
    error: singleEventError,
  } = useFetchEventsData();

  const columnMaping = [
    { key: "first_name", label: "Primeiro Nome" },
    { key: "last_name", label: "Último Nome" },
    { key: "match_type", label: "Partida" },
    { key: "category", label: "Escalão" },
    { key: "gender", label: "Género" },
  ];

  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página de inscritos em Individual"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá consultar todos os Atletas que estão inscritos para a
          prova que selecionou.
        </CardContent>
      </Card>
      <Grid size={12} sx={{ m: 2 }}>
        {isSingleEventLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : singleEventData?.data?.results !== undefined ? (
          <AthletesTable
            type="Individuais"
            data={singleEventData?.data?.results[0].individuals}
            columnsHeaders={columnMaping}
            actions={false}
            selection={false}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
          ></AthletesTable>
        ) : null}
      </Grid>
    </>
  );
}
