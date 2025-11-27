import {
  ListItem,
  Grid,
  CircularProgress,
  Box,
  ListItemText,
  Chip,
  Card,
  CardHeader,
  MenuItem,
  TextField,
  CardContent,
  Typography,
} from "@mui/material";
import { clubsHooks } from "../../hooks";
import { useMemo, useState } from "react";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import AllUseTable from "../../components/Table/AllUseTable";
import { formatDateTime } from "../../utils/utils";
import { Close, Check } from "@mui/icons-material";
import PatchClubSubscriptionModal from "../../components/Admin/PatchClubSubscriptionModal";
import { Controller, useForm } from "react-hook-form";
import { computeExpirationDate } from "../../utils/utils";

export default function PaymentManagerPage(props: { userRole: string }) {
  type Club = { id: string; username: string; role: string; tier: string };
  type Subscriptions = {
    id: string;
    year: string;
    amout: string;
    paid: boolean;
    paid_at: any;
    club: Club;
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string>("");
  const [currentUsername, setCurrentUsername] = useState<string>("");
  const [currentState, setCurrentState] = useState<boolean>(false);

  const {
    control,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { search: "", overdueNumber: "" } });

  const { data } = clubsHooks.useFetchAvailableYears();

  const handleModalOpen = (id: string, username: string, state: boolean) => {
    setCurrentId(id);
    setCurrentUsername(username);
    setCurrentState(state);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const {
    data: subscriptionsData,
    isLoading: isSubscriptionsLoading,
    error: subscriptionsError,
  } = clubsHooks.useFetchClubSubscriptions(watch("search"));

  // Memoize `rows` to compute only when `members` changes
  const subscriptionRows = useMemo(() => {
    return subscriptionsData?.data.map((subscription: Subscriptions) => ({
      id: subscription.id,
      username: subscription.club.username,
      paid: subscription.paid ? (
        <Chip
          color="success"
          label="Pago"
          icon={<Check />}
          clickable
          onClick={() =>
            handleModalOpen(
              subscription.id,
              subscription.club.username,
              subscription.paid
            )
          }
        ></Chip>
      ) : (
        <Chip
          color="error"
          label="Em Falta"
          icon={<Close />}
          clickable
          onClick={() =>
            handleModalOpen(
              subscription.id,
              subscription.club.username,
              subscription.paid
            )
          }
        ></Chip>
      ),
      paid_at:
        subscription.paid_at === null ? (
          <span style={{ color: "lightgray" }}>N/A</span>
        ) : (
          formatDateTime(subscription.paid_at, "both")
        ),
    }));
  }, [subscriptionsData]);

  const getColumnMaping = () => {
    const columnMapping = [
      { key: "username", label: "Clube" },
      { key: "paid", label: "Estado" },
      { key: "paid_at", label: "Data de Pagamento" },
    ];
    return columnMapping;
  };

  const columnMaping = getColumnMaping();

  return (
    <>
      <PageInfoCard
        description="Aqui poderá gerir todas os pagamentos de quotas dos seus clubes de forma rápida e fácil. Pode também criar e notificar os Clubes da disponibilidade de pagamento de novas quotas."
        title="Gestor de Pagamento de Quotas"
      ></PageInfoCard>
      <Grid container m={4} spacing={2} size={12}>
        <Grid size={3}>
          <Card>
            <CardHeader title={"Selecionar Ano"}></CardHeader>
            <CardContent>
              <Controller
                name="search"
                control={control}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    variant={"outlined"}
                    label="Ano"
                    type="number"
                    slotProps={{
                      htmlInput: {
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      },
                    }}
                    fullWidth
                    select
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!errors.search}
                    helperText={errors.search?.message}
                  >
                    <MenuItem value="">-- Selecionar --</MenuItem>
                    {data?.data.years.map((item: any, index: any) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={2.5}>
          <Card sx={{ height: "100%" }}>
            <CardHeader title={"Dojos em Falta"}></CardHeader>
            <CardContent
              sx={{ display: "flex", justifyContent: "flex-end", pr: 5 }}
            >
              {isSubscriptionsLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Typography
                  color={watch("search") === "" ? "textDisabled" : "info"}
                  variant="h3"
                >
                  {watch("search") === ""
                    ? 0
                    : subscriptionsData?.data?.filter(
                        (item: any) => item.paid === false
                      ).length}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid size={4}>
          <Card sx={{ height: "100%" }}>
            <CardHeader title={"Data de Expiração"}></CardHeader>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                pr: 5,
                maxHeight: "100%",
              }}
            >
              {isSubscriptionsLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Typography
                  color={watch("search") === "" ? "textDisabled" : "info"}
                  variant="h3"
                >
                  {watch("search") === ""
                    ? 0
                    : computeExpirationDate(Number(watch("search")))}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid size={2.5}>
          <Card sx={{ height: "100%" }}>
            <CardHeader title={"Montante Total"}></CardHeader>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                pr: 5,
                maxHeight: "100%",
              }}
            >
              {isSubscriptionsLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Typography
                  color={watch("search") === "" ? "textDisabled" : "info"}
                  variant="h3"
                >
                  {watch("search") === ""
                    ? 0
                    : subscriptionsData?.data[0].amount}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid size={12} sx={{ m: 2 }}>
        {watch("search") === "" ? (
          <Grid sx={{ mt: 3 }} container justifyContent="center" size={12}>
            <ListItem>
              <ListItemText primary="Comece por seleciomar o ano para o qual quer ver o estado do pagamento de quotas."></ListItemText>
            </ListItem>
          </Grid>
        ) : isSubscriptionsLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : subscriptionsError ? (
          <Grid sx={{ mt: 3 }} container justifyContent="center" size={12}>
            <ListItem>
              <ListItemText primary="Ocorreu um erro ao encontrar a informação do pagamento de quotas. Tente mais tarde ou contacte um administrador."></ListItemText>
            </ListItem>
          </Grid>
        ) : subscriptionsData?.data === undefined ? null : (
          <AllUseTable
            type="Atletas"
            data={subscriptionRows}
            count={subscriptionRows.length}
            columnsHeaders={columnMaping}
            actions={false}
            selection={false}
            userRole={props.userRole}
            overideInternalPage
          ></AllUseTable>
        )}
      </Grid>
      <PatchClubSubscriptionModal
        handleClose={handleModalClose}
        isOpen={isModalOpen}
        id={currentId}
        username={currentUsername}
        currentState={currentState}
      ></PatchClubSubscriptionModal>
    </>
  );
}
