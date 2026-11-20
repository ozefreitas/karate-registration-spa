import { Alert, Grid, TextField } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { clubsHooks } from "../../hooks";
import InfoBaseModal from "../base-modals/InfoBaseModal";

type FormData = {
  amount: string;
};

export default function UpdateClubSubscriptionAmountModal(
  props: Readonly<{
    isOpen: boolean;
    handleClose: () => void;
    year: string;
    configId?: number;
    currentAmount?: string;
  }>,
) {
  const patchYearlyAmounts =
    clubsHooks.usePatchClubSubscriptionAmountbyYear();
  const patchSubscriptionConfigAmount =
    clubsHooks.usePatchClubSubscriptionConfigData();
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { amount: props.currentAmount ?? "" },
  });

  useEffect(() => {
    if (props.isOpen) {
      reset({ amount: props.currentAmount ?? "" });
    }
  }, [props.currentAmount, props.isOpen, reset]);

  const closeModal = () => {
    reset({ amount: props.currentAmount ?? "" });
    props.handleClose();
  };

  const onSubmit = ({ amount }: FormData) => {
    const numericAmount = Number(amount);
    const numericYear = Number(props.year);

    if (!Number.isInteger(numericYear)) {
      setError("amount", { message: "Selecione primeiro um ano válido." });
      return;
    }
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("amount", { message: "Indique um montante superior a zero." });
      return;
    }
    if (props.configId === undefined) {
      return;
    }

    patchYearlyAmounts.mutate(
      { year: numericYear, amount },
      {
        onSuccess: () => {
          patchSubscriptionConfigAmount.mutate(
            {
              configId: String(props.configId),
              data: { amount },
            },
            { onSuccess: closeModal },
          );
        },
      },
    );
  };

  const isPending =
    patchYearlyAmounts.isPending || patchSubscriptionConfigAmount.isPending;

  return (
    <InfoBaseModal
      isModalOpen={props.isOpen}
      size="sm"
      handleModalClose={closeModal}
      title="Alterar montante anual"
      subheader={`O montante será atualizado para todos os clubes no ano ${props.year}.`}
      onSubmit={handleSubmit(onSubmit)}
      disableConfirm={
        isPending || !props.year || props.configId === undefined
      }
    >
      <Grid container spacing={2} sx={{ py: 2 }}>
        <Grid size={12}>
          <Alert severity="info">
            Esta alteração também atualiza o montante padrão das próximas
            quotas.
          </Alert>
        </Grid>
        <Grid size={12}>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Montante"
                type="number"
                color="warning"
                fullWidth
                required
                slotProps={{
                  htmlInput: {
                    inputMode: "decimal",
                    min: 0.01,
                    step: "0.01",
                  },
                }}
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </InfoBaseModal>
  );
}
