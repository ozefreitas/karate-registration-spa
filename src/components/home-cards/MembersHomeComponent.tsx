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
} from "@mui/material";
import { Person } from "@mui/icons-material";
import InfoButton from "../Buttons/InfoButton";
import AddButton from "../Buttons/AddButton";
import { useNavigate } from "react-router-dom";
import { membersHooks } from "../../hooks";

export default function MembersHomeComponent(
  props: Readonly<{ userRole: string }>
) {
  type Member = {
    id: string;
    first_name: string;
    last_name: string;
    age: string;
    graduation: string;
    category: string;
    match_type: string;
    gender: string;
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
          title={"Atletas adicionados recentemente"}
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <List>
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
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : lastFiveMembersError ? (
            <ListItem sx={{ m: 0 }}>
              <ListItemButton disabled sx={{ m: 0 }}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText
                  primary={"Ocorreu um erro ao carregar os atletas."}
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
                  primary={"Não registou nenhum Atleta recentemente."}
                />
              </ListItemButton>
            </ListItem>
          ) : (
            lastFiveMembersData?.data.map((member: Member, index: number) => (
              <Tooltip key={index} title={"Consultar"}>
                <ListItem sx={{ m: 0, pb: 0 }}>
                  <ListItemButton
                    onClick={() => navigate(`members/${member.id}/`)}
                  >
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${member.first_name} ${member.last_name} | ${member.gender} | ${member.age} anos`}
                    />
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            ))
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
        </List>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {props.userRole === "free_club" ? null : props.userRole ===
            "subed_club" ? (
            <Grid container size={12} justifyContent={"space-between"}>
              <AddButton
                label="Adicionar"
                to="members/new_member/"
              ></AddButton>
              <InfoButton label="Ver Todos" to="members/"></InfoButton>
            </Grid>
          ) : (
            <InfoButton label="Ver Todos" to="members/"></InfoButton>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
