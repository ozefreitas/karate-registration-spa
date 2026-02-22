import { Box, Typography, Paper } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { EncounterOptions } from "../../config";
import { stringToColor } from "../../dashboard/utils/avatarColor";

interface EventDetailCardProps {
  date: string;
  location: string;
  description: string;
  type: string;
}

function IconBox({
  icon,
  type,
}: Readonly<{ icon: React.ReactNode; type: string }>) {
  return (
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: 2,
        bgcolor:
          EncounterOptions.find((item) => item.value === type)?.color ??
          stringToColor("Competição/Torneio"),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        color: "#fff",
      }}
    >
      {icon}
    </Box>
  );
}

function InfoRow({
  icon,
  label,
  value,
  type,
}: Readonly<{
  icon: React.ReactNode;
  label: string;
  value: string;
  type: string;
}>) {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
        borderRadius: 3,
        border: "1px solid #eeeeee",
        bgcolor: "#fff",
      }}
    >
      <IconBox icon={icon} type={type} />
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "#9e9e9e", fontWeight: 500 }}
        >
          {label}
        </Typography>
        <Typography variant="body1" fontWeight={700} sx={{ color: "#1a1a1a" }}>
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}

export default function EventDetailCard({
  date,
  location,
  description,
  type,
}: Readonly<EventDetailCardProps>) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      <InfoRow
        icon={<CalendarMonthIcon />}
        label="Data"
        value={date}
        type={type}
      />
      <InfoRow
        icon={<LocationOnIcon />}
        label="Local"
        value={location}
        type={type}
      />

      {description === undefined || description === "" ? null : (
        <Box
          sx={{
            bgcolor: "#fffff5",
            border: "1px solid #ffcdd2",
            borderRadius: 3,
            p: 2.5,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ color: "#555", lineHeight: 1.7 }}
          >
            {description}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
