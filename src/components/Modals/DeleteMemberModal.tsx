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
  monthlyPaymentsHooks,
  teamsHooks,
} from "../../hooks";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteMemberModal(
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
      | "EventCategories"
      | "Treinadores"
      | "Pagamentos"
      | "PagamentosAnuais"
      | "Plano";
    setSelected?: any;
    discipline?: any;
  }>,
) {
  const removeDisciplineMember = disciplinesHooks.useDeleteDisciplineMember();
  const removeEventMember = eventsHooks.useRemoveEventMember();
  const removeMember = membersHooks.useDeleteMemberData();
  const removeAllMembers = membersHooks.useDeleteAllMemberData();
  const removeDisciplineTeam = disciplinesHooks.useDeleteDisciplineTeam();
  const removeAllTeams = disciplinesHooks.useRemoveAllDisciplineTeams();
  const removeCategory = categoriesHooks.useDeleteCategory();
  const removeAllCategories = categoriesHooks.useDeleteAllCategoriesData();
  const removeDisciplineCategory =
    disciplinesHooks.useRemoveDisciplineCategory();
  const removeAllDisciplineMembers =
    disciplinesHooks.useDeleteAllDisciplineMember();
  const removeMonthlyMenberPaymentPlan =
    monthlyPaymentsHooks.useDeleteMonthlyPaymentPlanData();
  const removeMemberMonthlyPayment =
    monthlyPaymentsHooks.useDeleteMonthlyMemberSubscription();
  const navigate = useNavigate();
  const { id: eventId } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const paramEvent = searchParams.get("event") || undefined;

  const handleDelete = (
    event: React.MouseEvent<HTMLElement>,
    id: string | Array<string> | undefined,
  ) => {
    event.stopPropagation();
    if (id !== undefined && typeof id === "string") {
      if (props.from === "Atletas") {
        removeMember.mutate(id, {
          onSuccess: () => {
            navigate("/members/");
          },
        });
      } else if (props.from === "Equipas") {
        removeDisciplineTeam.mutate(
          {
            disciplineId: props.discipline,
            data: { team_id: props.id },
          },
          {
            onSuccess: () => {
              navigate(`/events/${paramEvent}/teams/`);
            },
          },
        );
      } else if (props.from === "Individuais") {
        const memberData = { member_id: id };
        const data = {
          eventId: eventId!,
          data: memberData,
        };
        removeEventMember.mutate(data);
      } else if (props.from === "Categorias") {
        removeCategory.mutate(id);
      } else if (props.from === "EventCategories") {
        const data = {
          category_ids: [props.id],
        };
        removeDisciplineCategory.mutate({
          disciplineId: props.discipline,
          data: data,
        });
      } else if (props.from === "Plano") {
        removeMonthlyMenberPaymentPlan.mutate(id);
      } else if (props.from === "Pagamentos") {
        removeMemberMonthlyPayment.mutate(id);
      } else {
        const data = {
          disciplineId: props.discipline,
          data: { member_id: props.id },
        };
        removeDisciplineMember.mutate(data);
      }
    } else if (id !== undefined && Array.isArray(id)) {
      if (props.from === "Atletas") {
        id.forEach((memberId) => {
          removeMember.mutate(memberId);
        });
      } else if (props.from === "Equipas") {
        id.forEach((teamId) => {
          removeDisciplineTeam.mutate({
            disciplineId: props.discipline,
            data: { team_id: teamId },
          });
        });
      } else if (props.from === "Individuais") {
        id.forEach((memberId) => {
          const memberData = { member_id: memberId };
          const data = {
            eventId: eventId!,
            data: memberData,
          };
          removeEventMember.mutate(data);
        });
      } else if (props.from === "Categorias") {
        id.forEach((categoryId) => {
          removeCategory.mutate(categoryId);
        });
      } else {
        id.forEach((memberId) => {
          const data = {
            disciplineId: props.discipline,
            data: { member_id: memberId },
          };
          removeDisciplineMember.mutate(data);
        });
      }
      props.setSelected([]);
    } else {
      if (props.from === "Atletas") {
        removeAllMembers.mutate();
      } else if (props.from === "Equipas") {
        removeAllTeams.mutate({ disciplineId: props.discipline });
      } else if (props.from === "Categorias") {
        removeAllCategories.mutate();
      } else {
        removeAllDisciplineMembers.mutate({ disciplineId: props.discipline });
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
      <DialogTitle sx={{ p: 3 }}>
        <Typography variant="h5">
          Apagar {props.from === "Atletas" ? "Atleta" : "Inscrição"}
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          borderBottom: "1px solid lightgrey",
          borderTop: "1px solid lightgrey",
        }}
      >
        <p>
          {props.from === "Atletas"
            ? props.id === undefined
              ? "Tem a certeza que pretende apagar todos os seus Membros? Esta ação irá eliminar também todas as inscrições de todos os Membros em todas as provas"
              : "Tem a certeza que pretende apagar este(s) Membro(s)? Esta ação irá eliminar também todas as inscrições deste(s) Membro(s) em todas as provas."
            : props.from === "Categorias"
              ? props.id === undefined
                ? "Tem a certeza que pretende apagar todos os Escalões?"
                : "Tem a certeza que pretende apagar este(s) Escalão(ões)?"
              : props.from === "EventCategories"
                ? props.id === undefined
                  ? "Tem a certeza que pretende apagar todos os Escalões deste Evento?"
                  : "Tem a certeza que pretende remover este(s) Escalão(ões) deste Evento?"
                : props.from === "Individuais" || props.from === "Modalidades"
                  ? props.id === undefined
                    ? "Tem a certeza que pretende apagar todas as Inscrições?"
                    : "Tem a certeza que pretende apagar esta(s) Inscrição(ões)?"
                  : props.from === "Treinadores"
                    ? props.id === undefined
                      ? "Tem a certeza que pretende apagar as Inscrições de todos os Treinadores?"
                      : "Tem a certeza que pretende apagar a Inscrição deste(s) Treinador(es)?"
                    : props.from === "Equipas"
                      ? props.id === undefined
                        ? "Tem a certeza que pretende apagar todas as Equipas?"
                        : "Tem a certeza que pretende apagar esta(s) Equipa(s)?"
                      : props.from === "Pagamentos"
                        ? "Tem a certeza que pretende apagar este Pagamento?"
                        : "Tem a certeza que pretende apagar este Plano de Pagamento?"}
        </p>
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
