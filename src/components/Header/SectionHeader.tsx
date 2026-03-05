import { Box, Grid, Typography } from "@mui/material";
import { PeopleAlt } from "@mui/icons-material";

export default function SectionHeader(
  props: Readonly<{
    title: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
  }>,
) {
  return (
    <Grid
      size={12}
      container
      mb={2}
      alignItems={"center"}
      borderBottom={"2px solid #d32f2f"}
      py={1.5}
      sx={{
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
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
          variant="h6"
          fontWeight={700}
          sx={{ color: "#1a1a1a", letterSpacing: 0.5 }}
        >
          {props.title}
        </Typography>
      </Box>

      {props.action && <Box>{props.action}</Box>}
    </Grid>
  );
}
