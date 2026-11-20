import {
  ArrowForward,
  CheckCircleOutline,
  ErrorOutline,
  InfoOutlined,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { monthlyPaymentsHooks } from "../../hooks";

type Payment = Readonly<{
  id: string | number;
  month: string;
  year: number | string;
  paid: boolean;
}>;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PatchMemberSubscriptionModal(
  props: Readonly<{
    isOpen: boolean;
    handleClose: () => void;
    paymentObj: Payment;
  }>,
) {
  const patchMemberSubscription =
    monthlyPaymentsHooks.usePatchMonthlyMemberSubscriptionData();
  const nextState = !props.paymentObj.paid;

  const handleSubmit = () => {
    patchMemberSubscription.mutate(
      {
        monthlySubscriptionId: String(props.paymentObj.id),
        data: { paid: nextState },
      },
      { onSuccess: props.handleClose },
    );
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.handleClose}
      fullWidth
      maxWidth="sm"
      slots={{ transition: Transition }}
    >
      <DialogTitle
        sx={{
          p: { xs: 2, sm: 3 },
          borderTop: "4px solid",
          borderColor: "error.main",
          width: "100%",
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Alteração de estado
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Confirme a atualização do pagamento mensal deste membro.
        </Typography>
      </DialogTitle>
      <DialogContent dividers sx={{ px: { xs: 2, sm: 3 }, py: 2.5 }}>
        <Stack spacing={2.5}>
          <Box>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ lineHeight: 1.5 }}
            >
              Período do pagamento
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              {props.paymentObj.month} de {props.paymentObj.year}
            </Typography>
          </Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="stretch"
            spacing={1.5}
          >
            <StatusPanel paid={props.paymentObj.paid} label="Estado atual" />
            <Box
              sx={{
                display: "grid",
                placeItems: "center",
                color: "text.secondary",
                transform: { xs: "rotate(90deg)", sm: "none" },
              }}
            >
              <ArrowForward />
            </Box>
            <StatusPanel paid={nextState} label="Novo estado" />
          </Stack>
          <Alert severity="info" icon={<InfoOutlined />}>
            Poderá alterar o estado novamente mais tarde.
          </Alert>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Stack
          direction={{ xs: "row-reverse", sm: "row" }}
          spacing={1.5}
          sx={{ width: "100%", justifyContent: "flex-end" }}
        >
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={patchMemberSubscription.isPending}
          >
            Confirmar
          </Button>
          <Button
            onClick={props.handleClose}
            disabled={patchMemberSubscription.isPending}
          >
            Cancelar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

function StatusPanel({
  paid,
  label,
}: Readonly<{ paid: boolean; label: string }>) {
  const StatusIcon = paid ? CheckCircleOutline : ErrorOutline;
  const statusLabel = paid ? "Pago" : "Em falta";

  return (
    <Box
      sx={(theme) => {
        const statusColor = paid ? theme.palette.success : theme.palette.error;

        return {
          flex: 1,
          minWidth: 0,
          p: 2,
          border: "1px solid",
          borderColor: alpha(statusColor.main, 0.35),
          borderRadius: 2,
          bgcolor: alpha(
            statusColor.main,
            theme.palette.mode === "dark" ? 0.16 : 0.07,
          ),
        };
      }}
    >
      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        sx={{ mb: 1 }}
      >
        {label}
      </Typography>
      <Chip
        size="small"
        icon={<StatusIcon />}
        label={statusLabel}
        color={paid ? "success" : "error"}
        variant="outlined"
      />
    </Box>
  );
}
