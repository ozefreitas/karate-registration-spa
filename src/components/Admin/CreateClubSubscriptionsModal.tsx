import { Grid, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import InfoBaseModal from "../base-modals/InfoBaseModal";
import { clubsHooks } from "../../hooks";

type FormData = {
  year: number | "";
};

export default function CreateClubSubscriptionsModal(
  props: Readonly<{
    isOpen: boolean;
    handleClose: () => void;
    availableYears: number[];
  }>,
) {
  const createSubscriptions =
    clubsHooks.useCreateClubSubscriptionsForAllUsers();
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { year: "" },
  });

  const closeModal = () => {
    reset();
    props.handleClose();
  };

  const onSubmit = ({ year }: FormData) => {
    if (year === "" || !Number.isInteger(year)) {
      setError("year", { message: "Selecione um ano válido." });
      return;
    }
    if (year < new Date().getFullYear()) {
      setError("year", {
        message: "Não pode criar quotas para um ano anterior ao atual.",
      });
      return;
    }
    if (props.availableYears.includes(year)) {
      setError("year", {
        message: "Já existem quotas criadas para este ano.",
      });
      return;
    }

    createSubscriptions.mutate(
      { year },
      {
        onSuccess: closeModal,
      },
    );
  };

  return (
    <InfoBaseModal
      size="sm"
      isModalOpen={props.isOpen}
      handleModalClose={closeModal}
      title="Criar quotas anuais"
      subheader="As quotas e notificações serão criadas para todos os clubes associados."
      onSubmit={handleSubmit(onSubmit)}
      disableConfirm={createSubscriptions.isPending}
    >
      <Grid container spacing={2} sx={{ py: 2 }}>
        <Grid size={12}>
          <Typography color="text.secondary">
            Indique o ano de início da época para a qual pretende criar as
            quotas.
          </Typography>
        </Grid>
        <Grid size={12}>
          <Controller
            name="year"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Ano"
                type="number"
                color="warning"
                fullWidth
                required
                slotProps={{
                  htmlInput: {
                    inputMode: "numeric",
                    min: new Date().getFullYear(),
                    step: 1,
                  },
                }}
                onChange={(event) => {
                  field.onChange(
                    event.target.value === "" ? "" : Number(event.target.value),
                  );
                }}
                error={!!errors.year}
                helperText={errors.year?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </InfoBaseModal>
  );
}
