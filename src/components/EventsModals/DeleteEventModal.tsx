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
import { useRemoveEvent } from "../../hooks/useEventData";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteEventModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    handleModalOpen: any;
    id?: string | Array<string>;
  }>
) {
  const navigate = useNavigate();
  const { mutate } = useRemoveEvent();

  const handleDelete = (
    event: React.MouseEvent<HTMLElement>,
    id: string | Array<string> | undefined
  ) => {
    event.stopPropagation();
    if (id !== undefined && typeof id === "string") {
      mutate(id);
      props.handleModalClose();
      navigate("/events/");
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
        Tem a certeza que pretende apagar este Evento? Esta ação irá eliminar
        também todas as inscrições efetuadas até à data, assim como eventuais
        modalidades associadas e respetivas inscrições.
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
          <Button
            size="small"
            onClick={(e) => handleDelete(e, props.id)}
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
