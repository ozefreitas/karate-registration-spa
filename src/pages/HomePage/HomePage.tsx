import { Card, CardHeader, CardContent, Grid } from "@mui/material";
import AthletesHomeComponent from "../../components/home-cards/AthletesHomeComponent";
import TeamsHomeComponent from "../../components/home-cards/TeamsHomeComponent";
import NextCompHomeComponent from "../../components/home-cards/NextCompHomeComponent";
import LastCompQualiHomeComponent from "../../components/home-cards/LastCompQualiHomeComponent";

export default function HomePage(props: Readonly<{ userRole: string }>) {
  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title={"Bem-vindo à plataforma de registos da SKI-P."}
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Este é o ecrã principal desta plataforma. Aqui poderá ver informações
          relevantes e rápidas, assim como notificações específicas para si.
          Dúvidas devem remeter para a página de <a href="/help/">Ajuda</a>.
        </CardContent>
      </Card>
      <Grid container size={12}>
        <Grid size={6}>
          <AthletesHomeComponent
            userRole={props.userRole}
          ></AthletesHomeComponent>
          <TeamsHomeComponent userRole={props.userRole}></TeamsHomeComponent>
        </Grid>
        <Grid size={6}>
          <NextCompHomeComponent
            userRole={props.userRole}
          ></NextCompHomeComponent>
          <LastCompQualiHomeComponent
            userRole={props.userRole}
          ></LastCompQualiHomeComponent>
        </Grid>
      </Grid>
    </>
  );
}
