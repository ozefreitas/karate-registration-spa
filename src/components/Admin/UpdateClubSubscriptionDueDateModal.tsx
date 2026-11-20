import { Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { clubsHooks } from "../../hooks";
import InfoBaseModal from "../base-modals/InfoBaseModal";

type FormData = {
  dueDate: string;
};

export default function UpdateClubSubscriptionDueDateModal(
  props: Readonly<{
    isOpen: boolean;
    handleClose: () => void;
    year: string;
  }>,
) {
  const patchDueDate = clubsHooks.usePatchClubSubscriptionDueDatebyYear();
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { dueDate: "" },
  });

  const closeModal = () => {
    reset();
    props.handleClose();
  };

  const onSubmit = ({ dueDate }: FormData) => {
    const year = Number(props.year);
    if (!Number.isInteger(year)) {
      setError("dueDate", { message: "Selecione primeiro um ano válido." });
      return;
    }
    if (!dueDate) {
      setError("dueDate", { message: "Selecione uma data limite." });
      return;
    }

    patchDueDate.mutate(
      { year, due_date: dueDate },
      { onSuccess: closeModal },
    );
  };

  return (
    <InfoBaseModal
      isModalOpen={props.isOpen}
      size="sm"
      handleModalClose={closeModal}
      title="Alterar data limite"
      subheader={`A nova data será aplicada às quotas de ${props.year}.`}
      onSubmit={handleSubmit(onSubmit)}
      disableConfirm={patchDueDate.isPending || !props.year}
    >
      <Grid container sx={{ py: 2 }}>
        <Grid size={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Nova data limite"
                  format="YYYY-MM-DD"
                  value={field.value ? dayjs(field.value) : null}
                  enableAccessibleFieldDOMStructure={false}
                  slots={{ textField: TextField }}
                  onChange={(date) => {
                    field.onChange(
                      date?.isValid() ? date.format("YYYY-MM-DD") : "",
                    );
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      color: "warning",
                      error: !!errors.dueDate,
                      helperText: errors.dueDate?.message,
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </InfoBaseModal>
  );
}
