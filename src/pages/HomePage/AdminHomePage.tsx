import { Grid } from "@mui/material";
import NextCompHomeComponent from "../../components/home-cards/NextCompHomeComponent";
import LastCompQualiHomeComponent from "../../components/home-cards/LastCompQualiHomeComponent";
import ClubStats from "../../components/home-cards/ClubStats";

export default function AdminHomePage(props: Readonly<{ userRole: string }>) {
  return (
    <Grid container size={12}>
      <Grid size={6}>
        <NextCompHomeComponent
          userRole={props.userRole}
        ></NextCompHomeComponent>
        <ClubStats></ClubStats>
      </Grid>
      <Grid size={6}>
        <LastCompQualiHomeComponent
          userRole={props.userRole}
        ></LastCompQualiHomeComponent>
      </Grid>
    </Grid>
  );
}
