import { Add, Check, Close, Edit } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { monthlyPaymentsHooks } from "../../hooks";
import { useParams } from "react-router-dom";
import { formatDateTime } from "../../utils/utils";
import AllUseTable from "../../components/Table/AllUseTable";
import { getMonthFromValue } from "../../config";
import PatchMemberSubscriptionModal from "../../components/Modals/PatchMemberSubscriptionModal";

const QuotesSettingsSection = () => {
  const { id: memberId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPaymentObj, setCurrentPaymentObj] = useState<any>(null);
  const [currentAction, setCurrentAction] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const now = new Date();

  // Extract date components
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  // Format as YYYY-MM-DD
  const formattedDate = `${getMonthFromValue(Number(month))}-${year}`;

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    action: string
  ) => {
    setCurrentAction(action);
    setAnchorEl(event.currentTarget);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const { data, isLoading, error } =
    monthlyPaymentsHooks.useFetchMonthlyMemberSubscriptionsData(memberId!);

  // Memoize `rows` to compute only when `members` changes
  const subscriptionRows = useMemo(() => {
    return data?.data.map((subscription: any) => ({
      id: subscription.id,
      year: subscription.year,
      month: getMonthFromValue(subscription.month),
      amount: `${subscription.amount}€`,
      paid: subscription.paid ? (
        <Chip
          color="success"
          label="Pago"
          icon={<Check />}
          clickable
          onClick={() => {
            setCurrentPaymentObj({
              id: subscription.id,
              year: subscription.year,
              month: getMonthFromValue(subscription.month),
              paid: subscription.paid,
            });
            handleModalOpen();
          }}
        ></Chip>
      ) : (
        <Chip
          color="error"
          label="Em Falta"
          icon={<Close />}
          clickable
          onClick={() => {
            setCurrentPaymentObj({
              id: subscription.id,
              year: subscription.year,
              month: getMonthFromValue(subscription.month),
              paid: subscription.paid,
            });
            handleModalOpen();
          }}
        ></Chip>
      ),
      paid_at:
        subscription.paid_at === null ? (
          <span style={{ color: "lightgray" }}>N/A</span>
        ) : (
          formatDateTime(subscription.paid_at, "both")
        ),
      insideLimit: subscription.inside_limit ? (
        <Chip color="success" label="Sim" sx={{ cursor: "default" }}></Chip>
      ) : (
        <Chip color="error" label="Não" sx={{ cursor: "default" }}></Chip>
      ),
    }));
  }, [data]);

  const getColumnMaping = () => {
    const columnMapping = [
      { key: "year", label: "Ano" },
      { key: "month", label: "Mês" },
      { key: "amount", label: "Montante" },
      { key: "paid", label: "Estado" },
      { key: "paid_at", label: "Data de Pagamento" },
      { key: "insideLimit", label: "Dentro do Limite" },
    ];
    return columnMapping;
  };

  const columnMaping = getColumnMaping();
  return (
    <>
      <Grid container alignItems={"center"} size={12}>
        <Grid size={11}>
          <Typography
            sx={{ color: "#e81c24", fontWeight: "bold", ml: 1, mb: 2 }}
            variant="h4"
          >
            GESTÃO DE QUOTAS
          </Typography>
        </Grid>
      </Grid>
      {isLoading ? (
        <Grid my={3} container justifyContent="center" size={12}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        </Grid>
      ) : data?.data.length !== 0 ? (
        <Grid container justifyContent={"flex-end"} spacing={2} mt={3}>
          <Grid size={3}>
            <Card
              elevation={2}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardHeader
                sx={{ pb: 1 }}
                title={"Montante Pré-Definido"}
              ></CardHeader>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  pr: 5,
                }}
              >
                {isLoading ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Typography
                    color={data?.data.length !== 0 ? "info" : "textDisabled"}
                    variant="h3"
                  >
                    {data?.data.length !== 0
                      ? `${data?.data[0].predefined_amount}€`
                      : 0}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid size={3}>
            <Card
              elevation={2}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardHeader
                sx={{ pb: 1 }}
                title={"Situações Irregulares"}
              ></CardHeader>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  pr: 5,
                }}
              >
                {isLoading ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Typography
                    color={data?.data.length !== 0 ? "info" : "textDisabled"}
                    variant="h3"
                  >
                    {data?.data.length !== 0
                      ? data?.data?.filter(
                          (item: any) =>
                            item.inside_limit === false && item.paid === false
                        ).length
                      : 0}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid size={6}>
            <Card
              elevation={2}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardHeader sx={{ pb: 1 }} title="Em pagamento"></CardHeader>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  pr: 5,
                  maxHeight: "100%",
                }}
              >
                {isLoading ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Typography color="info" variant="h3">
                    {formattedDate}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : null}
      <Grid mt={5}>
        {error ? null : (
          <Grid
            size={12}
            container
            px={3}
            spacing={2}
            justifyContent={"flex-end"}
            alignItems={"center"}
          ></Grid>
        )}
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <AllUseTable
            columnsHeaders={columnMaping}
            data={subscriptionRows}
            count={subscriptionRows.length}
            type="Pagamentos"
            actions
            selection={false}
            editable
            notWatchable
            userRole="subed_club"
            overideInternalPage
          ></AllUseTable>
        )}
      </Grid>
      {currentPaymentObj === null ? null : (
        <PatchMemberSubscriptionModal
          handleClose={handleModalClose}
          isOpen={isModalOpen}
          paymentObj={currentPaymentObj}
        ></PatchMemberSubscriptionModal>
      )}
    </>
  );
};

export default QuotesSettingsSection;
