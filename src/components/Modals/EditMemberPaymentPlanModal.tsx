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

export default function EditMemberPaymentPlan(
  props: Readonly<{
    isOpen: boolean;
    handleClose: any;
    currentQuotesConfig: any;
  }>
) {
  const {
    data: monthlyPaymentPlansData,
    isLoading: isMonthlyPaymentPlansLoadng,
  } = monthlyPaymentsHooks.useFetchMonthlyPaymentPlansData();

  const patchMemberMonthlyPaymentConfig =
    monthlyPaymentsHooks.usePatchMemberMonthlyPaymentConfig();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: props.currentQuotesConfig.is_current_active
        ? ""
        : props.currentQuotesConfig.base_plan,
      custom: false,
      customAmount: null,
    },
  });

  const onSubmit = (data: any) => {
    const payload = {
      base_plan: data.name,
      custom_amount: data.customAmount,
      is_custom_active: data.custom,
    };
    patchMemberMonthlyPaymentConfig.mutate({
      monthlyPaymentConfigId: props.currentQuotesConfig.id,
      data: payload,
    });
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
      <DialogTitle>
        <Typography variant="h5">Alterar montante pré-definido</Typography>
      </DialogTitle>
      <DialogContent>
        <p>
          Escolha o montante a ser pedido a este Membro. <br /> Este será
          utilizado para criar novas quotas no primeiro dia de cada mês. <br />{" "}
          Se quiser alterar uma quota já criada, dirija-se ao icone da linha
          correspondente dentro da tabela.
        </p>
        <Grid sx={{ p: 2 }} size={6}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <>
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Plano"
                  fullWidth
                  select
                  disabled={watch("custom")}
                  required
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.name}
                >
                  <MenuItem value="" sx={{ color: "lightgrey" }}>
                    -- Selecionar --
                  </MenuItem>
                  {monthlyPaymentPlansData?.data.map(
                    (item: any, index: any) => (
                      <MenuItem key={index} value={item.id}>
                        {item.name} ({item.amount}€)
                      </MenuItem>
                    )
                  )}
                </TextField>
              </>
            )}
          />
        </Grid>
        <Grid mt={2} ml={1} size={6}>
          <Controller
            name="custom"
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
            gap: 4,
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
