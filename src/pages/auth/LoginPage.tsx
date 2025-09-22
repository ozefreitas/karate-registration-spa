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
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { SnackbarKey, useSnackbar } from "notistack";
import { Close } from "@mui/icons-material";
import { authHooks } from "../../hooks";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ConfirmPasswordResetModal from "../../components/Admin/ConfirmPasswordResetModal";
import { useAuth } from "../../access/GlobalAuthProvider";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const { closeSnackbar } = useSnackbar();

  const action = (snackbarId: SnackbarKey | undefined) => (
    <Close
      sx={{ cursor: "pointer" }}
      onClick={() => {
        closeSnackbar(snackbarId);
      }}
    >
      Fechar
    </Close>
  );

  const { user } = useAuth();
  if (user !== undefined) {
    return <Navigate to={"/"}></Navigate>;
  }

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
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const loginUser = authHooks.useLogInUser();

  const onSubmit = async (data: { username: string; password: string }) => {
    await loginUser.mutateAsync(data);
  };
  return (
    <Grid container sx={{ m: 30, mt: 0, mb: 0 }}>
      <Card sx={{ width: "100%" }}>
        <CardContent sx={{ display: "flex", p: 0 }}>
          <Grid container size={12} justifyContent="center" sx={{ p: 3 }}>
            <Typography sx={{ fontWeight: "bold", mt: 3 }} variant="h4">
              Login
            </Typography>
            <Grid sx={{ m: 2, mt: 5 }} size={12}>
              <FormLabel>
                <Typography variant="h6" sx={{ p: 1 }}>
                  Username
                </Typography>
              </FormLabel>
              <Controller
                name="username"
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
                    error={!!errors.username}
                    helperText={errors.username?.message}
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
            <Grid size={12} sx={{ ml: 3, mt: 0 }}>
              <Typography
                onClick={handleModalOpen}
                sx={{
                  color: "red",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Equeceu-se da password?
              </Typography>
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
                LogIn
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <ConfirmPasswordResetModal
        handleClose={handleModalClose}
        isOpen={isModalOpen}
      ></ConfirmPasswordResetModal>
    </Grid>
  );
}
