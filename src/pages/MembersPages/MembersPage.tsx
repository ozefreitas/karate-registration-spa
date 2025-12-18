import { useState, useMemo } from "react";
import {
  Grid,
  Box,
  CircularProgress,
  ListItem,
  ListItemText,
} from "@mui/material";
import AllUseTable from "../../components/Table/AllUseTable";
import AddButton from "../../components/Buttons/AddButton";
import { membersHooks } from "../../hooks";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import { MemberTypes } from "../../config";
import MemberFilters from "../../components/filter_drawers/MemberFilters";
import MemberOrdering from "../../components/filter_drawers/MemberOrdering";
import { useForm } from "react-hook-form";
import { VerifiedUser, AccountCircle } from "@mui/icons-material";

export default function MembersPage(props: Readonly<{ userRole: string }>) {
  type Club = {
    id: string;
    username: string;
    role: string;
  };

  type Member = {
    id: string;
    full_name: string;
    gender: string;
    club: Club;
    age: string;
    member_type: string;
    can_update_sensitive: boolean;
    past_month_payment_status: string;
  };

  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  // const { data: availableUsersData } = adminHooks.useFetchClubUsersData();

  const getColumnMaping = () => {
    const columnMapping = [
      { key: "full_name", label: "Nome" },
      { key: "gender", label: "Género" },
    ];
    if (props.userRole === "main_admin" || props.userRole === "superuser") {
      columnMapping.push(
        { key: "username", label: "Clube" },
        { key: "member_type", label: "Tipo" }
      );
    } else {
      columnMapping.push(
        { key: "age", label: "Idade" },
        { key: "member_type", label: "Tipo" },
        { key: "verified", label: "Verificado" }
      );
    }
    return columnMapping;
  };

  const columnMaping = getColumnMaping();

  const {
    control: filtersControl,
    watch: filtersWatch,
    setValue: filtersSetValue,
    reset: filtersReset,
    formState: { errors: filtersErrors },
    formState: { dirtyFields: filtersDirtyFields },
  } = useForm({
    defaultValues: {
      quotesLegible: false,
      quotesOverdue: false,
      isCoach: false,
      isStudent: false,
      isAthlete: false,
      isMasculino: false,
      isFeminino: false,
    },
  });

  const {
    control: orderControl,
    watch: orderWatch,
    reset: orderReset,
    formState: { errors: orderErrors },
    formState: { dirtyFields: orderDirtyFields },
  } = useForm({
    defaultValues: {
      first_name: "first_name",
      gender: "",
      member_type: "",
      birth_date: "",
    },
  });

  const filtersChangedCount = Object.keys(filtersDirtyFields).length;
  const orderChangedCount = Object.keys(orderDirtyFields).length;

  const [orderFields, setOrderFields] = useState([
    {
      key: "first_name",
      label: "Primeiro Nome",
      options: ["first_name", "-first_name"],
    },
    {
      key: "gender",
      label: "Género",
      options: ["gender", "-gender"],
    },
    {
      key: "member_type",
      label: "Tipo",
      options: ["member_type", "-member_type"],
    },
    {
      key: "birth_date",
      label: "Idade",
      options: ["birth_date", "-birth_date"],
    },
  ]);

  const ordering = orderFields
    .map((f: any) => orderWatch(f.key)) // get value from react-hook-form
    .filter(Boolean)
    .join(",");

  const memberTypeFiltering = [
    { value: "isStudent", label: "student" },
    { value: "isAthlete", label: "athlete" },
    { value: "isCoach", label: "coach" },
  ]
    .filter((item: any) => filtersWatch(item.value))
    .map((item: any) => item.label)
    .join(",");

  const selectedGender =
    filtersWatch("isMasculino") && filtersWatch("isFeminino")
      ? undefined
      : filtersWatch("isMasculino")
      ? "Masculino"
      : filtersWatch("isFeminino")
      ? "Feminino"
      : undefined;

  const {
    data: membersData,
    isLoading: isMembersDataLoading,
    error: membersError,
  } = membersHooks.useFetchMembersData(
    page + 1,
    pageSize,
    ordering,
    memberTypeFiltering,
    selectedGender,
    filtersWatch("quotesLegible") ? filtersWatch("quotesLegible") : undefined,
    filtersWatch("quotesOverdue") ? "unpaid" : undefined
  );

  // Memoize `rows` to compute only when `members` changes
  const memberRows = useMemo(() => {
    return membersData?.data.results.map((member: Member) => ({
      id: member.id,
      full_name: member.full_name,
      gender: member.gender,
      username: member.club.username,
      member_type: MemberTypes.find((item) => item.value === member.member_type)
        ?.label,
      age: member.age,
      verified: member.can_update_sensitive ? (
        <Grid container flexDirection={"column"} alignItems={"center"}>
          <AccountCircle color="disabled" />
        </Grid>
      ) : (
        <Grid container flexDirection={"column"} alignItems={"center"}>
          <VerifiedUser color="disabled" />
        </Grid>
      ),
      can_update_sensitive:
        props.userRole === "main_admin" ? true : member.can_update_sensitive,
      past_month_payment_status: member.past_month_payment_status,
    }));
  }, [membersData]);

  return (
    <>
      <PageInfoCard
        description={
          props.userRole === "main_admin" ? (
            <>
              Aqui poderá consultar todos os Atletas/Alunos tutelados por si.
              Pode consultar a informação de cada um, editar e remover.
            </>
          ) : (
            <>
              Aqui poderá consultar todos os seus Membros e consultar a
              informação detalhada de cada um (caso possua uma subscrição).
              <p></p>
              <strong>Importante</strong>: Estes não servem como inscrição em
              qualquer prova. A idade aqui apresentada não é a utilizada como
              referência para as inscrições. Em vez disso, a idade é calculada
              para cada prova de acordo com as regras em vigor e da época
              desportiva corrente.
            </>
          )
        }
        title="Membros"
      ></PageInfoCard>
      <Grid size={12} sx={{ m: 2 }}>
        {membersError ? null : (
          <Grid
            size={12}
            container
            px={3}
            spacing={2}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <MemberOrdering
              isLoading={isMembersDataLoading}
              control={orderControl}
              reset={orderReset}
              errors={orderErrors}
              changedCount={orderChangedCount}
              orderFields={orderFields}
              setOrderFields={setOrderFields}
            ></MemberOrdering>
            <MemberFilters
              isLoading={isMembersDataLoading}
              control={filtersControl}
              setValue={filtersSetValue}
              reset={filtersReset}
              errors={filtersErrors}
              changedCount={filtersChangedCount}
            ></MemberFilters>
          </Grid>
        )}
        {isMembersDataLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : membersError ? (
          <Grid sx={{ mt: 3 }} container justifyContent="center" size={12}>
            <ListItem>
              <ListItemText primary="Ocorreu um erro ao encontrar os seus Membros, tente mais tarde ou contacte um administrador."></ListItemText>
            </ListItem>
          </Grid>
        ) : membersData?.data === undefined ? null : (
          <AllUseTable
            type="Atletas"
            data={memberRows}
            count={membersData?.data.count}
            columnsHeaders={columnMaping}
            actions
            editable={["main_admin", "superuser", "subed_club"].includes(
              props.userRole
            )}
            selection={["main_admin", "superuser", "subed_club"].includes(
              props.userRole
            )}
            deletable={["main_admin", "superuser", "subed_club"].includes(
              props.userRole
            )}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            userRole={props.userRole}
            disallowEdit
          ></AllUseTable>
        )}
      </Grid>
      {props.userRole === "main_admin" || props.userRole === "subed_club" ? (
        <Grid sx={{ m: 3, mt: 2 }}>
          <AddButton label="Adicionar" to="new_member/"></AddButton>
        </Grid>
      ) : null}
    </>
  );
}
