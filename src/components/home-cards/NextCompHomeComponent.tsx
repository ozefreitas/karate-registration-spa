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
import { SportsMma } from "@mui/icons-material";
import InfoButton from "../Buttons/InfoButton";
import { useNavigate } from "react-router-dom";
import { useFetchNextEventData } from "../../hooks/useEventData";
import AddButton from "../Buttons/AddButton";

export default function NextCompHomeComponent(
  props: Readonly<{ userRole: string }>
) {
  const navigate = useNavigate();
  const {
    data: nextCompData,
    isLoading: isNextCompLoading,
    error: nextCompError,
  } = useFetchNextEventData();

  return (
    <Grid size={12}>
      <Card sx={{ m: 2 }}>
        <CardHeader
          title={"Próxima prova"}
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        {isNextCompLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : nextCompError ? (
          <ListItem sx={{ m: 0 }}>
            <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
              <ListItemText
                primary={"Um erro ocorreu a procurar o próximo Evento."}
              />
            </ListItemButton>
          </ListItem>
        ) : nextCompData?.data.length !== 0 ? (
          <List>
            <Tooltip title={"Consultar"}>
              <ListItem sx={{ m: 0, pb: 0 }}>
                <ListItemButton
                  onClick={() => navigate(`events/${nextCompData?.data.id}/`)}
                >
                  <ListItemIcon>
                    <SportsMma></SportsMma>
                  </ListItemIcon>
                  <ListItemText primary={nextCompData?.data.name} />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          </List>
        ) : (
          <ListItem sx={{ m: 0 }}>
            <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
              <ListItemIcon>
                <SportsMma></SportsMma>
              </ListItemIcon>
              <ListItemText primary={"Não há Eventos disponíveis."} />
            </ListItemButton>
          </ListItem>
        )}
        <CardActions
          sx={{
            justifyContent:
              props.userRole === "main_admin" ? "space-between" : "flex-end",
          }}
        >
          {props.userRole === "main_admin" ? (
            <AddButton label="Adicionar" to="events/new_event/"></AddButton>
          ) : null}
          <InfoButton label="Ver Todas" to="events/"></InfoButton>
        </CardActions>
      </Card>
    </Grid>
  );
}
