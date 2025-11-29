import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Warning } from "@mui/icons-material";
import NextCompHomeComponent from "../../components/home-cards/NextCompHomeComponent";
import LastCompQualiHomeComponent from "../../components/home-cards/LastCompQualiHomeComponent";
import ClubStats from "../../components/home-cards/ClubStats";
import { clubsHooks } from "../../hooks";
import { useNavigate } from "react-router-dom";

export default function AdminHomePage(props: Readonly<{ userRole: string }>) {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const {
    data: subscriptionsData,
    isLoading: isSubscriptionsLoading,
    error: subscriptionsError,
  } = clubsHooks.useFetchClubSubscriptions(`${currentYear}`);
  return (
    <Grid container size={12}>
      <Grid size={6}>
        <NextCompHomeComponent
          userRole={props.userRole}
        ></NextCompHomeComponent>
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
            <>
              <CardContent
                sx={{ display: "flex", justifyContent: "flex-end", pr: 5 }}
              >
                {isSubscriptionsLoading ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Typography color="info" variant="h3">
                    {
                      subscriptionsData?.data?.filter(
                        (item: any) => item.paid === false
                      ).length
                    }
                  </Typography>
                )}
              </CardContent>
              {subscriptionsData?.data?.filter(
                (item: any) => item.paid === false
              ).length > 0 ? (
                <CardActions
                  sx={{ display: "flex", justifyContent: "flex-end", px: 4 }}
                >
                  <Button
                    color="error"
                    variant="contained"
                    startIcon={<Warning></Warning>}
                    size="large"
                    onClick={() => navigate("/payment_manager/")}
                  >
                    Resolver
                  </Button>
                </CardActions>
              ) : null}
            </>
          )}
        </Card>
      </Grid>
      {/* Events Registration metrics overtime */}
    </Grid>
  );
}
