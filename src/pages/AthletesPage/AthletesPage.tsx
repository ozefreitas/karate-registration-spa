import { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import AthletesTable from "../../components/Table/AthletesTable";
import AddButton from "../../components/Buttons/AddButton";
import { useNavigate } from "react-router-dom";
import { useFetchAthletesData } from "../../hooks/useAthletesData";

export default function AthletesPage(props: Readonly<{ userRole: string }>) {
  type Dojo = {
    id: string;
    username: string;
    role: string;
  };

  type Athlete = {
    id: string;
    first_name: string;
    last_name: string;
    category: string;
    gender: string;
    dojo: Dojo;
  };

  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  const {
    data: athletesData,
    isLoading: isAthletesDataLoading,
    error: athletesError,
  } = useFetchAthletesData(page + 1, pageSize);

  // Memoize `rows` to compute only when `athletes` changes
  const athleteRows = useMemo(() => {
    return athletesData?.data.results.map((athlete: Athlete) => ({
      id: athlete.id,
      first_name: athlete.first_name,
      last_name: athlete.last_name,
      category: athlete.category,
      gender: athlete.gender,
      username: athlete.dojo.username,
    }));
  }, [athletesData]);

  const columnMaping = [
    { key: "first_name", label: "Primeiro Nome" },
    { key: "last_name", label: "Último Nome" },
    { key: "category", label: "Escalão" },
    { key: "gender", label: "Género" },
    { key: "username", label: "Dojo" },
  ];

  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página de Atletas"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá consultar todos os seus Atletas/Alunos, e também Equipas.
          Pode consultar a informação de cada um, editar e remover. <p></p>
          <strong>Importante</strong>: Estes não servem como inscrição em
          qualquer prova.
        </CardContent>
      </Card>
      {/* Atletas */}
      <Grid size={12} sx={{ m: 2 }}>
        {isAthletesDataLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : athletesData?.data !== undefined ? (
          <AthletesTable
            type="Atletas"
            data={athleteRows}
            columnsHeaders={columnMaping}
            actions
            selection
            editable
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            userRole={props.userRole}
          ></AthletesTable>
        ) : null}
      </Grid>
      {props.userRole === "national_association" ? (
        <Grid sx={{ m: 3, mt: 2 }}>
          <AddButton label="Adicionar" to="new_athlete/"></AddButton>
        </Grid>
      ) : null}
    </>
  );
}
