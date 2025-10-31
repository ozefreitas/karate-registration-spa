import {
  Card,
  CardHeader,
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
} from "@mui/material";
import { Delete, Add, ContentCopy } from "@mui/icons-material";
import { useEffect, useState, useMemo } from "react";
import { authHooks, clubsHoks, adminHooks } from "../../hooks";
import DeleteClubModal from "../../components/Admin/DeleteClubModal";
import AddClubModal from "../../components/Admin/AddClubModal";
import { useSnackbar } from "notistack";

export default function MainSettingsPage() {
  const baseURL = import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173";
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState("one");
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

  const { data: availableClubsData } = clubsHoks.useFetchAvailableClubs();

  const { refetch } = adminHooks.useFetchClubUsersData(clickedUsername);

  const { data: requestingPasswordsData } =
    adminHooks.useFetchPasswordResetRequests();

  const generatePasswordResetURL = adminHooks.useCreatePasswordRecoveryURL();

  const { data: requestAccountData } = authHooks.useFetchRequestingAccounts();

  const createSignUpToken = authHooks.useCreateSignUpToken();
  const rejectAcount = authHooks.useRemoveRequestAcount();

  const acountDetails = useMemo(() => {
    return requestAccountData?.data.results
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
      .filter((acount: any) => acount.id === selectedPasswordRequestId)
      .map((acount: any) => ({
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
    acountDetails?.username
  );

  useEffect(() => {
    if (isTokenAvailable?.data.error !== undefined) {
      setCreatedToken("");
    } else {
      setCreatedToken(isTokenAvailable?.data.token);
    }
  }, [isTokenAvailable]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault();
    setValue(newValue);
  };

  const handleClubChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUserId(event.target.value);
  };

  const handleAcountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRequestId(event.target.value);
  };

  const handlePasswordRequestAcountChange = (
    event: React.ChangeEvent<HTMLInputElement>
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
    const data = { username: acountDetails.username, alive_time: 3 };
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
      }
    );
  };

  const handleAcountRejection = () => {
    rejectAcount.mutate(acountDetails.id, {
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

  console.log(acountDetails);
  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página de Administrador"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá iniciar configurar esta plataforma, e da forma como é
          apresentada para as contas associadas, assim como controlo sobre essas
          mesmas contas.
        </CardContent>
      </Card>
      <Card sx={{ m: 3, mt: 0 }}>
        <CardContent>
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
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              textColor="inherit"
            >
              <Tab value="one" label="Gestor de contas" />
              <Tab value="two" label="Work In Progress" />
              <Tab value="three" label="Work In Progress" />
            </Tabs>
          </Box>
          {value === "one" ? (
            <>
              <Typography variant="h5" sx={{ pl: 4, mt: 3, mb: 2 }}>
                Adicionar/Remover Clubes
              </Typography>
              <Grid
                sx={{ m: 4, mb: 0, mt: 1 }}
                container
                justifyContent="center"
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
                    <MenuItem value="">-- Selecionar --</MenuItem>
                    {availableClubsData?.data.results.map(
                      (item: any, index: string) => (
                        <MenuItem key={index} value={item.id}>
                          {item.club}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                </Grid>
                <Grid size={6} container justifyContent="space-evenly">
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
              <Typography variant="h5" sx={{ pl: 4, mt: 5, mb: 2 }}>
                Pedidos de Conta
              </Typography>
              <Grid container justifyContent="center">
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
                    <MenuItem value="">-- Selecionar --</MenuItem>
                    {requestAccountData?.data.results.map(
                      (item: any, index: string) => (
                        <MenuItem key={index} value={item.id}>
                          {item.username}
                        </MenuItem>
                      )
                    )}
                  </TextField>

                  {acountDetails !== undefined ? (
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
                      {createdToken !== "" ? (
                        <CardContent>
                          <Grid container>
                            <FormLabel sx={{ mb: 2 }}>
                              Copie este link e envie para o email fornecido
                              pelo pedinte desta conta. Apenas a pessoa com
                              acesso a este link será capaz de criar uma conta.
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
                                desativado quando a conta for criada ou passados
                                3 dias da sua criação.
                              </FormHelperText>
                            </Grid>
                            <Tooltip title="Copiar para áera de transferência">
                              <Button
                                onClick={() =>
                                  copyToClipboard(
                                    `${baseURL}/signup/${createdToken}/`
                                  )
                                }
                              >
                                <ContentCopy></ContentCopy>
                              </Button>
                            </Tooltip>
                          </Grid>
                        </CardContent>
                      ) : null}
                    </Card>
                  ) : null}
                </Grid>
              </Grid>
              <Typography variant="h5" sx={{ pl: 4, mt: 5, mb: 2 }}>
                Pedidos de Recuperação de Password
              </Typography>
              <Grid container justifyContent="center">
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
                    <MenuItem value="">-- Selecionar --</MenuItem>
                    {requestingPasswordsData?.data.map(
                      (item: any, index: string) => (
                        <MenuItem key={index} value={item.id}>
                          {item.club_user.username}
                        </MenuItem>
                      )
                    )}
                  </TextField>

                  {passwordRequestedDetails !== undefined ? (
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
                      {createdPasswordURL !== "" ? (
                        <CardContent>
                          <Grid container>
                            <FormLabel sx={{ mb: 2 }}>
                              Copie este link e envie para o email fornecido
                              pelo pedinte desta conta. Apenas a pessoa com
                              acesso a este link será capaz de repor a sua
                              prórpia palavra-passe.
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
                                palavra-passe por parte do utilizador ou
                                passados 3 dias da sua criação.
                              </FormHelperText>
                            </Grid>
                            <Grid container alignItems="center">
                              <Tooltip title="Copiar para áera de transferência">
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
                                      }
                                    );
                                  }}
                                >
                                  <ContentCopy></ContentCopy>
                                </Button>
                              </Tooltip>
                            </Grid>
                          </Grid>
                        </CardContent>
                      ) : null}
                    </Card>
                  ) : null}
                </Grid>
              </Grid>
            </>
          ) : value === "two" ? (
            <Grid></Grid>
          ) : (
            <Grid></Grid>
          )}
        </CardContent>
      </Card>
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
    </>
  );
}
