import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Box,
  CircularProgress,
} from "@mui/material";
import PersonalInfoSection from "./PersonalInfoSection";
import ResultsHistorySection from "./ResultsHistorySection";
import stringAvatar from "../../dashboard/utils/avatarColor";
import { membersHooks } from "../../hooks";
import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import RegistryHistorySection from "./RegistryHistorySection";
import PageInfoCard from "../../components/info-cards/PageInfoCard";

export default function SingleMemberPage() {
  const { id: memberId } = useParams<{ id: string }>();
  const {
    data: singleAthleteData,
    isLoading: isSingleAthleteLoading,
    error: singleAthleteError,
  } = membersHooks.useFetchSingleMemberData(memberId);

  const [currentScreen, setCurrentScreen] = useState<number>(1);

  return (
    <>
      <PageInfoCard
        description="Nesta página poderá consultar toda a informação inerente de um Atleta, assim como editar ou remover este mesmo Atelta."
        title="Perfil de Membro"
      ></PageInfoCard>
      {isSingleAthleteLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : singleAthleteError ? (
        <Navigate to={"/not_found/"}></Navigate>
      ) : (
        <Card sx={{ m: 2 }}>
          <CardContent
            sx={{
              p: 0,
              "&:last-child": {
                paddingBottom: 0,
              },
            }}
          >
            <Grid container size={12}>
              <Grid
                size={4}
                container
                justifyContent="center"
                alignContent="flex-start"
                sx={{ backgroundColor: "lightgray", p: 4 }}
              >
                {singleAthleteData ? (
                  <Avatar
                    {...stringAvatar(singleAthleteData?.data.full_name, 256)}
                  ></Avatar>
                ) : (
                  <Avatar sx={{ width: 256, height: 256, mb: 2 }}></Avatar>
                )}
                <Grid
                  container
                  justifyContent="center"
                  size={12}
                  sx={{ m: 3, mb: 1 }}
                >
                  <Typography
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                    variant="h5"
                  >
                    {singleAthleteData?.data.full_name}
                  </Typography>
                </Grid>
                <Grid container justifyContent="center" size={6}>
                  <Typography variant="h6">
                    {singleAthleteData?.data.gender}
                  </Typography>
                </Grid>
                <Grid container justifyContent="center" size={6}>
                  <Typography variant="h6">
                    {singleAthleteData?.data.birth_date}
                  </Typography>
                </Grid>
                <Grid
                  container
                  justifyContent="center"
                  size={12}
                  sx={{ mt: 3 }}
                >
                  <Button
                    variant={currentScreen === 1 ? "contained" : "text"}
                    fullWidth
                    sx={{
                      backgroundColor:
                        currentScreen === 1 ? "#e81c24" : "white",
                      color: currentScreen === 1 ? "white" : "black",
                      p: 1,
                      textTransform: "none",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                    onClick={() => setCurrentScreen(1)}
                  >
                    Informações Pessoais
                  </Button>
                </Grid>
                <Grid
                  container
                  justifyContent="center"
                  size={12}
                  sx={{ mt: 2, mb: 2 }}
                >
                  <Button
                    variant={currentScreen === 2 ? "contained" : "text"}
                    fullWidth
                    disabled
                    sx={{
                      backgroundColor:
                        currentScreen === 2 ? "#e81c24" : "white",
                      color: currentScreen === 2 ? "white" : "black",
                      p: 1,
                      textTransform: "none",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                    onClick={() => setCurrentScreen(2)}
                  >
                    Histórico de Inscrições
                  </Button>
                </Grid>
                <Grid container justifyContent="center" size={12}>
                  <Button
                    variant={currentScreen === 3 ? "contained" : "text"}
                    fullWidth
                    disabled
                    sx={{
                      backgroundColor:
                        currentScreen === 3 ? "#e81c24" : "white",
                      color: currentScreen === 3 ? "white" : "black",
                      p: 1,
                      textTransform: "none",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                    onClick={() => setCurrentScreen(3)}
                  >
                    Histórico de Resultados
                  </Button>
                </Grid>
              </Grid>
              <Grid size={8} sx={{ p: 4 }}>
                {currentScreen === 1 ? (
                  <PersonalInfoSection
                    athleteData={singleAthleteData}
                  ></PersonalInfoSection>
                ) : currentScreen === 2 ? (
                  <RegistryHistorySection></RegistryHistorySection>
                ) : currentScreen === 3 ? (
                  <ResultsHistorySection></ResultsHistorySection>
                ) : null}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </>
  );
}
