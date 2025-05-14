import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardHeader, CardContent, Grid } from "@mui/material";
import AddButton from "../../components/AddButton/AddButton";
import AthletesTable from "../../components/Table/AthletesTable";

export default function IndividualsPage() {
  type Individual = {
    id: string;
    competition: string;
    dojo: number;
    first_name: string;
    last_name: string;
    category: string;
    match_type: string;
    gender: string;
  };

  const location = useLocation()
  const [individuals, setIndividuals] = useState<Individual[]>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/individuals/", {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
          in_competition: location.pathname.split("/")[2],
        },
      })
      .then((response) => setIndividuals(response.data))
      .catch((error) => console.error(error));
  }, []);

  const indivRows = useMemo(() => {
    return individuals?.map((indiv) => ({
      id: indiv.id,
      first_name: indiv.first_name,
      last_name: indiv.last_name,
      category: indiv.category,
      gender: indiv.gender,
      match_type: indiv.match_type,
    }));
  }, [individuals]);

  const columnMaping = [
    { key: "first_name", label: "Atleta 1" },
    { key: "last_name", label: "Atleta 2" },
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
          prova que selecionou (ver abaixo). Alterar informações de um Atleta
          irá modificar o próprio Atleta, e não apenas a própria inscrição (são
          a mesma coisa).
        </CardContent>
      </Card>
      <Grid size={12} sx={{ m: 2 }}>
        {individuals !== undefined ? (
          <AthletesTable
            type="Individuais"
            data={indivRows}
            columnsHeaders={columnMaping}
            searchColumns={["first_name", "last_name", "category"]}
          ></AthletesTable>
        ) : null}
      </Grid>
      <Grid>
        <AddButton label="Adicionar" to="register/"></AddButton>
      </Grid>
    </>
  );
}
