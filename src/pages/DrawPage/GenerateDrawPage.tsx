import {
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import FormCard from "../../dashboard/FormCard";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { DrawFormatTypes } from "../../config";
import { ArrowForward, Casino, Clear } from "@mui/icons-material";
import { drawsHooks, eventsHooks, disciplinesHooks } from "../../hooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import GenerateDrawModal from "../../components/Modals/GenerateDrawModal";
import { callNotiStack } from "../../utils/utils";
import { useSnackbar } from "notistack";
import PageInfoCard from "../../components/info-cards/PageInfoCard";

export default function GenerateDrawPage() {
  const { id: eventId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  type SelectionConfig = {
    disciplineId: string;
    disciplineName: string;
    formatValue: string;
    formatLabel: string;
    splitClubs: boolean;
    splitFavourites: boolean;
    maxMembersPerGroup?: string;
    minMembersPerGroup?: string;
    finalsSize?: string;
  };
  const [loading, setLoading] = useState<boolean>(false);
  // Confirmed selections
  const [selections, setSelections] = useState<SelectionConfig[]>([]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const {
    control,
    formState: { errors },
    watch,
    setError,
    setValue,
    reset,
    getValues,
    handleSubmit,
  } = useForm({
    defaultValues: {
      splitClubs: false,
      splitFavourites: false,
      discipline: "",
      format: "",
      maxMembersPerGroup: "",
      minMembersPerGroup: "",
      finalsSize: "",
      notificate: false,
    },
  });

  const { data: bracketsData } = drawsHooks.useBracketsData(eventId!);
  const { data: disciplinesData } = disciplinesHooks.useFetchDisciplinesData(
    eventId!,
  );

  const generateDrawMutation = eventsHooks.useGenerateDraw();

  const onSubmit = (data: any) => {
    setLoading(true);
    const payload = {
      eventId: eventId!,
      data: {
        disciplines: selections.map((s) => ({
          disciplineId: s.disciplineId,
          format: s.formatValue,
          splitClubs: s.splitClubs,
          splitFavourites: s.splitFavourites,
          maxMembersPerGroup: s.maxMembersPerGroup,
          minMembersPerGroup: s.minMembersPerGroup,
          finalsSize: s.finalsSize,
        })),
        notificate: data.notificate,
      },
    };
    generateDrawMutation.mutate(payload, {
      onSuccess: () => {
        setLoading(false);
        navigate(`/events/${eventId!}/draw/`);
      },
    });
  };

  const handleOk = () => {
    const disciplineId = getValues("discipline");
    const formatValue = getValues("format");

    const alreadyExists = selections.some(
      (s) => s.disciplineId === disciplineId,
    );
    if (alreadyExists) {
      callNotiStack(
        enqueueSnackbar,
        "Essa Modalidade já tem um Sorteio atribuído!",
        "error",
      );
      setError("discipline", { message: "Altere para uma Modalidade livre." });
      reset(
        {
          format: "",
          maxMembersPerGroup: "",
          minMembersPerGroup: "",
          finalsSize: "",
          notificate: false,
          splitClubs: false,
          splitFavourites: false,
        },
        { keepErrors: true },
      );
      return;
    }

    setSelections((prev) => [
      ...prev,
      {
        disciplineId,
        disciplineName:
          disciplinesData?.results.find(
            (item) => item.id === Number(disciplineId),
          )?.name || "",
        formatValue,
        formatLabel:
          DrawFormatTypes.find((item) => item.value === formatValue)?.label ||
          "",
        splitClubs: getValues("splitClubs"),
        splitFavourites: getValues("splitFavourites"),
        maxMembersPerGroup: getValues("maxMembersPerGroup"),
        minMembersPerGroup: getValues("minMembersPerGroup"),
        finalsSize: getValues("finalsSize"),
      },
    ]);

    reset();
    callNotiStack(
      enqueueSnackbar,
      "Sorteio configurado! Dirija-se à secção de resumo para confirmar.",
      "success",
    );
  };

  return (
    <Grid container>
      <PageInfoCard
        title="Gerar Novo Sorteio"
        description="Altere as definições relativas aos Sorteios a ser gerados. Pode atribuir a cada Modalidade um tipo de Sorteio específico de forma a satisfazer as regras de cada prova."
      ></PageInfoCard>
      <FormCard
        title="Configurar Sorteio"
        subheader="Altere as configurações do Sorteios de cada Modalidade."
      >
        <Grid size={12} p={2} container>
          <FormLabel>
            Atribua um formato a cada Modalidade desta Competição.
          </FormLabel>
        </Grid>
        <Grid
          size={12}
          container
          spacing={2}
          p={2}
          pt={0}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid size={4.5}>
            <Controller
              name="discipline"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{
                    "& .MuiSelect-icon": {
                      left: "auto",
                      right: 40,
                    },
                  }}
                  color="warning"
                  variant={"outlined"}
                  label="Modalidade"
                  select
                  fullWidth
                  required
                  {...field}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("discipline") === ""}
                            onClick={() => setValue("discipline", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("discipline") === ""
                                  ? "disabled"
                                  : "error"
                              }
                            ></Clear>
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.discipline}
                  helperText={errors.discipline?.message}
                >
                  <MenuItem sx={{ color: "lightgrey" }} value="">
                    -- Selecionar --
                  </MenuItem>
                  {disciplinesData?.results
                    .filter((item) => !item.is_coach)
                    .map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid>
            <ArrowForward fontSize="large" color="error"></ArrowForward>
          </Grid>
          <Grid size={4.5}>
            <Controller
              name="format"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{
                    "& .MuiSelect-icon": {
                      left: "auto",
                      right: 40,
                    },
                  }}
                  color="warning"
                  variant={"outlined"}
                  label="Formato"
                  select
                  fullWidth
                  required
                  {...field}
                  slotProps={{
                    select: {
                      renderValue: (selected) => {
                        const selectedFromat = DrawFormatTypes?.find(
                          (m: any) => m.value === selected,
                        );
                        return selectedFromat?.label || "";
                      },
                    },
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("format") === ""}
                            onClick={() => setValue("format", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("format") === "" ? "disabled" : "error"
                              }
                            ></Clear>
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.format}
                  helperText={errors.format?.message}
                >
                  <MenuItem sx={{ color: "lightgrey" }} value="">
                    -- Selecionar --
                  </MenuItem>
                  {DrawFormatTypes.map((item, index) => (
                    <MenuItem
                      key={index}
                      value={item.value}
                      sx={{ maxWidth: 500, whiteSpace: "normal" }}
                    >
                      <Grid>
                        <Typography>{item.label}</Typography>
                        <Typography
                          sx={{ fontSize: "0.8rem", color: "text.secondary" }}
                        >
                          {item.description}
                        </Typography>
                      </Grid>
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        </Grid>
        <Grid size={12} p={2} container>
          <FormLabel>
            Selecione o formato "Liga" para alterar o número de membros por
            grupo.
          </FormLabel>
        </Grid>
        <Grid size={12} container>
          <Grid p={2} pt={0} size={6}>
            <Controller
              name="minMembersPerGroup"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  type="number"
                  fullWidth
                  disabled={
                    watch("format") === "torneio" || watch("format") === "misto"
                  }
                  label="Número Mínimo p/ Grupo"
                  required={watch("format") === "grupos"}
                  slotProps={{
                    input: {
                      inputProps: {
                        min: 0,
                        max: 100,
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("minMembersPerGroup") === ""}
                            onClick={() => setValue("minMembersPerGroup", "")}
                            edge="end"
                          >
                            <Clear
                              color={
                                watch("minMembersPerGroup") === ""
                                  ? "disabled"
                                  : "error"
                              }
                            ></Clear>
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.minMembersPerGroup}
                  helperText={errors.minMembersPerGroup?.message}
                ></TextField>
              )}
            />
          </Grid>
          <Grid sx={{ p: 2, pt: 0 }} size={6}>
            <Controller
              name="maxMembersPerGroup"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  type="number"
                  fullWidth
                  disabled={
                    watch("format") === "torneio" || watch("format") === "misto"
                  }
                  label="Número Máximo p/ Grupo"
                  required={watch("format") === "grupos"}
                  slotProps={{
                    input: {
                      inputProps: {
                        min: 0,
                        max: 100,
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("maxMembersPerGroup") === ""}
                            onClick={() => setValue("maxMembersPerGroup", "")}
                            edge="end"
                          >
                            <Clear
                              color={
                                watch("maxMembersPerGroup") === ""
                                  ? "disabled"
                                  : "error"
                              }
                            ></Clear>
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.minMembersPerGroup}
                  helperText={errors.minMembersPerGroup?.message}
                ></TextField>
              )}
            />
          </Grid>
          <Grid size={12} p={2} container>
            <FormLabel>
              Selecione o formato "Misto" para alterar o número de
              Atletas/Equipas em cada final.
            </FormLabel>
          </Grid>
          <Grid p={2} pt={0} size={6}>
            <Controller
              name="finalsSize"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  type="number"
                  fullWidth
                  disabled={
                    watch("format") === "torneio" ||
                    watch("format") === "grupos"
                  }
                  label="Número de Atletas na final"
                  required={watch("format") === "misto"}
                  slotProps={{
                    input: {
                      inputProps: {
                        min: 0,
                        max: 100,
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("finalsSize") === ""}
                            onClick={() => setValue("finalsSize", "")}
                            edge="end"
                          >
                            <Clear
                              color={
                                watch("finalsSize") === ""
                                  ? "disabled"
                                  : "error"
                              }
                            ></Clear>
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.finalsSize}
                  helperText={errors.finalsSize?.message}
                ></TextField>
              )}
            />
          </Grid>
        </Grid>
        <Grid sx={{ p: 2 }} container size={12}>
          <Controller
            name="splitClubs"
            control={control}
            render={({ field }) => (
              <FormControl component="fieldset" variant="standard">
                <FormLabel sx={{ mb: 1 }}>
                  Selecione este campo para otimizar a separação de Membros do
                  mesmo Clube.
                </FormLabel>
                <Stack spacing={1}>
                  <FormControlLabel
                    labelPlacement="start"
                    control={
                      <Switch
                        sx={{ ml: 2 }}
                        {...field}
                        checked={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                        }}
                        name="splitClubs"
                      />
                    }
                    label="Dividir Clubes"
                    sx={{ justifyContent: "left", marginLeft: 0 }}
                  />
                  {!!errors.splitClubs && (
                    <FormHelperText error sx={{ marginLeft: "14px" }}>
                      {errors.splitClubs?.message}
                    </FormHelperText>
                  )}
                </Stack>
              </FormControl>
            )}
          />
        </Grid>
        <Grid sx={{ p: 2 }} container size={12}>
          <Controller
            name="splitFavourites"
            control={control}
            render={({ field }) => (
              <FormControl component="fieldset" variant="standard">
                <FormLabel sx={{ mb: 1 }}>
                  Selecione este campo para otimizar a separação de Membros
                  favoritos (vencedores de provas anteriores).
                </FormLabel>
                <Stack spacing={1}>
                  <FormControlLabel
                    labelPlacement="start"
                    control={
                      <Switch
                        sx={{ ml: 2 }}
                        {...field}
                        checked={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                        }}
                        name="splitFavourites"
                      />
                    }
                    label="Dividir Favoritos"
                    sx={{ justifyContent: "left", marginLeft: 0 }}
                  />
                  {!!errors.splitFavourites && (
                    <FormHelperText error sx={{ marginLeft: "14px" }}>
                      {errors.splitFavourites?.message}
                    </FormHelperText>
                  )}
                </Stack>
              </FormControl>
            )}
          />
        </Grid>
        <Grid
          container
          size={12}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <Button
            sx={{ m: 1 }}
            variant="contained"
            size="large"
            color="success"
            disabled={watch("discipline") === "" || watch("format") === ""}
            onClick={() => handleOk()}
          >
            OK
          </Button>
        </Grid>
      </FormCard>
      <FormCard title="Resumo">
        <Grid
          borderRadius={5}
          bgcolor={"#bad7ff63"}
          spacing={5}
          p={2}
          m={2}
          size={12}
          container
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          {selections.length > 0 ? (
            selections.map((s, index) => (
              <Chip
                key={index}
                label={
                  <Grid>
                    <Grid container columnSpacing={2}>
                      <Typography variant="h6">{s.disciplineName}</Typography>
                      <Typography variant="h6">→</Typography>
                      <Typography variant="h6">{s.formatLabel}</Typography>
                    </Grid>
                    <Grid mt={1}>
                      {s.minMembersPerGroup !== "" && (
                        <Grid>- Mínimo de {s.minMembersPerGroup} Atletas</Grid>
                      )}
                      {s.maxMembersPerGroup !== "" && (
                        <Grid>- Máximo de {s.maxMembersPerGroup} Atletas</Grid>
                      )}
                      {s.finalsSize !== "" && (
                        <Grid>- Máximo de {s.finalsSize} Atletas na Final</Grid>
                      )}
                      {s.splitClubs && <Grid>- Separar Clubes</Grid>}
                      {s.splitFavourites && <Grid>- Separar Favoritos</Grid>}
                    </Grid>
                  </Grid>
                }
                onDelete={() =>
                  setSelections((prev) => prev.filter((_, i) => i !== index))
                }
                color="warning"
                sx={{
                  fontSize: "1rem",
                  height: "auto",
                  py: 1,
                  "& .MuiChip-label": {
                    px: 3,
                  },
                }}
              />
            ))
          ) : (
            <Typography color="textDisabled">
              Sem Sorteios registados para gerar.
            </Typography>
          )}
        </Grid>
        <Grid sx={{ p: 2 }} container size={12}>
          <Controller
            name="notificate"
            control={control}
            render={({ field }) => (
              <FormControl component="fieldset" variant="standard">
                <FormLabel sx={{ mb: 1 }}>
                  Selecione este campo se pretende notificar todos os Clubes da
                  disponibilidade do sorteio. Pode fazê-lo mais tarde, e para
                  Clubes específicos, no{" "}
                  <Link to={"/notifications_manager/"}>
                    Gestor de Notificações
                  </Link>
                  .
                </FormLabel>
                <Stack spacing={1}>
                  <FormControlLabel
                    labelPlacement="start"
                    control={
                      <Switch
                        sx={{ ml: 2 }}
                        {...field}
                        checked={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                        }}
                        name="notificate"
                      />
                    }
                    label="Notificar Clubes"
                    sx={{ justifyContent: "left", marginLeft: 0 }}
                  />
                  {!!errors.notificate && (
                    <FormHelperText error sx={{ marginLeft: "14px" }}>
                      {errors.notificate?.message}
                    </FormHelperText>
                  )}
                </Stack>
              </FormControl>
            )}
          />
        </Grid>
        <Grid container size={12} justifyContent={"center"}>
          <Button
            sx={{ m: 1 }}
            variant="contained"
            size="large"
            disabled={selections.length === 0}
            color="secondary"
            loading={loading}
            loadingPosition="start"
            onClick={handleModalOpen}
            startIcon={<Casino />}
          >
            Gerar
          </Button>
        </Grid>
      </FormCard>
      <GenerateDrawModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        eventId={eventId!}
        willOverwrite={bracketsData?.length! > 0}
        submitFunction={handleSubmit(onSubmit)}
        loading={loading}
      ></GenerateDrawModal>
    </Grid>
  );
}
