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
  CircularProgress,
  Chip,
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
            <Grid container alignItems={"center"} gap={2} size={12}>
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
                <EmojiEvents sx={{ fontSize: 18 }} />
              </Grid>
              <Grid size={10} container direction={"column"}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Últimas classificações
                </Typography>
                <Typography>{lastCompData?.name}</Typography>
              </Grid>
            </Grid>
          }
        ></CardHeader>
        <CardContent sx={{ pt: 0, pb: 0 }}>
          {isLastCompQualiLoading ? (
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              my={3}
            >
              <CircularProgress />
            </Grid>
          ) : lastCompQualiData?.length === 0 ? (
            <ListItem sx={{ m: 0 }}>
              <ListItemButton disabled sx={{ m: 0, pb: 0 }}>
                <ListItemText primary={"Classificações não disponíveis."} />
              </ListItemButton>
            </ListItem>
          ) : (
            lastCompQualiData?.map((bracket, index: any) => (
              <Accordion
                elevation={2}
                key={index}
                sx={{ m: 2, borderRadius: 16 }}
              >
                <AccordionSummary sx={{ pl: 4 }} expandIcon={<ExpandMore />}>
                  <Typography component="span">
                    {bracket.bracket.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pl: 2, mb: 1 }}>
                  <List sx={{ m: 0, p: 0 }}>
                    {bracket.classifications?.map((item: any, index: any) => (
                      <ListItem key={index} sx={{ m: 0, py: 0 }}>
                        <Tooltip title={"Consultar"}>
                          <span style={{ width: "100%" }}>
                            <ListItemButton
                              onClick={() =>
                                navigate(`members/${item.person.id}/`)
                              }
                              sx={{ m: 0 }}
                            >
                              <ListItemText
                                primary={
                                  <Grid
                                    container
                                    spacing={2}
                                    alignItems={"center"}
                                  >
                                    <Typography>
                                      {item.place === 1
                                        ? "🥇"
                                        : item.place === 2
                                          ? "🥈"
                                          : "🥉"}{" "}
                                      {item.person.full_name}
                                    </Typography>
                                    <Chip label={item.person.club}></Chip>
                                  </Grid>
                                }
                              />
                            </ListItemButton>
                          </span>
                        </Tooltip>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
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
