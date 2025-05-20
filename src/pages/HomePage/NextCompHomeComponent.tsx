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
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import InfoButton from "../../components/InfoButton/InfoButton";

const fetchNextComp = () => {
  return axios.get("http://127.0.0.1:8000/competitions/next_comp/");
};

export default function NextCompHomeComponent() {
  type Competition = {
    id: string;
    name: string;
    season: string;
    location: string;
    competition_date: string;
  };

  const { data: nextCompData, isLoading: isNextCompLoading } = useQuery({
    queryKey: ["next-comp"],
    queryFn: fetchNextComp,
  });

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
        ) : nextCompData?.data.length !== 0 ? (
          <List>
            <Tooltip title={"Consultar"}>
              <ListItem sx={{ m: 0, pb: 0 }}>
                <ListItemButton>
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
              <ListItemText primary={"Não há competições disponíveis."} />
            </ListItemButton>
          </ListItem>
        )}
        <CardActions sx={{ justifyContent: "space-between" }}>
          <InfoButton
            disabled={nextCompData?.data.id ? false : true}
            label="Ver Prova"
            to={`competitions/${nextCompData?.data.id}`}
          ></InfoButton>
          <InfoButton label="Ver Todas" to="competitions/"></InfoButton>
        </CardActions>
      </Card>
    </Grid>
  );
}
