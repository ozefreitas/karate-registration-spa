import { CircularProgress, Grid, MenuItem, TextField } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { GraduationsOptions, GenderOptions } from "../../config";
import { membersHooks } from "../../hooks";
import InfoBaseModal from "../base-modals/InfoBaseModal";

export default function EditMemberModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: () => void;
    id: string;
  }>,
) {
  const { data: singleMemberData, isLoading: isSingleMemberLoading } =
    membersHooks.useFetchSingleMemberData(props.id);

  const {
    control: memberControl,
    handleSubmit: memberHandleSubmit,
    reset: memberReset,
    formState: { errors: memberErrors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      graduation: "",
      category: "",
      id_number: null,
      gender: "",
      is_student: false,
      birthDate: "",
    },
  });

  useEffect(() => {
    memberReset({
      firstName: singleMemberData?.first_name ?? "",
      lastName: singleMemberData?.last_name ?? "",
      graduation: singleMemberData?.graduation ?? "",
      gender: singleMemberData?.gender ?? "",
      birthDate: singleMemberData?.birth_date ?? "",
    });
  }, [singleMemberData, memberReset]);

  const updateMemberData = membersHooks.useUpdateMemberData();

  const onSubmit = (data: any) => {
    const formData = {
      first_name: data?.firstName,
      last_name: data?.lastName,
      graduation: data?.graduation,
      gender: data?.gender,
      id_number: data?.id_number,
      birth_date: data?.birthDate ?? null,
    };

    updateMemberData.mutate(
      { memberId: props.id, data: formData },
      { onSuccess: props.handleModalClose },
    );
  };

  return (
    <InfoBaseModal
      isModalOpen={props.isModalOpen}
      handleModalClose={props.handleModalClose}
      chipName="Dados do atleta"
      title="Editar Atleta"
      subheader="Atualize os dados principais deste membro."
      size="sm"
      onSubmit={memberHandleSubmit(onSubmit)}
      disableConfirm={isSingleMemberLoading || updateMemberData.isPending}
    >
      <Grid container spacing={2} sx={{ py: 2 }}>
        {isSingleMemberLoading ? (
          <Grid
            size={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: 180 }}
          >
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="firstName"
                control={memberControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    color="warning"
                    variant="outlined"
                    label="Primeiro Nome"
                    fullWidth
                    error={!!memberErrors.firstName}
                    helperText={memberErrors.firstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="lastName"
                control={memberControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    color="warning"
                    variant="outlined"
                    label="Último Nome"
                    fullWidth
                    error={!!memberErrors.lastName}
                    helperText={memberErrors.lastName?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="graduation"
                control={memberControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    color="warning"
                    variant="outlined"
                    label="Graduação"
                    select
                    fullWidth
                    required
                    error={!!memberErrors.graduation}
                    helperText={memberErrors.graduation?.message}
                  >
                    {GraduationsOptions.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="gender"
                control={memberControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    color="warning"
                    variant="outlined"
                    label="Género"
                    select
                    fullWidth
                    required
                    error={!!memberErrors.gender}
                    helperText={memberErrors.gender?.message}
                  >
                    {GenderOptions.filter((item) =>
                      ["Masculino", "Feminino"].includes(item.label),
                    ).map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
          </>
        )}
      </Grid>
    </InfoBaseModal>
  );
}
