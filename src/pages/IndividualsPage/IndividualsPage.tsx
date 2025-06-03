import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import AthletesTable from "../../components/Table/AthletesTable";
import AthletesModal from "../../components/AthletesModal/AthletesModal";
import { useQuery } from "@tanstack/react-query";
import { useFetchIndividualsData, useRemoveAllIndividualsData } from "../../hooks/useIndividualsData";

const fetchEventName = (eventId: any) => {
  return axios.get(`http://127.0.0.1:8000/competitions/${eventId}/`);
};

export default function IndividualsPage() {
  type Athlete = {
    id: string;
    first_name: string;
    last_name: string;
    category: string;
    gender: string;
    match_type: string;
  };

  type Individual = {
    id: string;
    athlete: Athlete;
    competition: string;
    dojo: number;
    first_name: string;
    last_name: string;
    category: string;
    match_type: string;
    gender: string;
  };

  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const {
    data: individualsData,
    isLoading: isIndividualsLoading,
    error: individualsError,
  } = useFetchIndividualsData(page + 1, pageSize);

  const {
    data: eventData,
    isLoading: isEventLoading,
    error: eventError,
  } = useQuery({
    queryKey: ["event-name", location.pathname.split("/")[2]],
    queryFn: () => fetchEventName(location.pathname.split("/")[2]),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!location.pathname.split("/")[2],
  });

  const indivRows = useMemo(() => {
    return individualsData?.data?.results.map((indiv: Individual) => ({
      id: indiv.id,
      athlete_id: indiv.athlete.id,
      first_name: indiv.first_name,
      last_name: indiv.last_name,
      category: indiv.category,
      match_type: indiv.match_type,
      gender: indiv.gender,
    }));
  }, [individualsData]);

  const columnMaping = [
    { key: "first_name", label: "Primeiro Nome" },
    { key: "last_name", label: "Último Nome" },
    { key: "match_type", label: "Partida" },
    { key: "category", label: "Escalão" },
    { key: "gender", label: "Género" },
  ];

  console.log(indivRows);

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
        {isIndividualsLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : individualsData?.data?.results !== undefined ? (
          <AthletesTable
            type="Individuais"
            data={indivRows}
            columnsHeaders={columnMaping}
            actions={true}
            selection={true}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
          ></AthletesTable>
        ) : null}
      </Grid>
      <Grid sx={{ m: 4 }}>
        <Button
          sx={{ m: 1 }}
          variant="contained"
          size="large"
          color="success"
          onClick={() => setIsModalOpen(true)}
          startIcon={<Add />}
        >
          Selecionar Atletas
        </Button>
      </Grid>
      <AthletesModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        eventName={eventData?.data}
      ></AthletesModal>
    </>
  );
}
