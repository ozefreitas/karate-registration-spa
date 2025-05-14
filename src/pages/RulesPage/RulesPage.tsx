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
          Aqui poderá fazer download de regras das provas atualmente em vigor.
        </CardContent>
      </Card>
    </div>
  );
}
