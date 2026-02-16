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
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GenerateDrawModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    eventId: string;
    willOverwrite: any;
    submitFunction: any;
  }>,
) {
  const handleGenerate = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    props.submitFunction();
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
        <Typography variant="h5">Gerar Sorteio</Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          borderBottom: "1px solid lightgrey",
          borderTop: "1px solid lightgrey",
        }}
      >
        {props.willOverwrite ? (
          <>
            <p></p>
            Já existe um sorteio para este Evento.<p></p>
            Gerar um novo sorteio irá eliminar permanentemente o sorteio
            anterior. <p></p>
            Deseja continuar? Esta ação é <strong>IRREVERSÍVEL!</strong>
          </>
        ) : (
          <>
            <p></p>
            Esta ação irá criar um novo sorteio para todos os Escalões
            selecionados para cada uma das Modalidades.<p></p>
            Mais tarde, e antes do dia de início da prova, poderá apagar ou
            gerar um novo sorteio nesta página.<p></p>
            Deseja continuar?
          </>
        )}
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
            onClick={(e) => handleGenerate(e)}
            variant="contained"
            // loading={generateDrawMutation.isPending}
            // loadingPosition="start"
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
