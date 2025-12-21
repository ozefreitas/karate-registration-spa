import { Check, Close, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Grid,
  // IconButton,
  // MenuItem,
  // TextField,
  // Tooltip,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { monthlyPaymentsHooks } from "../../hooks";
import { useParams } from "react-router-dom";
import { formatDateTime } from "../../utils/utils";
import AllUseTable from "../../components/Table/AllUseTable";
import { getMonthFromValue } from "../../config";
import QuotesOrdering from "../../components/filter_drawers/QuotesOrdering";
import PatchMemberSubscriptionModal from "../../components/modals/PatchMemberSubscriptionModal";
import EditMemberPaymentPlanModal from "../../components/modals/EditMemberPaymentPlanModal";
import { useForm } from "react-hook-form";

const QuotesSettingsSection = (props: { quotesConfig: any }) => {
  const { id: memberId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [isEditPlanModalOpen, setIsEditPlanModalOpen] =
    useState<boolean>(false);
  const [currentPaymentObj, setCurrentPaymentObj] = useState<any>(null);

  const now = new Date();

  // Extract date components
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEditPlanModalOpen = () => {
    setEnabled(true);
    setIsEditPlanModalOpen(true);
  };

  const handleEditPlanModalClose = () => {
    setEnabled(false);
    setIsEditPlanModalOpen(false);
  };

  const preDefined =
    props.quotesConfig !== undefined
      ? props.quotesConfig.is_custom_active
        ? props.quotesConfig.custom_amount
        : props.quotesConfig.base_plan_amount
      : null;

  const getColumnMaping = () => {
    const columnMapping = [
      { key: "date", label: "Mês" },
      { key: "amount", label: "Montante" },
      { key: "paid", label: "Estado" },
      { key: "paid_at", label: "Data de Pagamento" },
      { key: "insideLimit", label: "Dentro do Limite" },
    ];
    return columnMapping;
  };

  const columnMaping = getColumnMaping();

  const {
    control: orderControl,
    watch: orderWatch,
    reset: orderReset,
    formState: { errors: orderErrors },
    formState: { dirtyFields: orderDirtyFields },
  } = useForm({
    defaultValues: {
      year: "",
      month: "",
      paid: "",
      paid_at: "",
    },
  });

  const orderChangedCount = Object.keys(orderDirtyFields).length;
  const [orderFields, setOrderFields] = useState([
    {
      key: "year",
      label: "Ano",
      options: ["year", "-year"],
    },
    {
      key: "month",
      label: "Mês",
      options: ["month", "-month"],
    },
    {
      key: "paid",
      label: "Estado",
      options: ["paid", "-paid"],
    },
    {
      key: "paid_at",
      label: "Data de Pagamento",
      options: ["paid_at", "-paid_at"],
    },
  ]);

  const ordering = orderFields
    .map((f: any) => orderWatch(f.key))
    .filter(Boolean)
    .join(",");

  const { data, isLoading, error } =
    monthlyPaymentsHooks.useFetchMonthlyMemberSubscriptionsData(
      ordering,
      memberId!
    );

  // Memoize `rows` to compute only when `members` changes
  const subscriptionRows = useMemo(() => {
    return data?.data.map((subscription: any) => ({
      id: subscription.id,
      date: `${getMonthFromValue(subscription.month)}-${subscription.year}`,
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
        <Chip
          color="success"
          variant="outlined"
          label="Sim"
          sx={{ cursor: "default" }}
        ></Chip>
      ) : (
        <Chip
          color="error"
          variant="outlined"
          label="Não"
          sx={{ cursor: "default" }}
        ></Chip>
      ),
    }));
  }, [data]);

  return (
    <>
      <Grid container alignItems={"center"} size={12}>
        <Grid size={11}>
          <Typography
            sx={{ color: "#e81c24", fontWeight: "bold", ml: 1, mb: 2 }}
            variant="h4"
          >
            GESTÃO DE PAGAMENTOS
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
              <CardHeader
                sx={{ pb: 1 }}
                title={"Montante Pré-Definido"}
              ></CardHeader>
              <CardContent sx={{ pr: 3 }}>
                <Grid
                  container
                  alignContent={"flex-end"}
                  flexDirection={"column"}
                >
                  {isLoading ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <Grid container alignItems={"center"} spacing={3}>
                      <Typography
                        color={
                          props.quotesConfig !== undefined
                            ? "info"
                            : "textDisabled"
                        }
                        variant="h3"
                      >
                        {preDefined}€
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        color="warning"
                        onClick={handleEditPlanModalOpen}
                        startIcon={<Edit />}
                      >
                        Editar
                      </Button>
                    </Grid>
                  )}
                </Grid>
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
                  pr: 5,
                  maxHeight: "100%",
                }}
              >
                {isLoading ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Grid container justifyContent={"flex-end"}>
                    <Typography color="info" variant="h3">
                      {getMonthFromValue(Number(month))}
                    </Typography>
                    <Typography color="info" variant="h3">
                      -{year}
                    </Typography>
                  </Grid>
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
                    color={
                      data?.data?.filter(
                        (item: any) =>
                          item.inside_limit === false && item.paid === false
                      ).length !== 0
                        ? "error"
                        : "textDisabled"
                    }
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
              <CardHeader
                sx={{ pb: 1 }}
                title={"Situações Regulares"}
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
                            item.inside_limit === true && item.paid === false
                        ).length
                      : 0}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : null}
      <Grid mt={10}>
        {error ? null : (
          <Grid
            size={12}
            container
            px={3}
            mb={3}
            spacing={2}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <QuotesOrdering
              isLoading={isLoading}
              control={orderControl}
              reset={orderReset}
              errors={orderErrors}
              changedCount={orderChangedCount}
              orderFields={orderFields}
              setOrderFields={setOrderFields}
            ></QuotesOrdering>
          </Grid>
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
      {enabled ? (
        <EditMemberPaymentPlanModal
          isOpen={isEditPlanModalOpen}
          handleClose={handleEditPlanModalClose}
          currentQuotesConfig={props.quotesConfig}
        ></EditMemberPaymentPlanModal>
      ) : null}
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
