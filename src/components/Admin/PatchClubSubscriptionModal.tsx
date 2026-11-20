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
import { clubsHooks } from "../../hooks";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PatchClubSubscriptionModal(
  props: Readonly<{
    isOpen: boolean;
    handleClose: () => void;
    currentState: boolean;
    id: any;
    username: string;
  }>,
) {
  const patchClubSubscription = clubsHooks.usePatchClubSubscriptionData();
  const nextState = !props.currentState;

  const handleSubmit = () => {
    patchClubSubscription.mutate(
      {
        clubId: props.id,
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
          Confirme a atualização do pagamento do clube.
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
              Clube
            </Typography>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ overflowWrap: "anywhere" }}
            >
              {props.username}
            </Typography>
          </Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="stretch"
            spacing={1.5}
          >
            <StatusPanel paid={props.currentState} label="Estado atual" />
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
            disabled={patchClubSubscription.isPending}
          >
            Confirmar
          </Button>
          <Button
            onClick={props.handleClose}
            disabled={patchClubSubscription.isPending}
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
