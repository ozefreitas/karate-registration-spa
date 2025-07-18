import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import AthletesTable from "../../components/Table/AthletesTable";
import AthletesModal from "../../components/AthletesModal/AthletesModal";
import {
  useSingleFetchEventData,
  useFetchDisciplinesData,
} from "../../hooks/useEventData";

export default function IndividualsPage(
  props: Readonly<{ state?: boolean; userRole: string }>
) {
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const {
    data: singleEventData,
    isLoading: isSingleEventLoading,
    error: singleEventError,
  } = useSingleFetchEventData(location.pathname.split("/").slice(-3)[0]);

  const { data: disciplinesData } = useFetchDisciplinesData(
    location.pathname.split("/").slice(-3)[0]
  );

  const state = singleEventData?.data.is_open
    ? "Inscrições abertas"
    : singleEventData?.data.is_retification
    ? "Período de retificações"
    : "Inscrições fechadas";

  const columnMaping = [
    { key: "first_name", label: "Primeiro Nome" },
    { key: "last_name", label: "Último Nome" },
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
          a mesma coisa). <br /> Tal como presente nas regras, no período de
          retificações apenas pode eliminar inscrições, e quando as inscrições
          estiverem fechadas não podem ser efetuadas operações, apenas ser
          visualizadas as isncrições.
        </CardContent>
      </Card>
      <Grid container sx={{ m: 2 }}>
        <Grid size={3}>
          <Card>
            <CardContent
              sx={{
                p: 2,
                "&:last-child": {
                  paddingBottom: 2,
                },
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                Estado: {state}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid size={12} sx={{ m: 2 }}>
        {isSingleEventLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : disciplinesData?.data.results.length !== 0 ? (
          disciplinesData?.data.results.map((discipline: any) => (
            <>
              <Typography sx={{ m: 3 }} variant="h5">
                {discipline.name}
              </Typography>
              <AthletesTable
                type="Modalidades"
                discipline={discipline.id}
                data={discipline.individuals}
                columnsHeaders={columnMaping}
                actions={true}
                selection={true}
                editable={!singleEventData?.data.is_closed}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                userRole={props.userRole}
              ></AthletesTable>
            </>
          ))
        ) : (
          <AthletesTable
            type="Individuais"
            data={singleEventData?.data.individuals}
            columnsHeaders={columnMaping}
            actions={true}
            selection={true}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            userRole={props.userRole}
          ></AthletesTable>
        )}
      </Grid>
      {singleEventData?.data.is_open ? (
        <Grid container justifyContent="flex-end" sx={{ m: 4 }}>
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
      ) : null}
      <AthletesModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        eventData={singleEventData?.data}
      ></AthletesModal>
    </>
  );
}
