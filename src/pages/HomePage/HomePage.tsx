import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  Box,
  Button,
  CardActions,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import MembersHomeComponent from "../../components/home-cards/MembersHomeComponent";
import TeamsHomeComponent from "../../components/home-cards/TeamsHomeComponent";
import NextEventHomeComponent from "../../components/home-cards/NextEventHomeComponent";
import LastCompQualiHomeComponent from "../../components/home-cards/LastCompQualiHomeComponent";
import { Person, PersonSearch } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MissingMemberQuotasCard from "../../components/home-cards/MissingMemberQuotasCard";

export default function HomePage(props: Readonly<{ userRole: string }>) {
  const navigate = useNavigate();

  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title={`Bem-vindo à plataforma de registos da ${
            import.meta.env.VITE_DISPLAY_BUTTON_SIGLA
          }.`}
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          {props.userRole === "technician" ? (
            <>
              Contas técnicas apenas têm acesso ao monitor de resultados.
              Carregue <a href="/events/">aqui</a> ou remeta à barra lateral
              para aceder à listagem de Eventos. Apenas o Evento que estiver a
              decorrer no dia de hoje irão aparecer na lista.
            </>
          ) : (
            <>
              Este é o ecrã principal desta plataforma. Aqui poderá ver
              informações relevantes e rápidas, assim como notificações
              específicas para si. Dúvidas devem remeter para a página de{" "}
              <a href="/help/">Ajuda</a>.
            </>
          )}
        </CardContent>
      </Card>
      {props.userRole === "technician" ? null : (
        <Grid container size={12}>
          <Grid size={6}>
            <MembersHomeComponent
              userRole={props.userRole}
            ></MembersHomeComponent>
            <TeamsHomeComponent userRole={props.userRole}></TeamsHomeComponent>
          </Grid>
          <Grid size={6}>
            <NextEventHomeComponent
              userRole={props.userRole}
            ></NextEventHomeComponent>
            <LastCompQualiHomeComponent
              userRole={props.userRole}
            ></LastCompQualiHomeComponent>
            <Grid size={12}>
              <MissingMemberQuotasCard
                onResolve={() => navigate("/members/")}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}
