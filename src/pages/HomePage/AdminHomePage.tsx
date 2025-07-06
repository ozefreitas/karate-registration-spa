import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
} from "@mui/material";
import NextCompHomeComponent from "../../components/home-cards/NextCompHomeComponent";
import LastCompQualiHomeComponent from "../../components/home-cards/LastCompQualiHomeComponent";
import DojoStats from "../../components/home-cards/DojoStats";

export default function AdminHomePage(props: Readonly<{userRole: string}>) {
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
          relevantes e rápidas.
        </CardContent>
      </Card>
      <Grid container size={12}>
        <Grid size={6}>
          <NextCompHomeComponent></NextCompHomeComponent>
          <DojoStats></DojoStats>
        </Grid>
        <Grid size={6}>
          <LastCompQualiHomeComponent userRole={props.userRole}></LastCompQualiHomeComponent>
        </Grid>
      </Grid>
    </>
  );
}
