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
import { clubsHooks } from "../../hooks";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteClubModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    id?: string;
    setSelectedUserId: any;
  }>,
) {
  const removeClub = clubsHooks.useRemoveClub();

  const handleDelete = () => {
    if (props.id) {
      removeClub.mutate(Number(props.id), {
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
      <DialogTitle sx={{ p: 3 }}>
        <Typography variant="h5">Apagar Clube</Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          borderBottom: "1px solid lightgrey",
          borderTop: "1px solid lightgrey",
        }}
      >
        <p>
          Tem a certeza que pretende apagar esta conta? Esta ação irá eliminar
          todos os seus Membros, inscrições dos mesmos em Eventos e informações
          guardada do próprio Clube. <p></p> NÃO PODERA VOLTAR ATRÁS!
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
            gap: 3,
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
