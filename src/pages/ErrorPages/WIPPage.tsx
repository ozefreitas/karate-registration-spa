import { Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import wipLogo from "../../assets/wip.png";

const WIPPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Grid mt={2} p={3} textAlign={"center"}>
        <img src={wipLogo} alt="wip" width={300}></img>
        <Typography variant="h4" m={3}>
          Esta página ainda não está disponível
        </Typography>
        <Typography variant="h6">
          Estamos a trabalhar para oferecer esta funcionalidade o mais rápido
          possível
        </Typography>
      </Grid>
      <Grid container justifyContent="center" m={5}>
        <Button variant="contained" size="large" onClick={() => navigate("/")}>
          Voltar
        </Button>
      </Grid>
    </>
  );
};

export default WIPPage;
