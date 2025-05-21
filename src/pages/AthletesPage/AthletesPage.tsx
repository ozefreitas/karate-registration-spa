import axios from "axios";
import { useState, useMemo } from "react";
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

  const handleAthletesSearch = (e: any) => {
    setAthletesSearchTerm(e.target.value.toLowerCase());
  };

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
              {athletesData?.data.length >= 1 ? (
                athletesData?.data.map((row: Athlete, index: string) => (
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
    </>
  );
}
