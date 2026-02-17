import { useState, useMemo, useEffect, useRef } from "react";
import {
  Grid,
  Box,
  CircularProgress,
  ListItem,
  ListItemText,
  Typography,
  Tooltip,
  IconButton,
  Pagination,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
} from "@mui/material";
import AllUseTable from "../../components/Table/AllUseTable";
import AddButton from "../../components/Buttons/AddButton";
import { membersHooks, membershipsHooks } from "../../hooks";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import { MemberTypes } from "../../config";
import MemberFilters from "../../components/filter_drawers/MemberFilters";
import MemberOrdering from "../../components/filter_drawers/MemberOrdering";
import { useForm } from "react-hook-form";
import {
  VerifiedUser,
  AccountCircle,
  HourglassBottom,
  TableRows,
  CreditCard,
  Add,
} from "@mui/icons-material";
import RequestModal from "../../components/Modals/RequestModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import stringAvatar from "../../dashboard/utils/avatarColor";

export default function MembersPage(props: Readonly<{ userRole: string }>) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramPage = searchParams.get("page") ?? "1";

  const changePage = (number: string) => {
    setSearchParams((prev) => {
      prev.set("page", number);
      return prev;
    });
  };

  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem("membersView") ?? "table";
  });
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(
    currentView === "table" ? 10 : 12,
  );

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    if (currentView === "card" && paramPage) {
      newParams.delete("page_size");
      setSearchParams(newParams);
      setPage(Number(paramPage));
    }
  }, [paramPage, currentView]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    changePage(value.toString());
  };

  const prevViewRef = useRef("");

  useEffect(() => {
    localStorage.setItem("membersView", currentView);

    if (currentView === "table") {
      setPageSize(10);
    } else {
      setPageSize(12);
    }

    // Only run if previous value exists AND changed
    if (prevViewRef.current && prevViewRef.current !== currentView) {
      changePage("1");
    }

    // update previous value
    prevViewRef.current = currentView;
  }, [currentView]);

  const [isRequestModalOpen, setIsRequestModalOpen] = useState<boolean>(false);
  const [actionedMember, setActionedMember] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<string>("");

  const handleModalOpen = (id: string) => {
    setIsRequestModalOpen(true);
    setActionedMember(id);
  };

  const handleModalClose = () => {
    setIsRequestModalOpen(false);
  };

  const getColumnMaping = () => {
    const columnMapping = [
      { key: "full_name", label: "Nome" },
      { key: "gender", label: "Género" },
    ];
    if (props.userRole === "main_admin" || props.userRole === "superuser") {
      columnMapping.push({ key: "username", label: "Clube" });
    } else {
      columnMapping.push(
        { key: "age", label: "Idade" },
        { key: "member_type", label: "Tipo" },
        { key: "verified", label: "Verificado" },
      );
    }
    columnMapping.push({ key: "updated_by", label: "Ult. Edição" });
    return columnMapping;
  };

  const columnMaping = getColumnMaping();

  const {
    control: filtersControl,
    watch: filtersWatch,
    setValue: filtersSetValue,
    reset: filtersReset,
    formState: { errors: filtersErrors, dirtyFields: filtersDirtyFields },
  } = useForm({
    defaultValues: {
      quotesLegible: false,
      quotesOverdue: false,
      isCoach: false,
      isStudent: false,
      isAthlete: false,
      isMasculino: false,
      isFeminino: false,
      isValidated: false,
    },
  });

  const {
    control: orderControl,
    watch: orderWatch,
    reset: orderReset,
    formState: { errors: orderErrors, dirtyFields: orderDirtyFields },
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
    props.userRole,
    page,
    pageSize,
    ordering,
    memberTypeFiltering,
    selectedGender,
    filtersWatch("quotesLegible") ? filtersWatch("quotesLegible") : undefined,
    filtersWatch("quotesOverdue") ? "unpaid" : undefined,
    filtersWatch("isValidated") ? true : undefined,
    selectedUsers === "" ? undefined : selectedUsers,
  );

  const {
    data: memberShipsData,
    isLoading: isMemberShipsDataLoading,
    error: memberShipsError,
  } = membershipsHooks.useFetchMemberShipsData(
    props.userRole,
    page,
    pageSize,
    ordering,
  );

  const memberRows = useMemo(() => {
    return membersData?.results.map((member: any) => ({
      id: member.id,
      full_name: member.full_name,
      gender: member.gender === "Masculino" ? "M" : "F",
      username: member.club?.username,
      member_type: MemberTypes.find((item) => item.value === member.member_type)
        ?.label,
      age: member.age,
      verified: member.is_validated ? (
        <Tooltip arrow title="Verificado">
          <Grid container flexDirection={"column"} alignItems={"center"}>
            <VerifiedUser color="disabled" />
          </Grid>
        </Tooltip>
      ) : member.request_status === null ||
        member.request_status !== "pending" ? (
        <Tooltip arrow title="Pedir Verificação">
          <span>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleModalOpen(member.id);
              }}
            >
              <AccountCircle color="primary" />
            </IconButton>
          </span>
        </Tooltip>
      ) : (
        <Tooltip arrow title="Pendente">
          <Grid container flexDirection={"column"} alignItems={"center"}>
            <HourglassBottom color="primary" />
          </Grid>
        </Tooltip>
      ),
      can_update_sensitive:
        props.userRole === "main_admin" ? true : !member.is_validated,
      past_month_payment_status: member.past_month_payment_status,
      updated_by: member.updated_by?.username ?? (
        <Typography color="textDisabled">N/A</Typography>
      ),
    }));
  }, [membersData]);

  const memberShipRows = useMemo(() => {
    return memberShipsData?.results.map((memberShip: any) => ({
      // id of the relation
      id: memberShip.person.id,
      full_name: memberShip.person.full_name,
      gender: memberShip.person.gender === "Masculino" ? "M" : "F",
      username: memberShip.person.club?.username,
      member_type: MemberTypes.find((item) => item.value === memberShip.member_type)
        ?.label,
      age: memberShip.person.age,
      verified: memberShip.person.is_validated ? (
        <Tooltip arrow title="Verificado">
          <Grid container flexDirection={"column"} alignItems={"center"}>
            <VerifiedUser color="disabled" />
          </Grid>
        </Tooltip>
      ) : memberShip.person.request_status === null ||
        memberShip.person.request_status !== "pending" ? (
        <Tooltip arrow title="Pedir Verificação">
          <span>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleModalOpen(memberShip.id);
              }}
            >
              <AccountCircle color="primary" />
            </IconButton>
          </span>
        </Tooltip>
      ) : (
        <Tooltip arrow title="Pendente">
          <Grid container flexDirection={"column"} alignItems={"center"}>
            <HourglassBottom color="primary" />
          </Grid>
        </Tooltip>
      ),
      can_update_sensitive:
        props.userRole === "main_admin" ? true : !memberShip.is_validated,
      past_month_payment_status: memberShip.past_month_payment_status,
      updated_by: memberShip.updated_by?.username ?? (
        <Typography color="textDisabled">N/A</Typography>
      ),
    }));
  }, [memberShipsData]);

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
              <p>
                Membros registados na{" "}
                {import.meta.env.VITE_DISPLAY_BUTTON_SIGLA} não podem ser
                removidos, e apenas este possuem um número de identificação.
                Pode pedir a validação de um Membro junto da{" "}
                {import.meta.env.VITE_DISPLAY_BUTTON_SIGLA} através da coluna{" "}
                <i>Verificado</i>. Apenas membros validados podem integrar
                Eventos. <br /> No caso da vista por cartas, pode clicar no
                ícone ao lado do nome de cada Membro.
              </p>
              <p></p>
              <strong>Importante</strong>: Estes não servem como inscrição em
              qualquer prova. A idade aqui apresentada não é a utilizada como
              referência para as inscrições. Em vez disso, a idade é calculada
              para cada prova de acordo com as regras em vigor e da época
              desportiva corrente.
              <p>
                Preste atenção à cor das linhas/cartas para avisos de
                irregularidades num Membro.
              </p>
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
            ml={1}
            mr={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            {props.userRole === "main_admin" ||
            props.userRole === "subed_club" ? (
              <>
                <Grid
                  sx={{
                    display: { xs: "none", md: "flex" },
                  }}
                >
                  <AddButton label="Adicionar" to="new_member/"></AddButton>
                </Grid>
                <Grid
                  sx={{
                    display: { xs: "flex", md: "none" },
                  }}
                >
                  <Tooltip placement="top" title="Adicionar">
                    <IconButton
                      sx={{
                        border: 1,
                        borderRadius: 3,
                        ml: 1,
                        bgcolor: "#2e7d32",
                        "&:hover": { bgcolor: "#2e7d32" },
                      }}
                      size="large"
                      color="success"
                      aria-label="delete"
                    >
                      <Add sx={{ color: "white" }}></Add>
                    </IconButton>
                  </Tooltip>
                </Grid>
              </>
            ) : null}
            <Grid container spacing={2}>
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
                setSelectedUsers={setSelectedUsers}
              ></MemberFilters>
              <Grid pl={2} container spacing={1} borderRadius={3}>
                <Tooltip placement="top" title={"Vista de Tabela"}>
                  <span>
                    <IconButton
                      size="large"
                      onClick={() => setCurrentView("table")}
                      sx={{
                        borderRadius: 3,
                        border: 1,
                        bgcolor:
                          currentView === "table" ? "#1976d2;" : undefined,
                        "&:hover": { bgcolor: "#1976d2" },
                      }}
                      color="info"
                    >
                      <TableRows
                        sx={{
                          color: currentView === "table" ? "white" : undefined,
                        }}
                      ></TableRows>
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip placement="top" title={"Vista de Cartas"}>
                  <span>
                    <IconButton
                      size="large"
                      sx={{
                        borderRadius: 3,
                        border: 1,
                        bgcolor:
                          currentView === "card" ? "#1976d2;" : undefined,
                        "&:hover": { bgcolor: "#1976d2" },
                      }}
                      onClick={() => setCurrentView("card")}
                      color="info"
                    >
                      <CreditCard
                        sx={{
                          color: currentView === "card" ? "white" : undefined,
                        }}
                      ></CreditCard>
                    </IconButton>
                  </span>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        )}
        {props.userRole === "subed_club" ? (
          isMemberShipsDataLoading ? (
            <Box mt={5} display={"flex"} justifyContent={"center"}>
              <CircularProgress />
            </Box>
          ) : memberShipsError ? (
            <Grid my={3} container justifyContent="center" size={12}>
              <ListItem sx={{ textAlign: "center" }}>
                <ListItemText primary="Ocorreu um erro ao encontrar os Membros disponíveis, tente mais tarde ou contacte um administrador."></ListItemText>
              </ListItem>
              <Button
                onClick={() => {
                  changePage("1");
                  setPage(1);
                }}
              >
                Refrescar
              </Button>
            </Grid>
          ) : memberShipsData === undefined ? null : currentView === "table" ? (
            <Grid mt={3}>
              <AllUseTable
                type="Atletas"
                data={memberShipRows}
                count={memberShipsData?.count}
                columnsHeaders={columnMaping}
                actions
                editable={["main_admin", "superuser", "subed_club"].includes(
                  props.userRole,
                )}
                selection={["main_admin", "superuser", "subed_club"].includes(
                  props.userRole,
                )}
                deletable={["main_admin", "superuser", "subed_club"].includes(
                  props.userRole,
                )}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                userRole={props.userRole}
                disallowEdit
              ></AllUseTable>
            </Grid>
          ) : (
            <Grid container spacing={3} m={2} mt={5}>
              {memberRows?.length === 0 ? (
                <Grid
                  sx={{ mt: 1, mb: 3 }}
                  container
                  justifyContent="center"
                  size={12}
                >
                  <Typography variant="h6" sx={{ color: "gray", mt: 2 }}>
                    Não foram encontrados registos.
                  </Typography>
                </Grid>
              ) : (
                memberRows?.map((member: any, index: any) => (
                  <Grid key={index} size={{ xl: 3, lg: 4, md: 6, xs: 12 }}>
                    <Tooltip title="Consultar" placement="top">
                      <Card
                        onClick={() => {
                          navigate(`/members/${member.id}/`);
                        }}
                        sx={{
                          p: 2,
                          height: "100%",
                          width: "100%",
                          transition: "0.3s",
                          border: "4px",
                          borderColor: "transparent",
                          "&:hover": {
                            transform: "translateY(-3px)",
                            boxShadow:
                              member.past_month_payment_status === "unpaid"
                                ? undefined
                                : 6,
                            borderColor:
                              member.past_month_payment_status === "unpaid"
                                ? undefined
                                : "red",
                            cursor: "pointer",
                          },
                          backgroundColor:
                            member.past_month_payment_status === "unpaid"
                              ? "rgba(255, 165, 0, 0.10)"
                              : undefined,
                          borderTop:
                            member.past_month_payment_status === "unpaid"
                              ? "4px solid rgba(255, 165, 0, 0.7)"
                              : undefined,
                          borderBottom:
                            member.past_month_payment_status === "unpaid"
                              ? "4px solid rgba(255, 165, 0, 0.7)"
                              : undefined,

                          animation:
                            member.past_month_payment_status === "unpaid"
                              ? "rowWarningPulse 1.5s ease-in-out infinite"
                              : "none",

                          "@keyframes rowWarningPulse": {
                            "0%": {
                              backgroundColor: "rgba(255, 165, 0, 0.08)",
                              borderTopColor: "rgba(255, 165, 0, 0.45)",
                            },
                            "50%": {
                              backgroundColor: "rgba(255, 165, 0, 0.18)",
                              borderTopColor: "rgba(255, 165, 0, 0.95)",
                            },
                            "100%": {
                              backgroundColor: "rgba(255, 165, 0, 0.08)",
                              borderTopColor: "rgba(255, 165, 0, 0.45)",
                            },
                          },
                        }}
                      >
                        <CardContent sx={{ width: "100%" }}>
                          <Grid
                            container
                            direction={"column"}
                            size={12}
                            spacing={2}
                          >
                            <Grid container justifyContent={"center"}>
                              <Avatar
                                {...stringAvatar(member.full_name, 128)}
                              ></Avatar>
                            </Grid>
                            <Grid
                              container
                              justifyContent={"center"}
                              size={12}
                              pt={2}
                              alignItems={"center"}
                              textAlign={"center"}
                            >
                              <Typography variant="h4">
                                {member.full_name}
                              </Typography>
                            </Grid>
                            {props.userRole === "main_admin" ? null : (
                              <Grid
                                pb={2}
                                size={12}
                                container
                                justifyContent={"center"}
                              >
                                {member.verified}
                              </Grid>
                            )}
                            <Grid container justifyContent={"center"} size={12}>
                              {props.userRole === "main_admin" ? null : (
                                <Chip
                                  variant="outlined"
                                  label={`${member.age} anos`}
                                ></Chip>
                              )}
                              <Chip
                                sx={{
                                  mt: props.userRole === "main_admin" ? 2 : 0,
                                }}
                                variant="outlined"
                                label={
                                  member.gender === "F"
                                    ? "Feminino"
                                    : "Masculino"
                                }
                              ></Chip>
                            </Grid>
                            {props.userRole === "main_admin" ? null : (
                              <Grid
                                container
                                justifyContent={"center"}
                                size={12}
                              >
                                <Chip
                                  color={
                                    member.member_type === "Treinador"
                                      ? "secondary"
                                      : member.member_type === "Aluno"
                                        ? "info"
                                        : "warning"
                                  }
                                  variant="outlined"
                                  label={member.member_type}
                                ></Chip>
                              </Grid>
                            )}
                          </Grid>
                        </CardContent>
                      </Card>
                    </Tooltip>
                  </Grid>
                ))
              )}
            </Grid>
          )
        ) : isMembersDataLoading ? (
          <Box mt={5} display={"flex"} justifyContent={"center"}>
            <CircularProgress />
          </Box>
        ) : membersError ? (
          <Grid my={3} container justifyContent="center" size={12}>
            <ListItem sx={{ textAlign: "center" }}>
              <ListItemText primary="Ocorreu um erro ao encontrar os Membros disponíveis, tente mais tarde ou contacte um administrador."></ListItemText>
            </ListItem>
            <Button
              onClick={() => {
                changePage("1");
                setPage(1);
              }}
            >
              Refrescar
            </Button>
          </Grid>
        ) : membersData === undefined ? null : currentView === "table" ? (
          <Grid mt={3}>
            <AllUseTable
              type="Atletas"
              data={memberRows}
              count={membersData?.count}
              columnsHeaders={columnMaping}
              actions
              editable={["main_admin", "superuser", "subed_club"].includes(
                props.userRole,
              )}
              selection={["main_admin", "superuser", "subed_club"].includes(
                props.userRole,
              )}
              deletable={["main_admin", "superuser", "subed_club"].includes(
                props.userRole,
              )}
              page={page}
              setPage={setPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
              userRole={props.userRole}
              disallowEdit
            ></AllUseTable>
          </Grid>
        ) : (
          <Grid container spacing={3} m={2} mt={5}>
            {memberRows?.length === 0 ? (
              <Grid
                sx={{ mt: 1, mb: 3 }}
                container
                justifyContent="center"
                size={12}
              >
                <Typography variant="h6" sx={{ color: "gray", mt: 2 }}>
                  Não foram encontrados registos.
                </Typography>
              </Grid>
            ) : (
              memberRows?.map((member: any, index: any) => (
                <Grid key={index} size={{ xl: 3, lg: 4, md: 6, xs: 12 }}>
                  <Tooltip title="Consultar" placement="top">
                    <Card
                      onClick={() => {
                        navigate(`/members/${member.id}/`);
                      }}
                      sx={{
                        p: 2,
                        height: "100%",
                        width: "100%",
                        transition: "0.3s",
                        border: "4px",
                        borderColor: "transparent",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow:
                            member.past_month_payment_status === "unpaid"
                              ? undefined
                              : 6,
                          borderColor:
                            member.past_month_payment_status === "unpaid"
                              ? undefined
                              : "red",
                          cursor: "pointer",
                        },
                        backgroundColor:
                          member.past_month_payment_status === "unpaid"
                            ? "rgba(255, 165, 0, 0.10)"
                            : undefined,
                        borderTop:
                          member.past_month_payment_status === "unpaid"
                            ? "4px solid rgba(255, 165, 0, 0.7)"
                            : undefined,
                        borderBottom:
                          member.past_month_payment_status === "unpaid"
                            ? "4px solid rgba(255, 165, 0, 0.7)"
                            : undefined,

                        animation:
                          member.past_month_payment_status === "unpaid"
                            ? "rowWarningPulse 1.5s ease-in-out infinite"
                            : "none",

                        "@keyframes rowWarningPulse": {
                          "0%": {
                            backgroundColor: "rgba(255, 165, 0, 0.08)",
                            borderTopColor: "rgba(255, 165, 0, 0.45)",
                          },
                          "50%": {
                            backgroundColor: "rgba(255, 165, 0, 0.18)",
                            borderTopColor: "rgba(255, 165, 0, 0.95)",
                          },
                          "100%": {
                            backgroundColor: "rgba(255, 165, 0, 0.08)",
                            borderTopColor: "rgba(255, 165, 0, 0.45)",
                          },
                        },
                      }}
                    >
                      <CardContent sx={{ width: "100%" }}>
                        <Grid
                          container
                          direction={"column"}
                          size={12}
                          spacing={2}
                        >
                          <Grid container justifyContent={"center"}>
                            <Avatar
                              {...stringAvatar(member.full_name, 128)}
                            ></Avatar>
                          </Grid>
                          <Grid
                            container
                            justifyContent={"center"}
                            size={12}
                            pt={2}
                            alignItems={"center"}
                            textAlign={"center"}
                          >
                            <Typography variant="h4">
                              {member.full_name}
                            </Typography>
                          </Grid>
                          {props.userRole === "main_admin" ? null : (
                            <Grid
                              pb={2}
                              size={12}
                              container
                              justifyContent={"center"}
                            >
                              {member.verified}
                            </Grid>
                          )}
                          <Grid container justifyContent={"center"} size={12}>
                            {props.userRole === "main_admin" ? null : (
                              <Chip
                                variant="outlined"
                                label={`${member.age} anos`}
                              ></Chip>
                            )}
                            <Chip
                              sx={{
                                mt: props.userRole === "main_admin" ? 2 : 0,
                              }}
                              variant="outlined"
                              label={
                                member.gender === "F" ? "Feminino" : "Masculino"
                              }
                            ></Chip>
                          </Grid>
                          {props.userRole === "main_admin" ? null : (
                            <Grid container justifyContent={"center"} size={12}>
                              <Chip
                                color={
                                  member.member_type === "Treinador"
                                    ? "secondary"
                                    : member.member_type === "Aluno"
                                      ? "info"
                                      : "warning"
                                }
                                variant="outlined"
                                label={member.member_type}
                              ></Chip>
                            </Grid>
                          )}
                        </Grid>
                      </CardContent>
                    </Card>
                  </Tooltip>
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Grid>
      {membersData?.count === 0 ||
      isMembersDataLoading ||
      membersError ||
      currentView === "table" ? null : (
        <Grid size={12} mt={5} container justifyContent={"center"}>
          <Pagination
            count={Math.ceil(membersData?.count! / 12)}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        </Grid>
      )}
      <RequestModal
        id={actionedMember}
        isOpen={isRequestModalOpen}
        handleClose={handleModalClose}
        requestType="verify"
      ></RequestModal>
    </>
  );
}
