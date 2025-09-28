import { useForm, Controller } from "react-hook-form";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  FormLabel,
  MenuItem,
} from "@mui/material";
import { clubsHoks, authHooks } from "../../hooks";
import { useNavigate } from "react-router-dom";

export default function RequestAccountPage() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      id_number: "",
      username: "",
    },
  });

  const createRequest = authHooks.useCreateRequestAcount();

  const onSubmit = (data: any) => {
    createRequest.mutate(data, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  const { data: availableClubsData } = clubsHoks.useFetchAvailableClubs();

  return (
    <Grid container sx={{ m: 40, mt: 0, mb: 0 }}>
      <Card sx={{ width: "100%", p: 0 }}>
        <CardContent sx={{ display: "flex" }}>
          <Grid
            container
            size={12}
            justifyContent="center"
            sx={{ p: 3, pb: 0 }}
          >
            <Typography sx={{ fontWeight: "bold" }} variant="h4">
              Pedido de conta sob{" "}
              {import.meta.env.VITE_DISPLAY_ADMIN_NAME ?? ""}
            </Typography>
            <Grid sx={{ m: 2, mt: 5 }} size={12}>
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
            <Grid sx={{ m: 2, mt: 0 }} size={12}>
              <FormLabel>
                <Typography variant="h6" sx={{ p: 1 }}>
                  Identificação
                </Typography>
              </FormLabel>
              <Controller
                name="id_number"
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
                    error={!!errors.id_number}
                    helperText={errors.id_number?.message}
                  />
                )}
              />
            </Grid>
            <Grid sx={{ m: 2, mt: 0 }} size={12}>
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
                    select
                    fullWidth
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
                        <MenuItem key={index} value={club.namec}>
                          {club.name}
                        </MenuItem>
                      ))}
                  </TextField>
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
                Submeter
              </Button>
            </Grid>
          </Grid>
          {/* <Grid size={1}>
            <Grid
              sx={{
                width: "100%",
                height: "50%",
                backgroundColor: "lightgray",
              }}
            >
              Login
            </Grid>
            <Grid
              sx={{
                width: "100%",
                height: "50%",
                backgroundColor: "red",
              }}
              container
              justifyContent="center"
              alignContent="center"
            >
              <Typography
                sx={{
                  writingMode: "vertical-lr",
                  direction: "ltr",
                  textOrientation: "mixed",
                }}
                variant="h6"
              >
                Pedir Conta
              </Typography>
            </Grid>
          </Grid> */}
        </CardContent>
      </Card>
    </Grid>
  );
}
