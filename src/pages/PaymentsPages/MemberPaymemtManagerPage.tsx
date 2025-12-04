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
import { Close, Check } from "@mui/icons-material";
import PatchClubSubscriptionModal from "../../components/Admin/PatchClubSubscriptionModal";
import { Controller, useForm } from "react-hook-form";
import { computeExpirationDate } from "../../utils/utils";
import { Add } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";

export default function MemberPaymemtManagerPage(props: { userRole: string }) {
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
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
      overdueNumber: "",
      year: undefined,
      amount: "",
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

  const onSubmit = (data: any) => {
    const formData = { year: data.year, amount: data.amount };
    createYearSubscription.mutate(formData);
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
          <Card>
            <CardHeader
              sx={{ pt: 2.5 }}
              title={
                <Grid
                  container
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography variant="h5">Ano</Typography>
                  <Tooltip title="Adicionar pagamento de quotas">
                    <IconButton onClick={(e) => handleClick(e)}>
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
            <CardHeader title={"Clubes em Falta"}></CardHeader>
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
              <ListItemText primary="Comece por selecionar o ano para o qual quer ver o estado do pagamento de quotas."></ListItemText>
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
              width: 350,
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              ml: 2,
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 160,
                right: 345,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "center" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={(e) => e.stopPropagation()}
        >
          <Typography variant="h6" p={1}>
            Criar notificação de Quotas
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
            <Grid size={10}>
              <Controller
                name="year"
                control={control}
                render={({ field }) => (
                  <TextField
                    placeholder="XXXX"
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
                    error={!!errors.year}
                    helperText={errors.year?.message}
                  ></TextField>
                )}
              />
            </Grid>
            <Grid size={10}>
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
                    error={!!errors.year}
                    helperText={errors.year?.message}
                  ></TextField>
                )}
              />
            </Grid>
            <Grid container justifyContent={"center"} size={12}>
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
