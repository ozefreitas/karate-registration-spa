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
} from "@mui/material";
import { membersHooks } from "../../hooks";
import { Groups, Payments, WarningAmber } from "@mui/icons-material";

interface MissingMemberQuotasCardProps {
  userRole: string;
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
        <Typography sx={{ color: "#555", fontWeight: 500 }}>
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

export default function MissingMemberQuotasCard({
  userRole,
  onResolve,
}: Readonly<MissingMemberQuotasCardProps>) {
  const {
    data: memberPaymentStatusData,
    isLoading: isMemberPaymentStatusLoading,
    error: memberPaymentStatusError,
  } = membersHooks.useFetchMemberPaymentsStatusData();

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
              <WarningAmber sx={{ fontSize: 18 }} />
            </Grid>
            <Typography variant="h6" fontWeight={"bold"}>
              Resumo de pagamentos mensais
            </Typography>
          </Grid>
        }
      ></CardHeader>

      {/* Stats */}
      {userRole === undefined ? (
        <Typography color="textDisabled" p={5} pt={2}>
          Sem sessão iniciada. Faça Login.
        </Typography>
      ) : memberPaymentStatusError &&
        memberPaymentStatusError?.message === "Forbidden" ? (
        <Typography color="textDisabled" p={5} pt={2}>
          Comece uma subscrição para ter acesso a esta funcionalidade.
        </Typography>
      ) : (
        <CardContent
          sx={{
            "&:last-child": {
              paddingBottom: 0,
            },
          }}
        >
          {isMemberPaymentStatusLoading ? (
            <Grid container mt={3} justifyContent={"center"}>
              <CircularProgress />
            </Grid>
          ) : (
            <Grid px={2}>
              <StatRow
                icon={<Groups sx={{ fontSize: 18 }} color="error" />}
                label="Número Total de Membros"
                value={memberPaymentStatusData?.number!}
              />
              <Divider sx={{ borderColor: "#f5f5f5" }} />
              <StatRow
                icon={<Payments sx={{ fontSize: 18 }} color="error" />}
                label="Pagamentos por efetuar"
                value={memberPaymentStatusData?.unpaid_members!}
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
          startIcon={<WarningAmber />}
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
