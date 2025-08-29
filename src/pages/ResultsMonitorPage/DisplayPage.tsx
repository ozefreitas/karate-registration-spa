import skipLogo from "../../assets/skip-logo.png";
import ksaApp from "../../assets/Karatescore_nobg500.png";
import { Grid } from "@mui/material";

export default function DisplayPage() {
  return (
    <Grid
      sx={{ height: "100vh" }}
      container
      justifyContent="space-evenly"
      alignContent="center"
    >
      <img style={{ width: "300px", margin: "10px" }} src={skipLogo} alt="" />
      <img style={{ width: "300px", margin: "10px" }} src={ksaApp} alt="" />
    </Grid>
  );
}
