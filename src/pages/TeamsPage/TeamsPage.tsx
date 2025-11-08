import { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import AddButton from "../../components/Buttons/AddButton";
import AthletesTable from "../../components/Table/AthletesTable";
import { useFetchTeamsData } from "../../hooks/useTeamsData";
import { useAuth } from "../../access/GlobalAuthProvider";
import PageInfoCard from "../../components/info-cards/PageInfoCard";

export default function TeamsPage(props: Readonly<{ userRole: string }>) {
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

  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  const { data: teamsData, isLoading: isTeamsLoading } = useFetchTeamsData(
    page + 1,
    pageSize
  );

  const { user } = useAuth();
  const userRole = user?.data.role;

  const teamRows = useMemo(() => {
    return teamsData?.data.results.map((team: Team) => ({
      id: team.id,
      team_number: team.team_number,
      athlete1: team.athlete1_full_name,
      athlete2: team.athlete2_full_name,
      athlete3: team.athlete3_full_name,
      category: team.category,
      gender: team.gender,
      match_type: team.match_type,
    }));
  }, [teamsData]);

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
      <PageInfoCard
        description="Aqui poderá consultar todas as Equipas que registou na plataforma.
          Pode consultar a informação de cada uma, editar e remover. <p></p>
          <strong>Importante</strong>: Estas não servem como inscrição em
          qualquer prova."
        title="Equipas"
      ></PageInfoCard>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página de Equipas"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent></CardContent>
      </Card>
      <Grid size={12} sx={{ m: 2 }}>
        {isTeamsLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : teamsData?.data === undefined ? null : (
          <AthletesTable
            count={teamsData?.data.length}
            type="Equipas"
            data={teamRows}
            columnsHeaders={columnMaping}
            actions
            deletable
            selection
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            userRole={props.userRole}
          ></AthletesTable>
        )}
      </Grid>
      {userRole === "main_admin" ? null : (
        <Grid sx={{ m: 3, mt: 2 }}>
          <AddButton label="Adicionar" to="new_team/"></AddButton>
        </Grid>
      )}
    </>
  );
}
