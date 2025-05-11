import { Card, CardHeader, CardContent, Grid } from "@mui/material";

export default function HelpPage() {
  return (
    <div>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title={"Página de Ajuda."}
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Nesta página pode encontrar todas as informações e ajudas que irá
          necessitar para o preenchimento dos formulários e navegação nesta
          plataforma.
        </CardContent>
      </Card>
      <Grid container size={12}>
        <Grid size={6}>
          <Card sx={{ m: 2 }}>
            <CardHeader
              title={"Criação de Conta e Login"}
              sx={{
                "& .MuiCardHeader-title": {
                  fontWeight: "bold",
                },
              }}
            ></CardHeader>
            <CardContent></CardContent>
          </Card>
        </Grid>
        <Grid size={6}>
          <Card sx={{ m: 2 }}>
            <CardHeader
              title={"Atletas"}
              sx={{
                "& .MuiCardHeader-title": {
                  fontWeight: "bold",
                },
              }}
            ></CardHeader>
            <CardContent></CardContent>
          </Card>
        </Grid>
        <Grid size={6}>
          <Card sx={{ m: 2 }}>
            <CardHeader
              title={"Equipas"}
              sx={{
                "& .MuiCardHeader-title": {
                  fontWeight: "bold",
                },
              }}
            ></CardHeader>
            <CardContent></CardContent>
          </Card>
        </Grid>
        <Grid size={6}>
          <Card sx={{ m: 2 }}>
            <CardHeader
              title={"Competições"}
              sx={{
                "& .MuiCardHeader-title": {
                  fontWeight: "bold",
                },
              }}
            ></CardHeader>
            <CardContent></CardContent>
          </Card>
        </Grid>
        <Grid size={6}>
          <Card sx={{ m: 2 }}>
            <CardHeader
              title={"Inscrições"}
              sx={{
                "& .MuiCardHeader-title": {
                  fontWeight: "bold",
                },
              }}
            ></CardHeader>
            <CardContent></CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
