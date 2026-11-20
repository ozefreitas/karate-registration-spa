import { Check, Close } from "@mui/icons-material";
import Chip from "@mui/material/Chip";
import { alpha } from "@mui/material/styles";

export default function BooleanStatusChip({
  enabled,
}: Readonly<{ enabled: boolean }>) {
  return (
    <Chip
      size="small"
      variant="outlined"
      icon={enabled ? <Check /> : <Close />}
      label={enabled ? "Sim" : "Não"}
      sx={(theme) => {
        const statusColor = enabled
          ? theme.palette.success
          : theme.palette.error;

        return {
          height: 26,
          borderRadius: 999,
          color:
            theme.palette.mode === "dark"
              ? statusColor.light
              : statusColor.dark,
          borderColor: alpha(statusColor.main, 0.4),
          bgcolor: alpha(
            statusColor.main,
            theme.palette.mode === "dark" ? 0.18 : 0.08,
          ),
          "& .MuiChip-icon": {
            color: "inherit",
            fontSize: 15,
            ml: 0.75,
          },
          "& .MuiChip-label": {
            px: 0.75,
            fontSize: "0.68rem",
            fontWeight: 700,
          },
        };
      }}
    />
  );
}
