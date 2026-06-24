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
import { useNavigate, useParams } from "react-router-dom";
// import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DuplicateRegistrationsModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    disciplineData: any;
    eventName: string;
  }>,
) {
  const navigate = useNavigate();
  const { id: eventId } = useParams<{ id: string }>();

  const { data: eventsData, isLoading: isEventsLoading } =
    eventsHooks.useFetchEventsData(
      1,
      110,
      undefined,
      undefined,
      false,
      undefined,
      undefined,
      undefined,
      undefined,
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

  const onSubmit = async (formData: any) => {
    const requests =
      props.disciplineData?.individuals.map((personInfo: any) => {
        const payload = {
          disciplineId: formData.disciplineId,
          data: {
            member_id: personInfo.person.id,
            event_id: formData.eventId,
          },
        };
        return addDisciplineMember.mutateAsync(payload);
      }) ?? [];

    try {
      const results = await Promise.all(requests);
      const shouldNavigate = results.every(
        (result) => result.status !== "info",
      );
      if (shouldNavigate) {
        navigate(`/events/${formData.eventId}`);
      }
    } catch (error) {
      console.error("Failed to add one or more members:", error);
    }
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
      <DialogTitle sx={{ p: 3 }}>
        <Typography variant="h5">Copiar Inscrições</Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          borderBottom: "1px solid lightgrey",
          borderTop: "1px solid lightgrey",
        }}
      >
        <Grid p={2} mt={2} size={6}>
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
                {isEventsLoading ? (
                  <Grid container justifyContent="center" mt={1} size={12}>
                    <CircularProgress />
                  </Grid>
                ) : (
                  <>
                    {eventsData?.count === 0 ? (
                      <MenuItem disabled>Sem opções disponíveis.</MenuItem>
                    ) : (
                      <MenuItem sx={{ color: "lightgrey" }} value="">
                        -- Selecionar --
                      </MenuItem>
                    )}

                    {eventsData?.results
                      ?.filter((item) => item.id !== eventId)
                      .map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.name} {item.season}
                        </MenuItem>
                      ))}
                  </>
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
                disabled={watch("eventId") === ""}
                required
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.eventId}
                helperText={errors.eventId?.message}
              >
                {isDisciplineLoading ? (
                  <Grid container justifyContent="center" mt={1} size={12}>
                    <CircularProgress />
                  </Grid>
                ) : (
                  <>
                    {disciplinesData?.count === 0 ? (
                      <MenuItem disabled>Sem opções disponíveis.</MenuItem>
                    ) : (
                      <MenuItem sx={{ color: "lightgrey" }} value="">
                        -- Selecionar --
                      </MenuItem>
                    )}
                    {disciplinesData?.results.map((item, index: any) => (
                      <MenuItem key={index} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </>
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
                  disciplinesData?.results.find(
                    (item: any) => item.id === watch("disciplineId"),
                  )?.name
                }
              </strong>{" "}
              do evento{" "}
              <strong>
                {
                  eventsData?.results.find(
                    (item: any) => item.id === watch("eventId"),
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
            p: 1,
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
