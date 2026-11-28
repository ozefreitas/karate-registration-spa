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
  CardActions,
  CardHeader,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { adminHooks } from "../../hooks";
import { useParams, useNavigate } from "react-router-dom";
import PageInfoCard from "../../components/info-cards/PageInfoCard";

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

  const onSubmit = (data: { password: string; password2: string }) => {
    if (token !== undefined && uidb !== undefined) {
      confirmPassword.mutate(
        { uidb, token, data },
        {
          onSuccess: () => {
            navigate("/login/");
          },
        },
      );
    }
  };

  return (
    <>
      <PageInfoCard
        title="Página de Reposição de Password"
        description="Aqui poderá inserir a sua nova password. Este link é único, não será
          partilhado com mais ninguém, e ficará indisponível assim que concluir
          o processo de reposição. Se não fez nenhum pedido deste tipo, por
          favor ignore o email e não preencha este formulário."
      ></PageInfoCard>
      <Grid
        container
        size={12}
        justifyContent={"center"}
        sx={{ mt: 5, mb: 0, px: 1 }}
      >
        <Card sx={{ width: { xs: "95%", sm: "75%", md: "55%" } }}>
          <CardHeader
            title={
              <Grid container size={12} justifyContent={"center"}>
                <Typography sx={{ fontWeight: "bold", mt: 2 }} variant="h5Half">
                  Reposição de Password
                </Typography>
              </Grid>
            }
          ></CardHeader>
          <CardContent sx={{ display: "flex", p: 0 }}>
            <Grid
              container
              size={12}
              justifyContent="center"
              sx={{
                p: 1,
                "& .MuiFormHelperText-root": {
                  fontSize: "0.7rem",
                  lineHeight: 1.2,
                },
              }}
            >
              <Grid sx={{ m: 2, mt: 3 }} size={12}>
                <FormLabel>
                  <Typography variant="subtitle2" sx={{ p: 1, pl: 0 }}>
                    Nova Password
                  </Typography>
                </FormLabel>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: 40,
                        },
                      }}
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
              <Grid sx={{ m: 2, mt: 0 }} size={12}>
                <FormLabel>
                  <Typography variant="subtitle2" sx={{ p: 1, pl: 0 }}>
                    Confirmar Password
                  </Typography>
                </FormLabel>
                <Controller
                  name="password2"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: 40,
                        },
                      }}
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
            </Grid>
          </CardContent>
          <CardActions sx={{ px: { xs: 2, sm: 3 }, pb: 2, pt: 1 }}>
            <Grid size={12} container>
              <Button
                variant="contained"
                color="error"
                type="submit"
                disabled={confirmPassword.isPending}
                loading={confirmPassword.isPending}
                loadingPosition="start"
                fullWidth
                size="large"
                sx={{
                  minHeight: 46,
                  borderRadius: 2,
                  boxShadow: "none",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  textTransform: "none",
                  "&:hover": {
                    boxShadow: 2,
                    transform: "none",
                    bgcolor: "error.dark",
                  },
                }}
                onClick={() => {
                  handleSubmit(onSubmit)();
                }}
              >
                Confirmar
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
