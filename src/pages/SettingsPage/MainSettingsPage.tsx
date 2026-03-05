import {
  Card,
  CardContent,
  CardActions,
  Box,
  Tabs,
  Tab,
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  FormControl,
  FormControlLabel,
  Stack,
  Tooltip,
  FormLabel,
  FormHelperText,
  IconButton,
  Chip,
  Popover,
} from "@mui/material";
import {
  Delete,
  Add,
  ContentCopy,
  Close,
  Check,
  Block,
  ThumbUp,
  PictureAsPdf,
  Upgrade,
  Person,
} from "@mui/icons-material";
import { useEffect, useState, useMemo } from "react";
import { authHooks, clubsHooks, adminHooks, membersHooks } from "../../hooks";
import DeleteClubModal from "../../components/Admin/DeleteClubModal";
import AddClubModal from "../../components/Admin/AddClubModal";
import { useSnackbar } from "notistack";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import { useSearchParams } from "react-router-dom";
import AllUseTable from "../../components/Table/AllUseTable";
import { formatDateTime } from "../../utils/utils";
import ActionValidationModal from "../../components/Modals/ActionValidationModal";
import SectionHeader from "../../components/Header/SectionHeader";

export default function MainSettingsPage() {
  const baseURL = import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173";
  const { enqueueSnackbar } = useSnackbar();
  const [clickedUsername, setClickedUsername] = useState<string>("");
  console.log(setClickedUsername);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedRequestId, setSelectedRequestId] = useState<string>("");
  const [selectedPasswordRequestId, setSelectedPasswordRequestId] =
    useState<string>("");
  const [createdToken, setCreatedToken] = useState<string>("");
  const [createdPasswordURL, setCreatedPasswordURL] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isAddClubModalOpen, setIsAddClubModalOpen] = useState<boolean>(false);
  const [isActionValidationModalOpen, setIsActionValidationModalOpen] =
    useState<boolean>(false);
  const [currentValidationId, setCurrentValidationId] = useState<string>("");
  const [currentValidationType, setCurrentValidationType] = useState<
    "approve" | "reject" | null
  >(null);
  const [currentRequestType, setCurrentRequestType] = useState<
    "general" | "verify" | "exams"
  >("general");

  const handleActionValidationModalOpen = (
    id: string,
    type: "approve" | "reject",
    request_type: "general" | "verify" | "exams",
  ) => {
    setCurrentValidationId(id);
    setCurrentValidationType(type);
    setCurrentRequestType(request_type);
    setIsActionValidationModalOpen(true);
  };

  const handleActionValidationModalClose = () => {
    setIsActionValidationModalOpen(false);
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const section = searchParams.get("section") || "accounts_manager";

  const [anchorPosition, setAnchorPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [activeRequestId, setActiveRequestId] = useState<string | null>(null);
  const [activeRequestMessage, setActiveRequestMessage] = useState<
    string | null
  >(null);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    requestId: string,
    message: string,
  ) => {
    event.preventDefault();

    setAnchorPosition({
      top: event.clientY + 20,
      left: event.clientX + 10,
    });

    setActiveRequestId(requestId);
    setActiveRequestMessage(message);
  };

  const handleClose = () => {
    setAnchorPosition(null);
    setActiveRequestId(null);
    setTimeout(() => {
      setActiveRequestMessage(null);
    }, 100);
  };

  const open = Boolean(anchorPosition);

  const { data: availableClubsData } = clubsHooks.useFetchAvailableClubs();

  const { refetch } = adminHooks.useFetchClubUsersData(clickedUsername);

  const { data: requestingPasswordsData } =
    adminHooks.useFetchPasswordResetRequests();

  const generatePasswordResetURL = adminHooks.useCreatePasswordRecoveryURL();

  const { data: requestAccountData } = authHooks.useFetchRequestingAccounts();

  const createSignUpToken = authHooks.useCreateSignUpToken();
  const rejectAcount = authHooks.useRemoveRequestAcount();

  const acountDetails = useMemo(() => {
    return requestAccountData?.results
      .filter((acount: any) => acount.id === selectedRequestId)
      .map((acount: any) => ({
        id: acount.id,
        id_number: acount.id_number,
        first_name: acount.first_name,
        last_name: acount.last_name,
        email: acount.email,
        username: acount.username,
      }))[0];
  }, [requestAccountData, selectedRequestId]);

  const passwordRequestedDetails = useMemo(() => {
    return requestingPasswordsData?.data
      ?.filter((acount: any) => acount.id === selectedPasswordRequestId)
      ?.map((acount: any) => ({
        id: acount.club_user.id,
        email: acount.club_user.email,
        username: acount.club_user.username,
      }))[0];
  }, [requestingPasswordsData, selectedPasswordRequestId]);

  useEffect(() => {
    if (clickedUsername !== "") {
      refetch();
    }
  }, [clickedUsername]);

  const { data: isTokenAvailable } = authHooks.useFetchToken(
    acountDetails?.username,
  );

  useEffect(() => {
    if (isTokenAvailable?.data.error === undefined) {
      setCreatedToken(isTokenAvailable?.data.token);
    } else {
      setCreatedToken("");
    }
  }, [isTokenAvailable]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault();
    setSearchParams({ section: newValue });
  };

  const handleClubChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUserId(event.target.value);
  };

  const handleAcountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRequestId(event.target.value);
  };

  const handlePasswordRequestAcountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectedPasswordRequestId(event.target.value);
  };

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const handleAddClubModalOpen = () => {
    setIsAddClubModalOpen(true);
  };

  const handleAddClubModalClose = () => {
    setIsAddClubModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(true);
  };

  const handleTokenCreation = () => {
    const data = { username: acountDetails?.username, alive_time: 3 };
    createSignUpToken.mutate(data, {
      onSuccess: (data: any) => {
        setCreatedToken(data.data.token);
      },
    });
  };

  const handlePasswordURLCreation = () => {
    generatePasswordResetURL.mutate(
      { username: passwordRequestedDetails.id },
      {
        onSuccess: (data: any) => {
          setCreatedPasswordURL(`${baseURL}${data.data.url}`);
        },
      },
    );
  };

  const handleAcountRejection = () => {
    rejectAcount.mutate(acountDetails?.id, {
      onSuccess: () => {
        setSelectedRequestId("");
      },
    });
  };

  function copyToClipboard(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }

  type Member = {
    full_name: string;
    id: string;
    gender: string;
  };
  type Club = { username: string };
  type Request = {
    id: string;
    message: string;
    person: Member;
    member_birth_date: string;
    requested_by: Club;
    reviewed_at: string;
    created_at: string;
    status: string;
    request_type: string;
    file: any;
  };

  const {
    data: memberValidationRequestData,
    isLoading: isMemberValidationRequestsLoading,
  } = membersHooks.useFetchMemberValidationRequestsData();

  console.log(memberValidationRequestData);

  const deleteMemberValidationRequest =
    membersHooks.useDeleteMemberValidationRequest();

  // Memoize `rows` to compute only when `members` changes
  const requestsVerifyRows = useMemo(() => {
    return memberValidationRequestData?.results
      .filter((request) => request.request_type === "verify")
      .map((request) => ({
        id: request.id,
        memberId: request.person.id,
        message:
          request.message === "" ? (
            <Typography color="textDisabled">N/A</Typography>
          ) : (
            <Button
              sx={{
                borderRadius: 10,
                boxShadow: "none",
                "&:hover": {
                  transform: "none",
                  boxShadow: "none",
                },
                textTransform: "none",
              }}
              size="small"
              variant="outlined"
              onClick={(e) =>
                handleClick(e, String(request.id), request.message!)
              }
            >
              Ver
            </Button>
          ),
        fullName: request.person.full_name,
        reviewed_at:
          request.reviewed_at === null ? (
            <Typography color="textDisabled">Por rever</Typography>
          ) : (
            formatDateTime(request.reviewed_at!, "both")
          ),
        created_at: formatDateTime(request.created_at, "both"),
        birthDate: request.member_birth_date,
        gender: request.person.gender === "Masculino" ? "M" : "F",
        username: request.requested_by.username,
        actions:
          request.status === "rejected" ? (
            <Grid
              container
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Chip color="error" label="Rejeitado" icon={<Block />}></Chip>
              <Tooltip title="Remover">
                <span>
                  <IconButton
                    onClick={() => {
                      deleteMemberValidationRequest.mutate({
                        validationId: String(request.id),
                      });
                    }}
                    color="error"
                  >
                    <Delete color="error"></Delete>
                  </IconButton>
                </span>
              </Tooltip>
            </Grid>
          ) : request.status === "approved" ? (
            <Grid container alignItems={"center"} justifyContent={"center"}>
              <Chip color="success" label="Aprovado" icon={<ThumbUp />}></Chip>
              <Tooltip title="Remover">
                <span>
                  <IconButton
                    onClick={() => {
                      deleteMemberValidationRequest.mutate({
                        validationId: String(request.id),
                      });
                    }}
                    color="error"
                  >
                    <Delete color="error"></Delete>
                  </IconButton>
                </span>
              </Tooltip>
            </Grid>
          ) : (
            <Grid>
              <Tooltip arrow title="Aceitar">
                <span>
                  <IconButton
                    onClick={() => {
                      handleActionValidationModalOpen(
                        String(request.id),
                        "approve",
                        "verify",
                      );
                    }}
                    color="success"
                  >
                    <Check color="success"></Check>
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip arrow title="Rejeitar">
                <span>
                  <IconButton
                    onClick={() => {
                      handleActionValidationModalOpen(
                        String(request.id),
                        "reject",
                        "verify",
                      );
                    }}
                    color="error"
                  >
                    <Close color="error"></Close>
                  </IconButton>
                </span>
              </Tooltip>
            </Grid>
          ),
      }));
  }, [memberValidationRequestData]);

  const openFile = (fileUrl: string) => {
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  // Memoize `rows` to compute only when `members` changes
  const requestsExamsRows = useMemo(() => {
    return memberValidationRequestData?.results
      .filter((request) => request.request_type === "exams")
      .map((request) => ({
        id: request.id,
        memberId: request.person.id,
        message:
          request.message === "" ? (
            <Typography color="textDisabled">N/A</Typography>
          ) : (
            <Button
              sx={{
                borderRadius: 10,
                boxShadow: "none",
                "&:hover": {
                  transform: "none",
                  boxShadow: "none",
                },
                textTransform: "none",
              }}
              size="small"
              variant="outlined"
              onClick={(e) =>
                handleClick(e, String(request.id), request.message!)
              }
            >
              Ver
            </Button>
          ),
        fullName: request.person.full_name,
        reviewed_at:
          request.reviewed_at === null ? (
            <Typography color="textDisabled">Por rever</Typography>
          ) : (
            formatDateTime(request.reviewed_at!, "both")
          ),
        created_at: formatDateTime(request.created_at, "both"),
        birthDate: request.member_birth_date,
        gender: request.person.gender === "Masculino" ? "M" : "F",
        username: request.requested_by.username,
        file: (
          <Tooltip
            arrow
            title={
              request.file === null ? "Ficheiro não disponível" : "Ver proposta"
            }
          >
            <span>
              <IconButton
                onClick={() => {
                  openFile(request.file!);
                }}
                disabled={request.file === null}
              >
                <PictureAsPdf
                  color={request.file === null ? "disabled" : "info"}
                ></PictureAsPdf>
              </IconButton>
            </span>
          </Tooltip>
        ),
        actions:
          request.status === "rejected" ? (
            <Grid
              container
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Chip color="error" label="Rejeitado" icon={<Block />}></Chip>
              <Tooltip title="Remover">
                <span>
                  <IconButton
                    onClick={() => {
                      deleteMemberValidationRequest.mutate({
                        validationId: String(request.id),
                      });
                    }}
                    color="error"
                  >
                    <Delete color="error"></Delete>
                  </IconButton>
                </span>
              </Tooltip>
            </Grid>
          ) : request.status === "approved" ? (
            <Grid container alignItems={"center"} justifyContent={"center"}>
              <Chip color="success" label="Aprovado" icon={<ThumbUp />}></Chip>
              <Tooltip title="Remover">
                <span>
                  <IconButton
                    onClick={() => {
                      deleteMemberValidationRequest.mutate({
                        validationId: String(request.id),
                      });
                    }}
                    color="error"
                  >
                    <Delete color="error"></Delete>
                  </IconButton>
                </span>
              </Tooltip>
            </Grid>
          ) : (
            <Grid>
              <Tooltip arrow title="Aceitar">
                <span>
                  <IconButton
                    onClick={() => {
                      handleActionValidationModalOpen(
                        String(request.id),
                        "approve",
                        "exams",
                      );
                    }}
                    color="success"
                  >
                    <Check color="success"></Check>
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip arrow title="Rejeitar">
                <span>
                  <IconButton
                    onClick={() => {
                      handleActionValidationModalOpen(
                        String(request.id),
                        "reject",
                        "exams",
                      );
                    }}
                    color="error"
                  >
                    <Close color="error"></Close>
                  </IconButton>
                </span>
              </Tooltip>
            </Grid>
          ),
      }));
  }, [memberValidationRequestData]);

  const getColumnMapping = (type: string) => {
    const columnMapping = [{ key: "fullName", label: "Nome" }];

    if (type !== "exams") {
      columnMapping.push(
        { key: "birthDate", label: "Data Nascimento" },
        { key: "gender", label: "Género" },
      );
    }
    columnMapping.push(
      { key: "username", label: "Clube" },
      { key: "message", label: "Mensagem" },
      { key: "created_at", label: "Criado" },
      { key: "reviewed_at", label: "Revisto" },
    );

    if (type === "exams") {
      columnMapping.push({ key: "file", label: "Ficheiro" });
    }
    columnMapping.push({ key: "actions", label: "Ações" });

    return columnMapping;
  };

  return (
    <>
      <PageInfoCard
        description="Aqui poderá configurar esta plataforma, e da forma como é
          apresentada para as contas associadas, assim como controlo sobre essas
          mesmas contas, controlar a forma como quotas são criadas, entre outras coisas."
        title="Administrador"
      ></PageInfoCard>
      <Box sx={{ width: "100%" }}>
        <Tabs
          sx={{
            "& .MuiTab-root": { color: "#e81c24" },
            "& .Mui-selected": { color: "#e81c24" },
            "& .MuiTabs-indicator": { backgroundColor: "#e81c24" },
            "& .MuiTab-fullWidth	": { color: "#e81c24" },
            m: 2,
            mt: 0,
            color: "#e81c24",
          }}
          value={section}
          onChange={handleChange}
          variant="fullWidth"
          textColor="inherit"
        >
          <Tab value="accounts_manager" label="Gestor de Contas" />
          <Tab value="payments_settings" label="Definições de Pagamentos" />
          <Tab value="members_manager" label="Gestor de Membros" />
        </Tabs>
      </Box>
      {section === "accounts_manager" ? (
        <Grid m={5} mt={10}>
          <SectionHeader title="Adicionar/Remover Clubes"></SectionHeader>
          <Grid
            mb={5}
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid size={6} sx={{ p: 2 }}>
              <TextField
                color="warning"
                variant={"outlined"}
                label="Conta Associada"
                select
                fullWidth
                multiline
                maxRows={8}
                value={selectedUserId}
                onChange={handleClubChange}
              >
                <MenuItem sx={{ color: "lightgrey" }} value="">
                  -- Selecionar --
                </MenuItem>
                {availableClubsData?.results.map((item, index: number) => (
                  <MenuItem key={index} value={item.id}>
                    {item.club}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={6} container justifyContent="space-around">
              <Button
                variant="contained"
                size="large"
                color="error"
                onClick={handleDeleteModalOpen}
                disabled={selectedUserId === ""}
                startIcon={<Delete />}
              >
                Eliminar Clube
              </Button>
              <Button
                variant="contained"
                size={"large"}
                color={"success"}
                type={"submit"}
                startIcon={<Add></Add>}
                onClick={handleAddClubModalOpen}
              >
                Adicionar Clube
              </Button>
            </Grid>
          </Grid>
          <SectionHeader title="Pedidos de Conta"></SectionHeader>
          <Grid mb={5}>
            <Grid size={6} sx={{ p: 2 }}>
              <TextField
                color="warning"
                variant={"outlined"}
                label="Conta a Inspecionar"
                select
                fullWidth
                multiline
                maxRows={8}
                value={selectedRequestId}
                onChange={handleAcountChange}
              >
                <MenuItem sx={{ color: "lightgrey" }} value="">
                  -- Selecionar --
                </MenuItem>
                {requestAccountData?.results.map((item, index: number) => (
                  <MenuItem key={index} value={item.id}>
                    {item.username}
                  </MenuItem>
                ))}
              </TextField>

              {acountDetails === undefined ? null : (
                <Card sx={{ m: 2 }}>
                  <CardContent>
                    <FormControl
                      sx={{ pb: 2, justifyContent: "center" }}
                      component="fieldset"
                      variant="standard"
                    >
                      <FormControlLabel
                        sx={{ mr: 2 }}
                        labelPlacement="start"
                        label={
                          <Typography
                            sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}
                          >
                            Primeiro Nome:
                          </Typography>
                        }
                        control={
                          <TextField
                            sx={{ width: "200px" }}
                            color="warning"
                            variant="standard"
                            label=""
                            value={acountDetails.first_name}
                            slotProps={{
                              input: {
                                readOnly: true,
                                disableUnderline: true,
                                style: { fontSize: 18, marginRight: 10 },
                              },
                            }}
                          />
                        }
                      ></FormControlLabel>
                    </FormControl>
                    <FormControl
                      sx={{ pb: 2, justifyContent: "center" }}
                      component="fieldset"
                      variant="standard"
                    >
                      <FormControlLabel
                        sx={{ mr: 2 }}
                        labelPlacement="start"
                        label={
                          <Typography
                            sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}
                          >
                            Último Nome:
                          </Typography>
                        }
                        control={
                          <TextField
                            sx={{ width: "200px" }}
                            color="warning"
                            variant="standard"
                            label=""
                            value={acountDetails.last_name}
                            slotProps={{
                              input: {
                                readOnly: true,
                                disableUnderline: true,
                                style: { fontSize: 18, marginRight: 10 },
                              },
                            }}
                          />
                        }
                      ></FormControlLabel>
                    </FormControl>
                    <FormControl
                      sx={{ pb: 2, justifyContent: "center" }}
                      component="fieldset"
                      variant="standard"
                    >
                      <FormControlLabel
                        sx={{ mr: 2 }}
                        labelPlacement="start"
                        label={
                          <Typography
                            sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}
                          >
                            Identificação:
                          </Typography>
                        }
                        control={
                          <TextField
                            sx={{ width: "150px" }}
                            color="warning"
                            variant="standard"
                            label=""
                            value={acountDetails.id_number}
                            slotProps={{
                              input: {
                                readOnly: true,
                                disableUnderline: true,
                                style: { fontSize: 18, marginRight: 10 },
                              },
                            }}
                          />
                        }
                      ></FormControlLabel>
                    </FormControl>
                    <FormControl
                      sx={{ pb: 2, justifyContent: "center" }}
                      component="fieldset"
                      variant="standard"
                    >
                      <FormControlLabel
                        sx={{ mr: 2 }}
                        labelPlacement="start"
                        label={
                          <Typography
                            sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}
                          >
                            Email:
                          </Typography>
                        }
                        control={
                          <TextField
                            sx={{ width: "300px" }}
                            color="warning"
                            variant="standard"
                            label=""
                            value={
                              acountDetails.email === ""
                                ? "N/A"
                                : acountDetails.email
                            }
                            slotProps={{
                              input: {
                                readOnly: true,
                                disableUnderline: true,
                                style: {
                                  fontSize: 18,
                                  marginRight: 10,
                                  color:
                                    acountDetails.email === ""
                                      ? "red"
                                      : undefined,
                                },
                              },
                            }}
                          />
                        }
                      ></FormControlLabel>
                    </FormControl>
                  </CardContent>
                  <CardActions
                    sx={{
                      justifyContent: "flex-end",
                      alignContent: "center",
                    }}
                  >
                    <Stack
                      direction={{
                        xs: "row-reverse",
                        sm: "row",
                      }}
                      sx={{
                        p: 2,
                        gap: 4,
                        flexShrink: 0,
                        alignSelf: { xs: "flex-end", sm: "center" },
                      }}
                    >
                      <Button
                        size="small"
                        onClick={() => handleTokenCreation()}
                        variant="contained"
                        disabled={createdToken !== ""}
                      >
                        Aceitar e Criar Link
                      </Button>
                      <Button
                        size="small"
                        disabled={createdToken !== ""}
                        onClick={() => {
                          handleAcountRejection();
                        }}
                      >
                        Rejeitar
                      </Button>
                    </Stack>
                  </CardActions>
                  {createdToken === "" ? null : (
                    <CardContent>
                      <Grid container>
                        <FormLabel sx={{ mb: 2 }}>
                          Copie este link e envie para o email fornecido pelo
                          pedinte desta conta. Apenas a pessoa com acesso a este
                          link será capaz de criar uma conta.
                        </FormLabel>
                        <Grid size={10} sx={{ p: 2, pb: 0 }}>
                          <TextField
                            color="warning"
                            variant={"outlined"}
                            label="Link de Criação de Conta"
                            maxRows={8}
                            fullWidth
                            value={`${baseURL}/signup/${createdToken}/`}
                            slotProps={{
                              input: {
                                readOnly: true,
                                disableUnderline: true,
                                style: { fontSize: 18, marginRight: 10 },
                              },
                            }}
                          />
                          <FormHelperText sx={{ p: 1, pt: 0 }}>
                            Atenção: Este token é de uso único e irá ser
                            desativado quando a conta for criada ou passados 3
                            dias da sua criação.
                          </FormHelperText>
                        </Grid>
                        <Tooltip title="Copiar para áera de transferência">
                          <span>
                            <Button
                              onClick={() =>
                                copyToClipboard(
                                  `${baseURL}/signup/${createdToken}/`,
                                )
                              }
                            >
                              <ContentCopy></ContentCopy>
                            </Button>
                          </span>
                        </Tooltip>
                      </Grid>
                    </CardContent>
                  )}
                </Card>
              )}
            </Grid>
          </Grid>
          <SectionHeader title="Pedidos de Recuperação de Password"></SectionHeader>
          <Grid>
            <Grid size={6} sx={{ p: 2 }}>
              <TextField
                color="warning"
                variant={"outlined"}
                label="Conta a Inspecionar"
                select
                fullWidth
                multiline
                maxRows={8}
                value={selectedPasswordRequestId}
                onChange={handlePasswordRequestAcountChange}
              >
                <MenuItem sx={{ color: "lightgrey" }} value="">
                  -- Selecionar --
                </MenuItem>
                {requestingPasswordsData?.data?.map(
                  (item: any, index: string) => (
                    <MenuItem key={index} value={item.id}>
                      {item.club_user.username}
                    </MenuItem>
                  ),
                )}
              </TextField>

              {passwordRequestedDetails === undefined ? null : (
                <Card sx={{ m: 2 }}>
                  <CardContent>
                    <FormControl
                      sx={{ pb: 2, justifyContent: "center" }}
                      component="fieldset"
                      variant="standard"
                    >
                      <FormControlLabel
                        sx={{ mr: 2 }}
                        labelPlacement="start"
                        label={
                          <Typography
                            sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}
                          >
                            Username:
                          </Typography>
                        }
                        control={
                          <TextField
                            sx={{ width: "200px" }}
                            color="warning"
                            variant="standard"
                            label=""
                            value={passwordRequestedDetails.username}
                            slotProps={{
                              input: {
                                readOnly: true,
                                disableUnderline: true,
                                style: { fontSize: 18, marginRight: 10 },
                              },
                            }}
                          />
                        }
                      ></FormControlLabel>
                    </FormControl>
                    <FormControl
                      sx={{ pb: 2, justifyContent: "center" }}
                      component="fieldset"
                      variant="standard"
                    >
                      <FormControlLabel
                        sx={{ mr: 2 }}
                        labelPlacement="start"
                        label={
                          <Typography
                            sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}
                          >
                            Email:
                          </Typography>
                        }
                        control={
                          <TextField
                            sx={{ width: "300px" }}
                            color="warning"
                            variant="standard"
                            label=""
                            value={
                              passwordRequestedDetails.email === ""
                                ? "N/A"
                                : passwordRequestedDetails.email
                            }
                            slotProps={{
                              input: {
                                readOnly: true,
                                disableUnderline: true,
                                style: {
                                  fontSize: 18,
                                  marginRight: 10,
                                  color:
                                    passwordRequestedDetails.email === ""
                                      ? "red"
                                      : undefined,
                                },
                              },
                            }}
                          />
                        }
                      ></FormControlLabel>
                    </FormControl>
                  </CardContent>
                  <CardActions
                    sx={{
                      justifyContent: "flex-end",
                      alignContent: "center",
                    }}
                  >
                    <Stack
                      direction={{
                        xs: "row-reverse",
                        sm: "row",
                      }}
                      sx={{
                        p: 2,
                        gap: 4,
                        flexShrink: 0,
                        alignSelf: { xs: "flex-end", sm: "center" },
                      }}
                    >
                      <Button
                        size="small"
                        onClick={() => handlePasswordURLCreation()}
                        variant="contained"
                        disabled={createdPasswordURL !== ""}
                      >
                        Criar Link
                      </Button>
                    </Stack>
                  </CardActions>
                  {createdPasswordURL === "" ? null : (
                    <CardContent>
                      <Grid container>
                        <FormLabel sx={{ mb: 2 }}>
                          Copie este link e envie para o email fornecido pelo
                          pedinte desta conta. Apenas a pessoa com acesso a este
                          link será capaz de repor a sua prórpia palavra-passe.
                        </FormLabel>
                        <Grid size={10} sx={{ p: 2, pb: 0 }}>
                          <TextField
                            color="warning"
                            variant={"outlined"}
                            label="Link de Criação de Conta"
                            maxRows={8}
                            fullWidth
                            value={createdPasswordURL}
                            slotProps={{
                              input: {
                                readOnly: true,
                                disableUnderline: true,
                                style: { fontSize: 18, marginRight: 10 },
                              },
                            }}
                          />
                          <FormHelperText sx={{ p: 1, pt: 0 }}>
                            Atenção: Este token é de uso único e irá ser
                            desativado quando a conta for reposta a
                            palavra-passe por parte do utilizador ou passados 3
                            dias da sua criação.
                          </FormHelperText>
                        </Grid>
                        <Grid container alignItems="center">
                          <Tooltip title="Copiar para áera de transferência">
                            <span>
                              <Button
                                onClick={() => {
                                  copyToClipboard(createdPasswordURL);
                                  enqueueSnackbar(
                                    "Copiado para área de transferência!",
                                    {
                                      variant: "success",
                                      anchorOrigin: {
                                        vertical: "top",
                                        horizontal: "center",
                                      },
                                      autoHideDuration: 3000,
                                      preventDuplicate: true,
                                    },
                                  );
                                }}
                              >
                                <ContentCopy></ContentCopy>
                              </Button>
                            </span>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </CardContent>
                  )}
                </Card>
              )}
            </Grid>
          </Grid>
        </Grid>
      ) : section === "payments_settings" ? (
        <Grid m={5}>
          As quotas são criadas automaticamente no primeiro dia de setembro de
          cada ano. <p></p>
          Pode alterar aqui o montante pré-definido das quotas. Neste momento, a
          todos os Clubes será pedido o mesmo valor. <p></p>
          Ao serem criadas as quotas, cada Clube é automaticamente notificado.
        </Grid>
      ) : isMemberValidationRequestsLoading ? null : (
        <Grid m={5} mt={10}>
          <Grid>
            <SectionHeader
              title="Verificação de Membros"
              icon={<Person sx={{ fontSize: 22 }} />}
            ></SectionHeader>
            <AllUseTable
              count={requestsVerifyRows?.length!}
              data={requestsVerifyRows}
              actions={false}
              selection={false}
              type="Atletas"
              userRole="main_admin"
              columnsHeaders={getColumnMapping("ola")}
              overideInternalPage
            ></AllUseTable>
          </Grid>
          <Grid mt={7}>
            <SectionHeader
              title="Pedidos de Propostas a Exame"
              icon={<Upgrade sx={{ fontSize: 22 }} />}
            ></SectionHeader>
            <AllUseTable
              count={requestsExamsRows?.length!}
              data={requestsExamsRows}
              actions={false}
              selection={false}
              type="Atletas"
              userRole="main_admin"
              columnsHeaders={getColumnMapping("exams")}
              overideInternalPage
            ></AllUseTable>
          </Grid>
        </Grid>
      )}
      <DeleteClubModal
        handleModalClose={handleDeleteModalClose}
        isModalOpen={isDeleteModalOpen}
        id={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      ></DeleteClubModal>
      <AddClubModal
        handleClose={handleAddClubModalClose}
        isOpen={isAddClubModalOpen}
      ></AddClubModal>
      <ActionValidationModal
        handleClose={handleActionValidationModalClose}
        isOpen={isActionValidationModalOpen}
        id={currentValidationId}
        type={currentValidationType}
        request_type={currentRequestType}
        personData={
          memberValidationRequestData?.results.find(
            (item: any) => item.id === currentValidationId,
          )?.person
        }
      ></ActionValidationModal>
      <Popover
        open={open}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          anchorPosition
            ? { top: anchorPosition.top, left: anchorPosition.left }
            : undefined
        }
      >
        <Typography sx={{ p: 2 }}>{activeRequestMessage}</Typography>
      </Popover>
    </>
  );
}
