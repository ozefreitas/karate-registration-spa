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
  Menu,
  Button,
} from "@mui/material";
import { clubsHooks } from "../../hooks";
import { useEffect, useMemo, useState } from "react";
import AllUseTable from "../../components/Table/AllUseTable";
import { formatDateTime } from "../../utils/utils";
import { Close, Check, Edit, Add } from "@mui/icons-material";
import PatchClubSubscriptionModal from "../../components/Admin/PatchClubSubscriptionModal";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function AdminPaymentManagerPage(props: { userRole: string }) {
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
  const [currentAction, setCurrentAction] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    action: string
  ) => {
    setCurrentAction(action);
    setAnchorEl(event.currentTarget);
  };
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year");

  const handleClose = async () => {
    setAnchorEl(null);
  };

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search: "",
      overdueDate: undefined,
      amount: "",
      year: "",
    },
  });

  useEffect(() => {
    if (year) {
      setValue("search", year);
    }
  }, []);

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

  const createYearSubscription = clubsHooks.useCreateAllClubsSubscription();
  const patchConfigSubscriptionAmount =
    clubsHooks.usePatchClubSubscriptionAmountbyYear();
  const patchSubscriptionDueDate =
    clubsHooks.usePatchClubSubscriptionDueDatebyYear();

  const onSubmit = (data: any) => {
    if (currentAction === "amount") {
      const formData = { year: data.search, amount: data.amount };
      patchConfigSubscriptionAmount.mutate(formData, {
        onSuccess: () => {
          handleClose();
        },
      });
    } else if (currentAction === "due_date") {
      const formData = { year: data.search, due_date: data.overdueDate };
      patchSubscriptionDueDate.mutate(formData, {
        onSuccess: () => {
          handleClose();
        },
      });
    } else if (currentAction === "create") {
      const formData = { year: data.year };
      createYearSubscription.mutate(formData, {
        onSuccess: () => {
          handleClose();
        },
      });
    }
  };

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
      <Grid container m={4} spacing={2} size={12}>
        <Grid size={3}>
          <Card sx={{ height: "100%" }}>
            <CardHeader
              sx={{ pt: 2.5 }}
              title={
                <Grid
                  container
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography variant="h5">Ano</Typography>
                  <Tooltip title="Criar Quotas">
                    <IconButton onClick={(e) => handleClick(e, "create")}>
                      <Add color="success"></Add>
                    </IconButton>
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
                    <MenuItem sx={{ color: "lightgrey" }} value="">
                      -- Selecionar --
                    </MenuItem>
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
            <CardHeader
              title={
                <Grid
                  container
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography variant="h5">Data Limite</Typography>
                  <Tooltip title="Editar Data">
                    <IconButton
                      disabled={watch("search") === ""}
                      onClick={(e) => handleClick(e, "due_date")}
                    >
                      <Edit
                        color={watch("search") === "" ? "disabled" : "warning"}
                      ></Edit>
                    </IconButton>
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
                    : formatDateTime(
                        subscriptionsData?.data[0].due_date,
                        "day"
                      )}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid size={2.5}>
          <Card sx={{ height: "100%" }}>
            <CardHeader
              sx={{ pb: 1 }}
              title={
                <Grid
                  container
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography variant="h5">Montante</Typography>
                  <Tooltip title="Editar Montante">
                    <IconButton
                      disabled={watch("search") === ""}
                      onClick={(e) => handleClick(e, "amount")}
                    >
                      <Edit
                        color={watch("search") === "" ? "disabled" : "warning"}
                      ></Edit>
                    </IconButton>
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
          <ListItem>
            <ListItemText
              sx={{ textAlign: "center", mt: 3, color: "grey" }}
              primary="Comece por selecionar o ano para o qual quer ver o estado do pagamento de quotas."
            ></ListItemText>
          </ListItem>
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
        ) : subscriptionsData?.data === undefined ? null : (
          <AllUseTable
            type="Pagamentos"
            data={subscriptionRows}
            count={subscriptionRows.length}
            columnsHeaders={columnMaping}
            actions
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
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 1,
            sx: {
              width: 330,
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 18,
            },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={(e) => e.stopPropagation()}
        >
          <Typography variant="h6" p={1}>
            {currentAction === "amount"
              ? "Alterar montante a pagar"
              : currentAction === "due_date"
              ? "Alterar data limite"
              : "Criar Quotas"}
          </Typography>
        </MenuItem>
        <MenuItem
          disableTouchRipple
          disableRipple
          onClick={(e) => e.stopPropagation()}
          sx={{ p: 2 }}
        >
          <Grid
            container
            size={12}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={1}
          >
            {currentAction === "create" ? (
              <Grid size={10}>
                <Controller
                  name="year"
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
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    ></TextField>
                  )}
                />
              </Grid>
            ) : (
              <Grid size={10}>
                <Controller
                  name="search"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      color="warning"
                      variant={"outlined"}
                      label="Ano"
                      type="number"
                      disabled
                      slotProps={{
                        htmlInput: {
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                        },
                        input: {
                          readOnly: true,
                        },
                      }}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    ></TextField>
                  )}
                />
              </Grid>
            )}
            {currentAction === "amount" ? (
              <Grid size={10} pt={1}>
                <Controller
                  name="amount"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      color="warning"
                      placeholder="XX.XX"
                      variant={"outlined"}
                      label="Montante"
                      type="number"
                      required
                      slotProps={{
                        htmlInput: {
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                        },
                      }}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      error={!!errors.amount}
                      helperText={errors.amount?.message}
                    ></TextField>
                  )}
                />
              </Grid>
            ) : currentAction === "due_date" ? (
              <Grid size={10} pt={1}>
                <Controller
                  name="overdueDate"
                  control={control}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        {...field}
                        format="YYYY-MM-DD"
                        label="Nova Data *"
                        onChange={(date) => {
                          field.onChange(date ? date.format("YYYY-MM-DD") : "");
                        }}
                        value={field.value ? dayjs(field.value) : null}
                        slots={{ textField: TextField }}
                        enableAccessibleFieldDOMStructure={false}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!errors?.overdueDate,
                            helperText: errors?.overdueDate?.message || "",
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Grid>
            ) : null}
            <Grid container justifyContent={"center"} size={12} mt={3}>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleSubmit(onSubmit)()}
              >
                OK
              </Button>
            </Grid>
          </Grid>
        </MenuItem>
      </Menu>
    </>
  );
}
