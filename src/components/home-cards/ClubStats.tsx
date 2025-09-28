import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { stringToColor } from "../../dashboard/utils/avatarColor";
import {
  Grid,
  Card,
  CardHeader,
  Paper,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { adminHooks } from "../../hooks";
import { Person } from "@mui/icons-material";

export default function ClubStats() {
  const { data: ClubAthletesData } = adminHooks.useFetchClubAthletesData();

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

  return (
    <Card sx={{ m: 2 }}>
      <CardHeader
        title={"Atletas por Clube"}
        sx={{
          "& .MuiCardHeader-title": {
            fontWeight: "bold",
          },
        }}
      ></CardHeader>
      <Grid sx={{ height: 300 }}>
        <ResponsiveContainer width="80%" height="100%">
          <PieChart width={500} height={500}>
            <Tooltip content={CustomTooltip} />
            {/* <Legend layout="vertical" align="right" verticalAlign="middle" /> */}
            <Pie
              dataKey="athlete_count"
              data={ClubAthletesData?.data}
              cx="50%"
              cy="50%"
              outerRadius={120}
              // fill="#8884d8"
              label
            >
              {ClubAthletesData?.data.map((entry: any, index: string) => (
                <Cell
                  key={`cell-${index}`}
                  fill={stringToColor(entry.username)}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Grid>
    </Card>
  );
}
