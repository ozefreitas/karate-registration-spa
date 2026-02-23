import { Box, Typography } from "@mui/material";
import { PeopleAlt } from "@mui/icons-material";

export default function SectionHeader(
  props: Readonly<{
    title: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
  }>,
) {
  return (
    <Box
      sx={{
        m: 2,
        mb: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        py: 1.5,
        borderBottom: "2px solid #d32f2f",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: 2,
            bgcolor: "#d32f2f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {props.icon ?? <PeopleAlt sx={{ fontSize: 18 }} />}
        </Box>
        <Typography
          variant="subtitle1"
          fontWeight={700}
          sx={{ color: "#1a1a1a", letterSpacing: 0.2 }}
        >
          {props.title}
        </Typography>
      </Box>

      {props.action && <Box>{props.action}</Box>}
    </Box>
  );
}
