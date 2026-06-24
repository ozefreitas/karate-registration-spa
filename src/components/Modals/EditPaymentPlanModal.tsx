import {
  Typography,
  Grid,
  TextField,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Switch,
  FormHelperText,
} from "@mui/material";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { monthlyPaymentsHooks } from "../../hooks";
import InfoBaseModal from "../base-modals/InfoBaseModal";

export default function EditPaymentPlanModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    id: string;
  }>,
) {
  const { data: singlePaymentPlanData, isLoading: isSinglePaymentPlanLoading } =
    monthlyPaymentsHooks.useFetcSingleMonthlyMemberSubscriptionsData(props.id);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      amount: "",
      is_default: false,
    },
  });

  React.useEffect(() => {
    const formData = {
      name: singlePaymentPlanData?.name,
      is_default: singlePaymentPlanData?.is_default,
      amount: singlePaymentPlanData?.amount,
    };
    reset(formData);
  }, [singlePaymentPlanData]);

  const updatePlanData = monthlyPaymentsHooks.usePatchMonthlyPaymentPlanData();

  const onSubmit = (data: any) => {
    updatePlanData.mutate({ planId: props.id, data });
  };

  return (
    <InfoBaseModal
      isModalOpen={props.isModalOpen}
      handleModalClose={() => {
        reset();
        props.handleModalClose();
      }}
      title="Editar Plano de Pagamento"
      onSubmit={handleSubmit(onSubmit)}
      size="sm"
    >
      {isSinglePaymentPlanLoading ? (
        <Grid container justifyContent="center" mt={5} size={12}>
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container justifyContent={"center"}>
          <Grid p={2} size={12}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Nome"
                  fullWidth
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>
          <Grid p={2} size={12}>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Novo Montante"
                  type="number"
                  fullWidth
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
          <Grid px={1} mt={1} size={12}>
            <Controller
              name="is_default"
              control={control}
              render={({ field }) => (
                <FormControl
                  sx={{ pb: 2, justifyContent: "center" }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormControlLabel
                    sx={{ mr: 2, justifyContent: "flex-end" }}
                    labelPlacement="start"
                    label={
                      <Typography sx={{ fontSize: 16, pr: 2 }}>
                        Tornar padrão:
                      </Typography>
                    }
                    control={
                      <Switch
                        disabled={
                          watch("is_default") &&
                          singlePaymentPlanData?.is_default
                        }
                        {...field}
                        checked={field.value}
                        color="warning"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                        }}
                      />
                    }
                  ></FormControlLabel>
                </FormControl>
              )}
            />
          </Grid>
          <FormHelperText sx={{ px: 2 }}>
            Apenas poderá ter um Plano como padrão em simultâneo. Fazer este
            Plano como padrão irá remover esse estatuto do anterior.
          </FormHelperText>
        </Grid>
      )}
    </InfoBaseModal>
  );
}
