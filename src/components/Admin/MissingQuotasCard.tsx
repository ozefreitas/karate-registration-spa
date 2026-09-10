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
import axios from "axios";

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
      px={2}
      py={1}
    >
      <Grid container alignItems={"center"} spacing={3}>
        <Grid
          width={40}
          height={40}
          borderRadius={2}
          bgcolor={"#fdecea"}
          container
          alignItems={"center"}
          justifyContent={"center"}
        >
          {icon}
        </Grid>
        <Typography variant="body1" sx={{ color: "#555", fontWeight: 500 }}>
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
                width: 40,
                height: 40,
                borderRadius: 1.5,
              }}
            >
              <WarningAmberIcon sx={{ fontSize: 18 }} />
            </Grid>
            <Typography variant="h6" fontWeight={"bold"}>
              Quotas em Falta em {year}
            </Typography>
          </Grid>
        }
      ></CardHeader>

      {/* Stats */}
      {subscriptionsError &&
      axios.isAxiosError(subscriptionsError) &&
      subscriptionsError.response?.status === 403 ? (
        <CardContent
          sx={{ display: "flex", justifyContent: "flex-end", pr: 5 }}
        >
          Comece uma subscrição para ter acesso a esta funcionalidade.
        </CardContent>
      ) : (
        <CardContent
          sx={{
            pt: 0,
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
            <Grid px={2}>
              <StatRow
                icon={<Groups sx={{ fontSize: 20 }} color="error" />}
                label="Número Total de Clubes"
                value={subscriptionsData?.length!}
              />
              <Divider sx={{ borderColor: "#f5f5f5" }} />
              <StatRow
                icon={<Payments sx={{ fontSize: 20 }} color="error" />}
                label="Pagamentos por efetuar"
                value={
                  subscriptionsData?.filter((item: any) => item.paid === false)
                    .length!
                }
              />
            </Grid>
          )}
        </CardContent>
      )}
      {/* Footer */}
      <CardActions
        sx={{ p: 2, pt: 0, display: "flex", justifyContent: "flex-end" }}
      >
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
