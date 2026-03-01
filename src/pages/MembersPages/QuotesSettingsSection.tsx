import { Add, Check, Close, Edit } from "@mui/icons-material";
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
import PatchMemberSubscriptionModal from "../../components/Modals/PatchMemberSubscriptionModal";
import EditMemberPaymentPlanModal from "../../components/Modals/EditMemberPaymentPlanModal";
import { useForm } from "react-hook-form";
import AddMemberPaymentModal from "../../components/Modals/AddMemberPaymentModal";

const QuotesSettingsSection = (props: { quotesConfig: any }) => {
  const { id: personId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
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

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
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
    props.quotesConfig === undefined
      ? null
      : props.quotesConfig.is_custom_active
        ? props.quotesConfig.custom_amount
        : props.quotesConfig.base_plan_amount;

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
      personId,
    );

  // Memoize `rows` to compute only when `members` changes
  const subscriptionRows = useMemo(() => {
    return data?.map((subscription: any) => ({
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
      ) : data?.length === 0 ? null : (
        <Grid container justifyContent={"flex-end"} p={2} spacing={4}>
          <Grid size={6}>
            <Card
              elevation={4}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardHeader
                sx={{
                  pb: 1,
                  "& .MuiCardHeader-title": {
                    fontWeight: "bold",
                  },
                }}
                title={"Montante Pré-Definido"}
              ></CardHeader>
              <CardContent sx={{ px: 3 }}>
                <Grid container flexDirection={"column"}>
                  {isLoading ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <Grid
                      container
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      spacing={3}
                    >
                      <Typography
                        color={
                          props.quotesConfig === undefined
                            ? "textDisabled"
                            : "info"
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
              elevation={4}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardHeader
                sx={{
                  pb: 1,
                  "& .MuiCardHeader-title": {
                    fontWeight: "bold",
                  },
                }}
                title="Em pagamento"
              ></CardHeader>
              <CardContent
                sx={{
                  pl: 3,
                  maxHeight: "100%",
                }}
              >
                {isLoading ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Grid container justifyContent={"flex-start"}>
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
              elevation={4}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardHeader
                sx={{
                  pb: 1,
                  "& .MuiCardHeader-title": {
                    fontWeight: "bold",
                  },
                }}
                title={"Situações Irregulares"}
              ></CardHeader>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  pl: 3,
                }}
              >
                {isLoading ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Typography
                    color={
                      data?.filter(
                        (item: any) =>
                          item.inside_limit === false && item.paid === false,
                      ).length === 0
                        ? "textDisabled"
                        : "error"
                    }
                    variant="h3"
                  >
                    {data?.length === 0
                      ? 0
                      : data?.filter(
                          (item: any) =>
                            item.inside_limit === false && item.paid === false,
                        ).length}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid size={6}>
            <Card
              elevation={4}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardHeader
                sx={{
                  pb: 1,
                  "& .MuiCardHeader-title": {
                    fontWeight: "bold",
                  },
                }}
                title={"Situações Regulares"}
              ></CardHeader>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  pl: 3,
                }}
              >
                {isLoading ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Typography
                    color={data?.length === 0 ? "textDisabled" : "info"}
                    variant="h3"
                  >
                    {data?.length === 0
                      ? 0
                      : data?.filter(
                          (item: any) =>
                            item.inside_limit === true && item.paid === false,
                        ).length}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      <Grid mt={10}>
        {error ? null : (
          <Grid
            size={12}
            container
            px={2}
            mb={3}
            spacing={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid>
              <Button
                variant="contained"
                size="large"
                color="success"
                onClick={handleAddModalOpen}
                startIcon={<Add />}
              >
                Adicionar
              </Button>
            </Grid>
            {subscriptionRows?.length === 0 ? null : (
              <QuotesOrdering
                isLoading={isLoading}
                control={orderControl}
                reset={orderReset}
                errors={orderErrors}
                changedCount={orderChangedCount}
                orderFields={orderFields}
                setOrderFields={setOrderFields}
              ></QuotesOrdering>
            )}
          </Grid>
        )}
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : subscriptionRows === undefined ? null : (
          <AllUseTable
            columnsHeaders={columnMaping}
            data={subscriptionRows}
            count={subscriptionRows.length}
            type="Pagamentos"
            actions
            deletable
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
      {personId === undefined ? null : (
        <AddMemberPaymentModal
          isOpen={isAddModalOpen}
          handleClose={handleAddModalClose}
          personId={personId}
          currentQuotesConfig={props.quotesConfig}
        ></AddMemberPaymentModal>
      )}
    </>
  );
};

export default QuotesSettingsSection;
