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
import {
  Navigate,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import RegistryHistorySection from "./RegistryHistorySection";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import {
  ArrowRight,
  ArrowLeft,
  PhotoCamera,
  Check,
  Cancel,
} from "@mui/icons-material";
import { useRef, useState } from "react";
import { MemberTypes } from "../../config";

export default function SingleMemberPage(
  props: Readonly<{ userRole: string }>,
) {
  const navigate = useNavigate();
  const { id: memberId } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(undefined);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const section = searchParams.get("section") || "personal_info";

  const changeSection = (name: string) => {
    setSearchParams({ section: name });
  };

  const {
    data: singleMemberData,
    isLoading: isSingleMemberLoading,
    error: singleMemberError,
  } = membersHooks.useFetchSingleMemberData(memberId);

  const uploadPersonProfilePicture = membersHooks.usePatchMemberData();

  const avatarData = stringAvatar(
    singleMemberData?.full_name!,
    228,
    props.userRole,
  );

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    console.log(file);
    setSelectedFile(file);
  };

  const onSubmit = () => {
    if (selectedFile) {
      uploadPersonProfilePicture.mutate(
        {
          personId: memberId!,
          data: { profile_image: selectedFile },
        },
        { onSuccess: () => setSelectedFile(undefined) },
      );
    }
  };

  const previewUrl = selectedFile ? URL.createObjectURL(selectedFile) : null;

  // const removeMemberShip = membershipsHooks.useDeleteMemberShipData();

  return (
    <>
      <PageInfoCard
        description={
          <>
            <p>
              Nesta página poderá consultar toda a informação inerente de um
              Membro, assim como editar ou remover este mesmo Membro. Caso este
              já esteja efetivado no seu administrador, apenas poderá editar
              campos não sensíveis e não poderá apagar o mesmo.
            </p>
            <p>
              Membros classificados como <strong>Alunos</strong> não aparecerão
              para selecionar em inscrições de Torneios/Competições.
            </p>
            <p>
              Na secção <strong>Gestão de Pagamentos</strong> pode gerir os
              pagamentos de cada Membro, editar o montante a pagar por mês e ver
              irregularidades nos pagamentos. Para alterar o estado de
              pagamento, clique diretamente no botão informativo do estado
              deste.
            </p>
            <p>
              Ao lado do campo <i>Graduação</i> pode efetuar um{" "}
              <strong>Pedido de Proposta para Exame</strong>. Apenas Membros
              Verificados podem ser propostos a exame.
            </p>
          </>
        }
        title="Perfil de Membro"
      ></PageInfoCard>
      {isSingleMemberLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : singleMemberError ? (
        <Navigate to={"/not_found/"}></Navigate>
      ) : (
        <>
          <Grid container justifyContent={"space-between"} m={2}>
            <Button
              sx={{ px: 2 }}
              onClick={() => {
                if (singleMemberData?.next_prev.next !== null) {
                  navigate(`/members/${singleMemberData?.next_prev.next}`);
                }
              }}
              disabled={singleMemberData?.next_prev?.next === null}
              startIcon={<ArrowLeft></ArrowLeft>}
            >
              Membro Anterior
            </Button>
            <Button
              sx={{ px: 2 }}
              onClick={() => {
                if (singleMemberData?.next_prev.prev !== null) {
                  navigate(`/members/${singleMemberData?.next_prev.prev}`);
                }
              }}
              disabled={singleMemberData?.next_prev?.prev === null}
              endIcon={<ArrowRight></ArrowRight>}
            >
              Membro Seguinte
            </Button>
          </Grid>
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
                  p={4}
                  pt={6}
                  sx={{ backgroundColor: "lightgray" }}
                >
                  {singleMemberData ? (
                    <Tooltip
                      placement="top"
                      disableHoverListener={props.userRole === "main_admin"}
                      title={
                        singleMemberData?.profile_image || previewUrl
                          ? "Alterar Foto"
                          : "Adicionar Foto"
                      }
                    >
                      <Avatar
                        src={
                          previewUrl ||
                          singleMemberData?.profile_image ||
                          undefined
                        }
                        {...avatarData}
                        onMouseEnter={() => {
                          if (props.userRole !== "main_admin") {
                            setIsHovered(true);
                          }
                        }}
                        onMouseLeave={() => {
                          if (props.userRole !== "main_admin") {
                            setIsHovered(false);
                          }
                        }}
                        onClick={() => {
                          if (props.userRole !== "main_admin") {
                            handleAvatarClick();
                          }
                        }}
                      >
                        {isHovered ? (
                          <PhotoCamera sx={{ color: "white" }} />
                        ) : (
                          !previewUrl &&
                          !singleMemberData?.profile_image &&
                          avatarData.children
                        )}
                      </Avatar>
                    </Tooltip>
                  ) : (
                    <Avatar sx={{ width: 228, height: 228, mb: 2 }}></Avatar>
                  )}
                  {previewUrl !== null && props.userRole !== "main_admin" ? (
                    <Grid
                      container
                      justifyContent={"center"}
                      spacing={1}
                      mt={1}
                    >
                      <Chip
                        color="success"
                        sx={{ p: 1 }}
                        onClick={() => {
                          onSubmit();
                        }}
                        clickable
                        icon={<Check />}
                        size="small"
                        label="Confirmar"
                      ></Chip>
                      <Chip
                        color="error"
                        sx={{ p: 1 }}
                        onDelete={() => {
                          setSelectedFile(undefined);
                        }}
                        onClick={() => {
                          setSelectedFile(undefined);
                        }}
                        clickable
                        deleteIcon={<Cancel />}
                        size="small"
                        label="Cancelar"
                      ></Chip>
                    </Grid>
                  ) : null}
                  <Grid
                    container
                    justifyContent="center"
                    size={12}
                    m={2}
                    mb={1}
                    mt={5}
                  >
                    <Typography
                      sx={{ fontWeight: "bold", textAlign: "center" }}
                      variant="h5"
                    >
                      {singleMemberData?.full_name}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center" size={6}>
                    <Typography variant="h6">
                      {singleMemberData?.gender}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center" size={6}>
                    <Typography variant="h6">
                      {singleMemberData?.birth_date}
                    </Typography>
                  </Grid>
                  {props.userRole === "main_admin" ? null : (
                    <Grid
                      mt={3}
                      container
                      spacing={1}
                      justifyContent={"center"}
                    >
                      {singleMemberData?.member_types.map(
                        (types: string, index: any) => (
                          <Chip
                            variant="outlined"
                            // deleteIcon={<Cancel />}
                            // onDelete={() => {removeMemberShip.mutate()}}
                            onClick={() => {}}
                            color={
                              types === "coach"
                                ? "secondary"
                                : types === "student"
                                  ? "info"
                                  : "warning"
                            }
                            key={index}
                            label={
                              MemberTypes.find((item) => item.value === types)
                                ?.label
                            }
                          ></Chip>
                        ),
                      )}
                    </Grid>
                  )}
                  <Grid
                    container
                    justifyContent="center"
                    spacing={2}
                    size={12}
                    mt={10}
                  >
                    <Button
                      variant={
                        section === "personal_info" ? "contained" : "text"
                      }
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
                  {["main_admin", "free_club"].includes(
                    props.userRole,
                  ) ? null : (
                    <Grid container justifyContent="center" size={12} mt={2}>
                      <Button
                        variant={
                          section === "payments_management"
                            ? "contained"
                            : "text"
                        }
                        fullWidth
                        disabled={!singleMemberData?.quotes_legible}
                        sx={{
                          backgroundColor:
                            section === "payments_management"
                              ? "#e81c24"
                              : "white",
                          color:
                            section === "payments_management"
                              ? "white"
                              : "black",
                          p: 1,
                          textTransform: "none",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                        onClick={() => {
                          changeSection("payments_management");
                        }}
                      >
                        Gestão de Pagamentos
                      </Button>
                    </Grid>
                  )}
                  <Grid container justifyContent="center" size={12} mt={2}>
                    <Button
                      variant={
                        section === "registration_history"
                          ? "contained"
                          : "text"
                      }
                      fullWidth
                      disabled
                      sx={{
                        backgroundColor:
                          section === "registration_history"
                            ? "#e81c24"
                            : "white",
                        color:
                          section === "registration_history"
                            ? "white"
                            : "black",
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
                        color:
                          section === "results_history" ? "white" : "black",
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
                  ) : section === "payments_management" ? (
                    <QuotesSettingsSection
                      quotesConfig={singleMemberData?.monthly_payment_config}
                    ></QuotesSettingsSection>
                  ) : null}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </>
      )}
      {/* hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
}
