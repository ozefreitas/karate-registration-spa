import { useForm, Controller } from "react-hook-form";
import { Grid, TextField, Button, MenuItem } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useFetchAvailableClubs } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function RegisterAccountPage() {
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
      username: "",
    },
  });

  const onSubmit = async (data: any) => {
    // async request which may result error
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/register_user/",
        data
      );
      console.log(response);
      navigate("/login/");
    } catch (error: any) {
      console.log("Error: " + JSON.stringify(error.response.data));
    }
  };

  const { data: availableClubsData } = useFetchAvailableClubs();

  return (
    <Grid container>
      <Grid sx={{ m: 2 }} size={9}>
        <Controller
          name="first_name"
          control={control}
          render={({ field }) => (
            <TextField
              color="warning"
              variant={"outlined"}
              label="Primeiro Nome"
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
      <Grid sx={{ m: 2 }} size={9}>
        <Controller
          name="last_name"
          control={control}
          render={({ field }) => (
            <TextField
              variant={"outlined"}
              label="Último Nome"
              fullWidth
              {...field}
              onChange={(e) => {
                field.onChange(e);
              }}
            />
          )}
        />
      </Grid>
      <Grid sx={{ m: 2 }} size={9}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              variant={"outlined"}
              label="Nome de Utilizador"
              fullWidth
              select
              {...field}
              onChange={(e) => {
                field.onChange(e);
              }}
              error={!!errors.username}
              helperText={errors.username?.message}
            >
              <MenuItem value="">-- Selecionar --</MenuItem>
              {availableClubsData?.data.results
                .filter((club: any) => club.is_registered === false)
                .map((club: any, index: string) => (
                  <MenuItem key={index} value={club.id}>
                    {club.dojo}
                  </MenuItem>
                ))}
            </TextField>
          )}
        />
      </Grid>
      <Grid sx={{ m: 2 }} size={9}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              variant={"outlined"}
              label="Email"
              fullWidth
              {...field}
              onChange={(e) => {
                field.onChange(e);
              }}
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
              variant={"outlined"}
              label="Password"
              type="password"
              fullWidth
              {...field}
              onChange={(e) => {
                field.onChange(e);
              }}
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
          Criar Conta
        </Button>
      </Grid>
    </Grid>
  );
}
