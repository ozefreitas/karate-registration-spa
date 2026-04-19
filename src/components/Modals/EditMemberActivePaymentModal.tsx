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
} from "@mui/material";
import React, { useEffect } from "react";
import { TransitionProps } from "notistack";
import { monthlyPaymentsHooks } from "../../hooks";
import { Controller, useForm } from "react-hook-form";
import { getMonthFromValue } from "../../config";
import { useSnackbar } from "notistack";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditMemberActivePaymentModal(
  props: Readonly<{
    isOpen: boolean;
    handleClose: any;
    paymentId: string;
  }>,
) {
  const { enqueueSnackbar } = useSnackbar();

  const { data: singleMonthlyMemberPayment } =
    monthlyPaymentsHooks.useFetchSingleMonthlyMemberSubscriptionData(
      props.paymentId,
    );

  const patchCurrentPaymentAmount =
    monthlyPaymentsHooks.usePatchMonthlyMemberSubscriptionData();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      customAmount: "",
    },
  });

  useEffect(() => {
    setValue("customAmount", singleMonthlyMemberPayment?.amount!);
  }, [singleMonthlyMemberPayment]);

  const onSubmit = (data: any) => {
    if (data.customAmount == "") {
      enqueueSnackbar("Tem de inserir um número válido", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      setValue("customAmount", singleMonthlyMemberPayment?.amount!);
    } else {
      const payload = { amount: data.customAmount };
      patchCurrentPaymentAmount.mutate({
        monthlySubscriptionId: props.paymentId,
        data: payload,
      });
      props.handleClose();
    }
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
        <Typography variant="h5">Alterar montante corrente para</Typography>
        <Typography variant="h5" fontWeight={700}>
          {getMonthFromValue(singleMonthlyMemberPayment?.month!)} de{" "}
          {singleMonthlyMemberPayment?.year}
        </Typography>
      </DialogTitle>
      {singleMonthlyMemberPayment?.paid ? (
        <DialogContent
          sx={{
            borderBottom: "1px solid lightgrey",
            borderTop: "1px solid lightgrey",
          }}
        >
          <p>
            De forma a evitar equivocos no valor pago pelo Membro, a opção de
            editar o montante a pagar para uma quota já criada está desativado.
          </p>
          Para alterar o montante a pagar/pago, reverta o estado de pagamento na
          tabela, e tente editar novamente.
        </DialogContent>
      ) : (
        <DialogContent
          sx={{
            borderBottom: "1px solid lightgrey",
            borderTop: "1px solid lightgrey",
          }}
        >
          <p>Altere o montante que este Membro terá de pagar para este mês.</p>
          Esta ação pode ser desfeita enquanto o estado de pagamento se mantiver{" "}
          <Typography fontWeight={"bold"} color="error" component="span">
            Em Falta
          </Typography>
          .
          <Grid p={4} pb={0}>
            <Controller
              name="customAmount"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Novo Montante"
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
                  error={!!errors.customAmount}
                ></TextField>
              )}
            />
          </Grid>
        </DialogContent>
      )}
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
            disabled={singleMonthlyMemberPayment?.paid}
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
