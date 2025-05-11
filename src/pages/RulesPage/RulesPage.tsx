import { Card, CardHeader, CardContent } from "@mui/material";

export default function RulesPage() {
  return (
    <div>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title={"Página de consulta de Regras."}
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Este é o ecrã principal desta plataforma. Aqui poderá ver informações
          relevantes e rápidas, assim como notificações específicas para si.
        </CardContent>
      </Card>
    </div>
  );
}
