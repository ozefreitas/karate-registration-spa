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
} from "@mui/material";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Close } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InfoBaseModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    chipName?: string;
    title: string;
    children: any;
    onSubmit: any;
    size?: "sm" | "md" | "lg" | "xl";
    disableConfirm?: boolean;
  }>,
) {
  return (
    <Dialog
      fullWidth
      maxWidth={props.size ?? "md"}
      open={props.isModalOpen}
      onClose={() => {
        props.handleModalClose();
      }}
      slots={{
        transition: Transition,
      }}
    >
      <DialogTitle sx={{ borderTop: "4px solid red", width: "100%" }}>
        <Grid
          container
          justifyContent={"space-between"}
          alignItems={"start"}
          my={1}
        >
          <Grid>
            {props.chipName && <Chip label={props.chipName}></Chip>}
            <Typography fontWeight={"bold"} ml={1} variant="h5">
              {props.title}
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
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        <Stack
          direction={{
            xs: "row-reverse",
            sm: "row",
          }}
          sx={{
            p: 2,
            pt: 0,
            gap: 2,
            flexShrink: 0,
            alignSelf: { xs: "flex-end", sm: "center" },
          }}
        >
          <Button
            onClick={() => {
              props.handleModalClose();
            }}
          >
            Voltar
          </Button>
          <Button
            color="info"
            variant="contained"
            disabled={props.disableConfirm}
            onClick={() => props.onSubmit()}
          >
            Confirmar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
