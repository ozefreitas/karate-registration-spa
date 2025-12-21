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
import { membersHooks } from "../../hooks";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RequestValidationModal(
  props: Readonly<{
    isOpen: boolean;
    handleClose: any;
    id: string;
  }>
) {
  const createMemberValidationRequest =
    membersHooks.useCreateMemberValidationRequest();

  const onSubmit = () => {
    const payload = {
      member: props.id,
      message: "OLA",
    };
    createMemberValidationRequest.mutate(payload);
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
        <Typography variant="h5">Validar Membro</Typography>
      </DialogTitle>
      <DialogContent>
        <p>
          Esta ação irá fazer um pedido ao seu administrador de forma a validar
          este Membro, tornando-se parte integrante da lista oficial de membros.
        </p>
        <p>
          Tenha a certeza de que os campos introduzidos estão corretos, uma vez
          que campos sensíveis não poderão ser alterados novamente após a
          validação ser confirmada. <br />
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
          <Button size="small" onClick={() => onSubmit()} variant="contained">
            Confirmar
          </Button>
          <Button
            size="small"
            onClick={() => {
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
