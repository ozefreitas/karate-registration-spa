import {
  ListItem,
  Grid,
  CircularProgress,
  Box,
  ListItemText,
  Chip,
  Button,
  ListItemIcon,
  ListItemButton,
  Typography,
  TextField,
  FormHelperText,
} from "@mui/material";
import { clubsHooks, monthlyPaymentsHooks } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import AllUseTable from "../../components/Table/AllUseTable";
import FormCard from "../../dashboard/FormCard";
import {
  Add,
  Error,
  Info,
  Warning,
  KeyboardDoubleArrowUp,
  Save,
} from "@mui/icons-material";
import FormAccordion from "../../dashboard/FormAccordion";
import CreateMemberPaymentPlanModal from "../../components/Modals/CreateMemberPaymentPlanModal";
import { Controller, useForm } from "react-hook-form";
import { MonthOptions } from "../../config";

export default function MemberPaymemtManagerPage(
  props: Readonly<{ userRole: string }>,
) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isShowable, setIsShowable] = useState<boolean>(true);
  const [isCreatePlanModalOpen, setIsCreatePlanModalOpen] =
    useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<string[]>([
    "error",
    "warning",
    "info",
  ]);

  const handleCreatePlanModalOpen = () => {
    setIsCreatePlanModalOpen(true);
  };

  const handleCreatePlanModalClose = () => {
    setIsCreatePlanModalOpen(false);
  };

  const handleIsExpandedOpen = () => {
    setIsExpanded((prev) => !prev);
    if (isExpanded) {
      setTimeout(() => {
        setIsSelected(["error", "warning", "info"]);
      }, 100);
    }
  };

  const handleSelected = (value: string) => {
    setIsSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const { data, isLoading, error } =
    monthlyPaymentsHooks.useFetchMonthlyMemberSubscriptionsData("");

  const {
    data: plansData,
    isLoading: isPlansLoading,
    error: plansError,
  } = monthlyPaymentsHooks.useFetchMonthlyPaymentPlansData();

  const { data: currentSettingData } = clubsHooks.useFetchClubSettingsData();

  const patchBillingDay = clubsHooks.usePatchClubSettingsData();

  // Memoize `rows` to compute only when `members` changes
  const subscriptionRows = useMemo(() => {
    return plansData?.map((plan) => ({
      id: plan.id,
      amount: `${plan.amount}€`,
      is_default: plan.is_default ? (
        <Chip
          variant="outlined"
          label="Sim"
          color="success"
          sx={{
            bgcolor: "#d9ffe7",
            color: "#004d1f",
            p: 1,
          }}
        ></Chip>
      ) : (
        <Chip
          variant="outlined"
          label="Não"
          color="error"
          sx={{
            bgcolor: "#ff8fa3",
            color: "#800f2f",
            p: 1,
          }}
        ></Chip>
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

  const immediateAction = data?.filter(
    (item: any) => item.paid === false && item.inside_limit === false,
  ).length;

  const warnings = data?.filter(
    (item: any) => item.paid === false && item.inside_limit === true,
  ).length;

  const infos = 0;

  const count =
    (isSelected.includes("error") ? (immediateAction ?? 0) : 0) +
    (isSelected.includes("warning") ? (warnings ?? 0) : 0) +
    (isSelected.includes("info") ? infos : 0);

  useEffect(() => {
    setIsShowable(count > 0);
  }, [count]);

  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      day:
        currentSettingData === undefined
          ? ""
          : currentSettingData[0]?.billing_day,
    },
  });

  useEffect(() => {
    if (currentSettingData !== undefined) {
      setValue("day", currentSettingData[0]?.billing_day);
    }
  }, [currentSettingData]);

  return (
    <Grid container>
      <FormAccordion
        expanded={isExpanded}
        onChange={handleIsExpandedOpen}
        title="Validação de Pagamentos"
        summary={
          <Grid container justifyContent={"flex-end"} spacing={2}>
            <Chip
              sx={{
                p: 1,
                boxShadow: isExpanded ? 6 : "none",
                cursor: isExpanded ? "pointer" : "default",
                transition: "0.3s",
                "&:hover": {
                  transform: isExpanded ? "translateY(-3px)" : "none",
                },
              }}
              icon={<Error></Error>}
              color="error"
              clickable={isExpanded}
              variant={isSelected.includes("error") ? "filled" : "outlined"}
              onClick={(e) => {
                if (isExpanded) {
                  e.stopPropagation();
                  handleSelected("error");
                }
              }}
              label={`${immediateAction} erro(s) - Atenção imediata`}
            ></Chip>
            <Chip
              sx={{
                p: 1,
                boxShadow: isExpanded ? 6 : "none",
                cursor: isExpanded ? "pointer" : "default",
                transition: "0.3s",
                "&:hover": {
                  transform: isExpanded ? "translateY(-3px)" : "none",
                },
              }}
              icon={<Warning></Warning>}
              color="warning"
              clickable={isExpanded}
              variant={isSelected.includes("warning") ? "filled" : "outlined"}
              onClick={(e) => {
                if (isExpanded) {
                  e.stopPropagation();
                  handleSelected("warning");
                }
              }}
              label={`${warnings} aviso(s) - Ação recomendada`}
            ></Chip>
            <Chip
              sx={{
                p: 1,
                boxShadow: isExpanded ? 6 : "none",
                cursor: isExpanded ? "pointer" : "default",
                transition: "0.3s",
                "&:hover": {
                  transform: isExpanded ? "translateY(-3px)" : "none",
                },
              }}
              icon={<Info></Info>}
              color="info"
              clickable={isExpanded}
              variant={isSelected.includes("info") ? "filled" : "outlined"}
              onClick={(e) => {
                if (isExpanded) {
                  e.stopPropagation();
                  handleSelected("info");
                }
              }}
              label={`${infos} - Informações`}
            ></Chip>
          </Grid>
        }
      >
        {isLoading ? (
          <Grid container justifyContent={"center"}>
            <CircularProgress />
          </Grid>
        ) : error ? (
          <Grid sx={{ mt: 3 }} container justifyContent="center" size={12}>
            <ListItem>
              <ListItemText primary="Ocorreu um erro ao encontrar a informação do pagamento de quotas. Tente mais tarde ou contacte um administrador."></ListItemText>
            </ListItem>
          </Grid>
        ) : isSelected.length === 0 ? (
          <Typography sx={{ color: "gray", my: 2 }}>
            Selecione pelo menos um dos campos em cima para ver as validações de
            pagamentos. {<KeyboardDoubleArrowUp />}
          </Typography>
        ) : isShowable ? (
          isSelected.length > 0 &&
          isShowable && (
            <Grid borderRadius={5} bgcolor={"#bad7ff63"} p={2} width={"100%"}>
              {isSelected.includes("error") &&
                data
                  ?.filter(
                    (item: any) =>
                      item.paid === false && item.inside_limit === false,
                  )
                  .map((payments: any, index: any) => (
                    <ListItem sx={{ m: 0, p: 0, px: 2, pt: 1 }} key={index}>
                      <ListItemButton
                        onClick={() =>
                          navigate(
                            `/members/${payments.person.id}/?section=payments_management`,
                          )
                        }
                      >
                        <ListItemIcon>
                          <Error color="error" />
                        </ListItemIcon>
                        <ListItemText
                          primary={payments.person.full_name}
                          secondary={`Pagamento de ${
                            MonthOptions.find(
                              (item) => item.value === payments.month,
                            )?.label
                          } expirado`}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
              {isSelected.includes("warning") &&
                data
                  ?.filter(
                    (item: any) =>
                      item.paid === false && item.inside_limit === true,
                  )
                  .map((payments: any, index: any) => (
                    <ListItem sx={{ m: 0, pb: 0 }} key={index}>
                      <ListItemButton
                        onClick={() =>
                          navigate(
                            `/members/${payments.person.id}/?section=payments_management`,
                          )
                        }
                      >
                        <ListItemIcon>
                          <Warning color="warning" />
                        </ListItemIcon>
                        <ListItemText primary={payments.person.full_name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
            </Grid>
          )
        ) : (
          <Typography sx={{ color: "gray", my: 2 }}>
            Não foram encontrados registos para as validações selecionadas.
          </Typography>
        )}
      </FormAccordion>
      <FormCard title="Gestão de Pagamentos">
        <Grid container p={2} size={12} alignItems={"center"} spacing={4}>
          <Grid size={6}>
            <Controller
              name="day"
              control={control}
              render={({ field }: any) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Dia"
                  type="number"
                  slotProps={{
                    htmlInput: { inputMode: "numeric", pattern: "[0-9]*" },
                  }}
                  fullWidth
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.day}
                  helperText={errors.day?.message}
                ></TextField>
              )}
            />
          </Grid>
          <Grid size={6}>
            <FormHelperText>
              Selecione um dia do mês entre 1 e 28 para criar as quotas mensais.
              Caso altere o dia, e as quotas do presente mês já tiverem sido
              criadas, apenas serão criadas novas no mês seguinte.
            </FormHelperText>
          </Grid>
        </Grid>
        <Grid container size={12} justifyContent={"flex-end"} mr={2} mb={2}>
          <Button
            variant="contained"
            endIcon={<Save></Save>}
            disabled={watch("day") === ""}
            onClick={() => {
              if (currentSettingData !== undefined) {
                patchBillingDay.mutate({
                  settingId: currentSettingData[0].id,
                  data: { day: watch("day") },
                });
              }
            }}
          >
            Guardar
          </Button>
        </Grid>
      </FormCard>
      <FormCard title="Planos de Pagamento">
        <Grid size={12} mb={0}>
          {isPlansLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : plansError ? (
            <Grid sx={{ mt: 3 }} container justifyContent="center" size={12}>
              <ListItem>
                <ListItemText primary="Ocorreu um erro ao encontrar a listagem de Planos de Pagamento. Tente mais tarde ou contacte um administrador."></ListItemText>
              </ListItem>
            </Grid>
          ) : plansData === undefined ||
            subscriptionRows === undefined ? null : (
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
      <CreateMemberPaymentPlanModal
        handleClose={handleCreatePlanModalClose}
        isOpen={isCreatePlanModalOpen}
      ></CreateMemberPaymentPlanModal>
    </Grid>
  );
}
