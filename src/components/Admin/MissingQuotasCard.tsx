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
      columnGap={1}
      px={{ xs: 0.5, sm: 1 }}
      py={1}
      sx={{ width: "100%", minWidth: 0, flexWrap: "nowrap" }}
    >
      <Grid
        container
        alignItems={"center"}
        spacing={{ xs: 1, sm: 2 }}
        sx={{ minWidth: 0, flex: 1, flexWrap: "nowrap" }}
      >
        <Grid
          borderRadius={2}
          bgcolor={"#fdecea"}
          container
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            width: { xs: 36, sm: 40 },
            height: { xs: 36, sm: 40 },
            flexShrink: 0,
          }}
        >
          {icon}
        </Grid>
        <Typography
          color="text.secondary"
          sx={{
            fontWeight: 500,
            minWidth: 0,
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          {label}
        </Typography>
      </Grid>
      <Typography
        fontWeight={700}
        color={value === 0 ? "textDisabled" : "error"}
        sx={{
          minWidth: 28,
          flexShrink: 0,
          textAlign: "right",
          fontSize: { xs: "1.5rem", sm: "2.125rem" },
        }}
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
        width: "100%",
        minWidth: 0,
      }}
    >
      <CardHeader
        sx={{
          p: { xs: 1.5, sm: 2 },
          "& .MuiCardHeader-content": { minWidth: 0 },
        }}
        title={
          <Grid
            container
            alignItems={"center"}
            gap={{ xs: 1, sm: 2 }}
            sx={{ minWidth: 0, flexWrap: "nowrap" }}
          >
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              color={"#fff"}
              bgcolor={"#d32f2f"}
              sx={{
                width: { xs: 36, sm: 40 },
                height: { xs: 36, sm: 40 },
                borderRadius: 1.5,
                flexShrink: 0,
              }}
            >
              <WarningAmberIcon sx={{ fontSize: 18 }} />
            </Grid>
            <Typography
              variant="h6"
              fontWeight={"bold"}
              sx={{
                minWidth: 0,
                fontSize: { xs: "1.05rem", sm: "1.25rem" },
                lineHeight: 1.25,
              }}
            >
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
          sx={{
            px: { xs: 2, sm: 3 },
            textAlign: { xs: "left", sm: "right" },
            overflowWrap: "anywhere",
          }}
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
            <Grid px={{ xs: 0, sm: 1 }}>
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
        sx={{
          p: { xs: 1.5, sm: 2 },
          pt: 0,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          sx={{ width: { xs: "100%", sm: "auto" } }}
          size="small"
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
