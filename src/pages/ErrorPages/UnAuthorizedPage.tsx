import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UnAuthorizedPage() {
  const navigate = useNavigate();
  return (
    <>
      <Grid sx={{ mt: 10 }} container size={10} justifyContent="center">
        <Typography variant="h3">Acesso negado</Typography>
      </Grid>
      <Grid container justifyContent="center" sx={{ m: 2 }}>
        <Button variant="contained" size="large" onClick={() => navigate("/")}>
          Voltar
        </Button>
      </Grid>
    </>
  );
}
