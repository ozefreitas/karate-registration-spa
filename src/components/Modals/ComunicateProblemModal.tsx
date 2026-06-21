import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Stack,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Clear, Close } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { adminHooks } from "../../hooks";
import { FeedbackOptions } from "../../config";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
    <Dialog
      fullWidth
      maxWidth="md"
      open={props.isModalOpen}
      onClose={() => {
        props.handleModalClose();
      }}
      slots={{
        transition: Transition,
      }}
    >
      <DialogTitle sx={{ borderTop: "red", width: "100%" }}>
        <Grid
          container
          justifyContent={"space-between"}
          alignItems={"start"}
          mt={1}
        >
          <Grid>
            <Chip
              label={
                FeedbackOptions.find((item) => item.value === props.location)
                  ?.label
              }
            ></Chip>
            <Typography fontWeight={"bold"} m={2} ml={1} variant="h4">
              Comunicar Problema
            </Typography>
          </Grid>
          <IconButton
            onClick={props.handleModalClose}
            sx={{ bgcolor: "#f0f0f0", "&:hover": { bgcolor: "#e0e0e0" } }}
          >
            <Close />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent>
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
                                watch("description") === ""
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
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </Grid>
        </Grid>
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
            sx={{ p: 1 }}
            size="small"
            onClick={() => {
              props.handleModalClose();
            }}
          >
            Voltar
          </Button>
          <Button
            sx={{ px: 2 }}
            size="small"
            color="info"
            variant="contained"
            onClick={() => handleSubmit(onSubmit)()}
          >
            Confirmar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
