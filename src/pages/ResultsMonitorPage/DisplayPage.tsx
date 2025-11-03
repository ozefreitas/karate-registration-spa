import fighttechVisionLogo from "../../assets/FightTecVision-font-white-removebg-cropped.png";
import { Grid } from "@mui/material";

export default function DisplayPage() {
  return (
    <Grid
      sx={{ height: "100vh" }}
      container
      justifyContent="space-evenly"
      alignContent="center"
      alignItems={"center"}
    >
      <img
        style={{ width: "500px", margin: "10px" }}
        src={fighttechVisionLogo}
        alt=""
      />
    </Grid>
  );
}
