import { Grid, Typography } from "@mui/material";

export default function MatchTypeInfo(
  props: Readonly<{ matchType: string; tatami: string }>
) {
  return (
    <Grid sx={{ m: 2 }} container justifyContent="space-around">
      <Typography variant="h3">Tatami: {props.tatami}</Typography>
      <Typography variant="h3">{props.matchType}</Typography>
    </Grid>
  );
}
