import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import { adminHooks } from "../../hooks";
import { FeedbackTypeEnum, type CreateFeedback } from "../../openapi";

const feedbackTypes = [
  { value: FeedbackTypeEnum.GENERAL, label: "Geral" },
  { value: FeedbackTypeEnum.PROBLEM, label: "Problema" },
  { value: FeedbackTypeEnum.DRAW, label: "Sorteios" },
  { value: FeedbackTypeEnum.EVENT, label: "Eventos" },
  { value: FeedbackTypeEnum.MEMBER, label: "Membros" },
];

export default function FeedbackPage() {
  const createFeedback = adminHooks.useCreateFeedback();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateFeedback>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      feedback_type: FeedbackTypeEnum.GENERAL,
      feedback: "",
    },
  });

  const onSubmit = (data: CreateFeedback) => {
    createFeedback.mutate({ data }, { onSuccess: () => reset() });
  };

  return (
    <>
      <PageInfoCard
        title="Envie o seu Feedback"
        description="Partilhe uma sugestão, reporte um problema ou envie-nos os seus comentários. Os seus dados de contacto ajudam-nos a responder."
      />
      <Grid
        container
        size={12}
        justifyContent="center"
        sx={{ mt: 5, mb: 0, px: 1 }}
      >
        <Card
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: { xs: "95%", sm: "75%", md: "55%" } }}
        >
          <CardHeader
            title={
              <Grid container size={12} justifyContent="center">
                <Typography sx={{ fontWeight: "bold", mt: 2 }} variant="h5Half">
                  Feedback
                </Typography>
              </Grid>
            }
          />
          <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="first_name"
                  control={control}
                  rules={{ required: "O primeiro nome é obrigatório." }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      color="warning"
                      variant="outlined"
                      label="Primeiro Nome"
                      fullWidth
                      required
                      error={!!errors.first_name}
                      helperText={errors.first_name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="last_name"
                  control={control}
                  rules={{ required: "O último nome é obrigatório." }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      color="warning"
                      variant="outlined"
                      label="Último Nome"
                      fullWidth
                      required
                      error={!!errors.last_name}
                      helperText={errors.last_name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={12}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "O email é obrigatório.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Introduza um endereço de email válido.",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      color="warning"
                      variant="outlined"
                      label="Email"
                      type="email"
                      fullWidth
                      required
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={12}>
                <Controller
                  name="feedback_type"
                  control={control}
                  rules={{ required: "Selecione uma categoria." }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      color="warning"
                      variant="outlined"
                      label="Categoria"
                      select
                      fullWidth
                      required
                      error={!!errors.feedback_type}
                      helperText={errors.feedback_type?.message}
                    >
                      {feedbackTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid size={12}>
                <Controller
                  name="feedback"
                  control={control}
                  rules={{ required: "Descreva o seu feedback." }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      color="warning"
                      variant="outlined"
                      label="Feedback"
                      fullWidth
                      required
                      multiline
                      minRows={5}
                      maxRows={10}
                      error={!!errors.feedback}
                      helperText={errors.feedback?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ px: { xs: 2, sm: 3 }, pb: 2, pt: 3 }}>
            <Button
              variant="contained"
              color="error"
              type="submit"
              disabled={createFeedback.isPending}
              loading={createFeedback.isPending}
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
            >
              Enviar Feedback
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
