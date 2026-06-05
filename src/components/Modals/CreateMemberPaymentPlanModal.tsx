import {
  Dialog,
  DialogContent,
  Slide,
  Typography,
  Button,
  DialogActions,
  DialogTitle,
  Stack,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  Switch,
  FormLabel,
} from "@mui/material";
import React from "react";
import { TransitionProps } from "notistack";
import { monthlyPaymentsHooks } from "../../hooks";
import { Controller, useForm } from "react-hook-form";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateMemberPaymentPlanModal(
  props: Readonly<{
    isOpen: boolean;
    handleClose: any;
  }>
) {
  const createMemberMonthlyPaymentConfig =
    monthlyPaymentsHooks.useCreateMemberMonthlyPaymentPlan();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      amount: null,
      is_default: false,
    },
  });

  const onSubmit = (data: any) => {
    createMemberMonthlyPaymentConfig.mutate(data);
    props.handleClose();
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.handleClose}
      slots={{
        transition: Transition,
      }}
    >
      <DialogTitle sx={{ p: 3 }}>
        <Typography variant="h5">Criar novo plano de pagamento</Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          borderBottom: "1px solid lightgrey",
          borderTop: "1px solid lightgrey",
        }}
      >
        <p>Insira o nome (descritivo) do novo plano, e montante respetivo.</p>
        <Grid sx={{ p: 2 }} size={6}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <>
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
                ></TextField>
              </>
            )}
          />
        </Grid>
        <Grid p={2}>
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
        <Grid mt={4} ml={1} size={6}>
          <Controller
            name="is_default"
            control={control}
            render={({ field }) => (
              <FormControl
                sx={{ pb: 2, justifyContent: "center" }}
                component="fieldset"
                variant="standard"
              >
                <FormLabel sx={{ ml: 2, mb: 1 }}>
                  Selecione este campo caso deseje que este plano se torne o
                  padrão aquando da criação automática de quotas.
                </FormLabel>
                <FormControlLabel
                  sx={{ mr: 2, justifyContent: "flex-end" }}
                  labelPlacement="start"
                  label={
                    <Typography sx={{ fontSize: 18, pr: 2 }}>
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
      </DialogContent>
      <DialogActions>
        <Stack
          direction={{
            xs: "row-reverse",
            sm: "row",
          }}
          sx={{
            p: 2,
            gap: 3,
            flexShrink: 0,
            alignSelf: { xs: "flex-end", sm: "center" },
          }}
        >
          <Button
            size="small"
            onClick={() => handleSubmit(onSubmit)()}
            variant="contained"
          >
            Confirmar
          </Button>
          <Button
            size="small"
            onClick={() => {
              reset();
              props.handleClose();
            }}
          >
            Cancelar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
