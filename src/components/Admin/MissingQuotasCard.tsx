import {
  Typography,
  Button,
  Divider,
  Card,
  CardHeader,
  Grid,
  CardActions,
  CardContent,
  CircularProgress,
  Box,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { clubsHooks } from "../../hooks";
import { Groups, Payments } from "@mui/icons-material";

interface MissingQuotasCardProps {
  year?: number;
  onResolve?: () => void;
}

function StatRow({
  icon,
  label,
  value,
}: Readonly<{
  icon: React.ReactNode;
  label: string;
  value: number;
}>) {
  return (
    <Grid
      container
      alignItems={"center"}
      justifyContent={"space-between"}
      p={2}
    >
      <Grid container alignItems={"center"} spacing={3}>
        <Grid
          width={45}
          height={45}
          borderRadius={2}
          bgcolor={"#fdecea"}
          container
          alignItems={"center"}
          justifyContent={"center"}
        >
          {icon}
        </Grid>
        <Typography variant="h6" sx={{ color: "#555", fontWeight: 500 }}>
          {label}
        </Typography>
      </Grid>
      <Typography
        variant="h4"
        fontWeight={700}
        color={value === 0 ? "textDisabled" : "error"}
        sx={{ minWidth: 32, textAlign: "right" }}
      >
        {value}
      </Typography>
    </Grid>
  );
}

export default function MissingQuotasCard({
  year = new Date().getFullYear(),
  onResolve,
}: Readonly<MissingQuotasCardProps>) {
  const {
    data: subscriptionsData,
    isLoading: isSubscriptionsLoading,
    error: subscriptionsError,
  } = clubsHooks.useFetchClubSubscriptions(`${year}`);

  return (
    <Card
      sx={{
        overflow: "hidden",
        m: 2,
      }}
    >
      <CardHeader
        title={
          <Grid container alignItems={"center"} gap={2}>
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              color={"#fff"}
              bgcolor={"#d32f2f"}
              sx={{
                width: 50,
                height: 50,
                borderRadius: 1.5,
              }}
            >
              <WarningAmberIcon sx={{ fontSize: 28 }} />
            </Grid>
            <Typography variant="h5" fontWeight={"bold"}>
              Clubes com Quotas em Falta em {year}
            </Typography>
          </Grid>
        }
      ></CardHeader>

      {/* Stats */}
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
            <Grid px={2} pb={2}>
              <StatRow
                icon={<Groups sx={{ fontSize: 22 }} color="error" />}
                label="Número Total de Clubes"
                value={subscriptionsData?.data?.length}
              />
              <Divider sx={{ borderColor: "#f5f5f5" }} />
              <StatRow
                icon={<Payments sx={{ fontSize: 22 }} color="error" />}
                label="Pagamentos por efetuar"
                value={
                  subscriptionsData?.data?.filter(
                    (item: any) => item.paid === false,
                  ).length
                }
              />
            </Grid>
          )}
        </CardContent>
      )}
      {/* Footer */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          startIcon={<WarningAmberIcon />}
          onClick={onResolve}
          disableElevation
          color="error"
        >
          RESOLVER
        </Button>
      </CardActions>
    </Card>
  );
}
