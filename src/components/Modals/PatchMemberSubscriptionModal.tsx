import {
  Dialog,
  DialogContent,
  Slide,
  Typography,
  Button,
  DialogActions,
  DialogTitle,
  Stack,
} from "@mui/material";
import React from "react";
import { TransitionProps } from "notistack";
import { monthlyPaymentsHooks } from "../../hooks";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PatchMemberSubscriptionModal(
  props: Readonly<{
    isOpen: boolean;
    handleClose: any;
    paymentObj: any;
  }>
) {
  const patchClubSubscription =
    monthlyPaymentsHooks.usePatchMonthlyMemberSubscriptionData();

  const handleSubmit = () => {
    const payload = { paid: !props.paymentObj.paid };
    patchClubSubscription.mutate({
      monthlySubscriptionId: props.paymentObj.id,
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
      <DialogTitle sx={{ p: 3 }}>
        <Typography variant="h5">Alteração de estado</Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          borderBottom: "1px solid lightgrey",
          borderTop: "1px solid lightgrey",
        }}
      >
        <p>
          Esta ação irá atualizar o estado do pagamento de{" "}
          {props.paymentObj.month}-{props.paymentObj.year} de
          <br />
          <strong style={{ color: props.paymentObj.paid ? "green" : "red" }}>
            {props.paymentObj.paid ? "Pago" : "Em Falta"}
          </strong>{" "}
          <br />
          para <br />
          <strong style={{ color: !props.paymentObj.paid ? "green" : "red" }}>
            {!props.paymentObj.paid ? "Pago" : "Em Falta"}
          </strong>
          .{" "}
        </p>
        <p>
          Tem a certeza que pretende continuar? Poderá desfazer esta ação mais
          tarde.
        </p>
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
          <Button size="small" onClick={handleSubmit} variant="contained">
            Confirmar
          </Button>
          <Button size="small" onClick={props.handleClose}>
            Cancelar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
