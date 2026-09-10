import {
  Grid,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Card,
  CardContent,
  Typography,
  FormLabel,
  CardActions,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { authHooks } from "../../hooks";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ConfirmPasswordResetModal from "../../components/Admin/ConfirmPasswordResetModal";
import { useAuth } from "../../access/GlobalAuthProvider";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const loginUser = authHooks.useLogInUser();

  const onSubmit = async (data: { username: string; password: string }) => {
    if (watch("username") === "") {
      setError("username", { message: "Este campo é obrigatório" });
    }
    if (watch("password") === "") {
      setError("password", { message: "Este campo é obrigatório" });
    }
    if (watch("password") !== "" && watch("username") !== "")
      await loginUser.mutateAsync(data);
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("login_button")?.click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (user !== undefined) {
    return <Navigate to={"/"}></Navigate>;
  }

  return (
    <Grid container size={12} justifyContent={"center"} sx={{ mt: 5, mb: 0 }}>
      <Card sx={{ width: { xs: "94%", sm: "65%", md: "45%" } }}>
        <CardContent
          sx={{
            display: "flex",
            py: 0,
            "&:last-child": {
              paddingBottom: 1,
            },
          }}
        >
          <Grid container size={12} justifyContent="center" sx={{ p: 1 }}>
            <Typography sx={{ fontWeight: "bold", mt: 2 }} variant="h5Half">
              Login
            </Typography>
            <Grid sx={{ m: 2, mt: 3 }} size={12}>
              <FormLabel>
                <Typography variant="subtitle2" sx={{ p: 1, pl: 0 }}>
                  Username
                </Typography>
              </FormLabel>
              <Controller
                name="username"
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
                    fullWidth
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                )}
              />
            </Grid>
            <Grid sx={{ m: 2, mt: 0 }} size={12}>
              <FormLabel>
                <Typography variant="subtitle2" sx={{ p: 1, pl: 0 }}>
                  Password
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
            <Grid size={12} sx={{ ml: 2 }}>
              <Typography
                variant="caption"
                onClick={handleModalOpen}
                sx={{
                  color: "red",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Esqueceu-se da password?
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ mb: 1, mr: 1 }}>
          <Grid size={12} container justifyContent="flex-end">
            <Button
              id="login_button"
              variant="contained"
              size={"large"}
              color={"success"}
              type={"submit"}
              disabled={loginUser.isPending}
              loading={loginUser.isPending}
              loadingPosition="start"
              onClick={() => {
                handleSubmit(onSubmit)();
              }}
            >
              LogIn
            </Button>
          </Grid>
        </CardActions>
      </Card>
      <ConfirmPasswordResetModal
        handleClose={handleModalClose}
        isOpen={isModalOpen}
      ></ConfirmPasswordResetModal>
    </Grid>
  );
}
