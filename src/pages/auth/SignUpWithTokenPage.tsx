import { useFetchTokenUsername } from "../../hooks/useAuth";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NotFoundPage from "../ErrorPages/ServerErrorPage";

export default function SignUpWithTokenPage(
  props: Readonly<{ token: string }>
) {
  const { data, error, isLoading } = useFetchTokenUsername(props.token);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      password: "",
      email: "",
      token: props.token,
      username: data?.data.username,
    },
  });

  const onSubmit = async (data: any) => {
    // async request which may result error
    try {
      await axios.post("http://127.0.0.1:8000/register_user/", data);
      navigate("/login/");
    } catch (error: any) {
      console.log("Error: " + JSON.stringify(error.response.data));
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
          title={`Bem-vindo ${data?.data.username}`}
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
          <strong>{data?.data.username}</strong>", e deve preservar este de
          forma segura para não se esquecer. O username é imutável porque é
          usado como nome de referência para a origem dos seus atletas e para
          outras operações dentro da plataforma. Caso mais tarde se esqueça do
          seu username, deve contactar um administrador.
        </CardContent>
      </Card>
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
    </>
  );
}
