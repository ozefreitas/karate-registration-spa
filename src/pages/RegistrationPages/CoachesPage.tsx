import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Grid,
  Button,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import AthletesTable from "../../components/Table/AthletesTable";
import CoachesModal from "../../components/Modals/CoachesModal";
import { disciplinesHooks, eventsHooks } from "../../hooks";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import { formatDateTime } from "../../utils/utils";

export default function CoachesPage(props: Readonly<{ userRole: string }>) {
  const { id: eventId } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const {
    data: singleEventData,
    isLoading: isSingleEventLoading,
    error: singleEventError,
  } = eventsHooks.useFetchSingleEventData(eventId!);

  const {
    data: disciplinesData,
    isLoading: isCoachDisciplineLoading,
    error: disciplinesError,
  } = disciplinesHooks.useFetchDisciplinesData(eventId!, false, true);

  const state = singleEventData?.data.is_open
    ? "Inscrições abertas"
    : singleEventData?.data.is_retification
    ? "Período de retificações"
    : "Inscrições fechadas";

  // Memoize `rows` to compute only when `athletes` changes
  const registrationRows = useMemo(() => {
    return disciplinesData?.data.results[0].individuals.map(
      (memberInfo: any) => ({
        id: memberInfo.member.id,
        full_name: memberInfo.member.full_name,
        gender: memberInfo.member.gender,
        added_at: formatDateTime(memberInfo.added_at, "both"),
      })
    );
  }, [disciplinesData]);

  const getColumnMaping = () => {
    const columnMapping = [
      { key: "full_name", label: "Nome" },
      { key: "gender", label: "Género" },
      { key: "added_at", label: "Data Inscrição" },
    ];
    return columnMapping;
  };

  const columnMaping = getColumnMaping();

  return (
    <>
      <PageInfoCard
        description={
          <>
            Aqui poderá consultar todos os Treinadores que estão inscritos para
            a prova que selecionou. <p></p> Tal como presente nas regras, no
            período de retificações apenas pode eliminar inscrições, e quando as
            inscrições estiverem fechadas não podem ser efetuadas operações,
            apenas ser visualizadas as inscrições. <p></p>
            Ao clicar em "Inscrever", apenas irão aparecer aqueles que estejam
            marcados como "Treinador". Se alguém não constar na lista, por favor
            verifique na página de perfil desse Membro, se o campo "É
            Competidor" está presente algo está errado. Caso não possua uma
            subscrição, contacte um administrador de imediato.
          </>
        }
        title={`Treinadores inscritos em ${singleEventData?.data.name}`}
      ></PageInfoCard>
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
        {isSingleEventLoading || isCoachDisciplineLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : singleEventError || disciplinesError ? (
          <Grid
            sx={{ mt: 1, mb: 3 }}
            container
            justifyContent="center"
            size={12}
          >
            <Typography variant="h6" sx={{ color: "gray", mt: 2 }}>
              Ocorreu um erro ao encontrar os Treinadores inscritos para este
              Evento.
            </Typography>
          </Grid>
        ) : disciplinesData?.data.results.length === 0 ? null : (
          <AthletesTable
            type="Treinadores"
            data={registrationRows}
            count={disciplinesData?.data.results[0].individuals.length}
            discipline={disciplinesData?.data.results[0].id}
            columnsHeaders={columnMaping}
            actions
            selection={["main_admin", "superuser", "subed_club"].includes(
              props.userRole
            )}
            deletable={["main_admin", "superuser", "subed_club"].includes(
              props.userRole
            )}
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
            Inscrever
          </Button>
        </Grid>
      ) : null}
      <CoachesModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        eventData={singleEventData?.data}
        disciplineId={disciplinesData?.data.results[0].id}
      ></CoachesModal>
    </>
  );
}
