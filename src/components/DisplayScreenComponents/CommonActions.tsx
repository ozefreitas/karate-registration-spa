import { Button, Grid } from "@mui/material";
import { Send, Delete, NavigateNext } from "@mui/icons-material";
import FormCard from "../../dashboard/FormCard";

export default function CommonActions() {
  return (
    <FormCard title="Ações Comuns">
      <Grid size={12} container justifyContent="space-evenly">
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
          //   onClick={() => {
          //     sendPlayer2Name();
          //   }}
          startIcon={<NavigateNext />}
        >
          Próxima Partida
        </Button>
      </Grid>
    </FormCard>
  );
}
