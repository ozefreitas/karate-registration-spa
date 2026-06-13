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

export default function ComunicateProblemModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    chipName?: string;
    title: string;
    children: any;
    onSubmit: any;
  }>,
) {
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
            {props.chipName && <Chip label={props.chipName}></Chip>}
            <Typography fontWeight={"bold"} m={2} ml={1} variant="h4">
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
            onClick={() => props.onSubmit()}
          >
            Confirmar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
