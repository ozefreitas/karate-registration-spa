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
import { eventsHooks, classificationsHooks } from "../../hooks";

export default function LastCompQualiHomeComponent(
  props: Readonly<{ userRole: string }>,
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

  type CategoryClassification = {
    id: number;
    full_category: string;
    first_place: Member;
    second_place: Member;
    third_place: Member;
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
          subheader={`Última prova: ${lastCompData?.name ?? "Não"} ${
            lastCompData?.season ?? "disponível"
          }`}
        ></CardHeader>
        <CardContent sx={{ pt: 0, pb: 0 }}>
          {isLastCompQualiLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <CircularProgress />
            </Box>
          ) : lastCompQualiData?.length === 0 ? (
            <ListItem sx={{ m: 0 }}>
              <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
                <ListItemText primary={"Classificações não disponíveis."} />
              </ListItemButton>
            </ListItem>
          ) : (
            <Accordion sx={{ m: 2, mt: 0 }}>
              <AccordionSummary sx={{ pl: 4 }} expandIcon={<ExpandMore />}>
                <Typography component="span">
                  {lastCompQualiData![0].full_category}
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
                      <span>
                        <ListItemButton
                          onClick={() =>
                            navigate(
                              `members/${lastCompQualiData![0].first_place?.id}/`,
                            )
                          }
                          sx={{
                            m: 0,
                            pb: 0,
                          }}
                        >
                          <ListItemText
                            primary={`🥇 ${lastCompQualiData![0].first_place?.full_name}`}
                          />
                        </ListItemButton>
                      </span>
                    </Tooltip>
                  </ListItem>
                  <Tooltip title={"Consultar"}>
                    <span>
                      <ListItem
                        onClick={() =>
                          navigate(
                            `members/${lastCompQualiData![0].second_place?.id}/`,
                          )
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
                            primary={`🥈 ${lastCompQualiData![0].second_place?.full_name}`}
                          />
                        </ListItemButton>
                      </ListItem>
                    </span>
                  </Tooltip>
                  <Tooltip title={"Consultar"}>
                    <span>
                      <ListItem sx={{ m: 0 }}>
                        <ListItemButton
                          onClick={() =>
                            navigate(
                              `members/${lastCompQualiData![0].third_place?.id}/`,
                            )
                          }
                          sx={{
                            m: 0,
                            pb: 0,
                            pt: 0,
                          }}
                        >
                          <ListItemText
                            primary={`🥉 ${lastCompQualiData![0].third_place?.full_name}`}
                          />
                        </ListItemButton>
                      </ListItem>
                    </span>
                  </Tooltip>
                </List>
              </AccordionDetails>
            </Accordion>
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
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {props.userRole === "free_club" ? null : (
            <InfoButton label="Ver Todas" to="classifications/"></InfoButton>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
