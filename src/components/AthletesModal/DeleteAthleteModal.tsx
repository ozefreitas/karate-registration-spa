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
import {
  eventsHooks,
  membersHooks,
  disciplinesHooks,
  categoriesHooks,
} from "../../hooks";
import {
  useRemoveTeamData,
  useRemoveAllTeamsData,
} from "../../hooks/useTeamsData";
import { useNavigate, useParams } from "react-router-dom";

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
    from:
      | "Atletas"
      | "Equipas"
      | "Individuais"
      | "Modalidades"
      | "Categorias"
      | "CategoriasReadOnly"
      | "EventCategories";
    setSelected?: any;
    discipline?: any;
  }>
) {
  const removeDisciplineAthlete = disciplinesHooks.useDeleteDisciplineAthlete();
  const removeEventAthlete = eventsHooks.useRemoveEventAthlete();
  const removeAthlete = membersHooks.useDeleteAthleteData();
  const removeAllAthletes = membersHooks.useDeleteAllAthleteData();
  const removeTeam = useRemoveTeamData();
  const removeAllTeams = useRemoveAllTeamsData();
  const removeCategory = categoriesHooks.useDeleteCategory();
  const removeAllCategories = categoriesHooks.useDeleteAllCategoriesData();
  const removeDisciplineCategory =
    disciplinesHooks.useRemoveDisciplineCategory();
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();

  const handleDelete = (
    event: React.MouseEvent<HTMLElement>,
    id: string | Array<string> | undefined
  ) => {
    event.stopPropagation();
    if (id !== undefined && typeof id === "string") {
      if (props.from === "Atletas") {
        removeAthlete.mutate(id, {
          onSuccess: () => {
            navigate("/athletes/");
          },
        });
      } else if (props.from === "Equipas") {
        removeTeam.mutate(id, {
          onSuccess: () => {
            navigate("/teams/");
          },
        });
      } else if (props.from === "Individuais") {
        const athleteData = { athlete_id: id };
        const data = {
          eventId: eventId!,
          data: athleteData,
        };
        removeEventAthlete.mutate(data);
      } else if (props.from === "Categorias") {
        removeCategory.mutate(id);
      } else if (props.from === "EventCategories") {
        const data = {
          category_id: props.id,
        };
        removeDisciplineCategory.mutate({
          disciplineId: props.discipline,
          data: data,
        });
      } else {
        const data = {
          disciplineId: props.discipline,
          data: { athlete_id: props.id },
        };
        removeDisciplineAthlete.mutate(data);
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
      } else if (props.from === "Individuais") {
        id.forEach((athleteId) => {
          const athleteData = { athlete_id: athleteId };
          const data = {
            eventId: eventId!,
            data: athleteData,
          };
          removeEventAthlete.mutate(data);
        });
      } else if (props.from === "Categorias") {
        id.forEach((categoryId) => {
          removeCategory.mutate(categoryId);
        });
      } else {
        id.forEach((athleteId) => {
          const data = {
            disciplineId: props.discipline,
            data: { athlete_id: athleteId },
          };
          removeDisciplineAthlete.mutate(data);
        });
      }
      props.setSelected([]);
    } else {
      if (props.from === "Atletas") {
        removeAllAthletes.mutate();
      } else if (props.from === "Equipas") {
        removeAllTeams.mutate();
      } else if (props.from === "Categorias") {
        removeAllCategories.mutate();
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
          : props.from === "Categorias"
          ? props.id !== undefined
            ? "Tem a certeza que pretende apagar este(s) Escalão(ões)?"
            : "Tem a certeza que pretende apagar todos os Escalões?"
          : props.from === "EventCategories"
          ? props.id !== undefined
            ? "Tem a certeza que pretende remover este(s) Escalão(ões) deste Evento?"
            : "Tem a certeza que pretende apagar todos os Escalões deste Evento?"
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
