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
  MenuItem,
  FormControl,
  FormLabel,
  FormControlLabel,
  Switch,
} from "@mui/material";
import React from "react";
import { TransitionProps } from "notistack";
import { monthlyPaymentsHooks } from "../../hooks";
import { Controller, useForm } from "react-hook-form";
import { MonthOptions, YearOptions } from "../../config";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddMemberPaymentModal(
  props: Readonly<{
    isOpen: boolean;
    handleClose: any;
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

  const {
    data: monthlyPaymentPlansData,
    // isLoading: isMonthlyPaymentPlansLoadng,
  } = monthlyPaymentsHooks.useFetchMonthlyPaymentPlansData();

  const createMonthlyMemberSubscription =
    monthlyPaymentsHooks.useCreateMonthlyMemberSubscription();

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
      onSuccess: () => {
        props.handleClose();
      },
    });
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
        <Typography variant="h5">Criar quota</Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          borderBottom: "1px solid lightgrey",
          borderTop: "1px solid lightgrey",
        }}
      >
        <p>Insira o mês para o qual quer criar a quota.</p>
        <Grid sx={{ p: 2 }} size={6}>
          <Controller
            name="month"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Mês"
                select
                fullWidth
                required
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.month}
              >
                <MenuItem sx={{ color: "lightgrey" }} value="">
                  -- Selecionar --
                </MenuItem>
                {MonthOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid sx={{ p: 2 }} size={6}>
          <Controller
            name="year"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Ano"
                select
                fullWidth
                required
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.month}
              >
                <MenuItem sx={{ color: "lightgrey" }} value="">
                  -- Selecionar --
                </MenuItem>
                {YearOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid mt={2} ml={1} size={6}>
          <Controller
            name="is_default"
            control={control}
            disabled={watch("custom")}
            render={({ field }) => (
              <FormControl
                sx={{ pb: 2, justifyContent: "center" }}
                component="fieldset"
                variant="standard"
              >
                <FormLabel sx={{ ml: 2, mb: 1 }}>
                  Selecione este campo caso deseje que seja utilizado o montante
                  que definiu como padrão.
                </FormLabel>
                <FormControlLabel
                  sx={{ mr: 2, justifyContent: "flex-end" }}
                  labelPlacement="start"
                  label={
                    <Typography sx={{ fontSize: 18, pr: 2 }}>
                      Usar padrão:
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
        <Grid p={2} pt={0} size={6}>
          <Controller
            name="plan"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Plano"
                fullWidth
                select
                disabled={watch("is_default") || watch("custom")}
                required
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.plan}
              >
                <MenuItem value="" sx={{ color: "lightgrey" }}>
                  -- Selecionar --
                </MenuItem>
                {monthlyPaymentPlansData?.map((item: any, index: any) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name} ({item.amount}€)
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid mt={2} ml={1} size={6}>
          <Controller
            name="custom"
            disabled={watch("is_default")}
            control={control}
            render={({ field }) => (
              <FormControl
                sx={{ pb: 2, justifyContent: "center" }}
                component="fieldset"
                variant="standard"
              >
                <FormLabel sx={{ ml: 2, mb: 1 }}>
                  Insira um montante personalizado apenas para este Membro. Este
                  não será guardado como um plano.
                </FormLabel>
                <FormControlLabel
                  sx={{ mr: 2, justifyContent: "flex-end" }}
                  labelPlacement="start"
                  label={
                    <Typography sx={{ fontSize: 18, pr: 2 }}>
                      Montante Personalizado:
                    </Typography>
                  }
                  control={
                    <Switch
                      {...field}
                      disabled={watch("is_default")}
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
        <Grid pl={2}>
          <Controller
            name="customAmount"
            disabled={!watch("custom") || watch("is_default")}
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Novo Montante"
                type="number"
                disabled={!watch("custom")}
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
                error={!!errors.customAmount}
                helperText={errors.customAmount?.message}
              ></TextField>
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
