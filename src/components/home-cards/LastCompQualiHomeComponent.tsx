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
import { EmojiEvents, ExpandMore } from "@mui/icons-material";
import InfoButton from "../Buttons/InfoButton";
import { useNavigate } from "react-router-dom";
import { eventsHooks, classificationsHooks } from "../../hooks";

export default function LastCompQualiHomeComponent(
  props: Readonly<{ userRole: string }>,
) {
  const navigate = useNavigate();

  const { data: lastCompData } = eventsHooks.useFetchLastEvent(props.userRole);

  const { data: lastCompQualiData, isLoading: isLastCompQualiLoading } =
    classificationsHooks.useFetchLastEventClassifications(props.userRole);

  return (
    <Grid size={12}>
      <Card sx={{ m: 2 }}>
        <CardHeader
          title={
            <Grid container alignItems={"center"} gap={2}>
              <Grid
                container
                justifyContent={"center"}
                alignItems={"center"}
                color={"#fff"}
                bgcolor={"#1976d2"}
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 1.5,
                }}
              >
                <EmojiEvents sx={{ fontSize: 28 }} />
              </Grid>
              <Typography variant="h5" fontWeight={"bold"}>
                Últimas Classificações
              </Typography>
            </Grid>
          }
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
