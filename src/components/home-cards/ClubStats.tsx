import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";
import { stringToColor } from "../../dashboard/utils/avatarColor";
import {
  Grid,
  Card,
  CardHeader,
  Paper,
  CircularProgress,
  Typography,
  CardContent,
  // ListItem,
  // ListItemButton,
  // ListItemIcon,
  // ListItemText,
} from "@mui/material";
import { adminHooks, eventsHooks } from "../../hooks";
import { HowToReg, Person } from "@mui/icons-material";

export default function ClubStats() {
  const { data: clubMembersData, isLoading: isClubMembersLoading } =
    adminHooks.useFetchClubMembersData();

  const { data: registrationsPerEventData } =
    eventsHooks.useRegistrationsPerEventData();

  const CustomTooltip = ({ active, payload }: any) => {
    const isVisible = active && payload && payload.length;
    return (
      <div
        className="custom-tooltip"
        style={{ visibility: isVisible ? "visible" : "hidden" }}
      >
        {isVisible && (
          <Paper elevation={1} sx={{ pl: 2, pr: 2 }}>
            <p>{`${payload[0].payload.username} : ${payload[0].value}`}</p>
            {/* <p>Anything you want can be displayed here.</p> */}
          </Paper>
        )}
      </div>
    );
  };

  const totals = clubMembersData?.reduce(
    (acc: any, user: any) => {
      acc.student += user.student_count || 0;
      acc.coach += user.coach_count || 0;
      acc.athlete += user.athlete_count || 0;
      return acc;
    },
    { student: 0, coach: 0, athlete: 0 },
  );

  return (
    <>
      {["student", "athlete", "coach"].map((item: string, index: any) => (
        <Grid key={index} size={{ sm: 12, md: 6, lg: 4 }}>
          <Card sx={{ m: 2 }}>
            <CardHeader
              title={
                <Grid container alignItems={"center"} gap={2}>
                  <Grid
                    container
                    justifyContent={"center"}
                    alignItems={"center"}
                    color={"#fff"}
                    bgcolor={"#1976d2"}
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 1.5,
                    }}
                  >
                    <Person sx={{ fontSize: 28 }} />
                  </Grid>
                  <Typography variant="h5" fontWeight={"bold"}>
                    {item === "student"
                      ? "Alunos por Clube"
                      : item === "athlete"
                        ? "Atletas por Clube"
                        : "Treinadores por Clube"}
                  </Typography>
                </Grid>
              }
            ></CardHeader>
            <Grid sx={{ height: 320 }}>
              {isClubMembersLoading ? (
                <Grid
                  size={12}
                  height={"100%"}
                  container
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <CircularProgress />
                </Grid>
              ) : totals[item] >= 1 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart width={500} height={500}>
                    <Tooltip content={CustomTooltip} />
                    {/* <Legend layout="vertical" align="right" verticalAlign="middle" /> */}
                    <Pie
                      dataKey={`${item}_count`}
                      data={clubMembersData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      // fill="#8884d8"
                      label
                    >
                      {clubMembersData?.map((entry: any, index: number) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={stringToColor(entry.username)}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <Grid
                  size={12}
                  height={"100%"}
                  container
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography color="textDisabled">
                    Ainda não há{" "}
                    {item === "student"
                      ? "Alunos"
                      : item === "athlete"
                        ? "Atletas"
                        : "Treinadores"}{" "}
                    inscritos
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Card>
        </Grid>
      ))}
      <Grid size={12} width={"100%"}>
        <Card sx={{ m: 2 }}>
          <CardHeader
            title={
              <Grid container alignItems={"center"} gap={2}>
                <Grid
                  container
                  justifyContent={"center"}
                  alignItems={"center"}
                  color={"#fff"}
                  bgcolor={"#004d1f"}
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 1.5,
                  }}
                >
                  <HowToReg sx={{ fontSize: 28 }} />
                </Grid>
                <Typography variant="h5" fontWeight={"bold"}>
                  Inscrições por Evento
                </Typography>
              </Grid>
            }
          ></CardHeader>
          <CardContent sx={{ width: "100%" }}>
            {registrationsPerEventData?.length === 0 ? (
              <Grid
                size={12}
                mb={3}
                height={"100%"}
                container
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography color="textDisabled">
                  Ainda não há Eventos com inscritos
                </Typography>
              </Grid>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={registrationsPerEventData}>
                  <CartesianGrid strokeDasharray="1 1" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="number_registrations" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
