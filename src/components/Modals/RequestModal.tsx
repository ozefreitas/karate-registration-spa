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
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function RequestModal(
  props: Readonly<{
    isOpen: boolean;
    handleClose: any;
    id: string;
    requestType: "general" | "verify" | "exams";
  }>,
) {
  const [requestText, setRequestText] = useState("");
  const createMemberValidationRequest =
    membersHooks.useCreateMemberValidationRequest();

  const onSubmit = () => {
    const payload = {
      member: props.id,
      message: requestText,
      request_type: props.requestType,
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
      <DialogTitle variant="h5" sx={{ p: 3 }}>
        {props.requestType === "exams"
          ? "Pedido de Proposta de Exame"
          : props.requestType === "verify"
            ? "Pedido de Validação de Membro"
            : "Pedido Geral"}
      </DialogTitle>
      <DialogContent
        sx={{
          borderBottom: "1px solid lightgrey",
          borderTop: "1px solid lightgrey",
        }}
      >
        {props.requestType === "verify" ? (
          <>
            <p>
              Esta ação irá fazer um pedido ao seu administrador de forma a
              validar este Membro, tornando-se parte integrante da lista oficial
              de Membros.
            </p>
            <p>
              Tenha a certeza de que os campos introduzidos estão corretos, uma
              vez que campos sensíveis não poderão ser alterados novamente após
              a validação ser confirmada.
            </p>
            <p>
              Introduza uma mensagem para informar o administrador de informação
              que ache pertinente.
            </p>
          </>
        ) : props.requestType === "exams" ? (
          <>
            <p>
              Esta ação irá fazer um pedido ao seu administrador de forma a
              propor este Membro a exame de graduação.
            </p>
            <p>
              Terá de anexar o ficheiro assinado pelos responsáveis do clube.
            </p>
            <p>
              Introduza uma memsagem para informar o seu administrador de outras
              informações que ache relevante para complementar à proposta de
              exame.
            </p>
          </>
        ) : (
          <p>Escreva uma memnsagem</p>
        )}
        <Grid container>
          <TextField
            color="warning"
            variant={"outlined"}
            label="Mensagem"
            fullWidth
            multiline
            maxRows={4}
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
            gap: 3,
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
