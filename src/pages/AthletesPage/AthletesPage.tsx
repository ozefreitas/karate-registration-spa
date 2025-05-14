import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddButton from "../../components/AddButton/AddButton";
import { useNavigate } from "react-router-dom";

export default function AthletesPage() {
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
    athlete2: Athlete;
    athlete3: Athlete;
    category: string;
    gender: string;
    match_type: string;
  };

  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/athletes/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => setAthletes(response.data))
      .catch((error) => console.error(error));
    axios
      .get("http://127.0.0.1:8000/teams/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => setTeams(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Memoize `rows` to compute only when `athletes` changes
  const athleteRows = useMemo(() => {
    return athletes.map((athlete) => ({
      id: athlete.id,
      first_name: athlete.first_name,
      last_name: athlete.last_name,
      category: athlete.category,
      gender: athlete.gender,
      match_type: athlete.match_type,
    }));
  }, [athletes]);

  const teamRows = useMemo(() => {
    return teams.map((team) => ({
      id: team.id,
      team_number: team.team_number,
      athlete1: team.athlete1,
      athlete2: team.athlete2,
      athlete3: team.athlete3,
      category: team.category,
      gender: team.gender,
      match_type: team.match_type,
    }));
  }, [teams]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "red",
      fontSize: 18,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
      backgroundColor: "#DBDBDB",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [athletesSearchTerm, setAthletesSearchTerm] = useState("");
  const [teamsSearchTerm, setTeamsSearchTerm] = useState("");

  const handleAthletesSearch = (e: any) => {
    setAthletesSearchTerm(e.target.value.toLowerCase());
  };

  const handleTeamsSearch = (e: any) => {
    setTeamsSearchTerm(e.target.value.toLowerCase());
  };

  const filteredAthleteRows = athleteRows.filter(
    (row) =>
      row.first_name.toLowerCase().includes(athletesSearchTerm) ||
      row.category.toLowerCase().includes(athletesSearchTerm)
  );

  const filteredTeamRows = teamRows.filter(
    (row) =>
      row.athlete1.first_name.toLowerCase().includes(teamsSearchTerm) ||
      row.athlete2.first_name.toLowerCase().includes(teamsSearchTerm) ||
      row.athlete3.first_name.toLowerCase().includes(teamsSearchTerm)
  );

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
      <Grid container sx={{ m: 2 }}>
        <Grid size={12} sx={{ mt: 2 }}>
          <Typography variant="h4">Atletas</Typography>
        </Grid>
        <Grid size={3}>
          <TextField
            label="Procurar por Nome, Escalão, ..."
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleAthletesSearch}
          />
        </Grid>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Primeiro Nome</StyledTableCell>
                <StyledTableCell>Último Nome</StyledTableCell>
                <StyledTableCell>Partida</StyledTableCell>
                <StyledTableCell>Categoria</StyledTableCell>
                <StyledTableCell>Género</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {filteredAthleteRows.length >= 1 ? (
                filteredAthleteRows.map((row, index) => (
                  <Tooltip key={index} title={"Consultar"}>
                    <StyledTableRow
                      hover
                      onClick={() => {
                        navigate(row.id);
                      }}
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {row.first_name}
                      </StyledTableCell>
                      <StyledTableCell>{row.last_name}</StyledTableCell>
                      <StyledTableCell>{row.match_type}</StyledTableCell>
                      <StyledTableCell>{row.category}</StyledTableCell>
                      <StyledTableCell>{row.gender}</StyledTableCell>
                    </StyledTableRow>
                  </Tooltip>
                ))
              ) : (
                <StyledTableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <StyledTableCell component="th" scope="row">
                    Não há resultados para essa procura
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid>
        <AddButton label="Adicionar" to="new_athlete/"></AddButton>
      </Grid>
      {/* Equipas */}
      <Grid container sx={{ m: 2 }}>
        <Grid size={12} sx={{ mt: 2 }}>
          <Typography variant="h4">Equipas</Typography>
        </Grid>
        <Grid size={3}>
          <TextField
            label="Procurar por Nome, Escalão, ..."
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleTeamsSearch}
          />
        </Grid>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Atleta 1</StyledTableCell>
                <StyledTableCell>Atleta 2</StyledTableCell>
                <StyledTableCell>Atleta 3</StyledTableCell>
                <StyledTableCell>Partida</StyledTableCell>
                <StyledTableCell>Categoria</StyledTableCell>
                <StyledTableCell>Género</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {filteredTeamRows.length >= 1 ? (
                filteredTeamRows.map((row, index) => (
                  <Tooltip key={index} title={"Consultar"}>
                    <StyledTableRow
                      hover
                      onClick={() => {
                        navigate(`/teams/${row.id}`);
                      }}
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {row.athlete1.first_name} {row.athlete1.last_name}
                      </StyledTableCell>
                      <StyledTableCell>{row.athlete2.first_name} {row.athlete2.last_name}</StyledTableCell>
                      <StyledTableCell>{row.athlete3.first_name} {row.athlete3.last_name}</StyledTableCell>
                      <StyledTableCell>{row.match_type}</StyledTableCell>
                      <StyledTableCell>{row.category}</StyledTableCell>
                      <StyledTableCell>{row.gender}</StyledTableCell>
                    </StyledTableRow>
                  </Tooltip>
                ))
              ) : (
                <StyledTableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <StyledTableCell component="th" scope="row">
                    Não há resultados para essa procura
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}
