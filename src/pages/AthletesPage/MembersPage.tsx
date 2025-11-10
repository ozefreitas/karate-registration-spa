import { useState, useMemo } from "react";
import {
  Grid,
  Box,
  CircularProgress,
  ListItem,
  ListItemText,
} from "@mui/material";
import AthletesTable from "../../components/Table/AthletesTable";
import AddButton from "../../components/Buttons/AddButton";
import { membersHooks } from "../../hooks";
import PageInfoCard from "../../components/info-cards/PageInfoCard";

export default function MembersPage(props: Readonly<{ userRole: string }>) {
  type Club = {
    id: string;
    username: string;
    role: string;
  };

  type Member = {
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
    return athletesData?.data.results.map((athlete: Member) => ({
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
    if (props.userRole === "main_admin" || props.userRole === "superuser") {
      columnMapping.push({ key: "username", label: "Clube" });
    } else {
      columnMapping.push({ key: "age", label: "Idade" });
    }
    return columnMapping;
  };

  const columnMaping = getColumnMaping();

  return (
    <>
      <PageInfoCard
        description={
          props.userRole === "main_admin" ? (
            <>
              Aqui poderá consultar todos os Atletas/Alunos tutelados por si.
              Pode consultar a informação de cada um, editar e remover.
            </>
          ) : (
            <>
              Aqui poderá consultar todos os seus Membros e consultar a
              informação detalhada de cada um (caso possua uma subscrição).
              <p></p>
              <strong>Importante</strong>: Estes não servem como inscrição em
              qualquer prova. A idade aqui apresentada não é a utilizada como
              referência para as inscrições. Em vez disso, a idade é calculada
              para cada prova de acordo com as regras em vigor e da época
              desportiva corrente.
            </>
          )
        }
        title="Membros"
      ></PageInfoCard>
      <Grid size={12} sx={{ m: 2 }}>
        {isAthletesDataLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : athletesError ? (
          <Grid sx={{ mt: 3 }} container justifyContent="center" size={12}>
            <ListItem>
              <ListItemText primary="Ocorreu um erro ao encontrar os seus Atletas, tente mais tarde ou contacte um administrador."></ListItemText>
            </ListItem>
          </Grid>
        ) : athletesData?.data === undefined ? null : (
          <AthletesTable
            type="Atletas"
            data={athleteRows}
            count={athletesData?.data.count}
            columnsHeaders={columnMaping}
            actions
            editable={["main_admin", "superuser", "subed_club"].includes(
              props.userRole
            )}
            selection={["main_admin", "superuser", "subed_club"].includes(
              props.userRole
            )}
            deletable={["main_admin", "superuser", "subed_club"].includes(
              props.userRole
            )}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            userRole={props.userRole}
          ></AthletesTable>
        )}
      </Grid>
      {props.userRole === "main_admin" || props.userRole === "subed_club" ? (
        <Grid sx={{ m: 3, mt: 2 }}>
          <AddButton label="Adicionar" to="new_member/"></AddButton>
        </Grid>
      ) : null}
    </>
  );
}
