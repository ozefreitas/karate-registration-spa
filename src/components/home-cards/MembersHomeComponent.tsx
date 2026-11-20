import {
  Grid,
  Card,
  CardHeader,
  CardActions,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Tooltip,
  Box,
  CircularProgress,
  Typography,
  Chip,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import InfoButton from "../Buttons/InfoButton";
import AddButton from "../Buttons/AddButton";
import { useNavigate } from "react-router-dom";
import { membersHooks } from "../../hooks";
import { Persons as PersonType } from "../../openapi";

export default function MembersHomeComponent(
  props: Readonly<{ userRole: string }>,
) {
  const navigate = useNavigate();

  const {
    data: lastFiveMembersData,
    isLoading: isLastFiveMembersLoading,
    error: lastFiveMembersError,
  } = membersHooks.useFetchLastFiveMembers();

  return (
    <Grid size={12}>
      <Card>
        <CardHeader
          sx={{ p: 2 }}
          title={
            <Grid container alignItems={"center"} gap={2}>
              <Grid
                container
                justifyContent={"center"}
                alignItems={"center"}
                size={2}
                color={"#fff"}
                bgcolor={"#1976d2"}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1.5,
                }}
              >
                <Person sx={{ fontSize: 18 }} />
              </Grid>
              <Grid size={10} container direction={"column"}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Membros editados recentemente
                </Typography>
                <Typography>A mostrar 5 últimos Membros</Typography>
              </Grid>
            </Grid>
          }
        ></CardHeader>
        {props.userRole === undefined ? (
          <Grid container size={12} justifyContent={"center"} my={1}>
            <Typography variant="body2" color="textDisabled">
              Sem sessão iniciada. Faça Login
            </Typography>
          </Grid>
        ) : isLastFiveMembersLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <CircularProgress />
          </Box>
        ) : lastFiveMembersError ? (
          <ListItem sx={{ m: 0 }}>
            <ListItemButton disabled sx={{ m: 0 }}>
              <ListItemText
                primary={"Ocorreu um erro ao carregar os membros."}
              />
            </ListItemButton>
          </ListItem>
        ) : lastFiveMembersData?.length === 0 ? (
          <ListItem sx={{ m: 0 }}>
            <ListItemButton disabled sx={{ m: 0 }}>
              <ListItemText
                primary={"Não registou nenhum Membro recentemente."}
              />
            </ListItemButton>
          </ListItem>
        ) : (
          <List>
            {lastFiveMembersData?.map((person: PersonType, index: number) => (
              <ListItem key={index} sx={{ m: 0, pb: 0 }}>
                <Tooltip title={"Consultar"} placement="right">
                  <span style={{ width: "100%" }}>
                    <ListItemButton
                      sx={{
                        minWidth: 0,
                      }}
                      onClick={() =>
                        navigate(`members/${person.id}/?section=personal_info`)
                      }
                    >
                      <ListItemIcon>
                        <Person />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          overflowX: "auto",
                          whiteSpace: "nowrap",
                          minWidth: 0,
                          "&::-webkit-scrollbar": {
                            height: 0,
                          },
                          maskImage:
                            "linear-gradient(to right, black 85%, transparent 100%)",
                        }}
                        primary={
                          <Grid
                            container
                            alignItems="center"
                            spacing={1.5}
                            pr={3}
                            wrap="nowrap"
                            sx={{
                              width: "max-content",
                            }}
                          >
                            <Typography>{person.full_name}</Typography>
                            {(() => {
                              const isCoach = person.member_types.some(
                                (mt) => mt.member_type === "coach",
                              );
                              const isStudent = person.member_types.some(
                                (mt) => mt.member_type === "student",
                              );
                              const isAthlete = person.member_types.some(
                                (mt) => mt.member_type === "athlete",
                              );

                              return (
                                <>
                                  {isCoach ? (
                                    <Chip
                                      size={"small"}
                                      color={"secondary"}
                                      variant="outlined"
                                      label={"Treinador"}
                                    ></Chip>
                                  ) : null}
                                  {isStudent || isAthlete ? (
                                    <Chip
                                      size={"small"}
                                      color={isStudent ? "info" : "warning"}
                                      variant="outlined"
                                      label={isStudent ? "Aluno" : "Competidor"}
                                    ></Chip>
                                  ) : null}
                                </>
                              );
                            })()}
                            <Chip
                              variant="outlined"
                              label={person.gender}
                              size={"small"}
                            ></Chip>
                            <Chip
                              variant="outlined"
                              size={"small"}
                              label={`${person.age} anos`}
                            ></Chip>
                            {person.past_month_payment_status ===
                            null ? null : (
                              <Chip
                                size={"small"}
                                color={
                                  person.past_month_payment_status === "unpaid"
                                    ? "error"
                                    : "success"
                                }
                                label={`Quotas: ${person.past_month_payment_status === "unpaid" ? "Em Falta" : "Pago"}`}
                              ></Chip>
                            )}
                          </Grid>
                        }
                      />
                    </ListItemButton>
                  </span>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        )}
        {props.userRole === "free_club" ? (
          <ListItem sx={{ m: 0 }}>
            <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
              <ListItemText
                primary={
                  "Comece uma subscrição para ter acesso a esta funcionalidade."
                }
              />
            </ListItemButton>
          </ListItem>
        ) : null}

        <CardActions
          sx={{
            justifyContent:
              props.userRole === "subed_club" ? "space-between" : "flex-end",
          }}
        >
          {props.userRole === "free_club" ||
          props.userRole === undefined ? null : props.userRole ===
            "subed_club" ? (
            <>
              <AddButton
                label="Adicionar"
                to="members/new_member/"
                size="small"
                borderless
              ></AddButton>
              <InfoButton
                label="Ver Todos"
                to="members/"
                size="small"
                borderless
              ></InfoButton>
            </>
          ) : (
            <InfoButton
              label="Ver Todos"
              to="members/"
              size="small"
              borderless
            ></InfoButton>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
