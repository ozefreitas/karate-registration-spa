import { Typography, Grid, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { clubsHooks } from "../../hooks";
import InfoBaseModal from "../base-modals/InfoBaseModal";

export default function AddClubModal(
  props: Readonly<{ isOpen: boolean; handleClose: any }>,
) {
  const createClub = clubsHooks.useCreateClub();

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: any) => {
    if (data.name === "") {
      setError("name", { message: "Este campo é obrigatório" });
    } else {
      const formData = { name: data.name };
      createClub.mutate(formData);
    }
  };

  return (
    <InfoBaseModal
      isModalOpen={props.isOpen}
      handleModalClose={() => {
        props.handleClose();
        reset();
      }}
      title="Adicionar Clube"
      onSubmit={handleSubmit(onSubmit)}
      size="sm"
    >
      <Grid container justifyContent={"center"}>
        <Typography px={2} variant="body1">
          Insira o nome do Clube que pretende adicionar à sua tutela. Este nome
          será o username que o Clube irá usar para fazer Login na sua conta.
        </Typography>
        <Grid mt={3} size={6}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Nome"
                required
                fullWidth
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </InfoBaseModal>
  );
}
