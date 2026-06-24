import { Typography, Grid, TextField } from "@mui/material";
import { monthlyPaymentsHooks } from "../../hooks";
import { Controller, useForm } from "react-hook-form";
import { getMonthFromValue } from "../../config";
import { useSnackbar } from "notistack";
import InfoBaseModal from "../base-modals/InfoBaseModal";
import { useEffect } from "react";

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
  }, [singleMonthlyMemberPayment, setValue]);

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
    <InfoBaseModal
      isModalOpen={props.isOpen}
      handleModalClose={() => {
        reset();
        props.handleClose();
      }}
      title="Alterar montante corrente"
      onSubmit={handleSubmit(onSubmit)}
      size="sm"
      chipName={`${getMonthFromValue(singleMonthlyMemberPayment?.month!)} de ${singleMonthlyMemberPayment?.year}`}
      disableConfirm={singleMonthlyMemberPayment?.paid}
    >
      {singleMonthlyMemberPayment?.paid ? (
        <Grid px={2}>
          De forma a evitar equivocos no valor pago pelo Membro, a opção de
          editar o montante a pagar para uma quota já criada está desativado.
          Para alterar o montante a pagar/pago, reverta o estado de pagamento na
          tabela, e tente editar novamente.
        </Grid>
      ) : (
        <Grid px={2}>
          Altere o montante que este Membro terá de pagar para este mês. Esta
          ação pode ser desfeita enquanto o estado de pagamento se mantiver{" "}
          <Typography fontWeight={"bold"} color="error" component="span">
            Em Falta
          </Typography>
          .
          <Grid mt={4}>
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
        </Grid>
      )}
    </InfoBaseModal>
  );
}
