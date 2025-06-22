import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import AthletesTable from "../../components/Table/AthletesTable";
import { useSingleFetchEventData } from "../../hooks/useEventData";
import { useLocation } from "react-router-dom";

export default function EventAllRegistryPage() {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(25);
  const location = useLocation();

  const {
    data: singleEventData,
    isLoading: isSingleEventLoading,
    error: singleEventError,
  } = useSingleFetchEventData(location.pathname.split("/").slice(-3)[0]);

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
        ) : singleEventData?.data !== undefined ? (
          <AthletesTable
            type="Individuais"
            data={singleEventData?.data.individuals}
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
