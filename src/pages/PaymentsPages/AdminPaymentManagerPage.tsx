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
  IconButton,
  TextField,
  CardContent,
  Typography,
  Tooltip,
} from "@mui/material";
import { clubsHooks } from "../../hooks";
import { useEffect, useMemo, useState } from "react";
import AllUseTable from "../../components/Table/AllUseTable";
import { formatDateTime } from "../../utils/utils";
import { Close, Check, Edit, Add } from "@mui/icons-material";
import PatchClubSubscriptionModal from "../../components/Admin/PatchClubSubscriptionModal";
import CreateClubSubscriptionsModal from "../../components/Admin/CreateClubSubscriptionsModal";
import UpdateClubSubscriptionAmountModal from "../../components/Admin/UpdateClubSubscriptionAmountModal";
import UpdateClubSubscriptionDueDateModal from "../../components/Admin/UpdateClubSubscriptionDueDateModal";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

export default function AdminPaymentManagerPage(
  props: Readonly<{ userRole: string }>,
) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAmountModalOpen, setIsAmountModalOpen] = useState(false);
  const [isDueDateModalOpen, setIsDueDateModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState<string>("");
  const [currentUsername, setCurrentUsername] = useState<string>("");
  const [currentState, setCurrentState] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year");

  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search: "",
    },
  });

  useEffect(() => {
    if (year) {
      setValue("search", year);
    }
  }, [setValue, year]);

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
  } = clubsHooks.useFetchClubSubscriptions(watch("search"), props.userRole);

  const {
    data: subscriptionConfigData,
    // isLoading: isSubscriptionConfigLoading,
    // error: subscriptionConfigError,
  } = clubsHooks.useFetchClubSubscriptionConfig();

  // Memoize `rows` to compute only when `members` changes
  const subscriptionRows = useMemo(() => {
    return subscriptionsData?.map((subscription) => ({
      id: subscription.id,
      username: subscription.club.username,
      paid: subscription.paid ? (
        <Chip
          color="success"
          label="Pago"
          size="small"
          icon={<Check />}
          clickable
          sx={{
            bgcolor: "#d9ffe7",
            color: "#004d1f",
          }}
          onClick={() =>
            handleModalOpen(
              String(subscription.id),
              subscription.club.username,
              subscription.paid!,
            )
          }
        ></Chip>
      ) : (
        <Chip
          color="error"
          label="Em Falta"
          size="small"
          icon={<Close />}
          clickable
          sx={{
            bgcolor: "#ff8fa3",
            color: "#800f2f",
          }}
          onClick={() =>
            handleModalOpen(
              String(subscription.id),
              subscription.club.username,
              subscription.paid!,
            )
          }
        ></Chip>
      ),
      paid_at:
        subscription.paid_at === null ? (
          <span style={{ color: "lightgray" }}>N/A</span>
        ) : (
          formatDateTime(subscription.paid_at!, "both")
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
  const selectedYear = watch("search");
  const hasSelectedYear = selectedYear !== "";

  return (
    <>
      <Grid container m={{ xs: 2, sm: 3, md: 4 }} spacing={2} size={12}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card
            variant="outlined"
            sx={{ height: "100%", borderColor: "divider", borderRadius: 3 }}
          >
            <CardHeader
              sx={{ pt: 2.5 }}
              title={
                <Grid
                  container
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography variant="h5">Ano</Typography>
                  <Tooltip arrow title="Criar Quotas">
                    <span>
                      <IconButton onClick={() => setIsCreateModalOpen(true)}>
                        <Add color="success"></Add>
                      </IconButton>
                    </span>
                  </Tooltip>
                </Grid>
              }
            ></CardHeader>
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
                    {data ? (
                      <MenuItem sx={{ color: "lightgrey" }} value="">
                        -- Selecionar --
                      </MenuItem>
                    ) : (
                      <MenuItem disabled>Sem opções disponíveis.</MenuItem>
                    )}
                    {data?.years.map((item: any, index: any) => (
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
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card
            variant="outlined"
            sx={{ height: "100%", borderColor: "divider", borderRadius: 3 }}
          >
            <CardHeader
              title={
                <Typography variant="h5" pt={0.5}>
                  Clubes em Falta
                </Typography>
              }
            ></CardHeader>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                pr: 5,
                maxHeight: "100%",
              }}
            >
              {!hasSelectedYear ? null : isSubscriptionsLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Typography color="info" variant="h3">
                  {subscriptionsData?.filter((item: any) => item.paid === false)
                    .length ?? 0}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card
            variant="outlined"
            sx={{ height: "100%", borderColor: "divider", borderRadius: 3 }}
          >
            <CardHeader
              title={
                <Grid
                  container
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography variant="h5">Data Limite</Typography>
                  <Tooltip arrow title="Editar Data">
                    <span>
                      <IconButton
                        disabled={!hasSelectedYear}
                        onClick={() => setIsDueDateModalOpen(true)}
                      >
                        <Edit
                          color={hasSelectedYear ? "warning" : "disabled"}
                        ></Edit>
                      </IconButton>
                    </span>
                  </Tooltip>
                </Grid>
              }
            ></CardHeader>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                pr: 5,
                maxHeight: "100%",
              }}
            >
              {!hasSelectedYear ? null : isSubscriptionsLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Typography color="info" variant="h3">
                  {subscriptionsData?.[0]?.due_date
                    ? formatDateTime(subscriptionsData[0].due_date, "day")
                    : null}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card
            variant="outlined"
            sx={{ height: "100%", borderColor: "divider", borderRadius: 3 }}
          >
            <CardHeader
              title={
                <Grid
                  container
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography variant="h5">Montante</Typography>
                  <Tooltip arrow title="Editar Montante">
                    <span>
                      <IconButton
                        disabled={
                          !hasSelectedYear ||
                          subscriptionConfigData?.id === undefined
                        }
                        onClick={() => setIsAmountModalOpen(true)}
                      >
                        <Edit
                          color={
                            hasSelectedYear &&
                            subscriptionConfigData?.id !== undefined
                              ? "warning"
                              : "disabled"
                          }
                        ></Edit>
                      </IconButton>
                    </span>
                  </Tooltip>
                </Grid>
              }
            ></CardHeader>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                pr: 5,
                maxHeight: "100%",
              }}
            >
              {!hasSelectedYear ? null : isSubscriptionsLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Typography color={"info"} variant="h3">
                  {subscriptionConfigData?.amount}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid size={12} mx={{ xs: 2, sm: 2, md: 2 }} mt={{ xs: 3, sm: 5 }}>
        {!hasSelectedYear ? (
          <Grid container mx={3} size={12} justifyContent="center">
            <Typography variant="body2" color="textDisabled" textAlign="center">
              Comece por selecionar o ano para o qual quer ver o estado do
              pagamento de quotas.
            </Typography>
          </Grid>
        ) : isSubscriptionsLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : subscriptionsError ? (
          <ListItem>
            <ListItemText
              sx={{ textAlign: "center", mt: 3 }}
              primary="Ocorreu um erro ao encontrar a informação do pagamento de quotas. Tente mais tarde ou contacte um administrador."
            ></ListItemText>
          </ListItem>
        ) : subscriptionsData === undefined ? null : (
          <AllUseTable
            type="PagamentosAnuais"
            data={subscriptionRows}
            count={subscriptionRows?.length!}
            columnsHeaders={columnMaping}
            actions={false}
            editable
            notWatchable
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
      <CreateClubSubscriptionsModal
        isOpen={isCreateModalOpen}
        handleClose={() => setIsCreateModalOpen(false)}
        availableYears={data?.years ?? []}
      />
      <UpdateClubSubscriptionAmountModal
        isOpen={isAmountModalOpen}
        handleClose={() => setIsAmountModalOpen(false)}
        year={selectedYear}
        configId={subscriptionConfigData?.id}
        currentAmount={subscriptionConfigData?.amount}
      />
      <UpdateClubSubscriptionDueDateModal
        isOpen={isDueDateModalOpen}
        handleClose={() => setIsDueDateModalOpen(false)}
        year={selectedYear}
      />
    </>
  );
}
