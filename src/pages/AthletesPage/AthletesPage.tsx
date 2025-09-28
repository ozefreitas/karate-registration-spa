import { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Box,
  CircularProgress,
  ListItem,
  ListItemText,
} from "@mui/material";
import AthletesTable from "../../components/Table/AthletesTable";
import AddButton from "../../components/Buttons/AddButton";
import { membersHooks } from "../../hooks";

export default function AthletesPage(props: Readonly<{ userRole: string }>) {
  type Club = {
    id: string;
    username: string;
    role: string;
  };

  type Athlete = {
    id: string;
    first_name: string;
    last_name: string;
    gender: string;
    club: Club;
    age: string;
  };

  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  const {
    data: athletesData,
    isLoading: isAthletesDataLoading,
    error: athletesError,
  } = membersHooks.useFetchMembersData(page + 1, pageSize);

  // Memoize `rows` to compute only when `athletes` changes
  const athleteRows = useMemo(() => {
    return athletesData?.data.results.map((athlete: Athlete) => ({
      id: athlete.id,
      first_name: athlete.first_name,
      last_name: athlete.last_name,
      gender: athlete.gender,
      username: athlete.club.username,
      age: athlete.age,
    }));
  }, [athletesData]);

  const getColumnMaping = () => {
    const columnMapping = [
      { key: "first_name", label: "Primeiro Nome" },
      { key: "last_name", label: "Último Nome" },
      { key: "gender", label: "Género" },
    ];
    if (props.userRole === "main_admin") {
      columnMapping.push({ key: "username", label: "Clube" });
    } else {
      columnMapping.push({ key: "age", label: "Idade" });
    }
    return columnMapping;
  };

  const columnMaping = getColumnMaping();

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
          {props.userRole !== "main_admin" ? (
            <>
              Aqui poderá consultar todos os seus Atletas/Alunos e consultar a
              informação detalhada de cada um (caso possua uma subscrição).
              <p></p>
              <strong>Importante</strong>: Estes não servem como inscrição em
              qualquer prova. A idade aqui apresentada não é a utilizada como
              referência para as inscrições. Em vez disso, a idade é calculada
              para cada prova de acordo com as regras em vigor e da época
              desportiva corrente.
            </>
          ) : (
            <>
              Aqui poderá consultar todos os Atletas/Alunos tutelados por si.
              Pode consultar a informação de cada um, editar e remover.
            </>
          )}
        </CardContent>
      </Card>
      <Grid size={12} sx={{ m: 2 }}>
        {isAthletesDataLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : athletesError ? (
          <Grid sx={{ mt: 3 }} container justifyContent="center" size={12}>
            <ListItem>
              <ListItemText primary="Um erro ocorreu ao encontrar os seus Atletas, tente mais tarde ou contacte um administrador."></ListItemText>
            </ListItem>
          </Grid>
        ) : athletesData?.data !== undefined ? (
          <AthletesTable
            type="Atletas"
            data={athleteRows}
            count={athletesData?.data.count}
            columnsHeaders={columnMaping}
            actions
            selection
            editable
            deletable
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            userRole={props.userRole}
          ></AthletesTable>
        ) : null}
      </Grid>
      {props.userRole === "main_admin" ? (
        <Grid sx={{ m: 3, mt: 2 }}>
          <AddButton label="Adicionar" to="new_athlete/"></AddButton>
        </Grid>
      ) : null}
    </>
  );
}
