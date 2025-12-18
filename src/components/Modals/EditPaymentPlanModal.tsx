import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Grid,
  TextField,
  MenuItem,
  CircularProgress,
  FormControl,
  FormLabel,
  FormControlLabel,
  Switch,
  FormHelperText,
} from "@mui/material";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Close } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { monthlyPaymentsHooks } from "../../hooks";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditPaymentPlanModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    id: string;
  }>
) {
  const { data: singlePaymentPlanData, isLoading: isSinglePaymentPlanLoading } =
    monthlyPaymentsHooks.useFetcSingleMonthlyMemberSubscriptionsData(props.id);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      amount: "",
      is_default: false,
    },
  });

  React.useEffect(() => {
    const formData = {
      name: singlePaymentPlanData?.data.name,
      is_default: singlePaymentPlanData?.data.is_default,
      amount: singlePaymentPlanData?.data.amount,
    };
    reset(formData);
  }, [singlePaymentPlanData]);

  const updatePlanData = monthlyPaymentsHooks.usePatchMonthlyPaymentPlanData();

  const onSubmit = (data: any) => {
    updatePlanData.mutate({ planId: props.id, data });
  };

  return (
    <Dialog
      open={props.isModalOpen}
      onClose={props.handleModalClose}
      maxWidth="sm"
      fullWidth
      slots={{
        transition: Transition,
      }}
    >
      <AppBar
        sx={{
          position: "relative",
          width: "99%",
          margin: "auto",
          marginTop: "8px",
          backgroundColor: "#e81c24",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleModalClose}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Editar Plano de Pagamento
          </Typography>
          <Button
            autoFocus
            size="large"
            color="inherit"
            onClick={() => {
              handleSubmit(onSubmit)();
              props.handleModalClose();
            }}
          >
            Guardar
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        {isSinglePaymentPlanLoading ? (
          <Grid container justifyContent="center" size={12}>
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container justifyContent={"center"}>
            <Grid sx={{ m: 2 }} size={12}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    variant={"outlined"}
                    label="Nome"
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
            <Grid sx={{ m: 2 }} size={12}>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    variant={"outlined"}
                    label="Novo Montante"
                    type="number"
                    fullWidth
                    slotProps={{
                      htmlInput: {
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      },
                    }}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
                  ></TextField>
                )}
              />
            </Grid>
            <Grid sx={{ m: 1 }} size={12}>
              <Controller
                name="is_default"
                control={control}
                render={({ field }) => (
                  <FormControl
                    sx={{ pb: 2, justifyContent: "center" }}
                    component="fieldset"
                    variant="standard"
                  >
                    <FormControlLabel
                      sx={{ mr: 2, justifyContent: "flex-end" }}
                      labelPlacement="start"
                      label={
                        <Typography sx={{ fontSize: 18, pr: 2 }}>
                          Tornar padrão:
                        </Typography>
                      }
                      control={
                        <Switch
                          disabled={
                            watch("is_default") &&
                            singlePaymentPlanData?.data.is_default
                          }
                          {...field}
                          checked={field.value}
                          color="warning"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                          }}
                        />
                      }
                    ></FormControlLabel>
                  </FormControl>
                )}
              />
            </Grid>
            <FormHelperText>
              Apenas poderá ter um Plano como padrão em simultâneo. Fazer este
              Plano como padrão irá remover esse estatuto do anterior.
            </FormHelperText>
          </Grid>
        )}
      </DialogContent>
      {/* <DialogActions></DialogActions> */}
    </Dialog>
  );
}
