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
  Box,
} from "@mui/material";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { EncounterOptions } from "../../config";
import EventDetailCard from "../EventsModals/EventDetailCard";
import { Close } from "@mui/icons-material";
import MatchDetailCard from "./MatchDetailCard";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MatchInfoModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    matchData?: any;
  }>,
) {
  console.log(props.matchData);
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={props.isModalOpen}
      onClose={props.handleModalClose}
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
            <Chip label="Quartos-Final"></Chip>
            <Typography fontWeight={"bold"} m={2} ml={1} variant="h4">
              {props.matchData?.name}
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
        <Grid container columnSpacing={5} rowSpacing={2} size={12}>
          <Grid size={6}>
            <MatchDetailCard
              color="Shiro"
              type="Kata"
              contenderInfo={props.matchData?.contender_1}
            ></MatchDetailCard>
          </Grid>
          <Grid size={6}>
            <MatchDetailCard
              color="Aka"
              type="Kata"
              contenderInfo={props.matchData?.contender_2}
              reverse
            ></MatchDetailCard>
          </Grid>
          {props.matchData?.winner === null ? null : (
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              width={"100%"}
              p={2.5}
              borderRadius={3}
              bgcolor={"#fffff5"}
              border={"1px solid #ffcdd2"}
              gap={2}
            >
              <Typography variant="h6" sx={{ color: "#555", lineHeight: 1.7 }}>
                Vencedor:
              </Typography>
              <Typography variant="h5" fontWeight={"bold"} sx={{ color: "#555" }}>
                {props.matchData?.winner.full_name}
              </Typography>
            </Grid>
          )}
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
            gap: 3,
            flexShrink: 0,
            alignSelf: { xs: "flex-end", sm: "center" },
          }}
        >
          <Button sx={{ p: 1 }} size="small" onClick={props.handleModalClose}>
            Voltar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
