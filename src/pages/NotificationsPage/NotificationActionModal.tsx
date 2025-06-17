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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NotificationActionModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    handleModalOpen: any;
    id?: string | Array<string>;
    mutation: any;
    setSelected: any;
  }>
) {
  const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    props.mutation(props.id);
    props.setSelected("");
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
        <Typography variant="h5">Apagar Notificação</Typography>
      </DialogTitle>
      <DialogContent>
        Tem a certeza que pretende apagar esta Notificação?
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
            onClick={(e) => handleDelete(e)}
            variant="contained"
          >
            Confirmar
          </Button>
          <Button
            size="small"
            onClick={() => {
              props.handleModalClose();
              props.setSelected("");
            }}
          >
            Cancelar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
