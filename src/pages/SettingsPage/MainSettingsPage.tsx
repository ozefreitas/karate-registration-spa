import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Box,
  Tabs,
  Tab,
  Grid,
  List,
  ListItem,
  ListItemButton,
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
import {
  useFetchAvailableClubs,
  useCreateClub,
  useFetchRequestingAccounts,
  useCreateSignUpToken,
  useFetchToken,
  useRemoveRequestAcount,
} from "../../hooks/useAuth";
import { useFetchDojoUsersData } from "../../hooks/useNotificationData";
import DeleteDojoModal from "../../components/Admin/DeleteDojoModal";

export default function MainSettingsPage() {
  const [value, setValue] = useState("one");
  const [clickedUsername, setClickedUsername] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedRequestId, setSelectedRequestId] = useState<string>("");
  const [createdToken, setCreatedToken] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const { data: availableClubsData } = useFetchAvailableClubs();
  const createClub = useCreateClub();

  const { data: dojoUserData, refetch } =
    useFetchDojoUsersData(clickedUsername);

  const { data: requestAccountData } = useFetchRequestingAccounts();

  const createSignUpToken = useCreateSignUpToken();
  const rejectAcount = useRemoveRequestAcount();

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

  useEffect(() => {
    if (clickedUsername !== "") {
      refetch();
    }
  }, [clickedUsername]);

  const { data: isTokenAvailable } = useFetchToken(acountDetails?.username);

  console.log(isTokenAvailable);

  useEffect(() => {
    if (isTokenAvailable !== undefined) {
      setCreatedToken(isTokenAvailable.data.token);
    }
  }, [isTokenAvailable]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleDojoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUserId(event.target.value);
  };

  const handleAcountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRequestId(event.target.value);
  };

  const handleModalOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setIsDeleteModalOpen(true);
  };

  const handleTokenCreation = (event: React.MouseEvent<HTMLButtonElement>) => {
    const data = { username: acountDetails.username, alive_time: 3 };
    createSignUpToken.mutate(
      { data: data },
      {
        onSuccess: (data: any) => {
          setCreatedToken(data.data.token);
        },
      }
    );
  };

  const handleAcountRejection = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
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
              <Typography variant="h5" sx={{ pl: 4, mt: 3 }}>
                Adicionar/remover contas
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
                    onChange={handleDojoChange}
                  >
                    <MenuItem value="">-- Selecionar --</MenuItem>
                    {availableClubsData?.data.results.map(
                      (item: any, index: string) => (
                        <MenuItem key={index} value={item.id}>
                          {item.dojo}
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
                    onClick={handleModalOpen}
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
                    onClick={() => {
                      // handleSubmit(onSubmit)();
                    }}
                  >
                    Adicionar Clube
                  </Button>
                </Grid>
              </Grid>
              <Typography variant="h5" sx={{ pl: 4, mt: 5 }}>
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
                                sx={{ width: "100px" }}
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
                                value={acountDetails.email}
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
                            onClick={(e) => handleTokenCreation(e)}
                            variant="contained"
                            disabled={createdToken !== ""}
                          >
                            Aceitar e Criar Link
                          </Button>
                          <Button
                            size="small"
                            disabled={createdToken !== ""}
                            onClick={(e) => {
                              handleAcountRejection(e);
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
                                value={`http://localhost:5173/signup/${createdToken}`}
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
                                    `http://localhost:5173/signup/${createdToken}`
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
            </>
          ) : value === "two" ? (
            <Grid></Grid>
          ) : (
            <Grid></Grid>
          )}
        </CardContent>
      </Card>
      <DeleteDojoModal
        handleModalClose={handleModalClose}
        isModalOpen={isDeleteModalOpen}
        id={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      ></DeleteDojoModal>
    </>
  );
}
