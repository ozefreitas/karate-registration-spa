import { Typography } from "@mui/material";
import {
  eventsHooks,
  membersHooks,
  disciplinesHooks,
  categoriesHooks,
  monthlyPaymentsHooks,
} from "../../hooks";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import InfoBaseModal from "../base-modals/InfoBaseModal";

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
  const [searchParams, _] = useSearchParams();

  const paramEvent = searchParams.get("event") || undefined;
  const title =
    props.from === "Atletas"
      ? "Membro(s)"
      : props.from === "Categorias"
        ? "Escalão(ões)"
        : props.from === "EventCategories"
          ? "Escalão(ões) de Evento"
          : props.from === "Individuais" || props.from === "Modalidades"
            ? "Inscrição(ões)"
            : props.from === "Treinadores"
              ? "Treinador(es)?"
              : props.from === "Equipas"
                ? "Equipa(s)?"
                : props.from === "Pagamentos"
                  ? "Pagamento?"
                  : "Plano de Pagamento?";
  const confirmationMessage =
    props.from === "Atletas"
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
                  : "Tem a certeza que pretende apagar este Plano de Pagamento?";

  const handleDelete = (id: string | Array<string> | undefined) => {
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
              if (paramEvent !== undefined) {
                navigate(`/events/${paramEvent}/teams/`);
              }
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
        removeCategory.mutate(Number(id));
      } else if (props.from === "EventCategories") {
        const data = {
          category_ids: [props.id],
        };
        removeDisciplineCategory.mutate({
          disciplineId: props.discipline,
          data: data,
        });
      } else if (props.from === "Plano") {
        removeMonthlyMenberPaymentPlan.mutate(Number(id));
      } else if (props.from === "Pagamentos") {
        removeMemberMonthlyPayment.mutate(Number(id));
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
          removeCategory.mutate(Number(categoryId));
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
    <InfoBaseModal
      isModalOpen={props.isModalOpen}
      handleModalClose={props.handleModalClose}
      title={`Apagar ${title}`}
      subheader="Esta ação não pode ser anulada."
      chipName="Confirmação"
      size="sm"
      confirmColor="error"
      onSubmit={() => handleDelete(props.id)}
    >
      <Typography variant="body2" color="inherit">
        {confirmationMessage}
      </Typography>
    </InfoBaseModal>
  );
}
