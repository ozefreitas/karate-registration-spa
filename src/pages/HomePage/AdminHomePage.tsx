import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Warning, PersonSearch } from "@mui/icons-material";
import NextEventHomeComponent from "../../components/home-cards/NextEventHomeComponent";
import LastCompQualiHomeComponent from "../../components/home-cards/LastCompQualiHomeComponent";
import ClubStats from "../../components/home-cards/ClubStats";
import { clubsHooks, membersHooks } from "../../hooks";
import { useNavigate } from "react-router-dom";

export default function AdminHomePage(props: Readonly<{ userRole: string }>) {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const {
    data: subscriptionsData,
    isLoading: isSubscriptionsLoading,
    error: subscriptionsError,
  } = clubsHooks.useFetchClubSubscriptions(`${currentYear}`);

  const {
    data: memberValidationRequestsData,
    isLoading: isMemberValidationRequestsLoading,
    error: memberValidationRequestsError,
  } = membersHooks.useFetchMemberValidationRequestsData(props.userRole);

  return (
    <Grid container size={12}>
      <Grid size={6}>
        <NextEventHomeComponent
          userRole={props.userRole}
        ></NextEventHomeComponent>
      </Grid>
      <Grid size={6}>
        <LastCompQualiHomeComponent
          userRole={props.userRole}
        ></LastCompQualiHomeComponent>
      </Grid>
      <Grid container size={12}>
        <ClubStats></ClubStats>
      </Grid>

      <Grid size={6}>
        <Card sx={{ height: "100%", m: 2, mb: 0 }}>
          <CardHeader
            title={`Clubes com quotas em Falta em ${currentYear}`}
            sx={{
              "& .MuiCardHeader-title": {
                fontWeight: "bold",
              },
            }}
          ></CardHeader>
          {subscriptionsError ? (
            <CardContent
              sx={{ display: "flex", justifyContent: "flex-end", pr: 5 }}
            >
              Ocorreu um erro ao coletar o número de clubes com quotas em falta.
              Tente mais tarde ou contacte um administrador.
            </CardContent>
          ) : (
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                px: 7,
                "&:last-child": {
                  paddingBottom: 0,
                },
              }}
            >
              {isSubscriptionsLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Grid
                  container
                  size={12}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography
                    color={
                      subscriptionsData?.data?.filter(
                        (item: any) => item.paid === false,
                      ).length > 0
                        ? "info"
                        : "textDisabled"
                    }
                    variant="h2"
                    fontWeight={400}
                  >
                    {
                      subscriptionsData?.data?.filter(
                        (item: any) => item.paid === false,
                      ).length
                    }
                  </Typography>
                  {subscriptionsData?.data?.filter(
                    (item: any) => item.paid === false,
                  ).length > 0 ? (
                    <Button
                      color="error"
                      variant="contained"
                      startIcon={<Warning></Warning>}
                      size="large"
                      onClick={() =>
                        navigate(`/payment_manager/?year=${currentYear}`)
                      }
                    >
                      Resolver
                    </Button>
                  ) : null}
                </Grid>
              )}
            </CardContent>
          )}
        </Card>
      </Grid>
      <Grid size={6}>
        <Card sx={{ height: "100%", m: 2, mb: 0 }}>
          <CardHeader
            title="Pedidos de Verificação de Membros"
            sx={{
              "& .MuiCardHeader-title": {
                fontWeight: "bold",
              },
            }}
          ></CardHeader>
          {memberValidationRequestsError ? (
            <CardContent
              sx={{ display: "flex", justifyContent: "flex-end", pr: 5 }}
            >
              Ocorreu um erro ao coletar o número de clubes com quotas em falta.
              Tente mais tarde ou contacte um administrador.
            </CardContent>
          ) : (
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                px: 7,
                "&:last-child": {
                  paddingBottom: 0,
                },
              }}
            >
              {isMemberValidationRequestsLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Grid
                  container
                  size={12}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography
                    color={
                      memberValidationRequestsData?.data?.count > 0
                        ? "info"
                        : "textDisabled"
                    }
                    variant="h2"
                    fontWeight={400}
                  >
                    {memberValidationRequestsData?.data?.count}
                  </Typography>
                  {memberValidationRequestsData?.data?.count > 0 ? (
                    <Button
                      color="warning"
                      variant="contained"
                      startIcon={<PersonSearch></PersonSearch>}
                      size="large"
                      onClick={() =>
                        navigate("/settings/?section=members_manager")
                      }
                    >
                      Verificar
                    </Button>
                  ) : null}
                </Grid>
              )}
            </CardContent>
          )}
        </Card>
      </Grid>
    </Grid>
  );
}
