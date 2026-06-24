import {
  Typography,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { adminHooks } from "../../hooks";
import { FeedbackOptions } from "../../config";
import InfoBaseModal from "../base-modals/InfoBaseModal";

export default function ComunicateProblemModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    location: string;
  }>,
) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: "",
    },
  });

  const createFeedback = adminHooks.useCreateFeedback();

  const onSubmit = (data: any) => {
    const payload = {
      feedback: data.description,
      feedback_type: props.location,
    };

    createFeedback.mutate(
      { data: payload },
      { onSuccess: () => props.handleModalClose() },
    );
  };

  return (
    <InfoBaseModal
      isModalOpen={props.isModalOpen}
      handleModalClose={() => {
        props.handleModalClose();
      }}
      title="Adicionar Clube"
      onSubmit={handleSubmit(onSubmit)}
      size="sm"
      chipName={
        FeedbackOptions.find((item) => item.value === props.location)?.label
      }
    >
      <Grid container size={12} m={2}>
        <Typography variant="body1">
          Descreva o problema encontrado. O seu administrador entrará em
          contacto assim que possível.
        </Typography>
        <Grid pt={3} size={12}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Descrição"
                fullWidth
                multiline
                rows={4}
                maxRows={8}
                {...field}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          disabled={watch("description") === ""}
                          onClick={() => setValue("description", "")}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          <Clear
                            color={
                              watch("description") === "" ? "disabled" : "error"
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
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </InfoBaseModal>
  );
}
