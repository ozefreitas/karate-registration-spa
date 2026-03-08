import { Button, Grid } from "@mui/material";
import {
  Send,
  Delete,
  NavigateNext,
  NavigateBefore,
} from "@mui/icons-material";
import FormCard from "../../dashboard/FormCard";
import { drawsHooks } from "../../hooks";

export default function CommonActions(
  props: Readonly<{
    handleNextMatch: any;
    currentMatchId: any;
    nextMatchId: any;
  }>,
) {
  const advanceMatch = drawsHooks.useAdvanceMatch();
  return (
    <FormCard title="Ações">
      <Grid size={12} container justifyContent="space-evenly">
        <Button
          sx={{ m: 1 }}
          variant="contained"
          size="large"
          color="primary"
          // onClick={() => props.handleNextMatch()}
          startIcon={<NavigateBefore />}
        >
          Partida Anterior
        </Button>
        <Button
          sx={{ m: 1 }}
          variant="contained"
          size="large"
          color="success"
          //   onClick={() => {
          //     sendPlayer2Name();
          //   }}
          startIcon={<Send />}
        >
          Enviar
        </Button>
        <Button
          sx={{ m: 1 }}
          variant="contained"
          size="large"
          color="error"
          //   onClick={() => {
          //     sendPlayer2Name();
          //   }}
          startIcon={<Delete />}
        >
          Limpar Tudo
        </Button>
        <Button
          sx={{ m: 1 }}
          variant="contained"
          size="large"
          color="primary"
          onClick={() => {
            advanceMatch.mutate({
              matchId: props.currentMatchId,
              data: { next_match_id: props.nextMatchId },
            });
            props.handleNextMatch();
          }}
          endIcon={<NavigateNext />}
        >
          Próxima Partida
        </Button>
      </Grid>
    </FormCard>
  );
}
