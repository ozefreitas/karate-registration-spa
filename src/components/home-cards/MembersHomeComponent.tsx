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
import { MemberTypes } from "../../config";

export default function MembersHomeComponent(
  props: Readonly<{ userRole: string }>,
) {
  type Member = {
    id: string;
    full_name: string;
    age: string;
    graduation: string;
    category: string;
    match_type: string;
    gender: string;
    member_type: string;
    past_month_payment_status: string;
  };

  const navigate = useNavigate();

  const {
    data: lastFiveMembersData,
    isLoading: isLastFiveMembersLoading,
    error: lastFiveMembersError,
  } = membersHooks.useFetchLastFiveMembers();

  return (
    <Grid size={12}>
      <Card sx={{ m: 2 }}>
        <CardHeader
          title={"Membros adicionados recentemente"}
          subheader={"A mostrar apenas os 5 últimos Membros."}
          sx={{
            pb: 0,
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
              mb: 1,
            },
          }}
        ></CardHeader>
        {props.userRole === undefined ? (
          <ListItem sx={{ m: 0 }}>
            <ListItemButton disabled sx={{ m: 0 }}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary={"Sem sessão iniciada. Faça Login."} />
            </ListItemButton>
          </ListItem>
        ) : isLastFiveMembersLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <CircularProgress />
          </Box>
        ) : lastFiveMembersError ? (
          <ListItem sx={{ m: 0 }}>
            <ListItemButton disabled sx={{ m: 0 }}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText
                primary={"Ocorreu um erro ao carregar os membros."}
              />
            </ListItemButton>
          </ListItem>
        ) : lastFiveMembersData?.data.length === 0 ? (
          <ListItem sx={{ m: 0 }}>
            <ListItemButton disabled sx={{ m: 0 }}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText
                primary={"Não registou nenhum Membro recentemente."}
              />
            </ListItemButton>
          </ListItem>
        ) : (
          <List>
            {lastFiveMembersData?.data.map((member: Member, index: number) => (
              <ListItem key={index} sx={{ m: 0, pb: 0 }}>
                <Tooltip title={"Consultar"} placement="right">
                  <span style={{ width: "100%" }}>
                    <ListItemButton
                      sx={{
                        minWidth: 0,
                      }}
                      onClick={() =>
                        navigate(`members/${member.id}/?section=personal_info`)
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
                            spacing={2}
                            pr={3}
                            wrap="nowrap"
                            sx={{
                              width: "max-content",
                            }}
                          >
                            <Typography>{member.full_name}</Typography>
                            <Chip
                              color={
                                member.member_type === "coach"
                                  ? "secondary"
                                  : member.member_type === "student"
                                    ? "info"
                                    : "warning"
                              }
                              variant="outlined"
                              label={`${
                                MemberTypes.find(
                                  (item: any) =>
                                    item.value === member.member_type,
                                )?.label
                              }`}
                            ></Chip>
                            <Chip
                              variant="outlined"
                              label={member.gender}
                            ></Chip>
                            <Chip
                              variant="outlined"
                              label={`${member.age} anos`}
                            ></Chip>
                            <Chip
                              color={
                                member.past_month_payment_status === "unpaid"
                                  ? "error"
                                  : "success"
                              }
                              label={`Quotas: ${member.past_month_payment_status === "unpaid" ? "Em Falta" : "Pago"}`}
                            ></Chip>
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
          {props.userRole === "free_club" ? null : props.userRole ===
            "subed_club" ? (
            <>
              <AddButton label="Adicionar" to="members/new_member/"></AddButton>
              <InfoButton label="Ver Todos" to="members/"></InfoButton>
            </>
          ) : (
            <InfoButton label="Ver Todos" to="members/"></InfoButton>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
