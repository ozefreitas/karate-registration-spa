import { useFetchTokenUsername } from "../../hooks/useAuth";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  FormLabel,
  Typography,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotFoundPage from "../ErrorPages/ServerErrorPage";
import { authHooks } from "../../hooks";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function SignUpWithTokenPage(
  props: Readonly<{ token: string }>
) {
  const {
    data: currentUser,
    error,
    isLoading,
  } = authHooks.useFetchTokenUsername(props.token);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      password: "",
      email: "",
      token: props.token,
      username: "",
    },
  });

  const signUpWithToken = authHooks.useSignUpWithToken();

  const onSubmit = async (data: any) => {
    data.username = currentUser?.data.username;
    // async request which may result error
    try {
      await signUpWithToken.mutateAsync(data, {
        onSuccess: () => {
          navigate("/login/");
        },
      });
    } catch (error: any) {
      console.log("Error: " + JSON.stringify(error));
    }
  };

  if (isLoading) {
    return <div></div>;
  }

  if (error) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title={`Bem-vindo ${currentUser?.data.username}!`}
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Este é o ecrã de criação de conta autenticada. Caso tenha acedido a
          este link através de um email ou mensagem do seu administrador, pode
          proceguir com o preenchimento. Caso contrário deve ignorar esta
          página. Esta página estará disponível durante 3 dias após a emissão do
          email. <br /> O seu username da conta será "
          <strong>{currentUser?.data.username}</strong>", e deve preservar este
          de forma segura para não se esquecer. O username é imutável porque é
          usado como nome de referência para a origem dos seus atletas e para
          outras operações dentro da plataforma. Caso mais tarde se esqueça do
          seu username, deve contactar um administrador.
        </CardContent>
      </Card>
      <Grid container sx={{ m: 2, mt: 0, mb: 0 }}>
        <Card sx={{ width: "100%", p: 0 }}>
          <CardContent sx={{ display: "flex" }}>
            <Grid
              container
              size={12}
              justifyContent="center"
              sx={{ p: 3, pb: 0 }}
            >
              <Grid sx={{ m: 2 }} size={12}>
                <FormLabel>
                  <Typography variant="h6" sx={{ p: 1 }}>
                    Primeiro Nome
                  </Typography>
                </FormLabel>
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      color="warning"
                      variant={"outlined"}
                      fullWidth
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      error={!!errors.first_name}
                      helperText={errors.first_name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid sx={{ m: 2, mt: 0 }} size={12}>
                <FormLabel>
                  <Typography variant="h6" sx={{ p: 1 }}>
                    Último Nome
                  </Typography>
                </FormLabel>
                <Controller
                  name="last_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      color="warning"
                      variant={"outlined"}
                      fullWidth
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      error={!!errors.last_name}
                      helperText={errors.last_name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid sx={{ m: 2, mt: 0 }} size={12}>
                <FormLabel>
                  <Typography variant="h6" sx={{ p: 1 }}>
                    Email
                  </Typography>
                </FormLabel>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      color="warning"
                      variant={"outlined"}
                      fullWidth
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid sx={{ m: 2 }} size={12}>
                <FormLabel>
                  <Typography variant="h6" sx={{ p: 1 }}>
                    Password
                  </Typography>
                </FormLabel>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      color="warning"
                      variant={"outlined"}
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleClickShowPassword}
                                edge="end"
                                aria-label="toggle password visibility"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={12} container justifyContent="flex-end" sx={{ p: 3 }}>
                <Button
                  variant="contained"
                  size={"large"}
                  color={"success"}
                  type={"submit"}
                  onClick={() => {
                    handleSubmit(onSubmit)();
                  }}
                >
                  Criar Conta
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
