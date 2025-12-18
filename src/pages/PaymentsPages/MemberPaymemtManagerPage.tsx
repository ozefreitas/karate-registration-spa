import {
  ListItem,
  Grid,
  CircularProgress,
  Box,
  ListItemText,
  Chip,
  Button,
} from "@mui/material";
import { clubsHooks, monthlyPaymentsHooks } from "../../hooks";
import { useEffect, useMemo, useState } from "react";
import AllUseTable from "../../components/Table/AllUseTable";
import PatchClubSubscriptionModal from "../../components/Admin/PatchClubSubscriptionModal";
import { Controller, useForm } from "react-hook-form";
import FormCard from "../../dashboard/FormCard";
import { Add, Delete, Error, Remove, Warning } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import FormAccordion from "../../dashboard/FormAccordion";
import CreateMemberPaymentPlanModal from "../../components/modals/CreateMemberPaymentPlanModal";

export default function MemberPaymemtManagerPage(props: { userRole: string }) {
  type Plan = {
    id: string;
    is_default: boolean;
    name: string;
    amount: string;
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCreatePlanModalOpen, setIsCreatePlanModalOpen] =
    useState<boolean>(false);
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

  const handleModalOpen = (id: string, username: string, state: boolean) => {
    setCurrentId(id);
    setCurrentUsername(username);
    setCurrentState(state);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCreatePlanModalOpen = () => {
    setIsCreatePlanModalOpen(true);
  };

  const handleCreatePlanModalClose = () => {
    setIsCreatePlanModalOpen(false);
  };

  const { data, isLoading, error } =
    monthlyPaymentsHooks.useFetchMonthlyMemberSubscriptionsData("", undefined);

  const {
    data: plansData,
    isLoading: isPlansLoading,
    error: plansError,
  } = monthlyPaymentsHooks.useFetchMonthlyPaymentPlansData();

  const createYearSubscription = clubsHooks.useCreateAllClubsSubscription();

  const onSubmit = (data: any) => {
    const formData = { year: data.year, amount: data.amount };
    createYearSubscription.mutate(formData);
  };

  // Memoize `rows` to compute only when `members` changes
  const subscriptionRows = useMemo(() => {
    return plansData?.data.map((plan: Plan) => ({
      id: plan.id,
      amount: `${plan.amount}€`,
      is_default: plan.is_default ? (
        <Chip variant="outlined" label="Sim" color="success"></Chip>
      ) : (
        <Chip variant="outlined" label="Não" color="error"></Chip>
      ),
      name: plan.name,
    }));
  }, [plansData]);

  const getColumnMaping = () => {
    const columnMapping = [
      { key: "name", label: "Designação" },
      { key: "amount", label: "Montante" },
      { key: "is_default", label: "Padrão" },
    ];
    return columnMapping;
  };

  const columnMaping = getColumnMaping();

  const immediateAction = data?.data.filter(
    (item: any) => item.paid === false && item.inside_limit === false
  ).length;

  const warnings = data?.data.filter(
    (item: any) => item.paid === false && item.inside_limit === true
  ).length;

  return (
    <>
      <FormAccordion
        title="Avisos"
        summary={
          <Grid>
            <Chip
              sx={{ p: 1 }}
              icon={<Error></Error>}
              color="error"
              label={`${immediateAction} erro(s) atenção imediata`}
            ></Chip>
            <Chip
              sx={{ p: 1, ml: 2 }}
              icon={<Warning></Warning>}
              color="warning"
              label={`${warnings} aviso(s)`}
            ></Chip>
          </Grid>
        }
      >
        <Grid borderRadius={5} bgcolor={"#bad7ff63"} p={4} width={"100%"}>
          {data?.data
            .filter(
              (item: any) => item.paid === false && item.inside_limit === false
            )
            .map((payments: any) => (
              <Grid>{payments.member.full_name}</Grid>
            ))}
        </Grid>
      </FormAccordion>
      <FormCard title="Planos de Pagamento">
        <Grid size={12} m={2} mb={0}>
          {isPlansLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : plansError ? (
            <Grid sx={{ mt: 3 }} container justifyContent="center" size={12}>
              <ListItem>
                <ListItemText primary="Ocorreu um erro ao encontrar a informação do pagamento de quotas. Tente mais tarde ou contacte um administrador."></ListItemText>
              </ListItem>
            </Grid>
          ) : plansData?.data === undefined ? null : (
            <AllUseTable
              type="Plano"
              data={subscriptionRows}
              count={subscriptionRows.length}
              columnsHeaders={columnMaping}
              actions
              notWatchable
              editable
              deletable
              selection={false}
              userRole={props.userRole}
              overideInternalPage
            ></AllUseTable>
          )}
          <Grid p={2} container justifyContent={"flex-end"}>
            <Button
              variant="contained"
              size={"large"}
              color={"success"}
              type={"submit"}
              startIcon={<Add></Add>}
              onClick={handleCreatePlanModalOpen}
            >
              Adicionar Plano
            </Button>
          </Grid>
        </Grid>
      </FormCard>

      <PatchClubSubscriptionModal
        handleClose={handleModalClose}
        isOpen={isModalOpen}
        id={currentId}
        username={currentUsername}
        currentState={currentState}
      ></PatchClubSubscriptionModal>
      <CreateMemberPaymentPlanModal
        handleClose={handleCreatePlanModalClose}
        isOpen={isCreatePlanModalOpen}
      ></CreateMemberPaymentPlanModal>
    </>
  );
}
