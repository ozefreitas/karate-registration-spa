import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Grid,
  Button,
  Box,
  CircularProgress,
  Typography,
  Paper,
  CardHeader,
} from "@mui/material";
import { Add, HowToReg, Visibility } from "@mui/icons-material";
import AllUseTable from "../../components/Table/AllUseTable";
import MembersModal from "../../components/Modals/MembersModal";
import { disciplinesHooks, eventsHooks } from "../../hooks";
import CategoriesReadOnlyModal from "../../components/Categories/CategoriesReadOnlyModal";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import { formatDateTime, getFullDate } from "../../utils/utils";
import UnAuthorizedPage from "../ErrorPages/UnAuthorizedPage";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartToolTip,
  Cell,
} from "recharts";

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

  const { data: categoryStats } =
    eventsHooks.useRegistrationsPerEventPerCategoryData(eventId!);

  const chartData = categoryStats?.map((row: any) => ({
    name: row.discipline_name + " - " + row.category_name,
    number_registrations: row.member_count,
  }));

  const { data: singleEventData, isLoading: isSingleEventLoading } =
    eventsHooks.useFetchSingleEventData(eventId!);

  const { data: disciplinesData, isLoading: isDisciplinesLoading } =
    disciplinesHooks.useFetchDisciplinesData(
      eventId!,
      false,
      false,
      Boolean(singleEventData?.has_any_team) &&
        ["main_admin", "superuser", "single_admin"].includes(props.userRole) ===
          true
        ? undefined
        : false,
    );

  const state = singleEventData?.is_open
    ? "Inscrições abertas"
    : singleEventData?.is_retification
      ? "Período de retificações"
      : "Inscrições Encerradas";

  const getIndividualColumnMapping = (isCoach?: boolean) => {
    // Base columns except the one that must be last
    const baseColumns = [{ key: "full_name", label: "Nome" }];

    // Conditionally add category
    if (
      disciplinesData?.results.length !== 0 &&
      (isCoach === undefined || isCoach === false)
    ) {
      baseColumns.push({ key: "category", label: "Escalão" });
    }
    baseColumns.push({ key: "gender", label: "Género" });
    if (["main_admin", "single_admin", "superuser"].includes(props.userRole)) {
      baseColumns.push({ key: "club", label: "Clube" });
    }
    // Always add this one last
    baseColumns.push({ key: "added_at", label: "Data Inscrição" });

    return baseColumns;
  };

  const individualsColumnMaping = getIndividualColumnMapping();

  const getTeamsColumnMapping = () => {
    // Base columns except the one that must be last
    const baseColumns = [
      { key: "member1", label: "Atleta 1" },
      { key: "member2", label: "Atleta 2" },
      { key: "member3", label: "Atleta 3" },
      { key: "category", label: "Escalão" },
      { key: "gender", label: "Género" },
      { key: "club", label: "Clube" },
      { key: "added_at", label: "Data Inscrição" },
    ];

    return baseColumns;
  };

  const teamsColumnMaping = getTeamsColumnMapping();

  if (
    singleEventData?.event_date! < getFullDate() &&
    !["main_admin", "single_admin"].includes(props.userRole)
  ) {
    return <UnAuthorizedPage></UnAuthorizedPage>;
  }

  function generateDistinctColors(count: number) {
    return Array.from({ length: count }, (_, i) => {
      const hue = Math.round((360 / count) * i);
      return `hsl(${hue}, 65%, 55%)`;
    });
  }

  const colors = generateDistinctColors(chartData?.length!);

  const CustomTooltip = ({ active, payload }: any) => {
    const isVisible = active && payload && payload.length;
    return (
      <div
        className="custom-tooltip"
        style={{ visibility: isVisible ? "visible" : "hidden" }}
      >
        {isVisible && (
          <Paper elevation={1} sx={{ py: 2, px: 3 }}>
            <Typography
              fontWeight={"bold"}
            >{`Número de inscritos: ${payload[0].value}`}</Typography>
            {/* <p>Anything you want can be displayed here.</p> */}
          </Paper>
        )}
      </div>
    );
  };

  return (
    <>
      <PageInfoCard
        description={
          <>
            Aqui poderá consultar todos os Membros que estão inscritos para a
            prova que selecionou. <p></p> Tal como presente nas regras, no
            período de retificações apenas pode eliminar inscrições, e quando as
            inscrições estiverem fechadas não podem ser efetuadas operações,
            apenas ser visualizadas as inscrições. <p></p>
            Ao clicar em "Selecionar Atleta", apenas irão aparecer aqueles que
            estejam marcados como "Competidores". Se Membro não constar na
            lista, por favor verifique na página de perfil desse Membro se o
            campo "É Competidor" está selecionado. Caso não possua uma
            subscrição, contacte um administrador de imediato.
          </>
        }
        title={`Inscritos em ${singleEventData?.name}`}
      ></PageInfoCard>
      <Grid container mx={4}>
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
                  px={2}
                  sx={{
                    fontWeight: "bold",
                    color: singleEventData?.is_open
                      ? "green"
                      : singleEventData?.is_retification
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
      <Grid size={12} m={2}>
        {isSingleEventLoading || isDisciplinesLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : disciplinesData?.results.length === 0 ? (
          <AllUseTable
            type="Individuais"
            data={singleEventData?.individuals}
            count={singleEventData?.individuals.length!}
            columnsHeaders={individualsColumnMaping}
            actions
            selection={["main_admin", "superuser", "subed_club"].includes(
              props.userRole,
            )}
            deletable={["main_admin", "superuser", "subed_club"].includes(
              props.userRole,
            )}
            userRole={props.userRole}
          />
        ) : (
          <>
            <Grid size={12} width="100%">
              <Card sx={{ m: 2, my: 5 }}>
                <CardHeader
                  title={
                    <Grid container alignItems="center" gap={2}>
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        color="#fff"
                        bgcolor="#004d1f"
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: 1.5,
                        }}
                      >
                        <HowToReg sx={{ fontSize: 28 }} />
                      </Grid>

                      <Typography variant="h5" fontWeight="bold">
                        Inscrições por Escalão
                      </Typography>
                    </Grid>
                  }
                />

                <CardContent sx={{ width: "100%" }}>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="1 1" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <RechartToolTip content={CustomTooltip} />
                      <Bar dataKey="number_registrations">
                        {chartData?.map((entry, i) => (
                          <Cell
                            key={entry.name}
                            fill={colors[i % colors.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {disciplinesData?.results.map((discipline: any, index: any) => {
              const disciplineIndividuals = discipline?.individuals.map(
                (personInfo: any) => ({
                  id: personInfo.person.id,
                  full_name: personInfo.person.full_name,
                  gender: personInfo.person.gender,
                  club: personInfo.person.club,
                  category:
                    personInfo.category === null ? (
                      <Typography color="textDisabled">N/A</Typography>
                    ) : personInfo.category.min_weight === null &&
                      personInfo.category.max_weight === null ? (
                      personInfo.category.name
                    ) : personInfo.category.min_weight !== null &&
                      personInfo.category.max_weight === null ? (
                      `${personInfo.category.name} +${personInfo.category.min_weight}Kg`
                    ) : (
                      `${personInfo.category.name} -${personInfo.category.max_weight}Kg`
                    ),
                  added_at: formatDateTime(personInfo.added_at, "both"),
                }),
              );

              const disciplineTeams = discipline?.teams.map(
                (teamInfo: any) => ({
                  id: teamInfo.team.id,
                  member1:
                    teamInfo.team.athlete1 === null ? (
                      <Typography color="textDisabled">N/A</Typography>
                    ) : (
                      teamInfo.team.athlete1.full_name
                    ),
                  member2:
                    teamInfo.team.athlete2 === null ? (
                      <Typography color="textDisabled">N/A</Typography>
                    ) : (
                      teamInfo.team.athlete2.full_name
                    ),
                  member3:
                    teamInfo.team.athlete3 === null ? (
                      <Typography color="textDisabled">N/A</Typography>
                    ) : (
                      teamInfo.team.athlete3.full_name
                    ),
                  gender:
                    teamInfo.team.gender === "Masculino"
                      ? "M"
                      : teamInfo.team.gender === "Feminino"
                        ? "F"
                        : "Misto",
                  category: teamInfo.team.category.name,
                  added_at: formatDateTime(teamInfo.added_at, "both"),
                }),
              );

              return (
                <span key={index}>
                  <Grid
                    size={12}
                    pr={2}
                    mt={3}
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography p={3} variant="h5" fontWeight="bold">
                      {discipline.name}
                    </Typography>

                    <Grid container spacing={2}>
                      {singleEventData?.has_categories && (
                        <Button
                          startIcon={<Visibility />}
                          variant="contained"
                          onClick={() =>
                            handleCategoriesListModalOpen(discipline.name)
                          }
                        >
                          Escalões
                        </Button>
                      )}
                    </Grid>
                  </Grid>

                  {disciplineIndividuals.length !== 0 ? (
                    <AllUseTable
                      count={discipline.individuals.length}
                      type="Modalidades"
                      discipline={discipline.id}
                      data={disciplineIndividuals}
                      columnsHeaders={individualsColumnMaping}
                      actions
                      selection
                      deletable
                      userRole={props.userRole}
                    />
                  ) : disciplineTeams.length !== 0 ? (
                    <AllUseTable
                      count={discipline.teams.length}
                      type="Modalidades"
                      discipline={discipline.id}
                      data={disciplineTeams}
                      columnsHeaders={teamsColumnMaping}
                      actions
                      selection
                      deletable
                      userRole={props.userRole}
                    />
                  ) : (
                    <AllUseTable
                      count={0}
                      type="Modalidades"
                      discipline={discipline.id}
                      data={[]}
                      columnsHeaders={teamsColumnMaping}
                      actions
                      selection
                      deletable
                      userRole={props.userRole}
                    />
                  )}
                </span>
              );
            })}
          </>
        )}
      </Grid>
      {singleEventData?.is_open ? (
        <Grid container justifyContent="flex-end" m={4}>
          <Button
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
      <MembersModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        eventData={singleEventData}
        disciplinesData={disciplinesData}
      ></MembersModal>
      {currentDiscipline === "" ? null : (
        <CategoriesReadOnlyModal
          currentDisicpline={currentDiscipline}
          disciplineData={disciplinesData?.results.filter(
            (disicpline: any) => disicpline.name === currentDiscipline,
          )}
          handleModalClose={handleCategoriesListModalClose}
          isModalOpen={isCategoriesListModalOpen}
        ></CategoriesReadOnlyModal>
      )}
    </>
  );
}
