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
import { Add } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";

export default function MemberPaymemtManagerPage(props: { userRole: string }) {
  // type Club = { id: string; username: string; role: string; tier: string };
  type Plan = {
    is_default: boolean;
    name: string;
    amount: string;
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

  return (
    <>
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
              type="Atletas"
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
              // onClick={handleAddClubModalOpen}
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
    </>
  );
}
