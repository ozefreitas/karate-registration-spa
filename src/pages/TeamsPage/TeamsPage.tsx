import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { Card, CardHeader, CardContent, Grid } from "@mui/material";
import AddButton from "../../components/AddButton/AddButton";
import AthletesTable from "../../components/Table/AthletesTable";

export default function TeamsPage() {
  type Athlete = {
    id: string;
    first_name: string;
    last_name: string;
    category: string;
    gender: string;
    match_type: string;
  };

  type Team = {
    id: string;
    team_number: number;
    athlete1: Athlete;
    athlete1_full_name: string;
    athlete2_full_name: string;
    athlete3_full_name: string;
    athlete2: Athlete;
    athlete3: Athlete;
    category: string;
    gender: string;
    match_type: string;
  };

  const [teams, setTeams] = useState<Team[]>([]);
  const [teamsPage, setTeamsPage] = useState<number>(1);
  const [teamsPageSize, setTeamsPageSize] = useState<number>(10);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/teams/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => setTeams(response.data))
      .catch((error) => console.error(error));
  }, []);

  const teamRows = useMemo(() => {
    return teams.map((team) => ({
      id: team.id,
      team_number: team.team_number,
      athlete1: team.athlete1_full_name,
      athlete2: team.athlete2_full_name,
      athlete3: team.athlete3_full_name,
      category: team.category,
      gender: team.gender,
      match_type: team.match_type,
    }));
  }, [teams]);

  const columnMaping = [
    { key: "athlete1", label: "Atleta 1" },
    { key: "athlete2", label: "Atleta 2" },
    { key: "athlete3", label: "Atleta 3" },
    { key: "match_type", label: "Partida" },
    { key: "category", label: "Escalão" },
    { key: "gender", label: "Género" },
    { key: "team_number", label: "Número" },
  ];

  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página de Equipas"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá consultar todas as Equipas que registou na plataforma.
          Pode consultar a informação de cada uma, editar e remover. <p></p>
          <strong>Importante</strong>: Estas não servem como inscrição em
          qualquer prova.
        </CardContent>
      </Card>
      <AthletesTable
        type="Equipas"
        data={teamRows}
        columnsHeaders={columnMaping}
        searchColumns={["athlete1", "athlete2", "athlete3", "category"]}
      ></AthletesTable>
      <Grid>
        {/* This button should get back to the individuals page */}
        <AddButton label="Adicionar" to="new_team/"></AddButton>
      </Grid>
    </>
  );
}
