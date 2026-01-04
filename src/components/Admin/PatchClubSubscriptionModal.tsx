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
import { clubsHooks } from "../../hooks";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PatchClubSubscriptionModal(
  props: Readonly<{
    isOpen: boolean;
    handleClose: any;
    currentState: boolean;
    id: any;
    username: string;
  }>
) {
  const patchClubSubscription = clubsHooks.usePatchClubSubscriptionData();

  const handleSubmit = () => {
    patchClubSubscription.mutate({
      clubId: props.id,
      data: { paid: !props.currentState },
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
          Esta ação irá atualizar o estado do pagamento de {props.username} de
          <br />
          <strong style={{ color: props.currentState ? "green" : "red" }}>
            {props.currentState ? "Pago" : "Em Falta"}
          </strong>{" "}
          <br />
          para <br />
          <strong style={{ color: !props.currentState ? "green" : "red" }}>
            {!props.currentState ? "Pago" : "Em Falta"}
          </strong>
          .
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
