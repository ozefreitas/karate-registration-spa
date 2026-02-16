import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { drawsHooks } from "../../hooks";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteDrawModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    eventId: string;
  }>,
) {
  const deleteDraw = drawsHooks.useDeleteDraw();

  const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    deleteDraw.mutate(props.eventId);
    props.handleModalClose();
  };

  return (
    <Dialog
      open={props.isModalOpen}
      onClose={props.handleModalClose}
      slots={{
        transition: Transition,
      }}
    >
      <DialogTitle>
        <Typography variant="h5">Eliminar Sorteio</Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          borderBottom: "1px solid lightgrey",
          borderTop: "1px solid lightgrey",
        }}
      >
        <p></p>
        Esta ação irá eliminar o sorteio gerado para este Evento. <p></p> Todos
        os Clubes perderão acesso a este sorteio e serão notificados de tal.{" "}
        <p></p>
        Deseja continuar? Esta ação é <strong> IRREVERSÍVEL</strong>!
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
            onClick={(e) => handleDelete(e)}
            variant="contained"
          >
            Confirmar
          </Button>
          <Button size="small" onClick={props.handleModalClose}>
            Cancelar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
