import {
  Button,
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
} from "@mui/material";
import FormCard from "../../dashboard/FormCard";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { DrawFormatTypes } from "../../config";
import { Casino, Clear } from "@mui/icons-material";
import { drawsHooks, eventsHooks } from "../../hooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import GenerateDrawModal from "../../components/Modals/GenerateDrawModal";

export default function GenerateDrawPage() {
  const { id: eventId } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      splitClubs: false,
      splitFavourites: false,
      format: "",
      maxMembersPerGroup: "",
      minMembersPerGroup: "",
      notificate: false,
    },
  });

  const { data: bracketsData } = drawsHooks.useBracketsData(eventId!);

  const generateDrawMutation = eventsHooks.useGenerateDraw();

  const onSubmit = (data: any) => {
    const payload = { eventId: eventId!, data: data };
    generateDrawMutation.mutate(payload, {
      onSuccess: () => navigate(`/events/${eventId!}/draw/`),
    });
  };

  return (
    <>
      <FormCard title="Configurar Sorteio">
        <Grid sx={{ p: 2 }} size={6}>
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
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid size={12} p={2} container>
          <FormLabel>
            Selecione o formato "Liga" para alterar o número de membros por
            grupo.
          </FormLabel>
        </Grid>
        <Grid size={12} container>
          <Grid sx={{ p: 2, pt: 0 }} size={6}>
            <Controller
              name="minMembersPerGroup"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  type="number"
                  fullWidth
                  disabled={watch("format") !== "groups"}
                  label="Número Mínimo p/ Grupo"
                  required
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
                  disabled={watch("format") !== "groups"}
                  label="Número Máximo p/ Grupo"
                  required
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
            disabled={watch("format") === ""}
            color="secondary"
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
      ></GenerateDrawModal>
    </>
  );
}
