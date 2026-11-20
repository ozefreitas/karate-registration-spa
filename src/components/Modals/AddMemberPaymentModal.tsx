import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { MonthOptions, YearOptions } from "../../config";
import { monthlyPaymentsHooks } from "../../hooks";
import InfoBaseModal from "../base-modals/InfoBaseModal";

export default function AddMemberPaymentModal(
  props: Readonly<{
    isOpen: boolean;
    handleClose: () => void;
    personId: string;
    currentQuotesConfig: any;
  }>,
) {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      month: "",
      year: "",
      plan: props.currentQuotesConfig.is_current_active
        ? ""
        : props.currentQuotesConfig.base_plan,
      is_default: false,
      custom: false,
      customAmount: "",
    },
  });

  const { data: monthlyPaymentPlansData } =
    monthlyPaymentsHooks.useFetchMonthlyPaymentPlansData();
  const createMonthlyMemberSubscription =
    monthlyPaymentsHooks.useCreateMonthlyMemberSubscription();

  const closeAndReset = () => {
    reset();
    props.handleClose();
  };

  const onSubmit = (data: any) => {
    const payload = {
      person: props.personId,
      year: data.year,
      month: data.month,
      is_default: data.is_default,
      plan: data.plan,
      customAmount: data.customAmount,
    };
    if (data.custom) {
      payload.plan = undefined;
    }

    createMonthlyMemberSubscription.mutate(payload, {
      onSuccess: closeAndReset,
    });
  };

  const isDefault = watch("is_default");
  const isCustom = watch("custom");

  return (
    <InfoBaseModal
      isModalOpen={props.isOpen}
      handleModalClose={closeAndReset}
      title="Criar quota mensal"
      subheader="Selecione o período e defina o montante desta quota."
      chipName="Quota de membro"
      size="sm"
      onSubmit={handleSubmit(onSubmit)}
      disableConfirm={createMonthlyMemberSubscription.isPending}
    >
      <Grid container direction="column" spacing={2} sx={{ py: 1 }}>
        <Typography color="text.secondary">
          Insira o mês e o ano para os quais pretende criar a quota.
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="month"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  color="warning"
                  variant="outlined"
                  label="Mês"
                  select
                  fullWidth
                  required
                  error={!!errors.month}
                  onChange={(event) => field.onChange(event.target.value)}
                >
                  <MenuItem value="">-- Selecionar --</MenuItem>
                  {MonthOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  color="warning"
                  variant="outlined"
                  label="Ano"
                  select
                  fullWidth
                  required
                  error={!!errors.year}
                  onChange={(event) => field.onChange(event.target.value)}
                >
                  <MenuItem value="">-- Selecionar --</MenuItem>
                  {YearOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        </Grid>

        <Grid size={12}>
          <Controller
            name="is_default"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth component="fieldset" variant="standard">
                <FormLabel sx={{ mb: 1 }}>
                  Utilize o montante definido como padrão para as quotas.
                </FormLabel>
                <FormControlLabel
                  labelPlacement="start"
                  label="Usar montante padrão"
                  control={
                    <Switch
                      {...field}
                      checked={field.value}
                      color="warning"
                      disabled={isCustom}
                      onChange={(event) =>
                        field.onChange(event.target.checked)
                      }
                    />
                  }
                  sx={{ justifyContent: "space-between", mx: 0 }}
                />
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={12}>
          <Controller
            name="plan"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                color="warning"
                variant="outlined"
                label="Plano"
                fullWidth
                select
                disabled={isDefault || isCustom}
                required={!isDefault && !isCustom}
                error={!!errors.plan}
                onChange={(event) => field.onChange(event.target.value)}
              >
                {monthlyPaymentPlansData?.length === 0 ? (
                  <MenuItem disabled>Sem opções disponíveis.</MenuItem>
                ) : (
                  <MenuItem value="">-- Selecionar --</MenuItem>
                )}
                {monthlyPaymentPlansData?.map((item: any) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name} ({item.amount}€)
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid size={12}>
          <Controller
            name="custom"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth component="fieldset" variant="standard">
                <FormLabel sx={{ mb: 1 }}>
                  Defina um montante exclusivo para este membro; não será
                  guardado como um plano.
                </FormLabel>
                <FormControlLabel
                  labelPlacement="start"
                  label="Montante personalizado"
                  control={
                    <Switch
                      {...field}
                      checked={field.value}
                      color="warning"
                      disabled={isDefault}
                      onChange={(event) =>
                        field.onChange(event.target.checked)
                      }
                    />
                  }
                  sx={{ justifyContent: "space-between", mx: 0 }}
                />
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={12}>
          <Controller
            name="customAmount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                color="warning"
                variant="outlined"
                label="Novo montante"
                type="number"
                fullWidth
                disabled={!isCustom || isDefault}
                slotProps={{
                  htmlInput: {
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  },
                }}
                error={!!errors.customAmount}
                helperText={errors.customAmount?.message}
                onChange={(event) => field.onChange(event.target.value)}
              />
            )}
          />
        </Grid>
      </Grid>
    </InfoBaseModal>
  );
}
