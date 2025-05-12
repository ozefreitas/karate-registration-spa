import axios from "axios";
import { Grid, TextField, Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      username: "",
    },
  });
  const onSubmit = async (data: { username: string; password: string }) => {
    const username = data.username;
    const password = data.password;
    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      alert("Logged in!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    }
  };
  return (
    <Grid container>
      <Grid sx={{ m: 2 }} size={9}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              color="warning"
              variant={"outlined"}
              label="Nome de Utilizador"
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
      <Grid sx={{ m: 2 }} size={9}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              color="warning"
              variant={"outlined"}
              label="Password"
              type="password"
              fullWidth
              {...field}
              onChange={(e) => {
                field.onChange(e);
              }}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
      </Grid>
      <Grid size={12}>
        <Button
          variant="contained"
          size={"large"}
          color={"success"}
          type={"submit"}
          sx={{ marginBottom: "20px" }}
          onClick={() => {
            handleSubmit(onSubmit)();
          }}
        >
          LogIn
        </Button>
      </Grid>
    </Grid>
  );
}
