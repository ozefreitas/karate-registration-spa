import { useState } from "react";
import { useParams } from "react-router-dom";
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
import { Add, Visibility } from "@mui/icons-material";
import AthletesTable from "../../components/Table/AthletesTable";
import AthletesModal from "../../components/AthletesModal/AthletesModal";
import { disciplinesHooks, eventsHooks } from "../../hooks";
import CategoriesReadOnlyModal from "../../components/Categories/CategoriesReadOnlyModal";

export default function IndividualsPage(props: Readonly<{ userRole: string }>) {
  const { id: eventId } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCategoriesListModalOpen, setIsCategoriesListModalOpen] =
    useState<boolean>(false);
  const [currentDiscipline, setCurrentDiscipline] = useState<string>("");

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCategoriesListModalClose = () => {
    setIsCategoriesListModalOpen(false);
  };

  const handleCategoriesListModalOpen = (disciplineName: string) => {
    setCurrentDiscipline(disciplineName);
    setIsCategoriesListModalOpen(true);
  };

  const { data: singleEventData, isLoading: isSingleEventLoading } =
    eventsHooks.useFetchSingleEventData(eventId!);

  const { data: disciplinesData } = disciplinesHooks.useFetchDisciplinesData(
    eventId!
  );

  const state = singleEventData?.data.is_open
    ? "Inscrições abertas"
    : singleEventData?.data.is_retification
    ? "Período de retificações"
    : "Inscrições fechadas";

  const getColumnMaping = () => {
    const columnMapping = [
      { key: "first_name", label: "Primeiro Nome" },
      { key: "last_name", label: "Último Nome" },
      { key: "gender", label: "Género" },
    ];
    if (
      disciplinesData?.data.results.length !== 0 &&
      singleEventData?.data.has_categories
    ) {
      columnMapping.push({ key: "category", label: "Escalão" });
    }
    return columnMapping;
  };

  const columnMaping = getColumnMaping();

  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title={`Página de inscritos em ${singleEventData?.data.name}`}
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá consultar todos os Atletas que estão inscritos para a
          prova que selecionou (ver acima). <br /> Tal como presente nas regras,
          no período de retificações apenas pode eliminar inscrições, e quando
          as inscrições estiverem fechadas não podem ser efetuadas operações,
          apenas ser visualizadas as inscrições. <br />
          Ao clicar em "Selecionar Atleta", apenas irão aparecer aqueles que
          estejam marcados como "Competidores". Se algum Atleta não constar na
          lista, por favor verifique na página de perfil desse Atleta se o campo
          "É Competidor" está selecionado. Caso não possua uma subscrição,
          contacte um administrador de imediato.
        </CardContent>
      </Card>
      <Grid container sx={{ m: 2 }}>
        <Grid>
          <Card>
            <CardContent
              sx={{
                p: 2,
                "&:last-child": {
                  paddingBottom: 2,
                },
              }}
            >
              {isSingleEventLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Typography
                  variant="h6"
                  sx={{
                    pl: 2,
                    pr: 2,
                    fontWeight: "bold",
                    color: singleEventData?.data.is_open
                      ? "green"
                      : singleEventData?.data.is_retification
                      ? "#ffc40c"
                      : "red",
                  }}
                >
                  Estado: {state}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid size={12} sx={{ m: 2 }}>
        {isSingleEventLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : disciplinesData?.data.results.length === 0 ? (
          <AthletesTable
            type="Individuais"
            data={singleEventData?.data.individuals}
            count={singleEventData?.data.individuals.length}
            columnsHeaders={columnMaping}
            actions
            selection
            deletable
            userRole={props.userRole}
          ></AthletesTable>
        ) : (
          disciplinesData?.data.results.map((discipline: any, index: any) => (
            <span key={index}>
              <Grid
                size={12}
                sx={{ pr: 3 }}
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography sx={{ m: 3 }} variant="h5">
                  {discipline.name}
                </Typography>
                {singleEventData?.data.has_categories ? (
                  <Button
                    startIcon={<Visibility />}
                    variant="contained"
                    onClick={() => {
                      handleCategoriesListModalOpen(discipline.name);
                    }}
                  >
                    Escalões
                  </Button>
                ) : null}
              </Grid>
              <AthletesTable
                count={discipline.individuals.length}
                type="Modalidades"
                discipline={discipline.id}
                data={discipline.individuals}
                columnsHeaders={columnMaping}
                actions
                selection
                deletable
                editable={!singleEventData?.data.is_closed}
                userRole={props.userRole}
              ></AthletesTable>
            </span>
          ))
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
      {currentDiscipline === "" ? null : (
        <CategoriesReadOnlyModal
          currentDisicpline={currentDiscipline}
          disciplineData={disciplinesData?.data.results.filter(
            (disicpline: any) => disicpline.name === currentDiscipline
          )}
          handleModalClose={handleCategoriesListModalClose}
          isModalOpen={isCategoriesListModalOpen}
        ></CategoriesReadOnlyModal>
      )}
    </>
  );
}
