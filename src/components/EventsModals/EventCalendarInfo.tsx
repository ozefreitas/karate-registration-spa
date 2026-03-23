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
import { EncounterOptions } from "../../config";
import EventDetailCard from "./EventDetailCard";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { stringToColor } from "../../dashboard/utils/avatarColor";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EventCalendarInfo(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    eventData?: any;
  }>,
) {
  const navigate = useNavigate();
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={props.isModalOpen}
      onClose={props.handleModalClose}
      slots={{
        transition: Transition,
      }}
    >
      <DialogTitle
        sx={{
          borderTop: `5px solid ${EncounterOptions.find((item) => item.value === props.eventData?.encounter_type)?.color}`,
          width: "100%",
        }}
      >
        <Grid
          container
          justifyContent={"space-between"}
          alignItems={"start"}
          mt={1}
        >
          <Grid>
            <Chip
              label={
                EncounterOptions.find(
                  (item) => item.value === props.eventData?.encounter_type,
                )?.label ?? "Competição/Torneio"
              }
            ></Chip>
            <Typography fontWeight={"bold"} m={2} ml={1} variant="h4">
              {props.eventData?.name}
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
        <EventDetailCard
          date={props.eventData?.event_date}
          description={props.eventData?.description}
          location={props.eventData?.location}
          type={props.eventData?.encounter_type}
          registration_state={
            props.eventData?.has_ended
              ? "Realizado"
              : props.eventData?.is_open || props.eventData?.is_retification
                ? "Inscrições em Progresso"
                : props.eventData?.is_closed
                  ? "Inscrições Encerradas"
                  : "Por Iniciar"
          }
        ></EventDetailCard>
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
          <Button
            sx={{ p: 1 }}
            size="small"
            onClick={() => navigate(`${props.eventData?.id}`)}
            variant="contained"
          >
            Mais Informações
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
