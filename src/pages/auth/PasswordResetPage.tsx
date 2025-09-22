import {
  Grid,
  Card,
  CardContent,
  Typography,
  FormLabel,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  CardHeader,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { adminHooks } from "../../hooks";
import { useParams, useNavigate } from "react-router-dom";

export default function PasswordResetPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  const { token, uidb64: uidb } = useParams();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowPassword2 = () => {
    setShowPassword2((prev) => !prev);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      password2: "",
    },
  });

  const confirmPassword = adminHooks.useConfirmPassword();

  const onSubmit = async (data: { password: string; password2: string }) => {
    if (token !== undefined && uidb !== undefined) {
      await confirmPassword.mutateAsync(
        { uidb, token, data },
        {
          onSuccess: () => {
            navigate("/login/");
          },
        }
      );
    }
  };

  return (
    <Grid container sx={{ m: 30, mt: 0, mb: 0 }}>
      <Card>
        <CardHeader
          title="Página de Reposição de Password"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá inserir a sua nova password. Este link é único, não será
          partilhado com mais ninguém, e ficará indisponível assim que concluir
          o processo de reposição. Se não fez nenhum pedido deste tipo, por
          favor ignore o email e não preencha este formulário.
        </CardContent>
      </Card>
      <Card sx={{ width: "100%", m: 2 }}>
        <CardContent sx={{ display: "flex", p: 0 }}>
          <Grid container size={12} justifyContent="center" sx={{ p: 3 }}>
            <Grid sx={{ m: 2 }} size={12}>
              <FormLabel>
                <Typography variant="h6" sx={{ p: 1 }}>
                  Nova Password
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
            <Grid sx={{ m: 2 }} size={12}>
              <FormLabel>
                <Typography variant="h6" sx={{ p: 1 }}>
                  Confirmar Password
                </Typography>
              </FormLabel>
              <Controller
                name="password2"
                control={control}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    variant={"outlined"}
                    type={showPassword2 ? "text" : "password"}
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
                              onClick={handleClickShowPassword2}
                              edge="end"
                              aria-label="toggle password visibility"
                            >
                              {showPassword2 ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                    error={!!errors.password2}
                    helperText={errors.password2?.message}
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
                Confirmar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
