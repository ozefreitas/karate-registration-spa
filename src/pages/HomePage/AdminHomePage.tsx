import { Grid } from "@mui/material";
import NextEventHomeComponent from "../../components/home-cards/NextEventHomeComponent";
import LastCompQualiHomeComponent from "../../components/home-cards/LastCompQualiHomeComponent";
import ClubStats from "../../components/home-cards/ClubStats";
import MemberRequestsCard from "../../components/Admin/MemberRequestsCard";
import { useNavigate } from "react-router-dom";
import MissingQuotasCard from "../../components/Admin/MissingQuotasCard";

export default function AdminHomePage(props: Readonly<{ userRole: string }>) {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <Grid container size={12}>
      <Grid size={6}>
        <NextEventHomeComponent
          userRole={props.userRole}
        ></NextEventHomeComponent>
      </Grid>
      <Grid size={6}>
        <LastCompQualiHomeComponent
          userRole={props.userRole}
        ></LastCompQualiHomeComponent>
      </Grid>
      <Grid container size={12}>
        <ClubStats></ClubStats>
      </Grid>
      <Grid size={6}>
        <MissingQuotasCard
          year={currentYear}
          onResolve={() => navigate(`/payment_manager/?year=${currentYear}`)}
        />
      </Grid>

      <Grid size={6}>
        <MemberRequestsCard
          onResolve={() => navigate("/settings/?section=members_manager")}
        ></MemberRequestsCard>
      </Grid>
    </Grid>
  );
}
