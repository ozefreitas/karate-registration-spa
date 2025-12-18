import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Box,
  CircularProgress,
  Chip,
  Tooltip,
} from "@mui/material";
import PersonalInfoSection from "./PersonalInfoSection";
import ResultsHistorySection from "./ResultsHistorySection";
import QuotesSettingsSection from "./QuotesSettingsSection";
import stringAvatar from "../../dashboard/utils/avatarColor";
import { membersHooks } from "../../hooks";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import RegistryHistorySection from "./RegistryHistorySection";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import { MemberTypes } from "../../config";
import { OpenInNew } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function SingleMemberPage(
  props: Readonly<{ userRole: string }>
) {
  const navigate = useNavigate();
  const { id: memberId } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const section = searchParams.get("section") || "personal_info";

  const changeSection = (name: string) => {
    setSearchParams({ section: name });
  };

  const {
    data: singleMemberData,
    isLoading: isSingleMemberLoading,
    error: singleMemberError,
  } = membersHooks.useFetchSingleMemberData(memberId);

  return (
    <>
      <PageInfoCard
        description="Nesta página poderá consultar toda a informação inerente de um Membro, assim como editar ou remover este mesmo Membro. Caso este já esteja efetvado no seu administrador, apenas poderá editar campos não sensíveis e não poderá apagar o mesmo."
        title="Perfil de Membro"
      ></PageInfoCard>
      {isSingleMemberLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : singleMemberError ? (
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
                size={3}
                container
                justifyContent="center"
                spacing={2}
                alignContent="flex-start"
                sx={{ backgroundColor: "lightgray", p: 4 }}
              >
                {singleMemberData ? (
                  <Avatar
                    {...stringAvatar(singleMemberData?.data.full_name, 256)}
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
                    {singleMemberData?.data.full_name}
                  </Typography>
                </Grid>
                <Grid container justifyContent="center" size={6}>
                  <Typography variant="h6">
                    {singleMemberData?.data.gender}
                  </Typography>
                </Grid>
                <Grid container justifyContent="center" size={6}>
                  <Typography variant="h6">
                    {singleMemberData?.data.birth_date}
                  </Typography>
                </Grid>
                <Grid
                  container
                  justifyContent="center"
                  size={8}
                  alignItems={"center"}
                >
                  <Typography variant="h5">
                    {
                      MemberTypes.find(
                        (item) =>
                          item.value === singleMemberData?.data.member_type
                      )?.label
                    }
                  </Typography>
                  {singleMemberData?.data.has_another !== null ? (
                    <Tooltip title="Navegar para correspondente" arrow>
                      <Chip
                        color="primary"
                        variant="outlined"
                        sx={{ p: 1 }}
                        onClick={() =>
                          navigate(
                            `/members/${singleMemberData?.data.has_another}/`
                          )
                        }
                        clickable
                        icon={<OpenInNew />}
                        size="small"
                        label={
                          singleMemberData?.data.member_type === "coach"
                            ? "Aluno/Competidor"
                            : "Treinador"
                        }
                      ></Chip>
                    </Tooltip>
                  ) : null}
                </Grid>

                <Grid
                  container
                  justifyContent="center"
                  spacing={2}
                  size={12}
                  mt={10}
                >
                  <Button
                    variant={section === "personal_info" ? "contained" : "text"}
                    fullWidth
                    sx={{
                      backgroundColor:
                        section === "personal_info" ? "#e81c24" : "white",
                      color: section === "personal_info" ? "white" : "black",
                      p: 1,
                      textTransform: "none",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                    onClick={() => {
                      changeSection("personal_info");
                    }}
                  >
                    Informações Pessoais
                  </Button>
                </Grid>
                {["main_admin", "free_club"].includes(props.userRole) ? null : (
                  <Grid container justifyContent="center" size={12} mt={2}>
                    <Button
                      variant={
                        section === "quotes_management" ? "contained" : "text"
                      }
                      fullWidth
                      disabled={!singleMemberData?.data.quotes_legible}
                      sx={{
                        backgroundColor:
                          section === "quotes_management" ? "#e81c24" : "white",
                        color:
                          section === "quotes_management" ? "white" : "black",
                        p: 1,
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                      onClick={() => {
                        changeSection("quotes_management");
                      }}
                    >
                      Gestão de Pagamentos
                    </Button>
                  </Grid>
                )}
                <Grid container justifyContent="center" size={12} mt={2}>
                  <Button
                    variant={
                      section === "registration_history" ? "contained" : "text"
                    }
                    fullWidth
                    disabled
                    sx={{
                      backgroundColor:
                        section === "registration_history"
                          ? "#e81c24"
                          : "white",
                      color:
                        section === "registration_history" ? "white" : "black",
                      p: 1,
                      textTransform: "none",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                    onClick={() => {
                      changeSection("registration_history");
                    }}
                  >
                    Histórico de Inscrições
                  </Button>
                </Grid>
                <Grid container justifyContent="center" size={12} mt={2}>
                  <Button
                    variant={
                      section === "results_history" ? "contained" : "text"
                    }
                    fullWidth
                    disabled
                    sx={{
                      backgroundColor:
                        section === "results_history" ? "#e81c24" : "white",
                      color: section === "results_history" ? "white" : "black",
                      p: 1,
                      textTransform: "none",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                    onClick={() => {
                      changeSection("results_history");
                    }}
                  >
                    Histórico de Resultados
                  </Button>
                </Grid>
              </Grid>
              <Grid size={9} sx={{ p: 4 }}>
                {section === "personal_info" ? (
                  <PersonalInfoSection
                    memberData={singleMemberData}
                  ></PersonalInfoSection>
                ) : section === "registration_history" ? (
                  <RegistryHistorySection></RegistryHistorySection>
                ) : section === "results_history" ? (
                  <ResultsHistorySection></ResultsHistorySection>
                ) : section === "quotes_management" ? (
                  <QuotesSettingsSection
                    quotesConfig={singleMemberData?.data.monthly_payment_config}
                  ></QuotesSettingsSection>
                ) : null}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </>
  );
}
