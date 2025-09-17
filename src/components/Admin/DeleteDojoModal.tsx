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
import { clubsHoks } from "../../hooks";
import { useRemoveClub } from "../../hooks/useAuth";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteDojoModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    id?: string;
    setSelectedUserId: any;
  }>
) {
  const removeClub = clubsHoks.useRemoveClub();

  const handleDelete = () => {
    if (props.id) {
      removeClub.mutate(props.id, {
        onSuccess: () => {
          props.handleModalClose();
          props.setSelectedUserId("");
        },
      });
    }
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
        <Typography variant="h5">Apagar Evento</Typography>
      </DialogTitle>
      <DialogContent>
        Tem a certeza que pretende apagar esta conta? Esta ação irá eliminar
        todos os seus atletas, inscrições dos mesmos em eventos e informações
        guardada do próprio dojo. <p></p> NÃO PODERA VOLTAR ATRÁS!
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
          <Button size="small" onClick={handleDelete} variant="contained">
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
