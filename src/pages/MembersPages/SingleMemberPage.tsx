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
import { membersHooks, membershipsHooks } from "../../hooks";
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
import { useMemo, useRef, useState } from "react";
import { MemberTypes } from "../../config";
import { callNotiStack } from "../../utils/utils";
import { useSnackbar } from "notistack";
import {
  alpha,
  createTheme,
  ThemeProvider,
  useTheme,
} from "@mui/material/styles";

const getSectionButtonSx = (isActive: boolean) => ({
  backgroundColor: isActive ? "#e81c24" : "transparent",
  color: isActive ? "common.white" : "text.primary",
  textTransform: "none",
  fontWeight: "bold",
  fontSize: 10,
  "&:hover": {
    backgroundColor: isActive ? "#d32f2f" : "action.hover",
  },
});

export default function SingleMemberPage(
  props: Readonly<{ userRole: string }>,
) {
  const navigate = useNavigate();
  const outerTheme = useTheme();
  const compactTheme = useMemo(() => {
    const smallerFontSize = (fontSize?: string | number) => {
      const value = fontSize ?? "1rem";
      return typeof value === "number"
        ? `${value * 0.92}px`
        : `calc(${value} * 0.92)`;
    };
    const typography = outerTheme.typography;

    return createTheme(outerTheme, {
      typography: {
        fontSize: 11,
        h1: { fontSize: smallerFontSize(typography.h1.fontSize) },
        h2: { fontSize: smallerFontSize(typography.h2.fontSize) },
        h3: { fontSize: smallerFontSize(typography.h3.fontSize) },
        h4: { fontSize: smallerFontSize(typography.h4.fontSize) },
        h5: { fontSize: smallerFontSize(typography.h5.fontSize) },
        h6: { fontSize: smallerFontSize(typography.h6.fontSize) },
        subtitle1: {
          fontSize: smallerFontSize(typography.subtitle1.fontSize),
        },
        subtitle2: {
          fontSize: smallerFontSize(typography.subtitle2.fontSize),
        },
        body1: { fontSize: smallerFontSize(typography.body1.fontSize) },
        body2: { fontSize: smallerFontSize(typography.body2.fontSize) },
        button: { fontSize: smallerFontSize(typography.button.fontSize) },
        caption: { fontSize: smallerFontSize(typography.caption.fontSize) },
        overline: { fontSize: smallerFontSize(typography.overline.fontSize) },
        h4Half: {
          fontSize: smallerFontSize(typography.h4Half.fontSize ?? "2.3rem"),
        },
        h5Half: {
          fontSize: smallerFontSize(typography.h5Half.fontSize ?? "1.6rem"),
        },
      },
    });
  }, [outerTheme]);
  const { id: memberId } = useParams<{ id: string }>();
  const { enqueueSnackbar } = useSnackbar();
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
  const removeMembership = membershipsHooks.useDeleteMemberShipData();

  const avatarData = stringAvatar(
    singleMemberData?.full_name!,
    208,
    props.userRole,
  );
  const responsiveAvatarSx = {
    width: { xs: 128, sm: 160, md: 180, lg: 208 },
    height: { xs: 128, sm: 160, md: 180, lg: 208 },
    fontSize: { xs: 42, sm: 53, md: 60, lg: 69 },
  };

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
    <ThemeProvider theme={compactTheme}>
      <>
        <PageInfoCard
          description={
            <>
              <p>
                Nesta página poderá consultar toda a informação inerente de um
                Membro, assim como editar ou remover este mesmo Membro. Caso
                este já esteja efetivado no seu administrador, apenas poderá
                editar campos não sensíveis e não poderá apagar o mesmo.
              </p>
              <p>
                Membros classificados como <strong>Alunos</strong> não
                aparecerão para selecionar em inscrições de
                Torneios/Competições.
              </p>
              <p>
                Na secção <strong>Gestão de Pagamentos</strong> pode gerir os
                pagamentos de cada Membro, editar o montante a pagar por mês e
                ver irregularidades nos pagamentos. Para alterar o estado de
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
            <Grid
              container
              justifyContent="space-between"
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "stretch", md: "center" }}
              spacing={1}
              mx={{ xs: 1, sm: 2, md: 4 }}
            >
              <Button
                sx={{
                  px: 1,
                  minWidth: 0,
                }}
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
                sx={{
                  px: 1,
                  minWidth: 0,
                }}
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
            <Card
              sx={{
                m: { xs: 1, sm: 2 },
                mx: { xs: 1, sm: 2, md: 4 },
                overflow: "visible",
              }}
            >
              <CardContent
                sx={{
                  p: 0,
                  "&:last-child": {
                    paddingBottom: 0,
                  },
                }}
              >
                <Grid container size={12} alignItems="flex-start">
                  <Grid
                    size={{ xs: 12, md: 4, lg: 3 }}
                    container
                    justifyContent="center"
                    spacing={{ xs: 1, md: 2 }}
                    alignContent="flex-start"
                    p={{ xs: 2, sm: 3, md: 4 }}
                    pt={{ xs: 3, md: 5 }}
                    sx={{
                      background: (theme) => {
                        const colorAlpha =
                          theme.palette.mode === "dark" ? 0.18 : 0.08;
                        return `linear-gradient(145deg, ${alpha(
                          theme.palette.primary.main,
                          colorAlpha,
                        )}, ${alpha(
                          theme.palette.error.main,
                          colorAlpha * 0.7,
                        )})`;
                      },
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: { xs: 16, md: 0 },
                      borderBottomLeftRadius: { xs: 0, md: 16 },
                      borderRight: { xs: 0, md: "1px solid" },
                      borderBottom: { xs: "1px solid", md: 0 },
                      borderColor: "divider",
                      position: { xs: "relative", md: "sticky" },
                      top: { md: 100 },
                      alignSelf: "flex-start",
                    }}
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
                          sx={{
                            ...avatarData.sx,
                            ...responsiveAvatarSx,
                          }}
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
                      <Avatar sx={{ ...responsiveAvatarSx, mb: 2 }} />
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
                      m={{ xs: 1, md: 2 }}
                      mb={1}
                      mt={{ xs: 2, md: 5 }}
                    >
                      <Typography
                        sx={{ fontWeight: "bold", textAlign: "center" }}
                        variant="h5"
                      >
                        {singleMemberData?.full_name}
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
                          (type: any, index: any) => (
                            <Chip
                              variant="outlined"
                              color={
                                type.member_type === "coach"
                                  ? "secondary"
                                  : type.member_type === "student"
                                    ? "info"
                                    : "warning"
                              }
                              deleteIcon={<Cancel />}
                              onClick={() => {
                                if (
                                  singleMemberData?.member_types.length === 1
                                ) {
                                  callNotiStack(
                                    enqueueSnackbar,
                                    "Não pode remover todos os tipos de praticante de um Membro!",
                                    "error",
                                    3000,
                                  );
                                } else removeMembership.mutate(type.id);
                              }}
                              onDelete={() => {
                                if (
                                  singleMemberData?.member_types.length === 1
                                ) {
                                  callNotiStack(
                                    enqueueSnackbar,
                                    "Não pode remover todos os tipos de praticante de um Membro!",
                                    "error",
                                    3000,
                                  );
                                } else removeMembership.mutate(type.id);
                              }}
                              key={index}
                              label={
                                MemberTypes.find(
                                  (item) => item.value === type.member_type,
                                )?.label
                              }
                            ></Chip>
                          ),
                        )}
                      </Grid>
                    )}
                    <Grid container size={12} mt={{ xs: 2, md: 5 }}>
                      <Button
                        variant={
                          section === "personal_info" ? "contained" : "text"
                        }
                        fullWidth
                        sx={getSectionButtonSx(section === "personal_info")}
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
                      <Button
                        variant={
                          section === "payments_management"
                            ? "contained"
                            : "text"
                        }
                        fullWidth
                        disabled={!singleMemberData?.quotes_legible}
                        sx={getSectionButtonSx(
                          section === "payments_management",
                        )}
                        onClick={() => {
                          changeSection("payments_management");
                        }}
                      >
                        Gestão de Pagamentos
                      </Button>
                    )}
                    <Button
                      variant={
                        section === "registration_history"
                          ? "contained"
                          : "text"
                      }
                      fullWidth
                      disabled
                      sx={getSectionButtonSx(
                        section === "registration_history",
                      )}
                      onClick={() => {
                        changeSection("registration_history");
                      }}
                    >
                      Histórico de Inscrições
                    </Button>
                    <Button
                      variant={
                        section === "results_history" ? "contained" : "text"
                      }
                      fullWidth
                      disabled
                      sx={{
                        ...getSectionButtonSx(section === "results_history"),
                      }}
                      onClick={() => {
                        changeSection("results_history");
                      }}
                    >
                      Histórico de Resultados
                    </Button>
                  </Grid>
                  <Grid
                    size={{ xs: 12, md: 8, lg: 9 }}
                    p={{ xs: 2, sm: 3, md: 4 }}
                    pt={{ xs: 2, md: 2 }}
                  >
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
    </ThemeProvider>
  );
}
