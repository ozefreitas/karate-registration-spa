import {
  ListItem,
  Tooltip,
  ListItemIcon,
  ListItemText,
  Grid,
  Typography,
} from "@mui/material";

function StatRow({
  icon,
  label,
  value,
}: Readonly<{
  icon: React.ReactNode;
  label: string;
  value: string;
}>) {
  return (
    <Grid
      container
      alignItems={"center"}
      justifyContent={"space-between"}
      py={1}
    >
      <Grid container alignItems={"center"} spacing={3}>
        <Grid
          width={30}
          height={30}
          borderRadius={2}
          bgcolor={"#fdecea"}
          container
          alignItems={"center"}
          justifyContent={"center"}
        >
          {icon}
        </Grid>
        <Typography variant="body1" sx={{ color: "#555", fontWeight: 500 }}>
          {label}
        </Typography>
      </Grid>
      <Typography
        variant="body1"
        fontWeight={700}
        color={value === null ? "textDisabled" : "error"}
        sx={{ minWidth: 32, textAlign: "right" }}
      >
        {value ?? "N/A"}
      </Typography>
    </Grid>
  );
}

export default function CompInfoToolTip(
  props: Readonly<{ title: string; text: string; icon: any }>,
) {
  return <StatRow icon={props.icon} label={props.title} value={props.text} />;
}
