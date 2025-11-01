import { Card, CardHeader, CardContent, Grid, Button } from "@mui/material";
import { FileDownload } from "@mui/icons-material";
import { RulesOptions } from "../../config";

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
          Aqui poderá fazer download das regras das provas atualmente em vigor.
          Carregue no botão para obter os documentos correspondentes.
        </CardContent>
      </Card>
      <Grid m={5} container justifyContent={"space-between"}>
        {RulesOptions.map((item: any, index: any) => (
          <Grid
            key={index}
            position={"relative"}
            size={3.5}
            sx={{ opacity: item.disabled ? 0.5 : 1 }}
          >
            <Card
              sx={{
                height: 300,
                backgroundImage: `url(${item.image})`,
                backgroundSize: "110%",
                backgroundPosition: "center top 30%",
                color: "white",
              }}
            ></Card>
            <Grid bottom={-20} left={"55%"} position={"absolute"}>
              <a
                href={item.file} // path inside public/
                download={item.rename} // optional rename
                style={{ textDecoration: "none" }}
              >
                <Button
                  disabled={item.disabled}
                  startIcon={<FileDownload></FileDownload>}
                  variant="contained"
                >
                  Download
                </Button>
              </a>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
