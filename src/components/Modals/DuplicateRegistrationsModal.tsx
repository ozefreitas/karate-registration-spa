import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Stack,
  Grid,
  TextField,
  MenuItem,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { eventsHooks, disciplinesHooks } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function (
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    disciplineData: any;
    eventName: string;
  }>
) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { data: eventsData, isLoading: isEventsLoading } =
    eventsHooks.useFetchEventsData(
      1,
      110,
      undefined,
      undefined,
      false,
      undefined,
      undefined,
      true,
      undefined,
      undefined
    );

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      eventId: "",
      disciplineId: "",
    },
  });

  const requiredInfo = watch("disciplineId") !== "" && watch("eventId") !== "";

  const { data: disciplinesData, isLoading: isDisciplineLoading } =
    disciplinesHooks.useFetchDisciplinesData(watch("eventId"), false, false);

  const addDisciplineMember = disciplinesHooks.useAddDisciplineMember();

  const onSubmit = (data: any) => {
    disciplinesData?.data.results
      .find((item: any) => item.id === data.disciplineId)
      ?.individuals.forEach((memberInfo: any) => {
        const payload = {
          disciplineId: data.disciplineId,
          data: {
            member_id: memberInfo.member.id,
            event_id: data.eventId,
          },
        };
        addDisciplineMember.mutateAsync(payload, {
          onSuccess: (data: any) => {
            navigate(`/events/${data.eventId}`);
          },
        });
      });
  };

  return (
    <Dialog
      open={props.isModalOpen}
      onClose={() => {
        reset();
        props.handleModalClose();
      }}
      slots={{
        transition: Transition,
      }}
      fullWidth
    >
      <DialogTitle>
        <Typography p={1} variant="h5">
          Copiar Inscrições
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        <Grid sx={{ p: 2 }} size={6}>
          <Controller
            name="eventId"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Evento Alvo"
                type="text"
                fullWidth
                select
                required
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.eventId}
                helperText={errors.eventId?.message}
              >
                <MenuItem sx={{ color: "lightgrey" }} value="">
                  -- Selecionar --
                </MenuItem>
                {isEventsLoading ? (
                  <Grid container justifyContent="center" mt={1} size={12}>
                    <CircularProgress />
                  </Grid>
                ) : (
                  eventsData?.data.results.map((item: any, index: any) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name} {item.season}
                    </MenuItem>
                  ))
                )}
              </TextField>
            )}
          />
        </Grid>
        <Grid sx={{ p: 2 }} size={6}>
          <Controller
            name="disciplineId"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Modalidade Alvo"
                type="text"
                fullWidth
                select
                required
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.eventId}
                helperText={errors.eventId?.message}
              >
                <MenuItem sx={{ color: "lightgrey" }} value="">
                  -- Selecionar --
                </MenuItem>
                {isDisciplineLoading ? (
                  <Grid container justifyContent="center" mt={1} size={12}>
                    <CircularProgress />
                  </Grid>
                ) : (
                  disciplinesData?.data.results.map((item: any, index: any) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))
                )}
              </TextField>
            )}
          />
        </Grid>
        {requiredInfo ? (
          <Grid p={2} pb={0}>
            <Typography>
              Esta ação irá <strong>duplicar todas as inscrições</strong> da
              modalidade <strong>{props.disciplineData.name}</strong> do evento{" "}
              <strong>{props.eventName}</strong> para a modalidade{" "}
              <strong>
                {
                  disciplinesData?.data.results.find(
                    (item: any) => item.id === watch("disciplineId")
                  )?.name
                }
              </strong>{" "}
              do evento{" "}
              <strong>
                {
                  eventsData?.data.results.find(
                    (item: any) => item.id === watch("eventId")
                  )?.name
                }
              </strong>
              .
            </Typography>

            <Typography mt={2} variant="h6">
              <strong>Deseja continuar?</strong>
            </Typography>
            <FormHelperText>
              O escalão será calculado automaticamente de acordo com os Escalões
              disponíveis para cada uma destas Modalidades. <br />
              Também a graduação e pesos (quando obrigatórios) serão
              verificados.
            </FormHelperText>
          </Grid>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Stack
          direction={{
            xs: "row-reverse",
            sm: "row",
          }}
          sx={{
            p: 2,
            gap: 2,
            flexShrink: 0,
            alignSelf: { xs: "flex-end", sm: "center" },
          }}
        >
          <Button
            size="small"
            onClick={() => {
              handleSubmit(onSubmit)();
            }}
            variant="contained"
            disabled={!requiredInfo}
          >
            Confirmar
          </Button>
          <Button size="small" onClick={props.handleModalClose}>
            Cancelar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
