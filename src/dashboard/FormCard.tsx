import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Stack,
  Button,
} from "@mui/material";

export default function FormCard(
  props: Readonly<{
    title: string;
    subheader?: string;
    children: any;
    actions?: boolean;
    handleSubmit?: any;
    handleClose?: any;
  }>,
) {
  return (
    <Grid mx={4} size={12}>
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
        <CardContent
          sx={{
            "&:last-child": {
              paddingBottom: 1,
            },
          }}
        >
          <Grid container >{props.children}</Grid>
        </CardContent>
        {props.actions !== undefined || props.actions ? (
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              borderTop: "1px solid lightgrey",
            }}
          >
            <Stack
              direction={{
                xs: "row-reverse",
                sm: "row",
              }}
              sx={{
                p: 1,
                gap: 3,
                flexShrink: 0,
                alignSelf: { xs: "flex-end", sm: "center" },
              }}
            >
              <Button onClick={props.handleSubmit} variant="contained">
                Confirmar
              </Button>
              <Button onClick={props.handleClose}>Cancelar</Button>
            </Stack>
          </CardActions>
        ) : null}
      </Card>
    </Grid>
  );
}
