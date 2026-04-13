import { Box, Typography, Paper } from "@mui/material";
import { EncounterOptions } from "../../config";
import { SportsMma } from "@mui/icons-material";

interface EventsListSingleCardProps {
  title: string;
  description: string;
  type: string;
  registration_state?: string;
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
        bgcolor: EncounterOptions.find((item) => item.value === type)?.color,
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
        transition: "0.3s",
        "&:hover": {
          cursor: "pointer",
          transform: "translateY(-3px)",
          bgcolor: "#fff",
          boxShadow: 4,
          borderColor: "red",
        },
      }}
    >
      <IconBox icon={icon} type={type} />
      <Box>
        <Typography variant="h6">{label}</Typography>
        <Typography
          variant="body1"
          fontWeight={700}
          sx={{ color: "#9e9e9e", fontWeight: 500 }}
        >
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}

export default function EventsListSingleCard({
  title,
  description,
  type,
  registration_state,
}: Readonly<EventsListSingleCardProps>) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      <InfoRow
        icon={<SportsMma />}
        label={title}
        value={description}
        type={type}
      />
    </Box>
  );
}
