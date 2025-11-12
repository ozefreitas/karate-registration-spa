import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { stringToColor } from "../../dashboard/utils/avatarColor";
import {
  Grid,
  Card,
  CardHeader,
  Paper,
  CircularProgress,
  Typography,
  // ListItem,
  // ListItemButton,
  // ListItemIcon,
  // ListItemText,
} from "@mui/material";
import { adminHooks } from "../../hooks";

export default function ClubStats() {
  const { data: ClubMembersData, isLoading: isClubMembersLoading } =
    adminHooks.useFetchClubAthletesData();

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

  const totals = ClubMembersData?.data.reduce(
    (acc: any, user: any) => {
      acc.student += user.student_count || 0;
      acc.coach += user.coach_count || 0;
      acc.athlete += user.athlete_count || 0;
      return acc;
    },
    { student: 0, coach: 0, athlete: 0 }
  );

  return (
    <>
      {["student", "athlete", "coach"].map((item: string, index: any) => (
        <Grid key={index} size={4}>
          <Card sx={{ m: 2 }}>
            <CardHeader
              title={
                item === "student"
                  ? "Alunos por Clube"
                  : item === "athlete"
                  ? "Atletas por Clube"
                  : "Treinadores por Clube"
              }
              sx={{
                "& .MuiCardHeader-title": {
                  fontWeight: "bold",
                },
              }}
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
                      data={ClubMembersData?.data}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      // fill="#8884d8"
                      label
                    >
                      {ClubMembersData?.data.map(
                        (entry: any, index: string) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={stringToColor(entry.username)}
                          />
                        )
                      )}
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
    </>
  );
}
