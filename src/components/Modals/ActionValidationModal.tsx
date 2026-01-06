import {
  Dialog,
  DialogContent,
  Slide,
  Button,
  DialogActions,
  DialogTitle,
  Stack,
  TextField,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
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
export default function ActionValidationModal(
  props: Readonly<{
    isOpen: boolean;
    handleClose: any;
    id: string;
    type: "approve" | "reject" | null;
  }>
) {
  const [requestText, setRequestText] = useState("");

  const patchMemberValidationStatus =
    membersHooks.usePatchMemberValidationRequest();

  const onSubmit = () => {
    patchMemberValidationStatus.mutate({
      validationId: props.id,
      data: {
        status: props.type === "approve" ? "approved" : "rejected",
        admin_comment: requestText,
      },
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
      <DialogTitle variant="h5" sx={{ p: 3 }}>
        {props.type === "approve" ? "Validar Membro" : "Rejeitar Membro"}
      </DialogTitle>
      <DialogContent
        sx={{
          borderBottom: "1px solid lightgrey",
          borderTop: "1px solid lightgrey",
        }}
      >
        {props.type === "approve" ? (
          <>
            <p>
              Está prestes a validar este Membro. Depois disto, este Membro
              ficará disponível para ser inscrito em Eventos.
            </p>
            <p>Pode anexar uma mensagem para informar o Clube.</p>
          </>
        ) : (
          <>
            <p>
              Está a rejeitar a validação deste Membro. O Clube será notificado
              e poderá enviar um novo pedido logo a seguir.
            </p>
            <p>
              Anexe uma mensagem para informar o Clube desta decisão, e o que
              deverá fazer para corrigir a informação deste Membro.
            </p>
          </>
        )}
        <Grid container>
          <TextField
            color="warning"
            variant={"outlined"}
            label="Mensagem"
            fullWidth
            multiline
            maxRows={5}
            value={requestText}
            onChange={(e) => {
              setRequestText(e.target.value);
            }}
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
