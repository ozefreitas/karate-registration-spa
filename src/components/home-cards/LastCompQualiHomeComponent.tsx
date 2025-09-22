import {
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tooltip,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import InfoButton from "../Buttons/InfoButton";
import { useNavigate } from "react-router-dom";
import { eventsHooks } from "../../hooks";
import { classificationsHooks } from "../../hooks";

export default function LastCompQualiHomeComponent(
  props: Readonly<{ userRole: string }>
) {
  type Athlete = {
    id: string;
    first_name: string;
    last_name: string;
    age: string;
    graduation: string;
    category: string;
    match_type: string;
    gender: string;
  };

  type CategoryClassification = {
    id: number;
    full_category: string;
    first_place: Athlete;
    second_place: Athlete;
    third_place: Athlete;
  };

  const navigate = useNavigate();

  const { data: lastCompData } = eventsHooks.useFetchLastEvent(props.userRole);

  const { data: lastCompQualiData, isLoading: isLastCompQualiLoading } =
    classificationsHooks.useFetchLastEventClassifications(props.userRole);

  return (
    <Grid size={12}>
      <Card sx={{ m: 2 }}>
        <CardHeader
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
              mb: 1,
            },
          }}
          title="Últimas Classificações"
          subheader={`Última prova: ${lastCompData?.data.name ?? "Não"} ${
            lastCompData?.data.season ?? "disponível"
          }`}
        ></CardHeader>
        <CardContent sx={{ pt: 0, pb: 0 }}>
          {isLastCompQualiLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : lastCompQualiData?.data.length !== 0 ? (
            lastCompQualiData?.data.map(
              (category: CategoryClassification, index: string) => (
                <Accordion key={index} sx={{ m: 2, mt: 0 }}>
                  <AccordionSummary sx={{ pl: 4 }} expandIcon={<ExpandMore />}>
                    <Typography component="span">
                      {category.full_category}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 1, mb: 1 }}>
                    <List sx={{ m: 0, p: 0 }}>
                      <ListItem
                        sx={{
                          m: 0,
                        }}
                      >
                        <Tooltip title={"Consultar"}>
                          <ListItemButton
                            onClick={() =>
                              navigate(`athletes/${category.first_place.id}/`)
                            }
                            sx={{
                              m: 0,
                              pb: 0,
                            }}
                          >
                            <ListItemText
                              primary={`🥇 ${category.first_place.first_name} ${category.first_place.last_name}`}
                            />
                          </ListItemButton>
                        </Tooltip>
                      </ListItem>
                      <Tooltip title={"Consultar"}>
                        <ListItem
                          onClick={() =>
                            navigate(`athletes/${category.second_place.id}/`)
                          }
                          sx={{ m: 0 }}
                        >
                          <ListItemButton
                            sx={{
                              m: 0,
                              pb: 0,
                              pt: 0,
                            }}
                          >
                            <ListItemText
                              primary={`🥈 ${category.second_place.first_name} ${category.second_place.last_name}`}
                            />
                          </ListItemButton>
                        </ListItem>
                      </Tooltip>
                      <Tooltip title={"Consultar"}>
                        <ListItem sx={{ m: 0 }}>
                          <ListItemButton
                            onClick={() =>
                              navigate(`athletes/${category.third_place.id}/`)
                            }
                            sx={{
                              m: 0,
                              pb: 0,
                              pt: 0,
                            }}
                          >
                            <ListItemText
                              primary={`🥉 ${category.third_place.first_name} ${category.third_place.last_name}`}
                            />
                          </ListItemButton>
                        </ListItem>
                      </Tooltip>
                    </List>
                  </AccordionDetails>
                </Accordion>
              )
            )
          ) : (
            <ListItem sx={{ m: 0 }}>
              <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
                <ListItemText primary={"Classificaões não disponíveis."} />
              </ListItemButton>
            </ListItem>
          )}
          {props.userRole === "free_dojo" ? (
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
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {props.userRole !== "free_dojo" ? (
            <InfoButton label="Ver Todas" to="classifications/"></InfoButton>
          ) : null}
        </CardActions>
      </Card>
    </Grid>
  );
}
