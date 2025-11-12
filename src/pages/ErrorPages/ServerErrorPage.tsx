import { Grid, Typography, Button } from "@mui/material";

export default function ServerErrorPage({ error, resetErrorBoundary }: any) {
  return (
    <>
      <Grid
        sx={{ mt: 10 }}
        container
        size={10}
        direction={"column"}
        alignItems={"center"}
        justifyContent="center"
      >
        <Typography variant="h3" mb={3}>
          Algo correu mal
        </Typography>
        <Typography>Mensagem de erro: {error.message}</Typography>
      </Grid>
      <Grid container justifyContent="center" sx={{ m: 2, mt: 5 }} gap={5}>
        <Button
          variant="contained"
          size="large"
          onClick={() => globalThis.location.assign("/")}
        >
          Voltar
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => resetErrorBoundary}
        >
          Tentar Novamente
        </Button>
      </Grid>
    </>
  );
}
