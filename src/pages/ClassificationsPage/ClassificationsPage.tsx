import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { classificationsHooks } from "../../hooks";

export default function ClassificationsPage() {
  // interface Ranking {
  //   first_place: string;
  //   second_place: string;
  //   third_place: string;
  // }

  // interface Jornada {
  //   [key: string]: {
  //     string: Ranking;
  //   }[];
  // }
  const { data: classificationsData } =
    classificationsHooks.useFetchPerCompClassifications();

  return (
    <>
      <Card sx={{ ml: 2, mr: 2, mt: 0 }}>
        <CardHeader
          title="Página de Classificações"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá consultar todas as classificações dos eventos
          (competições) realizadas até à data.
          <p></p>
          Consultando cada prova, poderá abrir as classificações de cada
          escalão. Lá dentro, os perfis de cada medalhado pode também ser
          aberto.
        </CardContent>
      </Card>
      <Grid sx={{ m: 2, mt: 4 }}>
        {classificationsData?.data.length !== 0 ? (
          classificationsData?.data.map((jornadaGroup: any, i: any) =>
            Object.entries(jornadaGroup).map(([jornadaName, matches]: any) => (
              <Accordion key={`${jornadaName}-${i}`} sx={{ m: 3, mt: 0 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h4" component="span">
                    {jornadaName}
                  </Typography>
                </AccordionSummary>
                {matches.map((match: any, matchIdx: any) =>
                  Object.entries(match).map(([category, ranking]: any) => (
                    <Accordion key={`${category}-${matchIdx}`} sx={{ m: 2 }}>
                      <AccordionSummary
                        sx={{ pl: 4 }}
                        expandIcon={<ExpandMore />}
                      >
                        <Typography variant="h5" component="span">
                          {category}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List sx={{ m: 0, p: 0 }}>
                          <ListItem sx={{ m: 0 }}>
                            <ListItemButton sx={{ m: 0, pb: 0 }}>
                              <ListItemText
                                primary={
                                  <Typography variant="h6">
                                    🥇 {ranking.first_place}
                                  </Typography>
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                          <ListItem sx={{ m: 0 }}>
                            <ListItemButton sx={{ m: 0, pb: 0 }}>
                              <ListItemText
                                primary={
                                  <Typography variant="h6">
                                    🥈 {ranking.second_place}
                                  </Typography>
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                          <ListItem sx={{ m: 0 }}>
                            <ListItemButton sx={{ m: 0, pb: 0 }}>
                              <ListItemText
                                primary={
                                  <Typography variant="h6">
                                    🥉 {ranking.third_place}
                                  </Typography>
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  ))
                )}
              </Accordion>
            ))
          )
        ) : (
          <Grid sx={{ mt: 3 }} container justifyContent="center" size={12}>
            <Typography variant="h6" sx={{ color: "gray", mt: 2 }}>
              Não foram encontrados registos.
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
}
