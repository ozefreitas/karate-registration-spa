import axios from "axios";
import { useState, useMemo } from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import AthletesTable from "../../components/Table/AthletesTable";
import { useQuery } from "@tanstack/react-query";
import AddButton from "../../components/AddButton/AddButton";
import { useNavigate } from "react-router-dom";

const fetchAthletes = () => {
  const token = localStorage.getItem("token");
  return axios.get("http://127.0.0.1:8000/athletes/", {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export default function AthletesPage() {
  type Athlete = {
    id: string;
    first_name: string;
    last_name: string;
    category: string;
    gender: string;
    match_type: string;
  };

  const [athletesPage, setAthletesPage] = useState<number>(1);
  const [athletesPageSize, setAthletesPageSize] = useState<number>(10);
  const navigate = useNavigate();

  const {
    data: athletesData,
    isLoading: isAthletesDataLoading,
    error: athletesError,
  } = useQuery({
    queryKey: ["athletes"],
    queryFn: fetchAthletes,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // Memoize `rows` to compute only when `athletes` changes
  const athleteRows = useMemo(() => {
    return athletesData?.data.map((athlete: Athlete) => ({
      id: athlete.id,
      first_name: athlete.first_name,
      last_name: athlete.last_name,
      category: athlete.category,
      gender: athlete.gender,
      match_type: athlete.match_type,
    }));
  }, [athletesData]);

  const [athletesSearchTerm, setAthletesSearchTerm] = useState("");

  const handleAthletesSearch = (e: any) => {
    setAthletesSearchTerm(e.target.value.toLowerCase());
  };

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
            searchColumns={["first_name", "last_name", "category"]}
            actions={true}
          ></AthletesTable>
        ) : null}
      </Grid>
      <Grid sx={{ m: 4 }}>
        <AddButton label="Adicionar" to="new_athlete/"></AddButton>
      </Grid>
    </>
  );
}
