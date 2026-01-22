import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Box,
  CircularProgress,
  Chip,
  Avatar,
  Typography,
} from "@mui/material";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { teamsHooks } from "../../hooks";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import stringAvatar from "../../dashboard/utils/avatarColor";

export default function SingleTeamPage() {
  const navigate = useNavigate();
  const { id: teamId } = useParams<{ id: string }>();

  const {
    data: singleTeamData,
    isLoading: isSingleTeamLoading,
    error: singleTeamError,
  } = teamsHooks.useFetchSingleTeamData(teamId);
  return (
    <>
      <PageInfoCard
        description={
          <>
            <p>
              Nesta página poderá consultar toda a informação inerente de uma
              Equipa, assim como remover esta mesma Equipa.
            </p>
          </>
        }
        title="Perfil de Equipa"
      ></PageInfoCard>
      {isSingleTeamLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : singleTeamError ? (
        <Navigate to={"/not_found/"}></Navigate>
      ) : (
        <Grid container m={2}>
          <Card
            sx={{
              width: "100%",
              m: 2,
            }}
          >
            <CardContent sx={{ p: 2, width: "100%", display: "flex", gap: 2 }}>
              <Grid size={4}>
                <Card
                  elevation={3}
                  sx={{
                    width: "100%",
                    minHeight: "30vh",
                  }}
                >
                  <CardContent sx={{ p: 4, width: "100%" }}>
                    <Grid
                      size={12}
                      container
                      justifyContent={"center"}
                      spacing={2}
                    >
                      <Avatar
                        {...stringAvatar(
                          singleTeamData?.data.athlete1.full_name,
                          128,
                        )}
                      ></Avatar>
                      <Typography variant="h4">
                        {singleTeamData?.data.athlete1.full_name}
                      </Typography>
                      <Grid container justifyContent={"center"}>
                        <Chip
                          sx={{ p: 1 }}
                          label={`
                        ${singleTeamData?.data.athlete1.age} anos
                      `}
                        ></Chip>
                        <Chip
                          sx={{ p: 1 }}
                          label={`
                        ${singleTeamData?.data.athlete1.gender}
                      `}
                        ></Chip>
                        <Chip
                          sx={{ p: 1 }}
                          label={`
                        ${singleTeamData?.data.athlete1.weight} Kg
                      `}
                        ></Chip>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={4}>
                <Card
                  elevation={3}
                  sx={{
                    width: "100%",
                    minHeight: "30vh",
                  }}
                >
                  <CardContent sx={{ p: 4, width: "100%" }}>
                    <Grid
                      size={12}
                      container
                      justifyContent={"center"}
                      spacing={2}
                    >
                      <Avatar
                        {...stringAvatar(
                          singleTeamData?.data.athlete2.full_name,
                          128,
                        )}
                      ></Avatar>
                      <Typography variant="h4">
                        {singleTeamData?.data.athlete2.full_name}
                      </Typography>
                      <Grid container justifyContent={"center"}>
                        <Chip
                          sx={{ p: 1 }}
                          label={`
                        ${singleTeamData?.data.athlete2.age} anos
                      `}
                        ></Chip>
                        <Chip
                          sx={{ p: 1 }}
                          label={`
                        ${singleTeamData?.data.athlete2.gender}
                      `}
                        ></Chip>
                        <Chip
                          sx={{ p: 1 }}
                          label={`
                        ${singleTeamData?.data.athlete2.weight} Kg
                      `}
                        ></Chip>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={4}>
                <Card
                  elevation={3}
                  sx={{
                    width: "100%",
                    minHeight: "30vh",
                  }}
                >
                  <CardContent sx={{ p: 4, width: "100%" }}>
                    <Grid
                      size={12}
                      container
                      justifyContent={"center"}
                      spacing={2}
                    >
                      <Avatar
                        {...stringAvatar(
                          singleTeamData?.data.athlete3.full_name,
                          128,
                        )}
                      ></Avatar>
                      <Typography variant="h4">
                        {singleTeamData?.data.athlete3.full_name}
                      </Typography>
                      <Grid container justifyContent={"center"}>
                        <Chip
                          sx={{ p: 1 }}
                          label={`
                        ${singleTeamData?.data.athlete3.age} anos
                      `}
                        ></Chip>
                        <Chip
                          sx={{ p: 1 }}
                          label={`
                        ${singleTeamData?.data.athlete3.gender}
                      `}
                        ></Chip>
                        <Chip
                          sx={{ p: 1 }}
                          label={`
                        ${singleTeamData?.data.athlete3.weight} Kg
                      `}
                        ></Chip>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}
    </>
  );
}
