import { Grid } from "@mui/material";

export default function FoulGrid(props: Readonly<{color: string}>) {
  return (
    <Grid
      size={3.5}
      sx={{
        backgroundColor: props.color,
        borderRadius: 5,
        height: "70%",
      }}
    ></Grid>
  );
}
