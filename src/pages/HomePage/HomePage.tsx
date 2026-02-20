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
import { membersHooks } from "../../hooks";
import { Person, PersonSearch } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function HomePage(props: Readonly<{ userRole: string }>) {
  const navigate = useNavigate();
  const {
    data: memberPaymentStatusData,
    isLoading: isMemberPaymentStatusLoading,
    error: memberPaymentStatusError,
  } = membersHooks.useFetchMemberPaymentsStatusData();

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
              Carregue <a href="/results_display/">aqui</a> ou remeta à barra
              lateral para aceder a esse ecrã.
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
              <Card sx={{ height: "100%", m: 2, mb: 0 }}>
                <CardHeader
                  title="Resumo de pagamentos mensais"
                  sx={{
                    pb: 0,
                    "& .MuiCardHeader-title": {
                      fontWeight: "bold",
                    },
                  }}
                ></CardHeader>
                {props.userRole === undefined ? (
                  <ListItem sx={{ m: 0 }}>
                    <ListItemButton disabled sx={{ m: 0 }}>
                      <ListItemIcon>
                        <Person />
                      </ListItemIcon>
                      <ListItemText
                        primary={"Sem sessão iniciada. Faça Login."}
                      />
                    </ListItemButton>
                  </ListItem>
                ) : memberPaymentStatusError ? (
                  <ListItem sx={{ m: 0 }}>
                    <ListItemText
                      primary={
                        "Ocorreu um erro ao coletar o número de clubes com quotas em falta. Tente mais tarde ou contacte um administrador."
                      }
                    />
                  </ListItem>
                ) : (
                  <CardContent>
                    {isMemberPaymentStatusLoading ? (
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <Grid
                        container
                        size={12}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        px={7}
                      >
                        <Grid
                          container
                          size={12}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Typography variant="h6">
                            Número Total de Membros:
                          </Typography>

                          <Typography
                            color="info"
                            variant="h2"
                            fontWeight={400}
                          >
                            {memberPaymentStatusData?.number}
                          </Typography>
                        </Grid>
                        <Grid
                          container
                          size={12}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Typography variant="h6">
                            Pagamentos por efetuar:
                          </Typography>

                          <Typography
                            color={
                              memberPaymentStatusData?.unpaid_members === 0
                                ? "textDisabled"
                                : "error"
                            }
                            variant="h2"
                            fontWeight={400}
                          >
                            {memberPaymentStatusData?.unpaid_members}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </CardContent>
                )}
                <CardActions sx={{ m: 1, mt: 0 }}>
                  {memberPaymentStatusData?.unpaid_members !== undefined &&
                  memberPaymentStatusData?.unpaid_members > 0 ? (
                    <Button
                      color="error"
                      variant="contained"
                      startIcon={<PersonSearch></PersonSearch>}
                      size="large"
                      onClick={() => navigate("/members/")}
                    >
                      Verificar
                    </Button>
                  ) : null}
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}
