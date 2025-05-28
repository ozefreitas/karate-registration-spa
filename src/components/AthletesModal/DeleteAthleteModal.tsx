import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Grid,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useRemoveIndividualData } from "../../hooks/useIndividualsData";
import { useRemoveAthleteData } from "../../hooks/useAthletesData";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteAthleteModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    handleModalOpen: any;
    id: string;
    from: string;
  }>
) {
  const removeIndividual = useRemoveIndividualData();
  const removeAthlete = useRemoveAthleteData();

  const handleDelete = (event: React.MouseEvent<HTMLElement>, id: string) => {
    event.stopPropagation();
    if (props.from === "Atletas") {
      removeAthlete.mutate(id);
    } else {
      removeIndividual.mutate(id);
    }
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
        <Typography variant="h5">
          Apagar {props.from === "Atletas" ? "Atleta" : "Inscrição"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {props.from === "Atletas"
          ? "Tem a certeza que pretende apagar este Atleta? Esta ação irá eliminar também todas as inscrições desta Atleta em todas as provas."
          : "Tem a certeza que pretende apagar esta Inscrição?"}
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
