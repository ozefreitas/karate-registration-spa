import { Grid, Typography } from "@mui/material";

export default function MatchTypeInfo(
  props: Readonly<{ matchType: string; tatami: string }>,
) {
  return (
    <Grid sx={{ m: 2 }} container justifyContent="space-around">
      <Typography
        variant="h3"
        color={props.tatami === "0" ? "warning" : undefined}
      >
        Tatami: {props.tatami}
      </Typography>
      <Typography variant="h3">{props.matchType}</Typography>
    </Grid>
  );
}
