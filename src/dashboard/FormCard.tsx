import {
  Grid,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";

export default function FormCard(
  props: Readonly<{ title: string; subheader?: string; children: any }>
) {
  return (
    <Grid sx={{ m: 6, mt: 2, mb: 2 }} size={12}>
      <Card
        elevation={1}
        sx={{
          // backgroundColor: "transparent",
          border: "2px solid white",
        }}
      >
        <CardHeader
          title={props.title}
          subheader={props.subheader}
          sx={{
            borderBottom: "1px solid lightgrey",
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
              fontSize: 18,
            },
          }}
        ></CardHeader>
        <CardContent>
          <Grid container>{props.children}</Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
