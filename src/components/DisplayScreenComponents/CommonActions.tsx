import { Button, Grid } from "@mui/material";
import { Send, Delete } from "@mui/icons-material";
import FormCard from "../../dashboard/FormCard";

export default function CommonActions() {
  return (
    <FormCard title="Ações Comuns">
      <Grid size={12} container>
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
      </Grid>
    </FormCard>
  );
}
