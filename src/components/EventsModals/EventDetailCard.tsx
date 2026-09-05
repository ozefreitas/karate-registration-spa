import { Box, Typography, Paper } from "@mui/material";
import { EncounterOptions } from "../../config";
import { stringToColor } from "../../dashboard/utils/avatarColor";
import { AccessTime, CalendarMonth, LocationOn } from "@mui/icons-material";
import { ColoredIconBox } from "../icon-utils/boxes";

interface EventDetailCardProps {
  date: string;
  location: string;
  description: string;
  type: string;
  registration_state?: string;
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
      <ColoredIconBox
        border={"none"}
        icon={icon}
        bgColor={
          EncounterOptions.find((item) => item.value === type)?.color ??
          stringToColor("Competição/Torneio")
        }
        color={"#fff"}
      />
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
  registration_state,
}: Readonly<EventDetailCardProps>) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      <InfoRow icon={<CalendarMonth />} label="Data" value={date} type={type} />
      <InfoRow
        icon={<LocationOn />}
        label="Local"
        value={location}
        type={type}
      />
      {registration_state === undefined ? null : (
        <InfoRow
          icon={<AccessTime />}
          label="Estado Inscrições"
          value={registration_state}
          type={type}
        />
      )}

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
