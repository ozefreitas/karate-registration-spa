import {
  Typography,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  Switch,
  FormLabel,
} from "@mui/material";
import { monthlyPaymentsHooks } from "../../hooks";
import { Controller, useForm } from "react-hook-form";
import InfoBaseModal from "../base-modals/InfoBaseModal";

export default function CreateMemberPaymentPlanModal(
  props: Readonly<{
    isOpen: boolean;
    handleClose: any;
  }>,
) {
  const createMemberMonthlyPaymentConfig =
    monthlyPaymentsHooks.useCreateMemberMonthlyPaymentPlan();

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      amount: null,
      is_default: false,
    },
  });

  const onSubmit = (data: any) => {
    if (data.name === "") {
      setError("name", { message: "Este campo é obrigatório" });
    }
    createMemberMonthlyPaymentConfig.mutate(data, {
      onSuccess: () => props.handleClose(),
    });
  };

  return (
    <InfoBaseModal
    size="sm"
      isModalOpen={props.isOpen}
      handleModalClose={() => {
        props.handleClose();
        reset();
      }}
      title="Criar novo plano de pagamento"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container direction={"column"} spacing={2} mx={2}>
        <Typography>
          Insira o nome (descritivo) do novo plano, e montante respetivo.
        </Typography>
        <Grid>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Nome"
                fullWidth
                required
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.name}
                helperText={errors.name?.message}
              ></TextField>
            )}
          />
        </Grid>
        <Grid>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
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
                error={!!errors.amount}
                helperText={errors.amount?.message}
              ></TextField>
            )}
          />
        </Grid>
        <Grid mt={1} size={12}>
          <Controller
            name="is_default"
            control={control}
            render={({ field }) => (
              <FormControl
                sx={{ pb: 2, justifyContent: "center" }}
                component="fieldset"
                variant="standard"
              >
                <FormLabel sx={{ mb: 1, fontSize: 13 }}>
                  Selecione este campo caso deseje que este plano se torne o
                  padrão aquando da criação automática de quotas.
                </FormLabel>
                <FormControlLabel
                  sx={{ m:0, justifyContent: "flex-end" }}
                  labelPlacement="start"
                  label={
                    <Typography sx={{ fontSize: 12, pr: 2 }}>
                      Tornar padrão:
                    </Typography>
                  }
                  control={
                    <Switch
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
      </Grid>
    </InfoBaseModal>
  );
}
