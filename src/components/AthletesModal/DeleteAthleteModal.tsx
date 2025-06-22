import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useRemoveEventAthlete } from "../../hooks/useEventData";
import {
  useRemoveAthleteData,
  useRemoveAllAthletesData,
} from "../../hooks/useAthletesData";
import {
  useRemoveTeamData,
  useRemoveAllTeamsData,
} from "../../hooks/useTeamsData";
import { useLocation } from "react-router-dom";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteAthleteModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    handleModalOpen: any;
    id?: string | Array<string>;
    from: "Atletas" | "Equipas" | "Individuais";
    setSelected?: any;
  }>
) {
  const removeEventAthlete = useRemoveEventAthlete();
  // const removeAllIndividuals = useRemoveAllIndividualsData();
  const removeAthlete = useRemoveAthleteData();
  const removeAllAthletes = useRemoveAllAthletesData();
  const removeTeam = useRemoveTeamData();
  const removeAllTeams = useRemoveAllTeamsData();
  const location = useLocation();

  const handleDelete = (
    event: React.MouseEvent<HTMLElement>,
    id: string | Array<string> | undefined
  ) => {
    event.stopPropagation();
    if (id !== undefined && typeof id === "string") {
      if (props.from === "Atletas") {
        removeAthlete.mutate(id);
      } else if (props.from === "Equipas") {
        removeTeam.mutate(id);
      } else {
        const athleteData = { athlete_id: id };
        const data = {
          eventId: location.pathname.split("/")[2],
          data: athleteData,
        };
        removeEventAthlete.mutate(data);
      }
    } else if (id !== undefined && Array.isArray(id)) {
      if (props.from === "Atletas") {
        id.forEach((athleteId) => {
          removeAthlete.mutate(athleteId);
        });
      } else if (props.from === "Equipas") {
        id.forEach((athleteId) => {
          removeTeam.mutate(athleteId);
        });
      } else {
        id.forEach((athleteId) => {
          const athleteData = { athlete_id: athleteId };
          const data = {
            eventId: location.pathname.split("/")[2],
            data: athleteData,
          };
          removeEventAthlete.mutate(data);
        });
      }
      props.setSelected([]);
    } else {
      if (props.from === "Atletas") {
        removeAllAthletes.mutate();
      } else if (props.from === "Equipas") {
        removeAllTeams.mutate();
      } else {
        // removeAllIndividuals.mutate();
      }
      props.setSelected([]);
    }
    props.handleModalClose();
  };

  return (
    <Dialog
      open={props.isModalOpen}
      onClose={props.handleModalClose}
      slots={{
        transition: Transition,
      }}
    >
      <DialogTitle>
        <Typography variant="h5">
          Apagar {props.from === "Atletas" ? "Atleta" : "Inscrição"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {props.from === "Atletas"
          ? props.id !== undefined
            ? "Tem a certeza que pretende apagar este(s) Atleta(s)? Esta ação irá eliminar também todas as inscrições deste(s) Atleta(s) em todas as provas."
            : "Tem a certeza que pretende apagar todos os seus Atletas? Esta ação irá eliminar também todas as inscrições de todos os Atletas em todas as provas"
          : props.id !== undefined
          ? "Tem a certeza que pretende apagar esta(s) Inscrição(ões)?"
          : "Tem a certeza que pretende apagar todas as Inscrições?"}
      </DialogContent>
      <DialogActions>
        <Stack
          direction={{
            xs: "row-reverse",
            sm: "row",
          }}
          sx={{
            p: 2,
            gap: 4,
            flexShrink: 0,
            alignSelf: { xs: "flex-end", sm: "center" },
          }}
        >
          <Button
            size="small"
            onClick={(e) => handleDelete(e, props.id)}
            variant="contained"
          >
            Confirmar
          </Button>
          <Button size="small" onClick={props.handleModalClose}>
            Cancelar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
