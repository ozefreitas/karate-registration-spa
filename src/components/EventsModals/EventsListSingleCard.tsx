import { Box, Typography, Paper } from "@mui/material";
import { EncounterOptions } from "../../config";
import { SportsMma } from "@mui/icons-material";
import { ColoredIconBox } from "../icon-utils/boxes";

interface EventsListSingleCardProps {
  title: string;
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
      <ColoredIconBox
        icon={icon}
        bgColor={EncounterOptions.find((item) => item.value === type)?.color}
        color={"#fff"}
        border={"none"}
      />
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
